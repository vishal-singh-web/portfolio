"use client"
import React from 'react'
import { motion } from 'motion/react'
import { FileText } from 'lucide-react'

export default function FAB() {
  return (
    <motion.a
      href="https://oooexjbqlckrzpfebwnq.supabase.co/storage/v1/object/public/Certificates/Vishal_Singh_Resume%20.pdf"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-40 pulse-electric"
      aria-label="Download resume">
      <div className="w-14 h-14 bg-electric rounded-full flex items-center justify-center shadow-lg hover:shadow-electric/50 hover:shadow-2xl transition-shadow">
        <FileText className="w-6 h-6 text-white" />
      </div>
    </motion.a>
  )
}
