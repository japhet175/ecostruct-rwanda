'use client'

interface CommitmentItem {
  icon: string
  title: string
  description: string
}

const COMMITMENTS: readonly CommitmentItem[] = [
  {
    icon: '♻️',
    title: 'Recycling & Waste Management',
    description: 'We encourage sorting, recycling and reusing construction materials whenever possible to reduce waste on our sites.',
  },
  {
    icon: '🌱',
    title: 'Use of Local Materials',
    description: "We prioritize local materials and suppliers to support Rwanda's economy, reduce transport pollution, and promote sustainable development.",
  },
  {
    icon: '🏗️',
    title: 'Smarter Construction',
    description: 'Our projects combine quality, durability, energy efficiency, and environmental responsibility.',
  },
  {
    icon: '🤝',
    title: 'Trust & Partnerships',
    description: 'We don\'t just build structures — we build trust and long-lasting partnerships with our clients.',
  },
]

const WHY_POINTS: readonly string[] = [
  'Experience with international institutions',
  'Strong commitment to quality & safety',
  'Environmentally responsible practices',
  'Focus on human values & client satisfaction',
  'Reliable & on-time delivery',
]

export default function Sustainability() {
  return (
    <section
      className="py-20 bg-gradient-to-br from-green-50 to-white scroll-mt-16"
      id="sustainability"
      aria-label="Sustainability and why choose us"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose ECOSTRUCT
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mt-3 mb-4">
            Building a{' '}
            <span className="text-amber-600">Greener Future</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            At ECOSTRUCT, we believe construction should not only build today's projects —
            it should also protect tomorrow's environment.
          </p>
        </div>

        {/* Why ECOSTRUCT banner */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-green-800 rounded-2xl p-6 md:p-8 text-white shadow-xl">
            <p className="text-xl md:text-2xl font-semibold mb-6 text-center tracking-wide">
              Why ECOSTRUCT?
            </p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {WHY_POINTS.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold text-lg leading-6" aria-hidden="true">
                    ✓
                  </span>
                  <span className="text-sm md:text-base text-white/90">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Commitments grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {COMMITMENTS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100 group"
            >
              <div
                className="text-4xl mb-4 w-fit group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer statement */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 text-green-800 text-sm mb-4">
            <span aria-hidden="true">🌍</span>
            <span>Eco-Friendly Construction Solutions in Rwanda</span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            <strong>ECOSTRUCT</strong> is committed to creating construction solutions
            that respect both people and nature.
          </p>
          <p className="text-gray-500 text-sm mt-4 italic">
            Local materials. Sustainable methods. Lasting impact. This is ECOSTRUCT-RWANDA.
          </p>
        </div>

      </div>
    </section>
  )
}