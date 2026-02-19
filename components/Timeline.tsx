"use client"
import React from 'react'
import { motion } from 'motion/react'

export default function Timeline({ items }: { items: { year:string, title:string, details?:string[] }[] }){
  return (
    <div className="space-y-6">
      {items.map((it, idx) => (
        <motion.div key={idx} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay: idx*0.08 }} className="p-4 bg-slate-900/30 border border-white/6 rounded-lg">
          <div className="flex items-baseline justify-between">
            <div className="text-xs text-electric font-semibold">{it.year}</div>
            <div className="font-medium text-white">{it.title}</div>
          </div>
          {it.details && <ul className="mt-2 text-slate-300 text-sm list-disc pl-5">{it.details.map((d,i)=> <li key={i}>{d}</li>)}</ul>}
        </motion.div>
      ))}
    </div>
  )
}
