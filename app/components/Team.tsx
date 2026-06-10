'use client'

import Image from 'next/image'
import { useState } from 'react'

interface TeamMember {
  name: string
  role: string
  photo: string
  bio?: string
  linkedin?: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Ndemeye Gaius",
    role: "Founder & CEO",
    photo: "/images/equipe/founder.jpg",
    bio: "20+ years of experience in construction in France, returned to Rwanda in 2024 to bring international expertise.",
    linkedin: "#",
  },
  {
    name: "Japhet Kalumba",
    role: "Responsable Communication",
    photo: "/images/equipe/communications-manager.png",
    bio: "In charge of communication and digital marketing for ECOSTRUCT.",
    linkedin: "#",
  },
  // 👥 Add more team members here easily
]

export default function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      className="py-20 bg-gray-50 scroll-mt-16"
      id="team"
      aria-labelledby="team-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Our Team
          </span>
          <h2
            id="team-heading"
            className="text-3xl md:text-4xl font-bold text-green-900 mt-2 mb-4"
          >
            Behind ECOSTRUCT, a Passionate Team
          </h2>
          <p className="text-gray-600">
            Collective expertise serving our clients — together, we are building Rwanda&apos;s future.
          </p>
        </div>

        {/* Team Grid — centers cards when fewer than 3 members */}
        <div
          className={`grid gap-8 ${
            teamMembers.length === 1
              ? 'grid-cols-1 max-w-sm mx-auto'
              : teamMembers.length === 2
              ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Photo */}
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-green-800 to-green-600">
                <Image
                  src={member.photo}
                  alt={`Photo of ${member.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* LinkedIn overlay — shown on hover */}
                {member.linkedin && (
                  <div
                    className={`absolute inset-0 bg-green-900/70 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  >
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors"
                      aria-label={`LinkedIn profile of ${member.name}`}
                      tabIndex={hoveredIndex === index ? 0 : -1}
                    >
                      <span className="text-green-800 font-bold text-sm">in</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-green-800 mb-1">{member.name}</h3>
                <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-3">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                )}

                {/* Accessible LinkedIn link also visible below the card on mobile */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-green-700 hover:text-amber-600 transition-colors sm:hidden"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <span className="font-bold">in</span> LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            👥 A growing team — new talents coming soon to serve you better.
          </p>
        </div>

      </div>
    </section>
  )
}