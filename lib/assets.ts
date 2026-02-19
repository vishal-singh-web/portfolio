/**
 * Supabase Asset URL Utility
 * Handles automatic image URL generation based on naming conventions
 */

const SUPABASE_BASE_URL = 'https://oooexjbqlckrzpfebwnq.supabase.co/storage/v1/object/public/Certificates'

export type AssetType = 'certificate' | 'project' | 'profile' | 'book'

/**
 * Converts a title to a slug suitable for Supabase filenames
 * e.g., "AWS Cloud" -> "AWS-Cloud"
 * "React & TypeScript" -> "React-TypeScript"
 */
export function titleToSlug(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[&\/]/g, '') // Remove special characters
    .replace(/-+/g, '-') // Collapse multiple hyphens
}

/**
 * Generates full Supabase URL for an asset based on naming convention
 *
 * @param type - Asset type: 'certificate', 'project', or 'profile'
 * @param name - The name/title of the asset (e.g., "AWS Cloud", "My Project")
 * @returns Full URL to the asset in Supabase
 *
 * @example
 * getAssetUrl('certificate', 'AWS Cloud')
 * // Returns: https://oooexjbqlckrzpfebwnq.supabase.co/storage/v1/object/public/Certificates/cert_AWS-Cloud.jpg
 *
 * getAssetUrl('project', 'Ecommerce App')
 * // Returns: https://oooexjbqlckrzpfebwnq.supabase.co/storage/v1/object/public/Certificates/proj_Ecommerce-App.jpg
 *
 * getAssetUrl('profile')
 * // Returns: https://oooexjbqlckrzpfebwnq.supabase.co/storage/v1/object/public/Certificates/profile_main.jpg
 */
export function getAssetUrl(type: AssetType, name?: string): string {
  let filename: string

  if (type === 'certificate' && name) {
    const slug = titleToSlug(name)
    filename = `cert_${slug}.jpg`
  } else if (type === 'project' && name) {
    const slug = titleToSlug(name)
    filename = `proj_${slug}.jpg`
  } else if (type === 'book' && name) {
    const slug = titleToSlug(name)
    filename = `book_${slug}.jpg`
  } else if (type === 'profile') {
    filename = 'profile_main.jpg'
  } else {
    throw new Error(`Invalid asset type or missing name: type=${type}, name=${name}`)
  }

  return `${SUPABASE_BASE_URL}/${filename}`
}

/**
 * Gets the image URL with fallback to convention-based URL
 * If databaseUrl exists, use it; otherwise generate from naming convention
 *
 * @param databaseUrl - The URL from database (may be null)
 * @param type - Asset type
 * @param name - Asset name/title (for fallback generation)
 * @returns The final URL to use
 *
 * @example
 * // If database has URL
 * getImageUrl('https://custom-url.jpg', 'certificate', 'AWS')
 * // Returns: 'https://custom-url.jpg'
 *
 * // If database URL is null, generates from convention
 * getImageUrl(null, 'certificate', 'AWS Cloud')
 * // Returns: 'https://oooexjbqlckrzpfebwnq.supabase.co/storage/v1/object/public/Certificates/cert_AWS-Cloud.jpg'
 */
export function getImageUrl(
  databaseUrl: string | null | undefined,
  type: AssetType,
  name?: string
): string {
  // If URL exists in database, use it
  if (databaseUrl && databaseUrl.trim()) {
    return databaseUrl
  }

  // Fallback to convention-based URL
  if (!name) {
    throw new Error(`Cannot generate image URL: no database URL and no name provided for type=${type}`)
  }

  return getAssetUrl(type, name)
}

/**
 * Extracts display name from a certificate filename
 * Removes cert_ prefix and .jpg extension
 *
 * @param filename - Filename like "cert_AWS-Cloud.jpg"
 * @returns Display name like "AWS Cloud"
 *
 * @example
 * extractCertificateTitle('cert_AWS-Cloud.jpg')
 * // Returns: 'AWS Cloud'
 *
 * extractCertificateTitle('cert_Design-Fundamentals.jpg')
 * // Returns: 'Design Fundamentals'
 */
export function extractCertificateTitle(filename: string): string {
  return filename
    .replace(/^cert_/, '') // Remove cert_ prefix
    .replace(/\.jpg$/, '') // Remove .jpg extension
    .replace(/-/g, ' ') // Replace hyphens with spaces
}

/**
 * Extracts display name from a project filename
 * Removes proj_ prefix and .jpg extension
 */
export function extractProjectTitle(filename: string): string {
  return filename
    .replace(/^proj_/, '') // Remove proj_ prefix
    .replace(/\.jpg$/, '') // Remove .jpg extension
    .replace(/-/g, ' ') // Replace hyphens with spaces
}
