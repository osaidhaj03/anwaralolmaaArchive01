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
    courseOutline: 'خطة الدورة',
    visualMap: 'مخطط بصري للدروس',
    open: 'فتح',
    successText: 'تم تسجيل بريدك في القائمة البريدية.',
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
    courseOutline: 'Course outline',
    visualMap: 'Visual lesson map',
    open: 'Open',
    successText: 'Your email has been added to the newsletter list.',
  },
  uz: {
    breadcrumb: 'Bosh sahifa / Kurslar / Tafsilotlar',
    overview: 'Kursga kirish va kitob taqdimoti',
    description: 'Darslar, hamroh materiallar va ma’lumotlar bir joyda jamlangan tizimli sahifa.',
    start: 'Tomosha qilishni boshlash',
    save: 'Kursni saqlash',
    content: 'Kurs tarkibi',
    materials: 'Hamroh materiallar',
    lessons: 'dars',
    students: 'talaba',
    hours: 'soat',
    progress: 'Tugallanish foizi',
    previous: 'Oldingi darslar',
    downloadAll: 'Barcha darslarni yuklash',
    teacher: 'Ma’ruzachi',
    level: 'Daraja',
    category: 'Kategoriya',
    coursePlan: 'Darslar ro‘yxati',
    courseOutline: 'Kurs rejasi',
    visualMap: 'Darslarning vizual xaritasi',
    open: 'Ochish',
    successText: 'Emailingiz xabarnomalar ro‘yxatiga qo‘shildi.',
  },
  uzCyr: {
    breadcrumb: 'Бош саҳифа / Курслар / Тафсилотлар',
    overview: 'Курсга кириш ва китоб тақдимоти',
    description: 'Дарслар, ҳамроҳ материаллар ва маълумотлар бир жойда жамланган тизимли саҳифа.',
    start: 'Томоша қилишни бошлаш',
    save: 'Курсни сақлаш',
    content: 'Курс таркиби',
    materials: 'Ҳамроҳ материаллар',
    lessons: 'дарс',
    students: 'талаба',
    hours: 'соат',
    progress: 'Тугалланиш фоизи',
    previous: 'Олдинги дарслар',
    downloadAll: 'Барча дарсларни юклаш',
    teacher: 'Маърузачи',
    level: 'Даража',
    category: 'Категория',
    coursePlan: 'Дарслар рўйхати',
    courseOutline: 'Курс режаси',
    visualMap: 'Дарсларнинг визуал харитаси',
    open: 'Очиш',
    successText: 'Эмаилингиз хабарномалар рўйхатига қўшилди.',
  },
  ru: {
    breadcrumb: 'Главная / Курсы / Детали курса',
    overview: 'Введение в курс и обзор книги',
    description: 'Систематизированная страница курса с уроками, сопутствующими материалами и ссылками.',
    start: 'Начать просмотр',
    save: 'Сохранить курс',
    content: 'Содержание курса',
    materials: 'Сопутствующие материалы',
    lessons: 'уроков',
    students: 'студентов',
    hours: 'часов',
    progress: 'Прогресс',
    previous: 'Предыдущие уроки',
    downloadAll: 'Скачать все уроки',
    teacher: 'Лектор',
    level: 'Уровень',
    category: 'Категория',
    coursePlan: 'Список уроков',
    courseOutline: 'План курса',
    visualMap: 'Визуальная карта уроков',
    open: 'Открыть',
    successText: 'Ваш email добавлен в список рассылки.',
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
  const lessonCountLabel =
    language === 'ar'
      ? `${storedLessons.length} درس`
      : language === 'uz'
      ? `${storedLessons.length} dars`
      : language === 'uzCyr'
      ? `${storedLessons.length} дарс`
      : language === 'ru'
      ? `${storedLessons.length} уроков`
      : `${storedLessons.length} lessons`

  const materialRows = [
    {
      title: `${course?.title ?? ''} - ${copy.materials}`,
      meta: 'PDF · 4.2 MB',
      icon: FileText,
    },
    {
      title: copy.courseOutline,
      meta: 'PDF · 620 KB',
      icon: FileText,
    },
    {
      title: copy.visualMap,
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
                  <Link to="/login">{copy.open}</Link>
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
        successText={copy.successText}
      />
    </main>
  )
}

