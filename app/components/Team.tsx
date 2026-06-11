'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

interface TeamMember {
  name: string
  role: string
  photo: string
  bio: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Ndemeye Gaius",
    role: "Founder & CEO – Construction Expert",
    photo: "/images/equipe/founder.jpg",
    bio: "20+ years of experience in France, now leading construction excellence in Rwanda.",
  },
  {
    name: "Japhet",
    role: "Construction Project Coordinator",
    photo: "/images/equipe/strategic-ai-communication.jpg",
    bio: "Coordinating construction projects, site planning, and quality control across all operations.",
  },
  {
    name: "Gercy",
    role: "Technical Site Supervisor",
    photo: "/images/equipe/construction-legal-coordinator.jpg",
    bio: "Overseeing on-site operations, quality assurance, and technical compliance for all construction projects.",
  },
]

export default function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.findIndex((ref) => ref === entry.target)
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2, rootMargin: '50px' }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white scroll-mt-16" id="team">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header avec badge */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            MEET THE TEAM
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-900 mt-3 mb-4">
            Behind ECOSTRUCT, a Passionate Team
          </h2>
          <p className="text-gray-600 text-lg">
            Collective expertise serving our clients — together, we are building Rwanda's future.
          </p>
        </div>

        {/* Team Grid avec animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el }}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Photo avec overlay gradient */}
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-green-800 to-green-600">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Overlay gradient au survol */}
                <div className={`absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>

              {/* Informations */}
              <div className="p-6 text-center bg-white">
                <h3 className="text-xl font-bold text-green-800 mb-1">{member.name}</h3>
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                
                {/* Ligne décorative */}
                <div className="w-12 h-0.5 bg-amber-400 mx-auto mt-4 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Message de fin */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <span className="text-xl">👥</span>
            A growing team — new talents coming soon to serve you better.
          </p>
        </div>
      </div>
    </section>
  )
}