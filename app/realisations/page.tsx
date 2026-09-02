'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { School, Landmark, Hotel, Home, Building2, Building, Handshake } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

interface Project {
  title: string
  status: string
  description: string
  bullets: string[]
  tags: string[]
}

const PROJECT_IMAGES: (string | null)[] = [
  '/images/projects/ecole-francaise-1.jpg',
  '/images/projects/ambassade-france-project.jpeg',
  null,
  null,
  '/images/projects/isango-phase-3.avif',
  '/images/projects/one-residence.avif',
]

const PROJECT_ICONS: LucideIcon[] = [School, Landmark, Hotel, Home, Building2, Building]

export default function RealisationsPage() {
  const { t } = useLanguage()
  const projects = t('Realisations.projects') as unknown as Project[]

  const stats = [
    { value: `${projects.length}+`, label: t('Realisations.projectsCount') },
    { value: '20+', label: t('Realisations.yearsExperience') },
    { value: '100%', label: t('Realisations.clientSatisfaction') },
  ]

  return (
    <main className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        <header className="text-center mb-16">
          <span className="text-amber-600 font-semibold text-xs uppercase tracking-[0.2em]">
            {t('Realisations.badge')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mt-3 mb-4 leading-tight tracking-tight">
            {t('Realisations.title')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('Realisations.subtitle')}
          </p>
        </header>

        <div className="text-center mb-12 p-5 bg-green-50 rounded-lg border border-green-100">
          <p className="text-green-800 font-medium inline-flex items-center justify-center gap-2">
            <Handshake className="h-5 w-5 text-amber-600 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            {t('Realisations.partnerText')}
          </p>
          <Link
            href="/#gallery"
            className="inline-block mt-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
          >
            {t('Realisations.exploreGallery')} →
          </Link>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => {
            const Icon = PROJECT_ICONS[index] ?? Building2
            const image = PROJECT_IMAGES[index]
            return (
              <article
                key={project.title}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                <div className="md:flex">
                  {image && (
                    <div className="md:w-1/2 relative h-72 md:h-auto bg-gray-50 flex-shrink-0">
                      <Image
                        src={image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className={`p-8 flex flex-col justify-center ${image ? 'md:w-1/2' : 'w-full'}`}>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-green-50 text-green-700">
                        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <h2 className="text-2xl font-semibold text-green-900">{project.title}</h2>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-5">{project.description}</p>

                    {project.bullets.length > 0 && (
                      <ul className="space-y-1.5 mb-5">
                        {project.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-green-50 rounded-lg py-6 px-4">
              <div className="text-3xl font-extrabold text-green-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-500 text-sm">{t('Realisations.ctaText')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200"
            >
              {t('Realisations.getInTouch')} →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-700 hover:text-amber-600 font-medium transition-colors duration-200"
            >
              ← {t('Realisations.backToHome')}
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
