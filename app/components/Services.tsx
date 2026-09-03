'use client'

import type { LucideIcon } from 'lucide-react'
import { Building2, Hammer, Umbrella, Zap, Droplets, Shovel, Compass } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const ICONS: LucideIcon[] = [Building2, Hammer, Umbrella, Zap, Droplets, Shovel, Compass]

export default function Services() {
  const { t } = useLanguage()
  const categories = t('Services.categories') as unknown as string[]

  return (
    <section className="py-20 bg-gray-50 scroll-mt-16" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-600 font-semibold text-xs uppercase tracking-[0.2em]">
            {t('Services.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-3 mb-4 tracking-tight">
            {t('Services.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('Services.subtitle')}
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = ICONS[index] ?? Building2
            return (
              <div
                key={category}
                className="group bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-green-50 text-green-800 group-hover:bg-green-800 group-hover:text-white transition-colors duration-300">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-green-900">
                  {category}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
