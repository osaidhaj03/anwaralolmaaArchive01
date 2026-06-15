import {
  BookOpen,
  Eye,
  FileQuestion,
  GraduationCap,
  LibraryBig,
  PlaySquare,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLanguage, type Language } from '../../context/LanguageContext'

const dashboardData = {
  ar: {
    monthSuffix: 'عن الشهر الماضي',
    viewsTitle: 'إحصائيات المشاهدات',
    last30: 'آخر 30 يوم',
    last7: 'آخر 7 أيام',
    popularTitle: 'الدروس الأكثر مشاهدة',
    importsTitle: 'آخر الاستيرادات من يوتيوب',
    distributionTitle: 'توزيع المحتوى',
    usersTitle: 'إحصائيات المستخدمين',
    activityTitle: 'آخر النشاطات',
    viewAll: 'عرض الكل',
    collapse: 'إخفاء',
    totalContent: 'إجمالي المحتوى',
    userMetrics: ['إجمالي المستخدمين', 'المستخدمون النشطون', 'إجمالي ساعات المشاهدة', 'زيارات الصفحات'],
    stats: [
  { label: 'إجمالي المشاهدات', value: '2,453,876', change: '+18%', icon: Eye, tone: 'teal' },
  { label: 'إجمالي الفتاوى', value: '1,532', change: '+10%', icon: FileQuestion, tone: 'rose' },
  { label: 'إجمالي العلماء', value: '326', change: '+6%', icon: UsersRound, tone: 'amber' },
  { label: 'إجمالي الكتب', value: '842', change: '+8%', icon: BookOpen, tone: 'violet' },
  { label: 'إجمالي الدروس', value: '18,756', change: '+15%', icon: PlaySquare, tone: 'green' },
  { label: 'إجمالي الدورات', value: '1,245', change: '+12%', icon: GraduationCap, tone: 'blue' },
],
    imports: [
  { title: 'شرح كتاب التوحيد', lessons: '45 درس', status: 'تم الاستيراد', date: '16 مايو 2025' },
  { title: 'أصول الفقه', lessons: '28 درس', status: 'تم الاستيراد', date: '15 مايو 2025' },
  { title: 'تفسير سورة البقرة', lessons: '50 درس', status: 'جاري المعالجة', date: '15 مايو 2025' },
  { title: 'السيرة النبوية', lessons: '35 درس', status: 'قيد المراجعة', date: '14 مايو 2025' },
  { title: 'فقه المعاملات', lessons: '22 درس', status: 'فشل الاستيراد', date: '14 مايو 2025' },
],
    popularLessons: [
  { title: 'شرح كتاب التوحيد - الدرس 25', teacher: 'الشيخ محمد بن صالح العثيمين', views: '125,430' },
  { title: 'أصول الفقه - الدرس 12', teacher: 'الشيخ عبدالعزيز بن باز', views: '98,706' },
  { title: 'تفسير سورة البقرة - الدرس 45', teacher: 'الشيخ صالح الفوزان', views: '89,214' },
  { title: 'فقه العبادات - الدرس 8', teacher: 'الشيخ ابن عثيمين', views: '76,830' },
],
    activity: [
  { user: 'أبو محمد', action: 'أضاف درس شرح كتاب التوحيد - الدرس 15', time: 'منذ 10 دقائق' },
  { user: 'فاطمة الزهراء', action: 'راجعت فتوى حكم طلب العلم', time: 'منذ 25 دقيقة' },
  { user: 'عبدالله', action: 'صنف درس أصول الفقه - الدرس 7', time: 'منذ ساعة' },
],
    distribution: [
  { label: 'دروس', value: '18,756', percent: 82.6, color: '#4775e6' },
  { label: 'كتب', value: '842', percent: 3.7, color: '#23a36f' },
  { label: 'فتاوى', value: '1,532', percent: 6.7, color: '#f59e0b' },
  { label: 'محاضرات', value: '1,341', percent: 5.9, color: '#8b5cf6' },
],
  },
  en: {
    monthSuffix: 'vs last month',
    viewsTitle: 'Views Analytics',
    last30: 'Last 30 days',
    last7: 'Last 7 days',
    popularTitle: 'Most Watched Lessons',
    importsTitle: 'Latest YouTube Imports',
    distributionTitle: 'Content Distribution',
    usersTitle: 'User Statistics',
    activityTitle: 'Recent Activity',
    viewAll: 'View all',
    collapse: 'Collapse',
    totalContent: 'Total content',
    userMetrics: ['Total users', 'Active users', 'Total watch hours', 'Page visits'],
    stats: [
      { label: 'Total Views', value: '2,453,876', change: '+18%', icon: Eye, tone: 'teal' },
      { label: 'Total Fatwas', value: '1,532', change: '+10%', icon: FileQuestion, tone: 'rose' },
      { label: 'Total Scholars', value: '326', change: '+6%', icon: UsersRound, tone: 'amber' },
      { label: 'Total Books', value: '842', change: '+8%', icon: BookOpen, tone: 'violet' },
      { label: 'Total Lessons', value: '18,756', change: '+15%', icon: PlaySquare, tone: 'green' },
      { label: 'Total Courses', value: '1,245', change: '+12%', icon: GraduationCap, tone: 'blue' },
    ],
    imports: [
      { title: 'Explanation of Kitab at-Tawhid', lessons: '45 lessons', status: 'Imported', date: 'May 16, 2025' },
      { title: 'Principles of Fiqh', lessons: '28 lessons', status: 'Imported', date: 'May 15, 2025' },
      { title: 'Tafsir of Surat Al-Baqarah', lessons: '50 lessons', status: 'Processing', date: 'May 15, 2025' },
      { title: 'Prophetic Seerah', lessons: '35 lessons', status: 'In review', date: 'May 14, 2025' },
      { title: 'Fiqh Transactions', lessons: '22 lessons', status: 'Failed', date: 'May 14, 2025' },
    ],
    popularLessons: [
      { title: 'Kitab at-Tawhid - Lesson 25', teacher: 'Shaykh Muhammad ibn Uthaymeen', views: '125,430' },
      { title: 'Principles of Fiqh - Lesson 12', teacher: 'Shaykh Abdulaziz bin Baz', views: '98,706' },
      { title: 'Tafsir Al-Baqarah - Lesson 45', teacher: 'Shaykh Saleh Al-Fawzan', views: '89,214' },
      { title: 'Fiqh of Worship - Lesson 8', teacher: 'Shaykh Ibn Uthaymeen', views: '76,830' },
    ],
    activity: [
      { user: 'Abu Muhammad', action: 'Added Kitab at-Tawhid - Lesson 15', time: '10 minutes ago' },
      { user: 'Fatimah Al-Zahra', action: 'Reviewed a fatwa about seeking knowledge', time: '25 minutes ago' },
      { user: 'Abdullah', action: 'Classified Principles of Fiqh - Lesson 7', time: '1 hour ago' },
    ],
    distribution: [
      { label: 'Lessons', value: '18,756', percent: 82.6, color: '#4775e6' },
      { label: 'Books', value: '842', percent: 3.7, color: '#23a36f' },
      { label: 'Fatwas', value: '1,532', percent: 6.7, color: '#f59e0b' },
      { label: 'Lectures', value: '1,341', percent: 5.9, color: '#8b5cf6' },
    ],
  },
} satisfies Record<Language, Record<string, unknown>>

export function AdminDashboard() {
  const { language } = useLanguage()
  const data = dashboardData[language]
  const [modalPanel, setModalPanel] = useState<string | null>(null)
  const [chartRange, setChartRange] = useState('30')

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setModalPanel(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="admin-page">
      <section className="stats-grid" aria-label="ملخص المنصة">
        {data.stats.map((stat) => {
          const Icon = stat.icon
          return (
            <article className={`stat-card tone-${stat.tone}`} key={stat.label}>
              <span className="stat-icon">
                <Icon size={23} />
              </span>
              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>
                  <TrendingUp size={13} />
                  {stat.change} {data.monthSuffix}
                </small>
              </div>
            </article>
          )
        })}
      </section>

      <section className="admin-grid">
        <article className="admin-panel chart-panel">
          <div className="admin-panel__header">
            <h2>{data.viewsTitle}</h2>
            <select onChange={(event) => setChartRange(event.target.value)} value={chartRange}>
              <option value="30">{data.last30}</option>
              <option value="7">{data.last7}</option>
            </select>
          </div>
          <div className="mock-chart" aria-label="رسم بياني للمشاهدات">
            {Array.from({ length: chartRange === '30' ? 18 : 7 }, (_, index) => (
              <span key={index} style={{ height: `${34 + ((index * 19) % 58)}%` }} />
            ))}
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel__header">
            <h2>{data.popularTitle}</h2>
            <button onClick={() => setModalPanel('popular')} type="button">
              {data.viewAll}
            </button>
          </div>
          <div className="rank-list">
            {data.popularLessons.slice(0, 3).map((lesson, index) => (
              <div className="rank-item" key={lesson.title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.teacher}</small>
                </div>
                <b>{lesson.views}</b>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel__header">
            <h2>{data.importsTitle}</h2>
            <button onClick={() => setModalPanel('imports')} type="button">
              {data.viewAll}
            </button>
          </div>
          <div className="import-list">
            {data.imports.slice(0, 3).map((item, index) => (
              <div className="import-row" key={`${item.title}-${index}`}>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.lessons}</small>
                </div>
                <span className={`import-status ${statusClass(item.status)}`}>{item.status}</span>
                <time>{item.date}</time>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="admin-grid admin-grid--bottom">
        <article className="admin-panel">
          <div className="admin-panel__header">
            <h2>{data.distributionTitle}</h2>
            <button onClick={() => setModalPanel('distribution')} type="button">
              {data.viewAll}
            </button>
          </div>
          <div className="distribution">
            <div className="donut">
              <strong>22,701</strong>
              <span>{data.totalContent}</span>
            </div>
            <div className="distribution-list">
              {data.distribution.map((item) => (
                <div key={item.label}>
                  <span style={{ backgroundColor: item.color }} />
                  <strong>{item.label}</strong>
                  <small>
                    {item.value} ({item.percent}%)
                  </small>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel__header">
            <h2>{data.usersTitle}</h2>
            <button onClick={() => setModalPanel('users')} type="button">
              {data.viewAll}
            </button>
          </div>
          <div className="user-metrics">
            <div>
              <UsersRound size={18} />
              <span>{data.userMetrics[0]}</span>
              <strong>142,580</strong>
            </div>
            <div>
              <TrendingUp size={18} />
              <span>{data.userMetrics[1]}</span>
              <strong>32,450</strong>
            </div>
            <div>
              <LibraryBig size={18} />
              <span>{data.userMetrics[2]}</span>
              <strong>1,245,680</strong>
            </div>
          </div>
        </article>

        <article className="admin-panel">
          <div className="admin-panel__header">
            <h2>{data.activityTitle}</h2>
            <button onClick={() => setModalPanel('activity')} type="button">
              {data.viewAll}
            </button>
          </div>
          <div className="activity-feed">
            {data.activity.slice(0, 2).map((item, index) => (
              <div key={`${item.user}-${item.time}-${index}`}>
                <span className="avatar avatar--small">
                  <UsersRound size={15} />
                </span>
                <div>
                  <strong>{item.user}</strong>
                  <small>{item.action}</small>
                </div>
                <time>{item.time}</time>
              </div>
            ))}
          </div>
        </article>
      </section>

      {modalPanel ? (
        <div className="modal-backdrop" role="presentation">
          <section className="admin-modal dashboard-modal" role="dialog" aria-modal="true" aria-label={modalTitle(modalPanel, data)}>
            <header>
              <h2>{modalTitle(modalPanel, data)}</h2>
              <button onClick={() => setModalPanel(null)} type="button">
                ×
              </button>
            </header>
            <div className="dashboard-modal__content">{renderDashboardModal(modalPanel, data)}</div>
          </section>
        </div>
      ) : null}
    </div>
  )
}

function modalTitle(panel: string, data: (typeof dashboardData)['ar']) {
  if (panel === 'popular') return data.popularTitle
  if (panel === 'imports') return data.importsTitle
  if (panel === 'distribution') return data.distributionTitle
  if (panel === 'users') return data.usersTitle
  return data.activityTitle
}

function renderDashboardModal(panel: string, data: (typeof dashboardData)['ar']) {
  if (panel === 'popular') {
    return (
      <div className="rank-list">
        {[...data.popularLessons, ...data.popularLessons].map((lesson, index) => (
          <div className="rank-item" key={`${lesson.title}-${index}`}>
            <span>{index + 1}</span>
            <div>
              <strong>{lesson.title}</strong>
              <small>{lesson.teacher}</small>
            </div>
            <b>{lesson.views}</b>
          </div>
        ))}
      </div>
    )
  }

  if (panel === 'imports') {
    return (
      <div className="import-list">
        {[...data.imports, ...data.imports].map((item, index) => (
          <div className="import-row" key={`${item.title}-${index}`}>
            <div>
              <strong>{item.title}</strong>
              <small>{item.lessons}</small>
            </div>
            <span className={`import-status ${statusClass(item.status)}`}>{item.status}</span>
            <time>{item.date}</time>
          </div>
        ))}
      </div>
    )
  }

  if (panel === 'distribution') {
    return (
      <div className="distribution-list">
        {[...data.distribution, { label: data.totalContent, value: '22,701', percent: 100, color: '#0d263d' }].map((item) => (
          <div key={item.label}>
            <span style={{ backgroundColor: item.color }} />
            <strong>{item.label}</strong>
            <small>
              {item.value} ({item.percent}%)
            </small>
          </div>
        ))}
      </div>
    )
  }

  if (panel === 'users') {
    return (
      <div className="user-metrics">
        {data.userMetrics.map((label, index) => (
          <div key={label}>
            <Eye size={18} />
            <span>{label}</span>
            <strong>{['142,580', '32,450', '1,245,680', '684,220'][index]}</strong>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="activity-feed">
      {[...data.activity, ...data.activity].map((item, index) => (
        <div key={`${item.user}-${item.time}-${index}`}>
          <span className="avatar avatar--small">
            <UsersRound size={15} />
          </span>
          <div>
            <strong>{item.user}</strong>
            <small>{item.action}</small>
          </div>
          <time>{item.time}</time>
        </div>
      ))}
    </div>
  )
}

function statusClass(status: string) {
  if (status === 'تم الاستيراد' || status === 'Imported') return 'is-success'
  if (status === 'جاري المعالجة' || status === 'Processing') return 'is-info'
  if (status === 'قيد المراجعة' || status === 'In review') return 'is-warning'
  return 'is-danger'
}
