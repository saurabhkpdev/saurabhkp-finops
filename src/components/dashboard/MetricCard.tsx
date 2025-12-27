import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  className,
  delay = 0,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6 animate-slide-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="metric-value text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-1">
          {trend >= 0 ? (
            <TrendingUp className="h-4 w-4 text-destructive" />
          ) : (
            <TrendingDown className="h-4 w-4 text-success" />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              trend >= 0 ? "text-destructive" : "text-success"
            )}
          >
            {Math.abs(trend)}% vs last month
          </span>
        </div>
      )}
    </div>
  );
}
