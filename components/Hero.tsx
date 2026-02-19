"use client"
import React from 'react'
import { motion } from 'motion/react'

export default function Hero() {
  const nowPoints = [
    "Learning: Framer Motion",
    "Reading: Sci-Fi Novels",
    "Coffee: High ☕"
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex-1">
        <h1 className="text-4xl md:text-6xl font-serif leading-tight text-white">"Designing quiet systems that feel warm."</h1>
        <p className="mt-4 text-slate-300 max-w-xl">Computer Science student with hands-on MERN stack experience, focused on building scalable,
          user-centric web applications. Proficient in MongoDB, Express.js, React.js, Node.js, RESTful APIs,
          JWT authentication, and GitHub workflows for collaborative development.</p>
      </motion.div>

      {/* Photo Container with Sticky Note */}
      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-48 h-48 rounded-full electric-glow overflow-hidden bg-slate-800 border border-white/6">
          <img src="https://oooexjbqlckrzpfebwnq.supabase.co/storage/v1/object/public/Certificates/profilepic.jpg" alt="portrait" className="w-full h-full object-cover" />
        </motion.div>

        {/* 'Now' Sticky Note - Classic Yellow Post-it */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          // Positioning: top-[90%] pushes it to the bottom edge with minimal overlap
          className="absolute top-[85%] -right-4 w-44 p-4 bg-yellow-200 rounded-sm shadow-xl cursor-pointer z-10 origin-top"
          style={{
            // This creates the continuous hanging/swinging motion
            animation: "swing 3s ease-in-out infinite"
          }}
        >
          {/* The Pin - visual anchor for the swing */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-600 shadow-inner z-20">
            <div className="w-1 h-1 bg-white/40 rounded-full m-0.5"></div>
          </div>

          <h4 className="font-caveat text-slate-800 text-lg font-bold mb-1">Now</h4>
          <ul className="text-xs text-slate-700 space-y-1 font-caveat leading-tight">
            {nowPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1">
                <span>• {point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
