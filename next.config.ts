import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─────────────────────────────────────────────────────────────────
  // 1. OPTIMISATION DES IMAGES (Next.js built-in)
  // ─────────────────────────────────────────────────────────────────
  images: {
    // Formats modernes pour réduire le poids (AVIF > WebP > JPEG)
    formats: ['image/avif', 'image/webp'],
    
    // Tailles d'écran pour lesquelles Next.js génère des images responsives
    // Plus de tailles = meilleure adaptation mobile/tablet/desktop
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Tailles pour les images statiques (icônes, logos, etc.)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Durée de cache en secondes (60s = revalidation rapide)
    minimumCacheTTL: 60,
    
    // Autoriser les SVG (attention : risque XSS, mais nos SVG sont sûrs)
    dangerouslyAllowSVG: true,
  },
  
  // ─────────────────────────────────────────────────────────────────
  // 2. COMPRESSION GZIP / BROTLI (réduit le poids des fichiers)
  // ─────────────────────────────────────────────────────────────────
  compress: true,
  
  // ─────────────────────────────────────────────────────────────────
  // 3. SÉCURITÉ : Supprime le header "X-Powered-By: Next.js"
  //    (empêche les attaquants de savoir qu'on utilise Next.js)
  // ─────────────────────────────────────────────────────────────────
  poweredByHeader: false,
  
  // ─────────────────────────────────────────────────────────────────
  // 4. EN-TÊTES HTTP DE SÉCURITÉ ET CACHE
  // ─────────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Applique ces en-têtes à TOUTES les pages
        source: '/(.*)',
        headers: [
          // Empêche le navigateur de "deviner" le type MIME (prévient les attaques)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          
          // Empêche le site d'être intégré dans un iframe (protection clickjacking)
          { key: 'X-Frame-Options', value: 'DENY' },
          
          // Active la protection XSS intégrée du navigateur
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          
          // Cache court pour les pages HTML (évite d'afficher du contenu obsolète)
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      {
        // Cache LONG pour les images (1 an) – elles ne changent pas souvent
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache LONG pour les vidéos (1 an)
        source: '/videos/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;