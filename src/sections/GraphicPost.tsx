import { useState } from "react"
import Banner from "../components/Banner"
import Lightbox from "../components/Lightbox"
import { useReveal } from "../hooks/useReveal"
import { GRAPHIC_POSTS } from "../data/content"

export default function GraphicPost() {
  const grid = useReveal<HTMLDivElement>({
    childSelector: "[data-r]",
    y: 50,
    stagger: 0.07,
  })
  const [idx, setIdx] = useState<number | null>(null)

  return (
    <section className="section section--wide" id="graphic-post">
      <Banner index="04">Graphic Post</Banner>
      <div className="gallery gallery--post" ref={grid}>
        {GRAPHIC_POSTS.map((p, i) => (
          <figure
            className="tile"
            data-r
            key={p.img}
            onClick={() => setIdx(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setIdx(i)}
          >
            <img src={p.img} alt={p.title} loading="lazy" />
            <div className="tile__overlay">
              <span className="tile__tag">
                {p.title} — {p.tag}
              </span>
            </div>
          </figure>
        ))}
      </div>
      <Lightbox
        items={GRAPHIC_POSTS}
        index={idx}
        onClose={() => setIdx(null)}
        onNav={setIdx}
      />
    </section>
  )
}
