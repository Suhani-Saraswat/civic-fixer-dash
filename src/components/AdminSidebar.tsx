import { 
  LayoutDashboard, 
  AlertTriangle, 
  BarChart3, 
  Settings,
  MapPin,
  Lightbulb,
  Trash2,
  Palette,
  Wrench,
  Droplets,
  Route,
  AlertCircle
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  activeView: string;
  setActiveView: (view: any) => void;
  sidebarOpen: boolean;
}

const mainNavItems = [
  { id: 'overview', title: 'Dashboard', icon: LayoutDashboard },
  { id: 'issues', title: 'All Issues', icon: AlertTriangle },
  { id: 'reports', title: 'Reports', icon: BarChart3 },
];

const categoryItems = [
  { id: 'pothole', title: 'Potholes', icon: MapPin, count: 23 },
  { id: 'streetlight', title: 'Street Lights', icon: Lightbulb, count: 12 },
  { id: 'trash', title: 'Trash Bins', icon: Trash2, count: 8 },
  { id: 'graffiti', title: 'Graffiti', icon: Palette, count: 15 },
  { id: 'property', title: 'Public Property', icon: Wrench, count: 6 },
  { id: 'water', title: 'Water Leaks', icon: Droplets, count: 4 },
  { id: 'sidewalk', title: 'Sidewalk', icon: Route, count: 11 },
  { id: 'traffic', title: 'Traffic Signals', icon: AlertCircle, count: 3 },
];

export function AdminSidebar({ activeView, setActiveView, sidebarOpen }: AdminSidebarProps) {
  return (
    <Sidebar className={sidebarOpen ? "w-64" : "w-16"}>
      <SidebarContent className="bg-card border-r border-border">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-lg text-primary">
            {sidebarOpen ? "Admin Panel" : "AP"}
          </h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            {sidebarOpen ? "Navigation" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    {sidebarOpen && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            {sidebarOpen ? "Categories" : ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {item.count}
                        </span>
                      </>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}