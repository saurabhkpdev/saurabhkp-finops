import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { monthlyData } from "@/data/mockData";

// Simple linear regression for forecasting
const calculateForecast = () => {
  const n = monthlyData.length;
  const sumX = monthlyData.reduce((acc, _, i) => acc + i, 0);
  const sumY = monthlyData.reduce((acc, d) => acc + d.cost, 0);
  const sumXY = monthlyData.reduce((acc, d, i) => acc + i * d.cost, 0);
  const sumX2 = monthlyData.reduce((acc, _, i) => acc + i * i, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};

const { slope, intercept } = calculateForecast();

const forecastData = monthlyData.map((d, i) => ({
  ...d,
  forecast: Math.round(intercept + slope * i),
}));

// Add next 3 months forecast
const futureMonths = ["Jan'25", "Feb'25", "Mar'25"];
const extendedData = [
  ...forecastData,
  ...futureMonths.map((month, i) => ({
    month,
    cost: null as number | null,
    budget: 58000,
    forecast: Math.round(intercept + slope * (12 + i)),
  })),
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 border border-border">
        <p className="font-medium text-foreground">{label}</p>
        {payload[0]?.value !== null && (
          <p className="text-sm text-muted-foreground">
            Actual:{" "}
            <span className="font-mono text-foreground">
              ${payload[0]?.value?.toLocaleString()}
            </span>
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          Forecast:{" "}
          <span className="font-mono text-primary">
            ${payload[1]?.value?.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function CostForecastChart() {
  const yearEndForecast = Math.round(intercept + slope * 11);
  const nextYearForecast = Math.round(intercept + slope * 14);

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Cost Forecast
          </h3>
          <p className="text-sm text-muted-foreground">
            Projected spend based on current trends
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Projected Q1'25</p>
          <p className="text-xl font-mono font-semibold text-primary">
            ${(nextYearForecast / 1000).toFixed(1)}k/mo
          </p>
        </div>
      </div>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={extendedData} margin={{ top: 10, right: 20, bottom: 5, left: 20 }}>
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
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
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              x="Dec"
              stroke="hsl(var(--border))"
              strokeDasharray="3 3"
              label={{
                value: "Forecast →",
                position: "top",
                fill: "hsl(var(--muted-foreground))",
                fontSize: 11,
              }}
            />
            <Area
              type="monotone"
              dataKey="cost"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#colorCost)"
              connectNulls={false}
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#colorForecast)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-primary" />
          <span className="text-muted-foreground">Actual Cost</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-success" style={{ borderStyle: "dashed" }} />
          <span className="text-muted-foreground">Forecast Trend</span>
        </div>
      </div>
    </div>
  );
}
