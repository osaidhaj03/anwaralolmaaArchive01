import {
  BookMarked,
  BookOpen,
  Download,
  Eye,
  GraduationCap,
  Home,
  LibraryBig,
  MessageCircleQuestion,
  Search,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandMark } from '../../components/AdminIcons'
import { PublicHeader } from '../../components/PublicHeader'
import { useLanguage, type Language } from '../../context/LanguageContext'

type LibraryItem = {
  title: string
  author: string
  category: string
  type: string
  pages: string
  downloads: string
  views: string
  tone: string
}

type LibraryCopy = {
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
  authorLabel: string
  typeLabel: string
  latest: string
  mostDownloaded: string
  read: string
  download: string
  empty: string
  stats: Array<{ value: string; label: string; icon: LucideIcon }>
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  items: LibraryItem[]
}

const libraryCopy: Record<Language, LibraryCopy> = {
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
    breadcrumb: 'الرئيسية / المكتبة',
    title: 'المكتبة',
    description: 'كتب ومتون وشروح علمية مرتبة حسب الأقسام والمؤلفين لتسهيل القراءة والمراجعة.',
    searchPlaceholder: 'ابحث عن كتاب أو مؤلف...',
    all: 'الكل',
    categoryLabel: 'القسم',
    authorLabel: 'المؤلف',
    typeLabel: 'النوع',
    latest: 'الأحدث',
    mostDownloaded: 'الأكثر تحميلاً',
    read: 'قراءة',
    download: 'تحميل',
    empty: 'لا توجد كتب مطابقة',
    stats: [
      { value: '328', label: 'كتاب ومتن', icon: BookOpen },
      { value: '86', label: 'شرح', icon: BookMarked },
      { value: '42K', label: 'تحميل', icon: Download },
      { value: '245K', label: 'قراءة', icon: Eye },
    ],
    newsletterTitle: 'اشترك في النشرة البريدية',
    newsletterText: 'ليصلك كل جديد من الكتب والدروس والمحاضرات.',
    newsletterPlaceholder: 'أدخل بريدك الإلكتروني',
    newsletterButton: 'اشترك الآن',
    quickLinks: 'روابط سريعة',
    footerText: 'منهج أهل السنة فقهاً وعقيدة وسلوكاً.',
    items: [
      { title: 'كتاب التوحيد', author: 'الإمام محمد بن عبدالوهاب', category: 'العقيدة', type: 'متن', pages: '128', downloads: '12,540', views: '45,210', tone: 'green' },
      { title: 'العقيدة الواسطية', author: 'شيخ الإسلام ابن تيمية', category: 'العقيدة', type: 'متن', pages: '96', downloads: '10,421', views: '39,810', tone: 'navy' },
      { title: 'رياض الصالحين', author: 'الإمام النووي', category: 'الحديث', type: 'كتاب', pages: '540', downloads: '18,760', views: '68,430', tone: 'brown' },
      { title: 'بلوغ المرام', author: 'الحافظ ابن حجر', category: 'الحديث', type: 'كتاب', pages: '420', downloads: '9,240', views: '31,200', tone: 'gold' },
      { title: 'منهج السالكين', author: 'الشيخ عبدالرحمن السعدي', category: 'الفقه', type: 'متن', pages: '180', downloads: '8,520', views: '27,540', tone: 'blue' },
      { title: 'الأصول الثلاثة', author: 'الإمام محمد بن عبدالوهاب', category: 'العقيدة', type: 'متن', pages: '48', downloads: '15,320', views: '52,110', tone: 'cream' },
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
    breadcrumb: 'Home / Library',
    title: 'Library',
    description: 'Books, primers, and commentaries arranged by subject and author for reading and study.',
    searchPlaceholder: 'Search by book or author...',
    all: 'All',
    categoryLabel: 'Category',
    authorLabel: 'Author',
    typeLabel: 'Type',
    latest: 'Latest',
    mostDownloaded: 'Most downloaded',
    read: 'Read',
    download: 'Download',
    empty: 'No matching books',
    stats: [
      { value: '328', label: 'Books', icon: BookOpen },
      { value: '86', label: 'Commentaries', icon: BookMarked },
      { value: '42K', label: 'Downloads', icon: Download },
      { value: '245K', label: 'Reads', icon: Eye },
    ],
    newsletterTitle: 'Subscribe to the newsletter',
    newsletterText: 'Get the latest books, lessons, and lectures.',
    newsletterPlaceholder: 'Enter your email',
    newsletterButton: 'Subscribe',
    quickLinks: 'Quick links',
    footerText: 'A Sunni learning archive for creed, worship, and conduct.',
    items: [
      { title: 'Kitab at-Tawhid', author: 'Imam Muhammad ibn Abd al-Wahhab', category: 'Aqidah', type: 'Primer', pages: '128', downloads: '12,540', views: '45,210', tone: 'green' },
      { title: 'Al-Aqidah Al-Wasitiyyah', author: 'Ibn Taymiyyah', category: 'Aqidah', type: 'Primer', pages: '96', downloads: '10,421', views: '39,810', tone: 'navy' },
      { title: 'Riyad as-Salihin', author: 'Imam An-Nawawi', category: 'Hadith', type: 'Book', pages: '540', downloads: '18,760', views: '68,430', tone: 'brown' },
      { title: 'Bulugh Al-Maram', author: 'Ibn Hajar', category: 'Hadith', type: 'Book', pages: '420', downloads: '9,240', views: '31,200', tone: 'gold' },
      { title: 'Manhaj as-Salikin', author: 'Abdulrahman As-Saadi', category: 'Fiqh', type: 'Primer', pages: '180', downloads: '8,520', views: '27,540', tone: 'blue' },
      { title: 'Al-Usul Ath-Thalathah', author: 'Imam Muhammad ibn Abd al-Wahhab', category: 'Aqidah', type: 'Primer', pages: '48', downloads: '15,320', views: '52,110', tone: 'cream' },
    ],
  },
}

export function LibraryPage() {
  const { dir, language } = useLanguage()
  const copy = libraryCopy[language]
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState<'latest' | 'downloads'>('latest')

  const categories = useMemo(() => unique(copy.items.map((item) => item.category)), [copy.items])
  const authors = useMemo(() => unique(copy.items.map((item) => item.author)), [copy.items])
  const types = useMemo(() => unique(copy.items.map((item) => item.type)), [copy.items])
  const items = useMemo(() => {
    const query = search.trim().toLowerCase()
    return copy.items
      .filter((item) => {
        const matchesSearch = [item.title, item.author, item.category, item.type].some((value) => value.toLowerCase().includes(query))
        return (!query || matchesSearch) && (!category || item.category === category) && (!author || item.author === author) && (!type || item.type === type)
      })
      .sort((first, second) => sort === 'downloads' ? numericValue(second.downloads) - numericValue(first.downloads) : 0)
  }, [author, category, copy.items, search, sort, type])

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/library" brand={copy.brand} languageLabel={copy.languageLabel} login={copy.login} nav={copy.nav} searchLabel={copy.searchLabel} subtitle={copy.subtitle} themeLabel={copy.themeLabel} />

      <section className="library-hero islamic-soft-pattern">
        <div className="public-container library-hero__inner">
          <span>{copy.breadcrumb}</span>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
          <div className="library-stat-strip">
            {copy.stats.map(({ value, label, icon: Icon }) => <div key={label}><Icon size={23} /><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="public-container library-layout">
        <aside className="library-filter-card">
          <label className="library-search"><Search size={19} /><input onChange={(event) => setSearch(event.target.value)} placeholder={copy.searchPlaceholder} value={search} /></label>
          <Filter label={copy.categoryLabel} all={copy.all} value={category} values={categories} onChange={setCategory} />
          <Filter label={copy.authorLabel} all={copy.all} value={author} values={authors} onChange={setAuthor} />
          <Filter label={copy.typeLabel} all={copy.all} value={type} values={types} onChange={setType} />
          <div className="library-sort-buttons">
            <button className={sort === 'latest' ? 'is-active' : ''} onClick={() => setSort('latest')} type="button">{copy.latest}</button>
            <button className={sort === 'downloads' ? 'is-active' : ''} onClick={() => setSort('downloads')} type="button">{copy.mostDownloaded}</button>
          </div>
        </aside>

        <div className="library-grid">
          {items.map((item) => (
            <article className="library-card" key={item.title}>
              <div className={`library-book-cover tone-${item.tone}`}><BookOpen size={34} /><span>{item.type}</span></div>
              <div className="library-card__body">
                <small>{item.category}</small>
                <h2>{item.title}</h2>
                <p>{item.author}</p>
                <div className="library-meta"><span>{item.pages} p</span><span><Download size={15} />{item.downloads}</span><span><Eye size={15} />{item.views}</span></div>
                <div className="library-card__actions"><Link to="/login">{copy.read}</Link><button type="button">{copy.download}</button></div>
              </div>
            </article>
          ))}
          {items.length === 0 ? <p className="courses-empty">{copy.empty}</p> : null}
        </div>
      </section>

      <footer className="public-footer">
        <div className="public-container footer-grid">
          <div className="newsletter-box"><h3>{copy.newsletterTitle}</h3><p>{copy.newsletterText}</p><div><input placeholder={copy.newsletterPlaceholder} /><button type="button">{copy.newsletterButton}</button></div></div>
          <div><h3>{copy.quickLinks}</h3><Link to="/courses">{copy.nav[2].label}</Link><Link to="/scholars">{copy.nav[3].label}</Link><Link to="/fatwa">{copy.nav[4].label}</Link></div>
          <div><h3>{copy.brand}</h3><p>{copy.footerText}</p><BrandMark className="footer-mark" /></div>
        </div>
      </footer>
    </main>
  )
}

function Filter({ all, label, onChange, value, values }: { all: string; label: string; onChange: (value: string) => void; value: string; values: string[] }) {
  return <label><span>{label}</span><select onChange={(event) => onChange(event.target.value)} value={value}><option value="">{all}</option>{values.map((item) => <option key={item}>{item}</option>)}</select></label>
}

function unique(values: string[]) {
  return Array.from(new Set(values))
}

function numericValue(value: string) {
  return Number(value.replace(/[^\d]/g, ''))
}
