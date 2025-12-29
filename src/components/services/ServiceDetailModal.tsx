import { TrendingUp, TrendingDown, Lightbulb, Clock, Activity, X, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ServiceDetail } from "@/data/servicesData";

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  open: boolean;
  onClose: () => void;
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

const impactColors: Record<string, string> = {
  Low: "text-muted-foreground",
  Medium: "text-yellow-600",
  High: "text-green-600",
};

export function ServiceDetailModal({ service, open, onClose }: ServiceDetailModalProps) {
  if (!service) return null;

  const totalSavings = service.optimizations.reduce((sum, opt) => sum + opt.potentialSavings, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="outline" className={platformColors[service.platform]}>
                {service.platform}
              </Badge>
              <DialogTitle className="mt-2 text-2xl">{service.name}</DialogTitle>
              <p className="text-muted-foreground mt-1">{service.description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Cost Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Monthly Cost</p>
              <p className="text-2xl font-bold font-mono mt-1">
                ${service.monthlyCost.toLocaleString()}
              </p>
              <div className={`flex items-center gap-1 text-sm mt-1 ${
                service.trend > 0 ? "text-destructive" : "text-green-600"
              }`}>
                {service.trend > 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{Math.abs(service.trend)}% vs last month</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">Potential Savings</p>
              <p className="text-2xl font-bold font-mono text-primary mt-1">
                ${totalSavings.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {((totalSavings / service.monthlyCost) * 100).toFixed(0)}% of current spend
              </p>
            </div>
          </div>

          <Separator />

          {/* Usage Metrics */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Usage Metrics</h3>
            <div className="grid grid-cols-3 gap-3">
              {service.usage.map((u, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">{u.metric}</p>
                  <p className="text-lg font-mono font-medium mt-1">{u.value}</p>
                  <p className="text-xs text-muted-foreground">{u.unit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Pattern */}
          <div className="p-4 rounded-lg bg-muted/30">
            <h3 className="text-lg font-semibold mb-3">Usage Pattern</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span>Average Utilization</span>
                </div>
                <span className="font-mono font-medium">{service.usagePattern.avgUtilization}%</span>
              </div>
              <Progress value={service.usagePattern.avgUtilization} className="h-2" />
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Peak Hours</p>
                    <p className="text-sm">{service.usagePattern.peakHours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Idle Time</p>
                    <p className="text-sm">{service.usagePattern.idleTime}% of the time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Optimizations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Optimization Recommendations</h3>
              <Badge variant="secondary">
                {service.optimizations.length} available
              </Badge>
            </div>
            <div className="space-y-3">
              {service.optimizations.map((opt, i) => (
                <div key={i} className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Lightbulb className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium">{opt.title}</p>
                          <Badge variant="outline" className={difficultyColors[opt.difficulty]}>
                            {opt.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {opt.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className={`text-sm ${impactColors[opt.impact]}`}>
                            {opt.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-mono font-bold text-primary">
                        ${opt.potentialSavings.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">per month</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Optimizations as Applied
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
