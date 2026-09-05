import { createFileRoute } from '@tanstack/react-router'
import { OmarchyHero } from '../components/Hero'
import { About } from '../components/About'
import { NewsSection } from '../components/NewsSection'
import { Sponsors } from '../components/Sponsors'
import { Reviews } from '../components/Reviews'
import { Contributors } from '../components/Contributors'
import {
  Features,
  Install,
  Manifesto,
  Stats,
} from '../components/Sections'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="min-h-screen bg-black font-instrument">
      <div className="h-svh p-2 sm:p-3">
        <OmarchyHero />
      </div>
      <About />
      <NewsSection />
      <Manifesto />
      <Features />
      <Sponsors />
      <Reviews />
      <Contributors />
      <Install />
      <Stats />
    </main>
  )
}
