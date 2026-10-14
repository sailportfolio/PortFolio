import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReduced } from "../hooks/useReveal"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
  index?: string
}

export default function Banner({ children, index }: Props) {
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const banner = el.querySelector(".banner")
    const line = el.querySelector(".banner-line")
    if (!banner) return

    if (prefersReduced()) {
      gsap.set([banner, line], { opacity: 1, clearProps: "all" })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    })
    tl.fromTo(
      banner,
      { clipPath: "inset(0 100% 0 0)", opacity: 0, x: -20 },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power4.out",
      },
    ).fromTo(
      line,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5",
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div className="banner-wrap" ref={wrap}>
      <div className="banner">
        {index && <span className="banner__index">{index}</span>}
        <span className="banner__dot" aria-hidden="true" />
        <h2 className="banner__text">{children}</h2>
      </div>
      <span className="banner-line" aria-hidden="true" />
    </div>
  )
}
