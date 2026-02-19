'use client'

import React from 'react'
import { motion } from 'motion/react'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[color:var(--bg)] flex items-center justify-center z-50">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        
        {/* Animated loading dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-electric rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity
              }}
            />
          ))}
        </div>

        <motion.p
          className="text-slate-300 text-lg font-serif"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}>
          Loading your portfolio...
        </motion.p>

        <p className="text-slate-500 text-sm mt-2">Fetching from the database</p>
      </motion.div>
    </div>
  )
}
