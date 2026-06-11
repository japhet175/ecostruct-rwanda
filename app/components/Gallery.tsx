'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useMemo, useCallback, useId } from 'react'
import { egImaraPartners, inProgressPhotos, ecolePhotos, otherProjects } from '@/app/data/media'
import { useLanguage } from '../i18n/LanguageContext'

type TabKey = 'partners' | 'ecole' | 'others'

interface PhotoItem {
  src: string
  title: string
  category: string
}

interface IndexedPhoto extends PhotoItem {
  _globalIndex: number
}

export default function Gallery() {
  const { t, language } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('partners')
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const touchStartX = useRef<number | null>(null)
  const modalTitleId = useId()

  const TABS: { key: TabKey; label: string; emoji: string }[] = [
    { key: 'partners', label: t('Gallery.tabPartners'), emoji: '🤝' },
    { key: 'ecole', label: t('Gallery.tabEcole'), emoji: '🏫' },
    { key: 'others', label: t('Gallery.tabOthers'), emoji: '🏗️' },
  ]

  const allPhotos = useMemo<IndexedPhoto[]>(() =>
    ([...egImaraPartners, ...inProgressPhotos, ...ecolePhotos, ...otherProjects] as PhotoItem[])
      .map((p, i) => ({ ...p, _globalIndex: i })),
  [])

  const photosByTab = useMemo<Record<TabKey, IndexedPhoto[]>>(() => {
    const byTab: Record<string, PhotoItem[]> = {
      partners: [...egImaraPartners, ...inProgressPhotos],
      ecole: ecolePhotos,
      others: otherProjects,
    }
    const srcToIndex = new Map(allPhotos.map((p) => [p.src, p._globalIndex]))
    return Object.fromEntries(
      Object.entries(byTab).map(([key, photos]) => [
        key,
        (photos as PhotoItem[]).map((p) => ({
          ...p,
          _globalIndex: srcToIndex.get(p.src) ?? -1,
        })),
      ])
    ) as Record<TabKey, IndexedPhoto[]>
  }, [allPhotos])

  const currentPhotos = photosByTab[activeTab]

  useEffect(() => {
    setVisibleCards(new Set())
    cardRefs.current = []
  }, [activeTab])

  useEffect(() => {
    const id = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
            if (entry.isIntersecting && index !== -1) {
              setVisibleCards((prev) => new Set([...prev, index]))
            }
          })
        },
        { threshold: 0.15, rootMargin: '40px' }
      )
      cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref) })
      return () => observer.disconnect()
    }, 0)
    return () => clearTimeout(id)
  }, [activeTab])

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  const navigate = useCallback((delta: number) => {
    setSelected((s) => s !== null
      ? Math.max(0, Math.min(allPhotos.length - 1, s + delta))
      : null
    )
  }, [allPhotos.length])

  useEffect(() => {
    if (selected === null) return
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowRight') navigate(+1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [selected, navigate])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) navigate(delta > 0 ? +1 : -1)
    touchStartX.current = null
  }

  const partnershipBannerText = language === 'en'
    ? `ECOSTRUCT is proud to collaborate with EGB and IMARA Property on strategic construction projects.`
    : `ECOSTRUCT est fier de collaborer avec EGB et IMARA Property sur des projets de construction stratégiques.`

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white scroll-mt-16" id="gallery">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" aria-hidden="true" />
            {t('Gallery.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-3 mb-4">
            {t('Gallery.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('Gallery.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {TABS.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              aria-pressed={activeTab === key}
              className={`px-6 py-3 rounded-full text-base font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg ${
                activeTab === key
                  ? 'bg-green-800 text-white scale-105 shadow-xl'
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
              }`}
            >
              <span className="text-xl" aria-hidden="true">{emoji}</span>
              {label}
              <span className={`ml-1 text-xs rounded-full px-2 py-0.5 ${
                activeTab === key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {photosByTab[key].length}
              </span>
            </button>
          ))}
        </div>

        {activeTab === 'partners' && (
          <div className="relative overflow-hidden mb-12 rounded-2xl bg-gradient-to-r from-amber-50 to-green-50 border border-amber-200 shadow-md">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden="true" />
            <div className="relative p-5 text-center">
              <p className="text-green-800 text-base md:text-lg font-semibold flex flex-wrap items-center justify-center gap-2">
                <span className="text-3xl" aria-hidden="true">🤝</span>
                <span>{partnershipBannerText}</span>
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPhotos.map((photo, idx) => (
            <div
              key={`${photo.src}-${idx}`}
              ref={(el) => { cardRefs.current[idx] = el }}
              onClick={() => setSelected(photo._globalIndex)}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(photo._globalIndex)}
              role="button"
              tabIndex={0}
              aria-label={`View ${photo.title}`}
              className={`group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg
                hover:shadow-2xl transition-all duration-500 hover:-translate-y-2
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700
                ${visibleCards.has(idx) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-5xl bg-gray-50" aria-label="No image available">
                    📷
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {photo.category}
                </div>
              </div>

              <div className="p-5 bg-white">
                <h3 className="text-lg font-bold text-green-800 leading-tight mb-1">{photo.title}</h3>
                {photo.title.includes('EGB') || photo.title.includes('IMARA') ? (
                  <div className="mt-2 inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                    <span aria-hidden="true">🤝</span> ECOSTRUCT × EGB × IMARA
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">{photo.category}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          style={{ animation: 'gallery-fade-in 0.2s ease-out' }}
          onClick={() => setSelected(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative"
            style={{ animation: 'gallery-scale-in 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
              disabled={selected === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white rounded-full p-3 transition focus-visible:ring-2 focus-visible:ring-white"
            >
              ←
            </button>
            <button
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); navigate(+1) }}
              disabled={selected === allPhotos.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white rounded-full p-3 transition focus-visible:ring-2 focus-visible:ring-white"
            >
              →
            </button>
            <div className="relative aspect-video">
              <Image
                src={allPhotos[selected].src}
                alt={allPhotos[selected].title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="p-6 text-center">
              <h3 id={modalTitleId} className="text-xl font-bold text-white mb-1">
                {allPhotos[selected].title}
              </h3>
              <p className="text-amber-400 text-sm">{allPhotos[selected].category}</p>
              <p className="text-gray-500 text-xs mt-1">{selected + 1} / {allPhotos.length}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition focus-visible:ring-2 focus-visible:ring-white"
              >
                {t('Gallery.close')} ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}