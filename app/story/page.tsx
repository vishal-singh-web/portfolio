"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '../../hooks/usePortfolioData'
import { LoadingScreen } from '../../components/LoadingScreen'
import { DataErrorFallback, EmptyStateFallback } from '../../components/ErrorFallback'

export default function Story() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [, setPathLength] = useState(0)
  const { story, loading, error } = usePortfolioData()

  useEffect(() => {
    const handleScroll = () => {
      if (!svgRef.current) return

      const path = svgRef.current.querySelector('path')
      if (!path) return

      const length = path.getTotalLength()
      setPathLength(length)

      const rect = svgRef.current.getBoundingClientRect()
      const scrollPercent = 1 - rect.top / window.innerHeight
      const clampedPercent = Math.max(0, Math.min(1, scrollPercent))

      path.style.strokeDashoffset = String(length * (1 - clampedPercent))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20">
        <DataErrorFallback error={error} section="Story" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg)] pt-20 pb-20">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">My Story</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          A journey of curiosity, learning, and growth. From first lines of code to building meaningful experiences.
        </p>
      </motion.section>

      <div className="max-w-4xl mx-auto px-6 relative">
        <svg
          ref={svgRef}
          className="absolute left-1/2 top-0 bottom-0 w-1 h-full transform -translate-x-1/2 pointer-events-none"
          viewBox="0 0 2 1000"
          preserveAspectRatio="none"
          style={{ width: '2px' }}>
          <path
            d="M 1 0 L 1 1000"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray={1000}
            strokeDashoffset={1000}
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="space-y-12">
          {story.length > 0 ? (
            story.map((milestone, idx) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`flex items-center gap-8 ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="relative flex-shrink-0">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-electric/10 rounded-full blur-xl" />
                  <div className="relative w-6 h-6 bg-electric rounded-full border-2 border-electric shadow-lg electric-glow" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 glass backdrop-strong p-6 rounded-xl border border-white/6">
                  {milestone.emoji && <div className="text-3xl mb-2">{milestone.emoji}</div>}
                  <div className="text-electric font-semibold text-sm mb-1">{milestone.year}</div>
                  <h3 className="font-serif text-2xl text-white mb-2">{milestone.title}</h3>
                  <p className="text-slate-300">{milestone.description}</p>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <EmptyStateFallback section="story milestones" />
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <p className="text-slate-300 mb-6">Want to know more? Let's connect.</p>
        <motion.a
          href="/#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 bg-electric hover:bg-electric/90 text-white rounded-lg font-medium transition-colors">
          Get in Touch
        </motion.a>
      </motion.div>
    </div>
  )
}
