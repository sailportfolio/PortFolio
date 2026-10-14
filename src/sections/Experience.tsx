import Banner from "../components/Banner"
import { useReveal } from "../hooks/useReveal"
import { EXPERIENCE } from "../data/content"

export default function Experience() {
  const grid = useReveal<HTMLDivElement>({
    childSelector: "[data-r]",
    y: 60,
    stagger: 0.16,
  })

  return (
    <section className="section" id="experience">
      <Banner index="03">Experience</Banner>
      <div className="exp__grid" ref={grid}>
        {EXPERIENCE.map((x, i) => (
          <article className="exp__card" data-r key={i}>
            <span className="exp__period">{x.period}</span>
            <h3>{x.company}</h3>
            <p className="exp__role">{x.role}</p>
            <p>{x.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
