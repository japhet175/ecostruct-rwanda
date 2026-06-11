'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { founderPhoto } from '@/app/data/media'
import { useLanguage } from '../i18n/LanguageContext'

function useCountUp(end: number, duration = 1600) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return
        hasAnimated.current = true
        observer.disconnect()

        const start = performance.now()
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.round(eased * end))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return { count, ref }
}

function StatCard({ value, suffix, labelKey }: { value: number; suffix: string; labelKey: string }) {
  const { t } = useLanguage()
  const { count, ref } = useCountUp(value)
  return (
    <div className="flex flex-col items-center gap-1 bg-white/5 rounded-2xl px-6 py-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
      <p className="text-4xl md:text-5xl font-bold text-amber-400 tabular-nums">
        <span ref={ref}>{count}</span>{suffix}
      </p>
      <p className="mt-1 text-sm text-green-200 tracking-widest uppercase text-center">
        {t(`About.${labelKey}`)}
      </p>
    </div>
  )
}

function TimelineStep({
  yearKey,
  titleKey,
  bodyKey,
  index,
  total,
}: {
  yearKey: string
  titleKey: string
  bodyKey: string
  index: number
  total: number
}) {
  const { t } = useLanguage()
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-md z-10">
          <span className="text-white text-xs font-bold leading-none text-center px-1">
            {t(`About.${yearKey}`)}
          </span>
        </div>
        {index < total - 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-amber-400/60 to-green-200/20 mt-1" />
        )}
      </div>
      <div className="pb-10">
        <h4 className="font-bold text-green-900 text-lg mb-1">{t(`About.${titleKey}`)}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{t(`About.${bodyKey}`)}</p>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const { t } = useLanguage()

  const expertiseAreas = [
    { key: 'buildingConstruction', icon: '🏗️' },
    { key: 'reBuildingConstruction', icon: '🔨' },
    { key: 'electricalPlumbing', icon: '⚡' },
    { key: 'landscaping', icon: '🌿' },
    { key: 'maintenance', icon: '🔧' },
  ]

  const trustSignalsKeys = [
    'internationalExperience',
    'qualitySafety',
    'environmentalPractices',
    'humanValues',
    'reliableDelivery',
  ]

  const timelineSteps = [
    { yearKey: 'timelineYear1', titleKey: 'timelineTitle1', bodyKey: 'timelineBody1' },
    { yearKey: 'timelineYear2', titleKey: 'timelineTitle2', bodyKey: 'timelineBody2' },
    { yearKey: 'timelineYear3', titleKey: 'timelineTitle3', bodyKey: 'timelineBody3' },
  ]

  const stats = [
    { value: 20, suffix: '+', labelKey: 'yearsExperience' },
    { value: 2024, suffix: '', labelKey: 'founded' },
    { value: 100, suffix: '%', labelKey: 'clientSatisfaction' },
  ]

  return (
    <section className="py-24 bg-white scroll-mt-16" aria-labelledby="about-heading" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            {t('About.whoWeAre')}
          </span>
          <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">
            {t('About.title')}
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            {t('About.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-green-900/10">
              <Image
                src={founderPhoto}
                alt="Ndemeye Gaius, Founder & CEO of ECOSTRUCT Rwanda"
                width={700}
                height={525}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <ul className="grid grid-cols-1 gap-2" aria-label="Why choose ECOSTRUCT">
              {trustSignalsKeys.map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-gray-700 bg-green-50 rounded-lg px-3 py-2">
                  <span className="text-amber-500 text-base shrink-0" aria-hidden="true">✓</span>
                  <span>{t(`About.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <div className="border-l-4 border-amber-400 pl-5">
              <h3 className="text-3xl font-bold text-green-900">{t('About.founderName')}</h3>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mt-1">
                {t('About.founderRole')}
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {t('About.description')}
            </p>
            <div className="border-t border-gray-100" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
                {t('About.journey')}
              </h4>
              {timelineSteps.map((step, i) => (
                <TimelineStep
                  key={step.yearKey}
                  yearKey={step.yearKey}
                  titleKey={step.titleKey}
                  bodyKey={step.bodyKey}
                  index={i}
                  total={timelineSteps.length}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">
              {t('About.inAction')}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-green-900 mt-2">
              {t('About.teamAtWork')}
            </h3>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              {t('About.teamAtWorkDesc')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video group">
              <Image
                src="/images/equipe/Construction-worker.png"
                alt="Engineer supervising construction on site"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4" aria-hidden="true">
                <p className="text-white font-medium">{t('About.onSiteSupervision')}</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video group">
              <Image
                src="/images/equipe/worker.jpeg"
                alt="Team reviewing construction plans"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4" aria-hidden="true">
                <p className="text-white font-medium">{t('About.precisionPlanning')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">
              {t('About.ourServices')}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-green-900 mt-2">
              {t('About.whatWeDoBest')}
            </h3>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {expertiseAreas.map(({ key, icon }) => (
              <li
                key={key}
                className="group flex flex-col items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-5 text-center hover:bg-green-900 hover:border-green-900 hover:shadow-lg transition-all duration-300 cursor-default"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block" aria-hidden="true">
                  {icon}
                </span>
                <span className="text-green-800 group-hover:text-white font-medium text-sm leading-snug transition-colors duration-300">
                  {t(`About.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl bg-green-900 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />
          <div className="px-8 py-14 md:px-16">
            <div className="text-center mb-12">
              <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">
                {t('About.ourCommitment')}
              </p>
              <h3 className="text-white text-2xl md:text-3xl font-bold">
                {t('About.commitmentQuote')}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {stats.map((stat) => (
                <StatCard key={stat.labelKey} value={stat.value} suffix={stat.suffix} labelKey={stat.labelKey} />
              ))}
            </div>
            <div className="border-t border-white/10 pt-8 text-center">
              <figure>
                <blockquote className="text-green-100 text-lg md:text-xl font-medium italic max-w-2xl mx-auto leading-relaxed">
                  {t('About.footerQuote')}
                </blockquote>
                <figcaption className="mt-3 text-green-400 text-sm">
                  — Ndemeye Gaius, {t('About.founderRole')}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}