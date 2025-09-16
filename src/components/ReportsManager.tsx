import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Calendar, 
  User, 
  Download,
  Eye,
  BarChart3,
  Clock,
  CheckCircle
} from "lucide-react";

interface Report {
  id: number;
  title: string;
  type: string;
  createdBy: string;
  createdAt: string;
  status: 'completed' | 'pending' | 'processing';
  category: string;
  description: string;
}

const mockReports: Report[] = [
  {
    id: 1,
    title: "Monthly Infrastructure Report",
    type: "Monthly Summary",
    createdBy: "John Admin",
    createdAt: "2024-01-15",
    status: "completed",
    category: "Infrastructure",
    description: "Comprehensive overview of all infrastructure issues resolved in January"
  },
  {
    id: 2,
    title: "Pothole Repair Analysis",
    type: "Category Report",
    createdBy: "Sarah Manager",
    createdAt: "2024-01-14",
    status: "completed",
    category: "Potholes",
    description: "Detailed analysis of pothole repairs and response times"
  },
  {
    id: 3,
    title: "Street Light Maintenance Report",
    type: "Category Report",
    createdBy: "Mike Supervisor",
    createdAt: "2024-01-13",
    status: "processing",
    category: "Street Lights",
    description: "Current status and maintenance schedule for street lighting"
  },
  {
    id: 4,
    title: "Weekly Performance Dashboard",
    type: "Performance Report",
    createdBy: "Admin System",
    createdAt: "2024-01-12",
    status: "completed",
    category: "Performance",
    description: "Key performance indicators and response time metrics"
  },
  {
    id: 5,
    title: "Public Property Damage Assessment",
    type: "Assessment Report",
    createdBy: "Lisa Inspector",
    createdAt: "2024-01-11",
    status: "pending",
    category: "Public Property",
    description: "Assessment of recent public property damage incidents"
  },
  {
    id: 6,
    title: "Traffic Signal Efficiency Report",
    type: "Technical Report",
    createdBy: "Tom Engineer",
    createdAt: "2024-01-10",
    status: "completed",
    category: "Traffic Signals",
    description: "Analysis of traffic signal performance and optimization recommendations"
  }
];

export function ReportsManager() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-status-resolved" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-status-progress" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-status-new" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-status-resolved text-primary-foreground',
      processing: 'bg-status-progress text-primary-foreground',
      pending: 'bg-status-new text-primary-foreground'
    };
    
    return variants[status as keyof typeof variants] || 'secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports</h2>
          <p className="text-muted-foreground">View and download system reports</p>
        </div>
        <Button className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            All Reports ({mockReports.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div 
                key={report.id} 
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{report.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {report.createdBy}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(report.status)}
                        <span className="capitalize">{report.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="secondary"
                    className={getStatusBadge(report.status)}
                  >
                    {report.status}
                  </Badge>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}