"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { getImageUrl } from '../lib/assets'

interface ProjectCardProps {
  id?: string
  title: string
  desc: string
  tags?: string[]
  image?: string | null
  live_url?: string | null
  github_url?: string | null
  isOpen?: boolean
  onOpenChange?: (id: string | null) => void
}

export default function ProjectCard({
  id,
  title,
  desc,
  tags,
  image,
  live_url,
  github_url,
  isOpen: externalIsOpen,
  onOpenChange
}: ProjectCardProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  // Use external state if provided (for projects page), otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen

  // Normalize open/close handlers so types align: external handler expects id|string/null,
  // internal state uses boolean. Provide `open` and `close` helpers for correct behavior.
  const open = () => {
    if (onOpenChange) {
      onOpenChange(id ?? null)
    } else {
      setInternalIsOpen(true)
    }
  }

  const close = () => {
    if (onOpenChange) {
      onOpenChange(null)
    } else {
      setInternalIsOpen(false)
    }
  }
  const imageUrl = getImageUrl(image, 'project', title)

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={() => open()}
        className="bg-slate-900/40 border border-white/6 rounded-xl overflow-hidden cursor-pointer hover:border-electric/30 transition-all group">
        
        {/* Image */}
        <div className="w-full h-40 overflow-hidden bg-slate-800 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231e293b" width="400" height="300"/%3E%3C/svg%3E'
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h4 className="font-semibold text-white group-hover:text-electric transition-colors">{title}</h4>
          <p className="text-slate-300 text-sm mt-2 line-clamp-2">{desc}</p>
          {tags && (
            <div className="mt-3 flex gap-2 flex-wrap text-xs text-slate-200/80">
              {tags.map(t => (
                <span key={t} className="px-2 py-1 bg-white/3 rounded">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close()}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-slate-900 rounded-xl overflow-hidden border border-white/10">
              
              {/* Close Button */}
              <button
                onClick={() => close()}
                className="absolute top-4 right-4 z-10 text-slate-300 hover:text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center">
                ✕
              </button>

              {/* Image */}
              <div className="w-full h-64 overflow-hidden bg-slate-800 flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h2 className="font-serif text-3xl text-white mb-2">{title}</h2>

                {/* Technologies */}
                {tags && tags.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-300 mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium bg-electric/10 text-electric rounded-full border border-electric/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Summary</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
                </div>

                {/* Links */}
                <div className="flex gap-3 flex-wrap">
                  {live_url && (
                    <a
                      href={live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-electric text-black font-semibold rounded-lg hover:bg-electric/90 transition-colors inline-flex items-center gap-2">
                      🔗 Live Link
                    </a>
                  )}
                  {github_url && (
                    <a
                      href={github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-800 text-white border border-white/20 font-semibold rounded-lg hover:bg-slate-700 transition-colors inline-flex items-center gap-2">
                      ⭐ GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
