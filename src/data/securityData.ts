export interface ComplianceFramework {
  name: string;
  score: number;
  status: "compliant" | "at-risk" | "non-compliant";
  controls: number;
  passing: number;
  failing: number;
  lastAudit: string;
}

export interface AccessEvent {
  id: string;
  user: string;
  action: string;
  resource: string;
  result: "allowed" | "denied" | "flagged";
  timestamp: string;
  riskLevel: "low" | "medium" | "high" | "critical";
}

export interface ThreatEvent {
  id: string;
  type: string;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  status: "open" | "investigating" | "resolved";
  timestamp: string;
  description: string;
}

export interface AlertTrend {
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export const complianceData: ComplianceFramework[] = [
  { name: "SOC 2 Type II", score: 94, status: "compliant", controls: 120, passing: 113, failing: 7, lastAudit: "2026-02-15" },
  { name: "HIPAA", score: 88, status: "at-risk", controls: 85, passing: 75, failing: 10, lastAudit: "2026-01-20" },
  { name: "ISO 27001", score: 96, status: "compliant", controls: 114, passing: 109, failing: 5, lastAudit: "2026-03-01" },
  { name: "GDPR", score: 91, status: "compliant", controls: 72, passing: 65, failing: 7, lastAudit: "2026-02-28" },
];

export const accessEvents: AccessEvent[] = [
  { id: "1", user: "sarah.chen@company.com", action: "Role Escalation", resource: "Production DB", result: "denied", timestamp: "2 min ago", riskLevel: "critical" },
  { id: "2", user: "m.johnson@company.com", action: "API Key Access", resource: "AWS Secrets Manager", result: "allowed", timestamp: "15 min ago", riskLevel: "medium" },
  { id: "3", user: "unknown@external.com", action: "Login Attempt", resource: "Admin Portal", result: "denied", timestamp: "32 min ago", riskLevel: "high" },
  { id: "4", user: "priya.p@company.com", action: "Data Export", resource: "Customer Table", result: "flagged", timestamp: "1 hr ago", riskLevel: "high" },
  { id: "5", user: "j.wilson@company.com", action: "SSH Access", resource: "Prod Server #3", result: "allowed", timestamp: "2 hr ago", riskLevel: "low" },
  { id: "6", user: "d.kim@company.com", action: "Policy Change", resource: "IAM Policies", result: "allowed", timestamp: "3 hr ago", riskLevel: "medium" },
  { id: "7", user: "bot@ci-cd.internal", action: "Deploy Token", resource: "K8s Cluster", result: "allowed", timestamp: "4 hr ago", riskLevel: "low" },
  { id: "8", user: "l.thompson@company.com", action: "Bulk Delete", resource: "S3 Bucket - Logs", result: "flagged", timestamp: "5 hr ago", riskLevel: "critical" },
];

export const threatEvents: ThreatEvent[] = [
  { id: "1", type: "Brute Force", severity: "high", source: "103.45.67.89", status: "investigating", timestamp: "10 min ago", description: "Multiple failed login attempts detected from suspicious IP" },
  { id: "2", type: "Data Exfiltration", severity: "critical", source: "Internal", status: "open", timestamp: "25 min ago", description: "Unusual data transfer volume detected from production database" },
  { id: "3", type: "Suspicious API Usage", severity: "medium", source: "API Gateway", status: "investigating", timestamp: "1 hr ago", description: "Abnormal API call patterns from service account" },
  { id: "4", type: "Port Scan", severity: "low", source: "45.12.34.56", status: "resolved", timestamp: "3 hr ago", description: "External port scanning activity detected on edge servers" },
  { id: "5", type: "Privilege Escalation", severity: "critical", source: "Internal", status: "open", timestamp: "4 hr ago", description: "Unauthorized attempt to modify IAM roles detected" },
  { id: "6", type: "Malware Detection", severity: "high", source: "Endpoint", status: "resolved", timestamp: "6 hr ago", description: "Potentially malicious file detected on developer workstation" },
];

export const alertTrendData: AlertTrend[] = [
  { date: "Mar 1", critical: 2, high: 5, medium: 12, low: 18 },
  { date: "Mar 4", critical: 1, high: 8, medium: 10, low: 22 },
  { date: "Mar 7", critical: 3, high: 6, medium: 15, low: 14 },
  { date: "Mar 10", critical: 0, high: 4, medium: 8, low: 20 },
  { date: "Mar 13", critical: 4, high: 9, medium: 11, low: 16 },
  { date: "Mar 16", critical: 2, high: 7, medium: 13, low: 19 },
  { date: "Mar 19", critical: 1, high: 3, medium: 9, low: 15 },
];

export const securitySummary = {
  openThreats: 3,
  criticalAlerts: 2,
  complianceScore: 92,
  policyViolations: 14,
};
