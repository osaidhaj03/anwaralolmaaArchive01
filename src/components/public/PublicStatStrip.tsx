import type { LucideIcon } from 'lucide-react'

type StatItem = {
  icon: LucideIcon
  label: string
  value: string
}

type PublicStatStripProps = {
  className: string
  items: StatItem[]
  iconSize?: number
}

export function PublicStatStrip({ className, iconSize = 23, items }: PublicStatStripProps) {
  return (
    <div className={className}>
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label}>
          <Icon size={iconSize} />
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
