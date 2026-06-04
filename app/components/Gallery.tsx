// app/components/Gallery.tsx
'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { projectPhotos } from '@/app/data/media'

const ALL = 'All'

function getCategories(photos: typeof projectPhotos) {
  return [ALL, ...Array.from(new Set(photos.map(p => p.category)))]
}

function PhotoCard({
  photo,
  index,
  total,
  onClick,
}: {
  photo: (typeof projectPhotos)[number]
  index: number
  total: number
  onClick: () => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <button
      className="group relative aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 w-full"
      onClick={onClick}
      aria-label={`View ${photo.title}`}
    >
      {/* Image — falls back to placeholder if src missing or broken */}
      {photo.src && !imgError ? (
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200">
          <span className="text-4xl mb-2">📷</span>
          <span className="text-sm text-center px-4 font-medium text-gray-500">
            {photo.title}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-semibold text-sm leading-snug">{photo.title}</p>
          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/80 text-white">
            {photo.category}
          </span>
        </div>
      </div>

      {/* Index badge */}
      <div className="absolute top-2 right-2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {index + 1}/{total}
      </div>
    </button>
  )
}

function PhotoModal({
  photo,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  onDotClick,
}: {
  photo: (typeof projectPhotos)[number]
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onDotClick: (i: number) => void
}) {
  const [imgError, setImgError] = useState(false)

  // Reset imgError when photo changes
  useEffect(() => setImgError(false), [photo])

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.title}`}
    >
      {/* ESC hint */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/50 hover:text-white text-sm transition-colors"
        aria-label="Close"
      >
        ESC ✕
      </button>

      <div
        className="max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Image area */}
        <div className="aspect-video bg-gray-800 relative flex flex-col items-center justify-center">
          {photo.src && !imgError ? (
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              onError={() => setImgError(true)}
            />
          ) : (
            <>
              <span className="text-6xl mb-4">📷</span>
              <p className="text-white text-xl font-semibold text-center px-4">
                {photo.title}
              </p>
              <span className="mt-3 text-sm px-3 py-1 rounded-full bg-amber-500 text-white">
                {photo.category}
              </span>
            </>
          )}

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={onNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-900 flex justify-between items-center border-t border-gray-800">
          <p className="text-sm text-gray-400">
            {index + 1} / {total} • {photo.category}
          </p>

          {/* Dot indicators (max 12 to avoid overflow) */}
          {total <= 12 && (
            <div className="flex gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => onDotClick(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === index
                      ? 'bg-amber-400 w-4'
                      : 'bg-gray-600 hover:bg-gray-400 w-1.5'
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 rounded-lg font-semibold transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState(ALL)

  const categories = getCategories(projectPhotos)
  const filtered =
    activeCategory === ALL
      ? projectPhotos
      : projectPhotos.filter(p => p.category === activeCategory)

  const openModal = useCallback((index: number) => setSelectedPhoto(index), [])
  const closeModal = useCallback(() => setSelectedPhoto(null), [])

  const goNext = useCallback(() => {
    setSelectedPhoto(prev =>
      prev === null ? null : (prev + 1) % filtered.length
    )
  }, [filtered.length])

  const goPrev = useCallback(() => {
    setSelectedPhoto(prev =>
      prev === null ? null : (prev - 1 + filtered.length) % filtered.length
    )
  }, [filtered.length])

  // Keyboard navigation
  useEffect(() => {
    if (selectedPhoto === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedPhoto, closeModal, goNext, goPrev])

  return (
    <section className="py-20 bg-gray-50 scroll-mt-16" id="gallery">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-2 mb-4">
            Our Latest Projects
          </h2>
          <p className="text-gray-600">
            Discover our recent constructions and renovations in Rwanda, including
            the French School renovation project.
          </p>
        </div>

        {/* Category filter tabs — only shown when there are multiple categories */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setSelectedPhoto(null)
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-green-900 text-white border-green-900 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-green-900 hover:text-green-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Photo count */}
        <p className="text-center text-sm text-gray-400 mb-6">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          {activeCategory !== ALL ? ` in ${activeCategory}` : ''}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo, index) => (
            <PhotoCard
              key={`${photo.title}-${index}`}
              photo={photo}
              index={index}
              total={filtered.length}
              onClick={() => openModal(index)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm">
            Featured: Renovation of a French school in Rwanda — completed 2024
          </p>
        </div>
      </div>

      {/* Modal */}
      {selectedPhoto !== null && (
        <PhotoModal
          photo={filtered[selectedPhoto]}
          index={selectedPhoto}
          total={filtered.length}
          onClose={closeModal}
          onPrev={goPrev}
          onNext={goNext}
          onDotClick={setSelectedPhoto}
        />
      )}
    </section>
  )
}