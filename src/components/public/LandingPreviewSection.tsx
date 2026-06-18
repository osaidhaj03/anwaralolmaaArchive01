import { type ComponentType, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PublicSectionHeading } from './PublicSectionHeading'
import { ScholarCard } from './ScholarCard'
import { CourseCard } from './CourseCard'
import type { Scholar, CourseItem } from '../../data/public/pageTypes'

type PreviewCategory = {
  id: string
  title: string
  text: string
  icon: ComponentType<{ size?: number }>
}

type PreviewBook = {
  title: string
}

type LandingPreviewSectionProps =
  | {
    kind: 'categories'
    title: string
    link: string
    linkTo: string
    items: PreviewCategory[]
  }
  | {
    kind: 'courses'
    title: string
    link: string
    linkTo: string
    items: CourseItem[]
  }
  | {
    kind: 'scholars'
    title: string
    link: string
    linkTo: string
    items: Scholar[]
  }
  | {
    kind: 'books'
    title: string
    link: string
    linkTo: string
    items: PreviewBook[]
    meta: string
  }

export function LandingPreviewSection(props: LandingPreviewSectionProps) {
  const scholarsTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (props.kind !== 'scholars') return

    let active = true
    const updateScales = () => {
      if (!active) return
      const track = scholarsTrackRef.current
      if (track) {
        const cards = track.children
        const containerRect = track.parentElement?.getBoundingClientRect()
        if (containerRect) {
          const containerCenter = containerRect.left + containerRect.width / 2
          for (let i = 0; i < cards.length; i++) {
            const card = cards[i] as HTMLElement
            const cardRect = card.getBoundingClientRect()
            const cardCenter = cardRect.left + cardRect.width / 2
            const distanceFromCenter = Math.abs(containerCenter - cardCenter)

            // Non-linear scale: 1.7 at center, ~1.43 on sides, fading to 1.0
            const maxDistance = 1020
            const x = distanceFromCenter / maxDistance
            let scale = 1.0
            if (x < 1) {
              scale = 1.0 + 0.7 * Math.pow(1 - x, 0.7)
            }

            // Direct style transform, z-index, and transition updates
            const zIndex = Math.round(100 - distanceFromCenter / 5)
            card.style.transform = `scale(${scale})`
            card.style.zIndex = `${zIndex}`
            card.style.transition = 'transform 0.1s ease, z-index 0.1s ease'
          }
        }
      }
      requestAnimationFrame(updateScales)
    }

    requestAnimationFrame(updateScales)
    return () => {
      active = false
    }
  }, [props.kind])

  return (
    <section className="public-section" id={props.kind}>
      <PublicSectionHeading link={props.link} linkTo={props.linkTo} title={props.title} />

      {props.kind === 'categories' ? (
        <div className="public-container category-grid">
          {props.items.map((category) => {
            const Icon = category.icon
            return (
              <Link className="category-card" key={category.id} to={`/categories/${category.id}`}>
                <span>
                  <Icon size={28} />
                </span>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </Link>
            )
          })}
        </div>
      ) : null}

      {props.kind === 'courses' ? (
        <div className="public-container courses-marquee-wrapper">
          <div className="courses-marquee-track">
            {[...props.items, ...props.items].map((course, index) => (
              <CourseCard
                key={`${course.title}-${index}`}
                href={`/courses/${(index % props.items.length) + 1}`}
                course={course}
                showProgress={false}
              />
            ))}
          </div>
        </div>
      ) : null}

      {props.kind === 'scholars' ? (
        <div className="public-container scholars-marquee-wrapper">
          <div ref={scholarsTrackRef} className="scholars-marquee-track">
            {[...props.items, ...props.items].map((scholar, index) => (
              <ScholarCard
                key={`${scholar.name}-${index}`}
                aboutTo={`/scholars/${(index % props.items.length) + 1}`}
                scholar={scholar}
              />
            ))}
          </div>
        </div>
      ) : null}

      {props.kind === 'books' ? (
        <div className="public-container book-row">
          {props.items.map((book, index) => (
            <Link className="book-card" key={book.title} to={`/library/${index + 1}`}>
              <div className="book-3d-wrapper">
                <div className="book-3d-container">
                  <div className="book-3d-cover-back" />
                  <div className="book-3d-pages" />
                  <div className="book-3d-cover-front">
                    <div className="book-3d-cover-ornament" />
                  </div>
                  <div className="book-3d-spine" />
                </div>
              </div>
              <h3>{book.title}</h3>
              <p>{props.meta}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  )
}
