import type { LucideIcon } from 'lucide-react'
import type { CourseLesson } from '../../context/ArchiveDataContext'
import type { Language } from '../../context/LanguageContext'
import { CourseMaterialsCard } from './CourseMaterialsCard'
import { WatchLessonInfo } from './WatchLessonInfo'
import { WatchPlaylistSidebar } from './WatchPlaylistSidebar'
import { WatchVideoPlayer } from './WatchVideoPlayer'

type CourseDetailCourse = {
  category: string
  teacher: string
  thumbnail: string
  title: string
  tone: string
}

type CourseMaterial = {
  icon: LucideIcon
  meta: string
  title: string
}

type CourseDetailWatchLayoutProps = {
  course: CourseDetailCourse
  language: Language
  lessonCountLabel: string
  materials: CourseMaterial[]
  materialsTitle: string
  openLabel: string
  storedLessons: CourseLesson[]
}

export function CourseDetailWatchLayout({ course, language, lessonCountLabel, materials, materialsTitle, openLabel, storedLessons }: CourseDetailWatchLayoutProps) {
  return (
    <section className="public-container course-detail-layout youtube-style">
      <div className="course-detail-main">
        <WatchVideoPlayer />

        <WatchLessonInfo category={course.category} courseTitle={course.title} language={language} teacher={course.teacher} />

        <CourseMaterialsCard materials={materials} openLabel={openLabel} title={materialsTitle} />
      </div>

      <WatchPlaylistSidebar
        courseTeacher={course.teacher}
        courseThumbnail={course.thumbnail}
        courseTitle={course.title}
        courseTone={course.tone}
        language={language}
        lessonCountLabel={lessonCountLabel}
        storedLessons={storedLessons}
      />
    </section>
  )
}
