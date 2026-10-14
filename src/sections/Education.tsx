import Banner from "../components/Banner"
import { useReveal } from "../hooks/useReveal"
import { EDUCATION } from "../data/content"

export default function Education() {
  const grid = useReveal<HTMLDivElement>({
    childSelector: "[data-r]",
    y: 64,
    stagger: 0.16,
  })

  return (
    <section className="section" id="education">
      <Banner index="02">My Education</Banner>
      <div className="edu__grid" ref={grid}>
        {EDUCATION.map((e, i) => (
          <figure className="edu__card" data-r key={i}>
            <span className="edu__tape" aria-hidden="true" />
            <div className="edu__img">
              <img src={e.img} alt={e.school} loading="lazy" />
            </div>
            <figcaption className="edu__cap">
              <h3>{e.school}</h3>
              <span>{e.years}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
