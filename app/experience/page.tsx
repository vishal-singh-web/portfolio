'use client'

import React from 'react'
import Timeline from '../../components/Timeline'
import { usePortfolioData } from '../../hooks/usePortfolioData'

export default function ExperiencePage(){
  const { experience } = usePortfolioData()

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl text-white">Experience</h1>
      <div className="mt-6">
        <Timeline items={experience.map(e => ({ year: new Date(e.start_date).getFullYear().toString(), title: `${e.position} — ${e.company}`, details: [e.description] }))} />
      </div>
    </main>
  )
}
