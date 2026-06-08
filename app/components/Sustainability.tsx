'use client'

interface CommitmentItem {
  icon: string
  title: string
  description: string
  points?: string[]
}

const commitments: CommitmentItem[] = [
  {
    icon: "♻️",
    title: "Recycling & Responsible Waste Management",
    description: "We encourage sorting, recycling and reusing construction materials whenever possible in order to reduce waste on our sites."
  },
  {
    icon: "🌱",
    title: "Use of Local Materials",
    description: "We prioritize local materials and local suppliers to support Rwanda's economy, reduce transport pollution, and promote sustainable development."
  },
  {
    icon: "🏗️",
    title: "Smarter Construction",
    description: "Our projects are designed to combine quality, durability, energy efficiency, and environmental responsibility."
  },
  {
    icon: "🌍",
    title: "Building for the Future",
    description: "Every project should contribute to a cleaner environment, a stronger community, and a better future for the next generations."
  }
]

const objectives: string[] = [
  "Sustainable construction methods",
  "Environmental protection",
  "Recycling and reuse of materials",
  "Use of local materials and local expertise",
  "Reduction of construction waste",
  "Responsible resource management"
]

export default function Sustainability() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-white scroll-mt-16" id="sustainability">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose Eco-Struct Ltd?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mt-3 mb-4">
            <span className="text-amber-600">Sustainable Construction</span> for Tomorrow
          </h2>
          <p className="text-gray-600 text-lg">
            At Eco-Struct Ltd, we believe construction should not only build today&apos;s projects —
            it should also protect tomorrow&apos;s environment.
          </p>
        </div>

        {/* Vision statement */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="bg-green-800 rounded-2xl p-8 text-white">
            <p className="text-xl md:text-2xl font-semibold">
              Unlike many traditional construction companies, our vision goes beyond building structures.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center text-green-800 mb-6">
            Our objective is to promote:
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {objectives.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm"
              >
                <span className="text-amber-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm">{point}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-6 italic">
            We aim to reduce the environmental impact of construction while creating durable,
            modern and efficient projects for future generations.
          </p>
        </div>

        {/* Environmental Commitment title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-green-800">
            Our Environmental Commitment
          </h3>
        </div>

        {/* Commitments grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {commitments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 text-green-800 text-sm mb-4">
            <span className="text-amber-600" aria-hidden="true">🌍</span>
            Eco-Friendly Construction Solutions in Rwanda
          </div>
          <p className="text-gray-700">
            <strong>Eco-Struct Ltd</strong> is committed to creating construction solutions that respect both people and nature.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Every project should contribute to: a cleaner environment, a stronger community, and a better future for the next generations.
          </p>
        </div>

      </div>
    </section>
  )
}