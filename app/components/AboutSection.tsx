
'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { founderPhoto } from '@/app/data/media'

// ─────────────────────────────────────────────
// Data - ADAPTED FROM PDF
// ─────────────────────────────────────────────

const EXPERTISE_AREAS = [
  { label: 'Building Construction',        icon: '🏗️' },
  { label: 'Re-building Construction',     icon: '🔨' },
  { label: 'Electrical & Plumbing',        icon: '⚡' },
  { label: 'Landscaping & External Works', icon: '🌿' },
  { label: 'Maintenance & Facility Mgmt',  icon: '🔧' },
]

const STATS = [
  { value: 20,   suffix: '+', label: 'Years of Experience' },
  { value: 2024, suffix: '',  label: 'Founded' },
  { value: 100,  suffix: '%', label: 'Client Satisfaction' },
]

const TIMELINE = [
  {
    year: '2024',
    title: 'Founded',
    body: 'ECOSTRUCT was founded in 2024 by Ndemeye Gaius, bringing over 20 years of international construction experience to Rwanda.',
  },
  {
    year: 'Now',
    title: 'Trusted Partner',
    body: 'We are trusted by international organizations, NGOs, and embassies, who have recognized our professionalism through official recommendation letters.',
  },
]

const TRUST_SIGNALS = [
  '✓ Experience with international institutions',
  '✓ Strong commitment to quality & safety',
  '✓ Environmentally responsible practices',
  '✓ Focus on human values & client satisfaction',
  '✓ Reliable & on-time delivery',
]

// ─────────────────────────────────────────────
// useCountUp hook
// ─────────────────────────────────────────────

function useCountUp(end: number, duration = 1600) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
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

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function StatCard({ value, suffix, label }: (typeof STATS)[number]) {
  const { count, ref } = useCountUp(value)
  return (
    <div className="flex flex-col items-center gap-1 bg-white/5 rounded-2xl px-6 py-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
      <p className="text-4xl md:text-5xl font-bold text-amber-400 tabular-nums">
        <span ref={ref}>{count}</span>{suffix}
      </p>
      <p className="mt-1 text-sm text-green-200 tracking-widest uppercase text-center">
        {label}
      </p>
    </div>
  )
}

function TimelineStep({
  year,
  title,
  body,
  index,
  total,
}: (typeof TIMELINE)[number] & { index: number; total: number }) {
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-md z-10">
          <span className="text-white text-xs font-bold leading-none text-center px-1">
            {year}
          </span>
        </div>
        {index < total - 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-amber-400/60 to-green-200/20 mt-1" />
        )}
      </div>
      <div className="pb-10">
        <h4 className="font-bold text-green-900 text-lg mb-1">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section
      className="py-24 bg-white scroll-mt-16"
      aria-label="About us"
      id="about"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">
            ECOSTRUCT – Your Trusted Partner in Rwanda
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Construction • Renovation • Electrical & Plumbing • Landscaping • Maintenance
          </p>
        </div>

        {/* Founder section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">

          <div className="flex flex-col gap-6">
            <figure className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-green-900/10">
              <Image
                src={founderPhoto}
                alt="ECOSTRUCT Rwanda — founded by Ndemeye Gaius in 2024"
                width={700}
                height={525}
                className="w-full h-auto object-cover"
                priority
              />
            </figure>

            <ul className="grid grid-cols-1 gap-2">
              {TRUST_SIGNALS.map(item => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-700 bg-green-50 rounded-lg px-3 py-2"
                >
                  <span className="text-amber-500 text-base">{item.substring(0, 2)}</span>
                  <span>{item.substring(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <div className="border-l-4 border-amber-400 pl-5">
              <h3 className="text-3xl font-bold text-green-900">Ndemeye Gaius</h3>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mt-1">
                Founder & CEO
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              <strong>ECOSTRUCT</strong> is a Rwandan company with proven expertise in construction, renovation, 
              and technical facility management. We are trusted by international organizations, NGOs, and embassies, 
              who have recognized our professionalism through official recommendation letters.
            </p>

            <div className="border-t border-gray-100" />

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
                Our Journey
              </h4>
              {TIMELINE.map((step, i) => (
                <TimelineStep
                  key={step.year}
                  {...step}
                  index={i}
                  total={TIMELINE.length}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Expertise cards */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">
              Our Services
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-green-900 mt-2">
              What We Do Best
            </h3>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {EXPERTISE_AREAS.map(({ label, icon }) => (
              <li
                key={label}
                className="group flex flex-col items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-5 text-center hover:bg-green-900 hover:border-green-900 hover:shadow-lg transition-all duration-300 cursor-default"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  {icon}
                </span>
                <span className="text-green-800 group-hover:text-white font-medium text-sm leading-snug transition-colors duration-300">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Impact banner */}
        <div className="rounded-3xl bg-green-900 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500" />

          <div className="px-8 py-14 md:px-16">
            <div className="text-center mb-12">
              <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">
                Our Commitment
              </p>
              <h3 className="text-white text-2xl md:text-3xl font-bold">
                We don't just build structures – we build trust and long-lasting partnerships.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {STATS.map(s => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            <div className="border-t border-white/10 pt-8 text-center">
              <blockquote className="text-green-100 text-lg md:text-xl font-medium italic max-w-2xl mx-auto leading-relaxed">
                "Building responsibly — respecting people, strengthening communities,
                and protecting our planet for future generations."
              </blockquote>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
