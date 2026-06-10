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
      <Team />                 // ← équipe juste après les valeurs (confiance)
      <VideoTestimonial />     // ← preuve sociale après l’équipe
      <Gallery />              // ← preuves visuelles
      <ContactSection />       // ← appel à l’action final
    </main>
  )
}