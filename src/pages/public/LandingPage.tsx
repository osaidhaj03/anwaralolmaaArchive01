import {
  BookOpen,
  GraduationCap,
  Home,
  LibraryBig,
  MessageCircleQuestion,
  Play,
  Search,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/AdminIcons'
import { PublicHeader } from '../../components/PublicHeader'
import { useLanguage, type Language } from '../../context/LanguageContext'

type Category = {
  title: string
  text: string
  icon: LucideIcon
}

type Course = {
  title: string
  teacher: string
  lessons: string
  tone: string
}

type PublicCopy = {
  brand: string
  subtitle: string
  nav: Array<{ label: string; to: string; icon: LucideIcon }>
  searchLabel: string
  themeLabel: string
  languageLabel: string
  login: string
  heroTitle: string
  heroText: string
  heroPlaceholder: string
  searchButton: string
  stats: Array<{ value: string; label: string; icon: LucideIcon }>
  categoriesTitle: string
  categories: Category[]
  coursesTitle: string
  coursesLink: string
  courses: Course[]
  scholarsTitle: string
  scholarsLink: string
  scholars: string[]
  latestTitle: string
  latestLink: string
  lessons: Array<{ title: string; meta: string }>
  booksTitle: string
  books: string[]
  bookMeta: string
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
}

const publicCopy: Record<Language, PublicCopy> = {
  ar: {
    brand: 'أنوار العلماء',
    subtitle: 'الأرشيف العلمي',
    nav: [
      { label: 'الرئيسية', to: '/', icon: Home },
      { label: 'الأقسام', to: '/#categories', icon: LibraryBig },
      { label: 'الدورات', to: '/courses', icon: GraduationCap },
      { label: 'المشايخ', to: '/scholars', icon: UsersRound },
      { label: 'الفتاوى', to: '/fatwa', icon: MessageCircleQuestion },
      { label: 'المكتبة', to: '/library', icon: BookOpen },
    ],
    searchLabel: 'بحث',
    themeLabel: 'الوضع الليلي',
    languageLabel: 'English',
    login: 'تسجيل الدخول',
    heroTitle: 'أنوار العلماء',
    heroText: 'أرشيف علمي شامل للدورات والدروس والمحاضرات والفتاوى في مختلف العلوم الشرعية.',
    heroPlaceholder: 'ابحث عن دورة، درس، فتوى، كتاب، شيخ...',
    searchButton: 'بحث',
    stats: [
      { value: '300', label: 'دورة علمية', icon: GraduationCap },
      { value: '10,842', label: 'درس ومقطع', icon: Play },
      { value: '48', label: 'شيخ وعالم', icon: UsersRound },
      { value: '328', label: 'كتاب ومتن', icon: BookOpen },
      { value: '20', label: 'قسم علمي', icon: LibraryBig },
    ],
    categoriesTitle: 'الأقسام العلمية',
    categories: [
      { title: 'القرآن الكريم', text: 'علوم القرآن والتفسير وعلومه', icon: BookOpen },
      { title: 'العقيدة', text: 'العقيدة والتوحيد وأصول الإيمان', icon: LibraryBig },
      { title: 'الفقه وأصوله', text: 'الأحكام الشرعية والقواعد الفقهية', icon: GraduationCap },
      { title: 'الحديث وعلومه', text: 'السنة النبوية وشرح الأحاديث', icon: BookOpen },
      { title: 'السيرة النبوية', text: 'سيرة النبي صلى الله عليه وسلم', icon: UserRound },
      { title: 'اللغة العربية', text: 'النحو والصرف والبلاغة', icon: LibraryBig },
    ],
    coursesTitle: 'دورات مميزة',
    coursesLink: 'عرض جميع الدورات',
    courses: [
      { title: 'شرح منهج السالكين', teacher: 'د. صالح الفوزان', lessons: '245 درس', tone: 'green' },
      { title: 'العقيدة الواسطية', teacher: 'د. سعد الشثري', lessons: '72 درس', tone: 'blue' },
      { title: 'شرح كتاب التوحيد', teacher: 'د. ربيع المدخلي', lessons: '89 درس', tone: 'gold' },
      { title: 'تفسير ابن كثير', teacher: 'د. صالح آل الشيخ', lessons: '254 درس', tone: 'navy' },
    ],
    scholarsTitle: 'المشايخ',
    scholarsLink: 'عرض جميع المشايخ',
    scholars: ['صالح الفوزان', 'محمد سعيد رسلان', 'ربيع المدخلي', 'سعد الشثري', 'ابن عثيمين', 'عبدالعزيز بن باز'],
    latestTitle: 'أحدث الدروس',
    latestLink: 'عرض جميع الدروس',
    lessons: [
      { title: 'باب الإيمان من رياض الصالحين', meta: '45:10 · منذ 4 ساعات' },
      { title: 'تفسير سورة الفاتحة', meta: '1:03:25 · منذ 5 ساعات' },
      { title: 'شرح حديث جبريل', meta: '38:40 · منذ 8 ساعات' },
    ],
    booksTitle: 'الكتب والشروح',
    books: ['رياض الصالحين', 'كتاب التوحيد', 'العقيدة الواسطية', 'بلوغ المرام', 'فتح الباري'],
    bookMeta: '3 دورات شرح',
    newsletterTitle: 'اشترك في النشرة البريدية',
    newsletterText: 'ليصلك كل جديد من الدورات والدروس والمحاضرات.',
    newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
    newsletterButton: 'اشترك الآن',
    quickLinks: 'روابط سريعة',
    footerText: 'منهج أهل السنة فقهاً وعقيدة وسلوكاً.',
  },
  en: {
    brand: 'Anwar Alolmaa',
    subtitle: 'Scholarly Archive',
    nav: [
      { label: 'Home', to: '/', icon: Home },
      { label: 'Categories', to: '/#categories', icon: LibraryBig },
      { label: 'Courses', to: '/courses', icon: GraduationCap },
      { label: 'Scholars', to: '/scholars', icon: UsersRound },
      { label: 'Fatwa', to: '/fatwa', icon: MessageCircleQuestion },
      { label: 'Library', to: '/library', icon: BookOpen },
    ],
    searchLabel: 'Search',
    themeLabel: 'Dark mode',
    languageLabel: 'العربية',
    login: 'Log in',
    heroTitle: 'Anwar Alolmaa',
    heroText: 'A curated scholarly archive for courses, lessons, lectures, books, and fatwas across Islamic sciences.',
    heroPlaceholder: 'Search for a course, lesson, fatwa, book, or scholar...',
    searchButton: 'Search',
    stats: [
      { value: '300', label: 'Courses', icon: GraduationCap },
      { value: '10,842', label: 'Lessons', icon: Play },
      { value: '48', label: 'Scholars', icon: UsersRound },
      { value: '328', label: 'Books', icon: BookOpen },
      { value: '20', label: 'Categories', icon: LibraryBig },
    ],
    categoriesTitle: 'Scientific Categories',
    categories: [
      { title: 'Quran Studies', text: 'Tafsir, recitation, and Quranic sciences', icon: BookOpen },
      { title: 'Aqidah', text: 'Creed, tawhid, and foundations of faith', icon: LibraryBig },
      { title: 'Fiqh and Usul', text: 'Jurisprudence, principles, and legal maxims', icon: GraduationCap },
      { title: 'Hadith Sciences', text: 'Prophetic tradition and hadith commentary', icon: BookOpen },
      { title: 'Prophetic Seerah', text: 'Biography and lessons from the Prophet’s life', icon: UserRound },
      { title: 'Arabic Language', text: 'Grammar, morphology, rhetoric, and literature', icon: LibraryBig },
    ],
    coursesTitle: 'Featured Courses',
    coursesLink: 'View all courses',
    courses: [
      { title: 'Manhaj as-Salikin', teacher: 'Dr. Saleh Al-Fawzan', lessons: '245 lessons', tone: 'green' },
      { title: 'Al-Aqidah Al-Wasitiyyah', teacher: 'Dr. Saad Al-Shithri', lessons: '72 lessons', tone: 'blue' },
      { title: 'Kitab at-Tawhid', teacher: 'Dr. Rabi Al-Madkhali', lessons: '89 lessons', tone: 'gold' },
      { title: 'Tafsir Ibn Kathir', teacher: 'Dr. Saleh Al-Sheikh', lessons: '254 lessons', tone: 'navy' },
    ],
    scholarsTitle: 'Scholars',
    scholarsLink: 'View all scholars',
    scholars: ['Saleh Al-Fawzan', 'Muhammad Saeed Raslan', 'Rabi Al-Madkhali', 'Saad Al-Shithri', 'Ibn Uthaymeen', 'Abdulaziz Ibn Baz'],
    latestTitle: 'Latest Lessons',
    latestLink: 'View all lessons',
    lessons: [
      { title: 'Chapter of Faith from Riyad as-Salihin', meta: '45:10 · 4 hours ago' },
      { title: 'Tafsir of Surah Al-Fatihah', meta: '1:03:25 · 5 hours ago' },
      { title: 'Explanation of Hadith Jibril', meta: '38:40 · 8 hours ago' },
    ],
    booksTitle: 'Books and Commentaries',
    books: ['Riyad as-Salihin', 'Kitab at-Tawhid', 'Al-Aqidah Al-Wasitiyyah', 'Bulugh Al-Maram', 'Fath Al-Bari'],
    bookMeta: '3 commentary courses',
    newsletterTitle: 'Subscribe to the newsletter',
    newsletterText: 'Get the latest courses, lessons, and lectures.',
    newsletterPlaceholder: 'Enter your email',
    newsletterButton: 'Subscribe',
    quickLinks: 'Quick links',
    footerText: 'A Sunni learning archive for creed, worship, and conduct.',
  },
}

export function LandingPage() {
  const { dir, language } = useLanguage()
  const copy = publicCopy[language]

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <section className="hero-section islamic-soft-pattern" id="home">
        <div className="public-container hero-grid">
          <div className="hero-visual">
            <div className="arch-frame">
              <div className="scholar-portrait">
                <img alt={copy.brand} src="/brand/channel-banner.jpg" />
              </div>
            </div>
          </div>

          <div className="hero-copy">
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroText}</p>
            <label className="hero-search">
              <Search size={21} />
              <input placeholder={copy.heroPlaceholder} />
              <button type="button">{copy.searchButton}</button>
            </label>
          </div>
        </div>

        <div className="public-container stat-strip">
          {copy.stats.map(({ value, label, icon: Icon }) => (
            <div key={label}>
              <Icon size={24} />
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="public-section" id="categories">
        <SectionHeading title={copy.categoriesTitle} />
        <div className="public-container category-grid">
          {copy.categories.map((category) => {
            const Icon = category.icon
            return (
              <article className="category-card" key={category.title}>
                <span>
                  <Icon size={28} />
                </span>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="public-section" id="courses">
        <SectionHeading title={copy.coursesTitle} link={copy.coursesLink} linkTo="/courses" />
        <div className="public-container courses-row">
          {copy.courses.map((course) => (
            <article className="course-card" key={course.title}>
              <div className={`course-cover tone-${course.tone}`}>
                <span>{course.title}</span>
              </div>
              <div>
                <h3>{course.title}</h3>
                <p>{course.teacher}</p>
                <small>{course.lessons}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="public-section" id="scholars">
        <SectionHeading title={copy.scholarsTitle} link={copy.scholarsLink} />
        <div className="public-container scholars-row">
          {copy.scholars.map((scholar, index) => (
            <article className="scholar-card" key={scholar}>
              <img alt={scholar} src={`https://i.pravatar.cc/120?img=${index + 12}`} />
              <strong>{scholar}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="public-section">
        <SectionHeading title={copy.latestTitle} link={copy.latestLink} />
        <div className="public-container latest-lessons">
          {copy.lessons.map((lesson) => (
            <article key={lesson.title}>
              <button type="button">
                <Play size={18} />
              </button>
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="public-section" id="books">
        <SectionHeading title={copy.booksTitle} />
        <div className="public-container book-row">
          {copy.books.map((book) => (
            <article className="book-card" key={book}>
              <div />
              <h3>{book}</h3>
              <p>{copy.bookMeta}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="public-footer">
        <div className="public-container footer-grid">
          <div className="newsletter-box">
            <h3>{copy.newsletterTitle}</h3>
            <p>{copy.newsletterText}</p>
            <div>
              <input placeholder={copy.newsletterPlaceholder} />
              <button type="button">{copy.newsletterButton}</button>
            </div>
          </div>
          <div>
            <h3>{copy.quickLinks}</h3>
            <a href="#courses">{copy.coursesTitle}</a>
            <a href="#scholars">{copy.scholarsTitle}</a>
            <a href="#categories">{copy.categoriesTitle}</a>
          </div>
          <div>
            <h3>{copy.brand}</h3>
            <p>{copy.footerText}</p>
            <BrandMark className="footer-mark" />
          </div>
        </div>
      </footer>
    </main>
  )
}

function SectionHeading({ title, link, linkTo }: { title: string; link?: string; linkTo?: string }) {
  return (
    <div className="public-container section-heading">
      <h2>{title}</h2>
      {link ? linkTo ? <Link to={linkTo}>{link}</Link> : <a href="#home">{link}</a> : null}
    </div>
  )
}
