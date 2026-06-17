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
import { useEffect, useMemo, useState } from 'react'
import { AdminDashboardModal } from '../../components/admin/AdminDashboardModal'
import { AdminPanelHeader } from '../../components/admin/AdminPanelHeader'
import { AdminStatGrid } from '../../components/admin/AdminStatGrid'
import { useArchiveStats, useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { formatNumber } from '../../data/shared/archive'

type DashboardData = {
  monthSuffix: string
  viewsTitle: string
  last30: string
  last7: string
  popularTitle: string
  importsTitle: string
  distributionTitle: string
  usersTitle: string
  activityTitle: string
  viewAll: string
  totalContent: string
  userMetrics: string[]
  imports: { title: string; lessons: string; status: string; date: string }[]
  activity: { user: string; action: string; time: string }[]
}

const dashboardData: Record<Language, DashboardData> = {
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
    totalContent: 'إجمالي المحتوى',
    userMetrics: ['إجمالي المستخدمين', 'المستخدمون النشطون', 'إجمالي ساعات المشاهدة', 'زيارات الصفحات'],
    imports: [
      { title: 'شرح كتاب التوحيد', lessons: '45 درس', status: 'تم الاستيراد', date: '16 مايو 2025' },
      { title: 'أصول الفقه', lessons: '28 درس', status: 'تم الاستيراد', date: '15 مايو 2025' },
      { title: 'تفسير سورة البقرة', lessons: '50 درس', status: 'جاري المعالجة', date: '15 مايو 2025' },
      { title: 'السيرة النبوية', lessons: '35 درس', status: 'قيد المراجعة', date: '14 مايو 2025' },
      { title: 'فقه المعاملات', lessons: '22 درس', status: 'فشل الاستيراد', date: '14 مايو 2025' },
    ],
    activity: [
      { user: 'أبو محمد', action: 'أضاف درس شرح كتاب التوحيد - الدرس 15', time: 'منذ 10 دقائق' },
      { user: 'فاطمة الزهراء', action: 'راجعت فتوى حكم طلب العلم', time: 'منذ 25 دقيقة' },
      { user: 'عبدالله', action: 'صنف درس أصول الفقه - الدرس 7', time: 'منذ ساعة' },
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
    totalContent: 'Total content',
    userMetrics: ['Total users', 'Active users', 'Total watch hours', 'Page visits'],
    imports: [
      { title: 'Explanation of Kitab at-Tawhid', lessons: '45 lessons', status: 'Imported', date: 'May 16, 2025' },
      { title: 'Principles of Fiqh', lessons: '28 lessons', status: 'Imported', date: 'May 15, 2025' },
      { title: 'Tafsir of Surat Al-Baqarah', lessons: '50 lessons', status: 'Processing', date: 'May 15, 2025' },
      { title: 'Prophetic Seerah', lessons: '35 lessons', status: 'In review', date: 'May 14, 2025' },
      { title: 'Fiqh Transactions', lessons: '22 lessons', status: 'Failed', date: 'May 14, 2025' },
    ],
    activity: [
      { user: 'Abu Muhammad', action: 'Added Kitab at-Tawhid - Lesson 15', time: '10 minutes ago' },
      { user: 'Fatimah Al-Zahra', action: 'Reviewed a fatwa about seeking knowledge', time: '25 minutes ago' },
      { user: 'Abdullah', action: 'Classified Principles of Fiqh - Lesson 7', time: '1 hour ago' },
    ],
  },
  uz: {
    monthSuffix: 'o‘tgan oyga nisbatan',
    viewsTitle: 'Ko‘rishlar statistikasi',
    last30: 'Oxirgi 30 kun',
    last7: 'Oxirgi 7 kun',
    popularTitle: 'Eng ko‘p ko‘rilgan darslar',
    importsTitle: 'YouTube orqali oxirgi importlar',
    distributionTitle: 'Mundarija taqsimoti',
    usersTitle: 'Foydalanuvchilar statistikasi',
    activityTitle: 'Oxirgi faoliyatlar',
    viewAll: 'Barchasini ko‘rish',
    totalContent: 'Umumiy kontent',
    userMetrics: ['Umumiy foydalanuvchilar', 'Faol foydalanuvchilar', 'Umumiy tomosha soatlari', 'Sahifa tashriflari'],
    imports: [
      { title: 'Tavhid kitobi sharhi', lessons: '45 dars', status: 'Import qilingan', date: '16-May, 2025' },
      { title: 'Usulul fiqh', lessons: '28 dars', status: 'Import qilingan', date: '15-May, 2025' },
      { title: 'Baqara surasi tafsiri', lessons: '50 dars', status: 'Ishlanmoqda', date: '15-May, 2025' },
      { title: 'Payg‘ambarimiz siyratlari', lessons: '35 dars', status: 'Ko‘rib chiqilmoqda', date: '14-May, 2025' },
      { title: 'Muomalalar fiqhi', lessons: '22 dars', status: 'Xato', date: '14-May, 2025' },
    ],
    activity: [
      { user: 'Abu Muhammad', action: 'Tavhid kitobi sharhi - 15-darsni qo‘shdi', time: '10 daqiqa oldin' },
      { user: 'Fotima al-Zahro', action: 'Ilm talab qilish haqidagi fatvoni ko‘rib chiqdi', time: '25 daqiqa oldin' },
      { user: 'Abdulloh', action: 'Usulul fiqh - 7-darsni tasnifladi', time: '1 soat oldin' },
    ],
  },
  uzCyr: {
    monthSuffix: 'ўтган ойга нисбатан',
    viewsTitle: 'Кўришлар статистикаси',
    last30: 'Охирги 30 кун',
    last7: 'Охирги 7 кун',
    popularTitle: 'Энг кўп кўрилган дарслар',
    importsTitle: 'YouTube орқали охирги импортлар',
    distributionTitle: 'Мундарижа тақсимоти',
    usersTitle: 'Фойдаланувчилар статистикаси',
    activityTitle: 'Охирги фаолиятлар',
    viewAll: 'Барчасини кўриш',
    totalContent: 'Умумий контент',
    userMetrics: ['Умумий фойдаланувчилар', 'Фаол фойдаланувчилар', 'Умумий томоша соатлари', 'Саҳифа ташрифлари'],
    imports: [
      { title: 'Тавҳид китоби шарҳи', lessons: '45 дарс', status: 'Импорт қилинган', date: '16-Май, 2025' },
      { title: 'Усулул фиқҳ', lessons: '28 дарс', status: 'Импорт қилинган', date: '15-Май, 2025' },
      { title: 'Бақара сураси тафсири', lessons: '50 дарс', status: 'Ишланмоқда', date: '15-Май, 2025' },
      { title: 'Пайғамбаримиз сийратлари', lessons: '35 дарс', status: 'Кўриб чиқилмоқда', date: '14-Май, 2025' },
      { title: 'Муомалалар фиқҳи', lessons: '22 дарс', status: 'Хато', date: '14-Май, 2025' },
    ],
    activity: [
      { user: 'Абу Муҳаммад', action: 'Тавҳид китоби шарҳи - 15-дарсни қўшди', time: '10 дақиқа олдин' },
      { user: 'Фотима ал-Заҳро', action: 'Илм талаб қилиш ҳақидаги фатвони кўриб чиқди', time: '25 дақиқа олдин' },
      { user: 'Абдуллоҳ', action: 'Усулул фиқҳ - 7-дарсни таснифлади', time: '1 соат олдин' },
    ],
  },
  ru: {
    monthSuffix: 'по сравнению с прошлым месяцем',
    viewsTitle: 'Аналитика просмотров',
    last30: 'Последние 30 дней',
    last7: 'Последние 7 дней',
    popularTitle: 'Самые просматриваемые уроки',
    importsTitle: 'Последние импорты с YouTube',
    distributionTitle: 'Распределение контента',
    usersTitle: 'Статистика пользователей',
    activityTitle: 'Последние действия',
    viewAll: 'Показать все',
    totalContent: 'Всего контента',
    userMetrics: ['Всего пользователей', 'Активные пользователи', 'Часы просмотра', 'Визиты страниц'],
    imports: [
      { title: 'Объяснение Книги Единобожия', lessons: '45 уроков', status: 'Импортировано', date: '16 мая 2025' },
      { title: 'Основы фикха', lessons: '28 уроков', status: 'Импортировано', date: '15 мая 2025' },
      { title: 'Тафсир суры Аль-Бакара', lessons: '50 уроков', status: 'В обработке', date: '15 мая 2025' },
      { title: 'Сира Пророка', lessons: '35 уроков', status: 'На проверке', date: '14 мая 2025' },
      { title: 'Фикх имущественных отношений', lessons: '22 урока', status: 'Ошибка', date: '14 мая 2025' },
    ],
    activity: [
      { user: 'Абу Мухаммад', action: 'Добавил Книгу Единобожия - Урок 15', time: '10 минут назад' },
      { user: 'Фатима аз-Захра', action: 'Проверила фетву об изучении знаний', time: '25 минут назад' },
      { user: 'Абдуллах', action: 'Классифицировал Основы фикха - Урок 7', time: '1 час назад' },
    ],
  },
}

export function AdminDashboard() {
  const { language } = useLanguage()
  const data = dashboardData[language]
  const archive = useLocalizedArchive(language)
  const stats = useArchiveStats()
  const [modalPanel, setModalPanel] = useState<string | null>(null)
  const [chartRange, setChartRange] = useState('30')

  const dashboardStats = useMemo(
    () => [
      { label: language === 'ar' ? 'إجمالي المشاهدات' : 'Total Views', value: formatNumber(stats.admin.views), change: '+18%', icon: Eye, tone: 'teal' },
      { label: language === 'ar' ? 'إجمالي الفتاوى' : 'Total Fatwas', value: formatNumber(stats.public.fatwas), change: '+10%', icon: FileQuestion, tone: 'rose' },
      { label: language === 'ar' ? 'إجمالي العلماء' : 'Total Scholars', value: String(stats.admin.scholars), change: '+6%', icon: UsersRound, tone: 'amber' },
      { label: language === 'ar' ? 'إجمالي الكتب' : 'Total Books', value: formatNumber(stats.admin.books), change: '+8%', icon: BookOpen, tone: 'violet' },
      { label: language === 'ar' ? 'إجمالي الدروس' : 'Total Lessons', value: formatNumber(stats.admin.lessons), change: '+15%', icon: PlaySquare, tone: 'green' },
      { label: language === 'ar' ? 'إجمالي الدورات' : 'Total Courses', value: String(stats.admin.courses), change: '+12%', icon: GraduationCap, tone: 'blue' },
    ],
    [language, stats],
  )

  const popularLessons = useMemo(
    () =>
      archive.courses.slice(0, 4).map((course, index) => ({
        title: `${course.title} ${language === 'ar' ? `- الدرس ${index + 1}` : `- Lesson ${index + 1}`}`,
        teacher: course.teacher,
        views: formatNumber(Math.max(1200, numericText(course.students) * 3)),
      })),
    [archive.courses, language],
  )

  const distribution = useMemo(() => {
    const items = [
      { label: language === 'ar' ? 'دروس' : 'Lessons', value: stats.public.lessons, color: '#4775e6' },
      { label: language === 'ar' ? 'كتب' : 'Books', value: stats.public.books, color: '#23a36f' },
      { label: language === 'ar' ? 'فتاوى' : 'Fatwas', value: stats.public.fatwas, color: '#f59e0b' },
      { label: language === 'ar' ? 'دورات' : 'Courses', value: stats.public.courses, color: '#8b5cf6' },
    ]
    const total = items.reduce((sum, item) => sum + item.value, 0)
    return items.map((item) => ({
      ...item,
      value: formatNumber(item.value),
      percent: total ? Number(((item.value / total) * 100).toFixed(1)) : 0,
    }))
  }, [language, stats])

  const userMetricValues = useMemo(
    () => [formatNumber(stats.admin.totalUsers), formatNumber(stats.admin.activeUsers), formatNumber(stats.admin.watchHours), formatNumber(stats.admin.pageVisits)],
    [stats],
  )

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
      <AdminStatGrid items={dashboardStats} monthSuffix={data.monthSuffix} />

      <section className="admin-grid">
        <article className="admin-panel chart-panel">
          <AdminPanelHeader title={data.viewsTitle}>
            <select onChange={(event) => setChartRange(event.target.value)} value={chartRange}>
              <option value="30">{data.last30}</option>
              <option value="7">{data.last7}</option>
            </select>
          </AdminPanelHeader>
          <div className="mock-chart" aria-label="رسم بياني للمشاهدات">
            {Array.from({ length: chartRange === '30' ? 18 : 7 }, (_, index) => (
              <span key={index} style={{ height: `${34 + ((index * 19) % 58)}%` }} />
            ))}
          </div>
        </article>

        <article className="admin-panel">
          <AdminPanelHeader actionLabel={data.viewAll} onAction={() => setModalPanel('popular')} title={data.popularTitle} />
          <div className="rank-list">
            {popularLessons.slice(0, 3).map((lesson, index) => (
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
          <AdminPanelHeader actionLabel={data.viewAll} onAction={() => setModalPanel('imports')} title={data.importsTitle} />
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
          <AdminPanelHeader actionLabel={data.viewAll} onAction={() => setModalPanel('distribution')} title={data.distributionTitle} />
          <div className="distribution">
            <div className="donut">
              <strong>{formatNumber(totalContent(stats))}</strong>
              <span>{data.totalContent}</span>
            </div>
            <div className="distribution-list">
              {distribution.map((item) => (
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
          <AdminPanelHeader actionLabel={data.viewAll} onAction={() => setModalPanel('users')} title={data.usersTitle} />
          <div className="user-metrics">
            <div>
              <UsersRound size={18} />
              <span>{data.userMetrics[0]}</span>
              <strong>{userMetricValues[0]}</strong>
            </div>
            <div>
              <TrendingUp size={18} />
              <span>{data.userMetrics[1]}</span>
              <strong>{userMetricValues[1]}</strong>
            </div>
            <div>
              <LibraryBig size={18} />
              <span>{data.userMetrics[2]}</span>
              <strong>{userMetricValues[2]}</strong>
            </div>
          </div>
        </article>

        <article className="admin-panel">
          <AdminPanelHeader actionLabel={data.viewAll} onAction={() => setModalPanel('activity')} title={data.activityTitle} />
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
        <AdminDashboardModal
          data={data}
          distribution={distribution}
          onClose={() => setModalPanel(null)}
          panel={modalPanel}
          popularLessons={popularLessons}
          totalContentValue={formatNumber(totalContent(stats))}
          userMetricValues={userMetricValues}
        />
      ) : null}
    </div>
  )
}

function numericText(value: string) {
  return Number(value.replace(/[^\d]/g, ''))
}

function totalContent(stats: ReturnType<typeof useArchiveStats>) {
  return stats.public.lessons + stats.public.books + stats.public.fatwas + stats.public.courses
}

function statusClass(status: string) {
  if (status === 'تم الاستيراد' || status === 'Imported') return 'is-success'
  if (status === 'جاري المعالجة' || status === 'Processing') return 'is-info'
  if (status === 'قيد المراجعة' || status === 'In review') return 'is-warning'
  return 'is-danger'
}
