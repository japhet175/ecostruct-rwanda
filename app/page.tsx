import Hero from './components/sections/Hero'
import TrustBar from './components/sections/TrustBar'
import AboutSection from './components/sections/AboutSection'
import Services from './components/sections/Services'
import Process from './components/sections/Process'
import Commitment from './components/sections/Commitment'
import Vision from './components/sections/Vision'
import Gallery from './components/sections/Gallery'
import Testimonials from './components/sections/Testimonials'
import Team from './components/sections/Team'
import CTA from './components/sections/CTA'
import ContactSection from './components/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <AboutSection />
      <Services />
      <Process />
      <Commitment />
      <Vision />
      <Gallery />
      <Testimonials />
      <Team />
      <CTA />
      <ContactSection />
    </main>
  )
}
