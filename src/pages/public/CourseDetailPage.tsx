import {
  FileText,
  FileImage,
} from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { WatchBreadcrumbs } from '../../components/public/WatchBreadcrumbs'
import { WatchVideoPlayer } from '../../components/public/WatchVideoPlayer'
import { WatchLessonInfo } from '../../components/public/WatchLessonInfo'
import { WatchPlaylistSidebar } from '../../components/public/WatchPlaylistSidebar'
import { useArchiveData, useLocalizedArchive } from '../../context/ArchiveDataContext'
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
    coursePlan: 'قائمة الدروس',
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
    coursePlan: 'Playlist Lessons',
  },
}

export function CourseDetailPage() {
  const { courseId } = useParams()
  const { dir, language } = useLanguage()
  const listCopy = coursesCopy[language]
  const archive = useLocalizedArchive(language)
  const { lessonsByCourse } = useArchiveData()
  const copy = detailCopy[language]
  const index = Number(courseId) - 1
  const course = archive.courses[index]
  const [audioMode, setAudioMode] = useState(false)
  const storedLessons = lessonsByCourse[String(index)] ?? []
  const lessonCountLabel = language === 'ar' ? `${storedLessons.length} درس` : `${storedLessons.length} lessons`

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

  if (!course) {
    return <Navigate to="/courses" replace />
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/courses" brand={listCopy.brand} languageLabel={listCopy.languageLabel} login={listCopy.login} nav={listCopy.nav} searchLabel={listCopy.searchLabel} subtitle={listCopy.subtitle} themeLabel={listCopy.themeLabel} />

      <section className="course-detail-hero islamic-soft-pattern">
        <div className="public-container course-detail-hero__inner">
          <WatchBreadcrumbs category={course.category} courseTitle={course.title} language={language} />
        </div>
      </section>

      <section className="public-container course-detail-layout youtube-style">
        <div className="course-detail-main">
          {/* Custom Video Player Block */}
          <WatchVideoPlayer
            audioMode={audioMode}
            courseTone={course.tone}
            language={language}
            setAudioMode={setAudioMode}
          />

          {/* Lesson Metadata Block */}
          <WatchLessonInfo
            category={course.category}
            courseTitle={course.title}
            language={language}
            teacher={course.teacher}
          />

          <div className="course-tabs-card">
            <h3 className="materials-title" style={{ padding: '16px 20px', margin: 0, fontSize: '15px', color: '#0d263d', borderBottom: '1px solid rgba(13, 38, 61, 0.06)' }}>
              {copy.materials}
            </h3>
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
          </div>
        </div>

        {/* YouTube Watch Playlist Sidebar */}
        <WatchPlaylistSidebar
          courseTeacher={course.teacher}
          courseTitle={course.title}
          courseTone={course.tone}
          language={language}
          lessonCountLabel={lessonCountLabel}
          storedLessons={storedLessons}
        />
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

