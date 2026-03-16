import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Server,
  TestTube,
  Rocket,
  Lightbulb,
  TrendingDown,
  Cpu,
  Database,
  HardDrive,
  Zap,
  Clock,
  ArrowDown,
} from "lucide-react";

export type EnvKey = "dev" | "qa" | "prod";

interface EnvDetailData {
  name: string;
  key: EnvKey;
  icon: React.ReactNode;
  color: string;
  resources: {
    name: string;
    icon: React.ReactNode;
    usage: number;
    capacity: number;
    cost: number;
    unit: string;
  }[];
  costByPlatform: { platform: string; cost: number }[];
  optimizations: {
    title: string;
    description: string;
    savings: number;
    effort: "Low" | "Medium" | "High";
    category: string;
  }[];
  metrics: {
    avgUtilization: number;
    wastedSpend: number;
    activeInstances: number;
    idleInstances: number;
  };
}

const envDetails: Record<EnvKey, EnvDetailData> = {
  dev: {
    name: "Development",
    key: "dev",
    icon: <Server className="h-5 w-5" />,
    color: "hsl(var(--primary))",
    resources: [
      { name: "Compute (vCPUs)", icon: <Cpu className="h-4 w-4" />, usage: 48, capacity: 128, cost: 18200, unit: "vCPUs" },
      { name: "Memory (GB)", icon: <Zap className="h-4 w-4" />, usage: 96, capacity: 256, cost: 8400, unit: "GB" },
      { name: "Storage (TB)", icon: <HardDrive className="h-4 w-4" />, usage: 4.2, capacity: 10, cost: 6800, unit: "TB" },
      { name: "Database Hours", icon: <Database className="h-4 w-4" />, usage: 720, capacity: 2160, cost: 12500, unit: "hrs" },
      { name: "Pipeline Runtime", icon: <Clock className="h-4 w-4" />, usage: 180, capacity: 720, cost: 5200, unit: "hrs" },
    ],
    costByPlatform: [
      { platform: "Snowflake", cost: 43080 },
      { platform: "AWS", cost: 37240 },
      { platform: "Astronomer", cost: 15700 },
    ],
    optimizations: [
      { title: "Auto-shutdown idle dev instances", description: "Automatically stop compute instances after 2 hours of inactivity during non-business hours.", savings: 8500, effort: "Low", category: "Scheduling" },
      { title: "Right-size dev warehouses", description: "Dev Snowflake warehouses are over-provisioned at X-Large. Downsize to Medium for typical workloads.", savings: 12000, effort: "Low", category: "Right-sizing" },
      { title: "Use spot instances for dev workloads", description: "Switch non-critical dev EC2 instances to spot pricing for up to 70% cost reduction.", savings: 6200, effort: "Medium", category: "Pricing" },
      { title: "Consolidate dev databases", description: "Merge 4 underutilized RDS instances into 2 shared instances with schema separation.", savings: 4800, effort: "High", category: "Consolidation" },
    ],
    metrics: { avgUtilization: 37, wastedSpend: 31500, activeInstances: 24, idleInstances: 11 },
  },
  qa: {
    name: "QA / Staging",
    key: "qa",
    icon: <TestTube className="h-5 w-5" />,
    color: "hsl(var(--warning))",
    resources: [
      { name: "Compute (vCPUs)", icon: <Cpu className="h-4 w-4" />, usage: 64, capacity: 128, cost: 24300, unit: "vCPUs" },
      { name: "Memory (GB)", icon: <Zap className="h-4 w-4" />, usage: 128, capacity: 256, cost: 11200, unit: "GB" },
      { name: "Storage (TB)", icon: <HardDrive className="h-4 w-4" />, usage: 6.8, capacity: 12, cost: 9800, unit: "TB" },
      { name: "Database Hours", icon: <Database className="h-4 w-4" />, usage: 1080, capacity: 2160, cost: 16400, unit: "hrs" },
      { name: "Pipeline Runtime", icon: <Clock className="h-4 w-4" />, usage: 360, capacity: 720, cost: 8200, unit: "hrs" },
    ],
    costByPlatform: [
      { platform: "Snowflake", cost: 53850 },
      { platform: "AWS", cost: 46550 },
      { platform: "Astronomer", cost: 19625 },
    ],
    optimizations: [
      { title: "Schedule QA environments on-demand", description: "Spin up QA environments only during active testing windows instead of running 24/7.", savings: 14200, effort: "Medium", category: "Scheduling" },
      { title: "Use reserved instances for staging", description: "Staging runs consistently—switch to 1-year reserved instances for predictable savings.", savings: 9800, effort: "Low", category: "Pricing" },
      { title: "Clean up stale test data", description: "Remove test datasets older than 30 days to reduce Snowflake storage costs.", savings: 3400, effort: "Low", category: "Cleanup" },
    ],
    metrics: { avgUtilization: 50, wastedSpend: 27400, activeInstances: 18, idleInstances: 6 },
  },
  prod: {
    name: "Production",
    key: "prod",
    icon: <Rocket className="h-5 w-5" />,
    color: "hsl(var(--success))",
    resources: [
      { name: "Compute (vCPUs)", icon: <Cpu className="h-4 w-4" />, usage: 224, capacity: 256, cost: 58400, unit: "vCPUs" },
      { name: "Memory (GB)", icon: <Zap className="h-4 w-4" />, usage: 448, capacity: 512, cost: 28600, unit: "GB" },
      { name: "Storage (TB)", icon: <HardDrive className="h-4 w-4" />, usage: 18.5, capacity: 25, cost: 24200, unit: "TB" },
      { name: "Database Hours", icon: <Database className="h-4 w-4" />, usage: 2100, capacity: 2160, cost: 42800, unit: "hrs" },
      { name: "Pipeline Runtime", icon: <Clock className="h-4 w-4" />, usage: 680, capacity: 720, cost: 22400, unit: "hrs" },
    ],
    costByPlatform: [
      { platform: "Snowflake", cost: 118470 },
      { platform: "AWS", cost: 102410 },
      { platform: "Astronomer", cost: 43175 },
    ],
    optimizations: [
      { title: "Optimize Snowflake auto-scaling", description: "Tune multi-cluster warehouse scaling policies to reduce over-provisioning during off-peak hours.", savings: 18500, effort: "Medium", category: "Right-sizing" },
      { title: "Archive cold data to S3 Glacier", description: "Move data older than 90 days from S3 Standard to Glacier for 80% storage savings.", savings: 8200, effort: "Low", category: "Storage" },
      { title: "Optimize Airflow DAG scheduling", description: "Consolidate overlapping DAG runs and reduce worker node idle time between tasks.", savings: 6800, effort: "Medium", category: "Scheduling" },
      { title: "Enable Snowflake query caching", description: "Implement result caching for frequently repeated analytics queries to reduce compute credits.", savings: 11200, effort: "Low", category: "Performance" },
      { title: "Use Graviton instances for prod", description: "Migrate compatible workloads to AWS Graviton (ARM) instances for 20% better price-performance.", savings: 9400, effort: "High", category: "Pricing" },
    ],
    metrics: { avgUtilization: 87, wastedSpend: 14200, activeInstances: 42, idleInstances: 3 },
  },
};

const effortColors: Record<string, string> = {
  Low: "bg-green-500/10 text-green-700 border-green-500/20",
  Medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  High: "bg-red-500/10 text-red-700 border-red-500/20",
};

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 border border-border">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">
          Cost: <span className="font-mono text-foreground">${payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

interface Props {
  envKey: EnvKey | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnvironmentDetailModal({ envKey, open, onOpenChange }: Props) {
  if (!envKey) return null;
  const env = envDetails[envKey];
  const totalSavings = env.optimizations.reduce((a, b) => a + b.savings, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span style={{ color: env.color }}>{env.icon}</span>
            {env.name} Environment
          </DialogTitle>
        </DialogHeader>

        {/* Key metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">Avg Utilization</p>
            <p className="text-xl font-bold font-mono text-foreground">{env.metrics.avgUtilization}%</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">Wasted Spend</p>
            <p className="text-xl font-bold font-mono text-destructive">${(env.metrics.wastedSpend / 1000).toFixed(1)}k</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">Active Instances</p>
            <p className="text-xl font-bold font-mono text-foreground">{env.metrics.activeInstances}</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground">Idle Instances</p>
            <p className="text-xl font-bold font-mono text-destructive">{env.metrics.idleInstances}</p>
          </div>
        </div>

        {/* Resource utilization */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Resource Utilization</h4>
          <div className="space-y-3">
            {env.resources.map((r) => {
              const pct = (r.usage / r.capacity) * 100;
              return (
                <div key={r.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {r.icon}
                      <span>{r.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-foreground text-xs">
                        {r.usage} / {r.capacity} {r.unit}
                      </span>
                      <span className="font-mono text-muted-foreground text-xs w-16 text-right">
                        ${(r.cost / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Cost by platform chart */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Cost by Platform</h4>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={env.costByPlatform} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="cost" fill={env.color} radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Optimization recommendations */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" />
              Optimization Opportunities
            </h4>
            <Badge variant="secondary" className="gap-1">
              <ArrowDown className="h-3 w-3" />
              ${(totalSavings / 1000).toFixed(1)}k potential savings
            </Badge>
          </div>
          <div className="space-y-2">
            {env.optimizations.map((opt, i) => (
              <div key={i} className="rounded-lg border border-border bg-muted/20 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-medium text-foreground">{opt.title}</span>
                      <Badge variant="outline" className="text-[10px]">{opt.category}</Badge>
                      <Badge variant="outline" className={`text-[10px] ${effortColors[opt.effort]}`}>
                        {opt.effort} effort
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{opt.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-success">
                      <TrendingDown className="h-3.5 w-3.5" />
                      <span className="font-mono text-sm font-semibold">${(opt.savings / 1000).toFixed(1)}k</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">/ year</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
