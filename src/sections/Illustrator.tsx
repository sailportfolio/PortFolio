import { useState } from "react"
import Banner from "../components/Banner"
import Lightbox from "../components/Lightbox"
import { useReveal } from "../hooks/useReveal"
import { ILLUSTRATIONS } from "../data/content"

export default function Illustrator() {
  const grid = useReveal<HTMLDivElement>({
    childSelector: "[data-r]",
    y: 50,
    stagger: 0.09,
  })
  const [idx, setIdx] = useState<number | null>(null)

  return (
    <section className="section section--wide" id="illustrator">
      <Banner index="06">Illustrator</Banner>
      <div className="gallery gallery--ill" ref={grid}>
        {ILLUSTRATIONS.map((it, i) => (
          <figure
            className="tile"
            data-r
            key={it.img}
            onClick={() => setIdx(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setIdx(i)}
          >
            <img src={it.img} alt={it.title} loading="lazy" />
            <div className="tile__overlay">
              <span className="tile__tag">{it.title}</span>
            </div>
          </figure>
        ))}
      </div>
      <Lightbox
        items={ILLUSTRATIONS}
        index={idx}
        onClose={() => setIdx(null)}
        onNav={setIdx}
      />
    </section>
  )
}
