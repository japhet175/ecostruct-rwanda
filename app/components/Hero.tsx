'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// Services from PDF - 5 core services
const SERVICES = [
  'Building Construction',
  'Renovation Works',
  'Maintenance Services',
  'Landscaping & External Works',
  'Technical Supervision'
]

export default function Hero() {
  const [videoError, setVideoError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = () => {
      video.play().catch(() => {})
    }

    tryPlay()

    const interval = setInterval(() => {
      if (video.paused && !video.ended) {
        video.play().catch(() => {})
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden pt-16" aria-label="Hero">

      {/* Background video */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onCanPlay={() => setIsLoaded(true)}
          onError={() => setVideoError(true)}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback background */}
      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-green-900 to-green-800" />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/75" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

        {/* Eyebrow */}
        <span className="inline-block text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-4 border border-amber-400/40 rounded-full px-4 py-1.5">
          Rwanda's Trusted Construction Partner
        </span>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 leading-none tracking-tight">
          WE ARE{' '}
          <span className="text-amber-400 drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]">
            ECOSTRUCT
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-medium mb-8 text-white/80 italic">
          You Dream It — We Build It
        </p>

        {/* Services list */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mb-10">
          {SERVICES.map((service) => (
            <span
              key={service}
              className="text-xs sm:text-sm text-white/70 bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur-sm"
            >
              {service}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/#contact"
            className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-gray-900 px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 hover:-translate-y-0.5"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/#gallery"
            className="border border-white/50 hover:border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
          >
            View Our Work
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 text-white/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <span className="animate-bounce text-base">↓</span>
      </div>

    </section>
  )
}