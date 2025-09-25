import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from "date-fns";

interface Event {
  id: string;
  title: string;
  start_datetime: string;
  category: string;
  description?: string;
}

interface CompactEventCalendarProps {
  events: Event[];
  showCard?: boolean;
}

export function CompactEventCalendar({ events, showCard = true }: CompactEventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(new Date(event.start_datetime), date)
    );
  };

  const getDaysWithEvents = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    return daysInMonth.filter(day => getEventsForDate(day).length > 0);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const daysWithEvents = getDaysWithEvents();

  const calendarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth('prev')}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold text-foreground">
          {format(currentMonth, 'MMM yyyy')}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateMonth('next')}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Compact Calendar Grid */}
      <div className="flex-1 mb-4">
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-xs font-medium text-muted-foreground p-1">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {eachDayOfInterval({
            start: startOfMonth(currentMonth),
            end: endOfMonth(currentMonth)
          }).map((day, i) => {
            const hasEvents = getEventsForDate(day).length > 0;
            const isToday = isSameDay(day, new Date());
            
            return (
              <div
                key={i}
                className={`
                  relative text-center p-1 text-sm cursor-pointer rounded-sm
                  ${isSameMonth(day, currentMonth) ? 'text-foreground' : 'text-muted-foreground/50'}
                  ${isToday ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}
                `}
                onClick={() => {
                  setSelectedDate(day);
                  if (hasEvents) setIsOpen(true);
                }}
              >
                {format(day, 'd')}
                {hasEvents && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Button - positioned to align with event card buttons */}
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-auto"
        size="default"
      >
        <CalendarIcon className="h-4 w-4 mr-2" />
        Calendar
      </Button>
    </div>
  );

  return (
    <>
      {showCard ? (
        <Card className="w-full h-full bg-card border border-border">
          <CardContent className="p-6 h-full flex flex-col">
            {calendarContent}
          </CardContent>
        </Card>
      ) : (
        <div className="w-full h-full">
          {calendarContent}
        </div>
      )}

      {/* Enhanced Calendar Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              Church Events Calendar
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[600px]">
            {/* Calendar - Takes 3/5 width */}
            <div className="lg:col-span-3">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="pointer-events-auto w-full"
                modifiers={{
                  hasEvents: daysWithEvents
                }}
                modifiersStyles={{
                  hasEvents: {
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    borderRadius: '50%',
                    fontWeight: 'bold'
                  }
                }}
              />
            </div>

            {/* Events Panel - Takes 2/5 width */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="border-l border-border pl-6 h-full flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
                  </h3>
                  {selectedDate && getEventsForDate(selectedDate).length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      {getEventsForDate(selectedDate).length} event{getEventsForDate(selectedDate).length !== 1 ? 's' : ''} scheduled
                    </p>
                  )}
                </div>
                
                {selectedDate && (
                  <div className="flex-1 overflow-hidden">
                    {getEventsForDate(selectedDate).length > 0 ? (
                      <div className="space-y-3 h-full overflow-y-auto pr-2">
                        {getEventsForDate(selectedDate).map((event) => (
                          <div 
                            key={event.id} 
                            className="group p-4 border border-border rounded-lg bg-card hover:bg-accent/50 transition-all duration-200 cursor-pointer hover:shadow-md"
                            onClick={() => {
                              // Navigate to event details page
                              window.location.href = `/events/${event.id}`;
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {event.title}
                              </h4>
                              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{format(new Date(event.start_datetime), 'h:mm a')}</span>
                              </div>
                              
                              <div className="inline-block">
                                <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                  {event.category}
                                </span>
                              </div>
                              
                              {/* Event description if available */}
                              {event.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                                  {event.description}
                                </p>
                              )}
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-border/50">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Click to view details</span>
                                <span className="group-hover:text-primary transition-colors">→</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center py-8">
                        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                          <CalendarIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-lg font-medium mb-2">No events scheduled</p>
                        <p className="text-muted-foreground text-sm max-w-48">
                          This date doesn't have any events planned. Check other dates with highlighted dots.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Quick Stats Footer */}
          <div className="border-t border-border pt-4 mt-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>
                  📅 {daysWithEvents.length} days with events this month
                </span>
                <span>
                  🎯 {events.length} total upcoming events
                </span>
              </div>
              <div className="text-xs">
                💡 Tip: Click on yellow dots to view events for that date
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}