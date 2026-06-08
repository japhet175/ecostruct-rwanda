
'use client'

interface Service {
  icon: string
  title: string
  description: string
}

const services: Service[] = [
  { 
    icon: "🏗️", 
    title: "Building Construction", 
    description: "Residential, commercial and institutional buildings." 
  },
  { 
    icon: "🔨", 
    title: "Renovation Works", 
    description: "Office renovation, schools, houses, apartments and public buildings." 
  },
  { 
    icon: "🔧", 
    title: "Maintenance Services", 
    description: "Repairs, painting, plumbing, masonry, concrete and finishing works." 
  },
  { 
    icon: "🌿", 
    title: "Landscaping & External Works", 
    description: "Fences, drainage, paving, gardens, external layouts." 
  },
  { 
    icon: "📐", 
    title: "Technical Supervision", 
    description: "Formwork, reinforcement, concrete quality control and site coordination." 
  }
]

export default function Services() {
  return (
    <section className="py-20 bg-gray-50 scroll-mt-16" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800 mb-4">
            ⭐ OUR AREAS OF EXPERTISE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            What We Do Best
          </h2>
          <p className="text-gray-600 italic">
            "Quality, durability, and professionalism — in every project we undertake."
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-amber-200"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2">
            <span className="text-green-600">✓</span> Quality Guaranteed
            <span className="text-green-600 ml-2">✓</span> On-Time Delivery
            <span className="text-green-600 ml-2">✓</span> Certified Professionals
          </span>
        </div>
      </div>
    </section>
  )
}
