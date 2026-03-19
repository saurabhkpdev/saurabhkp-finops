import { Link, useLocation } from "react-router-dom";
import { DollarSign, Activity, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "FinOps", path: "/", icon: DollarSign },
  { label: "Platform Statistics", path: "/platform", icon: Activity },
  { label: "Security Ops", path: "/security", icon: Shield },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-8">
            <span className="text-lg font-bold tracking-tight text-foreground whitespace-nowrap">
              🔭 Platform <span className="text-primary">Observability</span>
            </span>
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
