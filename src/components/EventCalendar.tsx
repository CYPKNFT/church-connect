import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Bell, Filter, Activity } from "lucide-react";
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
        <Button variant="outline" size="sm" className="gap-2 bg-background/80 backdrop-blur-sm border-border/30 hover:bg-accent/50">
          <CalendarIcon className="w-4 h-4" />
          Calendar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl h-[85vh] flex flex-col p-0">
        <DialogHeader className="shrink-0 p-6 pb-0">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold">Church Events Calendar</span>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-xl font-semibold min-w-[160px] text-center">
                {format(currentMonth, "MMMM yyyy")}
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 grid grid-cols-12 gap-6 p-6 pt-4 min-h-0">
          {/* Main Calendar Section */}
          <div className="col-span-7 flex flex-col min-h-0">
            {/* Quick Actions Bar - Moved to top */}
            <div className="shrink-0 flex items-center justify-between p-4 bg-accent/5 rounded-lg border mb-4">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())} className="h-8">
                  Today
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  Export Calendar
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Today</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className={cn("p-6 pointer-events-auto scale-110 origin-center")}
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-6",
                  caption: "flex justify-center pt-2 relative items-center mb-4",
                  caption_label: "text-lg font-semibold",
                  nav: "hidden", // Hide the duplicate navigation
                  table: "w-full border-collapse space-y-2",
                  head_row: "flex mb-2",
                  head_cell: "text-muted-foreground rounded-md w-12 h-12 font-semibold text-sm flex items-center justify-center",
                  row: "flex w-full mt-2",
                  cell: "h-12 w-12 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: cn("h-12 w-12 p-0 font-medium aria-selected:opacity-100 rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 relative"),
                  day_range_end: "day-range-end",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground font-bold border-2 border-primary",
                  day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
                modifiers={{
                  hasEvents: (date) => getEventsForDate(date).length > 0
                }}
                modifiersClassNames={{
                  hasEvents: "after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-2 after:h-2 after:bg-primary after:rounded-full after:opacity-80"
                }}
              />
            </div>
            
            {/* Calendar Settings - Moved below */}
            <Card className="shrink-0 mt-4">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 text-sm">Settings</h4>
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7 hover:bg-accent/50">
                    <Bell className="w-3 h-3 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7 hover:bg-accent/50">
                    <Filter className="w-3 h-3 mr-2" />
                    Filter Events
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-7 hover:bg-accent/50">
                    <Calendar className="w-3 h-3 mr-2" />
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Event Details */}
          <div className="col-span-5 flex flex-col space-y-4 min-h-0">
            {/* Selected Date Events - Full height */}
            <Card className="flex-1 min-h-0">
              <CardContent className="p-4 h-full flex flex-col">
                <div className="shrink-0 mb-3">
                  <h3 className="font-bold text-lg mb-1">
                    {selectedDate ? format(selectedDate, "EEEE, MMM d") : "Select a date"}
                  </h3>
                  {selectedDate && (
                    <p className="text-sm text-muted-foreground">
                      {eventsOnSelectedDate.length} event{eventsOnSelectedDate.length !== 1 ? 's' : ''} scheduled
                    </p>
                  )}
                </div>
                
                <div className="flex-1 min-h-0 overflow-hidden">
                  {eventsOnSelectedDate.length > 0 ? (
                    <div className="space-y-2 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
                      {eventsOnSelectedDate.map((event) => (
                        <Card key={event.id} className="border-l-4 border-l-primary hover:shadow-sm transition-all bg-accent/5">
                          <CardContent className="p-3">
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold text-sm line-clamp-2 flex-1">{event.title}</h4>
                                <Badge variant="secondary" className={cn("text-xs shrink-0", getCategoryColor(event.category))}>
                                  {event.category}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {format(new Date(event.start_datetime), "h:mm a")}
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="text-xs h-6 flex-1">
                                  View
                                </Button>
                                <Button size="sm" className="text-xs h-6 flex-1">
                                  RSVP
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-center">
                      <div className="space-y-2">
                        <CalendarIcon className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
                        <p className="text-sm text-muted-foreground">No events this date</p>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          <Plus className="w-3 h-3 mr-1" />
                          Add Event
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* This Month's Activity - Integrated at bottom */}
                {datesWithEvents.length > 0 && (
                  <div className="shrink-0 mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                      <Activity className="w-4 h-4" />
                      This Month ({datesWithEvents.length} days)
                    </h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
                      {datesWithEvents.slice(0, 6).map((date) => (
                        <button
                          key={date.toISOString()}
                          onClick={() => setSelectedDate(date)}
                          className="w-full text-left p-2 text-xs hover:bg-accent/50 rounded-md transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <div className="font-medium">{format(date, "MMM d")}</div>
                            <div className="text-muted-foreground">
                              {getEventsForDate(date).length} event{getEventsForDate(date).length !== 1 ? 's' : ''}
                            </div>
                          </div>
                          <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                      {datesWithEvents.length > 6 && (
                        <div className="text-xs text-muted-foreground p-2 text-center border-t">
                          +{datesWithEvents.length - 6} more days
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};