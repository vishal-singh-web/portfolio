"use client"
import React from 'react'
import { usePortfolioData } from '../../hooks/usePortfolioData'
import { CertificateCard } from '../../components/CertificateCard'

export default function CredentialsPage(){
  const { certificates, loading, error } = usePortfolioData()
  const trophy = certificates.find((certificate) =>
    certificate.title.toLowerCase().includes('trophy')
  )
  const visibleCertificates = trophy
    ? certificates.filter((certificate) => certificate.id !== trophy.id)
    : certificates
  const trophyUrl =
    trophy?.image_url ||
    'https://oooexjbqlckrzpfebwnq.supabase.co/storage/v1/object/public/Certificates/trophy.png'
  const trophyDate = trophy?.date_earned
    ? new Date(trophy.date_earned).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    : null

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-12">
      <div className="relative min-h-56">
        <h1 className="font-serif text-3xl text-white">Credentials</h1>
        <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center text-center">
          <img
            src={trophyUrl}
            alt={trophy?.title || 'Trophy'}
            className="h-48 w-48 object-contain drop-shadow-[0_0_18px_rgba(251,191,36,0.35)]"
          />
          {trophy && (
            <div className="mt-2 max-w-64">
              <p className="text-sm font-medium text-white">{trophy.title}</p>
              <p className="text-xs text-slate-400">
                {trophy.issuer}
                {trophyDate ? ` • ${trophyDate}` : ''}
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="text-slate-300 mt-2">Gallery of certificates.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleCertificates.map((c) => (
          <CertificateCard key={c.id} {...c} variant="grid" />
        ))}
      </div>
    </main>
  )
}
