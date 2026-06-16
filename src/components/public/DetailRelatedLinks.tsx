import { Link } from 'react-router-dom'

type DetailRelatedLinksProps = {
  className: string
  items: Array<{
    description: string
    title: string
    to: string
  }>
}

export function DetailRelatedLinks({ className, items }: DetailRelatedLinksProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <Link key={`${item.to}-${item.title}`} to={item.to}>
          <strong>{item.title}</strong>
          <span>{item.description}</span>
        </Link>
      ))}
    </div>
  )
}
