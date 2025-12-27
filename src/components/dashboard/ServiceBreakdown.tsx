import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { platformData } from "@/data/mockData";

const COLORS = [
  "hsl(199, 89%, 48%)", // Snowflake
  "hsl(33, 100%, 50%)", // AWS
  "hsl(270, 60%, 60%)", // Astronomer
  "hsl(4, 90%, 58%)",   // Databricks
];

const data = platformData.map((p, index) => ({
  name: p.name,
  value: p.cost,
  color: COLORS[index],
}));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="glass-card rounded-lg p-3 border border-border">
        <p className="font-medium text-foreground">{item.name}</p>
        <p className="text-sm text-muted-foreground">
          Cost:{" "}
          <span className="font-mono text-foreground">
            ${item.value.toLocaleString()}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Share:{" "}
          <span className="font-mono text-foreground">
            {((item.value / platformData.reduce((a, b) => a + b.cost, 0)) * 100).toFixed(1)}%
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function ServiceBreakdown() {
  return (
    <div
      className="glass-card rounded-xl p-6 animate-slide-up"
      style={{ animationDelay: "400ms" }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Cost Distribution
        </h3>
        <p className="text-sm text-muted-foreground">
          Total spend by platform
        </p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              stroke="hsl(var(--background))"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="grid grid-cols-2 gap-4">
          {platformData.map((platform, index) => (
            <div key={platform.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-xs text-muted-foreground truncate">
                  {platform.name}
                </span>
              </div>
              <span className="text-xs font-mono text-foreground">
                ${(platform.cost / 1000).toFixed(0)}k
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
