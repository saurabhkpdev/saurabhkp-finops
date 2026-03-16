import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { DollarSign, TrendingUp, Target, AlertTriangle, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MonthlyCostChart } from "@/components/dashboard/MonthlyCostChart";
import { PlatformCard } from "@/components/dashboard/PlatformCard";
import { ServiceBreakdown } from "@/components/dashboard/ServiceBreakdown";
import { EnvironmentBreakdown } from "@/components/dashboard/EnvironmentBreakdown";
import { TopUsersTable } from "@/components/dashboard/TopUsersTable";
import { DateRangePicker, dateRanges, DateRange } from "@/components/dashboard/DateRangePicker";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { BudgetAlert } from "@/components/dashboard/BudgetAlert";
import { CostForecastChart } from "@/components/dashboard/CostForecastChart";
import { DepartmentBreakdown } from "@/components/dashboard/DepartmentBreakdown";
import { platformData, monthlyData } from "@/data/mockData";
const Index = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange>(dateRanges[0]);

  // Filter monthly data based on selected range
  const filteredMonthlyData = useMemo(() => {
    return monthlyData.filter((_, index) => selectedRange.months.includes(index));
  }, [selectedRange]);

  // Calculate metrics based on filtered data
  const yearlyTotal = useMemo(() => {
    return filteredMonthlyData.reduce((acc, m) => acc + m.cost, 0);
  }, [filteredMonthlyData]);
  const yearlyBudget = useMemo(() => {
    return filteredMonthlyData.reduce((acc, m) => acc + m.budget, 0);
  }, [filteredMonthlyData]);
  const budgetUtilization = (yearlyTotal / yearlyBudget * 100).toFixed(1);
  const monthlyTrend = useMemo(() => {
    if (filteredMonthlyData.length < 2) return 0;
    const current = filteredMonthlyData[filteredMonthlyData.length - 1];
    const previous = filteredMonthlyData[filteredMonthlyData.length - 2];
    return (current.cost - previous.cost) / previous.cost * 100;
  }, [filteredMonthlyData]);
  const overBudgetMonths = filteredMonthlyData.filter(m => m.cost > m.budget).length;

  // Check which platforms are over or near budget
  const platformsOverBudget = platformData.filter(p => p.cost > p.budget);
  const platformsNearBudget = platformData.filter(p => p.cost <= p.budget && p.cost / p.budget >= 0.85);
  return <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with filters */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">FinOps Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and analyze cloud platform spending across your organization
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <DateRangePicker selectedRange={selectedRange} onRangeChange={setSelectedRange} />
            <ExportButton />
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </header>

        {/* Budget Alerts */}
        {(platformsOverBudget.length > 0 || platformsNearBudget.length > 0) && <div className="mb-6 space-y-2 animate-slide-up">
            {platformsOverBudget.map(p => <BudgetAlert key={p.name} current={p.cost} budget={p.budget} label={p.name} />)}
            {platformsNearBudget.map(p => <BudgetAlert key={p.name} current={p.cost} budget={p.budget} label={p.name} />)}
          </div>}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard title={`${selectedRange.label} Cost`} value={`$${(yearlyTotal / 1000).toFixed(0)}k`} subtitle="Across all platforms" icon={<DollarSign className="h-5 w-5" />} delay={0} />
          <MetricCard title="Monthly Trend" value={`${monthlyTrend > 0 ? "+" : ""}${monthlyTrend.toFixed(1)}%`} subtitle="vs previous month" trend={monthlyTrend} icon={<TrendingUp className="h-5 w-5" />} delay={50} />
          <MetricCard title="Budget Utilization" value={`${budgetUtilization}%`} subtitle={`$${(yearlyBudget / 1000).toFixed(0)}k total budget`} icon={<Target className="h-5 w-5" />} delay={100} />
          <MetricCard title="Over Budget Months" value={`${overBudgetMonths}`} subtitle="months exceeded budget" icon={<AlertTriangle className="h-5 w-5" />} delay={150} />
        </div>

        {/* Monthly Chart */}
        <div className="mb-8">
          <MonthlyCostChart />
        </div>

        {/* Forecast Chart */}
        <div className="mb-8">
          <CostForecastChart />
        </div>

        {/* Platform Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Platform Breakdown
            </h2>
            <Link to="/services">
              <Button variant="outline" size="sm" className="gap-2">
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformData.map((platform, index) => <PlatformCard key={platform.name} platform={platform} delay={300 + index * 50} />)}
          </div>
        </div>

        {/* Environment Breakdown */}
        <div className="mb-8">
          <EnvironmentBreakdown />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TopUsersTable />
          </div>
          <div className="space-y-4">
            <ServiceBreakdown />
            <DepartmentBreakdown />
          </div>
        </div>
      </div>
    </div>;
};
export default Index;