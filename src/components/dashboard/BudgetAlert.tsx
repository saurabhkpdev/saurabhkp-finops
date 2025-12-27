import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetAlertProps {
  current: number;
  budget: number;
  label: string;
}

export function BudgetAlert({ current, budget, label }: BudgetAlertProps) {
  const percentage = (current / budget) * 100;
  
  let status: "success" | "warning" | "danger";
  let message: string;
  let Icon: typeof CheckCircle;
  
  if (percentage >= 100) {
    status = "danger";
    message = `${label} is over budget by $${((current - budget) / 1000).toFixed(1)}k`;
    Icon = XCircle;
  } else if (percentage >= 85) {
    status = "warning";
    message = `${label} is at ${percentage.toFixed(0)}% of budget`;
    Icon = AlertTriangle;
  } else {
    status = "success";
    message = `${label} is within budget (${percentage.toFixed(0)}%)`;
    Icon = CheckCircle;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border",
        status === "danger" && "bg-destructive/10 border-destructive/30 text-destructive",
        status === "warning" && "bg-warning/10 border-warning/30 text-warning",
        status === "success" && "bg-success/10 border-success/30 text-success"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
