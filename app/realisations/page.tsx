'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ecoleVideo } from '@/app/data/media'

export default function RealisationsPage() {
  const [showVideo, setShowVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.focus()
    }
  }, [showVideo])

  const handlePlay = () => {
    if (!ecoleVideo) {
      setHasError(true)
      return
    }
    setIsLoading(true)
    setShowVideo(true)
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Our Work
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mt-2 mb-4">
            Our Projects
          </h1>
          <p className="text-gray-600">
            Discover our renovation project at the French School in Rwanda.
          </p>
        </div>

        {/* Video Player */}
        <div className="max-w-4xl mx-auto">
          {hasError ? (
            <div className="aspect-video bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
              <span className="text-4xl mb-3">⚠️</span>
              <p className="font-medium">Video unavailable</p>
              <p className="text-sm text-gray-400 mt-1">The file could not be loaded.</p>
              <button
                onClick={() => { setHasError(false); setShowVideo(false) }}
                className="mt-4 text-sm text-green-700 hover:text-amber-600 underline"
              >
                Try again
              </button>
            </div>
          ) : !showVideo ? (
            /* Thumbnail / Play button */
            <button
              onClick={handlePlay}
              className="group w-full aspect-video bg-gradient-to-br from-green-900 to-gray-900 rounded-2xl flex flex-col items-center justify-center text-white cursor-pointer hover:scale-[1.01] transition-all duration-300 shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500"
              aria-label="Play École Française renovation video"
            >
              {/* Play button circle */}
              <div className="w-20 h-20 bg-amber-500 group-hover:bg-amber-400 rounded-full flex items-center justify-center mb-5 shadow-lg transition-colors duration-200 group-hover:scale-110 transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8 translate-x-0.5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              <p className="text-xl font-semibold">École Française – Renovation Project</p>
              <p className="text-sm text-white/60 mt-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-4.586-2.651A1 1 0 009 9.38v5.24a1 1 0 001.166.984l4.586-2.651a1 1 0 000-1.784z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Click to watch
              </p>
            </button>
          ) : (
            /* Video element */
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-amber-500 rounded-full animate-spin" />
                </div>
              )}
              <video
                ref={videoRef}
                src={ecoleVideo}
                controls
                autoPlay
                playsInline
                className="w-full rounded-2xl"
                onCanPlay={() => setIsLoading(false)}
                onError={() => { setHasError(true); setShowVideo(false) }}
              />
            </div>
          )}

          {/* Project meta */}
          {!hasError && (
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {[
                { icon: '📍', label: 'Kigali, Rwanda' },
                { icon: '🏗️', label: 'Renovation' },
                { icon: '🏫', label: 'École Française' },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-full px-4 py-1.5 shadow-sm"
                >
                  {icon} {label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="text-center mt-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-green-700 hover:text-amber-600 font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}