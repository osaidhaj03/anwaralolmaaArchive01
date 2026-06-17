import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { PublicSectionHeading } from './PublicSectionHeading'

type PreviewCategory = {
  id: string
  title: string
  text: string
  icon: ComponentType<{ size?: number }>
}

type PreviewCourse = {
  title: string
  teacher: string
  lessons: string
  tone: string
}

type PreviewScholar = {
  name: string
  image: string
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
      items: PreviewCourse[]
    }
  | {
      kind: 'scholars'
      title: string
      link: string
      linkTo: string
      items: PreviewScholar[]
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
        <div className="public-container courses-row">
          {props.items.map((course, index) => (
            <Link className="course-card" key={course.title} to={`/courses/${index + 1}`}>
              <div className={`course-cover tone-${course.tone}`}>
                <span>{course.title}</span>
              </div>
              <div>
                <h3>{course.title}</h3>
                <p>{course.teacher}</p>
                <small>{course.lessons}</small>
              </div>
            </Link>
          ))}
        </div>
      ) : null}

      {props.kind === 'scholars' ? (
        <div className="public-container scholars-row">
          {props.items.map((scholar, index) => (
            <Link className="scholar-card" key={scholar.name} to={`/scholars/${index + 1}`}>
              <img alt={scholar.name} src={scholar.image} />
              <strong>{scholar.name}</strong>
            </Link>
          ))}
        </div>
      ) : null}

      {props.kind === 'books' ? (
        <div className="public-container book-row">
          {props.items.map((book, index) => (
            <Link className="book-card" key={book.title} to={`/library/${index + 1}`}>
              <div />
              <h3>{book.title}</h3>
              <p>{props.meta}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  )
}
