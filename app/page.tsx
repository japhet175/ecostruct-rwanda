import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import Services from './components/Services'
import Sustainability from './components/Sustainability'
import Team from './components/Team'
import VideoTestimonial from './components/VideoTestimonial'
import Gallery from './components/Gallery'
import ContactSection from './components/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <Services />
      <Sustainability />
      <VideoTestimonial />
      <Gallery />
      <ContactSection />
      <Team />
    </main>
  )
}
