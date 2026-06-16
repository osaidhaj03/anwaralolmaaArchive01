import {
  BookOpen,
  Clock,
  Download,
  FileText,
  FileImage,
  ListVideo,
  Play,
  Star,
  UsersRound,
} from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { CourseLessonList } from '../../components/public/CourseLessonList'
import { CourseSummaryCard } from '../../components/public/CourseSummaryCard'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { coursesCopy } from '../../data/public/courses'

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
  const [activeTab, setActiveTab] = useState<'content' | 'materials' | 'downloads'>('content')
  const lessonRows = Array.from({ length: 8 }, (_, lessonIndex) => ({
    title:
      language === 'ar'
        ? `${lessonIndex + 1}. ${lessonIndex === 0 ? copy.overview : `${course?.title ?? ''} - الدرس ${lessonIndex + 1}`}`
        : `${lessonIndex + 1}. ${lessonIndex === 0 ? copy.overview : `${course?.title ?? ''} - Lesson ${lessonIndex + 1}`}`,
    duration: ['45:32', '43:18', '48:05', '50:21', '46:15', '44:30', '41:12', '52:08'][lessonIndex],
    locked: lessonIndex > 2,
  }))
  const materialRows = [
    {
      title: language === 'ar' ? `${course?.title ?? ''} - ${copy.materials}` : `${course?.title ?? ''} - ${copy.materials}`,
      meta: 'PDF · 4.2 MB',
      icon: FileText,
    },
    {
      title: language === 'ar' ? 'خطة الدورة' : 'Course outline',
      meta: 'PDF · 620 KB',
      icon: FileText,
    },
    {
      title: language === 'ar' ? 'مخطط بصري للدروس' : 'Visual lesson map',
      meta: 'PNG · 1.1 MB',
      icon: FileImage,
    },
  ]
  const downloadRows = lessonRows.slice(0, 5).map((lesson, lessonIndex) => ({
    title: language === 'ar' ? `تحميل ${lesson.title}` : `Download ${lesson.title}`,
    meta: language === 'ar' ? `MP4 · الجودة ${lessonIndex % 2 === 0 ? 'العالية' : 'المتوسطة'}` : `MP4 · ${lessonIndex % 2 === 0 ? 'High' : 'Medium'} quality`,
  }))

  if (!course) {
    return <Navigate to="/courses" replace />
  }

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
          <CourseSummaryCard
            course={course}
            ctaLabel={copy.start}
            ctaTo="/login"
            labels={{
              category: copy.category,
              level: copy.level,
              progress: copy.progress,
              rating: copy.rating,
              teacher: copy.teacher,
            }}
          />
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
              <button className={activeTab === 'content' ? 'is-active' : ''} onClick={() => setActiveTab('content')} type="button"><ListVideo size={17} />{copy.content}</button>
              <button className={activeTab === 'materials' ? 'is-active' : ''} onClick={() => setActiveTab('materials')} type="button"><FileText size={17} />{copy.materials}</button>
              <button className={activeTab === 'downloads' ? 'is-active' : ''} onClick={() => setActiveTab('downloads')} type="button"><Download size={17} />{copy.downloadAll}</button>
            </div>
            {activeTab === 'content' ? <CourseLessonList lessons={lessonRows} teacher={course.teacher} /> : null}
            {activeTab === 'materials' ? (
              <div className="course-resource-list">
                {materialRows.map(({ icon: Icon, meta, title }) => (
                  <article key={title}>
                    <span><Icon size={18} /></span>
                    <div>
                      <strong>{title}</strong>
                      <small>{meta}</small>
                    </div>
                    <Link to="/login">{language === 'ar' ? 'فتح' : 'Open'}</Link>
                  </article>
                ))}
              </div>
            ) : null}
            {activeTab === 'downloads' ? (
              <div className="course-resource-list">
                {downloadRows.map(({ meta, title }) => (
                  <article key={title}>
                    <span><Download size={18} /></span>
                    <div>
                      <strong>{title}</strong>
                      <small>{meta}</small>
                    </div>
                    <Link to="/login">{language === 'ar' ? 'تنزيل' : 'Download'}</Link>
                  </article>
                ))}
              </div>
            ) : null}
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

      <PublicFooter
        brand={listCopy.brand}
        footerText={listCopy.footerText}
        newsletterButton={listCopy.newsletterButton}
        newsletterPlaceholder={listCopy.newsletterPlaceholder}
        newsletterText={listCopy.newsletterText}
        newsletterTitle={listCopy.newsletterTitle}
        quickLinks={listCopy.quickLinks}
        quickLinksItems={[
          { label: listCopy.title, to: '/courses' },
          { label: listCopy.nav[3].label, to: '/scholars' },
          { label: listCopy.nav[4].label, to: '/fatwa' },
        ]}
        successText={language === 'ar' ? 'تم تسجيل بريدك في القائمة البريدية.' : 'Your email has been added to the newsletter list.'}
      />
    </main>
  )
}
