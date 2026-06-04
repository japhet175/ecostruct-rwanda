'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { logoEnglish, logoFrench } from '@/app/data/media'

type Language = 'en' | 'fr'

interface NavLink {
  href: string
  label: string
  labelFr: string
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', labelFr: 'Accueil' },
  { href: '/#services', label: 'Services', labelFr: 'Services' },
  { href: '/#sustainability', label: 'Why Us', labelFr: 'Pourquoi Nous' },
  { href: '/realisations', label: 'Projects', labelFr: 'Projets' },
  { href: '/#about', label: 'About', labelFr: 'À propos' },
  { href: '/#contact', label: 'Contact', labelFr: 'Contact' },
]

const SLOGANS: Record<Language, string> = {
  en: 'Building Today, Preserving Tomorrow',
  fr: "Construire Aujourd'hui, Préserver Demain",
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<Language>('en')

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  const getLabel = (link: NavLink) => language === 'en' ? link.label : link.labelFr

  const logoSrc = language === 'en' ? logoEnglish : logoFrench
  const logoSlogan = SLOGANS[language]

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50"
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex justify-between items-center py-3 md:py-4"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg"
            aria-label="ECOSTRUCT Rwanda — Back to home"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 relative overflow-hidden rounded-lg bg-green-50 shrink-0">
              <Image
                src={logoSrc}
                alt=""
                width={48}
                height={48}
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold text-green-800 group-hover:text-green-700 transition-colors duration-200">
                ECOSTRUCT<span className="text-amber-600">-RWANDA</span>
              </span>
              <span className="hidden md:block text-xs text-gray-500 -mt-1 leading-tight">
                {logoSlogan}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center space-x-8" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
                  >
                    {getLabel(link)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Switcher - Desktop avec texte visible */}
            <div className="flex items-center gap-1 bg-gray-200 rounded-full p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  language === 'en'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-transparent text-gray-700 hover:text-amber-600'
                }`}
                aria-label="Switch to English"
                aria-pressed={language === 'en'}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1.5 text-sm font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  language === 'fr'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-transparent text-gray-700 hover:text-amber-600'
                }`}
                aria-label="Passer en français"
                aria-pressed={language === 'fr'}
              >
                FR
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="flex flex-col space-y-3 border-t border-gray-100 pt-4" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-gray-700 hover:text-amber-600 font-medium py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
                  onClick={closeMenu}
                >
                  {getLabel(link)}
                </Link>
              </li>
            ))}

            {/* Language Switcher - Mobile avec texte visible */}
            <li className="pt-2 border-t border-gray-100">
              <div className="flex gap-2 bg-gray-200 rounded-full p-1">
                <button
                  onClick={() => {
                    setLanguage('en')
                    closeMenu()
                  }}
                  className={`flex-1 py-2 text-sm font-bold rounded-full transition-all duration-200 ${
                    language === 'en'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:text-amber-600'
                  }`}
                  aria-label="Switch to English"
                  aria-pressed={language === 'en'}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage('fr')
                    closeMenu()
                  }}
                  className={`flex-1 py-2 text-sm font-bold rounded-full transition-all duration-200 ${
                    language === 'fr'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-transparent text-gray-700 hover:text-amber-600'
                  }`}
                  aria-label="Passer en français"
                  aria-pressed={language === 'fr'}
                >
                  Français
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}