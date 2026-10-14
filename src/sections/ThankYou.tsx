import { useReveal } from "../hooks/useReveal"
import { PROFILE } from "../data/content"

export default function ThankYou() {
  const inner = useReveal<HTMLDivElement>({
    childSelector: "[data-r]",
    y: 60,
    stagger: 0.13,
  })

  return (
    <section className="thanks" id="contact">
      <div className="thanks__bg" aria-hidden="true" />
      <div className="thanks__inner" ref={inner}>
        <h2 className="thanks__word" data-r>
          Thank <span>You</span>
        </h2>
        <div className="thanks__char" data-r>
          <img src="/assets/char/avatar_thanks.png" alt="Sail Dhadve" />
        </div>
        <div className="thanks__contact" data-r>
          <a href={PROFILE.phoneHref}>
            <small>Phone</small>
            <b>{PROFILE.phone}</b>
          </a>
          <a href={PROFILE.emailHref}>
            <small>Email</small>
            <b>{PROFILE.email}</b>
          </a>
        </div>
      </div>
    </section>
  )
}
