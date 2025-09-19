import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, TrendingDown, Users, Heart, CheckCircle, Activity, MessageSquare, Clock } from "lucide-react";

interface AnalyticsOverviewProps {
  timeframe: string;
}

const mockActivityData = [
  { name: "Mon", needs: 12, volunteers: 18, messages: 45 },
  { name: "Tue", needs: 8, volunteers: 22, messages: 38 },
  { name: "Wed", needs: 15, volunteers: 28, messages: 52 },
  { name: "Thu", needs: 10, volunteers: 20, messages: 41 },
  { name: "Fri", needs: 18, volunteers: 35, messages: 67 },
  { name: "Sat", needs: 25, volunteers: 42, messages: 78 },
  { name: "Sun", needs: 20, volunteers: 38, messages: 58 }
];

const mockGrowthData = [
  { month: "Jan", members: 120, needs: 45 },
  { month: "Feb", members: 135, needs: 52 },
  { month: "Mar", members: 148, needs: 48 },
  { month: "Apr", members: 162, needs: 61 },
  { month: "May", members: 178, needs: 58 },
  { month: "Jun", members: 195, needs: 67 }
];

const mockCategoryData = [
  { name: "Transportation", value: 35, color: "hsl(var(--primary))" },
  { name: "Meals", value: 28, color: "hsl(var(--accent))" },
  { name: "Home Help", value: 20, color: "hsl(var(--success))" },
  { name: "Childcare", value: 17, color: "hsl(var(--warning))" }
];

export function AnalyticsOverview({ timeframe }: AnalyticsOverviewProps) {
  const keyMetrics = [
    {
      title: "Total Members",
      value: "195",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "Active community members"
    },
    {
      title: "Active Needs",
      value: "28",
      change: "+5",
      trend: "up",
      icon: Heart,
      description: "Current open requests"
    },
    {
      title: "Fulfilled This Month",
      value: "67",
      change: "+18%",
      trend: "up",
      icon: CheckCircle,
      description: "Successfully completed"
    },
    {
      title: "Response Time",
      value: "2.4h",
      change: "-0.8h",
      trend: "up",
      icon: Clock,
      description: "Average response time"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <div className={`flex items-center gap-1 text-xs font-medium ${
                      metric.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Weekly Activity
            </CardTitle>
            <CardDescription>
              Daily breakdown of needs, volunteers, and messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockActivityData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="needs" fill="hsl(var(--primary))" name="Needs" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="volunteers" fill="hsl(var(--accent))" name="Volunteers" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="messages" fill="hsl(var(--success))" name="Messages" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Growth Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Growth Trends
            </CardTitle>
            <CardDescription>
              Member growth and needs fulfillment over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="members" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    name="Members"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="needs" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--accent))", strokeWidth: 2 }}
                    name="Needs Fulfilled"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Need Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
            <CardDescription>
              Most requested help categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {mockCategoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Goals</CardTitle>
            <CardDescription>
              Progress toward community objectives
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>New Members</span>
                <span className="font-medium">12/15</span>
              </div>
              <Progress value={80} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>80% Complete</span>
                <span>3 more needed</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Needs Fulfilled</span>
                <span className="font-medium">67/75</span>
              </div>
              <Progress value={89} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>89% Complete</span>
                <span>8 more needed</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Time</span>
                <span className="font-medium">2.4h/2h</span>
              </div>
              <Progress value={83} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Need improvement</span>
                <span>-0.4h needed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-muted-foreground">This week</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">378</p>
                <Badge variant="secondary" className="text-xs">
                  +23%
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-accent" />
                <div>
                  <p className="font-medium">Active Users</p>
                  <p className="text-sm text-muted-foreground">Daily average</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">89</p>
                <Badge variant="secondary" className="text-xs">
                  +15%
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium">Satisfaction</p>
                  <p className="text-sm text-muted-foreground">Average rating</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">4.8</p>
                <Badge variant="secondary" className="text-xs">
                  Excellent
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}