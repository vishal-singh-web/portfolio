import { supabase } from './supabase'
import { Metadata } from 'next'

/**
 * Generate metadata from Supabase profile data
 * This runs on the server-side during build/render time
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data: profile, error } = await supabase.from('profile').select('*').single()

    if (error || !profile) {
      throw new Error('Failed to fetch profile for metadata')
    }

    return {
      title: `${profile.full_name} | Portfolio`,
      description: profile.bio || 'My personal portfolio showcasing projects and experience.',
      openGraph: {
        title: `${profile.full_name} | Portfolio`,
        description: profile.bio,
        images: profile.profile_picture_url ? [
          {
            url: profile.profile_picture_url,
            width: 1200,
            height: 1200,
            alt: profile.full_name
          }
        ] : undefined,
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title: `${profile.full_name} | Portfolio`,
        description: profile.bio
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    // Return default metadata on error
    return {
      title: 'Portfolio',
      description: 'Personal portfolio showcasing projects and experience.'
    }
  }
}
