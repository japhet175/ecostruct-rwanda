'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { founderPhoto } from '@/app/data/media'
import { useLanguage } from '../i18n/LanguageContext'

export default function AboutSection() {
  const { t } = useLanguage()

  const whyKeys = ['why1', 'why2', 'why3', 'why4', 'why5', 'why6']

  return (
    <section className="py-24 bg-white scroll-mt-16" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-600 font-semibold text-xs uppercase tracking-[0.2em]">
            {t('About.whoWeAre')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-3 tracking-tight">
            {t('About.title')}
          </h2>
        </div>

        {/* About content */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Photo & founder */}
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden shadow-md ring-1 ring-green-900/10">
              <Image
                src={founderPhoto}
                alt={t('About.founderName')}
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="mt-5 border-l-4 border-amber-400 pl-4">
              <h3 className="text-xl font-bold text-green-900">{t('About.founderName')}</h3>
              <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mt-1">
                {t('About.founderRole')}
              </p>
            </div>
          </div>

          {/* Paragraphs */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-gray-600 leading-relaxed">{t('About.p1')}</p>
            <p className="text-gray-600 leading-relaxed">{t('About.p2')}</p>
            <p className="text-gray-600 leading-relaxed">{t('About.p3')}</p>
          </div>
        </div>

        {/* Why ECO-STRUCT */}
        <div className="mt-20" id="why">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-green-900 tracking-tight">
              {t('About.whyTitle')}
            </h3>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyKeys.map((key) => (
              <li key={key} className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-lg p-4">
                <Check className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                <span className="text-gray-700 text-sm">{t(`About.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
