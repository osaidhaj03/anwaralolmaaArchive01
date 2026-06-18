import { useMemo, useState } from 'react'
import { BookOpen, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CourseLesson } from '../../context/ArchiveDataContext'
import type { Language } from '../../context/LanguageContext'
import { CourseMaterialsCard } from './CourseMaterialsCard'
import { WatchLessonInfo } from './WatchLessonInfo'
import { WatchPlaylistSidebar } from './WatchPlaylistSidebar'
import { WatchVideoPlayer } from './WatchVideoPlayer'

const WATCH_VIDEO_URLS = [
  'https://www.youtube.com/embed/I9ojAAgoWe8?controls=1',
  'https://www.youtube.com/embed/3nFAgNKC_Gg?controls=1',
]

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
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [isMaterialsPopupOpen, setIsMaterialsPopupOpen] = useState(false)
  const activeEmbedUrl = useMemo(() => WATCH_VIDEO_URLS[activeLessonIndex % WATCH_VIDEO_URLS.length], [activeLessonIndex])

  return (
    <section className="public-container course-detail-layout youtube-style">
      <div className="course-detail-main">
        <WatchVideoPlayer embedUrl={activeEmbedUrl} />

        <WatchLessonInfo category={course.category} courseTitle={course.title} language={language} teacher={course.teacher} />

        <button
          type="button"
          className="mobile-materials-trigger"
          onClick={() => setIsMaterialsPopupOpen(true)}
        >
          <BookOpen size={18} />
          <span>{materialsTitle}</span>
        </button>

        <CourseMaterialsCard materials={materials} openLabel={openLabel} title={materialsTitle} />
      </div>

      <WatchPlaylistSidebar
        courseTeacher={course.teacher}
        courseThumbnail={course.thumbnail}
        courseTitle={course.title}
        courseTone={course.tone}
        language={language}
        lessonCountLabel={lessonCountLabel}
        activeLessonIndex={activeLessonIndex}
        onSelectLesson={setActiveLessonIndex}
        storedLessons={storedLessons}
      />

      {isMaterialsPopupOpen && (
        <div className="mobile-materials-modal" role="dialog" aria-modal="true" aria-label={materialsTitle}>
          <button
            type="button"
            className="mobile-materials-backdrop"
            aria-label="Close materials"
            onClick={() => setIsMaterialsPopupOpen(false)}
          />
          <div className="mobile-materials-sheet">
            <div className="mobile-materials-head">
              <div>
                <span>{language === 'ar' ? 'PDF' : 'PDF'}</span>
                <h3>{materialsTitle}</h3>
              </div>
              <button type="button" aria-label="Close materials" onClick={() => setIsMaterialsPopupOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="mobile-materials-list">
              {materials.map(({ icon: Icon, meta, title }) => (
                <article key={title}>
                  <span className="mobile-materials-icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <small>{meta}</small>
                  </div>
                  <button type="button">{openLabel}</button>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
