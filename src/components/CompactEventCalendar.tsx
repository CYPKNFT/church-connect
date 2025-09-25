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

      {/* Full Calendar Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-primary">Church Events Calendar</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="pointer-events-auto"
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

            {/* Events for selected date */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
              </h3>
              
              {selectedDate && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getEventsForDate(selectedDate).length > 0 ? (
                    getEventsForDate(selectedDate).map((event) => (
                      <div key={event.id} className="p-3 border border-border rounded-lg bg-card">
                        <h4 className="font-medium text-foreground">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(event.start_datetime), 'h:mm a')}
                        </p>
                        <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                          {event.category}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No events scheduled for this date.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}