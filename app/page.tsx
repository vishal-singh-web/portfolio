'use client'

import React, { useState } from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { LoadingScreen } from '../components/LoadingScreen'
import { DataErrorFallback, EmptyStateFallback } from '../components/ErrorFallback'
import { HeroDynamic } from '../components/HeroDynamic'
import { ProjectCardDynamic } from '../components/ProjectCardDynamic-updated'
import { CertificateCard } from '../components/CertificateCard'
import BubbleGrid from '../components/BubbleGrid'
import Footer from '../components/Footer'
import Guestbook from '../components/Guestbook'
import FAB from '../components/FAB'

/**
 * Updated Home Page with Supabase Integration
 *
 * Features:
 * - Loading state while fetching from Supabase
 * - Error handling with retry option
 * - Dynamic profile data (Hero section)
 * - Dynamic project cards with tech stack badges
 * - Dynamic certificate gallery with auto-image fallback
 * - Experience timeline (sorted by order_index)
 * - Asset URL auto-generation using naming conventions
 *
 * Asset Naming Convention:
 * - Profile: profile_main.jpg
 * - Projects: proj_[Title-With-Hyphens].jpg (e.g., proj_Ecommerce-App.jpg)
 * - Certificates: cert_[Title-With-Hyphens].jpg (e.g., cert_AWS-Cloud.jpg)
 *
 * If image_url is NULL in database, components automatically generate the URL!
 */
export default function Page() {
  const { profile, experience, projects, certificates, nowItems, loading, error } = usePortfolioData()
  const [retryCount, setRetryCount] = useState(0)

  // Show loading screen while fetching
  if (loading) {
    return <LoadingScreen />
  }

  // Show error with retry option
  if (error) {
    return (
      <div className="min-h-screen">
        <FAB />
        <DataErrorFallback
          error={error}
          section="Portfolio Data"
          onRetry={() => setRetryCount(prev => prev + 1)}
        />
      </div>
    )
  }

  return (
    <div>
      <FAB />
      <main className="min-h-screen">
        {/* ============================================================ */}
        {/* SECTION 1: HERO - Profile Data with Auto Image Fallback */}
        {/* ============================================================ */}
        <HeroDynamic profile={profile} nowItems={nowItems} />

        {/* ============================================================ */}
        {/* SECTION 2: EXPERIENCE - Sorted by order_index */}
        {/* ============================================================ */}
        <section id="experience" className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="font-serif text-3xl text-white">My Experience</h2>
          <p className="mt-3 text-slate-300 max-w-2xl">Professional journey and achievements.</p>

          {experience.length > 0 ? (
            <div className="mt-8 space-y-6">
              {experience.map((exp, idx) => (
                <div key={exp.id} className={`transform ${idx % 2 === 0 ? '-rotate-1' : 'rotate-2'}`}>
                  <article className="p-6 bg-slate-900/30 border border-white/6 rounded-xl hover:bg-slate-900/50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-serif text-xl text-white">{exp.position}</h3>
                        <p className="text-electric font-medium text-sm">{exp.company}</p>
                        <p className="text-slate-400 text-sm mt-2">{exp.description}</p>
                      </div>
                      <div className="text-right text-sm text-slate-500 whitespace-nowrap flex-shrink-0">
                        <p>
                          {new Date(exp.start_date).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                        {exp.end_date && (
                          <p className="text-xs">
                            to{' '}
                            {new Date(exp.end_date).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          ) : (
            <EmptyStateFallback section="experience" />
          )}
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: PROJECTS - With Tech Stack Badges and Auto Images */}
        {/* ============================================================ */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="font-serif text-3xl text-white">The Best of Me</h2>
          <p className="mt-3 text-slate-300 max-w-2xl">Featured projects with automatic image fallback</p>

          {projects.filter(p => p.featured).length > 0 ? (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects
                .filter(p => p.featured)
                .map(p => (
                  <ProjectCardDynamic
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    description={p.description}
                    tags={p.tech_stack}
                    image_url={p.image_url}
                  />
                ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyStateFallback section="featured projects" />
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: CERTIFICATES - With Auto Image Fallback */}
        {/* ============================================================ */}
        <section id="certificates" className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="font-serif text-3xl text-white">Top Certificates</h2>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Images auto-generate from naming convention if not in database
          </p>

          {certificates.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {certificates.slice(0, 3).map(cert => (
                <CertificateCard key={cert.id} {...cert} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyStateFallback section="certificates" />
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* SECTION 5: GUESTBOOK */}
        {/* ============================================================ */}
        <Guestbook />

        {/* ============================================================ */}
        {/* FOOTER */}
        {/* ============================================================ */}
        <Footer />
      </main>
    </div>
  )
}
