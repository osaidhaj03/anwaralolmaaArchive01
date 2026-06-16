import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../AdminIcons'
import { DetailInfoList } from './DetailInfoList'

type CourseSummaryCardProps = {
  course: {
    category: string
    level: string
    progress: number
    rating: string
    teacher: string
    title: string
  }
  ctaLabel: string
  ctaTo: string
  labels: {
    category: string
    level: string
    progress: string
    rating: string
    teacher: string
  }
}

export function CourseSummaryCard({ course, ctaLabel, ctaTo, labels }: CourseSummaryCardProps) {
  return (
    <div className="course-detail-summary">
      <BrandMark />
      <h2>{course.title}</h2>
      <p>{course.teacher}</p>
      <div className="course-progress">
        <span style={{ width: `${course.progress}%` }} />
      </div>
      <small>{labels.progress}: {course.progress}%</small>
      <DetailInfoList
        className=""
        items={[
          { label: labels.teacher, value: course.teacher },
          { label: labels.level, value: course.level },
          { label: labels.category, value: course.category },
          { label: labels.rating, value: course.rating },
        ]}
      />
      <Link to={ctaTo}><Play size={16} />{ctaLabel}</Link>
    </div>
  )
}
