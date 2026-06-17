import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  PlayCircle,
  Search,
  Settings,
  Sun,
  Tags,
  UserRound,
  UsersRound,
} from 'lucide-react'
import { BrandMark } from '../components/AdminIcons'
import { useLanguage, type Language } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { label: { ar: 'لوحة التحكم', en: 'Dashboard' }, href: '/admin', icon: Home },
  { label: { ar: 'التصنيفات', en: 'Categories' }, href: '/admin/categories', icon: Tags },
  { label: { ar: 'العلماء', en: 'Scholars' }, href: '/admin/teachers', icon: UsersRound },
  { label: { ar: 'الكتب', en: 'Books' }, href: '/admin/books', icon: BookOpen },
  { label: { ar: 'الدورات', en: 'Courses' }, href: '/admin/courses', icon: GraduationCap },
  { label: { ar: 'الاستيراد', en: 'Import' }, href: '/admin/youtube-import', icon: PlayCircle },
  { label: { ar: 'مراجعة الاستيراد', en: 'Import Review' }, href: '/admin/import-review', icon: ClipboardList },
  { label: { ar: 'التعليقات والتنبيهات', en: 'Comments & Alerts' }, href: '/admin/comments', icon: MessageCircle },
  { label: { ar: 'فهرس البحث', en: 'Search Index' }, href: '/admin/search-index', icon: Search },
  { label: { ar: 'الإحصائيات والتقارير', en: 'Reports' }, href: '/admin/reports', icon: BarChart3 },
  { label: { ar: 'الإعدادات', en: 'Settings' }, href: '/admin/settings', icon: Settings },
]

export function AdminShell() {
  const { dir, language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const copy = shellCopy[language]
  const navigate = useNavigate()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setNotificationsOpen(false)
        setMobileNavOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main className="admin-shell" dir={dir}>
      {mobileNavOpen ? <button className="mobile-nav-backdrop" onClick={() => setMobileNavOpen(false)} type="button" /> : null}

      <aside className={`admin-sidebar ${mobileNavOpen ? 'is-open' : ''}`} aria-label={copy.sidebarLabel}>
        <div className="admin-brand">
          <BrandMark className="admin-brand__mark" />
          <div>
            <strong>{copy.brand}</strong>
            <span>{copy.tagline}</span>
          </div>
        </div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                className={({ isActive }) => (isActive ? 'is-active' : '')}
                end={item.href === '/admin'}
                key={item.href}
                onClick={() => setMobileNavOpen(false)}
                to={item.href}
              >
                <Icon size={19} />
                <span>{item.label[language]}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="admin-user-card">
          <div className="avatar">
            <UserRound size={20} />
            <span />
          </div>
          <div>
            <strong>{copy.user}</strong>
            <small>{copy.role}</small>
          </div>
          <ChevronDown size={16} />
        </div>

        <button className="logout-button" type="button">
          <LogOut size={18} />
          {copy.logout}
        </button>
      </aside>

      <section className="admin-workspace">
        <header className="mobile-appbar">
          <button onClick={() => setMobileNavOpen(true)} type="button" aria-label={copy.openMenu}>
            <Menu size={21} />
          </button>
          <div>
            <strong>{copy.brand}</strong>
            <span>{copy.title}</span>
          </div>
        </header>

        <header className="admin-topbar">
          <div>
            <h1>{copy.title}</h1>
            <span>{copy.breadcrumb}</span>
          </div>
          <div className="admin-topbar__actions">
            <div className="language-toggle" aria-label={copy.languageLabel}>
              <button className={language === 'ar' ? 'is-active' : ''} onClick={() => setLanguage('ar')} type="button">
                AR
              </button>
              <button className={language === 'en' ? 'is-active' : ''} onClick={() => setLanguage('en')} type="button">
                EN
              </button>
            </div>
            <button onClick={() => navigate('/')} type="button">{copy.userSite}</button>
            <button className="top-icon" onClick={toggleTheme} title={copy.theme} type="button">
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              className={`top-icon ${notificationsOpen ? 'is-active' : ''}`}
              onClick={() => setNotificationsOpen((current) => !current)}
              title={copy.notifications}
              type="button"
            >
              <Bell size={19} />
              <span>5</span>
            </button>
            <button className="date-button" type="button">
              <CalendarDays size={17} />
              {copy.dateRange}
            </button>
          </div>
        </header>

        {notificationsOpen ? (
          <div className="notification-popover">
            <div className="notification-popover__header">
              <strong>{copy.notifications}</strong>
              <button onClick={() => setNotificationsOpen(false)} type="button">
                ×
              </button>
            </div>
            <div className="notification-item">
              <span>1</span>
              <p>{copy.notificationOne}</p>
            </div>
            <div className="notification-item">
              <span>2</span>
              <p>{copy.notificationTwo}</p>
            </div>
            <div className="notification-item">
              <span>3</span>
              <p>{copy.notificationThree}</p>
            </div>
          </div>
        ) : null}

        <Outlet />
      </section>
    </main>
  )
}

const shellCopy: Record<Language, Record<string, string>> = {
  ar: {
    sidebarLabel: 'تنقل لوحة التحكم',
    brand: 'أنوار العلماء',
    tagline: 'منصة العلم الشرعي',
    user: 'أحمد الإدريسي',
    role: 'مدير النظام',
    logout: 'تسجيل الخروج',
    title: 'لوحة التحكم',
    breadcrumb: 'الرئيسية / لوحة التحكم',
    languageLabel: 'تغيير اللغة',
    userSite: 'المستخدم',
    theme: 'تغيير الوضع',
    notifications: 'الإشعارات',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    notificationOne: '3 دورات بانتظار المراجعة.',
    notificationTwo: '12 فيديو مستورد يحتاج تصنيفاً.',
    notificationThree: 'تم تحديث فهرس البحث التجريبي.',
    dateRange: 'مايو 2025 - يونيو 2025',
  },
  en: {
    sidebarLabel: 'Admin navigation',
    brand: 'Anwar Alolamaa',
    tagline: 'Islamic Knowledge Platform',
    user: 'Ahmad Al-Idrisi',
    role: 'System Admin',
    logout: 'Sign out',
    title: 'Dashboard',
    breadcrumb: 'Home / Dashboard',
    languageLabel: 'Change language',
    userSite: 'User',
    theme: 'Toggle theme',
    notifications: 'Notifications',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    notificationOne: '3 courses are waiting for review.',
    notificationTwo: '12 imported videos need classification.',
    notificationThree: 'The mock search index was updated.',
    dateRange: 'May 2025 - June 2025',
  },
}
