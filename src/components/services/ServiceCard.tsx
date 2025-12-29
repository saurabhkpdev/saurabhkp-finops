import { TrendingUp, TrendingDown, Lightbulb, Clock, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { ServiceDetail } from "@/data/servicesData";

interface ServiceCardProps {
  service: ServiceDetail;
  onClick: () => void;
}

const platformColors: Record<string, string> = {
  Snowflake: "bg-chart-1/10 text-chart-1 border-chart-1/20",
  AWS: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Astronomer: "bg-chart-3/10 text-chart-3 border-chart-3/20",
};

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-600 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Hard: "bg-red-500/10 text-red-600 border-red-500/20",
};

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  const totalSavings = service.optimizations.reduce((sum, opt) => sum + opt.potentialSavings, 0);
  const topOptimization = service.optimizations[0];

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/30"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className={platformColors[service.platform]}>
              {service.platform}
            </Badge>
            <CardTitle className="mt-2 text-lg">{service.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {service.description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold font-mono">
              ${service.monthlyCost.toLocaleString()}
            </p>
            <div className={`flex items-center justify-end gap-1 text-sm ${
              service.trend > 0 ? "text-destructive" : "text-green-600"
            }`}>
              {service.trend > 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{Math.abs(service.trend)}%</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Usage Stats */}
        <div className="grid grid-cols-3 gap-2">
          {service.usage.map((u, i) => (
            <div key={i} className="text-center p-2 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground">{u.metric}</p>
              <p className="font-mono text-sm font-medium">
                {u.value} <span className="text-xs text-muted-foreground">{u.unit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Utilization */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Utilization</span>
            </div>
            <span className="font-mono">{service.usagePattern.avgUtilization}%</span>
          </div>
          <Progress value={service.usagePattern.avgUtilization} className="h-2" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Peak: {service.usagePattern.peakHours}</span>
          </div>
        </div>

        {/* Top Optimization */}
        {topOptimization && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium truncate">{topOptimization.title}</p>
                  <Badge variant="outline" className={difficultyColors[topOptimization.difficulty]}>
                    {topOptimization.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Save up to <span className="font-mono text-primary font-medium">
                    ${topOptimization.potentialSavings.toLocaleString()}
                  </span>/month
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Total Savings */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">
            {service.optimizations.length} optimization{service.optimizations.length !== 1 ? "s" : ""} available
          </span>
          <span className="text-sm font-medium text-primary">
            Save up to ${totalSavings.toLocaleString()}/mo
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
