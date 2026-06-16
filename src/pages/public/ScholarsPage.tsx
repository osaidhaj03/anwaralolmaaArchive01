/* eslint-disable react-refresh/only-export-components */
import {
  BookOpen,
  GraduationCap,
  Home,
  LibraryBig,
  Mail,
  MessageCircleQuestion,
  Search,
  Star,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/AdminIcons'
import { PublicHeader } from '../../components/PublicHeader'
import { useLanguage, type Language } from '../../context/LanguageContext'

type Scholar = {
  name: string
  title: string
  field: string
  country: string
  courses: number
  lessons: number
  students: string
  rating: string
  image: string
}

type ScholarsCopy = {
  brand: string
  subtitle: string
  nav: Array<{ label: string; to: string; icon: LucideIcon }>
  searchLabel: string
  themeLabel: string
  languageLabel: string
  login: string
  breadcrumb: string
  title: string
  description: string
  searchPlaceholder: string
  all: string
  fieldsTitle: string
  countriesTitle: string
  featuredTitle: string
  profile: string
  about: string
  contact: string
  stats: Array<{ value: string; label: string; icon: LucideIcon }>
  empty: string
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  scholars: Scholar[]
}

export const scholarsCopy: Record<Language, ScholarsCopy> = {
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
    breadcrumb: 'الرئيسية / المشايخ',
    title: 'المشايخ والعلماء',
    description: 'تعرّف على نخبة من أهل العلم الذين يقدمون الدروس والدورات والمحاضرات العلمية.',
    searchPlaceholder: 'ابحث عن عالم أو تخصص...',
    all: 'الكل',
    fieldsTitle: 'التخصص',
    countriesTitle: 'البلد',
    featuredTitle: 'العالم المختار',
    profile: 'عرض الملف الشخصي',
    about: 'نبذة',
    contact: 'تواصل',
    stats: [
      { value: '48', label: 'شيخ وعالم', icon: UsersRound },
      { value: '300', label: 'دورة علمية', icon: GraduationCap },
      { value: '10,842', label: 'درس ومقطع', icon: BookOpen },
      { value: '156K', label: 'طالب', icon: UserRound },
    ],
    empty: 'لا توجد نتائج مطابقة',
    newsletterTitle: 'اشترك في النشرة البريدية',
    newsletterText: 'ليصلك كل جديد من الدورات والدروس والمحاضرات.',
    newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
    newsletterButton: 'اشترك الآن',
    quickLinks: 'روابط سريعة',
    footerText: 'منهج أهل السنة فقهاً وعقيدة وسلوكاً.',
    scholars: [
      { name: 'الشيخ صالح الفوزان', title: 'عضو هيئة كبار العلماء', field: 'الفقه وأصوله', country: 'السعودية', courses: 42, lessons: 1860, students: '156,842', rating: '4.9', image: 'https://i.pravatar.cc/240?img=12' },
      { name: 'الشيخ محمد بن صالح العثيمين', title: 'عالم وفقيه', field: 'الفقه والعقيدة', country: 'السعودية', courses: 38, lessons: 1520, students: '142,300', rating: '4.9', image: 'https://i.pravatar.cc/240?img=15' },
      { name: 'الشيخ عبدالعزيز بن باز', title: 'مفتي عام سابق', field: 'العقيدة والفتوى', country: 'السعودية', courses: 45, lessons: 2156, students: '180,215', rating: '5.0', image: 'https://i.pravatar.cc/240?img=31' },
      { name: 'الشيخ سعد الشثري', title: 'أستاذ الفقه وأصوله', field: 'أصول الفقه', country: 'السعودية', courses: 28, lessons: 856, students: '84,210', rating: '4.8', image: 'https://i.pravatar.cc/240?img=33' },
      { name: 'الشيخ ربيع المدخلي', title: 'أستاذ الحديث', field: 'الحديث وعلومه', country: 'السعودية', courses: 31, lessons: 980, students: '74,920', rating: '4.7', image: 'https://i.pravatar.cc/240?img=36' },
      { name: 'الشيخ محمد سعيد رسلان', title: 'داعية ومحاضر', field: 'العقيدة والسلوك', country: 'مصر', courses: 35, lessons: 1245, students: '92,410', rating: '4.8', image: 'https://i.pravatar.cc/240?img=52' },
      { name: 'الشيخ عبدالمحسن العباد', title: 'محدث وفقيه', field: 'الحديث وعلومه', country: 'السعودية', courses: 26, lessons: 732, students: '63,125', rating: '4.7', image: 'https://i.pravatar.cc/240?img=56' },
      { name: 'الشيخ يوسف القرضاوي', title: 'عالم شرعي', field: 'الفقه المقارن', country: 'قطر', courses: 24, lessons: 690, students: '58,700', rating: '4.5', image: 'https://i.pravatar.cc/240?img=60' },
    ],
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
    breadcrumb: 'Home / Scholars',
    title: 'Scholars',
    description: 'Explore trusted scholars who provide structured courses, lessons, lectures, and research material.',
    searchPlaceholder: 'Search by scholar or field...',
    all: 'All',
    fieldsTitle: 'Field',
    countriesTitle: 'Country',
    featuredTitle: 'Selected scholar',
    profile: 'View profile',
    about: 'About',
    contact: 'Contact',
    stats: [
      { value: '48', label: 'Scholars', icon: UsersRound },
      { value: '300', label: 'Courses', icon: GraduationCap },
      { value: '10,842', label: 'Lessons', icon: BookOpen },
      { value: '156K', label: 'Students', icon: UserRound },
    ],
    empty: 'No matching scholars',
    newsletterTitle: 'Subscribe to the newsletter',
    newsletterText: 'Get the latest courses, lessons, and lectures.',
    newsletterPlaceholder: 'Enter your email',
    newsletterButton: 'Subscribe',
    quickLinks: 'Quick links',
    footerText: 'A Sunni learning archive for creed, worship, and conduct.',
    scholars: [
      { name: 'Shaykh Saleh Al-Fawzan', title: 'Senior Scholars Council member', field: 'Fiqh and Usul', country: 'Saudi Arabia', courses: 42, lessons: 1860, students: '156,842', rating: '4.9', image: 'https://i.pravatar.cc/240?img=12' },
      { name: 'Shaykh Ibn Uthaymeen', title: 'Scholar and jurist', field: 'Fiqh and Aqidah', country: 'Saudi Arabia', courses: 38, lessons: 1520, students: '142,300', rating: '4.9', image: 'https://i.pravatar.cc/240?img=15' },
      { name: 'Shaykh Abdulaziz Ibn Baz', title: 'Former grand mufti', field: 'Aqidah and Fatwa', country: 'Saudi Arabia', courses: 45, lessons: 2156, students: '180,215', rating: '5.0', image: 'https://i.pravatar.cc/240?img=31' },
      { name: 'Shaykh Saad Al-Shithri', title: 'Professor of Usul al-Fiqh', field: 'Usul al-Fiqh', country: 'Saudi Arabia', courses: 28, lessons: 856, students: '84,210', rating: '4.8', image: 'https://i.pravatar.cc/240?img=33' },
      { name: 'Shaykh Rabi Al-Madkhali', title: 'Hadith professor', field: 'Hadith Sciences', country: 'Saudi Arabia', courses: 31, lessons: 980, students: '74,920', rating: '4.7', image: 'https://i.pravatar.cc/240?img=36' },
      { name: 'Shaykh Muhammad Saeed Raslan', title: 'Lecturer and preacher', field: 'Aqidah and Conduct', country: 'Egypt', courses: 35, lessons: 1245, students: '92,410', rating: '4.8', image: 'https://i.pravatar.cc/240?img=52' },
      { name: 'Shaykh Abdulmuhsin Al-Abbad', title: 'Hadith scholar', field: 'Hadith Sciences', country: 'Saudi Arabia', courses: 26, lessons: 732, students: '63,125', rating: '4.7', image: 'https://i.pravatar.cc/240?img=56' },
      { name: 'Shaykh Yusuf Al-Qaradawi', title: 'Islamic scholar', field: 'Comparative Fiqh', country: 'Qatar', courses: 24, lessons: 690, students: '58,700', rating: '4.5', image: 'https://i.pravatar.cc/240?img=60' },
    ],
  },
}

export function ScholarsPage() {
  const { dir, language } = useLanguage()
  const copy = scholarsCopy[language]
  const [search, setSearch] = useState('')
  const [field, setField] = useState('')
  const [country, setCountry] = useState('')
  const [selectedName, setSelectedName] = useState(copy.scholars[0].name)

  const fields = useMemo(() => unique(copy.scholars.map((scholar) => scholar.field)), [copy.scholars])
  const countries = useMemo(() => unique(copy.scholars.map((scholar) => scholar.country)), [copy.scholars])
  const scholars = useMemo(() => {
    const query = search.trim().toLowerCase()
    return copy.scholars.filter((scholar) => {
      const matchesSearch = [scholar.name, scholar.title, scholar.field, scholar.country].some((value) => value.toLowerCase().includes(query))
      return (!query || matchesSearch) && (!field || scholar.field === field) && (!country || scholar.country === country)
    })
  }, [copy.scholars, country, field, search])
  const selected = copy.scholars.find((scholar) => scholar.name === selectedName) ?? scholars[0] ?? copy.scholars[0]

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/scholars" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <section className="scholars-hero islamic-soft-pattern">
        <div className="public-container scholars-hero__inner">
          <span>{copy.breadcrumb}</span>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
          <div className="scholars-stat-strip">
            {copy.stats.map(({ value, label, icon: Icon }) => (
              <div key={label}>
                <Icon size={23} />
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="public-container scholars-layout">
        <aside className="scholars-filter-card">
          <label className="scholars-search">
            <Search size={19} />
            <input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} />
          </label>
          <label>
            <span>{copy.fieldsTitle}</span>
            <select onChange={(event) => setField(event.target.value)} value={field}>
              <option value="">{copy.all}</option>
              {fields.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label>
            <span>{copy.countriesTitle}</span>
            <select onChange={(event) => setCountry(event.target.value)} value={country}>
              <option value="">{copy.all}</option>
              {countries.map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
        </aside>

        <div className="scholars-grid">
          {scholars.map((scholar) => {
            const scholarIndex = copy.scholars.findIndex((item) => item.name === scholar.name)
            return (
            <article className="public-scholar-card" key={scholar.name}>
              <div className="public-scholar-photo">
                <img alt={scholar.name} src={scholar.image} />
              </div>
              <div className="public-scholar-body">
                <small>{scholar.field}</small>
                <h2>{scholar.name}</h2>
                <p>{scholar.title}</p>
                <div className="public-scholar-meta">
                  <span><GraduationCap size={15} />{scholar.courses}</span>
                  <span><BookOpen size={15} />{scholar.lessons}</span>
                  <span><Star size={15} />{scholar.rating}</span>
                </div>
                <div className="public-scholar-actions">
                  <button onClick={() => setSelectedName(scholar.name)} type="button">{copy.profile}</button>
                  <Link to={`/scholars/${scholarIndex + 1}/about`}>{copy.about}</Link>
                </div>
              </div>
            </article>
            )
          })}
          {scholars.length === 0 ? <p className="courses-empty">{copy.empty}</p> : null}
        </div>

        <aside className="selected-scholar-card">
          <h2>{copy.featuredTitle}</h2>
          <img alt={selected.name} src={selected.image} />
          <strong>{selected.name}</strong>
          <p>{selected.title}</p>
          <dl>
            <div><dt>{copy.fieldsTitle}</dt><dd>{selected.field}</dd></div>
            <div><dt>{copy.countriesTitle}</dt><dd>{selected.country}</dd></div>
            <div><dt>{copy.stats[1].label}</dt><dd>{selected.courses}</dd></div>
            <div><dt>{copy.stats[3].label}</dt><dd>{selected.students}</dd></div>
          </dl>
          <Link to="/login"><Mail size={16} />{copy.contact}</Link>
        </aside>
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
            <Link to="/courses">{copy.nav[2].label}</Link>
            <Link to="/scholars">{copy.title}</Link>
            <Link to="/fatwa">{copy.nav[4].label}</Link>
            <Link to="/#categories">{copy.nav[1].label}</Link>
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

function unique(values: string[]) {
  return Array.from(new Set(values))
}
