'use client'

import Link from 'next/link'
import Image from 'next/image'
import { logoEnglish } from '@/app/data/media'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-wrap gap-8 justify-between mb-8">
          
          {/* Logo & Brand */}
          <div className="flex-1 min-w-[200px]">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 relative overflow-hidden rounded-lg bg-green-800">
                <Image
                  src={logoEnglish}
                  alt="ECOSTRUCT Rwanda"
                  width={40}
                  height={40}
                  className="object-contain p-1"
                />
              </div>
              <span className="text-xl font-bold text-white">
                ECOSTRUCT<span className="text-amber-500">-RWANDA</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Building Today, Preserving Tomorrow
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-amber-400 transition">Home</Link></li>
              <li><Link href="/#services" className="hover:text-amber-400 transition">Services</Link></li>
              <li><Link href="/realisations" className="hover:text-amber-400 transition">Projects</Link></li>
              <li><Link href="/#about" className="hover:text-amber-400 transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-amber-400 transition">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📞</span> +250 795 514 457
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> +33 6 44 84 22 56
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> info@ecostruct-rwanda.com
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span> Kigali, Rwanda
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-400 transition" aria-label="LinkedIn">
                🔗 LinkedIn
              </a>
              <a href="#" className="hover:text-amber-400 transition" aria-label="Facebook">
                📘 Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ECOSTRUCT-RWANDA. All rights reserved.
        </div>
      </div>
    </footer>
  )
}