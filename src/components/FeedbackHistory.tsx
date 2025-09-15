import { useEffect, useState } from "react";
import { Calendar, MessageSquare, Building, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface FeedbackItem {
  id: string;
  title: string;
  category: string;
  created_at: string;
  rating?: number;
  type: 'app' | 'church';
  reply?: string;
  handled_at?: string;
}

export function FeedbackHistory() {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!user) return;

      try {
        // Fetch app feedback
        const { data: appFeedback, error: appError } = await supabase
          .from('app_feedback' as any)
          .select('id, title, category, created_at, rating, reply, handled_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        // Fetch church feedback
        const { data: churchFeedback, error: churchError } = await supabase
          .from('church_feedback' as any)
          .select('id, title, category, created_at, rating, reply, handled_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (appError) throw appError;
        if (churchError) throw churchError;

        // Combine and sort feedback
        const combinedFeedback: FeedbackItem[] = [
          ...(appFeedback?.map((item: any) => ({ ...item, type: 'app' as const })) || []),
          ...(churchFeedback?.map((item: any) => ({ ...item, type: 'church' as const })) || [])
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setFeedback(combinedFeedback);
      } catch (error) {
        console.error('Error fetching feedback history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayedFeedback = showAll ? feedback : feedback.slice(0, 5);

  const getCategoryColor = (category: string, type: 'app' | 'church') => {
    if (type === 'app') {
      switch (category) {
        case 'bug': return 'bg-red-50 text-red-700 border-red-200';
        case 'feature': return 'bg-green-50 text-green-700 border-green-200';
        case 'praise': return 'bg-purple-50 text-purple-700 border-purple-200';
        case 'question': return 'bg-blue-50 text-blue-700 border-blue-200';
        default: return 'bg-gray-50 text-gray-700 border-gray-200';
      }
    } else {
      switch (category) {
        case 'worship': return 'bg-purple-50 text-purple-700 border-purple-200';
        case 'community': return 'bg-blue-50 text-blue-700 border-blue-200';
        case 'events': return 'bg-green-50 text-green-700 border-green-200';
        case 'facilities': return 'bg-orange-50 text-orange-700 border-orange-200';
        case 'leadership': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
        case 'outreach': return 'bg-red-50 text-red-700 border-red-200';
        default: return 'bg-gray-50 text-gray-700 border-gray-200';
      }
    }
  };

  const formatCategoryLabel = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Recent Feedback
        </CardTitle>
        <CardDescription>
          Your feedback submissions and responses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {feedback.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No feedback submitted yet</p>
            <p className="text-sm text-muted-foreground">
              Submit your first feedback using the cards above
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedFeedback.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
              >
                <div className="flex-shrink-0">
                  {item.type === 'app' ? (
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <Building className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground line-clamp-1">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={getCategoryColor(item.category, item.type)}
                        >
                          {formatCategoryLabel(item.category)}
                        </Badge>
                        <Badge variant="outline">
                          {item.type === 'app' ? 'App' : 'Church'}
                        </Badge>
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{item.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                      </p>
                      {item.reply && (
                        <Badge variant="secondary" className="mt-1">
                          Replied
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {item.reply && (
                    <div className="mt-3 p-3 bg-primary/5 rounded-lg border-l-2 border-primary">
                      <p className="text-sm text-muted-foreground mb-1">Response:</p>
                      <p className="text-sm text-foreground">{item.reply}</p>
                      {item.handled_at && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Replied {formatDistanceToNow(new Date(item.handled_at), { addSuffix: true })}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {feedback.length > 5 && (
              <div className="text-center pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowAll(!showAll)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {showAll ? (
                    "Show Less"
                  ) : (
                    <>
                      Show All {feedback.length} Items
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}