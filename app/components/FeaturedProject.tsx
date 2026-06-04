// app/realisations/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

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
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = (index: number) => {
    setSelectedVideo(index)
  }

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setSelectedVideo(null)
  }

  // Forcer la lecture quand la vidéo est chargée dans le modal
  useEffect(() => {
    if (selectedVideo !== null && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err)
        // L'utilisateur devra cliquer manuellement sur play
      })
    }
  }, [selectedVideo])

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-900 mb-4">
          Our Projects
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover our construction, renovation, and landscaping projects in Rwanda.
        </p>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">Video Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectVideos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                onClick={() => handlePlay(index)}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-white relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>
                  <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80">
                    {video.title}
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-green-800">{video.title}</h3>
                  <p className="text-amber-600 text-sm mt-1">Click to play</p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
          onClick={closeModal}
        >
          <div className="max-w-4xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <div className="bg-black rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                className="w-full aspect-video"
                key={selectedVideo}
              >
                <source src={projectVideos[selectedVideo].src} type="video/mp4" />
                <p className="text-white p-4">
                  Your browser does not support video playback.
                  <a href={projectVideos[selectedVideo].src} className="text-amber-400 underline block mt-2">
                    Download video instead
                  </a>
                </p>
              </video>
            </div>
            <button
              className="mt-4 text-white hover:text-amber-400 transition flex items-center gap-2 mx-auto"
              onClick={closeModal}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}