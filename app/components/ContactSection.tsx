'use client'

import { useState, useCallback } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

interface InputFieldProps {
  name: keyof FormData
  type?: string
  placeholderKey: string
  required?: boolean
  rows?: number
  formData: FormData
  focused: keyof FormData | null
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onFocus: (name: keyof FormData) => void
  onBlur: () => void
}

function InputField({
  name,
  type = 'text',
  placeholderKey,
  required = false,
  rows,
  formData,
  focused,
  onChange,
  onFocus,
  onBlur,
}: InputFieldProps) {
  const { t } = useLanguage()
  const isFocused = focused === name
  const hasValue = formData[name].length > 0
  const isTextarea = rows !== undefined

  return (
    <div className="relative group">
      {isTextarea ? (
        <textarea
          name={name}
          rows={rows}
          value={formData[name]}
          onChange={onChange}
          onFocus={() => onFocus(name)}
          onBlur={onBlur}
          required={required}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 transition-colors duration-200 resize-none peer"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={onChange}
          onFocus={() => onFocus(name)}
          onBlur={onBlur}
          required={required}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-amber-500 transition-colors duration-200 peer"
        />
      )}
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none
          ${(isFocused || hasValue)
            ? '-top-2.5 text-xs bg-white px-2 text-amber-600'
            : 'top-3.5 text-gray-500 group-hover:text-gray-700'
          }`}
      >
        {t(`Contact.${placeholderKey}`)} {required && <span className="text-amber-500">*</span>}
      </label>
    </div>
  )
}

export default function ContactSection() {
  const { t } = useLanguage()
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

    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Form submitted:', formData)
    setSubmitStatus('success')
    setFormData({ name: '', email: '', phone: '', message: '' })
    setIsSubmitting(false)

    setTimeout(() => setSubmitStatus('idle'), 5000)
  }

  return (
    <section className="py-24 bg-green-900 scroll-mt-16" id="contact">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
            {t('Contact.getInTouch')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            {t('Contact.title')}
          </h2>
          <p className="text-green-100 text-lg">
            {t('Contact.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap gap-8 max-w-5xl mx-auto">

          <div className="flex-1 min-w-[280px] bg-white/10 rounded-lg p-8 text-white border border-white/20">
            <div className="mb-6">
              <h3 className="text-xl font-bold">{t('Contact.companyName')}</h3>
              <p className="text-sm text-green-200 mt-1.5">
                {t('Contact.managingDirector')}: <span className="text-white font-medium">{t('Contact.directorName')}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-md hover:bg-white/5 transition-colors">
                <Phone className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-sm text-green-200">Rwanda</p>
                  <p className="font-medium">+250 795 514 457</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md hover:bg-white/5 transition-colors">
                <Phone className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-sm text-green-200">France</p>
                  <p className="font-medium">+33 64 84 422 56</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md hover:bg-white/5 transition-colors">
                <Mail className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-sm text-green-200">{t('Contact.email')}</p>
                  <p className="font-medium break-all">ndemeyegals@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md hover:bg-white/5 transition-colors">
                <MapPin className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="text-sm text-green-200">{t('Contact.location')}</p>
                  <p className="font-medium">Kigali, Rwanda</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-sm text-green-200 mb-3">{t('Contact.followUs')}:</p>
              <div className="flex gap-6">
                <a href="#" className="text-green-100 hover:text-white text-sm font-medium transition-colors">LinkedIn</a>
                <a href="#" className="text-green-100 hover:text-white text-sm font-medium transition-colors">Facebook</a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 min-w-[280px] bg-white rounded-lg p-8 shadow-md">
            <div className="space-y-5">
              <InputField
                name="name"
                placeholderKey="fullName"
                required
                formData={formData}
                focused={focused}
                onChange={handleChange}
                onFocus={setFocused}
                onBlur={() => setFocused(null)}
              />
              <InputField
                name="email"
                type="email"
                placeholderKey="emailAddress"
                required
                formData={formData}
                focused={focused}
                onChange={handleChange}
                onFocus={setFocused}
                onBlur={() => setFocused(null)}
              />
              <InputField
                name="phone"
                placeholderKey="phoneNumber"
                formData={formData}
                focused={focused}
                onChange={handleChange}
                onFocus={setFocused}
                onBlur={() => setFocused(null)}
              />
              <InputField
                name="message"
                placeholderKey="message"
                required
                rows={5}
                formData={formData}
                focused={focused}
                onChange={handleChange}
                onFocus={setFocused}
                onBlur={() => setFocused(null)}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('Contact.sending')}...
                  </div>
                ) : (
                  t('Contact.send')
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm text-center">
                  {t('Contact.success')}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
