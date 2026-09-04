'use client'

import { Quote } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

interface Testimonial {
  quote: string
  author: string
  role: string
}

export default function Testimonials() {
  const { t } = useLanguage()
  const items = t('Testimonials.items') as unknown as Testimonial[]

  return (
    <section className="py-24 bg-sand scroll-mt-16" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-amber-600 font-semibold text-xs uppercase tracking-[0.2em]">
            {t('Testimonials.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-3 tracking-tight">
            {t('Testimonials.title')}
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <figure key={item.author} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <Quote className="h-6 w-6 text-amber-500 mb-4" strokeWidth={1.5} aria-hidden="true" />
              <blockquote className="text-gray-600 leading-relaxed mb-5">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm">
                <span className="font-semibold text-green-900 block">{item.author}</span>
                <span className="text-gray-500">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}
