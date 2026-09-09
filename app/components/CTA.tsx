'use client'

import Link from 'next/link'
import { useLanguage } from '../i18n/LanguageContext'

export default function CTA() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          {t('CTA.title')}
        </h2>
        <p className="text-green-100 text-lg mt-4 max-w-xl mx-auto">
          {t('CTA.subtitle')}
        </p>
        <Link
          href="/#contact"
          className="mt-8 inline-flex bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-8 py-3 rounded-md transition-colors duration-200"
        >
          {t('Hero.freeQuote')}
        </Link>
      </div>
    </section>
  )
}
