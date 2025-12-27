import { DollarSign, TrendingUp, Target, AlertTriangle } from "lucide-react";
import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MonthlyCostChart } from "@/components/dashboard/MonthlyCostChart";
import { PlatformCard } from "@/components/dashboard/PlatformCard";
import { ServiceBreakdown } from "@/components/dashboard/ServiceBreakdown";
import { TopUsersTable } from "@/components/dashboard/TopUsersTable";
import {
  platformData,
  yearlyTotal,
  yearlyBudget,
  budgetUtilization,
  monthlyData,
} from "@/data/mockData";

const Index = () => {
  const currentMonth = monthlyData[monthlyData.length - 1];
  const lastMonth = monthlyData[monthlyData.length - 2];
  const monthlyTrend = ((currentMonth.cost - lastMonth.cost) / lastMonth.cost) * 100;
  
  const overBudgetMonths = monthlyData.filter((m) => m.cost > m.budget).length;

  return (
    <div className="min-h-screen bg-background">

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Yearly Cost"
            value={`$${(yearlyTotal / 1000).toFixed(0)}k`}
            subtitle="Across all platforms"
            icon={<DollarSign className="h-5 w-5" />}
            delay={0}
          />
          <MetricCard
            title="Monthly Trend"
            value={`${monthlyTrend > 0 ? "+" : ""}${monthlyTrend.toFixed(1)}%`}
            subtitle="vs last month"
            trend={monthlyTrend}
            icon={<TrendingUp className="h-5 w-5" />}
            delay={50}
          />
          <MetricCard
            title="Budget Utilization"
            value={`${budgetUtilization}%`}
            subtitle={`$${(yearlyBudget / 1000).toFixed(0)}k total budget`}
            icon={<Target className="h-5 w-5" />}
            delay={100}
          />
          <MetricCard
            title="Over Budget Months"
            value={`${overBudgetMonths}`}
            subtitle="months exceeded budget"
            icon={<AlertTriangle className="h-5 w-5" />}
            delay={150}
          />
        </div>

        {/* Monthly Chart */}
        <div className="mb-8">
          <MonthlyCostChart />
        </div>

        {/* Platform Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Platform Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {platformData.map((platform, index) => (
              <PlatformCard
                key={platform.name}
                platform={platform}
                delay={300 + index * 50}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TopUsersTable />
          </div>
          <div>
            <ServiceBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
