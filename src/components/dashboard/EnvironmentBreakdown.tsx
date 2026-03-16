import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Server, TestTube, Rocket } from "lucide-react";
import { EnvironmentDetailModal, EnvKey } from "./EnvironmentDetailModal";

const environmentData = [
  {
    platform: "Snowflake",
    dev: 43080,
    qa: 53850,
    prod: 118470,
  },
  {
    platform: "AWS",
    dev: 37240,
    qa: 46550,
    prod: 102410,
  },
  {
    platform: "Astronomer",
    dev: 15700,
    qa: 19625,
    prod: 43175,
  },
];

const envSummary = [
  {
    name: "Development",
    key: "dev" as const,
    icon: <Server className="h-4 w-4" />,
    color: "hsl(var(--primary))",
    total: environmentData.reduce((a, b) => a + b.dev, 0),
    share: 0,
  },
  {
    name: "QA / Staging",
    key: "qa" as const,
    icon: <TestTube className="h-4 w-4" />,
    color: "hsl(var(--warning))",
    total: environmentData.reduce((a, b) => a + b.qa, 0),
    share: 0,
  },
  {
    name: "Production",
    key: "prod" as const,
    icon: <Rocket className="h-4 w-4" />,
    color: "hsl(var(--success))",
    total: environmentData.reduce((a, b) => a + b.prod, 0),
    share: 0,
  },
];

const grandTotal = envSummary.reduce((a, b) => a + b.total, 0);
envSummary.forEach((e) => (e.share = (e.total / grandTotal) * 100));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 border border-border">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm text-muted-foreground">
            {entry.name}:{" "}
            <span className="font-mono text-foreground">
              ${entry.value.toLocaleString()}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function EnvironmentBreakdown() {
  return (
    <div
      className="glass-card rounded-xl p-6 animate-slide-up"
      style={{ animationDelay: "350ms" }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Cost by Environment
        </h3>
        <p className="text-sm text-muted-foreground">
          Spend distribution across Dev, QA & Production
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {envSummary.map((env) => (
          <div
            key={env.key}
            className="rounded-lg border border-border bg-muted/30 p-3 text-center"
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span style={{ color: env.color }}>{env.icon}</span>
              <span className="text-xs font-medium text-muted-foreground">
                {env.name}
              </span>
            </div>
            <p className="text-lg font-bold font-mono text-foreground">
              ${(env.total / 1000).toFixed(0)}k
            </p>
            <Badge variant="secondary" className="text-[10px] mt-1">
              {env.share.toFixed(1)}%
            </Badge>
          </div>
        ))}
      </div>

      {/* Stacked bar chart */}
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={environmentData}
            margin={{ top: 10, right: 10, bottom: 5, left: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="platform"
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
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="text-sm text-muted-foreground capitalize">
                  {value === "dev"
                    ? "Development"
                    : value === "qa"
                    ? "QA / Staging"
                    : "Production"}
                </span>
              )}
            />
            <Bar
              dataKey="dev"
              stackId="env"
              fill="hsl(var(--primary))"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="qa"
              stackId="env"
              fill="hsl(var(--warning))"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="prod"
              stackId="env"
              fill="hsl(var(--success))"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
