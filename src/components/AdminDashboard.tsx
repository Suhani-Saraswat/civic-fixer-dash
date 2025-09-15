import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { DashboardOverview } from "./DashboardOverview";
import { IssuesManager } from "./IssuesManager";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type ActiveView = 'overview' | 'issues' | 'categories' | 'reports';

export function AdminDashboard() {
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardOverview />;
      case 'issues':
        return <IssuesManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          sidebarOpen={sidebarOpen}
        />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-card">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-foreground">
                Admin Dashboard
              </h1>
            </div>
          </header>
          
          <main className="flex-1 p-6 bg-background">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}