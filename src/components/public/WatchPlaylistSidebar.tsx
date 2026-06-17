import { CheckCircle2, Lock, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Language } from '../../context/LanguageContext'

type WatchPlaylistSidebarProps = {
  courseTeacher: string
  courseTitle: string
  courseTone: string
  language: Language
  lessonCountLabel: string
  storedLessons: { title: string; duration: string; locked: boolean }[]
}

export function WatchPlaylistSidebar({
  courseTeacher,
  courseTitle,
  courseTone,
  language,
  lessonCountLabel,
  storedLessons,
}: WatchPlaylistSidebarProps) {
  return (
    <aside className="course-outline-card playlist-sidebar">
      <div className="playlist-header">
        <div className="playlist-header-top">
          <h2>{courseTitle}</h2>
          <span className="expand-dropdown-label">{language === 'ar' ? 'توسيع الكل' : 'Expand All'} ▾</span>
        </div>
        <span className="playlist-count">{lessonCountLabel}</span>
      </div>
      <div className="playlist-lessons-container">
        <div className="playlist-lessons-list">
          {storedLessons.map((lesson, idx) => {
            const isActive = idx === 2; // Make 3rd item active
            const isLocked = lesson.locked;
            const isCompleted = idx < 2;

            return (
              <Link
                to="/login"
                key={lesson.title}
                className={`playlist-lesson-item ${isActive ? 'is-active' : ''} ${isLocked ? 'is-locked' : ''}`}
              >
                <div className="playlist-lesson-item__left">
                  {isActive && <div className="active-indicator-bar" />}
                  <div className={`playlist-lesson-thumbnail tone-${courseTone}`}>
                    <Play size={12} className="play-hover-icon" fill="currentColor" />
                    <span className="duration-badge">{lesson.duration}</span>
                  </div>
                  <div className="playlist-lesson-info">
                    <h4>
                      {language === 'ar'
                        ? `${idx + 1}. ${lesson.title.includes('Course introduction') ? 'مقدمة الدورة والتعريف بالكتاب' : lesson.title.replace('Lesson', 'الدرس')}`
                        : `${idx + 1}. ${lesson.title}`}
                    </h4>
                    <p>{courseTeacher}</p>
                  </div>
                </div>
                <div className="playlist-lesson-status">
                  {isActive ? (
                    <span className="playing-bars">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  ) : isLocked ? (
                    <Lock size={14} className="status-icon locked" />
                  ) : isCompleted ? (
                    <CheckCircle2 size={15} className="status-icon completed" />
                  ) : (
                    <span className="status-icon pending-dot" />
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      <button type="button" className="show-more-lessons-btn">
        {language === 'ar' ? 'عرض المزيد من الدروس ▾' : 'Show more lessons ▾'}
      </button>
    </aside>
  )
}
