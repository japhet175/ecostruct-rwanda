'use client'

import Link from 'next/link'
import { useState } from 'react'

const SERVICES = ['Construction', 'Renovation', 'Electrical', 'Plumbing', 'Landscaping']

export default function Hero() {
  const [videoError, setVideoError] = useState(false)

  const handleVideoError = () => {
    console.warn('Hero video failed to load')
    setVideoError(true)
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden pt-16"
      aria-label="Hero section with background video"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
        onError={handleVideoError}
       
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" 
        aria-hidden="true" 
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8">
        
        {/* Badge */}
        <div className="mb-4 inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-sm">
          <span className="text-amber-400 mr-1">✓</span> 
          Founded in 2024
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 leading-[1.1]">
          WE ARE{' '}
          <span className="text-amber-500 inline-block hover:scale-105 transition-transform duration-300">
            E-CONSTRUCT
          </span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-amber-400">
          You Dream It, <span className="italic">We Build It</span>
        </p>

        <p className="text-base sm:text-lg max-w-2xl mb-8 text-gray-200 tracking-wide">
          {SERVICES.join(' • ')}
        </p>

        {/* Call to action buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/contact"
            className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black/50 shadow-lg hover:shadow-xl"
          >
            Free Quote
          </Link>
          <Link
            href="/realisations"
            className="border-2 border-white hover:bg-white/20 active:bg-white/30 px-8 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 backdrop-blur-sm"
          >
            View Our Work
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 text-white/70 text-sm z-10"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest animate-pulse">Scroll</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Error fallback */}
      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-800 flex items-center justify-center z-0">
          <p className="text-white/50 text-lg">Video unavailable</p>
        </div>
      )}
    </section>
  )
}