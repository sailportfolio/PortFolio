import { useEffect, useState } from "react"
import { NAV_ITEMS, PROFILE } from "../data/content"
import { scrollToId, scrollToTop } from "../lib/scroll"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y > last && y > 400) setHidden(true)
      else setHidden(false)
      last = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // scroll spy
  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      Boolean,
    ) as HTMLElement[]
    if (!sections.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={`nav ${scrolled ? "is-scrolled" : ""} ${
        hidden && !open ? "is-hidden" : ""
      } ${open ? "is-open" : ""}`}
    >
      <a
        className="nav__brand"
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          scrollToTop()
        }}
      >
        <span className="nav__mark" aria-hidden="true">
          S
        </span>
        <span>
          SAIL <b>DHADVE</b>
        </span>
      </a>

      <nav aria-label="Primary">
        <ul className="nav__links">
          {NAV_ITEMS.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={active === n.id ? "is-active" : ""}
                style={active === n.id ? { color: "#fff" } : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  go(n.id)
                }}
              >
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={PROFILE.emailHref}
              className="btn btn--solid"
              style={{ padding: "11px 22px" }}
            >
              Hire Me
            </a>
          </li>
        </ul>
      </nav>

      <button
        className="nav__toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
