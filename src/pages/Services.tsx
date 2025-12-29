import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb, DollarSign, TrendingDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceDetailModal } from "@/components/services/ServiceDetailModal";
import { servicesData, getTotalPotentialSavings, type ServiceDetail } from "@/data/servicesData";

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.platform.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPlatform = platformFilter === "all" || service.platform === platformFilter;
      
      return matchesSearch && matchesPlatform;
    });
  }, [searchQuery, platformFilter]);

  const totalMonthlyCost = servicesData.reduce((sum, s) => sum + s.monthlyCost, 0);
  const totalPotentialSavings = getTotalPotentialSavings();
  const totalOptimizations = servicesData.reduce((sum, s) => sum + s.optimizations.length, 0);

  const platforms = ["all", "Snowflake", "AWS", "Astronomer"];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Service Details</h1>
            <p className="text-muted-foreground">
              Detailed breakdown of all services with usage metrics and optimization recommendations
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Monthly Cost</p>
                  <p className="text-2xl font-bold font-mono">
                    ${totalMonthlyCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-500/10">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Potential Savings</p>
                  <p className="text-2xl font-bold font-mono text-green-600">
                    ${totalPotentialSavings.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-chart-3/10">
                  <Lightbulb className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Optimizations Available</p>
                  <p className="text-2xl font-bold font-mono">{totalOptimizations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4"
            />
          </div>
          <Tabs value={platformFilter} onValueChange={setPlatformFilter}>
            <TabsList>
              {platforms.map((platform) => (
                <TabsTrigger key={platform} value={platform} className="capitalize">
                  {platform === "all" ? "All Platforms" : platform}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services found matching your criteria.</p>
          </div>
        )}

        {/* Service Detail Modal */}
        <ServiceDetailModal
          service={selectedService}
          open={!!selectedService}
          onClose={() => setSelectedService(null)}
        />
      </div>
    </div>
  );
}
