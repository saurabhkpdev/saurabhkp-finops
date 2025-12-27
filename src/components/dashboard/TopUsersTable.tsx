import { useState, useMemo } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { userData } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "./SearchInput";
import { FilterDropdown } from "./FilterDropdown";

const platformVariants: Record<string, string> = {
  Snowflake: "bg-snowflake/10 text-snowflake border-snowflake/20",
  AWS: "bg-aws/10 text-aws border-aws/20",
  Astronomer: "bg-astronomer/10 text-astronomer border-astronomer/20",
};

const platformOptions = [
  { label: "Snowflake", value: "Snowflake" },
  { label: "AWS", value: "AWS" },
  { label: "Astronomer", value: "Astronomer" },
];

const departmentOptions = [
  { label: "Data Engineering", value: "Data Engineering" },
  { label: "Analytics", value: "Analytics" },
  { label: "ML Platform", value: "ML Platform" },
  { label: "BI Team", value: "BI Team" },
  { label: "Infrastructure", value: "Infrastructure" },
  { label: "Data Science", value: "Data Science" },
];

export function TopUsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    platformOptions.map((p) => p.value)
  );
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(
    departmentOptions.map((d) => d.value)
  );

  const filteredUsers = useMemo(() => {
    return userData.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlatform =
        selectedPlatforms.length === 0 || selectedPlatforms.includes(user.platform);

      const matchesDepartment =
        selectedDepartments.length === 0 || selectedDepartments.includes(user.department);

      return matchesSearch && matchesPlatform && matchesDepartment;
    });
  }, [searchQuery, selectedPlatforms, selectedDepartments]);

  return (
    <div
      className="glass-card rounded-xl p-6 animate-slide-up"
      style={{ animationDelay: "500ms" }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Top Users by Cost
          </h3>
          <p className="text-sm text-muted-foreground">
            Users with highest resource consumption
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search users..."
          />
          <FilterDropdown
            label="Platform"
            options={platformOptions}
            selectedValues={selectedPlatforms}
            onSelectionChange={setSelectedPlatforms}
          />
          <FilterDropdown
            label="Department"
            options={departmentOptions}
            selectedValues={selectedDepartments}
            onSelectionChange={setSelectedDepartments}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Department
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Platform
              </th>
              <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Cost
              </th>
              <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-muted-foreground">
                  No users found matching your filters
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-sm text-muted-foreground">
                      {user.department}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        platformVariants[user.platform]
                      )}
                    >
                      {user.platform}
                    </Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="font-mono font-medium text-foreground">
                      ${user.totalCost.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {user.trend >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-destructive" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-success" />
                      )}
                      <span
                        className={cn(
                          "text-sm font-medium",
                          user.trend >= 0 ? "text-destructive" : "text-success"
                        )}
                      >
                        {Math.abs(user.trend)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
