import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FolderOpen,
  Search,
  Filter,
  Flag,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  MessageSquare,
  Calendar
} from "lucide-react";

// Mock data for demonstration
const mockReports = [
  {
    id: "r001",
    contentId: "c001",
    contentType: "Post",
    title: "Community Garden Volunteers Needed",
    reportedBy: "Sarah Johnson",
    reportReason: "Inappropriate Content",
    reportedAt: "2024-01-15T10:30:00Z",
    status: "pending",
    priority: "medium",
    reviewedBy: null,
    content: "Looking for volunteers to help with our community garden project. We meet every Saturday morning at 9 AM...",
    reportDetails: "This post seems to be promoting activities outside of church guidelines."
  },
  {
    id: "r002", 
    contentId: "c002",
    contentType: "Comment",
    title: "Comment on Youth Event",
    reportedBy: "Mike Wilson",
    reportReason: "Spam",
    reportedAt: "2024-01-14T15:45:00Z",
    status: "reviewed",
    priority: "low",
    reviewedBy: "Admin User",
    content: "Check out this amazing opportunity! Click here to earn money fast...",
    reportDetails: "This appears to be spam content with external links."
  },
  {
    id: "r003",
    contentId: "c003", 
    contentType: "Post",
    title: "Prayer Request for Family",
    reportedBy: "Anonymous",
    reportReason: "Personal Information",
    reportedAt: "2024-01-13T08:20:00Z",
    status: "approved",
    priority: "high",
    reviewedBy: "Admin User",
    content: "Please pray for the Smith family. Their address is 123 Main St and they're going through...",
    reportDetails: "Post contains personal information that should be protected."
  }
];

const statusColors = {
  pending: "bg-warning/15 text-warning border-warning/20",
  reviewed: "bg-blue-500/15 text-blue-600 border-blue-500/20", 
  approved: "bg-success/15 text-success border-success/20",
  rejected: "bg-destructive/15 text-destructive border-destructive/20"
};

const priorityColors = {
  high: "bg-destructive/15 text-destructive border-destructive/20",
  medium: "bg-warning/15 text-warning border-warning/20",
  low: "bg-success/15 text-success border-success/20"
};

export default function ContentModeration() {
  const [reports, setReports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reportReason.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleApprove = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: "approved", reviewedBy: "Current Admin" }
        : report
    ));
  };

  const handleReject = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: "rejected", reviewedBy: "Current Admin" }
        : report
    ));
  };

  const handleRemoveContent = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: "reviewed", reviewedBy: "Current Admin" }
        : report
    ));
  };

  const selectedReportData = reports.find(r => r.id === selectedReport);

  return (
      <div className="bg-background p-6 lg:p-8">
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <FolderOpen className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Content Moderation</h2>
        </div>
        <p className="text-muted-foreground">
          Monitor flagged content, manage community posts, and maintain platform safety standards.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                    <p className="text-2xl font-bold text-foreground">
                      {reports.filter(r => r.status === "pending").length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reviewed Today</p>
                    <p className="text-2xl font-bold text-foreground">12</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Clean Rate</p>
                    <p className="text-2xl font-bold text-foreground">95%</p>
                  </div>
                  <Flag className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent p-0 focus-visible:ring-0"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <Card>
            <CardHeader>
              <CardTitle>Flagged Content Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.reportReason}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={priorityColors[report.priority]}>
                          {report.priority}
                        </Badge>
                        <Badge className={statusColors[report.status]}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {report.reportedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {report.contentType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.reportedAt)}
                      </span>
                    </div>
                    
                    {selectedReport === report.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-1">Reported Content:</h4>
                            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                              {report.content}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-1">Report Details:</h4>
                            <p className="text-sm text-muted-foreground">
                              {report.reportDetails}
                            </p>
                          </div>
                          
                          {report.status === "pending" && (
                            <div className="flex items-center gap-2 pt-2">
                              <Button
                                size="sm"
                                onClick={() => handleApprove(report.id)}
                                className="bg-success hover:bg-success/90 text-success-foreground"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve Content
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRemoveContent(report.id)}
                              >
                                <EyeOff className="h-4 w-4 mr-1" />
                                Hide Content
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(report.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Reject Report
                              </Button>
                            </div>
                          )}
                          
                          {report.reviewedBy && (
                            <p className="text-xs text-muted-foreground">
                              Reviewed by: {report.reviewedBy}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Review All Pending
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Bulk Approve
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Moderation Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Community Standards</h4>
                <p>Content should align with church values and community guidelines.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Privacy Protection</h4>
                <p>Remove or flag content containing personal information.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Spam Detection</h4>
                <p>Watch for promotional content and external links.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}