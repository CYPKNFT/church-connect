import { useState } from "react";
import { MessageSquare, Star, Bug, Lightbulb, Heart, Building, Users, LayoutDashboard, BookOpen, FileText, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppFeedbackForm } from "@/components/AppFeedbackForm";
import { ChurchFeedbackForm } from "@/components/ChurchFeedbackForm";
import { FeedbackStats } from "@/components/FeedbackStats";
import { FeedbackHistory } from "@/components/FeedbackHistory";
import { Link } from "react-router-dom";

type FeedbackType = "app" | "church" | null;

export default function Feedback() {
  const [activeForm, setActiveForm] = useState<FeedbackType>(null);
  const [churchName, setChurchName] = useState("Grace Community Church");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleBack = () => setActiveForm(null);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false, path: "/dashboard" },
    { icon: Heart, label: "My Needs", path: "/my-needs" },
    { icon: Users, label: "Volunteering", path: "/volunteering" },
    { icon: BookOpen, label: "Browse", path: "/browse" },
    { icon: MessageSquare, label: "Feedback", active: true, path: "/feedback" },
  ];

  if (activeForm === "app") {
    return <AppFeedbackForm onBack={handleBack} />;
  }

  if (activeForm === "church") {
    return <ChurchFeedbackForm onBack={handleBack} />;
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="flex-1 p-8">
        {/* Collapsible Left Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-card shadow-gentle border-r border-border min-h-screen transition-all duration-300`}>
          <div className="p-6 border-b border-border relative">
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h2 className="font-bold text-foreground">ChurchConnect</h2>
                  <p className="text-xs text-muted-foreground">{churchName}</p>
                </div>
              )}
            </div>
            {/* Toggle Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`absolute ${sidebarCollapsed ? 'top-4 left-1/2 -translate-x-1/2' : 'top-4 right-2'} p-2 h-8 w-8`}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-primary/5 ${
                  item.active 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-muted-foreground hover:text-foreground'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Share Your Feedback</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Help us improve your experience and strengthen your church community
              </p>
            </div>

            {/* Stats */}
            <FeedbackStats />

            {/* Main Feedback Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* App Feedback */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/20"
                    onClick={() => setActiveForm("app")}>
                <CardHeader className="text-center pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">App Feedback</CardTitle>
                  <CardDescription className="text-lg">
                    Share bugs, feature requests, or general thoughts about the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors">
                      <Bug className="w-5 h-5 text-destructive" />
                      <span className="text-sm font-medium text-destructive">Report Bug</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-green-100/50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">Suggest Feature</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-purple-100/50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                      <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Share Praise</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Give App Feedback
                  </Button>
                </CardContent>
              </Card>

              {/* Church Feedback */}
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/20"
                    onClick={() => setActiveForm("church")}>
                <CardHeader className="text-center pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100/50 dark:bg-green-900/20 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Church Feedback</CardTitle>
                  <CardDescription className="text-lg">
                    Share feedback about your church community and experiences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-primary">Community</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-amber-100/50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                      <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Events</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                      <Building className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Facilities</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Give Church Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Feedback History */}
            <FeedbackHistory />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}