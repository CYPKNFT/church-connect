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
  Area,
  AreaChart
} from "recharts";
import { Users, UserPlus, UserCheck, Calendar, MapPin, Clock } from "lucide-react";

interface MemberAnalyticsProps {
  timeframe: string;
}

const memberGrowthData = [
  { month: "Jan", newMembers: 15, totalMembers: 120, activeMembers: 89 },
  { month: "Feb", newMembers: 18, totalMembers: 135, activeMembers: 102 },
  { month: "Mar", newMembers: 12, totalMembers: 148, activeMembers: 118 },
  { month: "Apr", newMembers: 22, totalMembers: 162, activeMembers: 125 },
  { month: "May", newMembers: 16, totalMembers: 178, activeMembers: 142 },
  { month: "Jun", newMembers: 20, totalMembers: 195, activeMembers: 156 }
];

const memberAgeGroups = [
  { group: "18-25", count: 28, percentage: 14 },
  { group: "26-35", count: 52, percentage: 27 },
  { group: "36-45", count: 65, percentage: 33 },
  { group: "46-55", count: 31, percentage: 16 },
  { group: "55+", count: 19, percentage: 10 }
];

const memberEngagement = [
  { day: "Mon", logins: 45, actions: 89 },
  { day: "Tue", logins: 38, actions: 76 },
  { day: "Wed", logins: 52, actions: 98 },
  { day: "Thu", logins: 41, actions: 82 },
  { day: "Fri", logins: 48, actions: 94 },
  { day: "Sat", logins: 35, actions: 68 },
  { day: "Sun", logins: 29, actions: 55 }
];

export function MemberAnalytics({ timeframe }: MemberAnalyticsProps) {
  const memberMetrics = [
    {
      title: "Total Members",
      value: "195",
      change: "+20 this month",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "New Registrations",
      value: "20",
      change: "+25% vs last month",
      icon: UserPlus,
      color: "text-success"
    },
    {
      title: "Active Members",
      value: "156",
      change: "80% engagement rate",
      icon: UserCheck,
      color: "text-accent"
    },
    {
      title: "Avg. Session Time",
      value: "12.5m",
      change: "+2.3m vs last month",
      icon: Clock,
      color: "text-info"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Member Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {memberMetrics.map((metric) => (
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
        {/* Member Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Member Growth
            </CardTitle>
            <CardDescription>
              New member registrations and total growth over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={memberGrowthData}>
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
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalMembers"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.3)"
                    name="Total Members"
                  />
                  <Area
                    type="monotone"
                    dataKey="activeMembers"
                    stackId="2"
                    stroke="hsl(var(--success))"
                    fill="hsl(var(--success) / 0.3)"
                    name="Active Members"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Age Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Age Demographics
            </CardTitle>
            <CardDescription>
              Member distribution by age groups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={memberAgeGroups} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    type="number" 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis 
                    type="category" 
                    dataKey="group" 
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--accent))" 
                    radius={[0, 4, 4, 0]}
                    name="Members"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement and Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Daily Engagement
          </CardTitle>
          <CardDescription>
            Member login activity and platform interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memberEngagement}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="day" 
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
                  dataKey="logins" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  name="Daily Logins"
                />
                <Line 
                  type="monotone" 
                  dataKey="actions" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--accent))", strokeWidth: 2 }}
                  name="Platform Actions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Member Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Contributors</CardTitle>
            <CardDescription>Most active volunteers this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Sarah Johnson", needs: 12, rating: 4.9 },
              { name: "Mike Chen", needs: 10, rating: 4.8 },
              { name: "Emily Davis", needs: 9, rating: 4.9 },
              { name: "David Wilson", needs: 8, rating: 4.7 }
            ].map((member, index) => (
              <div key={member.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                    {index + 1}
                  </Badge>
                  <div>
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.needs} needs helped</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  ★ {member.rating}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Geographic Distribution</CardTitle>
            <CardDescription>Member locations by area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { area: "Downtown", count: 45, percentage: 23 },
              { area: "Suburbs North", count: 38, percentage: 19 },
              { area: "Suburbs South", count: 42, percentage: 22 },
              { area: "East Side", count: 31, percentage: 16 },
              { area: "West Side", count: 39, percentage: 20 }
            ].map((location) => (
              <div key={location.area} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{location.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{location.count}</span>
                  <Badge variant="outline" className="text-xs">
                    {location.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Member Retention</CardTitle>
            <CardDescription>Activity and retention metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>30-day retention</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Weekly active users</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Avg. session duration</span>
                <span className="font-medium">12.5min</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: "63%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}