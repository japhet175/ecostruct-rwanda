'use client'

interface Service {
  icon: string
  title: string
  description: string
}

const SERVICES: Service[] = [
  {
    icon: '🏗️',
    title: 'Building Construction',
    description: 'Industrial, commercial, residential buildings — turnkey solutions with international standards.',
  },
  {
    icon: '🔧',
    title: 'Renovation Works',
    description: 'Complete or partial renovation, extension, and rehabilitation of existing structures.',
  },
  {
    icon: '⚡',
    title: 'Maintenance Services',
    description: 'Preventive and corrective maintenance for businesses, institutions, and residential properties.',
  },
  {
    icon: '🌿',
    title: 'Landscaping & External Works',
    description: 'Garden creation, irrigation systems, and sustainable outdoor space management.',
  },
  {
    icon: '📐',
    title: 'Technical Supervision',
    description: 'Expert project oversight, quality control, and construction management consulting.',
  },
  {
    icon: '♻️',
    title: 'Sustainable Construction',
    description: 'Eco-friendly methods, local materials, and energy-efficient innovative solutions.',
  },
]

const TRUST_BADGES: string[] = [
  'Quality & Durability',
  'Energy Efficiency',
  'Eco-Friendly Methods',
  'On-Time Delivery',
]

export default function Services() {
  return (
    <section
      className="py-20 bg-gray-50 scroll-mt-16"
      id="services"
      aria-label="Our services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800 mb-4">
            <span className="mr-1" aria-hidden="true">🌱</span>
            Our Areas of Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            What We Do Best
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Local materials. Sustainable methods. Lasting impact.
          </p>
        </div>

        {/* Services grid */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" role="list">
          {SERVICES.map((service) => (
            <li
              key={service.title}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div
                className="text-4xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {service.description}
              </p>
            </li>
          ))}
        </ul>

        {/* Trust badges */}
        <div className="text-center mt-12 pt-4 border-t border-gray-200">
          <ul
            className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500"
            role="list"
          >
            {TRUST_BADGES.map((badge) => (
              <li key={badge} className="inline-flex items-center gap-1">
                <span className="text-green-600 font-bold" aria-hidden="true">✓</span>
                <span>{badge}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}