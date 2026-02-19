'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Certificate } from '../lib/supabase'
import { getImageUrl } from '../lib/assets'

interface CertificateCardProps extends Omit<Certificate, 'created_at'> {
  variant?: 'grid' | 'list'
}

export function CertificateCard({
  id,
  title,
  issuer,
  image_url,
  date_earned,
  variant = 'grid'
}: CertificateCardProps) {
  // Use getImageUrl to handle fallback to naming convention
  // If image_url is null, automatically generates: cert_[Title].jpg
  const imageUrl = getImageUrl(image_url, 'certificate', title)
  const [isOpen, setIsOpen] = useState(false)

  const formattedDate = new Date(date_earned).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  })

  if (variant === 'list') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex gap-4 p-4 bg-slate-900/30 border border-white/5 rounded-xl hover:bg-slate-900/50 transition-colors group cursor-pointer"
        onClick={() => setIsOpen(true)}>
        
        {/* Thumbnail */}
        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-800 border border-white/10">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%231e293b" width="100" height="100"/%3E%3C/svg%3E'
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white group-hover:text-electric transition-colors truncate">{title}</h4>
          <p className="text-sm text-slate-400 mt-0.5">{issuer}</p>
          <p className="text-xs text-slate-500 mt-1">{formattedDate}</p>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute -top-10 right-0 text-slate-300 hover:text-white text-xl">
                  ✕
                </button>
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="text-slate-400 text-sm">{issuer} • {formattedDate}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    )
  }

  // Grid variant (default)
  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={() => setIsOpen(true)}
        className="group rounded-xl overflow-hidden bg-slate-900/30 border border-white/5 hover:border-electric/20 transition-all cursor-pointer">
        
        {/* Image */}
        <div className="w-full h-48 overflow-hidden bg-slate-800 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform group-hover:brightness-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231e293b" width="400" height="300"/%3E%3C/svg%3E'
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h4 className="font-medium text-white text-sm line-clamp-2 group-hover:text-electric transition-colors">
            {title}
          </h4>
          <p className="text-xs text-slate-400 mt-1">{issuer}</p>
          <p className="text-xs text-slate-500 mt-2">{formattedDate}</p>
        </div>
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-10 right-0 text-slate-300 hover:text-white text-xl">
                ✕
              </button>
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white font-semibold">{title}</h3>
                <p className="text-slate-400 text-sm">{issuer} • {formattedDate}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
