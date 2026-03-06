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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          created_at: string
          event_type: string
          id: string
          restaurant_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          restaurant_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          restaurant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          badge: string | null
          created_at: string
          description: string | null
          discount_rate: number | null
          icon: string | null
          id: string
          image: string | null
          is_active: boolean | null
          layout_mode: string | null
          name: string
          name_en: string | null
          restaurant_id: string
          slug: string | null
          sort_order: number | null
          station_name: string | null
        }
        Insert: {
          badge?: string | null
          created_at?: string
          description?: string | null
          discount_rate?: number | null
          icon?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          layout_mode?: string | null
          name: string
          name_en?: string | null
          restaurant_id: string
          slug?: string | null
          sort_order?: number | null
          station_name?: string | null
        }
        Update: {
          badge?: string | null
          created_at?: string
          description?: string | null
          discount_rate?: number | null
          icon?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          layout_mode?: string | null
          name?: string
          name_en?: string | null
          restaurant_id?: string
          slug?: string | null
          sort_order?: number | null
          station_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          notes: string | null
          phone: string | null
          status: string | null
          tags: string[] | null
          total_revenue: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          tags?: string[] | null
          total_revenue?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          tags?: string[] | null
          total_revenue?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          date: string
          description: string | null
          id: string
          invoice_number: string | null
          updated_at: string | null
          vendor: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          invoice_number?: string | null
          updated_at?: string | null
          vendor?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          invoice_number?: string | null
          updated_at?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      income: {
        Row: {
          amount: number
          category: string | null
          client_id: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          invoice_number: string | null
          payment_method: string | null
          project_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          client_id?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          id?: string
          invoice_number?: string | null
          payment_method?: string | null
          project_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          client_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          invoice_number?: string | null
          payment_method?: string | null
          project_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "income_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "income_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          options: Json | null
          order_id: string
          price: number
          product_id: string | null
          product_name: string
          quantity: number | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          options?: Json | null
          order_id: string
          price: number
          product_id?: string | null
          product_name: string
          quantity?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          options?: Json | null
          order_id?: string
          price?: number
          product_id?: string | null
          product_name?: string
          quantity?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_note: string | null
          id: string
          restaurant_id: string
          status: string | null
          table_no: string
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_note?: string | null
          id?: string
          restaurant_id: string
          status?: string | null
          table_no: string
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_note?: string | null
          id?: string
          restaurant_id?: string
          status?: string | null
          table_no?: string
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content: Json | null
          created_at: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          allergens: string[] | null
          badge: string | null
          category_id: string | null
          created_at: string
          description: string | null
          description_en: string | null
          discount_price: number | null
          id: string
          image: string | null
          is_active: boolean | null
          name: string
          name_en: string | null
          price: number | null
          restaurant_id: string
          sort_order: number | null
          tags: Json | null
          variants: Json | null
        }
        Insert: {
          allergens?: string[] | null
          badge?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          discount_price?: number | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          name: string
          name_en?: string | null
          price?: number | null
          restaurant_id: string
          sort_order?: number | null
          tags?: Json | null
          variants?: Json | null
        }
        Update: {
          allergens?: string[] | null
          badge?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          description_en?: string | null
          discount_price?: number | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          name?: string
          name_en?: string | null
          price?: number | null
          restaurant_id?: string
          sort_order?: number | null
          tags?: Json | null
          variants?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_cost: number | null
          budget: number | null
          client_id: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          files: Json | null
          id: string
          name: string
          priority: string | null
          progress: number | null
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          budget?: number | null
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          files?: Json | null
          id?: string
          name: string
          priority?: string | null
          progress?: number | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          budget?: number | null
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          files?: Json | null
          id?: string
          name?: string
          priority?: string | null
          progress?: number | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          created_at: string
          custom_domain: string | null
          id: string
          is_ordering_active: boolean | null
          is_waiter_mode_active: boolean | null
          name: string
          parent_id: string | null
          password: string | null
          plan_expires_at: string | null
          plan_type: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          custom_domain?: string | null
          id?: string
          is_ordering_active?: boolean | null
          is_waiter_mode_active?: boolean | null
          name: string
          parent_id?: string | null
          password?: string | null
          plan_expires_at?: string | null
          plan_type?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          custom_domain?: string | null
          id?: string
          is_ordering_active?: boolean | null
          is_waiter_mode_active?: boolean | null
          name?: string
          parent_id?: string | null
          password?: string | null
          plan_expires_at?: string | null
          plan_type?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          address: string | null
          banner_active: boolean | null
          banner_overlay_visible: boolean | null
          banner_subtitle: string | null
          banner_tag: string | null
          banner_title: string | null
          banner_urls: string[] | null
          category_char_convert: boolean | null
          category_font_family: string | null
          category_font_size: string | null
          category_font_weight: string | null
          category_gap: string | null
          category_letter_spacing: string | null
          category_overlay_opacity: number | null
          category_row_height: string | null
          created_at: string | null
          custom_body_scripts: string | null
          custom_head_scripts: string | null
          dark_mode: boolean | null
          default_product_image: string | null
          email: string | null
          facebook: string | null
          facebook_pixel: string | null
          favicon: string | null
          font_family: string | null
          google_analytics: string | null
          google_tag_manager: string | null
          id: number
          instagram: string | null
          linkedin: string | null
          logo: string | null
          logo_url: string | null
          logo_width: number | null
          maintenance_mode: boolean | null
          map_url: string | null
          menu_title_text: string | null
          mobile_banner_urls: string[] | null
          phone: string | null
          popup_active: boolean | null
          popup_url: string | null
          product_description_color: string | null
          product_description_size: string | null
          product_price_color: string | null
          product_price_size: string | null
          product_title_color: string | null
          product_title_size: string | null
          restaurant_id: string | null
          site_description: string | null
          site_name: string | null
          site_title: string | null
          social_google_maps: string | null
          social_instagram: string | null
          social_whatsapp: string | null
          social_wifi_password: string | null
          theme_color: string | null
          twitter: string | null
          updated_at: string | null
          whatsapp: string | null
          youtube: string | null
        }
        Insert: {
          address?: string | null
          banner_active?: boolean | null
          banner_overlay_visible?: boolean | null
          banner_subtitle?: string | null
          banner_tag?: string | null
          banner_title?: string | null
          banner_urls?: string[] | null
          category_char_convert?: boolean | null
          category_font_family?: string | null
          category_font_size?: string | null
          category_font_weight?: string | null
          category_gap?: string | null
          category_letter_spacing?: string | null
          category_overlay_opacity?: number | null
          category_row_height?: string | null
          created_at?: string | null
          custom_body_scripts?: string | null
          custom_head_scripts?: string | null
          dark_mode?: boolean | null
          default_product_image?: string | null
          email?: string | null
          facebook?: string | null
          facebook_pixel?: string | null
          favicon?: string | null
          font_family?: string | null
          google_analytics?: string | null
          google_tag_manager?: string | null
          id?: number
          instagram?: string | null
          linkedin?: string | null
          logo?: string | null
          logo_url?: string | null
          logo_width?: number | null
          maintenance_mode?: boolean | null
          map_url?: string | null
          menu_title_text?: string | null
          mobile_banner_urls?: string[] | null
          phone?: string | null
          popup_active?: boolean | null
          popup_url?: string | null
          product_description_color?: string | null
          product_description_size?: string | null
          product_price_color?: string | null
          product_price_size?: string | null
          product_title_color?: string | null
          product_title_size?: string | null
          restaurant_id?: string | null
          site_description?: string | null
          site_name?: string | null
          site_title?: string | null
          social_google_maps?: string | null
          social_instagram?: string | null
          social_whatsapp?: string | null
          social_wifi_password?: string | null
          theme_color?: string | null
          twitter?: string | null
          updated_at?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Update: {
          address?: string | null
          banner_active?: boolean | null
          banner_overlay_visible?: boolean | null
          banner_subtitle?: string | null
          banner_tag?: string | null
          banner_title?: string | null
          banner_urls?: string[] | null
          category_char_convert?: boolean | null
          category_font_family?: string | null
          category_font_size?: string | null
          category_font_weight?: string | null
          category_gap?: string | null
          category_letter_spacing?: string | null
          category_overlay_opacity?: number | null
          category_row_height?: string | null
          created_at?: string | null
          custom_body_scripts?: string | null
          custom_head_scripts?: string | null
          dark_mode?: boolean | null
          default_product_image?: string | null
          email?: string | null
          facebook?: string | null
          facebook_pixel?: string | null
          favicon?: string | null
          font_family?: string | null
          google_analytics?: string | null
          google_tag_manager?: string | null
          id?: number
          instagram?: string | null
          linkedin?: string | null
          logo?: string | null
          logo_url?: string | null
          logo_width?: number | null
          maintenance_mode?: boolean | null
          map_url?: string | null
          menu_title_text?: string | null
          mobile_banner_urls?: string[] | null
          phone?: string | null
          popup_active?: boolean | null
          popup_url?: string | null
          product_description_color?: string | null
          product_description_size?: string | null
          product_price_color?: string | null
          product_price_size?: string | null
          product_title_color?: string | null
          product_title_size?: string | null
          restaurant_id?: string | null
          site_description?: string | null
          site_name?: string | null
          site_title?: string | null
          social_google_maps?: string | null
          social_instagram?: string | null
          social_whatsapp?: string | null
          social_wifi_password?: string | null
          theme_color?: string | null
          twitter?: string | null
          updated_at?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      tables: {
        Row: {
          created_at: string
          id: string
          qr_code_url: string | null
          restaurant_id: string
          table_no: string
        }
        Insert: {
          created_at?: string
          id?: string
          qr_code_url?: string | null
          restaurant_id: string
          table_no: string
        }
        Update: {
          created_at?: string
          id?: string
          qr_code_url?: string | null
          restaurant_id?: string
          table_no?: string
        }
        Relationships: [
          {
            foreignKeyName: "tables_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          project_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: number
          name: string | null
          role: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
          role?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          active: boolean | null
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          permissions: Json | null
          role: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          permissions?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string | null
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
