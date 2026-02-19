"use client"
import React, { useState, useEffect } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

interface GuestbookEntry {
    id: string
    name: string
    message: string
    created_at: string
}

export default function Guestbook() {
    const [entries, setEntries] = useState<GuestbookEntry[]>([])
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const baseX = useMotionValue(0)

    // 1. Fetch Logic
    const fetchEntries = async () => {
        if (!supabase) return
        try {
            const { data, error } = await supabase
                .from('guestbook')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10)
            if (error) throw error
            setEntries(data || [])
        } catch (error) {
            console.error('Error fetching:', error)
        }
    }

    // 2. Setup & Real-time
    useEffect(() => {
        setIsMounted(true)
        fetchEntries()

        if (supabase) {
            const channel = supabase
                .channel('guestbook-changes')
                .on('postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'guestbook' },
                    (payload) => setEntries(prev => [payload.new as GuestbookEntry, ...prev])
                )
                .subscribe()
            return () => { supabase.removeChannel(channel) }
        }
    }, [])

    // 3. Marquee Animation Logic
    useAnimationFrame((t, delta) => {
        let moveBy = -0.5 * (delta / 16) // Smooth scroll speed
        baseX.set(baseX.get() + moveBy)
        // Reset if it scrolls too far (looping)
        if (baseX.get() < -1200) baseX.set(0)
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !message.trim() || !supabase) return
        setLoading(true)
        try {
            const { error } = await supabase.from('guestbook').insert([{ name, message }])
            if (error) throw error
            setName(''); setMessage('')
            fetchEntries()
        } finally { setLoading(false) }
    }

    if (!isMounted) return null

    return (
        <section className="py-20 border-t border-white/5 bg-slate-950/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-serif text-white mb-2">Guestbook</h2>
                    <p className="text-slate-400">Notes from the community</p>
                </div>
                <Link href="/guestbook" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    View Full Guestbook →
                </Link>
            </div>

            {/* The Infinite Marquee Track */}
            <div className="flex whitespace-nowrap py-10 relative">
                <motion.div className="flex gap-6" style={{ x: baseX }}>
                    {[...entries, ...entries, ...entries].map((entry, idx) => (
                        <div
                            key={`${entry.id}-${idx}`}
                            className="inline-block w-48 bg-white p-3 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-300"
                        >
                            <div className="bg-slate-50 p-3 border border-slate-100 h-28 overflow-hidden mb-3">
                                <p className="text-[11px] text-slate-800 font-handwriting italic whitespace-normal leading-relaxed">
                                    "{entry.message}"
                                </p>
                            </div>
                            <div className="flex justify-between items-end border-t border-slate-100 pt-2">
                                <span className="text-[10px] font-bold text-slate-900 truncate max-w-[100px]">
                                    {entry.name}
                                </span>
                                <span className="text-[8px] text-slate-400 uppercase tracking-tighter">
                                    {new Date(entry.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Minimal Form */}
            <div className="max-w-xl mx-auto mt-16 px-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                    <input
                        value={name} onChange={e => setName(e.target.value)}
                        placeholder="Your name" className="bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                        value={message} onChange={e => setMessage(e.target.value)}
                        placeholder="Leave a message..." className="bg-transparent border-b border-white/10 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                    <button type="submit" disabled={loading} className="mt-4 bg-white text-black py-2 rounded-full text-xs font-bold hover:bg-blue-400 transition-colors">
                        {loading ? 'SENDING...' : 'SIGN GUESTBOOK'}
                    </button>
                </form>
            </div>
        </section>
    )
}