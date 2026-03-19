export interface ServiceHealth {
  name: string;
  platform: "Snowflake" | "Airflow" | "dbt" | "Power BI" | "Tableau";
  status: "healthy" | "degraded" | "down";
  uptime: number;
  latency: number;
  errorRate: number;
  cpu: number;
  memory: number;
  throughput: string;
}

export interface DeploymentMetric {
  week: string;
  dbtRuns: number;
  dagDeploys: number;
  failures: number;
  rollbacks: number;
}

export interface PipelineMetric {
  name: string;
  platform: "Airflow" | "dbt" | "Snowflake" | "Power BI";
  status: "running" | "success" | "failed" | "queued";
  successRate: number;
  avgDuration: number;
  lastRun: string;
  recordsProcessed: number;
  dataFreshness: string;
}

export interface WarehouseMetric {
  name: string;
  size: string;
  status: "active" | "suspended" | "resizing";
  creditsUsed: number;
  creditBudget: number;
  avgQueueTime: number;
  queriesExecuted: number;
  spillToRemote: number;
}

export interface DataQualityMetric {
  table: string;
  database: string;
  testsTotal: number;
  testsPassing: number;
  testsFailing: number;
  rowCount: string;
  lastUpdated: string;
  freshness: "fresh" | "stale" | "critical";
}

export const serviceHealthData: ServiceHealth[] = [
  { name: "Snowflake", platform: "Snowflake", status: "healthy", uptime: 99.98, latency: 120, errorRate: 0.02, cpu: 45, memory: 62, throughput: "2.4TB/day" },
  { name: "Airflow Scheduler", platform: "Airflow", status: "healthy", uptime: 99.95, latency: 35, errorRate: 0.05, cpu: 58, memory: 72, throughput: "340 DAGs/hr" },
  { name: "Airflow Workers", platform: "Airflow", status: "degraded", uptime: 99.82, latency: 80, errorRate: 0.18, cpu: 88, memory: 85, throughput: "180 tasks/hr" },
  { name: "dbt Cloud", platform: "dbt", status: "healthy", uptime: 99.99, latency: 25, errorRate: 0.01, cpu: 32, memory: 44, throughput: "520 models/run" },
  { name: "Power BI", platform: "Power BI", status: "healthy", uptime: 99.96, latency: 180, errorRate: 0.04, cpu: 28, memory: 38, throughput: "12K queries/hr" },
  { name: "Tableau", platform: "Tableau", status: "healthy", uptime: 99.92, latency: 150, errorRate: 0.06, cpu: 35, memory: 42, throughput: "8K queries/hr" },
];

export const deploymentData: DeploymentMetric[] = [
  { week: "W1", dbtRuns: 42, dagDeploys: 12, failures: 3, rollbacks: 1 },
  { week: "W2", dbtRuns: 56, dagDeploys: 18, failures: 2, rollbacks: 0 },
  { week: "W3", dbtRuns: 38, dagDeploys: 8, failures: 5, rollbacks: 2 },
  { week: "W4", dbtRuns: 61, dagDeploys: 22, failures: 1, rollbacks: 0 },
  { week: "W5", dbtRuns: 48, dagDeploys: 15, failures: 4, rollbacks: 1 },
  { week: "W6", dbtRuns: 55, dagDeploys: 20, failures: 2, rollbacks: 0 },
  { week: "W7", dbtRuns: 70, dagDeploys: 25, failures: 1, rollbacks: 1 },
  { week: "W8", dbtRuns: 63, dagDeploys: 19, failures: 0, rollbacks: 0 },
];

export const pipelineData: PipelineMetric[] = [
  { name: "Raw → Staging (Customers)", platform: "Airflow", status: "success", successRate: 98.5, avgDuration: 12, lastRun: "5 min ago", recordsProcessed: 2450000, dataFreshness: "5 min" },
  { name: "Staging → Marts (Revenue)", platform: "dbt", status: "running", successRate: 99.1, avgDuration: 25, lastRun: "Running", recordsProcessed: 8900000, dataFreshness: "Running" },
  { name: "Clickstream Ingestion", platform: "Kafka", status: "success", successRate: 99.8, avgDuration: 0, lastRun: "Streaming", recordsProcessed: 45000000, dataFreshness: "Real-time" },
  { name: "Feature Store Refresh", platform: "Spark", status: "failed", successRate: 94.2, avgDuration: 45, lastRun: "3 hr ago", recordsProcessed: 0, dataFreshness: "3 hrs (stale)" },
  { name: "CRM Sync → Snowflake", platform: "Airflow", status: "success", successRate: 97.8, avgDuration: 18, lastRun: "30 min ago", recordsProcessed: 340000, dataFreshness: "30 min" },
  { name: "Event Stream → Data Lake", platform: "Kafka", status: "queued", successRate: 96.5, avgDuration: 0, lastRun: "Queued", recordsProcessed: 5600000, dataFreshness: "Pending" },
  { name: "dbt Nightly Full Refresh", platform: "dbt", status: "success", successRate: 95.3, avgDuration: 120, lastRun: "6 hr ago", recordsProcessed: 28000000, dataFreshness: "6 hrs" },
  { name: "Anomaly Detection Pipeline", platform: "Spark", status: "success", successRate: 93.8, avgDuration: 60, lastRun: "1 hr ago", recordsProcessed: 1200000, dataFreshness: "1 hr" },
];

export const warehouseData: WarehouseMetric[] = [
  { name: "ANALYTICS_WH", size: "X-Large", status: "active", creditsUsed: 342, creditBudget: 400, avgQueueTime: 1.2, queriesExecuted: 45200, spillToRemote: 2.1 },
  { name: "ETL_WH", size: "Large", status: "active", creditsUsed: 218, creditBudget: 250, avgQueueTime: 0.8, queriesExecuted: 12800, spillToRemote: 0.5 },
  { name: "DBT_WH", size: "Medium", status: "active", creditsUsed: 156, creditBudget: 200, avgQueueTime: 0.3, queriesExecuted: 8900, spillToRemote: 0.1 },
  { name: "REPORTING_WH", size: "Small", status: "suspended", creditsUsed: 45, creditBudget: 100, avgQueueTime: 0, queriesExecuted: 3200, spillToRemote: 0 },
  { name: "ML_WH", size: "2X-Large", status: "resizing", creditsUsed: 480, creditBudget: 500, avgQueueTime: 3.5, queriesExecuted: 2100, spillToRemote: 8.4 },
];

export const dataQualityData: DataQualityMetric[] = [
  { table: "dim_customers", database: "ANALYTICS", testsTotal: 12, testsPassing: 12, testsFailing: 0, rowCount: "2.4M", lastUpdated: "5 min ago", freshness: "fresh" },
  { table: "fct_orders", database: "ANALYTICS", testsTotal: 18, testsPassing: 16, testsFailing: 2, rowCount: "45.2M", lastUpdated: "30 min ago", freshness: "fresh" },
  { table: "fct_revenue", database: "ANALYTICS", testsTotal: 15, testsPassing: 15, testsFailing: 0, rowCount: "12.8M", lastUpdated: "1 hr ago", freshness: "fresh" },
  { table: "stg_clickstream", database: "RAW", testsTotal: 8, testsPassing: 5, testsFailing: 3, rowCount: "890M", lastUpdated: "4 hr ago", freshness: "stale" },
  { table: "dim_products", database: "ANALYTICS", testsTotal: 10, testsPassing: 10, testsFailing: 0, rowCount: "52K", lastUpdated: "2 hr ago", freshness: "fresh" },
  { table: "fct_sessions", database: "ANALYTICS", testsTotal: 14, testsPassing: 8, testsFailing: 6, rowCount: "1.2B", lastUpdated: "12 hr ago", freshness: "critical" },
];

export const doraMetrics = {
  deployFrequency: { value: "8.2/day", trend: 18, description: "dbt + Airflow deploys" },
  leadTime: { value: "1.8 hrs", trend: -12, description: "Code to production" },
  changeFailureRate: { value: "3.8%", trend: -20, description: "Failed pipeline runs" },
  mttr: { value: "14 min", trend: -28, description: "Pipeline recovery time" },
};

export const dataVolumeMetrics = {
  totalIngested: "4.2 TB",
  dailyGrowth: "+128 GB",
  activeTablesCount: 1240,
  staleTablesCount: 45,
};

export interface DatasetMetric {
  platform: string;
  icon: string;
  datasets: number;
}

export const datasetMetrics: DatasetMetric[] = [
  { platform: "Snowflake", icon: "❄️", datasets: 4820 },
  { platform: "AWS S3", icon: "☁️", datasets: 1340 },
  { platform: "Power BI", icon: "📊", datasets: 185 },
  { platform: "Tableau", icon: "📈", datasets: 142 },
  { platform: "dbt", icon: "🔶", datasets: 520 },
  { platform: "Kafka", icon: "📡", datasets: 386 },
];

export interface DataProductMetric {
  category: string;
  icon: string;
  count: number;
}

export const dataProductMetrics: DataProductMetric[] = [
  { category: "Dashboards", icon: "📊", count: 342 },
  { category: "ML Models", icon: "🤖", count: 87 },
  { category: "Data APIs", icon: "🔌", count: 124 },
  { category: "Reports", icon: "📄", count: 265 },
  { category: "Data Shares", icon: "🔗", count: 58 },
];

export interface ProductUserMetric {
  product: string;
  icon: string;
  totalUsers: number;
  activeUsers: number;
  trend: number;
}

export const productUsersData: ProductUserMetric[] = [
  { product: "Snowflake", icon: "❄️", totalUsers: 342, activeUsers: 285, trend: 12 },
  { product: "AWS", icon: "☁️", totalUsers: 128, activeUsers: 98, trend: 5 },
  { product: "Astronomer", icon: "🚀", totalUsers: 86, activeUsers: 72, trend: 18 },
  { product: "Microsoft Fabric", icon: "🟦", totalUsers: 215, activeUsers: 178, trend: -3 },
];
