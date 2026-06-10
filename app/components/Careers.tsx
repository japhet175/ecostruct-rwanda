// app/components/Careers.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Careers() {
  const [email, setEmail] = useState('')
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setNotifyStatus('idle')
    // Simulation d'envoi (à remplacer par votre API plus tard)
    await new Promise(resolve => setTimeout(resolve, 800))

    console.log('Notify me:', email)
    setNotifyStatus('success')
    setEmail('')
    setTimeout(() => setNotifyStatus('idle'), 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-16" id="careers">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            JOIN OUR TEAM
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-4">
            Careers at <span className="text-amber-600">ECOSTRUCT</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Build Rwanda's future with us. We're looking for passionate people to shape tomorrow's construction landscape.
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-green-800 to-green-700 px-6 py-8 text-center">
            <div className="text-6xl mb-3">🚧</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Job Openings Coming Soon</h3>
            <p className="text-green-100 mt-2">
              We're preparing exciting opportunities to join our team.
            </p>
          </div>

          <div className="p-8 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <span>📧</span> Get notified when jobs are available
            </div>

            {/* Email notification form */}
            <form onSubmit={handleNotify} className="max-w-md mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-green-800 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg"
                >
                  Notify Me
                </button>
              </div>
            </form>

            {notifyStatus === 'success' && (
              <p className="text-green-600 text-sm mb-4">✓ Thanks! We'll notify you when jobs are available.</p>
            )}

            <p className="text-gray-500 text-sm">
              Or send your CV directly to:{' '}
              <a href="mailto:careers@ecostruct-rwanda.com" className="text-green-700 font-medium hover:underline">
                careers@ecostruct-rwanda.com
              </a>
            </p>
          </div>
        </div>

        {/* Values section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-6">What we look for</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: '🔧', text: 'Passion for construction' },
              { emoji: '🤝', text: 'Team spirit' },
              { emoji: '📈', text: 'Commitment to quality' },
              { emoji: '🌍', text: 'Innovation & sustainability' },
            ].map((item) => (
              <div key={item.text} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="text-gray-700 font-medium text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to home link (optional, for standalone page) */}
        <div className="text-center mt-12">
          <Link href="/" className="text-green-600 hover:text-amber-600 font-medium transition inline-flex items-center gap-1">
            ← Back to Home
          </Link>
        </div>

      </div>
    </section>
  )
}