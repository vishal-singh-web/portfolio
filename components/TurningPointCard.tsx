"use client"
import React from 'react'
import { motion } from 'motion/react'

export default function TurningPointCard({ title, children }: { title:string, children:React.ReactNode }){
  return (
    <motion.article
      initial={{ opacity:0, y:20, rotate:-2 }}
      whileInView={{ opacity:1, y:0, rotate:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.7 }}
      className="max-w-md glass backdrop-strong p-6 rounded-2xl turning-point-card breathe"
      style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.06))' }}>
      <h3 className="font-serif text-xl text-white">{title}</h3>
      <div className="mt-3 text-slate-200 text-sm">{children}</div>
    </motion.article>
  )
}
