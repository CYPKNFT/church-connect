import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";

interface Event {
  id: string;
  title: string;
  start_datetime: string;
  category: string;
}

interface EventCalendarProps {
  events: Event[];
}

export const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(new Date(event.start_datetime), date)
    );
  };

  // Get all dates in current month that have events
  const getDatesWithEvents = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    return daysInMonth.filter(date => getEventsForDate(date).length > 0);
  };

  const eventsOnSelectedDate = selectedDate ? getEventsForDate(selectedDate) : [];
  const datesWithEvents = getDatesWithEvents();

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => 
      direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1)
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      worship: "bg-purple-100 text-purple-800",
      fellowship: "bg-blue-100 text-blue-800", 
      outreach: "bg-green-100 text-green-800",
      service: "bg-orange-100 text-orange-800",
      youth: "bg-pink-100 text-pink-800",
      children: "bg-yellow-100 text-yellow-800"
    };
    return colors[category.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarIcon className="w-4 h-4" />
          Calendar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Church Events Calendar</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[140px] text-center">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className={cn("p-3 pointer-events-auto w-full")}
              classNames={{
                day: cn(
                  "h-12 w-12 p-0 font-normal aria-selected:opacity-100 relative",
                  "hover:bg-accent hover:text-accent-foreground"
                ),
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground font-semibold",
              }}
              modifiers={{
                hasEvents: (date) => getEventsForDate(date).length > 0
              }}
              modifiersClassNames={{
                hasEvents: "after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full"
              }}
            />
          </div>

          {/* Events for selected date */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
              </h3>
              {eventsOnSelectedDate.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {eventsOnSelectedDate.map((event) => (
                    <Card key={event.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium text-sm line-clamp-2">{event.title}</h4>
                            <Badge variant="secondary" className={cn("text-xs", getCategoryColor(event.category))}>
                              {event.category}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(event.start_datetime), "h:mm a")}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No events scheduled for this date.</p>
              )}
            </div>

            {/* Upcoming events overview */}
            {datesWithEvents.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">This Month's Events</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {datesWithEvents.slice(0, 5).map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className="w-full text-left p-2 text-xs hover:bg-accent rounded-md transition-colors"
                    >
                      <div className="font-medium">{format(date, "MMM d")}</div>
                      <div className="text-muted-foreground">
                        {getEventsForDate(date).length} event{getEventsForDate(date).length !== 1 ? 's' : ''}
                      </div>
                    </button>
                  ))}
                  {datesWithEvents.length > 5 && (
                    <div className="text-xs text-muted-foreground p-2">
                      +{datesWithEvents.length - 5} more days with events
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};