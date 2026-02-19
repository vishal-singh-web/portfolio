"use client"

import React, { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import { usePortfolioData } from '../hooks/usePortfolioData'

export default function ProjectsClient(){
  const { projects } = usePortfolioData()
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  // Sync with search param if client routing sets it elsewhere
  useEffect(() => {
    const url = new URL(window.location.href)
    const idParam = url.searchParams.get('id')
    if (idParam) setSelectedProjectId(idParam)
  }, [])

  return (
    <>
      <h1 className="font-serif text-3xl text-white">Projects</h1>
      <p className="text-slate-300 mt-2">Click on any project to see details, live link, and GitHub repository.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p: any) => (
          <ProjectCard
            key={p.id}
            id={p.id}
            title={p.title}
            desc={p.description}
            tags={p.tech_stack}
            image={p.image_url}
            live_url={p.live_url}
            github_url={p.github_url}
            isOpen={selectedProjectId === p.id}
            onOpenChange={(newId) => setSelectedProjectId(newId)}
          />
        ))}
      </div>
    </>
  )
}
