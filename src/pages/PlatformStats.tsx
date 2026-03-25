import { useMemo } from "react";
import {
  Activity, Server, Rocket, Clock, AlertTriangle,
  CheckCircle2, XCircle, Timer, Database, ArrowDown, ArrowUp,
  HardDrive, Gauge, BarChart3, Layers, Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import {
  serviceHealthData, deploymentData, pipelineData, doraMetrics,
  warehouseData, dataQualityData, dataVolumeMetrics, productUsersData, datasetMetrics, dataProductMetrics
} from "@/data/platformStatsData";

const statusColors: Record<string, string> = {
  healthy: "bg-green-500/10 text-green-600 border-green-500/20",
  degraded: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  down: "bg-red-500/10 text-red-600 border-red-500/20",
  running: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  success: "bg-green-500/10 text-green-600 border-green-500/20",
  failed: "bg-red-500/10 text-red-600 border-red-500/20",
  queued: "bg-muted text-muted-foreground border-border",
  active: "bg-green-500/10 text-green-600 border-green-500/20",
  suspended: "bg-muted text-muted-foreground border-border",
  resizing: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

const freshnessColors: Record<string, string> = {
  fresh: "bg-green-500/10 text-green-600 border-green-500/20",
  stale: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  critical: "bg-red-500/10 text-red-600 border-red-500/20",
};

const platformIcons: Record<string, string> = {
  Snowflake: "❄️",
  Airflow: "🌀",
  "Power BI": "📊",
  Tableau: "📈",
};

const PlatformStats = () => {
  const healthyCount = serviceHealthData.filter(s => s.status === "healthy").length;
  const degradedCount = serviceHealthData.filter(s => s.status === "degraded").length;
  const downCount = serviceHealthData.filter(s => s.status === "down").length;

  const totalPipelineRuns = useMemo(() => deploymentData.reduce((a, d) => a + d.pipelineRuns, 0), []);
  const totalDagDeploys = useMemo(() => deploymentData.reduce((a, d) => a + d.dagDeploys, 0), []);
  const totalFailures = useMemo(() => deploymentData.reduce((a, d) => a + d.failures, 0), []);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Platform Statistics</h1>
        <p className="text-muted-foreground mt-1">Data infrastructure health, pipeline monitoring, and warehouse performance</p>
      </header>
      {/* Summary Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Total Active Users */}
        <Card className="animate-fade-in">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Active Users</p>
                <p className="text-3xl font-bold text-foreground">
                  {productUsersData.reduce((sum, p) => sum + p.activeUsers, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productUsersData.map((p, i) => (
                <div key={i} className="text-center">
                  <span className="text-lg">{p.icon}</span>
                  <p className="text-xs text-muted-foreground truncate">{p.product}</p>
                  <p className="text-sm font-semibold text-foreground">{p.activeUsers}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Datasets */}
        <Card className="animate-fade-in">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Datasets</p>
                <p className="text-3xl font-bold text-foreground">
                  {datasetMetrics.reduce((sum, d) => sum + d.datasets, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {datasetMetrics.map((d, i) => (
                <div key={i} className="text-center">
                  <span className="text-lg">{d.icon}</span>
                  <p className="text-xs text-muted-foreground truncate">{d.platform}</p>
                  <p className="text-sm font-semibold text-foreground">{d.datasets.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Total Data Products */}
        <Card className="animate-fade-in">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Data Products</p>
                <p className="text-3xl font-bold text-foreground">
                  {dataProductMetrics.reduce((sum, d) => sum + d.count, 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {dataProductMetrics.map((d, i) => (
                <div key={i} className="text-center">
                  <span className="text-lg">{d.icon}</span>
                  <p className="text-xs text-muted-foreground truncate">{d.category}</p>
                  <p className="text-sm font-semibold text-foreground">{d.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Total Users per Product */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {productUsersData.map((p, i) => (
          <Card key={i} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-sm font-medium text-foreground">{p.product}</span>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{p.totalUsers.toLocaleString()}</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">{p.activeUsers} active</span>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${p.trend >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {p.trend >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(p.trend)}%
                </span>
              </div>
              <Progress value={(p.activeUsers / p.totalUsers) * 100} className="mt-2 h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DORA / Pipeline Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Pipeline Deploy Freq", ...doraMetrics.deployFrequency, icon: Rocket },
          { label: "Lead Time to Prod", ...doraMetrics.leadTime, icon: Clock },
          { label: "Pipeline Failure Rate", ...doraMetrics.changeFailureRate, icon: AlertTriangle },
          { label: "Pipeline MTTR", ...doraMetrics.mttr, icon: Timer },
        ].map((m, i) => (
          <Card key={i} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-1">
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
              <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Volume Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Ingested Today", value: dataVolumeMetrics.totalIngested, icon: HardDrive },
          { label: "Daily Growth", value: dataVolumeMetrics.dailyGrowth, icon: BarChart3 },
          { label: "Active Tables", value: dataVolumeMetrics.activeTablesCount.toLocaleString(), icon: Layers },
          { label: "Stale Tables", value: dataVolumeMetrics.staleTablesCount.toString(), icon: AlertTriangle },
        ].map((m, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-3">
              <m.icon className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-lg font-bold text-foreground">{m.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Health */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" /> Data Infrastructure Health
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
                  <span className="font-medium text-sm text-foreground flex items-center gap-1.5">
                    <span>{platformIcons[svc.platform]}</span> {svc.name}
                  </span>
                  <Badge variant="outline" className={statusColors[svc.status]}>{svc.status}</Badge>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between"><span>Uptime</span><span className="font-mono text-foreground">{svc.uptime}%</span></div>
                  <div className="flex justify-between"><span>Throughput</span><span className="font-mono text-foreground">{svc.throughput}</span></div>
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

      {/* Snowflake Warehouses */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            ❄️ <span>Snowflake Warehouse Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {warehouseData.map((wh) => (
              <div key={wh.name} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-medium text-sm text-foreground">{wh.name}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">{wh.size}</Badge>
                    <Badge variant="outline" className={statusColors[wh.status]}>{wh.status}</Badge>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Credit Usage</span>
                      <span className="font-mono text-foreground">{wh.creditsUsed} / {wh.creditBudget}</span>
                    </div>
                    <Progress value={(wh.creditsUsed / wh.creditBudget) * 100} className="h-1.5" />
                  </div>
                  <div className="flex justify-between"><span>Avg Queue Time</span><span className="font-mono text-foreground">{wh.avgQueueTime}s</span></div>
                  <div className="flex justify-between"><span>Queries Executed</span><span className="font-mono text-foreground">{wh.queriesExecuted.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Spill to Remote</span><span className="font-mono text-foreground">{wh.spillToRemote}%</span></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deployment Activity */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" /> Pipeline Deployment Activity
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {totalDbtRuns} dbt runs · {totalDagDeploys} DAG deploys · {totalFailures} failures
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
                <Bar dataKey="dbtRuns" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="dbt Runs" />
                <Bar dataKey="dagDeploys" fill="hsl(var(--accent-foreground))" radius={[4, 4, 0, 0]} name="DAG Deploys" />
                <Bar dataKey="failures" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Failures" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Data Pipelines */}
      <Card className="mb-8">
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
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Platform</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Success Rate</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Duration</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Freshness</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Records</th>
                </tr>
              </thead>
              <tbody>
                {pipelineData.map((pipe) => (
                  <tr key={pipe.name} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2 font-medium text-foreground">{pipe.name}</td>
                    <td className="py-3 px-2">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        {platformIcons[pipe.platform]} {pipe.platform}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className={statusColors[pipe.status]}>{pipe.status}</Badge>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Progress value={pipe.successRate} className="h-1.5 w-16" />
                        <span className="font-mono text-foreground">{pipe.successRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono text-foreground">
                      {pipe.avgDuration > 0 ? `${pipe.avgDuration} min` : "Streaming"}
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{pipe.dataFreshness}</td>
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

      {/* Data Quality (dbt Tests) */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            🔶 <span>Data Quality — dbt Tests</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Table</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Database</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Tests</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Freshness</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Row Count</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {dataQualityData.map((tbl) => (
                  <tr key={tbl.table} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2 font-mono font-medium text-foreground">{tbl.table}</td>
                    <td className="py-3 px-2 text-muted-foreground">{tbl.database}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="h-3 w-3" />{tbl.testsPassing}</span>
                        {tbl.testsFailing > 0 && (
                          <span className="flex items-center gap-1 text-red-500"><XCircle className="h-3 w-3" />{tbl.testsFailing}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className={freshnessColors[tbl.freshness]}>{tbl.freshness}</Badge>
                    </td>
                    <td className="py-3 px-2 font-mono text-foreground">{tbl.rowCount}</td>
                    <td className="py-3 px-2 text-right text-muted-foreground">{tbl.lastUpdated}</td>
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
