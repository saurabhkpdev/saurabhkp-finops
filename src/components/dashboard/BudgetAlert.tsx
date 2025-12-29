import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
interface BudgetAlertProps {
  current: number;
  budget: number;
  label: string;
}
export function BudgetAlert({
  current,
  budget,
  label
}: BudgetAlertProps) {
  const percentage = current / budget * 100;
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
  const statusStyles = {
    success: "bg-green-500/10 border-green-500/20 text-green-700",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-700",
    danger: "bg-red-500/10 border-red-500/20 text-red-700"
  };
  return;
}