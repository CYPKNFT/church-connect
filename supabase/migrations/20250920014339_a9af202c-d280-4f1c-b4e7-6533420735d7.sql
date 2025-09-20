-- Create events and related tables for the Event Hub upgrade

-- Events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id UUID NOT NULL,
  organizer_member_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  featured BOOLEAN DEFAULT FALSE,
  banner_image_url TEXT,
  location_text TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ NOT NULL,
  max_attendees INTEGER,
  requires_rsvp BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event RSVPs
CREATE TABLE public.event_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL,
  member_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'interested' CHECK (status IN ('attending', 'interested', 'not_attending')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, member_id)
);

-- Event volunteer roles
CREATE TABLE public.event_volunteer_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL,
  role_name TEXT NOT NULL,
  description TEXT,
  max_volunteers INTEGER DEFAULT 1,
  requires_background_check BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event volunteer signups
CREATE TABLE public.event_volunteer_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL,
  member_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'declined')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role_id, member_id)
);

-- Event comments/discussion
CREATE TABLE public.event_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL,
  member_id UUID NOT NULL,
  comment TEXT NOT NULL,
  parent_comment_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event testimonies/impact stories
CREATE TABLE public.event_testimonies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL,
  member_id UUID NOT NULL,
  testimony TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event media/photos
CREATE TABLE public.event_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL,
  member_id UUID NOT NULL,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  caption TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event donations (for fundraiser events)
CREATE TABLE public.event_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL,
  member_id UUID,
  amount DECIMAL(10,2) NOT NULL,
  donor_name TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_volunteer_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_volunteer_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_testimonies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_donations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Events are viewable by church members" ON public.events
FOR SELECT USING (
  is_church_member(church_id) OR 
  is_church_admin(church_id)
);

CREATE POLICY "Events can be created by church members" ON public.events
FOR INSERT WITH CHECK (
  is_church_member(church_id) AND
  organizer_member_id IN (SELECT id FROM members WHERE user_id = auth.uid())
);

CREATE POLICY "Events can be updated by organizer or admin" ON public.events
FOR UPDATE USING (
  organizer_member_id IN (SELECT id FROM members WHERE user_id = auth.uid()) OR
  is_church_admin(church_id)
);

-- RLS Policies for RSVPs
CREATE POLICY "RSVPs are viewable by church members" ON public.event_rsvps
FOR SELECT USING (
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND (is_church_member(e.church_id) OR is_church_admin(e.church_id)))
);

CREATE POLICY "Members can RSVP to events" ON public.event_rsvps
FOR INSERT WITH CHECK (
  member_id IN (SELECT id FROM members WHERE user_id = auth.uid()) AND
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND is_church_member(e.church_id))
);

CREATE POLICY "Members can update their own RSVPs" ON public.event_rsvps
FOR UPDATE USING (
  member_id IN (SELECT id FROM members WHERE user_id = auth.uid())
);

-- RLS Policies for volunteer roles
CREATE POLICY "Volunteer roles are viewable by church members" ON public.event_volunteer_roles
FOR SELECT USING (
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND (is_church_member(e.church_id) OR is_church_admin(e.church_id)))
);

CREATE POLICY "Volunteer roles can be created by event organizer or admin" ON public.event_volunteer_roles
FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND (
    e.organizer_member_id IN (SELECT id FROM members WHERE user_id = auth.uid()) OR
    is_church_admin(e.church_id)
  ))
);

-- RLS Policies for volunteer signups
CREATE POLICY "Volunteer signups are viewable by participants and organizers" ON public.event_volunteer_signups
FOR SELECT USING (
  member_id IN (SELECT id FROM members WHERE user_id = auth.uid()) OR
  EXISTS (
    SELECT 1 FROM event_volunteer_roles evr 
    JOIN events e ON e.id = evr.event_id 
    WHERE evr.id = role_id AND (
      e.organizer_member_id IN (SELECT id FROM members WHERE user_id = auth.uid()) OR
      is_church_admin(e.church_id)
    )
  )
);

CREATE POLICY "Members can signup for volunteer roles" ON public.event_volunteer_signups
FOR INSERT WITH CHECK (
  member_id IN (SELECT id FROM members WHERE user_id = auth.uid()) AND
  EXISTS (
    SELECT 1 FROM event_volunteer_roles evr 
    JOIN events e ON e.id = evr.event_id 
    WHERE evr.id = role_id AND is_church_member(e.church_id)
  )
);

-- RLS Policies for comments
CREATE POLICY "Comments are viewable by church members" ON public.event_comments
FOR SELECT USING (
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND (is_church_member(e.church_id) OR is_church_admin(e.church_id)))
);

CREATE POLICY "Members can comment on events" ON public.event_comments
FOR INSERT WITH CHECK (
  member_id IN (SELECT id FROM members WHERE user_id = auth.uid()) AND
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND is_church_member(e.church_id))
);

-- RLS Policies for testimonies
CREATE POLICY "Approved testimonies are viewable by church members" ON public.event_testimonies
FOR SELECT USING (
  is_approved = TRUE AND
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND (is_church_member(e.church_id) OR is_church_admin(e.church_id)))
);

CREATE POLICY "Members can submit testimonies" ON public.event_testimonies
FOR INSERT WITH CHECK (
  member_id IN (SELECT id FROM members WHERE user_id = auth.uid()) AND
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND is_church_member(e.church_id))
);

-- RLS Policies for media
CREATE POLICY "Approved media is viewable by church members" ON public.event_media
FOR SELECT USING (
  is_approved = TRUE AND
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND (is_church_member(e.church_id) OR is_church_admin(e.church_id)))
);

CREATE POLICY "Members can upload media" ON public.event_media
FOR INSERT WITH CHECK (
  member_id IN (SELECT id FROM members WHERE user_id = auth.uid()) AND
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND is_church_member(e.church_id))
);

-- RLS Policies for donations
CREATE POLICY "Donations are viewable by church admins" ON public.event_donations
FOR SELECT USING (
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id AND is_church_admin(e.church_id))
);

CREATE POLICY "Anyone can make donations" ON public.event_donations
FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM events e WHERE e.id = event_id)
);

-- Add triggers for updated_at
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Create functions for event statistics
CREATE OR REPLACE FUNCTION public.get_event_stats(p_event_id UUID)
RETURNS TABLE(
  attending_count INTEGER,
  interested_count INTEGER,
  volunteer_slots_total INTEGER,
  volunteer_slots_filled INTEGER,
  donation_total DECIMAL
) 
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT
    COALESCE((SELECT COUNT(*) FROM event_rsvps WHERE event_id = p_event_id AND status = 'attending'), 0)::INTEGER,
    COALESCE((SELECT COUNT(*) FROM event_rsvps WHERE event_id = p_event_id AND status = 'interested'), 0)::INTEGER,
    COALESCE((SELECT SUM(max_volunteers) FROM event_volunteer_roles WHERE event_id = p_event_id), 0)::INTEGER,
    COALESCE((
      SELECT COUNT(*) FROM event_volunteer_signups evs 
      JOIN event_volunteer_roles evr ON evr.id = evs.role_id 
      WHERE evr.event_id = p_event_id AND evs.status = 'confirmed'
    ), 0)::INTEGER,
    COALESCE((SELECT SUM(amount) FROM event_donations WHERE event_id = p_event_id), 0.00)
$$;