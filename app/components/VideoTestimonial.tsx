'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function VideoTestimonial() {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlaying = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
    }
    const onLoadedMetadata = () => setDuration(video.duration)
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      if (video.duration) setProgress(video.currentTime / video.duration)
    }

    video.addEventListener('playing', onPlaying)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('timeupdate', onTimeUpdate)

    video.play().catch(() => setVideoError(true))

    return () => {
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.paused ? video.play().catch(() => setVideoError(true)) : video.pause()
  }, [])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }, [])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    video.currentTime = ratio * video.duration
  }, [])

  const fmt = (s: number) => {
    if (isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-white scroll-mt-16" id="testimonial">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            {t('VideoTestimonial.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mt-3 mb-4">
            {t('VideoTestimonial.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('VideoTestimonial.subtitle')}
          </p>
        </div>

        {/* Video Player */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-black ring-1 ring-black/10">
            <div className="relative cursor-pointer" onClick={togglePlay}>
              <video
                ref={videoRef}
                src="/videos/Testimony.mp4"
                className="w-full h-auto"
                muted
                playsInline
                preload="auto"
                onError={() => setVideoError(true)}
              />

              {videoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-3">
                  <span className="text-5xl">🎬</span>
                  <p className="text-white font-medium">{t('VideoTestimonial.unavailable')}</p>
                </div>
              )}

              {!videoError && (
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                }`}>
                  <div className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110">
                    {isPlaying ? (
                      <svg className="w-6 h-6 text-green-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-green-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Controls bar */}
            {!videoError && (
              <div className="bg-gray-950 px-4 py-3 flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? t('VideoTestimonial.pause') : t('VideoTestimonial.play')}
                  className="text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                <div
                  className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer group relative"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-amber-400 rounded-full relative"
                    style={{ width: `${progress * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <span className="text-white/50 text-xs tabular-nums flex-shrink-0">
                  {fmt(currentTime)} / {fmt(duration)}
                </span>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? t('VideoTestimonial.unmute') : t('VideoTestimonial.mute')}
                  className="text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  {isMuted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Partnership message */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-5">
              <span className="text-green-800 text-sm font-medium">
                {t('VideoTestimonial.partnerBadge')}
              </span>
            </div>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              <span className="font-semibold text-green-800">{t('VideoTestimonial.partnerName')}</span>{' '}
              {t('VideoTestimonial.message1')}{' '}
              <span className="font-medium">{t('VideoTestimonial.message2')}</span>{' '}
              {t('VideoTestimonial.message3')}{' '}
              <span className="italic">{t('VideoTestimonial.message4')}</span>.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}