import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { platformData, userData, monthlyData } from "@/data/mockData";

export function ExportButton() {
  const { toast } = useToast();

  const exportToCSV = (type: "summary" | "platforms" | "users" | "monthly") => {
    let csvContent = "";
    let filename = "";

    switch (type) {
      case "summary":
        csvContent = "Metric,Value\n";
        csvContent += `Total Yearly Cost,$${platformData.reduce((a, b) => a + b.cost, 0)}\n`;
        csvContent += `Total Budget,$${platformData.reduce((a, b) => a + b.budget, 0)}\n`;
        csvContent += `Platforms,${platformData.length}\n`;
        csvContent += `Top Users,${userData.length}\n`;
        filename = "cost-summary.csv";
        break;
      case "platforms":
        csvContent = "Platform,Cost,Budget,Utilization %,Trend %\n";
        platformData.forEach((p) => {
          csvContent += `${p.name},$${p.cost},$${p.budget},${((p.cost / p.budget) * 100).toFixed(1)},${p.trend}\n`;
        });
        filename = "platform-costs.csv";
        break;
      case "users":
        csvContent = "Name,Email,Department,Platform,Total Cost,Trend %\n";
        userData.forEach((u) => {
          csvContent += `${u.name},${u.email},${u.department},${u.platform},$${u.totalCost},${u.trend}\n`;
        });
        filename = "user-costs.csv";
        break;
      case "monthly":
        csvContent = "Month,Cost,Budget,Status\n";
        monthlyData.forEach((m) => {
          csvContent += `${m.month},$${m.cost},$${m.budget},${m.cost > m.budget ? "Over" : "Under"}\n`;
        });
        filename = "monthly-costs.csv";
        break;
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Complete",
      description: `${filename} has been downloaded.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        <DropdownMenuItem onClick={() => exportToCSV("summary")}>
          Export Summary
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToCSV("platforms")}>
          Export Platform Costs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToCSV("users")}>
          Export User Costs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToCSV("monthly")}>
          Export Monthly Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
