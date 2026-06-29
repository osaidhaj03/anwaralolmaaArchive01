import { type ComponentType, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Image, LibraryBig, Newspaper, PenLine } from 'lucide-react'
import { PublicSectionHeading } from './PublicSectionHeading'
import { ScholarCard } from './ScholarCard'
import { CourseCard } from './CourseCard'
import type { Scholar, CourseItem } from '../../data/public/pageTypes'

type PreviewCategory = {
  id: string
  title: string
  text: string
  icon: ComponentType<{ size?: number }>
  imageUrl?: string
}

type PreviewBook = {
  title: string
}

type InfoItem = {
  author?: string
  date?: string
  image?: string
  meta?: string
  text: string
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
  | {
    kind: 'articles' | 'digital-library' | 'gallery' | 'news'
    title: string
    link: string
    linkTo: string
    items: InfoItem[]
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
                  {category.imageUrl ? (
                    <img src={category.imageUrl} alt={category.title} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                  ) : (
                    <Icon size={28} />
                  )}
                </span>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </Link>
            )
          })}
        </div>
      ) : null}

      {props.kind === 'courses' ? (
        <div className="public-container landing-courses-rail">
          {props.items.map((course, index) => (
            <div className="landing-course-card-wrap" key={course.title}>
              <CourseCard href={`/courses/${index + 1}`} course={course} showProgress={false} />
            </div>
          ))}
        </div>
      ) : null}

      {props.kind === 'scholars' ? (
        <div className="public-container landing-scholars-strip">
          {props.items.map((scholar, index) => (
            <ScholarCard key={scholar.name} aboutTo={`/scholars/${index + 1}`} scholar={scholar} />
          ))}
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

      {props.kind === 'news' ? (
        <div className="public-container landing-news-list">
          {props.items.map((item) => (
            <Link className="landing-news-item" key={item.title} to={props.linkTo}>
              <small>{item.date ?? item.meta}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
      ) : null}

      {isInfoSection(props) && props.kind !== 'news' ? (
        <div className={`public-container landing-info-grid landing-info-grid--${props.kind}`}>
          {props.items.map((item, index) => (
            <Link className="landing-info-card" key={item.title} to={props.linkTo}>
              {renderInfoMedia(props.kind, item, index)}
              {props.kind === 'gallery' ? null : (
                <div className="landing-info-card__body">
                  <small>{item.meta ?? item.author ?? item.date}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function isInfoSection(props: LandingPreviewSectionProps): props is Extract<LandingPreviewSectionProps, { kind: 'articles' | 'digital-library' | 'gallery' | 'news' }> {
  return props.kind === 'articles' || props.kind === 'digital-library' || props.kind === 'gallery' || props.kind === 'news'
}

function renderInfoMedia(kind: 'articles' | 'digital-library' | 'gallery' | 'news', item: InfoItem, index: number): ReactNode {
  if (kind === 'gallery') {
    return (
      <div className={`landing-info-card__media landing-info-card__media--photo tone-${index % 4}`}>
        {item.image ? <img alt="" src={item.image} /> : <Image size={30} />}
      </div>
    )
  }

  const Icon = kind === 'articles' ? PenLine : kind === 'digital-library' ? LibraryBig : CalendarDays
  const accent = kind === 'news' ? <Newspaper size={20} /> : <Icon size={22} />

  return (
    <div className={`landing-info-card__media landing-info-card__media--icon tone-${index % 4}`}>
      {accent}
    </div>
  )
}
