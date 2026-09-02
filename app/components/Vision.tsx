'use client'

import { useLanguage } from '../i18n/LanguageContext'

export default function Vision() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-green-900 scroll-mt-16" id="vision">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <span className="text-amber-400 font-semibold text-xs uppercase tracking-[0.2em]">
          {t('Vision.badge')}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6 tracking-tight">
          {t('Vision.title')}
        </h2>
        <p className="text-green-100 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
          {t('Vision.text')}
        </p>
      </div>
    </section>
  )
}
