import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { userData } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const platformVariants: Record<string, string> = {
  Snowflake: "bg-snowflake/10 text-snowflake border-snowflake/20",
  AWS: "bg-aws/10 text-aws border-aws/20",
  Astronomer: "bg-astronomer/10 text-astronomer border-astronomer/20",
  Databricks: "bg-databricks/10 text-databricks border-databricks/20",
};

export function TopUsersTable() {
  return (
    <div
      className="glass-card rounded-xl p-6 animate-slide-up"
      style={{ animationDelay: "500ms" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Top Users by Cost
          </h3>
          <p className="text-sm text-muted-foreground">
            Users with highest resource consumption
          </p>
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
            {userData.map((user, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
