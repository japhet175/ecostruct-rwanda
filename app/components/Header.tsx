'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { logoEnglish, logoFrench } from '@/app/data/media'
import { useLanguage } from '../i18n/LanguageContext'

const SECTION_IDS = ['services', 'why', 'about', 'contact']

export default function Header() {
  const { t, language, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  const NAV_LINKS = [
    { href: '/', key: 'home', section: '' },
    { href: '/#services', key: 'services', section: 'services' },
    { href: '/#why', key: 'whyUs', section: 'why' },
    { href: '/#about', key: 'about', section: 'about' },
    { href: '/#contact', key: 'contact', section: 'contact' },
    { href: '/careers', key: 'careers', section: null },
    { href: '/realisations', key: 'projects', section: null },
  ]

  const logoSrc = language === 'en' ? logoEnglish : logoFrench
  const logoSlogan = language === 'en'
    ? 'Building Today. Creating Tomorrow.'
    : "Construire aujourd'hui. Créer demain."

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      let current = ''
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      setActiveSection(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isSolid = scrolled || isMenuOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'py-2' : 'py-3 md:py-4'}`}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none rounded-lg">
            <div className="w-10 h-10 md:w-12 md:h-12 relative overflow-hidden rounded-lg bg-green-50 shrink-0">
              <Image src={logoSrc} alt="" width={48} height={48} className="object-contain p-1" priority />
            </div>
            <div>
              <span className={`text-lg md:text-xl font-bold transition-colors duration-200 ${isSolid ? 'text-green-800' : 'text-white'}`}>
                ECO-STRUCT <span className="text-amber-500">RWANDA LTD</span>
              </span>
              <span className={`hidden md:block text-xs -mt-1 leading-tight transition-colors duration-200 ${isSolid ? 'text-gray-500' : 'text-white/70'}`}>
                {logoSlogan}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center space-x-8" role="list">
              {NAV_LINKS.map((link) => {
                const isActive = link.section !== null && link.section === activeSection
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-amber-500'
                          : isSolid
                            ? 'text-gray-700 hover:text-green-900'
                            : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {t(`Navigation.${link.key}`)}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <Link
              href="/#contact"
              className="hidden lg:inline-flex bg-green-800 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            >
              {t('Navigation.cta')}
            </Link>

            {/* Language Switcher - Desktop */}
            <div className={`flex items-center gap-1 pl-4 ml-2 border-l transition-colors duration-200 ${isSolid ? 'border-gray-200' : 'border-white/20'}`}>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-sm font-semibold transition-colors ${
                  language === 'en' ? 'text-amber-500' : isSolid ? 'text-gray-400 hover:text-gray-700' : 'text-white/70 hover:text-white'
                }`}
              >
                EN
              </button>
              <span className={isSolid ? 'text-gray-300' : 'text-white/30'} aria-hidden="true">/</span>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 text-sm font-semibold transition-colors ${
                  language === 'fr' ? 'text-amber-500' : isSolid ? 'text-gray-400 hover:text-gray-700' : 'text-white/70 hover:text-white'
                }`}
              >
                FR
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition ${isSolid ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
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
                <Link
                  href={link.href}
                  className="block text-gray-700 hover:text-amber-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition"
                  onClick={closeMenu}
                >
                  {t(`Navigation.${link.key}`)}
                </Link>
              </li>
            ))}

            {/* Language Switcher - Mobile */}
            <li className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex gap-1 p-1 bg-gray-100 rounded-md">
                <button
                  onClick={() => { setLanguage('en'); closeMenu() }}
                  className={`flex-1 py-2 text-sm font-semibold rounded transition-colors ${
                    language === 'en'
                      ? 'bg-green-900 text-white'
                      : 'bg-transparent text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => { setLanguage('fr'); closeMenu() }}
                  className={`flex-1 py-2 text-sm font-semibold rounded transition-colors ${
                    language === 'fr'
                      ? 'bg-green-900 text-white'
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
