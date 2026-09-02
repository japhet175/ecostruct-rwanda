'use client'

import { createContext, useContext, useSyncExternalStore, ReactNode } from 'react'
import en from './en.json'
import fr from './fr.json'

type Language = 'en' | 'fr'

const translations = { en, fr }

const LANGUAGE_KEY = 'language'
const listeners = new Set<() => void>()

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): Language {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem(LANGUAGE_KEY)
  return saved === 'en' || saved === 'fr' ? saved : 'en'
}

function getServerSnapshot(): Language {
  return 'en'
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLanguage = (lang: Language) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(LANGUAGE_KEY, lang)
    listeners.forEach((listener) => listener())
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let result: unknown = translations[language]
    for (const k of keys) {
      result = (result as Record<string, unknown> | undefined)?.[k]
    }
    return typeof result === 'undefined' ? key : (result as string)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
