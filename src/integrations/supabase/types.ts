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
      Churches: {
        Row: {
          address: string | null
          address_line2: string | null
          admin_email: string | null
          admin_user_id: string | null
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
          admin_user_id?: string | null
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
          admin_user_id?: string | null
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
            referencedRelation: "Churches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_church_admin: {
        Args: { ch: string }
        Returns: boolean
      }
      is_church_member: {
        Args: { ch: string }
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
