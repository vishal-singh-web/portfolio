'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { getImageUrl } from '../lib/assets'

interface ProjectCardDynamicProps {
  id: string
  title: string
  description: string
  tags: string[] | string
  image_url?: string | null
}

export function ProjectCardDynamic({
  id,
  title,
  description,
  tags,
  image_url
}: ProjectCardDynamicProps) {
  const router = useRouter()
  
  // Handle both string and array tags
  const tagList = Array.isArray(tags) ? tags : tags ? tags.split(',').map(t => t.trim()) : []

  // Use getImageUrl to handle fallback to naming convention
  // If image_url is null, automatically generates: proj_[Title].jpg
  const imageUrl = getImageUrl(image_url, 'project', title)

  const handleClick = () => {
    router.push(`/projects?id=${id}`)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={handleClick}
      className="group rounded-xl overflow-hidden bg-slate-900/50 border border-white/10 hover:border-electric/30 transition-all cursor-pointer">
      
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-slate-800">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            // Fallback if image not found
            (e.currentTarget as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231e293b" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="20" fill="%2364748b" text-anchor="middle" dy=".3em"%3EImage Not Found%3C/text%3E%3C/svg%3E'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg text-white group-hover:text-electric transition-colors">{title}</h3>

        <p className="mt-2 text-sm text-slate-400 line-clamp-2">{description}</p>

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
