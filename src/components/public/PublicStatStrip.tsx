import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

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

function getStatLink(label: string): string {
  const text = label.toLowerCase();
  if (text.includes('course') || text.includes('دورة') || text.includes('student') || text.includes('طالب')) {
    return '/courses';
  }
  if (text.includes('lesson') || text.includes('درس') || text.includes('مقطع')) {
    return '/courses';
  }
  if (text.includes('scholar') || text.includes('شيخ') || text.includes('عالم') || text.includes('محاضر') || text.includes('lecturer')) {
    return '/scholars';
  }
  if (text.includes('book') || text.includes('كتاب') || text.includes('متن') || text.includes('library') || text.includes('مكتبة')) {
    return '/library';
  }
  if (text.includes('category') || text.includes('قسم') || text.includes('أقسام')) {
    return '/categories';
  }
  if (text.includes('fatwa') || text.includes('فتوى') || text.includes('فتاوى')) {
    return '/fatwa';
  }
  return '/courses';
}

export function PublicStatStrip({ className, iconSize = 23, items }: PublicStatStripProps) {
  return (
    <div className={className}>
      {items.map(({ icon: Icon, label, value }) => (
        <Link key={label} to={getStatLink(label)} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
          <div>
            <Icon size={iconSize} />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
