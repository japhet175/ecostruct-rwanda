'use client'

import { useState, useCallback } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focused, setFocused] = useState<keyof FormData | null>(null)

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi (à remplacer par votre API)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Form submitted:', formData)
    setSubmitStatus('success')
    setFormData({ name: '', email: '', phone: '', message: '' })
    setIsSubmitting(false)
    
    setTimeout(() => setSubmitStatus('idle'), 5000)
  }

  const InputField = ({ 
    name, 
    type = 'text', 
    placeholder, 
    required = false,
    rows 
  }: { 
    name: keyof FormData
    type?: string
    placeholder: string
    required?: boolean
    rows?: number
  }) => {
    const isFocused = focused === name
    const hasValue = formData[name].length > 0
    const isTextarea = rows !== undefined

    const Component = isTextarea ? 'textarea' : 'input'
    
    return (
      <div className="relative group">
        {Component === 'input' ? (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
            required={required}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all duration-200 peer"
          />
        ) : (
          <textarea
            name={name}
            rows={rows}
            value={formData[name]}
            onChange={handleChange}
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
            required={required}
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 transition-all duration-200 resize-none peer"
          />
        )}
        <label 
          className={`absolute left-4 transition-all duration-200 pointer-events-none
            ${(isFocused || hasValue) 
              ? '-top-2.5 text-xs bg-white px-2 text-amber-600' 
              : 'top-3.5 text-gray-500 group-hover:text-gray-700'
            }`}
        >
          {placeholder} {required && <span className="text-amber-500">*</span>}
        </label>
      </div>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-green-900 via-green-800 to-green-900 scroll-mt-16 relative overflow-hidden" id="contact">
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-green-100 text-lg">
            Contact us today for a free quote. We'll respond within 24 hours.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 max-w-5xl mx-auto">
          
          {/* Contact Info Card - updated with PDF info */}
          <div className="flex-1 min-w-[280px] bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white border border-white/20 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <span className="text-amber-400 text-xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold">Contact Information</h3>
            </div>
            
            <div className="space-y-4">
              {/* Phone Rwanda - from PDF */}
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <span className="text-amber-400 text-xl">📞</span>
                <div>
                  <p className="text-sm text-green-200">Rwanda</p>
                  <p className="font-medium">+250 795 514 457</p>
                </div>
              </div>
              
              {/* Phone France - from PDF */}
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <span className="text-amber-400 text-xl">📞</span>
                <div>
                  <p className="text-sm text-green-200">France</p>
                  <p className="font-medium">+33 64 84 422 56</p>
                </div>
              </div>
              
              {/* Email - from PDF */}
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <span className="text-amber-400 text-xl">✉️</span>
                <div>
                  <p className="text-sm text-green-200">Email</p>
                  <p className="font-medium break-all">ndemeyegals@gmail.com</p>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <span className="text-amber-400 text-xl">📍</span>
                <div>
                  <p className="text-sm text-green-200">Location</p>
                  <p className="font-medium">Kigali, Rwanda</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-sm text-green-200 mb-3">Follow us:</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-200 group">
                  <span className="text-white group-hover:text-white">🔗</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-200 group">
                  <span className="text-white group-hover:text-white">📘</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="flex-1 min-w-[280px] bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-5">
              <InputField name="name" placeholder="Full Name" required />
              <InputField name="email" type="email" placeholder="Email Address" required />
              <InputField name="phone" placeholder="Phone Number" />
              <InputField name="message" placeholder="Tell us about your project" required rows={5} />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  'Send Message →'
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm text-center animate-in fade-in">
                  ✓ Message sent successfully! We'll contact you soon.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}