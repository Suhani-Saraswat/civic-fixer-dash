import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users,
  TrendingUp,
  MapPin
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && (
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3 mr-1" />
            +{trend}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const recentIssues = [
  { id: 1, type: 'Pothole', location: 'Main St & 5th Ave', priority: 'urgent', time: '2 hours ago', status: 'new' },
  { id: 2, type: 'Street Light', location: 'Park Avenue 123', priority: 'medium', time: '4 hours ago', status: 'progress' },
  { id: 3, type: 'Trash Bin', location: 'Central Park North', priority: 'low', time: '1 day ago', status: 'resolved' },
  { id: 4, type: 'Graffiti', location: 'City Hall Wall', priority: 'medium', time: '2 days ago', status: 'new' },
  { id: 5, type: 'Water Leak', location: 'Oak Street 456', priority: 'urgent', time: '3 hours ago', status: 'progress' },
];

const categoryStats = [
  { name: 'Potholes', current: 23, total: 50, color: 'status-urgent' },
  { name: 'Street Lights', current: 12, total: 30, color: 'status-progress' },
  { name: 'Trash Bins', current: 8, total: 25, color: 'status-new' },
  { name: 'Graffiti', current: 15, total: 35, color: 'status-resolved' },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Issues"
          value={82}
          icon={<AlertTriangle className="h-4 w-4 text-status-urgent" />}
          trend={12}
          color="status-urgent"
        />
        <StatCard
          title="Resolved Today"
          value={15}
          icon={<CheckCircle className="h-4 w-4 text-status-resolved" />}
          trend={8}
          color="status-resolved"
        />
        <StatCard
          title="In Progress"
          value={24}
          icon={<Clock className="h-4 w-4 text-status-progress" />}
          color="status-progress"
        />
        <StatCard
          title="Active Staff"
          value={18}
          icon={<Users className="h-4 w-4 text-primary" />}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Issues */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Recent Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">{issue.type}</div>
                      <div className="text-xs text-muted-foreground">{issue.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={issue.status === 'urgent' ? 'destructive' : 'secondary'}
                      className={`
                        ${issue.status === 'new' ? 'bg-status-new text-primary-foreground' : ''}
                        ${issue.status === 'progress' ? 'bg-status-progress text-primary-foreground' : ''}
                        ${issue.status === 'resolved' ? 'bg-status-resolved text-primary-foreground' : ''}
                      `}
                    >
                      {issue.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{issue.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Progress */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Category Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">
                      {category.current}/{category.total}
                    </span>
                  </div>
                  <Progress 
                    value={(category.current / category.total) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}