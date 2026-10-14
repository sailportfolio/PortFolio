import { useCallback, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { prefersReduced } from "../hooks/useReveal"

const SESSION_KEY = "sd_intro_played_v1"
const NAME = "SAIL DHADVE"

type Props = {
  onComplete: () => void
  onStart?: () => void
}

export default function Preloader({ onComplete, onStart }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const finishing = useRef(false)
  const [visible, setVisible] = useState(true)

  const finish = useCallback(
    (immediate = false) => {
      if (finishing.current) return
      finishing.current = true
      sessionStorage.setItem(SESSION_KEY, "1")

      const el = root.current
      if (immediate || !el) {
        setVisible(false)
        onComplete()
        return
      }
      const out = gsap.timeline({
        onComplete: () => {
          setVisible(false)
          finishing.current = false
        },
      })
      out
        .to(".preloader__ui", { opacity: 0, duration: 0.35, ease: "power2.out" })
        .add(() => onComplete())
        .to(
          el,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.15",
        )
    },
    [onComplete],
  )

  const build = useCallback(() => {
    const el = root.current
    if (!el) return
    tl.current?.kill()
    finishing.current = false
    gsap.set(el, { clipPath: "inset(0 0 0% 0)" })

    if (prefersReduced()) {
      gsap.set(el.querySelectorAll(".preloader__ui, .preloader__name span"), {
        opacity: 1,
        clearProps: "transform",
      })
      gsap.set(".preloader__bg", { opacity: 1, scale: 1 })
      const t = gsap.delayedCall(1.4, () => finish())
      tl.current = gsap.timeline().add(t)
      return
    }

    const streaks = gsap.utils.toArray<HTMLElement>(".preloader__streak")
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })

    timeline
      .to(".preloader__bg", { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0)
      .fromTo(
        streaks,
        { opacity: 0, xPercent: -14, scaleX: 0.4 },
        {
          opacity: 1,
          xPercent: 14,
          scaleX: 1,
          duration: 1.1,
          stagger: 0.09,
          ease: "power2.inOut",
        },
        0,
      )
      .to(streaks, { opacity: 0, duration: 0.7, stagger: 0.05 }, 0.95)
      .fromTo(
        ".preloader__char",
        { opacity: 0, scale: 0.82, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
        0.65,
      )
      .fromTo(
        ".preloader__name span",
        { opacity: 0, yPercent: 130, rotate: 8 },
        {
          opacity: 1,
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          stagger: 0.045,
          ease: "power4.out",
        },
        1.0,
      )
      .fromTo(
        ".preloader__label--l",
        { opacity: 0, x: -46 },
        { opacity: 1, x: 0, duration: 0.7 },
        1.65,
      )
      .fromTo(
        ".preloader__label--r",
        { opacity: 0, x: 46 },
        { opacity: 1, x: 0, duration: 0.7 },
        1.65,
      )
      .fromTo(
        ".preloader__tag, .preloader__controls",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.9,
      )
      .to(".preloader__bar i", { width: "100%", duration: 3.0, ease: "none" }, 0.4)

    if (!new URLSearchParams(location.search).has("hold")) {
      timeline.add(() => finish(), "+=0.5")
    }

    tl.current = timeline
  }, [finish])

  // initial run
  useEffect(() => {
    const played = sessionStorage.getItem(SESSION_KEY)
    if (played) {
      setVisible(false)
      onComplete()
      return
    }
    onStart?.()
    build()
    return () => {
      tl.current?.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // replay support
  useEffect(() => {
    const handler = () => {
      sessionStorage.removeItem(SESSION_KEY)
      setVisible(true)
      onStart?.()
      requestAnimationFrame(() => build())
    }
    window.addEventListener("sd:replay", handler)
    return () => window.removeEventListener("sd:replay", handler)
  }, [build, onStart])

  if (!visible) return null

  return (
    <div className="preloader" ref={root} aria-label="Intro animation">
      <div className="preloader__bg" />
      <div className="preloader__streaks" aria-hidden="true">
        <span className="preloader__streak" style={{ top: "18%" }} />
        <span className="preloader__streak" style={{ top: "31%" }} />
        <span className="preloader__streak" style={{ top: "44%" }} />
        <span className="preloader__streak" style={{ top: "57%" }} />
        <span className="preloader__streak" style={{ top: "70%" }} />
        <span className="preloader__streak" style={{ top: "82%" }} />
      </div>
      <div className="preloader__vig" />

      <div className="preloader__ui" style={{ display: "contents" }}>
        <span className="preloader__label preloader__label--l">
          Graphic Designer
        </span>
        <span className="preloader__label preloader__label--r">
          Video Editor
        </span>

        <div className="preloader__stage">
          <h1 className="preloader__name" aria-label={NAME}>
            {NAME.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i} className="space">
                  &nbsp;
                </span>
              ) : (
                <span key={i}>{ch}</span>
              ),
            )}
          </h1>
          <div className="preloader__char">
            <img src="/assets/char/avatar_intro.png" alt="" />
          </div>
        </div>

        <span className="preloader__tag">Portfolio — 2025</span>
        <div className="preloader__controls">
          <button className="preloader__skip" onClick={() => finish()}>
            Skip Intro
          </button>
        </div>
      </div>

      <div className="preloader__bar" aria-hidden="true">
        <i />
      </div>
    </div>
  )
}
