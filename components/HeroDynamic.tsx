'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Profile, NowItem } from '../lib/supabase'

interface HeroProps {
  profile: Profile | null
  nowItems?: NowItem[]
}

export function HeroDynamic({ profile, nowItems = [] }: HeroProps) {
  // Fallback values if no profile data
  const fullName = profile?.full_name || 'Vishal Singh'
  const bio = profile?.bio || 'Computer Science student with hands-on MERN stack experience, focused on building scalable, user-centric web applications.'
  const quote = profile?.quote || '"Designing quiet systems that feel warm."'
  const profilePicture = profile?.profile_picture_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&crop=faces'

  // Use data from database or fallback to defaults
  const nowPoints = nowItems.length > 0 
    ? nowItems.map(item => `${item.emoji ? item.emoji + ' ' : ''}${item.title}`)
    : [
        "Learning: Framer Motion",
        "Reading: Sci-Fi Novels",
        "Coffee: High ☕"
      ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex-1">
        <h1 className="text-4xl md:text-6xl font-serif leading-tight text-white">
          {quote}
        </h1>
        <p className="mt-4 text-slate-300 max-w-xl">
          {bio}
        </p>
        <div className="mt-6 text-sm text-slate-400">
          <p>— {fullName}</p>
        </div>
      </motion.div>

      {/* Photo Container with Sticky Note */}
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-48 h-48 rounded-full electric-glow overflow-hidden bg-slate-800 border border-white/6">
          <img
            src={profilePicture}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* 'Now' Sticky Note - Classic Yellow Post-it */}
        <motion.div
          initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 100 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="absolute -bottom-37 left-1/2 transform -translate-x-1/2 w-48 p-5 bg-yellow-200 rounded-sm shadow-md cursor-pointer border-0">
          {/* Pin hole indicator */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-slate-400 shadow-sm"></div>

          <h4 className="font-caveat text-slate-800 text-base font-bold mb-3">Now</h4>
          <ul className="text-xs text-slate-700 space-y-1.5 font-caveat">
            {nowPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-slate-600 mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
