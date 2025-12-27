import { userData } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

interface DepartmentData {
  name: string;
  cost: number;
  userCount: number;
}

// Aggregate user data by department
const departmentData: DepartmentData[] = Object.values(
  userData.reduce((acc, user) => {
    if (!acc[user.department]) {
      acc[user.department] = {
        name: user.department,
        cost: 0,
        userCount: 0,
      };
    }
    acc[user.department].cost += user.totalCost;
    acc[user.department].userCount += 1;
    return acc;
  }, {} as Record<string, DepartmentData>)
).sort((a, b) => b.cost - a.cost);

const maxCost = Math.max(...departmentData.map((d) => d.cost));

export function DepartmentBreakdown() {
  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up" style={{ animationDelay: "450ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Cost by Department
        </h3>
        <p className="text-sm text-muted-foreground">
          Aggregated user spending per team
        </p>
      </div>

      <div className="space-y-4">
        {departmentData.map((dept) => (
          <div key={dept.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">
                  {dept.name}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({dept.userCount} {dept.userCount === 1 ? "user" : "users"})
                </span>
              </div>
              <span className="text-sm font-mono text-foreground">
                ${(dept.cost / 1000).toFixed(1)}k
              </span>
            </div>
            <Progress
              value={(dept.cost / maxCost) * 100}
              className="h-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
