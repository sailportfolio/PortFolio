import { useState } from "react"
import Banner from "../components/Banner"
import Lightbox from "../components/Lightbox"
import { useReveal } from "../hooks/useReveal"
import { VIDEO_CLIENTS, VIDEO_GROUPS, videoFrames } from "../data/content"

type Group = { name: string; frames: string[] }

function VeGroup({
  name,
  frames,
  base,
  onOpen,
}: Group & { base: number; onOpen: (i: number) => void }) {
  const ref = useReveal<HTMLDivElement>({
    childSelector: "[data-r]",
    y: 40,
    stagger: 0.035,
  })
  return (
    <div className="ve-group">
      <div className="ve-group__head">
        <h3>{name}</h3>
        <span aria-hidden="true" />
      </div>
      <div className="gallery gallery--video" ref={ref}>
        {frames.map((f, i) => (
          <figure
            className="tile"
            data-r
            key={f}
            onClick={() => onOpen(base + i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onOpen(base + i)}
          >
            <img src={f} alt={`${name} video edit`} loading="lazy" />
            <span className="tile__play" aria-hidden="true" />
            <div className="tile__overlay">
              <span className="tile__tag">Watch Reel</span>
            </div>
          </figure>
        ))}
      </div>
    </div>
  )
}

export default function VideosEdit() {
  const groups: Group[] = VIDEO_GROUPS.map((g) => ({
    name: g.name,
    frames: videoFrames(g.from, g.to),
  }))

  const all = groups.flatMap((g) => g.frames.map((img) => ({ img })))
  const bases: number[] = []
  let acc = 0
  groups.forEach((g) => {
    bases.push(acc)
    acc += g.frames.length
  })

  const [idx, setIdx] = useState<number | null>(null)

  return (
    <section className="section section--wide" id="videos-edit">
      <Banner index="05">Videos Edit</Banner>
      <p className="ve-intro">
        A selection of edited reels, promos and brand films — real estate,
        hospitality, resorts and lifestyle — cut for rhythm, story and impact.
      </p>
      <div className="ve-clients">
        {VIDEO_CLIENTS.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>

      {groups.map((g, gi) => (
        <VeGroup
          key={g.name}
          name={g.name}
          frames={g.frames}
          base={bases[gi]}
          onOpen={setIdx}
        />
      ))}

      <Lightbox
        items={all}
        index={idx}
        onClose={() => setIdx(null)}
        onNav={setIdx}
      />
    </section>
  )
}
