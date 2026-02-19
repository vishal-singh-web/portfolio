'use client'

import React from 'react'
import { motion } from 'motion/react'

interface ProjectCardProps {
  title: string
  desc: string
  tags: string[] | string
  image?: string
}

export function ProjectCardDynamic({ title, desc, tags, image }: ProjectCardProps) {
  // Handle both string and array tags
  const tagList = Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : [])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="group rounded-xl overflow-hidden bg-slate-900/50 border border-white/10 hover:border-electric/30 transition-all">
      
      {/* Image */}
      {image && (
        <div className="relative h-40 overflow-hidden bg-slate-800">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg text-white group-hover:text-electric transition-colors">
          {title}
        </h3>
        
        <p className="mt-2 text-sm text-slate-400 line-clamp-2">
          {desc}
        </p>

        {/* Tech Stack Badges */}
        {tagList.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tagList.map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-2 py-1 text-xs font-medium bg-electric/10 text-electric rounded-full border border-electric/20 hover:border-electric/50 transition-colors cursor-default">
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
