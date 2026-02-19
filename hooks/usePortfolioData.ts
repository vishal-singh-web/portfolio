'use client'

import { useEffect, useState } from 'react'
import { supabase, Profile, Experience, Project, Certificate, Skill, Book, StoryMilestone, NowItem } from '../lib/supabase'

export interface PortfolioData {
  profile: Profile | null
  experience: Experience[]
  projects: Project[]
  certificates: Certificate[]
  skills: Skill[]
  bookshelf: Book[]
  story: StoryMilestone[]
  nowItems: NowItem[]
}

export interface UsePortfolioDataReturn extends PortfolioData {
  loading: boolean
  error: Error | null
}

/**
 * Hook to fetch all portfolio data from Supabase
 * Returns loading state and error handling
 * Fetches from: profile, experience, projects, certificates tables
 */
export function usePortfolioData(): UsePortfolioDataReturn {
  const [data, setData] = useState<PortfolioData>({
    profile: null,
    experience: [],
    projects: [],
    certificates: [],
    skills: [],
    bookshelf: [],
    story: [],
    nowItems: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all data in parallel
        const [profileRes, experienceRes, projectsRes, certificatesRes, skillsRes, bookshelfRes, storyRes, nowRes] = await Promise.all([
          supabase.from('profile').select('*').single(),
          supabase.from('experience').select('*').order('order_index', { ascending: true }),
          supabase.from('projects').select('*').order('order_index', { ascending: true }),
          supabase.from('certificates').select('*').order('order_index', { ascending: true }),
          supabase.from('skills').select('*').order('order_index', { ascending: true }),
          supabase.from('bookshelf').select('*').order('order_index', { ascending: true }),
          supabase.from('story_milestones').select('*').order('order_index', { ascending: true }),
          supabase.from('now_items').select('*').order('order_index', { ascending: true })
        ])

        // Handle errors
        if (profileRes.error) throw new Error(`Profile fetch failed: ${profileRes.error.message}`)
        if (experienceRes.error) throw new Error(`Experience fetch failed: ${experienceRes.error.message}`)
        if (projectsRes.error) throw new Error(`Projects fetch failed: ${projectsRes.error.message}`)
        if (certificatesRes.error) throw new Error(`Certificates fetch failed: ${certificatesRes.error.message}`)
        if (skillsRes.error) throw new Error(`Skills fetch failed: ${skillsRes.error.message}`)
        if (bookshelfRes.error) throw new Error(`Bookshelf fetch failed: ${bookshelfRes.error.message}`)
        if (storyRes.error) throw new Error(`Story fetch failed: ${storyRes.error.message}`)
        if (nowRes.error) throw new Error(`Now items fetch failed: ${nowRes.error.message}`)

        setData({
          profile: profileRes.data,
          experience: experienceRes.data || [],
          projects: projectsRes.data || [],
          certificates: certificatesRes.data || [],
          skills: skillsRes.data || [],
          bookshelf: bookshelfRes.data || [],
          story: storyRes.data || [],
          nowItems: nowRes.data || []
        })
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred')
        setError(error)
        console.error('Portfolio data fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  return {
    ...data,
    loading,
    error
  }
}
