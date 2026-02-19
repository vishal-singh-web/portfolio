"use client"
import React from 'react'
import { motion } from 'motion/react'

export default function BubbleGrid({ items }: { items: { label:string, icon?:React.ReactNode }[] }){
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {items.map((it, i) => (
        <motion.div key={i} whileHover={{ y:-6 }} className="p-4 bg-slate-900/30 border border-white/6 rounded-full flex flex-col items-center justify-center text-center">
          <div className="text-electric mb-2">{it.icon ?? '•'}</div>
          <div className="text-sm text-slate-200">{it.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
