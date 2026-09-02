'use client'

import type { LucideIcon } from 'lucide-react'
import { Award, ShieldCheck, Clock, HeartHandshake } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

interface CommitmentValue {
  icon: LucideIcon
  titleKey: string
  descKey: string
}

export default function Commitment() {
  const { t } = useLanguage()

  const values: CommitmentValue[] = [
    { icon: Award, titleKey: 'qualityTitle', descKey: 'qualityDesc' },
    { icon: ShieldCheck, titleKey: 'safetyTitle', descKey: 'safetyDesc' },
    { icon: Clock, titleKey: 'deadlinesTitle', descKey: 'deadlinesDesc' },
    { icon: HeartHandshake, titleKey: 'satisfactionTitle', descKey: 'satisfactionDesc' },
  ]

  return (
    <section className="py-20 bg-white scroll-mt-16" id="commitment">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-600 font-semibold text-xs uppercase tracking-[0.2em]">
            {t('Commitment.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-3 mb-4 tracking-tight">
            {t('Commitment.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('Commitment.subtitle')}
          </p>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="bg-gray-50 border border-gray-100 rounded-lg p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-green-50 text-green-800">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">{t(`Commitment.${titleKey}`)}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t(`Commitment.${descKey}`)}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
