import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    category: string;
    start_datetime: string;
    location_text: string;
    attending_count: number;
    volunteer_slots_total?: number;
    volunteer_slots_filled?: number;
  };
  categoryIcon: React.ComponentType<{ className?: string }>;
  categoryColor: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, categoryIcon: IconComponent, categoryColor }) => {
  const progressPercentage = event.volunteer_slots_total > 0 
    ? (event.volunteer_slots_filled || 0) / event.volunteer_slots_total * 100 
    : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    return { month, day };
  };

  const { month, day } = formatDate(event.start_datetime);

  return (
    <Card className="border-0 shadow-card hover:shadow-accent hover-lift group h-full">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header with Date in Corner */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <IconComponent className="w-6 h-6 text-accent" />
            </div>
            <Badge variant={categoryColor as any} className="shrink-0">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{month}</div>
            <div className="text-lg font-bold text-foreground">{day}</div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{event.description}</p>
          
          {/* Event Details */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="truncate">{new Date(event.start_datetime).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">{event.location_text}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 shrink-0" />
              <span>{event.attending_count} attending</span>
            </div>
          </div>

          {/* Volunteer Progress */}
          {(event.volunteer_slots_total || 0) > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Volunteers</span>
                <span>{event.volunteer_slots_filled || 0}/{event.volunteer_slots_total}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              {progressPercentage < 100 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {(event.volunteer_slots_total || 0) - (event.volunteer_slots_filled || 0)} more needed
                </p>
              )}
            </div>
          )}

          {/* Action Button */}
          <Link to={`/events/${event.id}`} className="mt-auto">
            <Button className="w-full group">
              View Details
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};