import { useState, useEffect } from 'react'
import { BookOpen, Bookmark, Clock, GraduationCap, MoreVertical, Share2, UsersRound, Check } from 'lucide-react'
import type { Language } from '../../context/LanguageContext'

type WatchLessonInfoProps = {
  category: string
  courseTitle: string
  language: Language
  teacher: string
}

export function WatchLessonInfo({ category, courseTitle, language, teacher }: WatchLessonInfoProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)

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

  return (
    <div className="lesson-details-card">
      <span className="lesson-number-tag">{language === 'ar' ? 'الدرس ٣' : 'Lesson 3'}</span>
      <h1 className="lesson-main-title">{courseTitle}</h1>
      
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
            <span>{language === 'ar' ? '١٠ يناير ٢٠٢٤' : 'Jan 10, 2024'}</span>
          </div>
          <div className="meta-views-item">
            <UsersRound size={16} />
            <span>{language === 'ar' ? '١٢,٤٥٠ مشاهدة' : '12,450 views'}</span>
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

      {/* About Box */}
      <div className="about-lesson-box">
        <h3>{language === 'ar' ? 'عن هذا الدرس' : 'About this lesson'}</h3>
        <p>
          {language === 'ar' 
            ? 'في هذا الدرس، يشرح الشيخ مبادئ العقيدة الإسلامية الأساسية، بما في ذلك أركان الإيمان الستة وأهميتها في حياة المسلم. هذا العلم التأسيسي ضروري لكل مسلم لتعزيز إيمانه والعيش بيقين ووضوح.'
            : 'In this lesson, the lecturer explains the basic principles of belief (Aqidah) in Islam, including the six pillars of faith and their significance in a Muslim\'s life. This foundational knowledge is essential for every Muslim to strengthen their iman and live with certainty and clarity.'}
        </p>
        <div className="lesson-tags-row">
          <span>{language === 'ar' ? 'العقيدة' : 'Aqidah'}</span>
          <span>{language === 'ar' ? 'الإيمان' : 'Iman'}</span>
          <span>{language === 'ar' ? 'العقيدة الإسلامية' : 'Islamic Beliefs'}</span>
          <span>{language === 'ar' ? 'أركان الإيمان' : 'Principles of Faith'}</span>
        </div>
      </div>
    </div>
  )
}

