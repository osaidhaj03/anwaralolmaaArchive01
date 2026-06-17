import { Mail } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { DetailInfoList } from '../../components/public/DetailInfoList'
import { DetailRelatedLinks } from '../../components/public/DetailRelatedLinks'
import { useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { scholarsCopy } from '../../data/public/scholars'

const profileCopy: Record<Language, Record<string, string>> = {
  ar: {
    breadcrumb: 'الرئيسية / المشايخ / الملف الشخصي',
    overview: 'نبذة عامة',
    bio: 'يقدم الشيخ دروساً علمية منتظمة، وشروحاً متدرجة، ومجالس جوابية مركزة في أبواب العلم الأساسية مع عناية بالتحصيل المنهجي.',
    courses: 'الدورات',
    lessons: 'الدروس',
    students: 'الطلاب',
    rating: 'التقييم',
    country: 'البلد',
    field: 'التخصص',
    contact: 'تواصل',
    about: 'صفحة النبذة',
    featuredCourses: 'دورات بارزة',
    openCourse: 'فتح الدورة',
  },
  en: {
    breadcrumb: 'Home / Scholars / Profile',
    overview: 'Overview',
    bio: 'This scholar delivers structured lessons, staged explanations, and focused answer sessions across the core Islamic sciences.',
    courses: 'Courses',
    lessons: 'Lessons',
    students: 'Students',
    rating: 'Rating',
    country: 'Country',
    field: 'Field',
    contact: 'Contact',
    about: 'About page',
    featuredCourses: 'Featured courses',
    openCourse: 'Open course',
  },
  uz: {
    breadcrumb: 'Bosh sahifa / Ustozlar / Profil',
    overview: 'Umumiy ma’lumot',
    bio: 'Ustoz islomiy ilmlar bo‘yicha tizimli darslar, bosqichma-bosqich tushuntirishlar va savol-javob mashg‘ulotlarini olib boradi.',
    courses: 'Kurslar',
    lessons: 'Darslar',
    students: 'Talabalar',
    rating: 'Reyting',
    country: 'Mamlakat',
    field: 'Yo‘nalish',
    contact: 'Aloqa',
    about: 'Haqida sahifasi',
    featuredCourses: 'Mashhur kurslar',
    openCourse: 'Kursni ochish',
  },
  uzCyr: {
    breadcrumb: 'Бош саҳифа / Устозлар / Профиль',
    overview: 'Умумий маълумот',
    bio: 'Устоз исломий илмлар бўйича тизимли дарслар, босқичма-босқич тушунтиришлар ва савол-жавоб машғулотларини олиб боради.',
    courses: 'Курслар',
    lessons: 'Дарслар',
    students: 'Талабалар',
    rating: 'Рейтинг',
    country: 'Мамлакат',
    field: 'Йўналиш',
    contact: 'Алоқа',
    about: 'Ҳақида саҳифаси',
    featuredCourses: 'Машҳур курслар',
    openCourse: 'Курсни очиш',
  },
  ru: {
    breadcrumb: 'Главная / Ученые / Профиль',
    overview: 'Обзор',
    bio: 'Этот ученый проводит систематические уроки, подробные разъяснения и тематические сессии вопросов и ответов по основным исламским наукам.',
    courses: 'Курсы',
    lessons: 'Уроки',
    students: 'Студенты',
    rating: 'Рейтинг',
    country: 'Страна',
    field: 'Специализация',
    contact: 'Контакты',
    about: 'Страница описания',
    featuredCourses: 'Основные курсы',
    openCourse: 'Открыть курс',
  },
}

export function ScholarProfilePage() {
  const { scholarId } = useParams()
  const { dir, language } = useLanguage()
  const pageCopy = scholarsCopy[language]
  const archive = useLocalizedArchive(language)
  const copy = profileCopy[language]
  const index = Number(scholarId) - 1
  const scholar = archive.scholars[index]

  if (!scholar) {
    return <Navigate to="/scholars" replace />
  }

  const relatedCourses = archive.courses
    .map((course, courseIndex) => ({ course, courseIndex }))
    .filter(({ course }) => {
      const combined = `${course.teacher} ${course.category} ${course.title}`.toLowerCase()
      return combined.includes(scholar.name.split(' ').slice(-1)[0].toLowerCase()) || combined.includes(scholar.field.split(' ')[0].toLowerCase())
    })
    .slice(0, 4)

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/scholars" brand={pageCopy.brand} languageLabel={pageCopy.languageLabel} login={pageCopy.login} nav={pageCopy.nav} searchLabel={pageCopy.searchLabel} subtitle={pageCopy.subtitle} themeLabel={pageCopy.themeLabel} />

      <section className="scholar-profile-hero islamic-soft-pattern">
        <div className="public-container scholar-profile-hero__inner">
          <span>{copy.breadcrumb}</span>
          <div className="scholar-profile-head">
            <div className="scholar-profile-copy">
              <small>{scholar.field}</small>
              <h1>{scholar.name}</h1>
              <p>{scholar.title}</p>
              <div className="scholar-profile-actions">
                <Link to={`/scholars/${index + 1}/about`}>{copy.about}</Link>
                <Link to="/login"><Mail size={16} />{copy.contact}</Link>
              </div>
            </div>
            <div className="scholar-profile-photo-card">
              <img alt={scholar.name} src={scholar.image} />
            </div>
          </div>
        </div>
      </section>

      <section className="public-container scholar-profile-layout">
        <div className="scholar-profile-main">
          <article className="scholar-profile-card">
            <h2>{copy.overview}</h2>
            <p>{copy.bio}</p>
          </article>

          <article className="scholar-profile-card">
            <h2>{copy.featuredCourses}</h2>
            <DetailRelatedLinks
              className="library-detail-related"
              items={(relatedCourses.length ? relatedCourses : archive.courses.map((course, courseIndex) => ({ course, courseIndex })).slice(0, 4)).map(({ course, courseIndex }) => ({
                description: `${course.teacher} · ${course.lessons}`,
                title: course.title,
                to: `/courses/${courseIndex + 1}`,
              }))}
            />
          </article>
        </div>

        <aside className="scholar-profile-side">
          <article className="scholar-profile-card">
            <DetailInfoList
              className="scholar-profile-info"
              items={[
                { label: copy.field, value: scholar.field },
                { label: copy.courses, value: scholar.courses },
                { label: copy.lessons, value: scholar.lessons },
              ]}
            />
          </article>
        </aside>
      </section>

      <PublicFooter
        brand={pageCopy.brand}
        footerText={pageCopy.footerText}
        newsletterButton={pageCopy.newsletterButton}
        newsletterPlaceholder={pageCopy.newsletterPlaceholder}
        newsletterText={pageCopy.newsletterText}
        newsletterTitle={pageCopy.newsletterTitle}
        quickLinks={pageCopy.quickLinks}
        quickLinksItems={[
          { label: pageCopy.nav[2].label, to: '/courses' },
          { label: pageCopy.nav[4].label, to: '/fatwa' },
          { label: pageCopy.nav[5].label, to: '/library' },
        ]}
        successText={language === 'ar' ? 'تم تسجيل بريدك في القائمة البريدية.' : 'Your email has been added to the newsletter list.'}
      />
    </main>
  )
}
