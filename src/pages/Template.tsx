import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { NeedCard } from "@/components/NeedCard";
import { Heart, Clock, Users, Plus, LayoutDashboard, BookOpen, UserCheck, Search, Filter, MapPin, Timer, MessageSquare, ChevronRight, HandHeart, Target, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Template() {
  const { user } = useAuth();
  const [churchName, setChurchName] = useState("Grace Community Church");

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: false, path: "/dashboard" },
    { icon: Heart, label: "My Needs", path: "/my-needs" },
    { icon: Users, label: "Volunteering", path: "/volunteering" },
    { icon: BookOpen, label: "Browse", path: "/browse" },
    { icon: FileText, label: "Template", active: true, path: "/template" },
    { icon: MessageSquare, label: "Feedback", path: "/feedback" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Clean Left Sidebar */}
        <div className="w-64 bg-card shadow-gentle border-r border-border min-h-screen">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">ChurchConnect</h2>
                <p className="text-xs text-muted-foreground">{churchName}</p>
              </div>
            </div>
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
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Template page content - empty as requested */}
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-2">Template Page</h1>
            <p className="text-lg text-muted-foreground">
              This is an empty template page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}