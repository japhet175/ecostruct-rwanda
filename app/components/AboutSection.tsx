'use client'

import Image from 'next/image'
import { founderPhoto } from '@/app/data/media'
import { useLanguage } from '../i18n/LanguageContext'

interface WhyItem {
  title: string
  desc: string
}

export default function AboutSection() {
  const { t } = useLanguage()

  const whyItems = t('About.whyItems') as unknown as WhyItem[]

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
          {/* Photo */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <Image
                src={founderPhoto}
                alt="Gaius Ndemeye"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Paragraphs */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-gray-600 leading-relaxed">{t('About.p1')}</p>
            <p className="text-gray-600 leading-relaxed">{t('About.p2')}</p>
            <p className="text-gray-600 leading-relaxed">{t('About.p3')}</p>
          </div>
        </div>

        {/* Choose ECO-STRUCT */}
        <div className="mt-20" id="why">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-green-900 tracking-tight">
              {t('About.whyTitle')}
            </h3>
            <p className="text-gray-600 text-lg mt-4 leading-relaxed">
              {t('About.whySubtitle')}
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {whyItems.map((item) => (
              <div key={item.title} className="bg-green-50 border border-green-100 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Commitment */}
          <div className="max-w-3xl mx-auto text-center rounded-lg bg-green-900 px-8 py-10">
            <p className="text-amber-400 font-semibold text-xs uppercase tracking-[0.2em] mb-3">
              {t('About.whyCommitmentTitle')}
            </p>
            <p className="text-white text-xl md:text-2xl font-bold leading-snug">
              {t('About.whyCommitment')}
            </p>
          </div>

          <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
            {t('About.whyClosing')}
          </p>
        </div>

      </div>
    </section>
  )
}
