import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { Heart, Users, BookOpen, Shield, BarChart3, Settings, Download, Video, MessageSquare, CheckCircle, Crown, Award, HandHeart, Target, TrendingUp, Calendar, Clock, Truck, Package, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Charities() {

  const resources = [
    {
      id: 1,
      title: "Getting Started Guide",
      description: "Your step-by-step setup to launch with ease.",
      type: "PDF Guide",
      downloadUrl: "#",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Safety & Trust Best Practices",
      description: "Essential guidance for maintaining a secure environment.",
      type: "PDF Document",
      downloadUrl: "#",
      icon: Shield
    },
    {
      id: 3,
      title: "Leadership Training Video",
      description: "A concise walkthrough for coordinators and team leads.",
      type: "Video",
      downloadUrl: "#",
      icon: Video
    },
    {
      id: 4,
      title: "Monthly Impact Report Template",
      description: "A ready-to-use format for sharing your story of service.",
      type: "Template",
      downloadUrl: "#",
      icon: BarChart3
    }
  ];

  // Sample ministries and item needs for individual donors UI
  const ministryNeeds = [
    {
      id: "coat-drive",
      ministry: "Winter Coat Drive",
      items: [
        { id: "adult-coats", name: "Adult Coats", needed: 50, received: 32, unit: "coats" },
        { id: "kids-coats", name: "Kids Coats", needed: 40, received: 18, unit: "coats" },
        { id: "gloves", name: "Gloves", needed: 120, received: 96, unit: "pairs" },
      ],
    },
    {
      id: "food-pantry",
      ministry: "Food Pantry",
      items: [
        { id: "rice", name: "Rice (2lb bags)", needed: 100, received: 64, unit: "bags" },
        { id: "canned-soup", name: "Canned Soup", needed: 200, received: 158, unit: "cans" },
        { id: "hygiene-kits", name: "Hygiene Kits", needed: 80, received: 42, unit: "kits" },
      ],
    },
    {
      id: "homeless-outreach",
      ministry: "Homeless Outreach",
      items: [
        { id: "blankets", name: "Blankets", needed: 150, received: 88, unit: "blankets" },
        { id: "toiletry-kits", name: "Toiletry Kits", needed: 120, received: 51, unit: "kits" },
        { id: "socks", name: "Socks", needed: 300, received: 210, unit: "pairs" },
      ],
    },
  ];

  const [selectedMinistry, setSelectedMinistry] = useState(ministryNeeds[0].id);
  const [donateOpen, setDonateOpen] = useState<string | null>(null);
  const [donateForm, setDonateForm] = useState({ quantity: 1, method: "dropoff", date: "", time: "" });

  // User UI state
  const [giveFunds, setGiveFunds] = useState({ amount: 50, frequency: "one-time", fund: "General", note: "" });
  const [pickupForm, setPickupForm] = useState({ address: "", date: "", time: "", instructions: "" });
  const receipts = [
    { id: "r-1001", date: "2025-10-08", type: "In-kind", ministry: "Winter Coat Drive", details: "5 Adult Coats, 3 Gloves", link: "#" },
    { id: "r-1002", date: "2025-10-27", type: "Funds", ministry: "Food Pantry", details: "$100 one-time", link: "#" },
  ];

  const charityStories = [
    {
      id: 1,
      leader: "Pastor Emma Thompson",
      title: "Outreach Pastor",
      organization: "New Hope Church",
      location: "Seattle, WA",
      yearsInService: 12,
      testimonial: "ChurchConnect centralizes our ministries, volunteers, and partners. We spend less time coordinating and more time serving people. It feels built for the way churches actually operate.",
      impact: "Volunteer engagement up 150%",
      keyMetric: "12 ministries active monthly"
    },
    {
      id: 2,
      leader: "Marcus Williams",
      title: "Missions Director",
      organization: "Grace City Church", 
      location: "Portland, OR",
      yearsInService: 18,
      testimonial: "Real-time donation and resource tracking helped us steward gifts with transparency. Reporting for our board and congregation is now one click.",
      impact: "Donor retention increased 40%",
      keyMetric: "1,800 service hours coordinated"
    },
    {
      id: 3,
      leader: "Sofia Rodriguez",
      title: "Volunteer Coordinator",
      organization: "River Valley Church",
      location: "San Diego, CA", 
      yearsInService: 9,
      testimonial: "Scheduling, background checks, and follow-ups used to be messy. Now our volunteer pipeline and ministry rosters are clear and consistent.",
      impact: "Administrative time reduced 60%",
      keyMetric: "320 active volunteers"
    },
    {
      id: 4,
      leader: "James Patterson",
      title: "Executive Pastor",
      organization: "Covenant Church",
      location: "Chicago, IL",
      yearsInService: 15,
      testimonial: "We oversee multiple local and global ministries. ChurchConnect gives our leaders a shared source of truth for goals, needs, volunteers, and outcomes.",
      impact: "Operations efficiency up 35%",
      keyMetric: "30+ partner ministries"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 flex flex-col gap-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3 text-emerald-600 dark:text-emerald-400 font-medium mb-8">
            <Heart className="w-5 h-5" />
            <span>ChurchConnect for Ministries</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            Empower Every<br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Act of Ministry</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A dedicated hub for churches to organize ministries, track donations and resources, mobilize volunteers, and coordinate partners — all in one beautiful, secure place.
          </p>
        </div>

        {/* Vision + Leaders (Full-bleed section) */}
        <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-teal-600/20 border-y border-emerald-500/20">
          {/* Decorative visuals */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -left-24 w-80 h-80 bg-emerald-500/25 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 -right-16 w-[28rem] h-[28rem] bg-teal-400/25 blur-3xl rounded-full" />
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(16,185,129,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.25)_1px,transparent_1px)] bg-[size:28px_28px]" />
          </div>

          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-12 items-center">
              {/* Left: Vision copy */}
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-foreground mb-4">The Vision</h2>
                <h3 className="text-3xl font-semibold text-foreground mb-6">Less Management. More Mission.</h3>
                <p className="text-xl text-emerald-950/80 dark:text-emerald-100/80 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                  ChurchConnect Ministries helps churches focus on people over paperwork. One place to steward gifts well, schedule volunteers, and share outcomes with your congregation and board.
                </p>

                {/* Quick highlight pills */}
                <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
                  <span className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 text-sm">Donations & resources</span>
                  <span className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 text-sm">Volunteer scheduling</span>
                  <span className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 text-sm">Impact reporting</span>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-emerald-500/30 h-full justify-self-center" />

              {/* Right: Leader context + mini-stats visual */}
              <div>
                <div className="mb-8 text-center lg:text-left">
                  <h2 className="text-4xl font-bold text-foreground mb-4">For Church Ministry Leaders</h2>
                  <h3 className="text-3xl font-semibold text-foreground mb-6">Lead with Clarity and Confidence</h3>
                  <p className="text-xl text-emerald-950/70 dark:text-emerald-100/70">
                    Manage ministries, volunteers, donations, and outreach effortlessly. Stay organized. Stay connected. Stay focused on your calling.
                  </p>
                </div>

                {/* Mini stats row */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-emerald-500/20 bg-white/60 dark:bg-emerald-950/20 p-4 text-center">
                    <div className="text-xs text-emerald-900/80 dark:text-emerald-200">Volunteers</div>
                    <div className="text-2xl font-bold text-foreground mt-1">320</div>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-white/60 dark:bg-emerald-950/20 p-4 text-center">
                    <div className="text-xs text-emerald-900/80 dark:text-emerald-200">Donations</div>
                    <div className="text-2xl font-bold text-foreground mt-1">2.4k</div>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-white/60 dark:bg-emerald-950/20 p-4 text-center">
                    <div className="text-xs text-emerald-900/80 dark:text-emerald-200">Outreach</div>
                    <div className="text-2xl font-bold text-foreground mt-1">58</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* CTA cards below the intro section */}
        <div className="container mx-auto px-4 mt-8 mb-16">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-0 shadow-card hover:shadow-lg hover-lift bg-card/90 backdrop-blur-sm group">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <Crown className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Admin Sign In</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Access your ministry dashboard, manage volunteers, and track impact.</p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white w-full" asChild>
                  <Link to="/login">Admin Sign In</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-card hover:shadow-lg hover-lift bg-card/90 backdrop-blur-sm group">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <Heart className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Set Up Your Ministry Hub</h3>
                <p className="text-muted-foreground mb-4 flex-grow">Get started and transform how your church serves.</p>
                <Button className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white w-full" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Charities Choose Section */}
        <section className="space-y-16 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">Why Churches Choose ChurchConnect for Ministries</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how ChurchConnect empowers churches to organize ministry work and maximize impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Unified Platform - Love in Action style (accent) */}
            <div className="group relative h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 text-center hover:bg-card/90 transition-all duration-500 shadow-sm hover:shadow-accent/20 hover:-translate-y-2 group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-accent/20">
                  <Target className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Unified Platform</h3>
                <p className="text-muted-foreground text-lg leading-relaxed flex-1 flex items-center">
                  All your operations — volunteers, donors, events — organized in one clean dashboard.
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Built on Trust - Trust & Safety style (green) */}
            <div className="group relative h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 text-center hover:bg-card/90 transition-all duration-500 shadow-sm hover:shadow-green-500/20 hover:-translate-y-2 group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-green-500/20">
                  <Shield className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Built on Trust</h3>
                <p className="text-muted-foreground text-lg leading-relaxed flex-1 flex items-center">
                  Verified volunteers, secure data handling, and transparent permissions at every level.
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Effortless Collaboration - Strong Community style (blue) */}
            <div className="group relative h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 text-center hover:bg-card/90 transition-all duration-500 shadow-sm hover:shadow-blue-500/20 hover:-translate-y-2 group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-blue-500/20">
                  <Users className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Effortless Collaboration</h3>
                <p className="text-muted-foreground text-lg leading-relaxed flex-1 flex items-center">
                  Keep your team and partners aligned with real-time updates and communication tools.
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Impact Visibility - Purposeful Service style (purple) */}
            <div className="group relative h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 text-center hover:bg-card/90 transition-all duration-500 shadow-sm hover:shadow-purple-500/20 hover:-translate-y-2 group h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-500/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-purple-500/20">
                  <TrendingUp className="w-10 h-10 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Impact Visibility</h3>
                <p className="text-muted-foreground text-lg leading-relaxed flex-1 flex items-center">
                  See progress at a glance. Share your mission story through intuitive reports and visuals.
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Complete Tools Section */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-12 lg:p-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-6">Complete Tools for Church Ministries</h3>
              <p className="text-xl text-muted-foreground">Everything you need to organize teams, steward gifts, and share outcomes</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Volunteer Management</h4>
                    <p className="text-muted-foreground">Organize schedules, verify participants, and build consistent ministry rosters.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Donations & Resources</h4>
                    <p className="text-muted-foreground">Track pledges and in-kind items, ensure transparency, and celebrate generosity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Admin Dashboard</h4>
                    <p className="text-muted-foreground">Everything you need — centralized, simple, and secure.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Custom Branding</h4>
                    <p className="text-muted-foreground">Bring your identity forward with your church’s colors, logo, and message.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Training & Support</h4>
                    <p className="text-muted-foreground">Clear guides and onboarding help your team start strong and stay aligned.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Partnership Integration</h4>
                    <p className="text-muted-foreground">Coordinate with external ministries, nonprofits, and community partners effortlessly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Built on Integrity Section */}
          <div className="text-center py-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Built on Integrity</h2>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Safety. Transparency. Accountability.</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every feature is designed with responsibility in mind. From encrypted donation data to volunteer verification, your organization and supporters are protected by enterprise-grade standards.
            </p>
          </div>
        </section>

      {/* User UI Showcase */}
      <section className="space-y-8 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground">User UI</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-3">
            Friendly flows for members to donate items and schedule drop-offs or pickups.
          </p>
        </div>

        {/* Donate to a Ministry */}
        <Card className="border-emerald-200/50 bg-card backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-foreground text-xl">Donate to a Ministry</CardTitle>
              <div className="w-full sm:w-80">
                <Select value={selectedMinistry} onValueChange={setSelectedMinistry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ministry" />
                  </SelectTrigger>
                  <SelectContent>
                    {ministryNeeds.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.ministry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministryNeeds.find(m => m.id === selectedMinistry)?.items.map((it) => {
                const pct = Math.min(100, Math.round((it.received / it.needed) * 100));
                const remaining = Math.max(0, it.needed - it.received);
                return (
                  <Card key={it.id} className="border-emerald-200/50 bg-emerald-50/40 dark:bg-emerald-950/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-foreground">{it.name}</div>
                        <span className="text-sm text-muted-foreground">{it.received}/{it.needed}</span>
                      </div>
                      <Progress value={pct} className="h-2" />
                      <div className="mt-2 text-sm text-muted-foreground">
                        {remaining > 0 ? `${remaining} ${it.unit} needed` : "Goal reached"}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Dialog open={donateOpen === it.id} onOpenChange={(o) => setDonateOpen(o ? it.id : null)}>
                          <DialogTrigger asChild>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                              <Package className="w-4 h-4 mr-2" />
                              Donate Item
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Donate: {it.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="qty">Quantity</Label>
                                  <Input
                                    id="qty"
                                    type="number"
                                    min={1}
                                    value={donateForm.quantity}
                                    onChange={(e) => setDonateForm({ ...donateForm, quantity: Number(e.target.value) })}
                                  />
                                </div>
                                <div>
                                  <Label>Method</Label>
                                  <Select value={donateForm.method} onValueChange={(v) => setDonateForm({ ...donateForm, method: v })}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Choose method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="dropoff"><Truck className="w-4 h-4 mr-2 inline" /> Drop-off</SelectItem>
                                      <SelectItem value="pickup"><Truck className="w-4 h-4 mr-2 inline rotate-180" /> Pickup</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="date">Date</Label>
                                  <div className="relative">
                                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                      id="date"
                                      type="date"
                                      className="pl-9"
                                      value={donateForm.date}
                                      onChange={(e) => setDonateForm({ ...donateForm, date: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="time">Time</Label>
                                  <div className="relative">
                                    <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                      id="time"
                                      type="time"
                                      className="pl-9"
                                      value={donateForm.time}
                                      onChange={(e) => setDonateForm({ ...donateForm, time: e.target.value })}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setDonateOpen(null)}>Cancel</Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                  Confirm Donation
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" className="border-emerald-300 hover:bg-emerald-100/40">
                          Schedule Later
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Give Funds (Pledges) */}
        <Card className="border-emerald-200/50 bg-card backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-xl">Give Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Amount presets */}
              <div>
                <Label>Amount</Label>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {[25, 50, 100, 250].map((v) => (
                    <Button
                      key={v}
                      variant={giveFunds.amount === v ? "default" : "outline"}
                      className={giveFunds.amount === v ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}
                      onClick={() => setGiveFunds({ ...giveFunds, amount: v })}
                    >
                      ${v}
                    </Button>
                  ))}
                  <Input
                    type="number"
                    min={1}
                    placeholder="Custom"
                    value={String(giveFunds.amount)}
                    onChange={(e) => setGiveFunds({ ...giveFunds, amount: Number(e.target.value || 0) })}
                    className="col-span-4 sm:col-span-4"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div>
                <Label>Frequency</Label>
                <Select value={giveFunds.frequency} onValueChange={(v) => setGiveFunds({ ...giveFunds, frequency: v })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One-time</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fund */}
              <div>
                <Label>Fund</Label>
                <Select value={giveFunds.fund} onValueChange={(v) => setGiveFunds({ ...giveFunds, fund: v })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select fund" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Food Pantry">Food Pantry</SelectItem>
                    <SelectItem value="Homeless Outreach">Homeless Outreach</SelectItem>
                    <SelectItem value="Winter Coat Drive">Winter Coat Drive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Note */}
            <div>
              <Label>Note (optional)</Label>
              <Textarea
                placeholder="Add a note or dedication"
                value={giveFunds.note}
                onChange={(e) => setGiveFunds({ ...giveFunds, note: e.target.value })}
                className="mt-2"
              />
            </div>

            <div className="flex justify-end">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Confirm Pledge</Button>
            </div>
          </CardContent>
        </Card>

        {/* Ministry Event Details (with map and RSVP) */}
        <Card className="border-emerald-200/50 bg-card backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-xl">Ministry Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Event summary */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-foreground">Food Pantry Distribution Day</div>
                <div className="text-sm text-muted-foreground">Hosted by: Downtown Community Church</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Next: <span className="text-foreground font-medium">Sat, 10:00 AM – 2:00 PM</span>
              </div>
            </div>

            {/* Mini Map */}
            <div className="relative h-56 rounded-xl overflow-hidden border border-emerald-200/50 bg-emerald-50/40 dark:bg-emerald-950/20">
              {/* Subtle grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
              {/* Route / pins (decorative) */}
              <div className="absolute inset-0">
                <div className="absolute left-[20%] top-[30%] w-4 h-4 rounded-full bg-emerald-500 shadow-md" />
                <div className="absolute left-[55%] top-[50%] w-4 h-4 rounded-full bg-sky-500 shadow-md" />
                <div className="absolute left-[78%] top-[38%] w-4 h-4 rounded-full bg-amber-500 shadow-md" />
              </div>
              {/* Location label */}
              <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm border rounded-lg px-3 py-1 text-xs">
                125 Trinity Ave, Springfield
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative mt-2">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="125 Trinity Ave, Springfield"
                    className="pl-9"
                    value={pickupForm.address}
                    onChange={(e) => setPickupForm({ ...pickupForm, address: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="pdate">Event Date</Label>
                <div className="relative mt-2">
                  <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="pdate"
                    type="date"
                    className="pl-9"
                    value={pickupForm.date}
                    onChange={(e) => setPickupForm({ ...pickupForm, date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="ptime">Start Time</Label>
                <div className="relative mt-2">
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="ptime"
                    type="time"
                    className="pl-9"
                    value={pickupForm.time}
                    onChange={(e) => setPickupForm({ ...pickupForm, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label>Notes (optional)</Label>
                <Textarea
                  placeholder="Parking info, arrival details, dietary notes for volunteers, etc."
                  className="mt-2"
                  value={pickupForm.instructions}
                  onChange={(e) => setPickupForm({ ...pickupForm, instructions: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="outline" className="border-emerald-300">Add to Calendar</Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">RSVP</Button>
            </div>
          </CardContent>
        </Card>

        {/* Receipts & History */}
        <Card className="border-emerald-200/50 bg-card backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-xl">Receipts & History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-5 px-6 py-3 text-sm text-muted-foreground border-b">
                  <div>Date</div>
                  <div>Type</div>
                  <div>Ministry</div>
                  <div>Details</div>
                  <div>Receipt</div>
                </div>
                {receipts.map((r) => (
                  <div key={r.id} className="grid grid-cols-5 px-6 py-4 items-center border-b last:border-b-0">
                    <div className="text-foreground">{r.date}</div>
                    <div className="text-foreground">{r.type}</div>
                    <div className="text-foreground">{r.ministry}</div>
                    <div className="text-muted-foreground">{r.details}</div>
                    <div>
                      <Button variant="outline" asChild>
                        <a href={r.link} download>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
        {/* Administration UI Showcase */}
        <section className="space-y-16 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-foreground">Administration UI</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-3">
              Tools for leaders to monitor donations, schedule volunteers, and manage operations at a glance.
            </p>
          </div>
          {/* Donations Operations Showcase */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-300">Donations Operations</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-3">
                Track in-kind items from intake to distribution with clear quantities, statuses, and destinations.
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Items Received</div>
                  <div className="text-3xl font-bold text-foreground mt-1">2,480</div>
                  <div className="mt-4 h-2 w-full bg-emerald-200/50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "72%" }} />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Items Distributed</div>
                  <div className="text-3xl font-bold text-foreground mt-1">1,930</div>
                  <div className="mt-4 h-2 w-full bg-emerald-200/50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "58%" }} />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-emerald-200/50 bg-emerald-50/50 dark:bg-emerald-950/20">
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground">Requests Pending</div>
                  <div className="text-3xl font-bold text-foreground mt-1">146</div>
                  <div className="mt-4 h-2 w-full bg-emerald-200/50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "36%" }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation Table (static) */}
            <Card className="border-emerald-200/50 bg-card backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-foreground text-xl">Recent Item Flows</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <div className="min-w-[640px]">
                    <div className="grid grid-cols-5 px-6 py-3 text-sm text-muted-foreground border-b">
                      <div>Item</div>
                      <div>Quantity</div>
                      <div>Status</div>
                      <div>Destination</div>
                      <div>Updated</div>
                    </div>
                    {[
                      { item: "Winter Coats", qty: "120", status: "In Transit", dest: "Shelter North", updated: "2h ago", badge: "bg-amber-100 text-amber-900 border-amber-200" },
                      { item: "Canned Goods", qty: "860", status: "Received", dest: "Food Pantry A", updated: "Today", badge: "bg-emerald-100 text-emerald-900 border-emerald-200" },
                      { item: "Hygiene Kits", qty: "300", status: "Queued", dest: "Mobile Outreach", updated: "1d ago", badge: "bg-sky-100 text-sky-900 border-sky-200" },
                      { item: "Blankets", qty: "180", status: "Distributed", dest: "Family Center", updated: "3d ago", badge: "bg-teal-100 text-teal-900 border-teal-200" }
                    ].map((row, idx) => (
                      <div key={idx} className="grid grid-cols-5 px-6 py-4 items-center border-b last:border-b-0">
                        <div className="font-medium text-foreground">{row.item}</div>
                        <div className="text-foreground">{row.qty}</div>
                        <div>
                          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${row.badge}`}>
                            <span className="w-2 h-2 rounded-full bg-current opacity-70" />
                            {row.status}
                          </span>
                        </div>
                        <div className="text-muted-foreground">{row.dest}</div>
                        <div className="text-muted-foreground">{row.updated}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Volunteer Scheduling & Organization */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-300">Volunteer Scheduling</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-3">
                Plan roles, shifts, and coverage at a glance — keep every service filled and on-time.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Weekly Grid */}
              <Card className="lg:col-span-2 border-emerald-200/50 bg-card backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-foreground text-xl">Weekly Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 text-sm">
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                      <div key={d} className="text-center text-muted-foreground">{d}</div>
                    ))}
                    {[
                      ["Greeter","bg-emerald-100 text-emerald-900 border-emerald-200"],
                      ["Driver","bg-sky-100 text-sky-900 border-sky-200"],
                      ["Prep","bg-amber-100 text-amber-900 border-amber-200"],
                      ["Greeter","bg-emerald-100 text-emerald-900 border-emerald-200"],
                      ["Prep","bg-amber-100 text-amber-900 border-amber-200"],
                      ["Driver","bg-sky-100 text-sky-900 border-sky-200"],
                      ["Greeter","bg-emerald-100 text-emerald-900 border-emerald-200"],
                    ].map((role, i) => (
                      <div key={i} className="min-h-[72px] rounded-xl border bg-muted/20 p-2 flex items-start">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs ${role[1]}`}>{role[0]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Shifts */}
              <Card className="border-emerald-200/50 bg-card backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-foreground text-xl">Upcoming Shifts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Jordan Lee", role: "Greeter", time: "Mon 9:00–12:00", color: "bg-emerald-500" },
                    { name: "Ava Patel", role: "Driver", time: "Tue 10:00–14:00", color: "bg-sky-500" },
                    { name: "Noah Smith", role: "Prep", time: "Wed 13:00–16:00", color: "bg-amber-500" },
                    { name: "Mia Garcia", role: "Greeter", time: "Fri 9:00–12:00", color: "bg-emerald-500" },
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${s.color} text-white flex items-center justify-center text-xs font-bold`}>
                          {s.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.role}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{s.time}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Operations & Coverage Map */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-300">Operations & Coverage Map</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-3">
                Visualize service zones, pickup/delivery points, and active sites across your region.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Map-style Card */}
              <Card className="lg:col-span-2 border-emerald-200/50 bg-emerald-50/40 dark:bg-emerald-950/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[280px] sm:h-[340px] md:h-[380px]">
                    {/* Subtle grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
                    {/* Pins */}
                    <div className="absolute inset-0">
                      <div className="absolute left-[18%] top-[22%] w-4 h-4 rounded-full bg-emerald-500 shadow-md" />
                      <div className="absolute left-[46%] top-[38%] w-4 h-4 rounded-full bg-sky-500 shadow-md" />
                      <div className="absolute left-[66%] top-[28%] w-4 h-4 rounded-full bg-amber-500 shadow-md" />
                      <div className="absolute left-[32%] top-[62%] w-4 h-4 rounded-full bg-teal-500 shadow-md" />
                      <div className="absolute left-[74%] top-[58%] w-4 h-4 rounded-full bg-emerald-500 shadow-md" />
                    </div>
                    {/* Legend */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm border rounded-xl px-4 py-2 flex items-center gap-4 text-sm">
                      <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Warehouse</span>
                      <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500" /> Pickup</span>
                      <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /> Distribution</span>
                      <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-teal-500" /> Partner Site</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mini Metrics */}
              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
                <Card className="border-emerald-200/50 bg-card backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-sm text-muted-foreground">Active Sites</div>
                    <div className="text-3xl font-bold text-foreground mt-1">27</div>
                  </CardContent>
                </Card>
                <Card className="border-emerald-200/50 bg-card backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-sm text-muted-foreground">Capacity Utilization</div>
                    <div className="text-3xl font-bold text-foreground mt-1">68%</div>
                  </CardContent>
                </Card>
                <Card className="border-emerald-200/50 bg-card backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-sm text-muted-foreground">Avg. Response Time</div>
                    <div className="text-3xl font-bold text-foreground mt-1">38m</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Founding Partner CTA */}
        <section className="mb-20">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm">
            <CardContent className="p-12 lg:p-16 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Become a Founding Church Partner</h2>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Shape the Future of Ministry Technology</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                We're inviting select churches to join our early access program. Founding partners receive personalized onboarding, early feature access, and a voice in the evolution of ministry tools.
              </p>
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold px-12 py-6 text-xl rounded-xl shadow-lg hover-lift"
                asChild
              >
                <Link to="/contact">Join as a Founding Partner</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Ministry Stories Section */}
        <section className="space-y-8 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Shared Purpose, Diverse Missions</h2>
            <h3 className="text-2xl font-semibold text-foreground mb-6">United in Ministry</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From local outreach to global missions — every ministry belongs here. Together, we’re building a network that helps churches help people.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 px-2">
            {charityStories.map((story) => (
              <Card key={story.id} className="border-0 shadow-card hover:shadow-lg hover-lift bg-card backdrop-blur-sm group h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="grid lg:grid-cols-3 gap-8 items-center h-full">
                    <div className="lg:col-span-2">
                      <h4 className="text-xl font-bold text-foreground mb-2">{story.leader}, {story.title}</h4>
                      <div className="text-muted-foreground mb-2">{story.organization} — {story.location}</div>
                      <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                        "{story.testimonial}"
                      </blockquote>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-emerald-500/10 px-3 py-1 rounded-full">{story.impact}</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{story.yearsInService}</div>
                        <p className="text-sm text-muted-foreground">Years in Service</p>
                      </div>
                      <div className="text-center border-t pt-4">
                        <p className="text-sm font-medium text-foreground mb-1">Key Achievement</p>
                        <p className="text-sm text-muted-foreground">{story.keyMetric}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center mt-20 animate-fade-in">
          <div className="relative bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-16 lg:p-24 text-foreground overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 text-emerald-700 dark:text-emerald-300 font-medium mb-6">
                <HandHeart className="w-4 h-4" />
                <span>Church Ministries</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Bring Your Ministries Together</h2>
              <p className="text-xl lg:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-muted-foreground">
                Set up a unified hub for volunteers, donations, and outreach. Clear dashboards, simple scheduling, and impact reports built for churches.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold px-12 py-6 text-xl rounded-xl shadow-lg hover-lift" 
                  asChild
                >
                  <Link to="/register">Launch Your Ministry Hub</Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-border text-white hover:text-white hover:bg-emerald-500/10 hover:border-emerald-500 px-12 py-6 text-xl rounded-xl transition-all duration-200 hover-lift" 
                  asChild
                >
                  <Link to="/contact">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Talk to Our Team
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

