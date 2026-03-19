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

export interface DataClassification {
  database: string;
  schema: string;
  piiColumns: number;
  maskedColumns: number;
  unmaskedPii: number;
  classification: "public" | "internal" | "confidential" | "restricted";
  lastScanned: string;
}

export interface GovernancePolicy {
  id: string;
  name: string;
  category: "access" | "masking" | "retention" | "lineage";
  status: "enforced" | "warning" | "violated";
  violations: number;
  lastChecked: string;
  description: string;
}

export const complianceData: ComplianceFramework[] = [
  { name: "SOC 2 Type II", score: 94, status: "compliant", controls: 120, passing: 113, failing: 7, lastAudit: "2026-02-15" },
  { name: "GDPR – Data Residency", score: 91, status: "compliant", controls: 72, passing: 65, failing: 7, lastAudit: "2026-02-28" },
  { name: "HIPAA – PHI Controls", score: 88, status: "at-risk", controls: 85, passing: 75, failing: 10, lastAudit: "2026-01-20" },
  { name: "ISO 27001", score: 96, status: "compliant", controls: 114, passing: 109, failing: 5, lastAudit: "2026-03-01" },
];

export const accessEvents: AccessEvent[] = [
  { id: "1", user: "sarah.chen@company.com", action: "GRANT ROLE", resource: "SNOWFLAKE.ANALYTICS_ADMIN", result: "denied", timestamp: "2 min ago", riskLevel: "critical" },
  { id: "2", user: "etl-service@airflow", action: "COPY INTO", resource: "RAW.CLICKSTREAM.EVENTS", result: "allowed", timestamp: "8 min ago", riskLevel: "low" },
  { id: "3", user: "m.johnson@company.com", action: "SELECT *", resource: "ANALYTICS.PII.CUSTOMERS", result: "flagged", timestamp: "15 min ago", riskLevel: "high" },
  { id: "4", user: "dbt-cloud@service", action: "CREATE TABLE AS", resource: "ANALYTICS.MARTS.FCT_REVENUE", result: "allowed", timestamp: "22 min ago", riskLevel: "low" },
  { id: "5", user: "priya.p@company.com", action: "EXPORT DATA", resource: "ANALYTICS.MARTS.DIM_CUSTOMERS", result: "flagged", timestamp: "1 hr ago", riskLevel: "high" },
  { id: "6", user: "unknown@external.com", action: "LOGIN ATTEMPT", resource: "Snowflake Account", result: "denied", timestamp: "2 hr ago", riskLevel: "critical" },
  { id: "7", user: "kafka-connect@service", action: "INSERT", resource: "RAW.EVENTS.USER_ACTIONS", result: "allowed", timestamp: "3 hr ago", riskLevel: "low" },
  { id: "8", user: "l.thompson@company.com", action: "DROP TABLE", resource: "ANALYTICS.STAGING.STG_ORDERS", result: "denied", timestamp: "4 hr ago", riskLevel: "critical" },
];

export const threatEvents: ThreatEvent[] = [
  { id: "1", type: "Unauthorized PII Access", severity: "critical", source: "Snowflake Query Log", status: "open", timestamp: "10 min ago", description: "Unmasked PII columns accessed by non-privileged analyst role" },
  { id: "2", type: "Anomalous Data Export", severity: "high", source: "Snowflake", status: "investigating", timestamp: "25 min ago", description: "Unusual COPY INTO command exporting 2.4M customer records to external stage" },
  { id: "3", type: "Stale Service Account", severity: "medium", source: "IAM Audit", status: "investigating", timestamp: "1 hr ago", description: "Dormant Airflow service account with elevated warehouse privileges" },
  { id: "4", type: "Schema Drift Detected", severity: "medium", source: "dbt", status: "open", timestamp: "2 hr ago", description: "Upstream source table schema changed — 3 columns removed from raw.crm.contacts" },
  { id: "5", type: "Brute Force Login", severity: "high", source: "Snowflake Auth", status: "resolved", timestamp: "4 hr ago", description: "Multiple failed login attempts from IP 103.45.67.89 on Snowflake account" },
  { id: "6", type: "Data Retention Violation", severity: "low", source: "Governance Engine", status: "resolved", timestamp: "6 hr ago", description: "Staging tables older than 90-day retention policy not yet purged" },
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

export const dataClassifications: DataClassification[] = [
  { database: "ANALYTICS", schema: "PII", piiColumns: 24, maskedColumns: 22, unmaskedPii: 2, classification: "restricted", lastScanned: "1 hr ago" },
  { database: "ANALYTICS", schema: "MARTS", piiColumns: 8, maskedColumns: 8, unmaskedPii: 0, classification: "internal", lastScanned: "2 hr ago" },
  { database: "RAW", schema: "CRM", piiColumns: 32, maskedColumns: 28, unmaskedPii: 4, classification: "restricted", lastScanned: "30 min ago" },
  { database: "RAW", schema: "EVENTS", piiColumns: 6, maskedColumns: 6, unmaskedPii: 0, classification: "confidential", lastScanned: "15 min ago" },
  { database: "ANALYTICS", schema: "STAGING", piiColumns: 14, maskedColumns: 12, unmaskedPii: 2, classification: "confidential", lastScanned: "3 hr ago" },
];

export const governancePolicies: GovernancePolicy[] = [
  { id: "1", name: "PII Column Masking", category: "masking", status: "warning", violations: 8, lastChecked: "5 min ago", description: "All PII columns must have dynamic masking policies applied" },
  { id: "2", name: "Production Role Separation", category: "access", status: "enforced", violations: 0, lastChecked: "10 min ago", description: "ETL service accounts cannot have analyst-level read access" },
  { id: "3", name: "Staging Data Retention", category: "retention", status: "violated", violations: 12, lastChecked: "1 hr ago", description: "Staging tables must be purged after 90 days" },
  { id: "4", name: "Lineage Documentation", category: "lineage", status: "warning", violations: 5, lastChecked: "2 hr ago", description: "All mart-level tables must have documented upstream lineage" },
  { id: "5", name: "Cross-Account Access", category: "access", status: "enforced", violations: 0, lastChecked: "30 min ago", description: "No cross-account data shares without security review" },
];

export const securitySummary = {
  openThreats: 3,
  criticalAlerts: 2,
  complianceScore: 92,
  policyViolations: 25,
  unmaskedPiiColumns: 8,
  staleServiceAccounts: 4,
};
