import './globals.css'
import React from 'react'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Vishal Singh Portfolio',
  description: 'Personal portfolio'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  )
}
