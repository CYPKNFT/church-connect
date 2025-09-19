import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Heart, Clock, CheckCircle, AlertTriangle, Car, Home, Baby, Utensils } from "lucide-react";

interface NeedsAnalyticsProps {
  timeframe: string;
}

const needsFulfillmentData = [
  { month: "Jan", posted: 52, fulfilled: 45, pending: 7 },
  { month: "Feb", posted: 48, fulfilled: 42, pending: 6 },
  { month: "Mar", posted: 61, fulfilled: 55, pending: 6 },
  { month: "Apr", posted: 58, fulfilled: 52, pending: 6 },
  { month: "May", posted: 67, fulfilled: 58, pending: 9 },
  { month: "Jun", posted: 72, fulfilled: 67, pending: 5 }
];

const responseTimeData = [
  { day: "Mon", avgHours: 2.1, requests: 8 },
  { day: "Tue", avgHours: 3.2, requests: 5 },
  { day: "Wed", avgHours: 1.8, requests: 12 },
  { day: "Thu", avgHours: 2.7, requests: 7 },
  { day: "Fri", avgHours: 2.4, requests: 15 },
  { day: "Sat", avgHours: 1.9, requests: 18 },
  { day: "Sun", avgHours: 2.8, requests: 10 }
];

const categoryData = [
  { name: "Transportation", value: 35, color: "hsl(var(--primary))", icon: Car },
  { name: "Meals & Food", value: 28, color: "hsl(var(--accent))", icon: Utensils },
  { name: "Home Help", value: 20, color: "hsl(var(--success))", icon: Home },
  { name: "Childcare", value: 17, color: "hsl(var(--warning))", icon: Baby }
];

const urgencyDistribution = [
  { urgency: "Low", count: 45, color: "hsl(var(--success))" },
  { urgency: "Medium", count: 32, color: "hsl(var(--warning))" },
  { urgency: "High", count: 18, color: "hsl(var(--destructive))" },
  { urgency: "Critical", count: 5, color: "hsl(var(--destructive))" }
];

export function NeedsAnalytics({ timeframe }: NeedsAnalyticsProps) {
  const needsMetrics = [
    {
      title: "Total Needs Posted",
      value: "358",
      change: "+15% this month",
      icon: Heart,
      color: "text-primary"
    },
    {
      title: "Fulfillment Rate",
      value: "89.2%",
      change: "Above target (85%)",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-0.8h improvement",
      icon: Clock,
      color: "text-info"
    },
    {
      title: "Pending Requests",
      value: "12",
      change: "3 urgent, 9 standard",
      icon: AlertTriangle,
      color: "text-warning"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Needs Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {needsMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {metric.change}
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-full">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Needs Fulfillment Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Fulfillment Trends
            </CardTitle>
            <CardDescription>
              Monthly breakdown of posted vs fulfilled needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={needsFulfillmentData}>
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
                  <Bar dataKey="posted" fill="hsl(var(--muted))" name="Posted" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fulfilled" fill="hsl(var(--success))" name="Fulfilled" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="hsl(var(--warning))" name="Pending" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Response Time Analysis
            </CardTitle>
            <CardDescription>
              Average response time vs number of requests by day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right"
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
                    yAxisId="left"
                    type="monotone" 
                    dataKey="avgHours" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    name="Avg Response (hours)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="requests" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--accent))", strokeWidth: 2 }}
                    name="Daily Requests"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown and Urgency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Need Categories
            </CardTitle>
            <CardDescription>
              Distribution of requests by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" style={{ color: category.color }} />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category.value}%</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round((category.value / 100) * 72)} requests
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Urgency Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Urgency Levels
            </CardTitle>
            <CardDescription>
              Current needs breakdown by urgency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={urgencyDistribution} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    type="category" 
                    dataKey="urgency" 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    radius={[0, 4, 4, 0]}
                    name="Requests"
                  >
                    {urgencyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {urgencyDistribution.map((item) => (
                <div key={item.urgency} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.urgency} Priority</span>
                  </div>
                  <span className="font-medium">{item.count} needs</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Requested Skills</CardTitle>
            <CardDescription>Most in-demand volunteer skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { skill: "Transportation", requests: 28, trend: "+15%" },
              { skill: "Meal Preparation", requests: 22, trend: "+8%" },
              { skill: "Home Repairs", requests: 18, trend: "+12%" },
              { skill: "Childcare", requests: 15, trend: "+5%" }
            ].map((skill) => (
              <div key={skill.skill} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{skill.skill}</p>
                  <p className="text-xs text-muted-foreground">{skill.requests} requests</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {skill.trend}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Volunteer Matching</CardTitle>
            <CardDescription>Efficiency of volunteer assignment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Match success rate</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Avg. volunteers per need</span>
                <span className="font-medium">2.3</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "77%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Time to assignment</span>
                <span className="font-medium">4.2h</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: "68%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quality Metrics</CardTitle>
            <CardDescription>Service quality and satisfaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Satisfaction Rating</p>
                <p className="text-xs text-muted-foreground">Average across all needs</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">4.8</p>
                <Badge variant="secondary" className="text-xs">★★★★★</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Completion Rate</p>
                <p className="text-xs text-muted-foreground">Successfully finished</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">94%</p>
                <Badge variant="secondary" className="text-xs">Excellent</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Return Volunteers</p>
                <p className="text-xs text-muted-foreground">Repeat helpers</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">76%</p>
                <Badge variant="secondary" className="text-xs">High</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}