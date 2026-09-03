
'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback, useId } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Handshake, Building2, ImageOff, X } from 'lucide-react'
import { egImaraPartners, inProgressPhotos, otherProjects } from '@/app/data/media'
import { useLanguage } from '../i18n/LanguageContext'

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = 'partners' | 'others'

interface PhotoItem {
  src: string
  title: string
  category: string
}

interface IndexedPhoto extends PhotoItem {
  _globalIndex: number
}

// ─── Constantes module-level ─────────────────────────────────────────────────

const ALL_PHOTOS: IndexedPhoto[] = (
  [...egImaraPartners, ...inProgressPhotos, ...otherProjects] as PhotoItem[]
).map((p, i) => ({ ...p, _globalIndex: i }))

const SRC_TO_INDEX = new Map(ALL_PHOTOS.map((p) => [p.src, p._globalIndex]))

const toIndexed = (photos: PhotoItem[]): IndexedPhoto[] =>
  photos.map((p) => ({ ...p, _globalIndex: SRC_TO_INDEX.get(p.src) ?? -1 }))

const PHOTOS_BY_TAB: Record<TabKey, IndexedPhoto[]> = {
  partners: toIndexed([...egImaraPartners, ...inProgressPhotos]),
  others:   toIndexed(otherProjects),
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const isPartnerPhoto = (title: string) =>
  title.includes('EGB') || title.includes('IMARA')

// ─── Sous-composants badges ───────────────────────────────────────────────────

function PartnerBadge() {
  return (
    <div className="mt-2 inline-flex items-center bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
      ECOSTRUCT × EGB × IMARA
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function Gallery() {
  const { t } = useLanguage()

  const [selected, setSelected]   = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('partners')

  const touchStartX  = useRef<number | null>(null)
  const modalRef     = useRef<HTMLDivElement>(null)
  const modalTitleId = useId()

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const TABS: { key: TabKey; label: string; icon: LucideIcon }[] = [
    { key: 'partners', label: t('Gallery.tabPartners'), icon: Handshake },
    { key: 'others',   label: t('Gallery.tabOthers'),   icon: Building2 },
  ]

  const currentPhotos = PHOTOS_BY_TAB[activeTab]

  // ── Scroll lock ───────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  // ── Focus on modal open ───────────────────────────────────────────────────
  useEffect(() => {
    if (selected !== null) {
      const id = setTimeout(() => {
        modalRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()
      }, 50)
      return () => clearTimeout(id)
    }
  }, [selected])

  // ── Navigation ────────────────────────────────────────────────────────────
  const navigate = useCallback((delta: number) => {
    setSelected((s) =>
      s !== null
        ? Math.max(0, Math.min(ALL_PHOTOS.length - 1, s + delta))
        : null
    )
  }, [])

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    if (selected === null) return
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     setSelected(null)
      if (e.key === 'ArrowRight') navigate(+1)
      if (e.key === 'ArrowLeft')  navigate(-1)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [selected, navigate])

  // ── Swipe ─────────────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) navigate(delta > 0 ? +1 : -1)
    touchStartX.current = null
  }

  // ── Focus trap ────────────────────────────────────────────────────────────
  const onModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !modalRef.current) return
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus() }
    }
  }

  const openPhoto = (globalIndex: number) => {
    if (globalIndex >= 0 && globalIndex < ALL_PHOTOS.length) {
      setSelected(globalIndex)
    }
  }

  return (
    <section
      className="py-24 bg-gray-50 scroll-mt-16"
      id="gallery"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-600 font-semibold text-xs uppercase tracking-[0.2em]">{t('Gallery.badge')}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-3 mb-4 tracking-tight">
            {t('Gallery.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('Gallery.subtitle')}
          </p>
        </div>

        {ALL_PHOTOS.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('Gallery.empty')}</p>
          </div>
        )}

        {ALL_PHOTOS.length > 0 && (
          <>
        {/* Tabs */}
        <div
          role="tablist"
          aria-label={t('Gallery.tabListLabel')}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              role="tab"
              id={`tab-${key}`}
              aria-selected={activeTab === key}
              aria-controls={`tabpanel-${key}`}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2.5 rounded-md text-sm font-semibold transition-colors duration-200
                flex items-center gap-2
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700
                ${activeTab === key
                  ? 'bg-green-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
                }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {label}
              <span className={`ml-1 text-xs rounded-full px-2 py-0.5 ${
                activeTab === key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {PHOTOS_BY_TAB[key].length}
              </span>
            </button>
          ))}
        </div>

        {/* Partnership banner */}
        {activeTab === 'partners' && (
          <div className="mb-12 rounded-lg bg-gray-50 border border-gray-200 p-5 text-center">
            <p className="text-green-900 text-base md:text-lg font-medium">
              {t('Gallery.partnershipBanner')}
            </p>
          </div>
        )}

        {/* Gallery grid */}
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentPhotos.map((photo, idx) => {
            return (
              <button
                key={`${photo.src}-${idx}`}
                type="button"
                onClick={() => openPhoto(photo._globalIndex)}
                aria-label={`${t('Gallery.viewPhoto')} ${photo.title}`}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm text-left w-full
                  hover:shadow-md transition-shadow duration-300
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {photo.src ? (
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50"
                      aria-label={t('Gallery.noImage')}
                    >
                      <ImageOff className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {photo.category}
                  </div>
                </div>

                {/* Title & badge */}
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-semibold text-green-900 leading-tight mb-1">
                    {photo.title}
                  </h3>
                  {isPartnerPhoto(photo.title) ? (
                    <PartnerBadge />
                  ) : photo.src.includes('ambassade-france-project') ? (
                    <div className="mt-2 inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                      ECOSTRUCT
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">{photo.category}</p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selected !== null && selected >= 0 && selected < ALL_PHOTOS.length && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          style={prefersReducedMotion ? undefined : { animation: 'gallery-fade-in 0.2s ease-out' }}
          onClick={() => setSelected(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={modalRef}
            className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative"
            style={prefersReducedMotion ? undefined : { animation: 'gallery-scale-in 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onModalKeyDown}
          >
            <button
              type="button"
              aria-label={t('Gallery.prevImage')}
              onClick={(e) => { e.stopPropagation(); navigate(-1) }}
              disabled={selected === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed
                text-white rounded-full p-3 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ←
            </button>

            <button
              type="button"
              aria-label={t('Gallery.nextImage')}
              onClick={(e) => { e.stopPropagation(); navigate(+1) }}
              disabled={selected === ALL_PHOTOS.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed
                text-white rounded-full p-3 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              →
            </button>

            <div className="relative aspect-video">
              <Image
                src={ALL_PHOTOS[selected].src}
                alt={ALL_PHOTOS[selected].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="p-6 text-center">
              <h3 id={modalTitleId} className="text-xl font-bold text-white mb-1">
                {ALL_PHOTOS[selected].title}
              </h3>
              <p className="text-amber-400 text-sm">
                {ALL_PHOTOS[selected].category}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {selected + 1} / {ALL_PHOTOS.length}
              </p>
              <button
                type="button"
                data-autofocus
                onClick={() => setSelected(null)}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md text-sm transition
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {t('Gallery.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
