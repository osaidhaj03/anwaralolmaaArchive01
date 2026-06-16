import {
  BookOpen,
  Eye,
  GraduationCap,
  HelpCircle,
  Home,
  LibraryBig,
  MessageCircleQuestion,
  Play,
  Search,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/AdminIcons'
import { PublicHeader } from '../../components/PublicHeader'
import { useLanguage, type Language } from '../../context/LanguageContext'

type FatwaItem = {
  title: string
  scholar: string
  category: string
  duration: string
  views: string
  date: string
  tone: string
}

type FatwaCopy = {
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
  categoryLabel: string
  scholarLabel: string
  latest: string
  mostViewed: string
  watch: string
  empty: string
  stats: Array<{ value: string; label: string; icon: LucideIcon }>
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  items: FatwaItem[]
}

const fatwaCopy: Record<Language, FatwaCopy> = {
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
    breadcrumb: 'الرئيسية / الفتاوى',
    title: 'الفتاوى',
    description: 'إجابات علمية مختصرة ومطولة في مسائل العقيدة والعبادات والمعاملات والأسرة.',
    searchPlaceholder: 'ابحث في الفتاوى...',
    all: 'الكل',
    categoryLabel: 'التصنيف',
    scholarLabel: 'العالم',
    latest: 'الأحدث',
    mostViewed: 'الأكثر مشاهدة',
    watch: 'مشاهدة الفتوى',
    empty: 'لا توجد فتاوى مطابقة',
    stats: [
      { value: '1,532', label: 'فتوى', icon: MessageCircleQuestion },
      { value: '86', label: 'تصنيف', icon: LibraryBig },
      { value: '48', label: 'عالم', icon: UsersRound },
      { value: '245K', label: 'مشاهدة', icon: Eye },
    ],
    newsletterTitle: 'اشترك في النشرة البريدية',
    newsletterText: 'ليصلك كل جديد من الدورات والدروس والمحاضرات.',
    newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
    newsletterButton: 'اشترك الآن',
    quickLinks: 'روابط سريعة',
    footerText: 'منهج أهل السنة فقهاً وعقيدة وسلوكاً.',
    items: [
      { title: 'حكم الوضوء بماء البحر', scholar: 'الشيخ عبدالعزيز بن باز', category: 'الطهارة', duration: '3:15', views: '4,215', date: '2025-05-16', tone: 'green' },
      { title: 'حكم الجمع بين الصلاتين للمسافر', scholar: 'الشيخ صالح الفوزان', category: 'الصلاة', duration: '6:42', views: '8,920', date: '2025-05-15', tone: 'navy' },
      { title: 'ضوابط الزكاة في المال المدخر', scholar: 'الشيخ ابن عثيمين', category: 'الزكاة', duration: '9:10', views: '12,340', date: '2025-05-14', tone: 'gold' },
      { title: 'آداب طالب العلم في السؤال', scholar: 'الشيخ سعد الشثري', category: 'طلب العلم', duration: '7:28', views: '5,812', date: '2025-05-13', tone: 'blue' },
      { title: 'حكم البيع بالتقسيط', scholar: 'الشيخ محمد المختار الشنقيطي', category: 'المعاملات', duration: '11:04', views: '9,540', date: '2025-05-12', tone: 'brown' },
      { title: 'التوبة من الغيبة والنميمة', scholar: 'الشيخ محمد سعيد رسلان', category: 'الآداب', duration: '5:36', views: '6,730', date: '2025-05-11', tone: 'cream' },
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
    breadcrumb: 'Home / Fatwa',
    title: 'Fatwa',
    description: 'Standalone scholarly answers covering creed, worship, transactions, family matters, and conduct.',
    searchPlaceholder: 'Search fatwas...',
    all: 'All',
    categoryLabel: 'Category',
    scholarLabel: 'Scholar',
    latest: 'Latest',
    mostViewed: 'Most viewed',
    watch: 'Watch fatwa',
    empty: 'No matching fatwas',
    stats: [
      { value: '1,532', label: 'Fatwas', icon: MessageCircleQuestion },
      { value: '86', label: 'Categories', icon: LibraryBig },
      { value: '48', label: 'Scholars', icon: UsersRound },
      { value: '245K', label: 'Views', icon: Eye },
    ],
    newsletterTitle: 'Subscribe to the newsletter',
    newsletterText: 'Get the latest courses, lessons, and lectures.',
    newsletterPlaceholder: 'Enter your email',
    newsletterButton: 'Subscribe',
    quickLinks: 'Quick links',
    footerText: 'A Sunni learning archive for creed, worship, and conduct.',
    items: [
      { title: 'Ruling on making wudu with seawater', scholar: 'Shaykh Abdulaziz Ibn Baz', category: 'Purification', duration: '3:15', views: '4,215', date: '2025-05-16', tone: 'green' },
      { title: 'Combining prayers while travelling', scholar: 'Shaykh Saleh Al-Fawzan', category: 'Prayer', duration: '6:42', views: '8,920', date: '2025-05-15', tone: 'navy' },
      { title: 'Zakat on saved money', scholar: 'Shaykh Ibn Uthaymeen', category: 'Zakat', duration: '9:10', views: '12,340', date: '2025-05-14', tone: 'gold' },
      { title: 'How students of knowledge should ask', scholar: 'Shaykh Saad Al-Shithri', category: 'Knowledge', duration: '7:28', views: '5,812', date: '2025-05-13', tone: 'blue' },
      { title: 'Ruling on installment sales', scholar: 'Shaykh Muhammad Al-Shinqiti', category: 'Transactions', duration: '11:04', views: '9,540', date: '2025-05-12', tone: 'brown' },
      { title: 'Repenting from backbiting', scholar: 'Shaykh Muhammad Saeed Raslan', category: 'Conduct', duration: '5:36', views: '6,730', date: '2025-05-11', tone: 'cream' },
    ],
  },
}

export function FatwaPage() {
  const { dir, language } = useLanguage()
  const copy = fatwaCopy[language]
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [scholar, setScholar] = useState('')
  const [sort, setSort] = useState<'latest' | 'views'>('latest')

  const categories = useMemo(() => unique(copy.items.map((item) => item.category)), [copy.items])
  const scholars = useMemo(() => unique(copy.items.map((item) => item.scholar)), [copy.items])
  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    return copy.items
      .filter((item) => {
        const matchesSearch = [item.title, item.scholar, item.category].some((value) => value.toLowerCase().includes(query))
        return (!query || matchesSearch) && (!category || item.category === category) && (!scholar || item.scholar === scholar)
      })
      .sort((first, second) => sort === 'views' ? numericValue(second.views) - numericValue(first.views) : second.date.localeCompare(first.date))
  }, [category, copy.items, scholar, search, sort])

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/fatwa" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <section className="fatwa-hero islamic-soft-pattern">
        <div className="public-container fatwa-hero__inner">
          <span>{copy.breadcrumb}</span>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
          <div className="fatwa-stat-strip">
            {copy.stats.map(({ value, label, icon: Icon }) => (
              <div key={label}><Icon size={23} /><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="public-container fatwa-layout">
        <aside className="fatwa-filter-card">
          <label className="fatwa-search">
            <Search size={19} />
            <input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} />
          </label>
          <label><span>{copy.categoryLabel}</span><select onChange={(event) => setCategory(event.target.value)} value={category}><option value="">{copy.all}</option>{categories.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>{copy.scholarLabel}</span><select onChange={(event) => setScholar(event.target.value)} value={scholar}><option value="">{copy.all}</option>{scholars.map((value) => <option key={value}>{value}</option>)}</select></label>
          <div className="fatwa-sort-buttons">
            <button className={sort === 'latest' ? 'is-active' : ''} onClick={() => setSort('latest')} type="button">{copy.latest}</button>
            <button className={sort === 'views' ? 'is-active' : ''} onClick={() => setSort('views')} type="button">{copy.mostViewed}</button>
          </div>
        </aside>

        <div className="fatwa-grid">
          {items.map((item) => (
            <article className="fatwa-card" key={item.title}>
              <div className={`fatwa-thumb tone-${item.tone}`}>
                <HelpCircle size={30} />
                <span>{item.duration}</span>
              </div>
              <div className="fatwa-card__body">
                <small>{item.category}</small>
                <h2>{item.title}</h2>
                <p>{item.scholar}</p>
                <div>
                  <span><Eye size={15} />{item.views}</span>
                  <span>{item.date}</span>
                </div>
                <Link to="/login"><Play size={15} />{copy.watch}</Link>
              </div>
            </article>
          ))}
          {items.length === 0 ? <p className="courses-empty">{copy.empty}</p> : null}
        </div>
      </section>

      <footer className="public-footer">
        <div className="public-container footer-grid">
          <div className="newsletter-box">
            <h3>{copy.newsletterTitle}</h3>
            <p>{copy.newsletterText}</p>
            <div><input placeholder={copy.newsletterPlaceholder} /><button type="button">{copy.newsletterButton}</button></div>
          </div>
          <div>
            <h3>{copy.quickLinks}</h3>
            <Link to="/courses">{copy.nav[2].label}</Link>
            <Link to="/scholars">{copy.nav[3].label}</Link>
            <Link to="/fatwa">{copy.title}</Link>
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

function numericValue(value: string) {
  return Number(value.replace(/[^\d]/g, ''))
}
