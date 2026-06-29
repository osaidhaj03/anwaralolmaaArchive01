import { useEffect, useMemo, useState } from 'react'
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
  const [activeLessonIndex, setActiveLessonIndex] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const lessonParam = params.get('lesson')
      if (lessonParam) {
        const val = parseInt(lessonParam, 10)
        if (!isNaN(val) && val >= 1 && val <= storedLessons.length) {
          return val - 1
        }
      }
    } catch (e) {}
    return 0
  })
  const [activeVideoLinkIndex, setActiveVideoLinkIndex] = useState(0)
  const [isMaterialsPopupOpen, setIsMaterialsPopupOpen] = useState(false)

  const handleSelectLesson = (idx: number) => {
    setActiveLessonIndex(idx)
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('lesson', String(idx + 1))
      window.history.replaceState({}, '', url.toString())
    } catch (e) {}
  }

  // Reset video source index when lesson changes
  useEffect(() => {
    setActiveVideoLinkIndex(0)
  }, [activeLessonIndex])

  const activeLesson = storedLessons[activeLessonIndex]
  const videoLinks = activeLesson?.videoLinks || []
  
  const activeVideoUrl = useMemo(() => {
    if (videoLinks[activeVideoLinkIndex]?.url) {
      return videoLinks[activeVideoLinkIndex].url
    }
    return WATCH_VIDEO_URLS[activeLessonIndex % WATCH_VIDEO_URLS.length]
  }, [activeLessonIndex, activeVideoLinkIndex, videoLinks])

  const activeLinkType = videoLinks[activeVideoLinkIndex]?.type || 'video'

  return (
    <section className="public-container course-detail-layout youtube-style">
      <div className="course-detail-main">
        <WatchVideoPlayer videoUrl={activeVideoUrl} poster={activeLesson?.thumbnail} type={activeLinkType} />

        {/* Video switcher toolbar if multiple streaming URLs are present */}
        {videoLinks.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginRight: '8px' }}>
              {language === 'ar' ? 'سيرفر المشاهدة والتحميل:' : 'Streaming Server:'}
            </span>
            {videoLinks.map((link, idx) => (
              <button
                key={`stream-${idx}`}
                type="button"
                onClick={() => setActiveVideoLinkIndex(idx)}
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  borderRadius: '6px',
                  border: activeVideoLinkIndex === idx ? 'none' : '1px solid #cbd5e1',
                  background: activeVideoLinkIndex === idx ? 'var(--color-gold, #c5a880)' : '#fff',
                  color: activeVideoLinkIndex === idx ? '#fff' : '#475569',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {link.label || `سيرفر ${idx + 1}`}
              </button>
            ))}
          </div>
        )}

        <WatchLessonInfo
          category={course.category}
          courseTitle={course.title}
          language={language}
          teacher={course.teacher}
          activeLesson={activeLesson}
        />

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
        onSelectLesson={handleSelectLesson}
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
