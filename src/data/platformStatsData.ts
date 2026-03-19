export interface ServiceHealth {
  name: string;
  status: "healthy" | "degraded" | "down";
  uptime: number;
  latency: number;
  errorRate: number;
  cpu: number;
  memory: number;
  requests: number;
}

export interface DeploymentMetric {
  week: string;
  deployments: number;
  failures: number;
  rollbacks: number;
}

export interface PipelineMetric {
  name: string;
  status: "running" | "success" | "failed" | "queued";
  successRate: number;
  avgDuration: number;
  lastRun: string;
  recordsProcessed: number;
}

export const serviceHealthData: ServiceHealth[] = [
  { name: "API Gateway", status: "healthy", uptime: 99.98, latency: 45, errorRate: 0.02, cpu: 34, memory: 52, requests: 1240000 },
  { name: "Auth Service", status: "healthy", uptime: 99.99, latency: 28, errorRate: 0.01, cpu: 22, memory: 38, requests: 890000 },
  { name: "Data Pipeline", status: "degraded", uptime: 99.85, latency: 120, errorRate: 0.15, cpu: 78, memory: 82, requests: 450000 },
  { name: "ML Inference", status: "healthy", uptime: 99.92, latency: 210, errorRate: 0.08, cpu: 65, memory: 71, requests: 320000 },
  { name: "Notification Svc", status: "healthy", uptime: 99.97, latency: 35, errorRate: 0.03, cpu: 18, memory: 29, requests: 560000 },
  { name: "Search Engine", status: "down", uptime: 98.20, latency: 0, errorRate: 100, cpu: 0, memory: 0, requests: 0 },
  { name: "Cache Layer", status: "healthy", uptime: 99.99, latency: 3, errorRate: 0.005, cpu: 42, memory: 88, requests: 3200000 },
  { name: "Job Scheduler", status: "healthy", uptime: 99.95, latency: 55, errorRate: 0.05, cpu: 30, memory: 44, requests: 180000 },
];

export const deploymentData: DeploymentMetric[] = [
  { week: "W1", deployments: 18, failures: 2, rollbacks: 1 },
  { week: "W2", deployments: 24, failures: 1, rollbacks: 0 },
  { week: "W3", deployments: 15, failures: 3, rollbacks: 2 },
  { week: "W4", deployments: 22, failures: 0, rollbacks: 0 },
  { week: "W5", deployments: 28, failures: 2, rollbacks: 1 },
  { week: "W6", deployments: 20, failures: 1, rollbacks: 0 },
  { week: "W7", deployments: 31, failures: 1, rollbacks: 1 },
  { week: "W8", deployments: 26, failures: 0, rollbacks: 0 },
];

export const pipelineData: PipelineMetric[] = [
  { name: "ETL - Customer Data", status: "success", successRate: 98.5, avgDuration: 12, lastRun: "5 min ago", recordsProcessed: 2450000 },
  { name: "ETL - Transactions", status: "running", successRate: 99.1, avgDuration: 25, lastRun: "Running", recordsProcessed: 8900000 },
  { name: "ML - Feature Store", status: "success", successRate: 97.2, avgDuration: 45, lastRun: "1 hr ago", recordsProcessed: 1200000 },
  { name: "Analytics - Daily Agg", status: "failed", successRate: 94.8, avgDuration: 18, lastRun: "3 hr ago", recordsProcessed: 0 },
  { name: "Sync - CRM Export", status: "success", successRate: 99.8, avgDuration: 8, lastRun: "30 min ago", recordsProcessed: 340000 },
  { name: "ETL - Event Stream", status: "queued", successRate: 96.5, avgDuration: 35, lastRun: "Queued", recordsProcessed: 5600000 },
];

export const doraMetrics = {
  deployFrequency: { value: "3.2/day", trend: 12 },
  leadTime: { value: "2.4 hrs", trend: -8 },
  changeFailureRate: { value: "4.2%", trend: -15 },
  mttr: { value: "18 min", trend: -22 },
};
