'use client'

import { Quote } from 'lucide-react'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/LanguageContext'

interface Testimonial {
  quote: string
  author: string
  role: string
}

function initialsOf(name: string): string {
  return name
    .split(/[\s-]+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const AVATAR_COLORS = ['bg-green-800', 'bg-teal', 'bg-amber-600']

export default function Testimonials() {
  const { t } = useLanguage()
  const items = t('Testimonials.items') as unknown as Testimonial[]

  return (
    <section className="py-24 bg-sand scroll-mt-16" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-amber-600 font-semibold text-xs uppercase italic tracking-[0.2em]">
            {t('Testimonials.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-3 tracking-tight">
            {t('Testimonials.title')}
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Reveal key={item.author} delay={index * 100} className="h-full">
            <figure className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 h-full">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`h-12 w-12 rounded-full ${AVATAR_COLORS[index % AVATAR_COLORS.length]} text-white flex items-center justify-center font-semibold text-sm shrink-0`}
                >
                  {initialsOf(item.author)}
                </div>
                <div>
                  <span className="font-semibold text-green-900 block leading-tight">{item.author}</span>
                  <span className="text-gray-500 text-sm">{item.role}</span>
                </div>
              </div>
              <Quote className="h-6 w-6 text-amber-500 mb-3" strokeWidth={1.5} aria-hidden="true" />
              <blockquote className="text-gray-600 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </figure>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
