import { useState, useEffect } from 'react'
import { BookOpen, Bookmark, Clock, GraduationCap, MoreVertical, Share2, UsersRound, Check, FileDown } from 'lucide-react'
import type { Language } from '../../context/LanguageContext'
import type { CourseLesson } from '../../context/ArchiveDataContext'

type WatchLessonInfoProps = {
  category: string
  courseTitle: string
  language: Language
  teacher: string
  activeLesson?: CourseLesson
}

export function WatchLessonInfo({ category, courseTitle, language, teacher, activeLesson }: WatchLessonInfoProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [infoTab, setInfoTab] = useState<'short_desc' | 'summary' | 'transcript' | 'attachments'>('short_desc')

  function handleShare() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  // Reset tab when active lesson changes
  useEffect(() => {
    setInfoTab('short_desc')
  }, [activeLesson])

  const lessonTitle = activeLesson?.title || courseTitle
  const lessonNumber = activeLesson?.number || '1'
  const shortDesc = activeLesson?.descriptionShort || (language === 'ar' ? 'لا يوجد وصف مختصر للدرس.' : 'No short description for this lesson.')
  const longDesc = activeLesson?.descriptionLong || ''
  const transcription = activeLesson?.transcription || ''
  const attachments = activeLesson?.attachments || []

  return (
    <div className="lesson-details-card">
      <span className="lesson-number-tag">
        {language === 'ar' ? `الدرس ${lessonNumber}` : `Lesson ${lessonNumber}`}
      </span>
      <h1 className="lesson-main-title">{lessonTitle}</h1>
      
      <div className="lesson-details-meta-row">
        <div className="meta-left-group">
          <div className="meta-avatar-item">
            <GraduationCap size={16} />
            <span>{teacher}</span>
          </div>
          <div className="meta-category-item">
            <BookOpen size={16} />
            <span>{category}</span>
          </div>
          <div className="meta-date-item">
            <Clock size={16} />
            <span>{activeLesson?.duration ? `${activeLesson.duration}` : '45:00'}</span>
          </div>
          <div className="meta-views-item">
            <UsersRound size={16} />
            <span>{language === 'ar' ? 'مشاهدة عامة' : 'Public Stream'}</span>
          </div>
        </div>
        <div className="meta-actions-group" style={{ position: 'relative' }}>
          <button type="button" className={`action-btn-outline ${copied ? 'is-copied' : ''}`} onClick={handleShare}>
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            <span>{copied ? (language === 'ar' ? 'تم النسخ' : 'Copied') : (language === 'ar' ? 'مشاركة' : 'Share')}</span>
          </button>
          <button type="button" className={`action-btn-outline ${isBookmarked ? 'is-active' : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}>
            <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            <span>{isBookmarked ? (language === 'ar' ? 'تم الحفظ' : 'Saved') : (language === 'ar' ? 'حفظ' : 'Bookmark')}</span>
          </button>
          <button type="button" className="action-btn-more" aria-label="More actions" onClick={() => setShowMoreMenu(!showMoreMenu)}>
            <MoreVertical size={16} />
          </button>
          
          {showMoreMenu && (
            <div className="watch-actions-dropdown">
              <button type="button" onClick={() => setShowMoreMenu(false)}>{language === 'ar' ? 'تقرير إساءة استخدام' : 'Report Abuse'}</button>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Tab Switcher for Lesson Info */}
      <div style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setInfoTab('short_desc')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              fontWeight: 600,
              fontSize: '14px',
              color: infoTab === 'short_desc' ? 'var(--color-gold, #c5a880)' : '#64748b',
              borderBottom: infoTab === 'short_desc' ? '2px solid var(--color-gold, #c5a880)' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            {language === 'ar' ? 'وصف مختصر' : 'Short Description'}
          </button>
          <button
            onClick={() => setInfoTab('summary')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              fontWeight: 600,
              fontSize: '14px',
              color: infoTab === 'summary' ? 'var(--color-gold, #c5a880)' : '#64748b',
              borderBottom: infoTab === 'summary' ? '2px solid var(--color-gold, #c5a880)' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            {language === 'ar' ? 'ملخص الدرس' : 'Lesson Summary'}
          </button>
          <button
            onClick={() => setInfoTab('transcript')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              fontWeight: 600,
              fontSize: '14px',
              color: infoTab === 'transcript' ? 'var(--color-gold, #c5a880)' : '#64748b',
              borderBottom: infoTab === 'transcript' ? '2px solid var(--color-gold, #c5a880)' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            {language === 'ar' ? 'التفريغ الإملائي' : 'Spelling Transcript'}
          </button>
          <button
            onClick={() => setInfoTab('attachments')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              fontWeight: 600,
              fontSize: '14px',
              color: infoTab === 'attachments' ? 'var(--color-gold, #c5a880)' : '#64748b',
              borderBottom: infoTab === 'attachments' ? '2px solid var(--color-gold, #c5a880)' : '2px solid transparent',
              cursor: 'pointer',
            }}
          >
            {language === 'ar' ? `المرافقات (${attachments.length})` : `Attachments (${attachments.length})`}
          </button>
        </div>

        {/* Tab Contents */}
        <div style={{ padding: '8px 4px' }}>
          {/* Tab 1: Short Description */}
          {infoTab === 'short_desc' && (
            <div style={{ color: '#334155', lineHeight: 1.6, fontSize: '15px' }}>
              <p style={{ margin: 0 }}>{shortDesc}</p>
            </div>
          )}

          {/* Tab 2: Summary */}
          {infoTab === 'summary' && (
            <div style={{ color: '#475569', lineHeight: 1.6, fontSize: '15px' }}>
              <p style={{ margin: 0 }}>{longDesc || (language === 'ar' ? 'لا يوجد ملخص متوفر لهذا الدرس.' : 'No summary available for this lesson.')}</p>
            </div>
          )}

          {/* Tab 3: Transcription */}
          {infoTab === 'transcript' && (
            <div style={{ color: '#334155', lineHeight: 1.8, fontSize: '15px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', whiteSpace: 'pre-line' }}>
              {transcription || (language === 'ar' ? 'لم يتم توفير تفريغ إملائي بعد لهذا الدرس.' : 'No text transcript available yet for this lesson.')}
            </div>
          )}

          {/* Tab 4: Attachments */}
          {infoTab === 'attachments' && (
            <div>
              {attachments.length === 0 ? (
                <div style={{ color: '#94a3b8', padding: '24px', textAlign: 'center', border: '1px dashed #e2e8f0', borderRadius: '8px' }}>
                  {language === 'ar' ? 'لا توجد أي مرافقات أو ملفات تابعة لهذا الدرس.' : 'No companion files or attachments for this lesson.'}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                  {attachments.map((file, idx) => (
                    <a
                      key={`attach-${idx}`}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: '#fff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#0d263d',
                        transition: 'all 0.2s',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600 }}>{file.name}</span>
                        <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '4px', alignSelf: 'flex-start' }}>
                          {file.type || 'PDF'}
                        </span>
                      </div>
                      <FileDown size={18} style={{ color: 'var(--color-gold, #c5a880)' }} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

