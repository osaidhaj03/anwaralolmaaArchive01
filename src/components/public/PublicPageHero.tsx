import type { ReactNode } from 'react'

type PublicPageHeroProps = {
  children?: ReactNode
  className: string
  description: string
  title: string
  breadcrumb: string
}

export function PublicPageHero({ breadcrumb, children, className, description, title }: PublicPageHeroProps) {
  return (
    <section className={`${className} islamic-soft-pattern`}>
      <div className={`public-container ${className}__inner`}>
        <span>{breadcrumb}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  )
}
