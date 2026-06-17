/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type Language = 'ar' | 'uz' | 'uzCyr' | 'ru' | 'en'

type LanguageContextValue = {
  language: Language
  dir: 'rtl' | 'ltr'
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar')

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      dir: language === 'ar' ? 'rtl' : 'ltr',
      setLanguage,
      toggleLanguage: () => {
        setLanguage((current) => {
          const order: Language[] = ['ar', 'uz', 'uzCyr', 'ru', 'en']
          const nextIndex = (order.indexOf(current) + 1) % order.length
          return order[nextIndex]
        })
      },
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
