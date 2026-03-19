import { useMemo } from "react";
import {
  Activity, Server, Rocket, GitBranch, Clock, AlertTriangle,
  CheckCircle2, XCircle, Timer, Zap, Database, ArrowDown, ArrowUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell
} from "recharts";
import {
  serviceHealthData, deploymentData, pipelineData, doraMetrics
} from "@/data/platformStatsData";

const statusColors: Record<string, string> = {
  healthy: "bg-green-500/10 text-green-600 border-green-500/20",
  degraded: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  down: "bg-red-500/10 text-red-600 border-red-500/20",
  running: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  success: "bg-green-500/10 text-green-600 border-green-500/20",
  failed: "bg-red-500/10 text-red-600 border-red-500/20",
  queued: "bg-muted text-muted-foreground border-border",
};

const PlatformStats = () => {
  const healthyCount = serviceHealthData.filter(s => s.status === "healthy").length;
  const degradedCount = serviceHealthData.filter(s => s.status === "degraded").length;
  const downCount = serviceHealthData.filter(s => s.status === "down").length;

  const totalDeploys = useMemo(() => deploymentData.reduce((a, d) => a + d.deployments, 0), []);
  const totalFailures = useMemo(() => deploymentData.reduce((a, d) => a + d.failures, 0), []);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Platform Statistics</h1>
        <p className="text-muted-foreground mt-1">Infrastructure health, deployments, and data pipeline monitoring</p>
      </header>

      {/* DORA Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Deploy Frequency", ...doraMetrics.deployFrequency, icon: Rocket },
          { label: "Lead Time", ...doraMetrics.leadTime, icon: Clock },
          { label: "Change Failure Rate", ...doraMetrics.changeFailureRate, icon: AlertTriangle },
          { label: "MTTR", ...doraMetrics.mttr, icon: Timer },
        ].map((m, i) => (
          <Card key={i} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{m.label}</span>
                <m.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-foreground">{m.value}</span>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${m.trend < 0 ? "text-green-600" : "text-red-500"}`}>
                  {m.trend < 0 ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
                  {Math.abs(m.trend)}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Health */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" /> Service Health
            </CardTitle>
            <div className="flex gap-3 text-sm">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" />{healthyCount} Healthy</span>
              <span className="flex items-center gap-1.5"><AlertTriangle className="h-4 w-4 text-yellow-500" />{degradedCount} Degraded</span>
              <span className="flex items-center gap-1.5"><XCircle className="h-4 w-4 text-red-500" />{downCount} Down</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {serviceHealthData.map((svc) => (
              <div key={svc.name} className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm text-foreground">{svc.name}</span>
                  <Badge variant="outline" className={statusColors[svc.status]}>{svc.status}</Badge>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between"><span>Uptime</span><span className="font-mono text-foreground">{svc.uptime}%</span></div>
                  <div className="flex justify-between"><span>Latency</span><span className="font-mono text-foreground">{svc.latency}ms</span></div>
                  <div className="flex justify-between"><span>CPU</span>
                    <div className="flex items-center gap-2 w-24">
                      <Progress value={svc.cpu} className="h-1.5" />
                      <span className="font-mono text-foreground w-8 text-right">{svc.cpu}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between"><span>Memory</span>
                    <div className="flex items-center gap-2 w-24">
                      <Progress value={svc.memory} className="h-1.5" />
                      <span className="font-mono text-foreground w-8 text-right">{svc.memory}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deployments Chart */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-primary" /> Deployment Activity
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {totalDeploys} deploys · {totalFailures} failures ({((totalFailures / totalDeploys) * 100).toFixed(1)}%)
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deploymentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                />
                <Legend />
                <Bar dataKey="deployments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Deployments" />
                <Bar dataKey="failures" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Failures" />
                <Bar dataKey="rollbacks" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} name="Rollbacks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Data Pipelines */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" /> Data Pipelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Pipeline</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Success Rate</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Avg Duration</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Last Run</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Records</th>
                </tr>
              </thead>
              <tbody>
                {pipelineData.map((pipe) => (
                  <tr key={pipe.name} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2 font-medium text-foreground">{pipe.name}</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className={statusColors[pipe.status]}>{pipe.status}</Badge>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Progress value={pipe.successRate} className="h-1.5 w-16" />
                        <span className="font-mono text-foreground">{pipe.successRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono text-foreground">{pipe.avgDuration} min</td>
                    <td className="py-3 px-2 text-muted-foreground">{pipe.lastRun}</td>
                    <td className="py-3 px-2 text-right font-mono text-foreground">
                      {pipe.recordsProcessed > 0 ? `${(pipe.recordsProcessed / 1000000).toFixed(1)}M` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformStats;
