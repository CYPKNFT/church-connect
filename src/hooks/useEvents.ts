import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  banner_image_url?: string;
  location_text: string;
  start_datetime: string;
  end_datetime: string;
  organizer_name: string;
  attending_count: number;
  interested_count: number;
  volunteer_slots_total: number;
  volunteer_slots_filled: number;
  donation_total: number;
}

interface EventStats {
  attending_count: number;
  interested_count: number;
  volunteer_slots_total: number;
  volunteer_slots_filled: number;
  donation_total: number;
}

export function useEvents(churchId?: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, [churchId]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      // For now, return mock data since we just created the tables
      // In a real implementation, this would query the events table
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Community Service Marathon",
          description: "Join us for a full day of serving our community through multiple service projects.",
          category: "service",
          featured: true,
          location_text: "Multiple Locations",
          start_datetime: "2024-04-15T09:00:00Z",
          end_datetime: "2024-04-15T17:00:00Z",
          organizer_name: "Community Outreach Team",
          attending_count: 127,
          interested_count: 45,
          volunteer_slots_total: 50,
          volunteer_slots_filled: 38,
          donation_total: 2450.00
        },
        {
          id: "2",
          title: "Prayer & Fasting Retreat",
          description: "A powerful time of prayer, fasting, and seeking God's face together.",
          category: "prayer",
          featured: false,
          location_text: "Church Sanctuary",
          start_datetime: "2024-04-08T18:00:00Z",
          end_datetime: "2024-04-08T21:00:00Z",
          organizer_name: "Prayer Ministry",
          attending_count: 89,
          interested_count: 23,
          volunteer_slots_total: 12,
          volunteer_slots_filled: 10,
          donation_total: 0
        },
        {
          id: "3",
          title: "Youth Leadership Workshop",
          description: "Empowering our young leaders with practical skills for ministry and life.",
          category: "youth",
          featured: true,
          location_text: "Youth Center",
          start_datetime: "2024-04-12T10:00:00Z",
          end_datetime: "2024-04-12T16:00:00Z",
          organizer_name: "Youth Pastor Mike",
          attending_count: 34,
          interested_count: 12,
          volunteer_slots_total: 8,
          volunteer_slots_filled: 6,
          donation_total: 890.00
        }
      ];

      setEvents(mockEvents);
    } catch (err) {
      console.error("Error loading events:", err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const getEventStats = async (eventId: string): Promise<EventStats | null> => {
    try {
      // In a real implementation, this would call the get_event_stats function
      const { data, error } = await supabase.rpc('get_event_stats', {
        p_event_id: eventId
      });

      if (error) throw error;
      return data?.[0] as EventStats;
    } catch (err) {
      console.error("Error getting event stats:", err);
      return null;
    }
  };

  const rsvpToEvent = async (eventId: string, status: 'attending' | 'interested' | 'not_attending') => {
    try {
      // Get current user's member ID
      const { data: member } = await supabase
        .from('members')
        .select('id')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!member) throw new Error('Member not found');

      const { error } = await supabase
        .from('event_rsvps')
        .upsert({
          event_id: eventId,
          member_id: member.id,
          status
        });

      if (error) throw error;
      
      // Refresh events to get updated counts
      await loadEvents();
    } catch (err) {
      console.error("Error updating RSVP:", err);
      throw err;
    }
  };

  const signupForVolunteerRole = async (roleId: string, notes?: string) => {
    try {
      // Get current user's member ID
      const { data: member } = await supabase
        .from('members')
        .select('id')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!member) throw new Error('Member not found');

      const { error } = await supabase
        .from('event_volunteer_signups')
        .insert({
          role_id: roleId,
          member_id: member.id,
          notes
        });

      if (error) throw error;
      
      // Refresh events to get updated volunteer counts
      await loadEvents();
    } catch (err) {
      console.error("Error signing up for volunteer role:", err);
      throw err;
    }
  };

  return {
    events,
    loading,
    error,
    loadEvents,
    getEventStats,
    rsvpToEvent,
    signupForVolunteerRole
  };
}