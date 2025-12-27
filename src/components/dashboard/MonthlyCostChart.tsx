import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { monthlyData } from "@/data/mockData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const cost = payload[0].value;
    const budget = payload[0].payload.budget;
    const isOverBudget = cost > budget;

    return (
      <div className="glass-card rounded-lg p-3 border border-border">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">
          Cost:{" "}
          <span className="font-mono text-foreground">
            ${cost.toLocaleString()}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Budget:{" "}
          <span className="font-mono text-foreground">
            ${budget.toLocaleString()}
          </span>
        </p>
        <p
          className={`text-sm font-medium mt-1 ${
            isOverBudget ? "text-destructive" : "text-success"
          }`}
        >
          {isOverBudget ? "Over budget" : "Under budget"} by $
          {Math.abs(cost - budget).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function MonthlyCostChart() {
  const avgBudget =
    monthlyData.reduce((acc, d) => acc + d.budget, 0) / monthlyData.length;

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Monthly Cost Overview
          </h3>
          <p className="text-sm text-muted-foreground">
            Cost vs budget by month
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Under Budget</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Over Budget</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 5, left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
            <ReferenceLine
              y={avgBudget}
              stroke="hsl(var(--warning))"
              strokeDasharray="5 5"
              label={{
                value: "Avg Budget",
                position: "right",
                fill: "hsl(var(--warning))",
                fontSize: 12,
              }}
            />
            <Bar dataKey="cost" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {monthlyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.cost > entry.budget
                      ? "hsl(var(--destructive))"
                      : "hsl(var(--primary))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
