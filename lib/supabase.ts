import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for database tables
export interface Profile {
  id: string
  full_name: string
  bio: string
  profile_picture_url: string
  quote: string
  email?: string
  location?: string
  updated_at: string
}

export interface Experience {
  id: string
  company: string
  position: string
  start_date: string
  end_date?: string
  description: string
  order_index: number
  created_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  image_url?: string
  live_url?: string
  github_url?: string
  featured: boolean
  order_index: number
  created_at: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  image_url: string
  date_earned: string
  order_index: number
  created_at: string
}

export interface Guestbook {
  id: string
  name: string
  message: string
  created_at: string
}

export interface Skill {
  id: string
  category: string
  name: string
  proficiency: number
  order_index: number
  created_at: string
}

export interface Book {
  id: string
  title: string
  author?: string
  spine?: string
  lesson?: string
  image_url?: string
  order_index: number
  created_at: string
}

export interface StoryMilestone {
  id: string
  year: string
  title: string
  description: string
  emoji?: string
  order_index: number
  created_at: string
}
export interface NowItem {
  id: string
  title: string
  emoji?: string
  order_index: number
  created_at: string
}