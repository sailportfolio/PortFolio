import type Lenis from "lenis"

let lenis: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  lenis = l
}

export const getLenis = () => lenis

export const scrollToId = (id: string, offset = -60) => {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.15 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: "smooth" })
  }
}

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { duration: 1.1 })
  else window.scrollTo({ top: 0, behavior: "smooth" })
}
