import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import Services from './components/Services'
import Commitment from './components/Commitment'
import Vision from './components/Vision'
import VideoTestimonial from './components/VideoTestimonial'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Team from './components/Team'
import ContactSection from './components/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <Services />
      <Commitment />
      <Vision />
      <VideoTestimonial />
      <Gallery />
      <Testimonials />
      <Team />
      <ContactSection />
    </main>
  )
}
