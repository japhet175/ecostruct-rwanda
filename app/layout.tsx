// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // ← Améliore le temps de chargement des polices
})

export const metadata: Metadata = {
  title: 'E-Construct | Construction & Renovation in Rwanda',
  description: 'E-Construct - You Dream It We Build It. Construction, renovation, electrical, plumbing, landscaping in Rwanda.',
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
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}