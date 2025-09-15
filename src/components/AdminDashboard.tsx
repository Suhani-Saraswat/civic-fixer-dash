import { useState } from "react";
import { DashboardOverview } from "./DashboardOverview";
import { IssuesManager } from "./IssuesManager";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  BarChart3, 
  MapPin,
  Lightbulb,
  Trash2,
  Palette,
  Wrench,
  Droplets,
  Route,
  AlertCircle
} from "lucide-react";

type ActiveView = 'overview' | 'issues' | 'categories' | 'reports' | 'pothole' | 'streetlight' | 'trash' | 'graffiti' | 'property' | 'water' | 'sidewalk' | 'traffic';

const mainNavItems = [
  { id: 'overview' as const, title: 'Dashboard', icon: LayoutDashboard },
  { id: 'issues' as const, title: 'All Issues', icon: AlertTriangle },
  { id: 'reports' as const, title: 'Reports', icon: BarChart3 },
];

const categoryItems = [
  { id: 'pothole' as const, title: 'Potholes', icon: MapPin, count: 23 },
  { id: 'streetlight' as const, title: 'Street Lights', icon: Lightbulb, count: 12 },
  { id: 'trash' as const, title: 'Trash Bins', icon: Trash2, count: 8 },
  { id: 'graffiti' as const, title: 'Graffiti', icon: Palette, count: 15 },
  { id: 'property' as const, title: 'Public Property', icon: Wrench, count: 6 },
  { id: 'water' as const, title: 'Water Leaks', icon: Droplets, count: 4 },
  { id: 'sidewalk' as const, title: 'Sidewalk', icon: Route, count: 11 },
  { id: 'traffic' as const, title: 'Traffic Signals', icon: AlertCircle, count: 3 },
];

export function AdminDashboard() {
  const [activeView, setActiveView] = useState<ActiveView>('overview');

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardOverview activeView={activeView} setActiveView={setActiveView} categoryItems={categoryItems} />;
      case 'issues':
        return <IssuesManager />;
      default:
        return <DashboardOverview activeView={activeView} setActiveView={setActiveView} categoryItems={categoryItems} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-card">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Admin Dashboard
          </h1>
          
          {/* Main Navigation */}
          <div className="flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveView(item.id)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </header>
      
      <main className="p-6">
        {renderActiveView()}
      </main>
    </div>
  );
}