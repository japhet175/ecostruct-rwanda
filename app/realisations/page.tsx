

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../i18n/LanguageContext'

export default function RealisationsPage() {
  const { t, language } = useLanguage()

  const getTag = (tag: string) => {
    const tags: Record<string, string> = {
      Renovation: t('Realisations.tagRenovation'),
      Education: t('Realisations.tagEducation'),
      Kigali: 'Kigali',
      Construction: t('Realisations.tagConstruction'),
      NewBuild: t('Realisations.tagNewBuild'),
      Rwanda: 'Rwanda',
    }
    return tags[tag] || tag
  }

  const projects = [
    {
      id: 1,
      emoji: '🎓',
      titleKey: 'ecoleTitle',
      statusLabelKey: 'completedLabel',
      statusClass: 'bg-green-100 text-green-700',
      descriptionKey: 'ecoleDesc',
      image: null,
      tagsKeys: ['Renovation', 'Education', 'Kigali'],
    },
    {
      id: 2,
      emoji: '🚧',
      titleKey: 'currentTitle',
      statusLabelKey: 'currentLabel',
      statusClass: 'bg-amber-100 text-amber-700',
      descriptionKey: 'currentDesc',
      image: '/images/projects/In progress.jpeg',
      tagsKeys: ['Construction', 'NewBuild', 'Rwanda'],
    },
  ]

  const stats = [
    { value: '10+', labelKey: 'projectsCount' },
    { value: '20+', labelKey: 'yearsExperience' },
    { value: '100%', labelKey: 'clientSatisfaction' },
  ]

  return (
    <main className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        <header className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-3">
            {t('Realisations.badge')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 leading-tight">
            {t('Realisations.title')}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t('Realisations.subtitle')}
          </p>
        </header>

        <div className="text-center mb-12 p-5 bg-green-50 rounded-xl border border-green-100 shadow-sm">
          <p className="text-green-800 font-medium">
            🤝 {t('Realisations.partnerText')}
          </p>
          <Link
            href="/#gallery"
            className="inline-block mt-2 text-amber-600 hover:text-amber-700 font-semibold underline transition"
          >
            {t('Realisations.exploreGallery')} →
          </Link>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className={`md:flex ${project.image ? '' : ''}`}>
                {project.image && (
                  <div className="md:w-1/2 relative h-72 md:h-auto bg-gray-50 flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={`Photo of ${t(`Realisations.${project.titleKey}`)}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className={`p-8 flex flex-col justify-center ${project.image ? 'md:w-1/2' : 'w-full'}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-3xl" role="img" aria-label={t(`Realisations.${project.titleKey}`)}>
                      {project.emoji}
                    </span>
                    <h2 className="text-2xl font-bold text-green-800">
                      {t(`Realisations.${project.titleKey}`)}
                    </h2>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${project.statusClass}`}>
                      {t(`Realisations.${project.statusLabelKey}`)}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-5">
                    {t(`Realisations.${project.descriptionKey}`)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tagsKeys.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">
                        {getTag(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 text-center">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="bg-green-50 rounded-xl py-6 px-4">
              <div className="text-3xl font-extrabold text-green-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{t(`Realisations.${stat.labelKey}`)}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-500 text-sm">{t('Realisations.ctaText')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200"
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