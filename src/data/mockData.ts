export interface MonthlyData {
  month: string;
  cost: number;
  budget: number;
}

export interface PlatformData {
  name: string;
  cost: number;
  budget: number;
  trend: number;
  services: ServiceData[];
}

export interface ServiceData {
  name: string;
  cost: number;
  percentage: number;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  department: string;
  totalCost: number;
  platform: string;
  trend: number;
}

export const monthlyData: MonthlyData[] = [
  { month: "Jan", cost: 42500, budget: 45000 },
  { month: "Feb", cost: 38200, budget: 45000 },
  { month: "Mar", cost: 51800, budget: 45000 },
  { month: "Apr", cost: 43100, budget: 48000 },
  { month: "May", cost: 47600, budget: 48000 },
  { month: "Jun", cost: 52300, budget: 48000 },
  { month: "Jul", cost: 49800, budget: 50000 },
  { month: "Aug", cost: 54200, budget: 50000 },
  { month: "Sep", cost: 48900, budget: 52000 },
  { month: "Oct", cost: 56100, budget: 52000 },
  { month: "Nov", cost: 53400, budget: 55000 },
  { month: "Dec", cost: 58700, budget: 55000 },
];

export const platformData: PlatformData[] = [
  {
    name: "Snowflake",
    cost: 215400,
    budget: 240000,
    trend: -5.2,
    services: [
      { name: "Compute Credits", cost: 128000, percentage: 59.4 },
      { name: "Storage", cost: 45200, percentage: 21.0 },
      { name: "Data Transfer", cost: 28400, percentage: 13.2 },
      { name: "Serverless Features", cost: 13800, percentage: 6.4 },
    ],
  },
  {
    name: "AWS",
    cost: 186200,
    budget: 200000,
    trend: 8.3,
    services: [
      { name: "EC2 Instances", cost: 72400, percentage: 38.9 },
      { name: "S3 Storage", cost: 38600, percentage: 20.7 },
      { name: "RDS Database", cost: 42100, percentage: 22.6 },
      { name: "Lambda", cost: 18900, percentage: 10.1 },
      { name: "Other Services", cost: 14200, percentage: 7.7 },
    ],
  },
  {
    name: "Astronomer",
    cost: 78500,
    budget: 85000,
    trend: 2.1,
    services: [
      { name: "Airflow Runtime", cost: 48200, percentage: 61.4 },
      { name: "Worker Nodes", cost: 21800, percentage: 27.8 },
      { name: "Support", cost: 8500, percentage: 10.8 },
    ],
  },
];

export const userData: UserData[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    department: "Data Engineering",
    totalCost: 45200,
    platform: "Snowflake",
    trend: 12.5,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "m.johnson@company.com",
    department: "Analytics",
    totalCost: 38900,
    platform: "AWS",
    trend: -3.2,
  },
  {
    id: "3",
    name: "Priya Patel",
    email: "priya.p@company.com",
    department: "ML Platform",
    totalCost: 35600,
    platform: "Astronomer",
    trend: 8.7,
  },
  {
    id: "4",
    name: "James Wilson",
    email: "j.wilson@company.com",
    department: "Data Engineering",
    totalCost: 31200,
    platform: "Astronomer",
    trend: -1.5,
  },
  {
    id: "5",
    name: "Emily Rodriguez",
    email: "e.rodriguez@company.com",
    department: "BI Team",
    totalCost: 28400,
    platform: "Snowflake",
    trend: 5.3,
  },
  {
    id: "6",
    name: "David Kim",
    email: "d.kim@company.com",
    department: "Infrastructure",
    totalCost: 24800,
    platform: "AWS",
    trend: 15.2,
  },
  {
    id: "7",
    name: "Lisa Thompson",
    email: "l.thompson@company.com",
    department: "Data Science",
    totalCost: 22100,
    platform: "Snowflake",
    trend: -8.4,
  },
  {
    id: "8",
    name: "Alex Morgan",
    email: "a.morgan@company.com",
    department: "Analytics",
    totalCost: 19500,
    platform: "AWS",
    trend: 2.1,
  },
];

export const yearlyTotal = platformData.reduce((acc, p) => acc + p.cost, 0);
export const yearlyBudget = platformData.reduce((acc, p) => acc + p.budget, 0);
export const budgetUtilization = ((yearlyTotal / yearlyBudget) * 100).toFixed(1);
