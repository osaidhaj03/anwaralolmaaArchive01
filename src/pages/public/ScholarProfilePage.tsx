import { Navigate, useParams } from 'react-router-dom'
import { DetailInfoCard, DetailRelatedCard, DetailTextCard } from '../../components/public/DetailCards'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { ScholarProfileHero } from '../../components/public/ScholarProfileHero'
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
    bio: 'Устоз исломий илмлар бўйича тизимли дарслар, босқичма-босқич тушунтиркалар ва савол-жавоб машғулотларини олиб боради.',
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
      <PublicPageHeader activeTo="/scholars" copy={pageCopy} />

      <ScholarProfileHero
        aboutLabel={copy.about}
        aboutTo={`/scholars/${index + 1}/about`}
        breadcrumb={copy.breadcrumb}
        contactLabel={copy.contact}
        field={scholar.field}
        image={scholar.image}
        name={scholar.name}
        title={scholar.title}
      />

      <section className="public-container scholar-profile-layout">
        <div className="scholar-profile-main">
          <DetailTextCard className="scholar-profile-card" title={copy.overview}>
            <p>{copy.bio}</p>
          </DetailTextCard>

          <DetailRelatedCard
            cardClassName="scholar-profile-card"
            linkClassName="library-detail-related"
            title={copy.featuredCourses}
            items={(relatedCourses.length ? relatedCourses : archive.courses.map((course, courseIndex) => ({ course, courseIndex })).slice(0, 4)).map(({ course, courseIndex }) => ({
                description: `${course.teacher} · ${course.lessons}`,
                title: course.title,
                to: `/courses/${courseIndex + 1}`,
            }))}
          />
        </div>

        <aside className="scholar-profile-side">
          <DetailInfoCard
            cardClassName="scholar-profile-card"
            listClassName="scholar-profile-info"
            items={[
                { label: copy.field, value: scholar.field },
                { label: copy.courses, value: scholar.courses },
                { label: copy.lessons, value: scholar.lessons },
            ]}
          />
        </aside>
      </section>

      <PublicPageFooter
        copy={pageCopy}
        quickLinksItems={[
          { label: pageCopy.nav[2].label, to: '/courses' },
          { label: pageCopy.nav[4].label, to: '/fatwa' },
          { label: pageCopy.nav[5].label, to: '/library' },
        ]}
        successText={pageCopy.newsletterSuccess}
      />
    </main>
  )
}
