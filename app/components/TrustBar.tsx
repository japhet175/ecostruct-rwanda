'use client'

import { useLanguage } from '../i18n/LanguageContext'

const CLIENTS = [
  'École Française de Kigali',
  'French Embassy',
  'EGB & IMARA',
  'Galaxy Hotel',
  'ISANGE',
  'One Residence',
]

export default function TrustBar() {
  const { t } = useLanguage()

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase italic tracking-[0.2em] text-gray-400 mb-8">
          {t('TrustBar.title')}
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {CLIENTS.map((client) => (
            <span key={client} className="text-gray-400 font-semibold text-sm md:text-base whitespace-nowrap">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
