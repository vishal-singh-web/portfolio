"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

// 1. Initialize Supabase with safety checks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

interface GuestbookEntry {
  id: string
  name: string
  message: string
  created_at: string
}

export default function FullGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Stop if Supabase is not configured
    if (!supabase) {
      console.warn("Supabase credentials missing. Check your .env.local file.")
      setLoading(false)
      return
    }

    const fetchAll = async () => {
      try {
        const { data, error } = await supabase
          .from('guestbook')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setEntries(data || [])
      } catch (err) {
        console.error("Error fetching guestbook:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()

    // Real-time subscription
    const channel = supabase.channel('full-guestbook')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'guestbook' },
        (p) => {
          setEntries(prev => [p.new as GuestbookEntry, ...prev])
        }
      ).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Prevent Hydration Error by not rendering on server
  if (!mounted) return null

  return (
    <main className="min-h-screen bg-[color:var(--bg)] text-white pb-20 ">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <Link 
              href="/" 
              className="group flex items-center text-slate-400 text-sm hover:text-blue-400 transition-colors"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> 
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight">The Archive</h1>
            <p className="text-slate-400 max-w-md">
              A permanent record of everyone who has passed through this digital space.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4">
            <div className="h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
            <div>
              <div className="text-2xl font-mono font-bold text-white leading-none">
                {entries.length}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">
                Total Entries
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        {loading ? (
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {entries.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                <p className="text-slate-500 font-serif italic text-lg text-balance">The archive is currently empty. Be the first to leave a mark on the home page.</p>
              </div>
            ) : (
              <motion.div 
                layout
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
              >
                <AnimatePresence mode="popLayout">
                  {entries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="break-inside-avoid bg-white p-4 shadow-[20px_20px_60px_rgba(0,0,0,0.5)] rotate-[1.5deg] hover:rotate-0 transition-all duration-500 group"
                    >
                      <div className="bg-[#fdfdfd] p-5 border border-slate-100 min-h-[140px] mb-4 shadow-inner flex flex-col justify-center">
                        <p className="text-sm text-slate-800 font-serif leading-relaxed italic text-center">
                          "{entry.message}"
                        </p>
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-100 pt-3 px-1">
                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">
                          {entry.name}
                        </span>
                        <span 
                          className="text-[9px] text-slate-400 font-mono uppercase"
                          suppressHydrationWarning
                        >
                          {new Date(entry.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      {/* Decorative "Tape" effect */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/20 backdrop-blur-sm border border-white/10 rotate-[-2deg] pointer-events-none group-hover:opacity-0 transition-opacity" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  )
}