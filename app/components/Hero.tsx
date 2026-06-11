'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const [videoError, setVideoError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasTriedPlay = useRef(false)

  const SERVICES = (t('Hero.services') as unknown) as string[]
  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || prefersReducedMotion) return

    video.muted = true
    video.playsInline = true
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')

    const tryPlay = async () => {
      if (hasTriedPlay.current) return
      hasTriedPlay.current = true
      try {
        await video.play()
      } catch {
        hasTriedPlay.current = false
      }
    }

    tryPlay()
    video.addEventListener('canplay', tryPlay)

    const handleInteraction = () => tryPlay()
    window.addEventListener('touchstart', handleInteraction, { passive: true })
    window.addEventListener('touchend', handleInteraction, { passive: true })
    window.addEventListener('scroll', handleInteraction, { passive: true })
    window.addEventListener('click', handleInteraction)

    let observer: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              tryPlay()
            } else {
              video.pause()
              hasTriedPlay.current = false
            }
          })
        },
        { threshold: 0.25 }
      )
      observer.observe(video)
    }

    return () => {
      video.removeEventListener('canplay', tryPlay)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('touchend', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      observer?.disconnect()
    }
  }, [prefersReducedMotion])

  const showVideo = !videoError && !prefersReducedMotion

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero — Ecostruct Construction Rwanda"
    >
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onCanPlay={() => setIsLoaded(true)}
          onError={() => setVideoError(true)}
        >
          <source src="/videos/hero-video.webm" type="video/webm" />
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-br from-green-950 via-green-900 to-green-800 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/80"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 pt-16">

        <p className="inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] mb-5 border border-amber-400/40 rounded-full px-4 py-1.5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
          {t('Hero.eyebrow')}
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-3 leading-none tracking-tight">
          {t('Hero.weAre')}{' '}
          <span className="text-amber-400 drop-shadow-[0_0_40px_rgba(251,191,36,0.45)]">
            {t('Hero.brand')}
          </span>
        </h1>

        <p className="text-lg md:text-2xl font-medium mb-10 text-white/75 italic tracking-wide">
          {t('Hero.tagline')}
        </p>

        <ul
          className="flex flex-wrap justify-center gap-2 max-w-3xl mb-10 list-none p-0"
          aria-label="Our services"
        >
          {SERVICES.map((service) => (
            <li
              key={service}
              className="text-xs sm:text-sm text-white/70 bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur-sm"
            >
              {service}
            </li>
          ))}
        </ul>

        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/#contact"
            className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-gray-900 px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            {t('Hero.freeQuote')}
          </Link>
          <Link
            href="/realisations"
            className="border border-white/50 hover:border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t('Hero.viewWork')}
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 text-white/40 select-none"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">{t('Hero.scroll')}</span>
        <span className={prefersReducedMotion ? '' : 'animate-bounce'}>↓</span>
      </div>

    </section>
  )
}
