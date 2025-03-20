export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string | null
          date: string
          duration: number | null
          employer_id: string
          id: string
          location: string | null
          notes: string | null
          status: string | null
          time: string | null
          total_amount: number | null
          updated_at: string | null
          worker_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          duration?: number | null
          employer_id: string
          id?: string
          location?: string | null
          notes?: string | null
          status?: string | null
          time?: string | null
          total_amount?: number | null
          updated_at?: string | null
          worker_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          duration?: number | null
          employer_id?: string
          id?: string
          location?: string | null
          notes?: string | null
          status?: string | null
          time?: string | null
          total_amount?: number | null
          updated_at?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string | null
          employer_id: string
          id: string
          rating: number
          worker_id: string
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          employer_id: string
          id?: string
          rating: number
          worker_id: string
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          employer_id?: string
          id?: string
          rating?: number
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          available: boolean | null
          avatar_url: string | null
          category: string | null
          company_name: string | null
          created_at: string
          description: string | null
          email: string | null
          full_name: string | null
          id: string
          image: string | null
          location: string | null
          name: string | null
          phone: string | null
          rate: string | null
          skills: string[] | null
          token_identifier: string
          updated_at: string | null
          user_id: string | null
          user_type: string | null
        }
        Insert: {
          available?: boolean | null
          avatar_url?: string | null
          category?: string | null
          company_name?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          image?: string | null
          location?: string | null
          name?: string | null
          phone?: string | null
          rate?: string | null
          skills?: string[] | null
          token_identifier: string
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Update: {
          available?: boolean | null
          avatar_url?: string | null
          category?: string | null
          company_name?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          image?: string | null
          location?: string | null
          name?: string | null
          phone?: string | null
          rate?: string | null
          skills?: string[] | null
          token_identifier?: string
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      workers: {
        Row: {
          available: boolean | null
          avatar: string | null
          category: string | null
          created_at: string | null
          description: string | null
          email: string
          id: string
          location: string | null
          name: string
          phone: string | null
          rate: string | null
          rating: number | null
          skills: string[] | null
          total_ratings: number | null
          updated_at: string | null
        }
        Insert: {
          available?: boolean | null
          avatar?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          email: string
          id: string
          location?: string | null
          name: string
          phone?: string | null
          rate?: string | null
          rating?: number | null
          skills?: string[] | null
          total_ratings?: number | null
          updated_at?: string | null
        }
        Update: {
          available?: boolean | null
          avatar?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          email?: string
          id?: string
          location?: string | null
          name?: string
          phone?: string | null
          rate?: string | null
          rating?: number | null
          skills?: string[] | null
          total_ratings?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
