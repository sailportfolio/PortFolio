import { PROFILE } from "../data/content"
import { scrollToTop } from "../lib/scroll"

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} <b>{PROFILE.name}</b> — Graphic Designer &amp;
        Video Editor
      </span>
      <button
        className="footer__up"
        onClick={() => window.dispatchEvent(new Event("sd:replay"))}
      >
        ▶ Replay Intro
      </button>
      <button className="footer__up" onClick={scrollToTop}>
        Back to top ↑
      </button>
    </footer>
  )
}
