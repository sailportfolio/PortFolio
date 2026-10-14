import Banner from "../components/Banner"
import { useReveal } from "../hooks/useReveal"
import { BIO, TOOLS } from "../data/content"

export default function Hello() {
  const grid = useReveal<HTMLDivElement>({ childSelector: "[data-r]", y: 54 })

  return (
    <section className="section" id="hello">
      <Banner index="01">Hello I'm a</Banner>
      <div className="hello__grid" ref={grid}>
        <div className="hello__media" data-r>
          <span className="hello__badge">4+ Years Experience</span>
          <img src="/assets/char/avatar_intro.png" alt="Sail Dhadve" />
        </div>
        <div className="hello__body" data-r>
          <p>
            {BIO.map((seg, i) =>
              seg.h ? <mark key={i}>{seg.t}</mark> : <span key={i}>{seg.t}</span>,
            )}
          </p>
          <ul className="hello__tools">
            {TOOLS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
