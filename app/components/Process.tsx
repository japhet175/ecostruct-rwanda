'use client'

import type { LucideIcon } from 'lucide-react'
import { Search, PenTool, HardHat, Key } from 'lucide-react'
import Reveal from './Reveal'
import { useLanguage } from '../i18n/LanguageContext'

const ICONS: LucideIcon[] = [Search, PenTool, HardHat, Key]

export default function Process() {
  const { t } = useLanguage()

  const steps = [
    { title: t('Process.step1Title'), desc: t('Process.step1Desc') },
    { title: t('Process.step2Title'), desc: t('Process.step2Desc') },
    { title: t('Process.step3Title'), desc: t('Process.step3Desc') },
    { title: t('Process.step4Title'), desc: t('Process.step4Desc') },
  ]

  return (
    <section className="py-24 bg-white scroll-mt-16" id="process">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-600 font-semibold text-xs uppercase italic tracking-[0.2em]">
            {t('Process.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-3 mb-4 tracking-tight">
            {t('Process.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('Process.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = ICONS[index] ?? Search
            return (
              <Reveal key={step.title} delay={index * 100} className="h-full">
              <div className="relative bg-gray-50 border border-gray-100 rounded-lg p-6 h-full">
                <span className="absolute top-4 right-5 text-5xl font-extrabold text-green-900/10 leading-none" aria-hidden="true">
                  {index + 1}
                </span>
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-md bg-green-50 text-green-800">
                  <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
              </Reveal>
            )
          })}
        </div>

      </div>
    </section>
  )
}
