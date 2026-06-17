import { BookOpen, GraduationCap, Landmark, MapPin, Star } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { scholarsCopy } from '../../data/public/scholars'

const aboutCopy: Record<Language, Record<string, string>> = {
  ar: {
    breadcrumb: 'الرئيسية / المشايخ / نبذة',
    title: 'نبذة عن العالم',
    text: 'يقدّم الشيخ دروساً منهجية متدرجة، ويعتني بشرح المتون المعتمدة، مع إبراز المسائل التطبيقية وربط الطالب بأصول الباب وأقوال أهل العلم فيه.',
    back: 'العودة إلى صفحة المشايخ',
    expertise: 'مجالات العناية',
    teaching: 'التدريس المنهجي',
    teachingText: 'برامج علمية متدرجة مع مسارات واضحة للمبتدئ والمتوسط.',
    references: 'الشرح والتحرير',
    referencesText: 'التركيز على شرح النصوص وضبط المصطلحات والمسائل الجامعة.',
    outreach: 'الجواب والإفادة',
    outreachText: 'إجابات مختصرة ومطولة على الأسئلة المتكررة في أبواب العلم.',
    highlights: 'أبرز المؤشرات',
    profile: 'الملف الشخصي',
    field: 'التخصص',
    country: 'البلد',
    courses: 'الدورات',
    lessons: 'الدروس',
    rating: 'التقييم',
    successText: 'تم تسجيل بريدك في القائمة البريدية.',
  },
  en: {
    breadcrumb: 'Home / Scholars / About',
    title: 'About the scholar',
    text: 'This scholar presents structured lessons, carefully staged explanations, and practical guidance tied to the main texts and foundations of each subject.',
    back: 'Back to scholars',
    expertise: 'Core areas',
    teaching: 'Structured teaching',
    teachingText: 'Layered educational programs with clear paths for beginner and intermediate students.',
    references: 'Explanation and verification',
    referencesText: 'Close attention to text explanation, terminology, and major organizing principles.',
    outreach: 'Answers and guidance',
    outreachText: 'Short and extended answers for recurring questions across key topics.',
    highlights: 'Highlights',
    profile: 'Profile',
    field: 'Field',
    country: 'Country',
    courses: 'Courses',
    lessons: 'Lessons',
    rating: 'Rating',
    successText: 'Your email has been added to the newsletter list.',
  },
  uz: {
    breadcrumb: 'Bosh sahifa / Ustozlar / Haqida',
    title: 'Ustoz haqida ma’lumot',
    text: 'Ustoz tizimli va bosqichma-bosqich darslar o‘tadi, ishonchli matnlar sharhiga e’tibor qaratadi va talabalarni ilm asoslari va olimlar so‘zlari bilan bog‘laydi.',
    back: 'Ustozlar sahifasiga qaytish',
    expertise: 'Asosiy yo‘nalishlar',
    teaching: 'Tizimli ta’lim',
    teachingText: 'Boshlang‘ich va o‘rta darajadagi talabalar uchun aniq yo‘nalishga ega bosqichma-bosqich ilmiy dasturlar.',
    references: 'Sharh va tahlil',
    referencesText: 'Matnlar sharhi, atamalar va umumiy masalalarni aniqlashtirishga qaratilgan e’tibor.',
    outreach: 'Javob va yo‘riqnoma',
    outreachText: 'Ilmiy mavzulardagi tez-tez so‘raladigan savollarga qisqa va batafsil javoblar.',
    highlights: 'Asosiy ko‘rsatkichlar',
    profile: 'Profil',
    field: 'Yo‘nalish',
    country: 'Mamlakat',
    courses: 'Kurslar',
    lessons: 'Darslar',
    rating: 'Reyting',
    successText: 'Emailingiz xabarnomalar ro‘yxatiga qo‘shildi.',
  },
  uzCyr: {
    breadcrumb: 'Бош саҳифа / Устозлар / Ҳақида',
    title: 'Устоз ҳақида маълумот',
    text: 'Устоз тизимли ва босқичма-босқич дарслар ўтади, ишончли матнлар шарҳига эътибор қаратади ва талабаларни илм асослари ва олимлар сўзлари билан боғлайди.',
    back: 'Устозлар саҳифасига қайтиш',
    expertise: 'Асосий йўналишлар',
    teaching: 'Тизимли таълим',
    teachingText: 'Бошланғич ва ўрта даражадаги талабалар учун аниқ йўналишга эга босқичма-босқич илмий дастурлар.',
    references: 'Шарҳ ва таҳлил',
    referencesText: 'Матнлар шарҳи, атамалар ва умумий масалаларни аниқлаштиришга қаратилган эътибор.',
    outreach: 'Жавоб ва йўриқнома',
    outreachText: 'Илмий мавзулардаги тез-тез сўраладиган саволларга қисқа ва батафсил жавоблар.',
    highlights: 'Асосий кўрсаткичлар',
    profile: 'Профиль',
    field: 'Йўналиш',
    country: 'Мамлакат',
    courses: 'Курслар',
    lessons: 'Дарслар',
    rating: 'Рейтинг',
    successText: 'Эмаилингиз хабарномалар рўйхатига қўшилди.',
  },
  ru: {
    breadcrumb: 'Главная / Ученые / Об ученом',
    title: 'Об ученом',
    text: 'Преподаватель проводит систематические уроки, уделяя внимание объяснению достоверных текстов, практическим вопросам и связывая студентов с основами знаний.',
    back: 'Назад к списку ученых',
    expertise: 'Области деятельности',
    teaching: 'Систематическое преподавание',
    teachingText: 'Поэтапные научные программы с понятными путями для начинающих и продолжающих.',
    references: 'Объяснение и проверка',
    referencesText: 'Фокус на объяснении текстов, терминологии и обобщающих вопросах.',
    outreach: 'Ответы и руководство',
    outreachText: 'Краткие и подробные ответы на часто задаваемые вопросы в различных областях знаний.',
    highlights: 'Основные показатели',
    profile: 'Профиль',
    field: 'Специализация',
    country: 'Страна',
    courses: 'Курсы',
    lessons: 'Уроки',
    rating: 'Рейтинг',
    successText: 'Ваш email добавлен в список рассылки.',
  },
}

export function ScholarAboutComingSoonPage() {
  const { scholarId } = useParams()
  const { dir, language } = useLanguage()
  const copy = aboutCopy[language]
  const scholarsPageCopy = scholarsCopy[language]
  const archive = useLocalizedArchive(language)
  const index = Number(scholarId) - 1
  const scholar = archive.scholars[index]

  if (!scholar) {
    return <Navigate to="/scholars" replace />
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/scholars" brand={scholarsPageCopy.brand} languageLabel={scholarsPageCopy.languageLabel} login={scholarsPageCopy.login} nav={scholarsPageCopy.nav} searchLabel={scholarsPageCopy.searchLabel} subtitle={scholarsPageCopy.subtitle} themeLabel={scholarsPageCopy.themeLabel} />
      <section className="scholar-profile-hero islamic-soft-pattern">
        <div className="public-container scholar-profile-hero__inner">
          <span>{copy.breadcrumb}</span>
          <div className="scholar-profile-head">
            <div className="scholar-profile-copy">
              <small>{scholar.field}</small>
              <h1>{copy.title}</h1>
              <p>{scholar.name}</p>
              <div className="scholar-profile-actions">
                <Link to={`/scholars/${index + 1}`}>{copy.profile}</Link>
                <Link to="/scholars">{copy.back}</Link>
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
            <h2>{copy.title}</h2>
            <p>{copy.text}</p>
          </article>
          <article className="scholar-profile-card">
            <h2>{copy.expertise}</h2>
            <div className="scholar-profile-course-list">
              <article>
                <div className="scholar-profile-course-mark"><GraduationCap size={22} /></div>
                <div><h3>{copy.teaching}</h3><p>{copy.teachingText}</p></div>
              </article>
              <article>
                <div className="scholar-profile-course-mark"><BookOpen size={22} /></div>
                <div><h3>{copy.references}</h3><p>{copy.referencesText}</p></div>
              </article>
              <article>
                <div className="scholar-profile-course-mark"><Landmark size={22} /></div>
                <div><h3>{copy.outreach}</h3><p>{copy.outreachText}</p></div>
              </article>
            </div>
          </article>
        </div>
        <aside className="scholar-profile-side">
          <article className="scholar-profile-card">
            <h2>{copy.highlights}</h2>
            <dl className="scholar-profile-info">
              <div><dt>{copy.field}</dt><dd>{scholar.field}</dd></div>
              <div><dt>{copy.country}</dt><dd><MapPin size={15} />{scholar.country}</dd></div>
              <div><dt>{copy.courses}</dt><dd><GraduationCap size={15} />{scholar.courses}</dd></div>
              <div><dt>{copy.lessons}</dt><dd><BookOpen size={15} />{scholar.lessons}</dd></div>
              <div><dt>{copy.rating}</dt><dd><Star size={15} />{scholar.rating}</dd></div>
            </dl>
          </article>
        </aside>
      </section>

      <PublicFooter
        brand={scholarsPageCopy.brand}
        footerText={scholarsPageCopy.footerText}
        newsletterButton={scholarsPageCopy.newsletterButton}
        newsletterPlaceholder={scholarsPageCopy.newsletterPlaceholder}
        newsletterText={scholarsPageCopy.newsletterText}
        newsletterTitle={scholarsPageCopy.newsletterTitle}
        quickLinks={scholarsPageCopy.quickLinks}
        quickLinksItems={[
          { label: scholarsPageCopy.nav[2].label, to: '/courses' },
          { label: scholarsPageCopy.nav[4].label, to: '/fatwa' },
          { label: scholarsPageCopy.nav[5].label, to: '/library' },
        ]}
        successText={copy.successText}
      />
    </main>
  )
}
