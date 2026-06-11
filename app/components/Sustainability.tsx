'use client'

import { useLanguage } from '../i18n/LanguageContext'

export default function Sustainability() {
  const { t } = useLanguage()

  const objectivesKeys = [
    'sustainableMethods',
    'environmentalProtection',
    'recyclingMaterials',
    'localMaterials',
    'wasteReduction',
    'resourceManagement'
  ]

  const commitmentsKeys = [
    { icon: '♻️', key: 'recycling' },
    { icon: '🌱', key: 'localMaterials' },
    { icon: '🏗️', key: 'smarterConstruction' },
    { icon: '🌍', key: 'buildingForFuture' }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-white scroll-mt-16" id="sustainability">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            {t('Sustainability.whyChoose')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mt-3 mb-4">
            <span className="text-amber-600">{t('Sustainability.sustainableTitle')}</span> {t('Sustainability.forTomorrow')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('Sustainability.description')}
          </p>
        </div>

        {/* Vision statement */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="bg-green-800 rounded-2xl p-8 text-white">
            <p className="text-xl md:text-2xl font-semibold">
              {t('Sustainability.vision')}
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center text-green-800 mb-6">
            {t('Sustainability.objectiveTitle')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {objectivesKeys.map((key, index) => (
              <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                <span className="text-amber-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm">{t(`Sustainability.${key}`)}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-6 italic">
            {t('Sustainability.objectiveFooter')}
          </p>
        </div>

        {/* Environmental Commitment title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-green-800">
            {t('Sustainability.commitmentTitle')}
          </h3>
        </div>

        {/* Commitments grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {commitmentsKeys.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">
                {t(`Sustainability.${item.key}Title`)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(`Sustainability.${item.key}Desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 text-green-800 text-sm mb-4">
            <span className="text-amber-600" aria-hidden="true">🌍</span>
            {t('Sustainability.ecoFriendly')}
          </div>
          <p className="text-gray-700">
            <strong>{t('Sustainability.conclusionBold')}</strong> {t('Sustainability.conclusionText')}
          </p>
          <p className="text-gray-500 text-sm mt-4">
            {t('Sustainability.footerNote')}
          </p>
        </div>

      </div>
    </section>
  )
}