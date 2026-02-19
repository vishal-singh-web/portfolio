"use client"

import dynamic from 'next/dynamic'

const ProjectsClient = dynamic(() => import('../../components/ProjectsClient'), { ssr: false })

export default function ProjectsPage(){
  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-12">
      <ProjectsClient />
    </main>
  )
}
