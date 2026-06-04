// app/realisations/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

// Définition locale des vidéos (chemins vérifiés)
const projectVideos = [
  { 
    title: "Construction Project", 
    src: "/videos/project-middle.mp4",
  },
  { 
    title: "French School Renovation", 
    src: "/videos/project-whatsapp.mp4",
  },
  { 
    title: "Latest Project", 
    src: "/videos/project-last.mp4",
  },
]

export default function RealisationsPage() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-900 mb-4">
          Our Projects
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover our construction, renovation, and landscaping projects in Rwanda.
        </p>

        {/* Video Gallery */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">Video Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectVideos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => setSelectedVideo(index)}
              >
                {/* Video thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center text-white relative">
                  {/* Play button */}
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg className="w-6 h-6 ml-1" fill="white" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80">
                    {video.title}
                  </p>
                </div>
                
                {/* Video info */}
                <div className="p-4">
                  <h3 className="font-semibold text-green-800">{video.title}</h3>
                  <p className="text-amber-600 text-sm mt-1">Click to play</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home button */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-green-700 hover:text-amber-600 font-medium transition group"
          >
            Back to Home
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="max-w-4xl w-full relative" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors text-sm"
            >
              ✕ Close
            </button>

            {/* Video player */}
            <div className="bg-black rounded-xl overflow-hidden">
              <video
                controls
                autoPlay
                playsInline
                className="w-full aspect-video"
                key={selectedVideo}
              >
                <source src={projectVideos[selectedVideo].src} type="video/mp4" />
                <div className="text-white p-4 text-center">
                  <p>Your browser doesn't support video playback.</p>
                  <a 
                    href={projectVideos[selectedVideo].src} 
                    className="text-amber-400 underline block mt-2"
                    download
                  >
                    Download video instead
                  </a>
                </div>
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}