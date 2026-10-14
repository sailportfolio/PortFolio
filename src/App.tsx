import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { setLenis } from './lib/scroll'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Hello from './sections/Hello'
import Education from './sections/Education'
import Experience from './sections/Experience'
import GraphicPost from './sections/GraphicPost'
import VideosEdit from './sections/VideosEdit'
import Illustrator from './sections/Illustrator'
import ThankYou from './sections/ThankYou'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // Smooth scroll (Lenis) wired into GSAP ScrollTrigger
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
      lenisRef.current = null
    }
  }, [])

  // Lock scroll while the intro plays
  useEffect(() => {
    const lenis = lenisRef.current
    if (!introDone) {
      document.body.classList.add('is-locked')
      lenis?.stop()
    } else {
      document.body.classList.remove('is-locked')
      lenis?.start()
      ScrollTrigger.refresh()
    }
  }, [introDone])

  return (
    <>
      <Preloader
        onStart={() => setIntroDone(false)}
        onComplete={() => setIntroDone(true)}
      />
      <Nav />
      <main className={introDone ? 'site is-ready' : 'site'}>
        <Hero ready={introDone} />
        <Hello />
        <Education />
        <Experience />
        <GraphicPost />
        <VideosEdit />
        <Illustrator />
        <ThankYou />
        <Footer />
      </main>
    </>
  )
}
