// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { LanguageProvider } from './i18n/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://eco-sturct.com'),
  title: 'ECO-STRUCT RWANDA LTD | Construction & Renovation in Rwanda',
  description: 'ECO-STRUCT RWANDA LTD — reliable construction, renovation, civil works and technical solutions in Rwanda. Building Today. Creating Tomorrow.',
  keywords: ['construction Rwanda', 'renovation Rwanda', 'ECO-STRUCT', 'civil works Kigali', 'building Kigali', 'plumbing', 'electrical works'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ECO-STRUCT RWANDA LTD | Construction & Renovation in Rwanda',
    description: 'Reliable construction, renovation, civil works and technical solutions in Rwanda. Building Today. Creating Tomorrow.',
    url: 'https://eco-sturct.com',
    siteName: 'ECO-STRUCT RWANDA LTD',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}