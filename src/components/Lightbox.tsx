import { useEffect } from "react"

type Item = { img: string; title?: string; tag?: string }

type Props = {
  items: Item[]
  index: number | null
  onClose: () => void
  onNav: (i: number) => void
}

export default function Lightbox({ items, index, onClose, onNav }: Props) {
  const open = index !== null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNav(((index as number) + 1) % items.length)
      if (e.key === "ArrowLeft")
        onNav(((index as number) - 1 + items.length) % items.length)
    }
    window.addEventListener("keydown", onKey)
    document.body.classList.add("is-locked")
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.classList.remove("is-locked")
    }
  }, [open, index, items.length, onClose, onNav])

  if (!open) return null
  const item = items[index as number]

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button className="lightbox__close" aria-label="Close" onClick={onClose}>
        ✕
      </button>
      {items.length > 1 && (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation()
              onNav(((index as number) - 1 + items.length) % items.length)
            }}
          >
            ‹
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation()
              onNav(((index as number) + 1) % items.length)
            }}
          >
            ›
          </button>
        </>
      )}
      <img
        className="lightbox__img"
        src={item.img}
        alt={item.title || "Project"}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
