import { CheckCircle2, ChevronDown, ChevronUp, Lock, MoreVertical, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Language } from '../../context/LanguageContext'

type WatchPlaylistSidebarProps = {
  activeLessonIndex: number
  courseTeacher: string
  courseThumbnail: string
  courseTitle: string
  courseTone: string
  language: Language
  lessonCountLabel: string
  onSelectLesson: (index: number) => void
  storedLessons: { title: string; duration: string; locked: boolean }[]
}

export function WatchPlaylistSidebar({
  activeLessonIndex,
  courseTeacher,
  courseThumbnail,
  courseTitle,
  courseTone,
  language,
  lessonCountLabel,
  onSelectLesson,
  storedLessons,
}: WatchPlaylistSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const playlistTiming = useMemo(() => {
    const durations = storedLessons.map((lesson) => parseDuration(lesson.duration))
    const totalSeconds = durations.reduce((sum, seconds) => sum + seconds, 0)
    const elapsedSeconds = durations.slice(0, activeLessonIndex + 1).reduce((sum, seconds) => sum + seconds, 0)
    const percent = totalSeconds > 0 ? Math.min(100, Math.round((elapsedSeconds / totalSeconds) * 100)) : 0

    return {
      elapsed: formatDuration(elapsedSeconds),
      percent,
      remaining: `- ${formatDuration(Math.max(totalSeconds - elapsedSeconds, 0))}`,
      total: formatDuration(totalSeconds),
    }
  }, [activeLessonIndex, storedLessons])

  function getLessonTitle(lessonTitle: string) {
    const title = language === 'ar'
      ? lessonTitle.includes('Course introduction')
        ? 'مقدمة الدورة والتعريف بالكتاب'
        : lessonTitle.replace('Lesson', 'الدرس')
      : lessonTitle

    return title.replace(/^\s*\d+\.\s*/, '').replace(/\s*\.\s*\d+\s*$/, '')
  }

  return (
    <aside className={`course-outline-card playlist-sidebar ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="playlist-header">
        <div className="playlist-header-top">
          <div>
            <h2>{courseTitle}</h2>
            <span className="playlist-channel">{courseTeacher} | Anwar Alolamaa - {lessonCountLabel}</span>
          </div>
          <div className="playlist-window-actions">
            <MoreVertical size={20} />
            <button
              type="button"
              className="playlist-collapse-btn"
              aria-label={isCollapsed ? 'Expand playlist' : 'Collapse playlist'}
              onClick={() => setIsCollapsed((current) => !current)}
            >
              {isCollapsed ? <ChevronDown size={22} /> : <ChevronUp size={22} />}
            </button>
          </div>
        </div>
        <div className="playlist-progress-card">
          <strong>Total: {playlistTiming.total}</strong>
          <div className="playlist-progress-meta">
            <span>{playlistTiming.elapsed}</span>
            <span>{playlistTiming.percent}%</span>
            <span>{playlistTiming.remaining}</span>
          </div>
          <span className="playlist-progress-compact">{playlistTiming.elapsed} / {playlistTiming.total}</span>
        </div>
      </div>
      <div className="playlist-lessons-container">
        <div className="playlist-lessons-list">
          {storedLessons.map((lesson, idx) => {
            const isActive = idx === activeLessonIndex;
            const isLocked = lesson.locked;
            const isCompleted = idx < activeLessonIndex;

            return (
              <button
                type="button"
                key={lesson.title}
                onClick={() => onSelectLesson(idx)}
                className={`playlist-lesson-item ${isActive ? 'is-active' : ''} ${isLocked ? 'is-locked' : ''}`}
              >
                <div className="playlist-lesson-item__left">
                  {isActive && <div className="active-indicator-bar" />}
                  <div className="playlist-lesson-index">
                    {isActive ? <Play size={13} fill="currentColor" /> : <span>{idx + 1}</span>}
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
                  <div className={`playlist-lesson-thumbnail tone-${courseTone}`}>
                    <img alt="" src={courseThumbnail} />
                    <Play size={12} className="play-hover-icon" fill="currentColor" />
                    <span className="duration-badge">{lesson.duration}</span>
                  </div>
                  <div className="playlist-lesson-info">
                    <h4>{getLessonTitle(lesson.title)}</h4>
                    <p>{courseTeacher}</p>
                  </div>
                </div>
              </button>
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

function parseDuration(duration: string) {
  const parts = duration.split(':').map((part) => Number(part.trim()))

  if (parts.some((part) => Number.isNaN(part))) {
    return 0
  }

  return parts.reduce((total, part) => total * 60 + part, 0)
}

function formatDuration(totalSeconds: number) {
  const safeTotal = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safeTotal / 3600)
  const minutes = Math.floor((safeTotal % 3600) / 60)
  const seconds = safeTotal % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
