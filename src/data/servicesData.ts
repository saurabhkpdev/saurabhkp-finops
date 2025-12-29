export interface ServiceDetail {
  id: string;
  name: string;
  platform: "Snowflake" | "AWS" | "Astronomer";
  description: string;
  monthlyCost: number;
  trend: number;
  usage: {
    metric: string;
    value: string;
    unit: string;
  }[];
  optimizations: {
    title: string;
    description: string;
    potentialSavings: number;
    difficulty: "Easy" | "Medium" | "Hard";
    impact: "Low" | "Medium" | "High";
  }[];
  usagePattern: {
    peakHours: string;
    avgUtilization: number;
    idleTime: number;
  };
}

export const servicesData: ServiceDetail[] = [
  // Snowflake Services
  {
    id: "sf-compute",
    name: "Compute",
    platform: "Snowflake",
    description: "Virtual warehouses for query processing and data transformations",
    monthlyCost: 18500,
    trend: 12,
    usage: [
      { metric: "Warehouses", value: "8", unit: "active" },
      { metric: "Credits Used", value: "4,250", unit: "credits/month" },
      { metric: "Avg Query Time", value: "2.3", unit: "seconds" },
    ],
    optimizations: [
      {
        title: "Enable Auto-Suspend",
        description: "Configure warehouses to auto-suspend after 1 minute of inactivity instead of 5 minutes",
        potentialSavings: 2200,
        difficulty: "Easy",
        impact: "Medium",
      },
      {
        title: "Right-size Warehouses",
        description: "Downgrade 3 underutilized XL warehouses to Large based on query patterns",
        potentialSavings: 4500,
        difficulty: "Medium",
        impact: "High",
      },
      {
        title: "Use Multi-cluster Warehouses",
        description: "Replace static large warehouses with auto-scaling multi-cluster for variable workloads",
        potentialSavings: 3000,
        difficulty: "Hard",
        impact: "High",
      },
    ],
    usagePattern: {
      peakHours: "9 AM - 11 AM, 2 PM - 4 PM",
      avgUtilization: 68,
      idleTime: 22,
    },
  },
  {
    id: "sf-storage",
    name: "Storage",
    platform: "Snowflake",
    description: "Data storage for tables, stages, and time travel retention",
    monthlyCost: 8200,
    trend: 5,
    usage: [
      { metric: "Total Storage", value: "45", unit: "TB" },
      { metric: "Time Travel", value: "12", unit: "TB" },
      { metric: "Fail-safe", value: "8", unit: "TB" },
    ],
    optimizations: [
      {
        title: "Reduce Time Travel Retention",
        description: "Reduce time travel from 90 days to 14 days for non-critical tables",
        potentialSavings: 1500,
        difficulty: "Easy",
        impact: "Medium",
      },
      {
        title: "Archive Cold Data",
        description: "Move historical data older than 2 years to external stage storage",
        potentialSavings: 2000,
        difficulty: "Medium",
        impact: "Medium",
      },
    ],
    usagePattern: {
      peakHours: "Continuous",
      avgUtilization: 85,
      idleTime: 0,
    },
  },
  {
    id: "sf-transfer",
    name: "Data Transfer",
    platform: "Snowflake",
    description: "Cross-region and cross-cloud data replication and transfer",
    monthlyCost: 3300,
    trend: -3,
    usage: [
      { metric: "Outbound", value: "2.5", unit: "TB/month" },
      { metric: "Cross-region", value: "1.2", unit: "TB/month" },
      { metric: "Replication", value: "800", unit: "GB/month" },
    ],
    optimizations: [
      {
        title: "Optimize Data Sharing",
        description: "Use secure data sharing instead of data copies for partner access",
        potentialSavings: 800,
        difficulty: "Medium",
        impact: "Low",
      },
    ],
    usagePattern: {
      peakHours: "12 AM - 6 AM (ETL windows)",
      avgUtilization: 45,
      idleTime: 40,
    },
  },
  // AWS Services
  {
    id: "aws-ec2",
    name: "EC2",
    platform: "AWS",
    description: "Elastic compute instances for application hosting and processing",
    monthlyCost: 12400,
    trend: 8,
    usage: [
      { metric: "Instances", value: "47", unit: "running" },
      { metric: "vCPUs", value: "188", unit: "total" },
      { metric: "Memory", value: "752", unit: "GB" },
    ],
    optimizations: [
      {
        title: "Convert to Reserved Instances",
        description: "Purchase 1-year reserved instances for 23 stable workloads",
        potentialSavings: 4200,
        difficulty: "Easy",
        impact: "High",
      },
      {
        title: "Use Spot Instances",
        description: "Migrate batch processing workloads to spot instances with 70% savings",
        potentialSavings: 2800,
        difficulty: "Medium",
        impact: "High",
      },
      {
        title: "Terminate Idle Instances",
        description: "Identify and terminate 8 instances with <5% average CPU utilization",
        potentialSavings: 1600,
        difficulty: "Easy",
        impact: "Medium",
      },
    ],
    usagePattern: {
      peakHours: "8 AM - 6 PM weekdays",
      avgUtilization: 42,
      idleTime: 35,
    },
  },
  {
    id: "aws-s3",
    name: "S3",
    platform: "AWS",
    description: "Object storage for data lakes, backups, and static assets",
    monthlyCost: 4800,
    trend: 15,
    usage: [
      { metric: "Storage", value: "120", unit: "TB" },
      { metric: "Requests", value: "45M", unit: "/month" },
      { metric: "Buckets", value: "34", unit: "active" },
    ],
    optimizations: [
      {
        title: "Enable Intelligent Tiering",
        description: "Automatically move infrequently accessed objects to cheaper storage classes",
        potentialSavings: 1200,
        difficulty: "Easy",
        impact: "Medium",
      },
      {
        title: "Lifecycle Policies",
        description: "Archive objects older than 90 days to Glacier Deep Archive",
        potentialSavings: 1800,
        difficulty: "Easy",
        impact: "High",
      },
      {
        title: "Delete Incomplete Uploads",
        description: "Add lifecycle rule to abort incomplete multipart uploads after 7 days",
        potentialSavings: 200,
        difficulty: "Easy",
        impact: "Low",
      },
    ],
    usagePattern: {
      peakHours: "Continuous",
      avgUtilization: 100,
      idleTime: 0,
    },
  },
  {
    id: "aws-rds",
    name: "RDS",
    platform: "AWS",
    description: "Managed relational database service for PostgreSQL and MySQL",
    monthlyCost: 6200,
    trend: 3,
    usage: [
      { metric: "Instances", value: "12", unit: "running" },
      { metric: "Storage", value: "2.4", unit: "TB" },
      { metric: "IOPS", value: "15,000", unit: "provisioned" },
    ],
    optimizations: [
      {
        title: "Use Aurora Serverless",
        description: "Migrate dev/test databases to Aurora Serverless for automatic scaling",
        potentialSavings: 1500,
        difficulty: "Hard",
        impact: "Medium",
      },
      {
        title: "Right-size Instances",
        description: "Downgrade 4 over-provisioned instances based on CloudWatch metrics",
        potentialSavings: 1200,
        difficulty: "Medium",
        impact: "Medium",
      },
    ],
    usagePattern: {
      peakHours: "9 AM - 5 PM weekdays",
      avgUtilization: 55,
      idleTime: 25,
    },
  },
  {
    id: "aws-lambda",
    name: "Lambda",
    platform: "AWS",
    description: "Serverless compute for event-driven functions and APIs",
    monthlyCost: 1600,
    trend: 22,
    usage: [
      { metric: "Invocations", value: "125M", unit: "/month" },
      { metric: "Duration", value: "850", unit: "avg ms" },
      { metric: "Functions", value: "89", unit: "deployed" },
    ],
    optimizations: [
      {
        title: "Optimize Memory Allocation",
        description: "Right-size memory for 34 functions to reduce cost without impacting performance",
        potentialSavings: 400,
        difficulty: "Medium",
        impact: "Low",
      },
      {
        title: "Use Provisioned Concurrency",
        description: "Replace always-warm EC2 instances with provisioned concurrency for critical APIs",
        potentialSavings: 300,
        difficulty: "Medium",
        impact: "Low",
      },
    ],
    usagePattern: {
      peakHours: "Variable, event-driven",
      avgUtilization: 78,
      idleTime: 0,
    },
  },
  // Astronomer Services
  {
    id: "astro-runtime",
    name: "Runtime",
    platform: "Astronomer",
    description: "Airflow runtime environments for DAG execution",
    monthlyCost: 4200,
    trend: 10,
    usage: [
      { metric: "Deployments", value: "6", unit: "active" },
      { metric: "DAG Runs", value: "12,500", unit: "/month" },
      { metric: "Tasks", value: "185,000", unit: "/month" },
    ],
    optimizations: [
      {
        title: "Consolidate Deployments",
        description: "Merge 2 low-usage deployments into existing environments",
        potentialSavings: 800,
        difficulty: "Medium",
        impact: "Medium",
      },
      {
        title: "Optimize Scheduler Resources",
        description: "Reduce scheduler resources for deployments with <100 daily DAG runs",
        potentialSavings: 500,
        difficulty: "Easy",
        impact: "Low",
      },
    ],
    usagePattern: {
      peakHours: "12 AM - 8 AM (batch jobs)",
      avgUtilization: 62,
      idleTime: 20,
    },
  },
  {
    id: "astro-workers",
    name: "Workers",
    platform: "Astronomer",
    description: "Celery and Kubernetes workers for task execution",
    monthlyCost: 3800,
    trend: 5,
    usage: [
      { metric: "Worker Nodes", value: "18", unit: "active" },
      { metric: "Concurrency", value: "72", unit: "slots" },
      { metric: "Queue Depth", value: "15", unit: "avg tasks" },
    ],
    optimizations: [
      {
        title: "Enable Worker Autoscaling",
        description: "Configure KEDA-based autoscaling to scale workers based on queue depth",
        potentialSavings: 1200,
        difficulty: "Medium",
        impact: "High",
      },
      {
        title: "Use Smaller Worker Pools",
        description: "Create specialized small worker pools for lightweight tasks",
        potentialSavings: 600,
        difficulty: "Medium",
        impact: "Medium",
      },
    ],
    usagePattern: {
      peakHours: "1 AM - 6 AM (ETL processing)",
      avgUtilization: 58,
      idleTime: 30,
    },
  },
  {
    id: "astro-storage",
    name: "Logs & Metrics",
    platform: "Astronomer",
    description: "Log storage and metrics retention for monitoring and debugging",
    monthlyCost: 1000,
    trend: 8,
    usage: [
      { metric: "Log Volume", value: "450", unit: "GB/month" },
      { metric: "Retention", value: "30", unit: "days" },
      { metric: "Metrics", value: "2.5M", unit: "data points" },
    ],
    optimizations: [
      {
        title: "Reduce Log Verbosity",
        description: "Change log level from DEBUG to INFO for stable DAGs",
        potentialSavings: 200,
        difficulty: "Easy",
        impact: "Low",
      },
      {
        title: "Archive Old Logs",
        description: "Export logs older than 7 days to S3 for long-term storage",
        potentialSavings: 150,
        difficulty: "Easy",
        impact: "Low",
      },
    ],
    usagePattern: {
      peakHours: "Continuous",
      avgUtilization: 100,
      idleTime: 0,
    },
  },
];

export const getTotalPotentialSavings = () => {
  return servicesData.reduce((total, service) => {
    return total + service.optimizations.reduce((sum, opt) => sum + opt.potentialSavings, 0);
  }, 0);
};

export const getServicesByPlatform = (platform: string) => {
  return servicesData.filter((s) => s.platform === platform);
};
