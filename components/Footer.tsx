"use client"
import React from 'react'
import ContactForm from './ContactForm'

export default function Footer(){
  return (
    <footer className="mt-16 border-t border-white/6 pt-10 pb-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-serif text-2xl text-white">Get in touch</h3>
          <p className="text-slate-300 mt-2">I’m open to collaborations, freelance, and interesting puzzles. Send a note and I’ll reply.</p>
          <div className="mt-4 flex gap-3 text-slate-200">
            <a href="https://leetcode.com/u/LUCIFER106/" className="hover:text-electric">LeetCode</a>
            <a href="https://github.com/vishal-singh-web" className="hover:text-electric">GitHub</a>
            <a href="https://www.linkedin.com/in/vishalsingh-profile/" className="hover:text-electric">LinkedIn</a>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
      <div className="mt-8 text-center text-slate-500 text-sm">© {new Date().getFullYear()} Cozy-Tech</div>
    </footer>
  )
}
