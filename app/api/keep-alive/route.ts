import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase keep-alive failed: Supabase environment variables are missing')
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { error } = await supabase.from('profile').select('id').limit(1)

  if (error) {
    console.error('Supabase keep-alive failed:', error.message)
    return NextResponse.json({ ok: false }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
