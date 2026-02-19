'use client'

import React from 'react'
import { motion } from 'motion/react'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryProps {
  error: Error | null
  section?: string
  onRetry?: () => void
}

export function DataErrorFallback({ error, section = 'Portfolio', onRetry }: ErrorBoundaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-6 py-12 text-center">
      
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 mb-4">
        <AlertCircle className="w-6 h-6 text-red-400" />
      </div>

      <h3 className="text-xl font-serif text-white mb-2">Failed to load {section}</h3>
      
      <p className="text-slate-400 mb-4 text-sm">
        {error?.message || 'An unexpected error occurred. Please try again.'}
      </p>

      {onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-electric hover:bg-electric/90 text-white rounded-lg font-medium transition-colors">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  )
}

export function EmptyStateFallback({ section = 'data' }: { section?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto px-6 py-12 text-center">
      
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800/50 mb-4">
        <AlertCircle className="w-6 h-6 text-slate-400" />
      </div>

      <h3 className="text-lg font-serif text-white mb-2">No {section} Available</h3>
      
      <p className="text-slate-400 text-sm">
        This section is currently empty. Check back soon!
      </p>
    </motion.div>
  )
}
