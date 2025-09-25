export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      app_feedback: {
        Row: {
          app_version: string | null
          category: string
          church_id: string | null
          consent_to_contact: boolean
          created_at: string
          device_info: string | null
          email_override: string | null
          handled_at: string | null
          handled_by_user_id: string | null
          id: string
          member_id: string | null
          message: string
          platform: string | null
          rating: number | null
          reply: string | null
          screenshot_url: string | null
          severity: string | null
          title: string
          user_id: string
        }
        Insert: {
          app_version?: string | null
          category?: string
          church_id?: string | null
          consent_to_contact?: boolean
          created_at?: string
          device_info?: string | null
          email_override?: string | null
          handled_at?: string | null
          handled_by_user_id?: string | null
          id?: string
          member_id?: string | null
          message: string
          platform?: string | null
          rating?: number | null
          reply?: string | null
          screenshot_url?: string | null
          severity?: string | null
          title: string
          user_id: string
        }
        Update: {
          app_version?: string | null
          category?: string
          church_id?: string | null
          consent_to_contact?: boolean
          created_at?: string
          device_info?: string | null
          email_override?: string | null
          handled_at?: string | null
          handled_by_user_id?: string | null
          id?: string
          member_id?: string | null
          message?: string
          platform?: string | null
          rating?: number | null
          reply?: string | null
          screenshot_url?: string | null
          severity?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appfb_church_fk"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appfb_member_fk"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      attachments: {
        Row: {
          content_type: string | null
          filename: string | null
          id: string
          message_id: string
          storage_path: string
        }
        Insert: {
          content_type?: string | null
          filename?: string | null
          id?: string
          message_id: string
          storage_path: string
        }
        Update: {
          content_type?: string | null
          filename?: string | null
          id?: string
          message_id?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_user_id: string | null
          after_json: Json | null
          before_json: Json | null
          created_at: string
          id: string
          row_id: string | null
          table_name: string
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          after_json?: Json | null
          before_json?: Json | null
          created_at?: string
          id?: string
          row_id?: string | null
          table_name: string
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          after_json?: Json | null
          before_json?: Json | null
          created_at?: string
          id?: string
          row_id?: string | null
          table_name?: string
        }
        Relationships: []
      }
      availability_windows: {
        Row: {
          day_of_week: number
          id: string
          need_id: string
          time_end: string
          time_start: string
        }
        Insert: {
          day_of_week: number
          id?: string
          need_id: string
          time_end: string
          time_start: string
        }
        Update: {
          day_of_week?: number
          id?: string
          need_id?: string
          time_end?: string
          time_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_windows_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          code: string
          criteria_json: Json | null
          icon_name: string | null
          label: string
        }
        Insert: {
          code: string
          criteria_json?: Json | null
          icon_name?: string | null
          label: string
        }
        Update: {
          code?: string
          criteria_json?: Json | null
          icon_name?: string | null
          label?: string
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          end_at: string | null
          ics_uid: string | null
          id: string
          location_text: string | null
          member_id: string
          need_id: string
          signup_id: string
          start_at: string
          title: string | null
        }
        Insert: {
          end_at?: string | null
          ics_uid?: string | null
          id?: string
          location_text?: string | null
          member_id: string
          need_id: string
          signup_id: string
          start_at: string
          title?: string | null
        }
        Update: {
          end_at?: string | null
          ics_uid?: string | null
          id?: string
          location_text?: string | null
          member_id?: string
          need_id?: string
          signup_id?: string
          start_at?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_signup_id_fkey"
            columns: ["signup_id"]
            isOneToOne: false
            referencedRelation: "volunteer_signups"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          active: boolean
          code: string
          icon_name: string | null
          label: string
          sort_order: number | null
        }
        Insert: {
          active?: boolean
          code: string
          icon_name?: string | null
          label: string
          sort_order?: number | null
        }
        Update: {
          active?: boolean
          code?: string
          icon_name?: string | null
          label?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      checkpoints: {
        Row: {
          by_member_id: string
          id: string
          need_id: string
          occurred_at: string
          signup_id: string
          type: string
        }
        Insert: {
          by_member_id: string
          id?: string
          need_id: string
          occurred_at?: string
          signup_id: string
          type: string
        }
        Update: {
          by_member_id?: string
          id?: string
          need_id?: string
          occurred_at?: string
          signup_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "checkpoints_by_member_id_fkey"
            columns: ["by_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkpoints_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checkpoints_signup_id_fkey"
            columns: ["signup_id"]
            isOneToOne: false
            referencedRelation: "volunteer_signups"
            referencedColumns: ["id"]
          },
        ]
      }
      church_feedback: {
        Row: {
          category: string
          church_id: string
          created_at: string
          follow_up_needed: boolean
          handled_at: string | null
          handled_by_member_id: string | null
          id: string
          is_anonymous: boolean
          member_id: string
          message: string
          rating: number | null
          reply: string | null
          title: string
          user_id: string
          visible_to_admins_only: boolean
        }
        Insert: {
          category?: string
          church_id: string
          created_at?: string
          follow_up_needed?: boolean
          handled_at?: string | null
          handled_by_member_id?: string | null
          id?: string
          is_anonymous?: boolean
          member_id: string
          message: string
          rating?: number | null
          reply?: string | null
          title: string
          user_id: string
          visible_to_admins_only?: boolean
        }
        Update: {
          category?: string
          church_id?: string
          created_at?: string
          follow_up_needed?: boolean
          handled_at?: string | null
          handled_by_member_id?: string | null
          id?: string
          is_anonymous?: boolean
          member_id?: string
          message?: string
          rating?: number | null
          reply?: string | null
          title?: string
          user_id?: string
          visible_to_admins_only?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "chfb_church_fk"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chfb_handled_by_member_fk"
            columns: ["handled_by_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chfb_member_fk"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      church_join_requests: {
        Row: {
          approved_by_member_id: string | null
          church_id: string
          created_at: string
          decided_at: string | null
          id: string
          requester_user_id: string
          status: string
        }
        Insert: {
          approved_by_member_id?: string | null
          church_id: string
          created_at?: string
          decided_at?: string | null
          id?: string
          requester_user_id: string
          status?: string
        }
        Update: {
          approved_by_member_id?: string | null
          church_id?: string
          created_at?: string
          decided_at?: string | null
          id?: string
          requester_user_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "church_join_requests_approved_by_member_id_fkey"
            columns: ["approved_by_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "church_join_requests_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      church_roles: {
        Row: {
          church_id: string
          granted_at: string
          id: string
          member_id: string
          ministry_area: string | null
          role: string
        }
        Insert: {
          church_id: string
          granted_at?: string
          id?: string
          member_id: string
          ministry_area?: string | null
          role: string
        }
        Update: {
          church_id?: string
          granted_at?: string
          id?: string
          member_id?: string
          ministry_area?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "church_roles_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "church_roles_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      churches: {
        Row: {
          address: string | null
          address_line2: string | null
          admin_email: string | null
          admin_user_id: string
          city: string | null
          created_at: string
          id: string
          is_verified: boolean | null
          member_count: number | null
          name: string
          postal_code: string | null
          slug: string | null
          state: string | null
        }
        Insert: {
          address?: string | null
          address_line2?: string | null
          admin_email?: string | null
          admin_user_id: string
          city?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          member_count?: number | null
          name: string
          postal_code?: string | null
          slug?: string | null
          state?: string | null
        }
        Update: {
          address?: string | null
          address_line2?: string | null
          admin_email?: string | null
          admin_user_id?: string
          city?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          member_count?: number | null
          name?: string
          postal_code?: string | null
          slug?: string | null
          state?: string | null
        }
        Relationships: []
      }
      contact_shares: {
        Row: {
          id: string
          member_id: string
          share_email: boolean
          share_phone: boolean
          signup_id: string
        }
        Insert: {
          id?: string
          member_id: string
          share_email?: boolean
          share_phone?: boolean
          signup_id: string
        }
        Update: {
          id?: string
          member_id?: string
          share_email?: boolean
          share_phone?: boolean
          signup_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_shares_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_shares_signup_id_fkey"
            columns: ["signup_id"]
            isOneToOne: false
            referencedRelation: "volunteer_signups"
            referencedColumns: ["id"]
          },
        ]
      }
      event_comments: {
        Row: {
          comment: string
          created_at: string | null
          event_id: string
          id: string
          member_id: string
          parent_comment_id: string | null
        }
        Insert: {
          comment: string
          created_at?: string | null
          event_id: string
          id?: string
          member_id: string
          parent_comment_id?: string | null
        }
        Update: {
          comment?: string
          created_at?: string | null
          event_id?: string
          id?: string
          member_id?: string
          parent_comment_id?: string | null
        }
        Relationships: []
      }
      event_donations: {
        Row: {
          amount: number
          created_at: string | null
          donor_name: string | null
          event_id: string
          id: string
          is_anonymous: boolean | null
          member_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          donor_name?: string | null
          event_id: string
          id?: string
          is_anonymous?: boolean | null
          member_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          donor_name?: string | null
          event_id?: string
          id?: string
          is_anonymous?: boolean | null
          member_id?: string | null
        }
        Relationships: []
      }
      event_media: {
        Row: {
          caption: string | null
          created_at: string | null
          event_id: string
          id: string
          is_approved: boolean | null
          media_type: string
          media_url: string
          member_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          event_id: string
          id?: string
          is_approved?: boolean | null
          media_type: string
          media_url: string
          member_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          event_id?: string
          id?: string
          is_approved?: boolean | null
          media_type?: string
          media_url?: string
          member_id?: string
        }
        Relationships: []
      }
      event_rsvps: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          member_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          member_id: string
          status?: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          member_id?: string
          status?: string
        }
        Relationships: []
      }
      event_testimonies: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          is_approved: boolean | null
          member_id: string
          testimony: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          is_approved?: boolean | null
          member_id: string
          testimony: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          is_approved?: boolean | null
          member_id?: string
          testimony?: string
        }
        Relationships: []
      }
      event_volunteer_roles: {
        Row: {
          created_at: string | null
          description: string | null
          event_id: string
          id: string
          max_volunteers: number | null
          requires_background_check: boolean | null
          role_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_id: string
          id?: string
          max_volunteers?: number | null
          requires_background_check?: boolean | null
          role_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_id?: string
          id?: string
          max_volunteers?: number | null
          requires_background_check?: boolean | null
          role_name?: string
        }
        Relationships: []
      }
      event_volunteer_signups: {
        Row: {
          created_at: string | null
          id: string
          member_id: string
          notes: string | null
          role_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_id: string
          notes?: string | null
          role_id: string
          status?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          member_id?: string
          notes?: string | null
          role_id?: string
          status?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          banner_image_url: string | null
          category: string
          church_id: string
          created_at: string | null
          description: string | null
          end_datetime: string
          featured: boolean | null
          id: string
          location_lat: number | null
          location_lng: number | null
          location_text: string | null
          max_attendees: number | null
          organizer_member_id: string
          requires_rsvp: boolean | null
          start_datetime: string
          title: string
          updated_at: string | null
        }
        Insert: {
          banner_image_url?: string | null
          category?: string
          church_id: string
          created_at?: string | null
          description?: string | null
          end_datetime: string
          featured?: boolean | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          location_text?: string | null
          max_attendees?: number | null
          organizer_member_id: string
          requires_rsvp?: boolean | null
          start_datetime: string
          title: string
          updated_at?: string | null
        }
        Update: {
          banner_image_url?: string | null
          category?: string
          church_id?: string
          created_at?: string | null
          description?: string | null
          end_datetime?: string
          featured?: boolean | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          location_text?: string | null
          max_attendees?: number | null
          organizer_member_id?: string
          requires_rsvp?: boolean | null
          start_datetime?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          member_id: string
          need_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          member_id: string
          need_id: string
        }
        Update: {
          created_at?: string
          id?: string
          member_id?: string
          need_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string
          from_member_id: string
          id: string
          need_id: string
          rating: number
          signup_id: string
          to_member_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          from_member_id: string
          id?: string
          need_id: string
          rating: number
          signup_id: string
          to_member_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          from_member_id?: string
          id?: string
          need_id?: string
          rating?: number
          signup_id?: string
          to_member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_from_member_id_fkey"
            columns: ["from_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_signup_id_fkey"
            columns: ["signup_id"]
            isOneToOne: false
            referencedRelation: "volunteer_signups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_to_member_id_fkey"
            columns: ["to_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      imports: {
        Row: {
          church_id: string
          file_storage_path: string
          id: string
          processed_at: string | null
          row_count: number | null
          status: string
        }
        Insert: {
          church_id: string
          file_storage_path: string
          id?: string
          processed_at?: string | null
          row_count?: number | null
          status?: string
        }
        Update: {
          church_id?: string
          file_storage_path?: string
          id?: string
          processed_at?: string | null
          row_count?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "imports_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      item_photos: {
        Row: {
          content_type: string
          created_at: string
          file_size: number
          filename: string
          id: string
          item_id: string
          sort_order: number | null
          storage_path: string
          uploaded_by: string | null
        }
        Insert: {
          content_type: string
          created_at?: string
          file_size: number
          filename: string
          id?: string
          item_id: string
          sort_order?: number | null
          storage_path: string
          uploaded_by?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string
          file_size?: number
          filename?: string
          id?: string
          item_id?: string
          sort_order?: number | null
          storage_path?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      member_badges: {
        Row: {
          awarded_at: string
          badge_code: string
          id: string
          member_id: string
        }
        Insert: {
          awarded_at?: string
          badge_code: string
          id?: string
          member_id: string
        }
        Update: {
          awarded_at?: string
          badge_code?: string
          id?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "member_badges_badge_code_fkey"
            columns: ["badge_code"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "member_badges_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          address_city: string | null
          address_state: string | null
          age_group: string | null
          approved: boolean
          availability_notes: string | null
          avatar_url: string | null
          background_check_expires_at: string | null
          background_check_status: string
          bio: string | null
          can_drive: boolean
          church_id: string
          created_at: string | null
          distance_willing_miles: number
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          has_child_seat: boolean
          id: string
          languages: string | null
          name: string | null
          needs_fulfilled: number
          needs_served: number
          notify_email: boolean
          notify_push: boolean
          notify_sms: boolean
          phone: string | null
          postal_code: string | null
          preferred_contact: string
          role: string
          seats_available: number
          skills: string | null
          status: string
          training_child_safety: boolean
          training_completed_at: string | null
          user_id: string
          vehicle_type: string
          wheelchair_accessible: boolean
        }
        Insert: {
          address_city?: string | null
          address_state?: string | null
          age_group?: string | null
          approved?: boolean
          availability_notes?: string | null
          avatar_url?: string | null
          background_check_expires_at?: string | null
          background_check_status?: string
          bio?: string | null
          can_drive?: boolean
          church_id: string
          created_at?: string | null
          distance_willing_miles?: number
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          has_child_seat?: boolean
          id?: string
          languages?: string | null
          name?: string | null
          needs_fulfilled?: number
          needs_served?: number
          notify_email?: boolean
          notify_push?: boolean
          notify_sms?: boolean
          phone?: string | null
          postal_code?: string | null
          preferred_contact?: string
          role?: string
          seats_available?: number
          skills?: string | null
          status?: string
          training_child_safety?: boolean
          training_completed_at?: string | null
          user_id: string
          vehicle_type?: string
          wheelchair_accessible?: boolean
        }
        Update: {
          address_city?: string | null
          address_state?: string | null
          age_group?: string | null
          approved?: boolean
          availability_notes?: string | null
          avatar_url?: string | null
          background_check_expires_at?: string | null
          background_check_status?: string
          bio?: string | null
          can_drive?: boolean
          church_id?: string
          created_at?: string | null
          distance_willing_miles?: number
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          has_child_seat?: boolean
          id?: string
          languages?: string | null
          name?: string | null
          needs_fulfilled?: number
          needs_served?: number
          notify_email?: boolean
          notify_push?: boolean
          notify_sms?: boolean
          phone?: string | null
          postal_code?: string | null
          preferred_contact?: string
          role?: string
          seats_available?: number
          skills?: string | null
          status?: string
          training_child_safety?: boolean
          training_completed_at?: string | null
          user_id?: string
          vehicle_type?: string
          wheelchair_accessible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "members_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          created_at: string
          id: string
          is_system: boolean
          sender_member_id: string
          thread_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          is_system?: boolean
          sender_member_id: string
          thread_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          is_system?: boolean
          sender_member_id?: string
          thread_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_sender_member_id_fkey"
            columns: ["sender_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_actions: {
        Row: {
          action: string
          by_member_id: string
          created_at: string
          id: string
          note: string | null
          target_id: string
          target_type: string
        }
        Insert: {
          action: string
          by_member_id: string
          created_at?: string
          id?: string
          note?: string | null
          target_id: string
          target_type: string
        }
        Update: {
          action?: string
          by_member_id?: string
          created_at?: string
          id?: string
          note?: string | null
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderation_actions_by_member_id_fkey"
            columns: ["by_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      need_items: {
        Row: {
          id: string
          is_done: boolean
          name: string
          need_id: string
          notes: string | null
          qty: string | null
          sort_order: number | null
        }
        Insert: {
          id?: string
          is_done?: boolean
          name: string
          need_id: string
          notes?: string | null
          qty?: string | null
          sort_order?: number | null
        }
        Update: {
          id?: string
          is_done?: boolean
          name?: string
          need_id?: string
          notes?: string | null
          qty?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "need_items_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
        ]
      }
      need_photos: {
        Row: {
          alt_text: string | null
          id: string
          need_id: string
          sort_order: number | null
          storage_path: string
        }
        Insert: {
          alt_text?: string | null
          id?: string
          need_id: string
          sort_order?: number | null
          storage_path: string
        }
        Update: {
          alt_text?: string | null
          id?: string
          need_id?: string
          sort_order?: number | null
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "need_photos_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
        ]
      }
      need_tags: {
        Row: {
          id: string
          need_id: string
          tag_code: string
        }
        Insert: {
          id?: string
          need_id: string
          tag_code: string
        }
        Update: {
          id?: string
          need_id?: string
          tag_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "need_tags_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "need_tags_tag_code_fkey"
            columns: ["tag_code"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["code"]
          },
        ]
      }
      needs: {
        Row: {
          allow_multiple_volunteers: boolean
          category: string | null
          church_id: string
          created_at: string
          description: string | null
          duration_estimate_min: number | null
          end_window: string | null
          id: string
          lat: number | null
          lng: number | null
          location_text: string | null
          message_count: number
          requester_id: string
          requires_background_check: boolean
          requires_child_safety: boolean
          requires_vehicle: boolean
          start_window: string | null
          status: string
          title: string
          updated_at: string
          urgency: string | null
          view_count: number
          visibility: string
          volunteer_count: number
        }
        Insert: {
          allow_multiple_volunteers?: boolean
          category?: string | null
          church_id: string
          created_at?: string
          description?: string | null
          duration_estimate_min?: number | null
          end_window?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          location_text?: string | null
          message_count?: number
          requester_id: string
          requires_background_check?: boolean
          requires_child_safety?: boolean
          requires_vehicle?: boolean
          start_window?: string | null
          status?: string
          title: string
          updated_at?: string
          urgency?: string | null
          view_count?: number
          visibility?: string
          volunteer_count?: number
        }
        Update: {
          allow_multiple_volunteers?: boolean
          category?: string | null
          church_id?: string
          created_at?: string
          description?: string | null
          duration_estimate_min?: number | null
          end_window?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          location_text?: string | null
          message_count?: number
          requester_id?: string
          requires_background_check?: boolean
          requires_child_safety?: boolean
          requires_vehicle?: boolean
          start_window?: string | null
          status?: string
          title?: string
          updated_at?: string
          urgency?: string | null
          view_count?: number
          visibility?: string
          volunteer_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "needs_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "needs_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_queue: {
        Row: {
          channel: string
          error_text: string | null
          id: string
          member_id: string | null
          payload_json: Json | null
          scheduled_at: string | null
          sent_at: string | null
          state: string
          template_code: string | null
        }
        Insert: {
          channel: string
          error_text?: string | null
          id?: string
          member_id?: string | null
          payload_json?: Json | null
          scheduled_at?: string | null
          sent_at?: string | null
          state?: string
          template_code?: string | null
        }
        Update: {
          channel?: string
          error_text?: string | null
          id?: string
          member_id?: string | null
          payload_json?: Json | null
          scheduled_at?: string | null
          sent_at?: string | null
          state?: string
          template_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_queue_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_queue_template_code_fkey"
            columns: ["template_code"]
            isOneToOne: false
            referencedRelation: "notification_templates"
            referencedColumns: ["code"]
          },
        ]
      }
      notification_templates: {
        Row: {
          active: boolean
          body_markdown: string | null
          channel: string
          code: string
          subject: string | null
        }
        Insert: {
          active?: boolean
          body_markdown?: string | null
          channel: string
          code: string
          subject?: string | null
        }
        Update: {
          active?: boolean
          body_markdown?: string | null
          channel?: string
          code?: string
          subject?: string | null
        }
        Relationships: []
      }
      pickup_dropoff: {
        Row: {
          distance_miles_est: number | null
          dropoff_address: string | null
          id: string
          notes: string | null
          pickup_address: string | null
          pickup_at: string | null
          signup_id: string
        }
        Insert: {
          distance_miles_est?: number | null
          dropoff_address?: string | null
          id?: string
          notes?: string | null
          pickup_address?: string | null
          pickup_at?: string | null
          signup_id: string
        }
        Update: {
          distance_miles_est?: number | null
          dropoff_address?: string | null
          id?: string
          notes?: string | null
          pickup_address?: string | null
          pickup_at?: string | null
          signup_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pickup_dropoff_signup_id_fkey"
            columns: ["signup_id"]
            isOneToOne: false
            referencedRelation: "volunteer_signups"
            referencedColumns: ["id"]
          },
        ]
      }
      push_devices: {
        Row: {
          device_token: string
          id: string
          last_seen_at: string | null
          member_id: string
          provider: string
        }
        Insert: {
          device_token: string
          id?: string
          last_seen_at?: string | null
          member_id: string
          provider: string
        }
        Update: {
          device_token?: string
          id?: string
          last_seen_at?: string | null
          member_id?: string
          provider?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_devices_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      reminders: {
        Row: {
          channel: string
          error_text: string | null
          id: string
          member_id: string
          send_at: string
          sent_at: string | null
          signup_id: string | null
          state: string
          template_code: string | null
        }
        Insert: {
          channel: string
          error_text?: string | null
          id?: string
          member_id: string
          send_at: string
          sent_at?: string | null
          signup_id?: string | null
          state?: string
          template_code?: string | null
        }
        Update: {
          channel?: string
          error_text?: string | null
          id?: string
          member_id?: string
          send_at?: string
          sent_at?: string | null
          signup_id?: string | null
          state?: string
          template_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reminders_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminders_signup_id_fkey"
            columns: ["signup_id"]
            isOneToOne: false
            referencedRelation: "volunteer_signups"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          id: string
          note: string | null
          reason_code: string | null
          reporter_member_id: string
          resolved_at: string | null
          resolved_by_member_id: string | null
          status: string
          target_id: string
          target_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          reason_code?: string | null
          reporter_member_id: string
          resolved_at?: string | null
          resolved_by_member_id?: string | null
          status?: string
          target_id: string
          target_type: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          reason_code?: string | null
          reporter_member_id?: string
          resolved_at?: string | null
          resolved_by_member_id?: string | null
          status?: string
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_reporter_member_id_fkey"
            columns: ["reporter_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_resolved_by_member_id_fkey"
            columns: ["resolved_by_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      reputation_events: {
        Row: {
          created_at: string
          id: string
          member_id: string
          points: number
          reason_code: string | null
          source_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          member_id: string
          points: number
          reason_code?: string | null
          source_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          member_id?: string
          points?: number
          reason_code?: string | null
          source_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reputation_events_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          active: boolean
          code: string
          color: string | null
          label: string
          scope: string
          sort_order: number | null
        }
        Insert: {
          active?: boolean
          code: string
          color?: string | null
          label: string
          scope: string
          sort_order?: number | null
        }
        Update: {
          active?: boolean
          code?: string
          color?: string | null
          label?: string
          scope?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      threads: {
        Row: {
          church_id: string
          created_at: string
          created_by_member_id: string
          id: string
          is_private: boolean
          need_id: string
          subject: string | null
        }
        Insert: {
          church_id: string
          created_at?: string
          created_by_member_id: string
          id?: string
          is_private?: boolean
          need_id: string
          subject?: string | null
        }
        Update: {
          church_id?: string
          created_at?: string
          created_by_member_id?: string
          id?: string
          is_private?: boolean
          need_id?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "threads_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_created_by_member_id_fkey"
            columns: ["created_by_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threads_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
        ]
      }
      time_logs: {
        Row: {
          id: string
          log_date: string
          member_id: string
          minutes: number
          need_id: string
          signup_id: string
        }
        Insert: {
          id?: string
          log_date?: string
          member_id: string
          minutes: number
          need_id: string
          signup_id: string
        }
        Update: {
          id?: string
          log_date?: string
          member_id?: string
          minutes?: number
          need_id?: string
          signup_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_logs_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_logs_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_logs_signup_id_fkey"
            columns: ["signup_id"]
            isOneToOne: false
            referencedRelation: "volunteer_signups"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string | null
          dark_mode: boolean | null
          email_updates: boolean | null
          id: string
          member_id: string | null
          push_notifications: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          dark_mode?: boolean | null
          email_updates?: boolean | null
          id?: string
          member_id?: string | null
          push_notifications?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          dark_mode?: boolean | null
          email_updates?: boolean | null
          id?: string
          member_id?: string | null
          push_notifications?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: true
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          has_child_seat: boolean
          id: string
          make: string | null
          member_id: string
          model: string | null
          seats: number | null
          wheelchair_accessible: boolean
        }
        Insert: {
          has_child_seat?: boolean
          id?: string
          make?: string | null
          member_id: string
          model?: string | null
          seats?: number | null
          wheelchair_accessible?: boolean
        }
        Update: {
          has_child_seat?: boolean
          id?: string
          make?: string | null
          member_id?: string
          model?: string | null
          seats?: number | null
          wheelchair_accessible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      verifications: {
        Row: {
          expires_at: string | null
          id: string
          member_id: string
          requested_at: string
          status: string
          type: string
          verified_at: string | null
          verified_by_member_id: string | null
        }
        Insert: {
          expires_at?: string | null
          id?: string
          member_id: string
          requested_at?: string
          status?: string
          type: string
          verified_at?: string | null
          verified_by_member_id?: string | null
        }
        Update: {
          expires_at?: string | null
          id?: string
          member_id?: string
          requested_at?: string
          status?: string
          type?: string
          verified_at?: string | null
          verified_by_member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verifications_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_verified_by_member_id_fkey"
            columns: ["verified_by_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      views: {
        Row: {
          id: string
          need_id: string
          session_id: string | null
          viewed_at: string
          viewer_member_id: string | null
        }
        Insert: {
          id?: string
          need_id: string
          session_id?: string | null
          viewed_at?: string
          viewer_member_id?: string | null
        }
        Update: {
          id?: string
          need_id?: string
          session_id?: string | null
          viewed_at?: string
          viewer_member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "views_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "views_viewer_member_id_fkey"
            columns: ["viewer_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_signups: {
        Row: {
          cancelled_at: string | null
          completed_at: string | null
          confirmed_at: string | null
          created_at: string
          id: string
          need_id: string
          notes_from_volunteer: string | null
          notes_private: string | null
          signed_up_at: string | null
          status: string
          volunteer_id: string
        }
        Insert: {
          cancelled_at?: string | null
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          id?: string
          need_id: string
          notes_from_volunteer?: string | null
          notes_private?: string | null
          signed_up_at?: string | null
          status?: string
          volunteer_id: string
        }
        Update: {
          cancelled_at?: string | null
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          id?: string
          need_id?: string
          notes_from_volunteer?: string | null
          notes_private?: string | null
          signed_up_at?: string | null
          status?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_signups_need_id_fkey"
            columns: ["need_id"]
            isOneToOne: false
            referencedRelation: "needs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "volunteer_signups_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      feedback_with_access: {
        Row: {
          access_type: string | null
          category: string | null
          church_id: string | null
          created_at: string | null
          follow_up_needed: boolean | null
          handled_at: string | null
          handled_by_member_id: string | null
          id: string | null
          is_anonymous: boolean | null
          member_id: string | null
          message: string | null
          rating: number | null
          reply: string | null
          title: string | null
          user_id: string | null
          visible_to_admins_only: boolean | null
        }
        Insert: {
          access_type?: never
          category?: string | null
          church_id?: string | null
          created_at?: string | null
          follow_up_needed?: boolean | null
          handled_at?: string | null
          handled_by_member_id?: string | null
          id?: string | null
          is_anonymous?: boolean | null
          member_id?: string | null
          message?: string | null
          rating?: number | null
          reply?: string | null
          title?: string | null
          user_id?: string | null
          visible_to_admins_only?: boolean | null
        }
        Update: {
          access_type?: never
          category?: string | null
          church_id?: string | null
          created_at?: string | null
          follow_up_needed?: boolean | null
          handled_at?: string | null
          handled_by_member_id?: string | null
          id?: string | null
          is_anonymous?: boolean | null
          member_id?: string | null
          message?: string | null
          rating?: number | null
          reply?: string | null
          title?: string | null
          user_id?: string | null
          visible_to_admins_only?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "chfb_church_fk"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chfb_handled_by_member_fk"
            columns: ["handled_by_member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chfb_member_fk"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      user_ministry_roles: {
        Row: {
          church_id: string | null
          granted_at: string | null
          member_id: string | null
          ministry_area: string | null
          role: string | null
        }
        Insert: {
          church_id?: string | null
          granted_at?: string | null
          member_id?: string | null
          ministry_area?: string | null
          role?: string | null
        }
        Update: {
          church_id?: string | null
          granted_at?: string | null
          member_id?: string | null
          ministry_area?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "church_roles_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "church_roles_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      cancel_my_signup: {
        Args: { p_signup: string }
        Returns: boolean
      }
      church_feed_safe: {
        Args: { p_church: string; p_limit?: number; p_offset?: number }
        Returns: {
          category: string
          created_at: string
          id: string
          status: string
          title: string
          urgency: string
          volunteer_count: number
        }[]
      }
      complete_signup: {
        Args: { p_signup: string }
        Returns: boolean
      }
      get_event_stats: {
        Args: { p_event_id: string }
        Returns: {
          attending_count: number
          donation_total: number
          interested_count: number
          volunteer_slots_filled: number
          volunteer_slots_total: number
        }[]
      }
      get_need_tags: {
        Args: { p_need: string }
        Returns: {
          color: string
          label: string
          scope: string
          tag_code: string
        }[]
      }
      get_user_roles: {
        Args: { user_uuid: string }
        Returns: string[]
      }
      is_church_admin: {
        Args: { ch: string }
        Returns: boolean
      }
      is_church_creator: {
        Args: { ch: string }
        Returns: boolean
      }
      is_church_member: {
        Args: { ch: string }
        Returns: boolean
      }
      is_platform_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      leave_feedback: {
        Args: { p_comment?: string; p_rating: number; p_signup: string }
        Returns: string
      }
      list_churches_member: {
        Args: Record<PropertyKey, never>
        Returns: {
          city: string
          id: string
          is_verified: boolean
          member_count: number
          name: string
          slug: string
          state: string
        }[]
      }
      list_churches_public: {
        Args: Record<PropertyKey, never>
        Returns: {
          city: string
          id: string
          is_verified: boolean
          member_count: number
          name: string
          slug: string
          state: string
        }[]
      }
      list_needs_safe: {
        Args: { p_church: string; p_status?: string }
        Returns: {
          category: string
          church_id: string
          created_at: string
          description: string
          duration_estimate_min: number
          end_window: string
          id: string
          location_text: string
          start_window: string
          status: string
          title: string
          urgency: string
          view_count: number
          visibility: string
          volunteer_count: number
        }[]
      }
      mark_notification_read: {
        Args: { p_queue_id: string }
        Returns: boolean
      }
      member_directory: {
        Args: { ch: string }
        Returns: {
          church_id: string
          email: string
          id: string
          name: string
        }[]
      }
      member_directory_for_my_churches: {
        Args: Record<PropertyKey, never>
        Returns: {
          church_id: string
          email: string
          id: string
          name: string
        }[]
      }
      member_directory_safe: {
        Args: { p_church: string }
        Returns: {
          avatar_url: string
          can_drive: boolean
          id: string
          languages: string
          name: string
          seats_available: number
          vehicle_type: string
        }[]
      }
      my_impact_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          avg_rating: number
          completed: number
          total_volunteering: number
          upcoming: number
        }[]
      }
      my_needs: {
        Args: { p_status?: string }
        Returns: {
          created_at: string
          message_count: number
          need_id: string
          status: string
          title: string
          view_count: number
          volunteer_count: number
        }[]
      }
      my_needs_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          active: number
          fulfilled: number
          total_posted: number
          total_views: number
        }[]
      }
      my_signups: {
        Args: Record<PropertyKey, never>
        Returns: {
          confirmed_at: string
          end_window: string
          need_id: string
          signup_id: string
          start_window: string
          status: string
          title: string
        }[]
      }
      need_details_safe: {
        Args: { p_need: string }
        Returns: {
          allow_multiple_volunteers: boolean
          category: string
          church_id: string
          created_at: string
          description: string
          duration_estimate_min: number
          end_window: string
          id: string
          location_text: string
          message_count: number
          requires_background_check: boolean
          requires_child_safety: boolean
          requires_vehicle: boolean
          start_window: string
          status: string
          title: string
          urgency: string
          view_count: number
          visibility: string
          volunteer_count: number
        }[]
      }
      post_need: {
        Args: {
          p_category: string
          p_church: string
          p_description: string
          p_title: string
          p_urgency?: string
          p_visibility?: string
        }
        Returns: string
      }
      report_issue: {
        Args: {
          p_note?: string
          p_reason: string
          p_target_id: string
          p_target_type: string
        }
        Returns: string
      }
      signup_for_need: {
        Args: { p_need: string; p_notes?: string }
        Returns: string
      }
      user_has_role: {
        Args: { roles: string[]; user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
