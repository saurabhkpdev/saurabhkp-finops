import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PlatformData } from "@/data/mockData";

interface PlatformCardProps {
  platform: PlatformData;
  delay?: number;
}

const platformColors: Record<string, string> = {
  Snowflake: "snowflake",
  AWS: "aws",
  Astronomer: "astronomer",
  Databricks: "databricks",
};

const platformIcons: Record<string, string> = {
  Snowflake: "❄️",
  AWS: "☁️",
  Astronomer: "🚀",
  Databricks: "⚡",
};

export function PlatformCard({ platform, delay = 0 }: PlatformCardProps) {
  const utilizationPercent = (platform.cost / platform.budget) * 100;
  const isOverBudget = platform.cost > platform.budget;
  const colorClass = platformColors[platform.name] || "primary";

  return (
    <div
      className="glass-card rounded-xl p-6 animate-slide-up hover:border-primary/30 transition-colors"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{platformIcons[platform.name]}</span>
          <div>
            <h3 className={cn("text-lg font-semibold", `platform-${colorClass}`)}>
              {platform.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Budget: ${(platform.budget / 1000).toFixed(0)}k
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {platform.trend >= 0 ? (
            <TrendingUp className="h-4 w-4 text-destructive" />
          ) : (
            <TrendingDown className="h-4 w-4 text-success" />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              platform.trend >= 0 ? "text-destructive" : "text-success"
            )}
          >
            {Math.abs(platform.trend)}%
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-end justify-between mb-2">
            <span className="metric-value">
              ${(platform.cost / 1000).toFixed(1)}k
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                isOverBudget ? "text-destructive" : "text-success"
              )}
            >
              {utilizationPercent.toFixed(0)}% used
            </span>
          </div>
          <Progress
            value={Math.min(utilizationPercent, 100)}
            className={cn(
              "h-2",
              isOverBudget && "[&>div]:bg-destructive"
            )}
          />
        </div>

        <div className="space-y-2 pt-2 border-t border-border/50">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Top Services
          </p>
          {platform.services.slice(0, 3).map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-muted-foreground truncate pr-2">
                {service.name}
              </span>
              <span className="font-mono text-foreground">
                ${(service.cost / 1000).toFixed(1)}k
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
