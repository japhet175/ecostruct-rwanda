
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { logoEnglish, logoFrench } from '@/app/data/media'
import { useLanguage } from '../i18n/LanguageContext'

export default function Header() {
  const { t, language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)
  const toggleLanguage = () => setLanguage(language === 'en' ? 'fr' : 'en')

  const NAV_LINKS = [
    { href: '/', key: 'home' },
    { href: '/#services', key: 'services' },
    { href: '/#sustainability', key: 'whyUs' },
    { href: '/#about', key: 'about' },
    { href: '/#contact', key: 'contact' },
    { href: '/careers', key: 'careers' },
    { href: '/realisations', key: 'projects' },
  ]

  const logoSrc = language === 'en' ? logoEnglish : logoFrench
  const logoSlogan = language === 'en' 
    ? 'Building Today, Preserving Tomorrow'
    : "Construire Aujourd'hui, Préserver Demain"

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center py-3 md:py-4" aria-label="Main navigation">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg">
            <div className="w-10 h-10 md:w-12 md:h-12 relative overflow-hidden rounded-lg bg-green-50 shrink-0">
              <Image src={logoSrc} alt="" width={48} height={48} className="object-contain p-1" priority />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold text-green-800 group-hover:text-green-700 transition-colors duration-200">
                ECOSTRUCT<span className="text-amber-600">-RWANDA</span>
              </span>
              <span className="hidden md:block text-xs text-gray-500 -mt-1 leading-tight">{logoSlogan}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center space-x-8" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200">
                    {t(`Navigation.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Switcher - Desktop */}
            <div className="flex items-center gap-1 bg-gray-200 rounded-full p-0.5">
              <button onClick={() => setLanguage('en')} className={`px-3 py-1.5 text-sm font-bold rounded-full transition ${
                language === 'en' ? 'bg-amber-500 text-white shadow-md' : 'bg-transparent text-gray-700 hover:text-amber-600'
              }`}>EN</button>
              <button onClick={() => setLanguage('fr')} className={`px-3 py-1.5 text-sm font-bold rounded-full transition ${
                language === 'fr' ? 'bg-amber-500 text-white shadow-md' : 'bg-transparent text-gray-700 hover:text-amber-600'
              }`}>FR</button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition" onClick={toggleMenu} aria-expanded={isMenuOpen}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] py-4' : 'max-h-0'}`}>
          <ul className="flex flex-col space-y-2 border-t border-gray-100 pt-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block text-gray-700 hover:text-amber-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition" onClick={closeMenu}>
                  {t(`Navigation.${link.key}`)}
                </Link>
              </li>
            ))}
            
            {/* Language Switcher - Mobile (bien visible) */}
            <li className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex gap-2 p-1 bg-gray-100 rounded-full">
                <button
                  onClick={() => { setLanguage('en'); closeMenu() }}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-full transition ${
                    language === 'en'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => { setLanguage('fr'); closeMenu() }}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-full transition ${
                    language === 'fr'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  FRANÇAIS
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}