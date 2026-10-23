import type { LucideIcon } from 'lucide-react'
import { School, Landmark, Hotel, Building2, Building } from 'lucide-react'

export type ProjectTag = 'renovation' | 'externalWork' | 'technicalConsultancy'

export interface Project {
  id: string
  title: { en: string; fr: string }
  image: string
  icon: LucideIcon
  tag: ProjectTag
}

// Chaque projet regroupe son titre, sa photo, son icône et son type de travaux.
export const projects: Project[] = [
  {
    id: 'ecole-francaise',
    title: { en: 'École Française de Kigali', fr: 'École Française de Kigali' },
    image: '/images/projects/antoine-st-exupery.jpeg',
    icon: School,
    tag: 'renovation',
  },
  {
    id: 'french-embassy',
    title: { en: 'French Embassy Residence – Kigali', fr: "Résidence de l'Ambassade de France – Kigali" },
    image: '/images/projects/ambassade-france-residence.jpeg',
    icon: Landmark,
    tag: 'renovation',
  },
  {
    id: 'galaxy-hotel',
    title: { en: 'Galaxy Hotel', fr: 'Galaxy Hotel' },
    image: '/images/projects/galaxy-hotel.jpeg',
    icon: Hotel,
    tag: 'externalWork',
  },
  {
    id: 'isange-phase-3',
    title: { en: 'ISANGE Phase 3', fr: 'ISANGE Phase 3' },
    image: '/images/projects/isange-phase-3.jpg',
    icon: Building2,
    tag: 'technicalConsultancy',
  },
  {
    id: 'one-residence',
    title: { en: 'One Residence', fr: 'One Residence' },
    image: '/images/projects/one-residence.jpg',
    icon: Building,
    tag: 'technicalConsultancy',
  },
]
