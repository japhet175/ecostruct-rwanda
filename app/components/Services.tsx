'use client'

import type { LucideIcon } from 'lucide-react'
import { Building2, Hammer, Umbrella, Zap, Droplets, Shovel } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

interface ServiceCategory {
  title: string
  items: string[]
}

const ICONS: LucideIcon[] = [Building2, Hammer, Umbrella, Zap, Droplets, Shovel]

export default function Services() {
  const { t } = useLanguage()
  const categories = t('Services.categories') as unknown as ServiceCategory[]

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
                key={category.title}
                className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-green-50 text-green-800">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
