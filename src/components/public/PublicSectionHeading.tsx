import { Link } from 'react-router-dom'

type PublicSectionHeadingProps = {
  link?: string
  linkTo?: string
  title: string
}

export function PublicSectionHeading({ link, linkTo, title }: PublicSectionHeadingProps) {
  return (
    <div className="public-container section-heading">
      <h2>{title}</h2>
      {link && linkTo ? <Link to={linkTo}>{link}</Link> : null}
    </div>
  )
}
