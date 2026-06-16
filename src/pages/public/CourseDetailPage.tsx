import {
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  ListVideo,
  Play,
  Star,
  UsersRound,
} from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BrandMark } from '../../components/AdminIcons'
import { PublicHeader } from '../../components/PublicHeader'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { coursesCopy } from './CoursesPage'

const detailCopy: Record<Language, Record<string, string>> = {
  ar: {
    breadcrumb: 'الرئيسية / الدورات / تفاصيل الدورة',
    overview: 'مقدمة الدورة والتعريف بالكتاب',
    description: 'شرح علمي مرتب للدورة، مع عرض الدروس والمواد المصاحبة وروابط التحميل في مكان واحد.',
    start: 'بدء المشاهدة',
    save: 'حفظ الدورة',
    content: 'محتوى الدورة',
    materials: 'المواد المصاحبة',
    lessons: 'درس',
    students: 'طالب',
    hours: 'ساعة',
    progress: 'نسبة الإكمال',
    previous: 'الدروس السابقة',
    downloadAll: 'تحميل جميع الدروس',
    teacher: 'المحاضر',
    level: 'المستوى',
    category: 'القسم',
    rating: 'التقييم',
    coursePlan: 'خطة الدورة',
  },
  en: {
    breadcrumb: 'Home / Courses / Course details',
    overview: 'Course introduction and book overview',
    description: 'A structured course page with lessons, companion materials, and download links in one place.',
    start: 'Start watching',
    save: 'Save course',
    content: 'Course content',
    materials: 'Companion materials',
    lessons: 'lessons',
    students: 'students',
    hours: 'hours',
    progress: 'Progress',
    previous: 'Previous lessons',
    downloadAll: 'Download all lessons',
    teacher: 'Lecturer',
    level: 'Level',
    category: 'Category',
    rating: 'Rating',
    coursePlan: 'Course plan',
  },
}

export function CourseDetailPage() {
  const { courseId } = useParams()
  const { dir, language } = useLanguage()
  const listCopy = coursesCopy[language]
  const copy = detailCopy[language]
  const index = Number(courseId) - 1
  const course = listCopy.courses[index]

  if (!course) {
    return <Navigate to="/courses" replace />
  }

  const lessonRows = Array.from({ length: 8 }, (_, lessonIndex) => ({
    title:
      language === 'ar'
        ? `${lessonIndex + 1}. ${lessonIndex === 0 ? copy.overview : `${course.title} - الدرس ${lessonIndex + 1}`}`
        : `${lessonIndex + 1}. ${lessonIndex === 0 ? copy.overview : `${course.title} - Lesson ${lessonIndex + 1}`}`,
    duration: ['45:32', '43:18', '48:05', '50:21', '46:15', '44:30', '41:12', '52:08'][lessonIndex],
    locked: lessonIndex > 2,
  }))

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/courses" brand={listCopy.brand} languageLabel={listCopy.languageLabel} login={listCopy.login} nav={listCopy.nav} searchLabel={listCopy.searchLabel} subtitle={listCopy.subtitle} themeLabel={listCopy.themeLabel} />

      <section className="course-detail-hero islamic-soft-pattern">
        <div className="public-container course-detail-hero__inner">
          <span>{copy.breadcrumb}</span>
          <div className="course-detail-title">
            <div>
              <h1>{course.title}</h1>
              <p>{copy.description}</p>
            </div>
            <div className={`public-course-cover tone-${course.tone}`}>
              <span>{course.title}</span>
              <small>{course.lessons}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="public-container course-detail-layout">
        <aside className="course-detail-side">
          <div className="course-detail-summary">
            <BrandMark />
            <h2>{course.title}</h2>
            <p>{course.teacher}</p>
            <div className="course-progress">
              <span style={{ width: `${course.progress}%` }} />
            </div>
            <small>{copy.progress}: {course.progress}%</small>
            <dl>
              <div><dt>{copy.teacher}</dt><dd>{course.teacher}</dd></div>
              <div><dt>{copy.level}</dt><dd>{course.level}</dd></div>
              <div><dt>{copy.category}</dt><dd>{course.category}</dd></div>
              <div><dt>{copy.rating}</dt><dd>{course.rating}</dd></div>
            </dl>
            <Link to="/login"><Play size={16} />{copy.start}</Link>
          </div>
        </aside>

        <div className="course-detail-main">
          <div className="course-video-card">
            <div className={`course-video-frame tone-${course.tone}`}>
              <button type="button"><Play size={28} /></button>
              <h2>{course.title}</h2>
            </div>
            <div className="course-video-meta">
              <span><BookOpen size={17} />{course.lessons}</span>
              <span><Clock size={17} />{course.hours}</span>
              <span><UsersRound size={17} />{course.students}</span>
              <span><Star size={17} />{course.rating}</span>
            </div>
          </div>

          <div className="course-tabs-card">
            <div className="course-tabs">
              <button className="is-active" type="button"><ListVideo size={17} />{copy.content}</button>
              <button type="button"><FileText size={17} />{copy.materials}</button>
              <button type="button"><Download size={17} />{copy.downloadAll}</button>
            </div>
            <div className="lesson-list">
              {lessonRows.map((lesson, lessonIndex) => (
                <article key={lesson.title}>
                  <span>{lesson.locked ? lessonIndex + 1 : <CheckCircle2 size={18} />}</span>
                  <div>
                    <h3>{lesson.title}</h3>
                    <p>{course.teacher}</p>
                  </div>
                  <small>{lesson.duration}</small>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="course-outline-card">
          <h2>{copy.coursePlan}</h2>
          {lessonRows.slice(0, 6).map((lesson) => (
            <Link to="/login" key={lesson.title}>
              <span>{lesson.duration}</span>
              {lesson.title}
            </Link>
          ))}
        </aside>
      </section>

      <footer className="public-footer">
        <div className="public-container footer-grid">
          <div className="newsletter-box">
            <h3>{listCopy.newsletterTitle}</h3>
            <p>{listCopy.newsletterText}</p>
            <div>
              <input placeholder={listCopy.newsletterPlaceholder} />
              <button type="button">{listCopy.newsletterButton}</button>
            </div>
          </div>
          <div>
            <h3>{listCopy.quickLinks}</h3>
            <Link to="/courses">{listCopy.title}</Link>
            <Link to="/scholars">{listCopy.nav[3].label}</Link>
            <Link to="/fatwa">{listCopy.nav[4].label}</Link>
          </div>
          <div>
            <h3>{listCopy.brand}</h3>
            <p>{listCopy.footerText}</p>
            <BrandMark className="footer-mark" />
          </div>
        </div>
      </footer>
    </main>
  )
}
