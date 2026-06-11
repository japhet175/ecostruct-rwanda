// app/realisations/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    emoji: '🎓',
    title: 'École Française de Kigali',
    status: 'completed',
    statusLabel: '✅ Completed 2025',
    statusClass: 'bg-green-100 text-green-700',
    description:
      'Full renovation of the French School in Kigali — modernised classrooms, administrative spaces, and outdoor facilities. Delivered on schedule to the highest standards.',
    image: null,
    tags: ['Renovation', 'Education', 'Kigali'],
  },
  {
    id: 2,
    emoji: '🚧',
    title: 'Current Construction Site',
    status: 'ongoing',
    statusLabel: '🔄 In Progress',
    statusClass: 'bg-amber-100 text-amber-700',
    description:
      'A new construction project currently underway across Rwanda. More details and progress updates will be shared soon.',
    image: '/images/projects/In progress.jpeg',
    tags: ['Construction', 'New Build', 'Rwanda'],
  },
]

export default function RealisationsPage() {
  return (
    <main className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

        {/* Header */}
        <header className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-600 mb-3">
            Our Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 leading-tight">
            Projects &amp; Realisations
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Completed work and ongoing construction across Rwanda — built with precision, delivered with pride.
          </p>
        </header>

        {/* Bandeau partenaires + lien galerie */}
        <div className="text-center mb-12 p-5 bg-green-50 rounded-xl border border-green-100 shadow-sm">
          <p className="text-green-800 font-medium">
            🤝 We are currently working on multiple projects with <strong>strategic partners</strong>.
          </p>
          <Link
            href="/#gallery"
            className="inline-block mt-2 text-amber-600 hover:text-amber-700 font-semibold underline transition"
          >
            Explore our partnerships in the gallery →
          </Link>
        </div>

        {/* Project Cards */}
        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className={`md:flex ${project.image ? '' : ''}`}>

                {/* Image (if available) – object-contain pour voir l’image entière */}
                {project.image && (
                  <div className="md:w-1/2 relative h-72 md:h-auto bg-gray-50 flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={`Photo of ${project.title}`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}

                {/* Content */}
                <div className={`p-8 flex flex-col justify-center ${project.image ? 'md:w-1/2' : 'w-full'}`}>

                  {/* Title row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-3xl" role="img" aria-label={project.title}>
                      {project.emoji}
                    </span>
                    <h2 className="text-2xl font-bold text-green-800">
                      {project.title}
                    </h2>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${project.statusClass}`}>
                      {project.statusLabel}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '10+', label: 'Projects Delivered & In Progress' },
            { value: '20+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="bg-green-50 rounded-xl py-6 px-4">
              <div className="text-3xl font-extrabold text-green-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-gray-500 text-sm">Want to work with us on your next project?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-green-800 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200"
            >
              Get in Touch →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-700 hover:text-amber-600 font-medium transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}