"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePortfolioData } from '../../hooks/usePortfolioData'

export default function Constellation() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { skills } = usePortfolioData()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  // Map skills into groups and positions with randomization
  const grouped = skills.reduce((acc: any, s: any) => {
    acc[s.category] = acc[s.category] || []
    acc[s.category].push(s)
    return acc
  }, {})

  // Generate randomized positions for each skill
  const generateRandomPosition = (categoryIndex: number, skillIndex: number, totalSkills: number) => {
    // Create a pseudo-random seed for consistency across renders
    const seed = categoryIndex * 1000 + skillIndex
    const random1 = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000)
    const random2 = Math.sin(seed + 1) * 10000 - Math.floor(Math.sin(seed + 1) * 10000)
    
    // Distribute categories into different regions
    const regionX = (categoryIndex % 3) * 33 + 10
    const regionY = Math.floor(categoryIndex / 3) * 40 + 15
    
    // Add randomization within each region
    const x = regionX + random1 * 20 - 10
    const y = regionY + random2 * 30 - 15
    
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(90, y)) }
  }

  const groups = Object.keys(grouped).map((k, idx) => ({ 
    label: k, 
    color: ['#60a5fa','#8b5cf6','#10b981','#f59e0b'][idx % 4], 
    skills: grouped[k].map((sk: any, i:number) => {
      const pos = generateRandomPosition(idx, i, grouped[k].length)
      return { id: sk.id, name: sk.name, x: pos.x, y: pos.y }
    }) 
  }))

  const ALL_SKILLS = groups.flatMap(g => g.skills.map((s:any) => ({ ...s, color: g.color })))
  const CATEGORY_CONNECTIONS = groups.flatMap((g:any) => g.skills.map((s:any, i:number) => ({ from: s, to: g.skills[(i+1)%g.skills.length], color: g.color })))

  return (
    <section className="relative w-full bg-[color:var(--bg)] pt-4 pb-20 px-4 overflow-hidden min-h-screen flex flex-col items-center">
      
      <div className="text-center mb-10 z-10">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 italic">Skill Galaxies</h2>
        <p className="text-slate-500 text-[9px] uppercase tracking-[0.4em]">Categorized Systems</p>
      </div>

      <div className="relative w-full max-w-5xl aspect-[4/5] md:aspect-[16/9] rounded-3xl bg-slate-950/40 border border-white/5 backdrop-blur-sm">
        
        {/* Connection Layer */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
          {CATEGORY_CONNECTIONS.map((line: any, i:number) => {
            const isActive = hovered === line.from.id || hovered === line.to.id
            return (
              <motion.line
                key={i}
                x1={`${line.from.x}%`} y1={`${line.from.y}%`}
                x2={`${line.to.x}%`} y2={`${line.to.y}%`}
                stroke={line.color}
                strokeWidth={isActive ? "0.4" : "0.15"}
                strokeOpacity={isActive ? "0.8" : "0.2"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.05 }}
              />
            )
          })}
        </svg>

        {/* Category Labels (Positioned near clusters) */}
        {groups.map((group:any) => (
          <div 
            key={group.label}
            className="absolute pointer-events-none opacity-40"
            style={{ 
              left: `${group.skills[0].x}%`, 
              top: `${group.skills[0].y - 8}%` 
            }}
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]" style={{ color: group.color }}>
              {group.label}
            </span>
          </div>
        ))}

        {/* The Stars */}
        {ALL_SKILLS.map((skill) => {
          const isActive = hovered === skill.id
          return (
            <div
              key={skill.id}
              className="absolute group"
              style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
            >
              <button
                onMouseEnter={() => setHovered(skill.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                {/* Core Star */}
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.8 : 1,
                    backgroundColor: isActive ? skill.color : '#ffffff66'
                  }}
                  className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                />
                
                {/* Constant Label */}
                <span className={`
                  mt-2 text-[8px] md:text-[10px] font-bold tracking-tight uppercase whitespace-nowrap transition-all
                  ${isActive ? 'scale-110 opacity-100' : 'opacity-60 text-slate-400'}
                `} style={{ color: isActive ? skill.color : undefined }}>
                  {skill.name}
                </span>

                {/* Glow Aura */}
                {isActive && (
                  <div className="absolute inset-0 w-10 h-10 bg-current opacity-20 blur-xl rounded-full" style={{ color: skill.color }} />
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Background Star Field */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>
    </section>
  )
}