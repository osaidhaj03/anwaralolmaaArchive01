import type { LucideIcon } from 'lucide-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'

type CategoryCardProps = {
  category: {
    books: number
    courses: number
    icon: LucideIcon
    id: string
    lessons: number
    text: string
    title: string
    imageUrl?: string
    parentTitle?: string
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { dir, language } = useLanguage()
  const Icon = category.icon
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <Link className="category-page-card" to={`/categories/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="category-page-card__head">
        <span className="category-page-card__icon">
          {category.imageUrl ? (
            <img src={category.imageUrl} alt={category.title} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
          ) : (
            <Icon size={30} />
          )}
        </span>
        <h2>{category.title}</h2>
      </div>
      
      {category.parentTitle && (
        <span
          style={{
            fontSize: '11px',
            color: '#c5a059',
            display: 'block',
            marginTop: '-6px',
            marginBottom: '8px',
            fontWeight: 700,
          }}
        >
          {language === 'ar' ? `فرعي من: ${category.parentTitle}` : `Subcategory of: ${category.parentTitle}`}
        </span>
      )}

      <p>{category.text}</p>
      <div className="category-page-card__stats">
        <span><strong>{category.courses}</strong>{language === 'ar' ? 'دورة' : 'Courses'}</span>
        <span><strong>{category.lessons}</strong>{language === 'ar' ? 'درس' : 'Lessons'}</span>
        <span><strong>{category.books}</strong>{language === 'ar' ? 'كتاب' : 'Books'}</span>
      </div>
      <div className="category-page-card__action">
        {language === 'ar' ? 'استعراض القسم' : 'Explore category'}
        <ArrowIcon size={16} />
      </div>
    </Link>
  )
}
