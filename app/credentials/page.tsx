"use client"
import React from 'react'
import { usePortfolioData } from '../../hooks/usePortfolioData'
import { CertificateCard } from '../../components/CertificateCard'

export default function CredentialsPage(){
  const { certificates, loading, error } = usePortfolioData()

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl text-white">Credentials</h1>
      <p className="text-slate-300 mt-2">Gallery of certificates.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {certificates.map((c) => (
          <CertificateCard key={c.id} {...c} variant="grid" />
        ))}
      </div>
    </main>
  )
}
