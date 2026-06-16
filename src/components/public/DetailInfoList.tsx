import type { ReactNode } from 'react'

type DetailInfoItem = {
  label: string
  value: ReactNode
}

type DetailInfoListProps = {
  className: string
  items: DetailInfoItem[]
}

export function DetailInfoList({ className, items }: DetailInfoListProps) {
  return (
    <dl className={className}>
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
