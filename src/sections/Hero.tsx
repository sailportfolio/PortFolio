import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReduced } from "../hooks/useReveal"
import { scrollToId } from "../lib/scroll"

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const targets = el.querySelectorAll("[data-hero]")

    if (prefersReduced()) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }
    if (!ready) {
      gsap.set(targets, { opacity: 0, y: 54 })
      return
    }
    const tl = gsap.timeline({ delay: 0.12 })
    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.11,
      ease: "power3.out",
    })
    return () => {
      tl.kill()
    }
  }, [ready])

  useEffect(() => {
    if (prefersReduced()) return
    const el = root.current
    if (!el) return
    const tween = gsap.to(".hero__bg", {
      yPercent: 14,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__inner">
        <div>
          <div className="hero__roles" data-hero>
            <span className="hero__role">Graphic Designer</span>
            <span className="hero__role">Video Editor</span>
          </div>
          <h1 className="hero__title" data-hero>
            Sail <em>Dhadve</em>
          </h1>
          <p className="hero__lead" data-hero>
            Creating impactful visual content and brand-focused designs — from
            concept to final execution, with 4+ years of professional experience
            across branding, social media and multimedia production.
          </p>
        </div>
        <div className="hero__portrait" data-hero>
          <img src="/assets/char/avatar_intro.png" alt="Sail Dhadve" />
        </div>
      </div>
      <button
        className="hero__scroll"
        onClick={() => scrollToId("hello")}
        aria-label="Scroll to content"
      >
        <span>Scroll</span>
        <i aria-hidden="true" />
      </button>
    </section>
  )
}
