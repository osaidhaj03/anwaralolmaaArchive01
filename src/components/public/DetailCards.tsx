import type { ReactNode } from 'react'
import { DetailInfoList } from './DetailInfoList'
import { DetailRelatedLinks } from './DetailRelatedLinks'

type DetailInfoItem = {
  label: string
  value: ReactNode
}

type DetailRelatedItem = {
  description: string
  title: string
  to: string
}

type DetailTextCardProps = {
  className: string
  title: string
  children: ReactNode
}

type DetailInfoCardProps = {
  cardClassName: string
  listClassName: string
  items: DetailInfoItem[]
}

type DetailRelatedCardProps = {
  cardClassName: string
  linkClassName: string
  items: DetailRelatedItem[]
  title: string
}

export function DetailTextCard({ children, className, title }: DetailTextCardProps) {
  return (
    <article className={className}>
      <h2>{title}</h2>
      {children}
    </article>
  )
}

export function DetailInfoCard({ cardClassName, items, listClassName }: DetailInfoCardProps) {
  return (
    <article className={cardClassName}>
      <DetailInfoList className={listClassName} items={items} />
    </article>
  )
}

export function DetailRelatedCard({ cardClassName, items, linkClassName, title }: DetailRelatedCardProps) {
  return (
    <article className={cardClassName}>
      <h2>{title}</h2>
      <DetailRelatedLinks className={linkClassName} items={items} />
    </article>
  )
}
