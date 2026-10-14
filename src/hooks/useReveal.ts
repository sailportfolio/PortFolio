import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  y?: number
  delay?: number
  duration?: number
  stagger?: number
  childSelector?: string
  start?: string
  scale?: number
}

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Scroll-triggered reveal. Animates the element itself, or its children
 * matched by `childSelector` (staggered). Cleans up its ScrollTrigger on unmount.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
) {
  const ref = useRef<T>(null)
  const {
    y = 46,
    delay = 0,
    duration = 0.95,
    stagger = 0.09,
    childSelector,
    start = "top 86%",
    scale,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets: Element[] = childSelector
      ? Array.from(el.querySelectorAll(childSelector))
      : [el]
    if (!targets.length) return

    if (prefersReduced()) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1, clearProps: "transform" })
      return
    }

    const from: gsap.TweenVars = { opacity: 0, y }
    if (scale !== undefined) from.scale = scale

    const tween = gsap.fromTo(targets, from, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start, once: true },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [y, delay, duration, stagger, childSelector, start, scale])

  return ref
}
