import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Clock, 
  User, 
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle
} from "lucide-react";

interface Issue {
  id: number;
  type: string;
  location: string;
  description: string;
  priority: 'urgent' | 'medium' | 'low';
  status: 'new' | 'progress' | 'resolved';
  reporter: string;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}

const mockIssues: Issue[] = [
  {
    id: 1,
    type: 'Pothole',
    location: 'Main St & 5th Ave',
    description: 'Large pothole causing traffic issues and potential vehicle damage',
    priority: 'urgent',
    status: 'new',
    reporter: 'John Smith',
    createdAt: '2024-01-15 10:30',
    updatedAt: '2024-01-15 10:30'
  },
  {
    id: 2,
    type: 'Street Light',
    location: 'Park Avenue 123',
    description: 'Street light not working, causing safety concerns at night',
    priority: 'medium',
    status: 'progress',
    reporter: 'Maria Garcia',
    assignee: 'Mike Johnson',
    createdAt: '2024-01-14 14:20',
    updatedAt: '2024-01-15 09:15'
  },
  {
    id: 3,
    type: 'Trash Bin',
    location: 'Central Park North',
    description: 'Overflowing trash bin attracting pests',
    priority: 'low',
    status: 'resolved',
    reporter: 'Sarah Wilson',
    assignee: 'Tom Brown',
    createdAt: '2024-01-13 16:45',
    updatedAt: '2024-01-15 08:30'
  },
  {
    id: 4,
    type: 'Water Leak',
    location: 'Oak Street 456',
    description: 'Water main leak flooding the sidewalk',
    priority: 'urgent',
    status: 'progress',
    reporter: 'David Lee',
    assignee: 'Emergency Crew',
    createdAt: '2024-01-15 07:20',
    updatedAt: '2024-01-15 11:45'
  },
];

export function IssuesManager() {
  const [issues] = useState<Issue[]>(mockIssues);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadgeProps = (status: string) => {
    switch (status) {
      case 'new':
        return { className: 'bg-status-new text-primary-foreground' };
      case 'progress':
        return { className: 'bg-status-progress text-primary-foreground' };
      case 'resolved':
        return { className: 'bg-status-resolved text-primary-foreground' };
      default:
        return { variant: 'secondary' as const };
    }
  };

  const getPriorityBadgeProps = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { className: 'bg-status-urgent text-primary-foreground' };
      case 'medium':
        return { className: 'bg-status-progress text-primary-foreground' };
      case 'low':
        return { variant: 'secondary' as const };
      default:
        return { variant: 'secondary' as const };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Issues Management</h2>
          <p className="text-muted-foreground">Manage and track all municipal issues</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          Add New Issue
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="grid gap-4">
        {filteredIssues.map((issue) => (
          <Card key={issue.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">#{issue.id} - {issue.type}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {issue.location}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge {...getPriorityBadgeProps(issue.priority)}>
                    {issue.priority}
                  </Badge>
                  <Badge {...getStatusBadgeProps(issue.status)}>
                    {issue.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{issue.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Reporter: {issue.reporter}</span>
                </div>
                {issue.assignee && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Assigned to: {issue.assignee}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Created: {issue.createdAt}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Updated: {issue.updatedAt}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                {issue.status !== 'resolved' && (
                  <Button size="sm" className="flex items-center gap-2 bg-status-resolved hover:bg-status-resolved/90">
                    <CheckCircle className="h-4 w-4" />
                    Mark Resolved
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}