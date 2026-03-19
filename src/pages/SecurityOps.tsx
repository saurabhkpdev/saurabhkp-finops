import {
  Shield, ShieldAlert, ShieldCheck, Eye, Lock,
  AlertTriangle, CheckCircle2, XCircle, Database, FileWarning, KeyRound
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import {
  complianceData, accessEvents, threatEvents,
  alertTrendData, securitySummary, dataClassifications, governancePolicies
} from "@/data/securityData";

const severityColors: Record<string, string> = {
  critical: "bg-red-500/10 text-red-600 border-red-500/20",
  high: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  low: "bg-green-500/10 text-green-600 border-green-500/20",
};

const resultColors: Record<string, string> = {
  allowed: "bg-green-500/10 text-green-600 border-green-500/20",
  denied: "bg-red-500/10 text-red-600 border-red-500/20",
  flagged: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
};

const statusColors: Record<string, string> = {
  open: "bg-red-500/10 text-red-600 border-red-500/20",
  investigating: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  resolved: "bg-green-500/10 text-green-600 border-green-500/20",
};

const complianceStatusColors: Record<string, string> = {
  compliant: "bg-green-500/10 text-green-600 border-green-500/20",
  "at-risk": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "non-compliant": "bg-red-500/10 text-red-600 border-red-500/20",
};

const classificationColors: Record<string, string> = {
  public: "bg-green-500/10 text-green-600 border-green-500/20",
  internal: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  confidential: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  restricted: "bg-red-500/10 text-red-600 border-red-500/20",
};

const policyStatusColors: Record<string, string> = {
  enforced: "bg-green-500/10 text-green-600 border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  violated: "bg-red-500/10 text-red-600 border-red-500/20",
};

const SecurityOps = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Security & Data Governance</h1>
        <p className="text-muted-foreground mt-1">Data access controls, PII management, compliance monitoring, and threat detection</p>
      </header>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Open Threats", value: securitySummary.openThreats, icon: ShieldAlert, color: "text-red-500" },
          { label: "Critical Alerts", value: securitySummary.criticalAlerts, icon: AlertTriangle, color: "text-orange-500" },
          { label: "Compliance Score", value: `${securitySummary.complianceScore}%`, icon: ShieldCheck, color: "text-green-500" },
          { label: "Policy Violations", value: securitySummary.policyViolations, icon: Lock, color: "text-yellow-500" },
          { label: "Unmasked PII", value: securitySummary.unmaskedPiiColumns, icon: FileWarning, color: "text-red-500" },
          { label: "Stale Accounts", value: securitySummary.staleServiceAccounts, icon: KeyRound, color: "text-orange-500" },
        ].map((m, i) => (
          <Card key={i} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{m.label}</span>
                <m.icon className={`h-4 w-4 ${m.color}`} />
              </div>
              <span className="text-2xl font-bold text-foreground">{m.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Trends */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" /> Data Security Alert Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={alertTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                <Legend />
                <Area type="monotone" dataKey="critical" stackId="1" fill="hsl(0, 72%, 51%)" stroke="hsl(0, 72%, 51%)" fillOpacity={0.6} name="Critical" />
                <Area type="monotone" dataKey="high" stackId="1" fill="hsl(25, 95%, 53%)" stroke="hsl(25, 95%, 53%)" fillOpacity={0.6} name="High" />
                <Area type="monotone" dataKey="medium" stackId="1" fill="hsl(38, 92%, 50%)" stroke="hsl(38, 92%, 50%)" fillOpacity={0.6} name="Medium" />
                <Area type="monotone" dataKey="low" stackId="1" fill="hsl(142, 71%, 45%)" stroke="hsl(142, 71%, 45%)" fillOpacity={0.6} name="Low" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Data Classification + Governance Policies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Data Classification / PII */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" /> Data Classification & PII
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {dataClassifications.map((dc) => (
              <div key={`${dc.database}.${dc.schema}`} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-medium text-sm text-foreground">{dc.database}.{dc.schema}</span>
                  <Badge variant="outline" className={classificationColors[dc.classification]}>{dc.classification}</Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-muted-foreground mb-1">
                      <span>PII Masking Coverage</span>
                      <span className="font-mono text-foreground">{dc.maskedColumns}/{dc.piiColumns} columns</span>
                    </div>
                    <Progress value={(dc.maskedColumns / dc.piiColumns) * 100} className="h-1.5" />
                  </div>
                  {dc.unmaskedPii > 0 && (
                    <p className="text-red-500 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> {dc.unmaskedPii} unmasked PII columns
                    </p>
                  )}
                  <p className="text-muted-foreground">Scanned: {dc.lastScanned}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Governance Policies */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> Data Governance Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {governancePolicies.map((policy) => (
              <div key={policy.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-foreground">{policy.name}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs capitalize">{policy.category}</Badge>
                    <Badge variant="outline" className={policyStatusColors[policy.status]}>{policy.status}</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{policy.description}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{policy.violations > 0 ? `${policy.violations} violations` : "No violations"}</span>
                  <span>Checked: {policy.lastChecked}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Compliance + Threats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* Compliance Frameworks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Compliance Frameworks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceData.map((fw) => (
              <div key={fw.name} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{fw.name}</span>
                  <Badge variant="outline" className={complianceStatusColors[fw.status]}>{fw.status}</Badge>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <Progress value={fw.score} className="h-2 flex-1" />
                  <span className="text-sm font-mono font-bold text-foreground">{fw.score}%</span>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-green-500" />{fw.passing} passing</span>
                  <span className="flex items-center gap-1"><XCircle className="h-3 w-3 text-red-500" />{fw.failing} failing</span>
                  <span>Audited: {fw.lastAudit}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Threat Monitor */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" /> Active Data Threats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {threatEvents.map((threat) => (
              <div key={threat.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-foreground">{threat.type}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={severityColors[threat.severity]}>{threat.severity}</Badge>
                    <Badge variant="outline" className={statusColors[threat.status]}>{threat.status}</Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{threat.description}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Source: {threat.source}</span>
                  <span>{threat.timestamp}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Data Access Audit Log */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" /> Data Access Audit Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">User / Service</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Action</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Resource</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Result</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Risk</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {accessEvents.map((event) => (
                  <tr key={event.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-2 font-mono text-xs text-foreground">{event.user}</td>
                    <td className="py-3 px-2 font-mono text-xs text-foreground">{event.action}</td>
                    <td className="py-3 px-2 font-mono text-xs text-muted-foreground">{event.resource}</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className={resultColors[event.result]}>{event.result}</Badge>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className={severityColors[event.riskLevel]}>{event.riskLevel}</Badge>
                    </td>
                    <td className="py-3 px-2 text-right text-muted-foreground">{event.timestamp}</td>
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

export default SecurityOps;
