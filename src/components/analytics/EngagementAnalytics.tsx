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
import { MessageSquare, Heart, Bell, Star, ThumbsUp, Users, Activity, Calendar } from "lucide-react";

interface EngagementAnalyticsProps {
  timeframe: string;
}

const messageActivityData = [
  { day: "Mon", messages: 45, participants: 28, threads: 12 },
  { day: "Tue", messages: 38, participants: 22, threads: 9 },
  { day: "Wed", messages: 52, participants: 35, threads: 15 },
  { day: "Thu", messages: 41, participants: 29, threads: 11 },
  { day: "Fri", messages: 67, participants: 42, threads: 18 },
  { day: "Sat", messages: 78, participants: 48, threads: 22 },
  { day: "Sun", messages: 58, participants: 36, threads: 16 }
];

const engagementTrends = [
  { month: "Jan", likes: 245, comments: 178, shares: 89, feedback: 67 },
  { month: "Feb", likes: 289, comments: 201, shares: 102, feedback: 78 },
  { month: "Mar", likes: 312, comments: 198, shares: 115, feedback: 82 },
  { month: "Apr", likes: 356, comments: 234, shares: 128, feedback: 94 },
  { month: "May", likes: 389, comments: 267, shares: 142, feedback: 103 },
  { month: "Jun", likes: 425, comments: 298, shares: 158, feedback: 118 }
];

const notificationEngagement = [
  { type: "Email", sent: 1250, opened: 875, clicked: 245 },
  { type: "Push", sent: 890, opened: 623, clicked: 178 },
  { type: "SMS", sent: 345, opened: 298, clicked: 89 },
  { type: "In-App", sent: 2100, opened: 1680, clicked: 567 }
];

export function EngagementAnalytics({ timeframe }: EngagementAnalyticsProps) {
  const engagementMetrics = [
    {
      title: "Total Messages",
      value: "2,847",
      change: "+23% this month",
      icon: MessageSquare,
      color: "text-primary"
    },
    {
      title: "Avg. Response Rate",
      value: "87%",
      change: "+12% vs last month",
      icon: Activity,
      color: "text-success"
    },
    {
      title: "Community Interactions",
      value: "1,456",
      change: "Likes, comments, shares",
      icon: ThumbsUp,
      color: "text-accent"
    },
    {
      title: "Notification Opens",
      value: "3,476",
      change: "78% open rate",
      icon: Bell,
      color: "text-info"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {engagementMetrics.map((metric) => (
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
        {/* Message Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Daily Message Activity
            </CardTitle>
            <CardDescription>
              Messages, active participants, and conversation threads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={messageActivityData}>
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
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary) / 0.3)"
                    name="Messages"
                  />
                  <Area
                    type="monotone"
                    dataKey="participants"
                    stackId="2"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent) / 0.3)"
                    name="Participants"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Community Engagement Trends
            </CardTitle>
            <CardDescription>
              Monthly progression of community interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementTrends}>
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
                  <Line 
                    type="monotone" 
                    dataKey="likes" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    name="Likes"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="comments" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--accent))", strokeWidth: 2 }}
                    name="Comments"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="feedback" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
                    name="Feedback"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Performance
          </CardTitle>
          <CardDescription>
            Effectiveness of different notification channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={notificationEngagement}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="type" 
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
                <Bar dataKey="sent" fill="hsl(var(--muted))" name="Sent" radius={[4, 4, 0, 0]} />
                <Bar dataKey="opened" fill="hsl(var(--primary))" name="Opened" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicked" fill="hsl(var(--success))" name="Clicked" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Engagement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Conversation Starters</CardTitle>
            <CardDescription>Most active community members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Sarah M.", threads: 18, responses: 67 },
              { name: "Mike R.", threads: 15, responses: 54 },
              { name: "Lisa K.", threads: 12, responses: 42 },
              { name: "Tom B.", threads: 11, responses: 38 }
            ].map((member) => (
              <div key={member.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.threads} threads, {member.responses} responses
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Response Patterns</CardTitle>
            <CardDescription>When community is most active</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Peak hours</span>
                <span className="font-medium">7-9 PM</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Weekend activity</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: "68%" }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Thread completion</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Engagement Quality</CardTitle>
            <CardDescription>Satisfaction and interaction metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium text-sm">Avg. Rating</p>
                  <p className="text-xs text-muted-foreground">User feedback</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">4.7</p>
                <Badge variant="secondary" className="text-xs">Excellent</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Active Daily</p>
                  <p className="text-xs text-muted-foreground">Unique users</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">89</p>
                <Badge variant="secondary" className="text-xs">+12%</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-success" />
                <div>
                  <p className="font-medium text-sm">Retention</p>
                  <p className="text-xs text-muted-foreground">7-day return</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">78%</p>
                <Badge variant="secondary" className="text-xs">Strong</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}