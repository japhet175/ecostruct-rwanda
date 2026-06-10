'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { egImaraPartners, ambassadePhotos, ecolePhotos, otherProjects } from '@/app/data/media'

type TabKey = 'partners' | 'ecole' | 'others'

interface Photo {
  src: string
  title: string
  category: string
}

const TABS: { key: TabKey; label: string; emoji: string }[] = [
  { key: 'partners', label: 'Strategic Partners', emoji: '🤝' },
  { key: 'ecole',    label: 'École Française',    emoji: '🏫' },
  { key: 'others',   label: 'Other Projects',     emoji: '🏗️' },
]

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('partners')

  const photosByTab: Record<TabKey, Photo[]> = {
    partners: [...egImaraPartners, ...ambassadePhotos],
    ecole: ecolePhotos,
    others: otherProjects,
  }

  const allPhotos: Photo[] = [
    ...egImaraPartners,
    ...ambassadePhotos,
    ...ecolePhotos,
    ...otherProjects,
  ]

  const currentPhotos = photosByTab[activeTab]

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selected === null) return
      if (e.key === 'ArrowRight') setSelected((s) => (s! + 1) % allPhotos.length)
      if (e.key === 'ArrowLeft')  setSelected((s) => (s! - 1 + allPhotos.length) % allPhotos.length)
      if (e.key === 'Escape')     setSelected(null)
    },
    [selected, allPhotos.length]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  const openPhoto = (photo: Photo) => {
    const idx = allPhotos.findIndex((p) => p.src === photo.src)
    setSelected(idx !== -1 ? idx : null)
  }

  const navigate = (e: React.MouseEvent, dir: 1 | -1) => {
    e.stopPropagation()
    setSelected((s) => ((s ?? 0) + dir + allPhotos.length) % allPhotos.length)
  }

  return (
    <section className="py-20 bg-gray-50 scroll-mt-16" id="gallery">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-2 mb-4">
            Our Projects & Partnerships
          </h2>
          <p className="text-gray-600">
            Discover our strategic partnerships and key achievements in Rwanda.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TABS.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === key
                  ? 'bg-green-900 text-white shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-200'
              }`}
            >
              <span>{emoji}</span>
              <span>{label}</span>
              <span className={`text-xs rounded-full px-2 py-0.5 ${
                activeTab === key ? 'bg-white/20' : 'bg-gray-100 text-gray-500'
              }`}>
                {photosByTab[key].length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        {currentPhotos.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No photos in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPhotos.map((photo, idx) => (
              <button
                key={`${photo.src}-${idx}`}
                onClick={() => openPhoto(photo)}
                className="group relative aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                aria-label={`View ${photo.title}`}
              >
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-4xl">
                    📷
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold leading-tight">{photo.title}</p>
                    <p className="text-white/70 text-sm mt-0.5">{photo.category}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal / Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div
            className="relative bg-gray-900 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Counter */}
            <div className="absolute top-3 left-3 z-10 bg-black/50 text-white text-xs rounded-full px-3 py-1">
              {selected + 1} / {allPhotos.length}
            </div>

            {/* Image */}
            <div className="aspect-video bg-gray-800 relative">
              {allPhotos[selected]?.src ? (
                <Image
                  src={allPhotos[selected].src}
                  alt={allPhotos[selected].title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40 text-5xl">
                  📷
                </div>
              )}

              {/* Prev / Next arrows */}
              <button
                onClick={(e) => navigate(e, -1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={(e) => navigate(e, 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition"
                aria-label="Next photo"
              >
                ›
              </button>
            </div>

            {/* Caption */}
            <div className="p-4 text-center">
              <p className="text-white font-semibold">{allPhotos[selected]?.title}</p>
              <p className="text-sm text-gray-400 mt-1">{allPhotos[selected]?.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}