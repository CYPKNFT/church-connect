import { useEffect, useState } from "react";
import { MessageSquare, Star, Building, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackStatsData {
  totalAppFeedback: number;
  totalChurchFeedback: number;
  averageAppRating: number;
  averageChurchRating: number;
  recentSubmissions: number;
}

export function FeedbackStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<FeedbackStatsData>({
    totalAppFeedback: 0,
    totalChurchFeedback: 0,
    averageAppRating: 0,
    averageChurchRating: 0,
    recentSubmissions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        // Fetch app feedback stats
        const { data: appFeedback, error: appError } = await supabase
          .from('app_feedback' as any)
          .select('id, rating, created_at')
          .eq('user_id', user.id);

        // Fetch church feedback stats
        const { data: churchFeedback, error: churchError } = await supabase
          .from('church_feedback' as any)
          .select('id, rating, created_at')
          .eq('user_id', user.id);

        if (appError) throw appError;
        if (churchError) throw churchError;

        // Calculate stats
        const appRatings = appFeedback?.filter((f: any) => f.rating).map((f: any) => f.rating) || [];
        const churchRatings = churchFeedback?.filter((f: any) => f.rating).map((f: any) => f.rating) || [];
        
        const avgAppRating = appRatings.length > 0 
          ? appRatings.reduce((sum, rating) => sum + rating, 0) / appRatings.length 
          : 0;
        
        const avgChurchRating = churchRatings.length > 0
          ? churchRatings.reduce((sum, rating) => sum + rating, 0) / churchRatings.length
          : 0;

        // Count recent submissions (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentApp = appFeedback?.filter((f: any) => 
          new Date(f.created_at) > thirtyDaysAgo
        ).length || 0;
        
        const recentChurch = churchFeedback?.filter((f: any) => 
          new Date(f.created_at) > thirtyDaysAgo
        ).length || 0;

        setStats({
          totalAppFeedback: appFeedback?.length || 0,
          totalChurchFeedback: churchFeedback?.length || 0,
          averageAppRating: Math.round(avgAppRating * 10) / 10,
          averageChurchRating: Math.round(avgChurchRating * 10) / 10,
          recentSubmissions: recentApp + recentChurch
        });
      } catch (error) {
        console.error('Error fetching feedback stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "App Feedback",
      value: stats.totalAppFeedback,
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Church Feedback", 
      value: stats.totalChurchFeedback,
      icon: Building,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "App Rating",
      value: stats.averageAppRating > 0 ? `${stats.averageAppRating}/5` : "N/A",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Recent (30d)",
      value: stats.recentSubmissions,
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}