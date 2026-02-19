"use client"
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '../../hooks/usePortfolioData'
import { getImageUrl } from '../../lib/assets'

export default function Bookshelf() {
  const [hovered, setHovered] = useState<number | null>(null)
  const { bookshelf } = usePortfolioData()

  const books = bookshelf.length > 0 ? bookshelf : []

  return (
    <div className="min-h-screen bg-[color:var(--bg)] pt-20 pb-20">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-white mb-4">Digital Bookshelf</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Books that shaped how I think. Hover to reveal the core lesson from each.</p>
      </motion.section>

      {/* Bookshelf Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {books.map((book: any, idx: number) => {
            const bookImageUrl = getImageUrl(book.image_url, 'book', book.title)
            return (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onHoverStart={() => setHovered(book.id)}
                onHoverEnd={() => setHovered(null)}
                className="h-64 cursor-pointer perspective">
                
                {/* Book Cover/Spine */}
                <motion.div
                  animate={{
                    rotateY: hovered === book.id ? 10 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="relative w-full h-full origin-center"
                  style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Book Cover Image or Spine */}
                  {bookImageUrl ? (
                    <div className="absolute inset-0 rounded-md shadow-lg overflow-hidden border border-white/10">
                      <img
                        src={bookImageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Crect fill="%23334155" width="300" height="450"/%3E%3C/svg%3E'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="book-spine absolute inset-0 bg-gradient-to-b from-electric to-electric/70 rounded-md shadow-lg flex items-center justify-center p-2 border-l-4 border-electric/50">
                      <p className="text-white text-sm font-bold text-center leading-tight">{book.spine}</p>
                    </div>
                  )}

                  {/* Lesson Overlay (On Hover) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered === book.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-slate-900/95 backdrop-blur rounded-md p-4 flex flex-col items-center justify-center border border-electric/40">
                    <div className="text-2xl mb-3">📖</div>
                    <p className="text-white text-xs text-center font-medium leading-tight">{book.lesson}</p>
                    <p className="text-slate-400 text-xs mt-2">{book.title}</p>
                    <p className="text-slate-400 text-xs mt-1 italic">{book.author}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Inspirational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-4xl mx-auto px-6 mt-20 glass backdrop-strong p-8 rounded-xl border border-electric/20 text-center">
        <p className="font-serif text-2xl text-electric mb-2">"A reader lives a thousand lives before he dies. The man who never reads lives only one."</p>
        <p className="text-slate-400 text-sm">— George R.R. Martin</p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-4xl mx-auto px-6 mt-16 text-center">
        <p className="text-slate-300 mb-6">Interested in what I'm reading right now?</p>
        <motion.a
          href="/#now"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-3 bg-electric hover:bg-electric/90 text-white rounded-lg font-medium transition-colors">
          Check My 'Now' Section
        </motion.a>
      </motion.div>
    </div>
  )
}
