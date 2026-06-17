import { Link } from 'react-router-dom'

type ScholarAboutHeroProps = {
  backLabel: string
  breadcrumb: string
  field: string
  image: string
  name: string
  profileLabel: string
  profileTo: string
  title: string
}

export function ScholarAboutHero({ backLabel, breadcrumb, field, image, name, profileLabel, profileTo, title }: ScholarAboutHeroProps) {
  return (
    <section className="scholar-profile-hero islamic-soft-pattern">
      <div className="public-container scholar-profile-hero__inner">
        <span>{breadcrumb}</span>
        <div className="scholar-profile-head">
          <div className="scholar-profile-copy">
            <small>{field}</small>
            <h1>{title}</h1>
            <p>{name}</p>
            <div className="scholar-profile-actions">
              <Link to={profileTo}>{profileLabel}</Link>
              <Link to="/scholars">{backLabel}</Link>
            </div>
          </div>
          <div className="scholar-profile-photo-card">
            <img alt={name} src={image} />
          </div>
        </div>
      </div>
    </section>
  )
}
