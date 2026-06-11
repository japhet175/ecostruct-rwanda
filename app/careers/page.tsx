'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function Careers() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setNotifyStatus('idle')
    await new Promise(resolve => setTimeout(resolve, 800))

    console.log('Notify me:', email)
    setNotifyStatus('success')
    setEmail('')
    setTimeout(() => setNotifyStatus('idle'), 3000)
  }

  const valuesList = [
    { emoji: '🔧', key: 'passion' },
    { emoji: '🤝', key: 'teamSpirit' },
    { emoji: '📈', key: 'quality' },
    { emoji: '🌍', key: 'innovation' },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-16" id="careers">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            {t('Careers.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">
            {t('Careers.title')} <span className="text-amber-600">{t('Careers.brand')}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('Careers.subtitle')}
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-800 to-green-700 px-6 py-8 text-center">
            <div className="text-6xl mb-3">🚧</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{t('Careers.comingSoon')}</h3>
            <p className="text-green-100 mt-2">
              {t('Careers.comingSoonDesc')}
            </p>
          </div>

          <div className="p-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <span>📧</span> {t('Careers.notifyLabel')}
            </div>

            <form onSubmit={handleNotify} className="max-w-md mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('Careers.emailPlaceholder')}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-green-800 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg"
                >
                  {t('Careers.notifyButton')}
                </button>
              </div>
            </form>

            {notifyStatus === 'success' && (
              <p className="text-green-600 text-sm mb-4">✓ {t('Careers.notifySuccess')}</p>
            )}

            <p className="text-gray-500 text-sm">
              {t('Careers.orSend')}{' '}
              <a href="mailto:careers@ecostruct-rwanda.com" className="text-green-700 font-medium hover:underline">
                careers@ecostruct-rwanda.com
              </a>
            </p>
          </div>
        </div>

        {/* Values section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-6">{t('Careers.whatWeLookFor')}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {valuesList.map((item) => (
              <div key={item.key} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="text-gray-700 font-medium text-sm">{t(`Careers.${item.key}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to home link */}
        <div className="text-center mt-12">
          <Link href="/" className="text-green-600 hover:text-amber-600 font-medium transition inline-flex items-center gap-1">
            ← {t('Careers.backToHome')}
          </Link>
        </div>

      </div>
    </section>
  )
}