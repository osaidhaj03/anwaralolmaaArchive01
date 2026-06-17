import { BookOpen, Eye, GraduationCap, LockKeyhole, LogIn, Mail, Moon, Sun, UsersRound } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrandMark } from '../../components/AdminIcons'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'

const loginCopy: Record<Language, Record<string, string>> = {
  ar: {
    brand: 'أنوار العلماء',
    subtitle: 'منصة العلم الشرعي',
    welcome: 'مرحباً بك مجدداً',
    helper: 'سجل الدخول للوصول إلى لوحة التحكم',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    remember: 'تذكرني',
    forgot: 'نسيت كلمة المرور؟',
    login: 'تسجيل الدخول',
    divider: 'أو تسجيل الدخول عبر',
    google: 'تسجيل الدخول عبر Google',
    microsoft: 'تسجيل الدخول عبر Microsoft',
    noAccount: 'ليس لديك حساب؟',
    create: 'إنشاء حساب جديد',
    headline: 'منصة متكاملة لنشر العلم الشرعي',
    text: 'نهدف إلى جمع علماء الأمة ومؤلفاتهم في مكان واحد لخدمة العلم وطلابه.',
    books: 'آلاف الكتب الموثوقة',
    lessons: 'دروس علمية مبسطة',
    scholars: 'كوكبة من أهل العلم',
    copyright: '2025 © أنوار العلماء - جميع الحقوق محفوظة',
    demo: 'تم تنفيذ هذا الإجراء كواجهة تجريبية فقط.',
    hidden: 'إظهار كلمة المرور',
    visible: 'إخفاء كلمة المرور',
  },
  en: {
    brand: 'Anwar Alolmaa',
    subtitle: 'Islamic Knowledge Platform',
    welcome: 'Welcome back',
    helper: 'Sign in to access the admin dashboard',
    email: 'Email address',
    emailPlaceholder: 'Enter your email address',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    remember: 'Remember me',
    forgot: 'Forgot password?',
    login: 'Log in',
    divider: 'Or sign in with',
    google: 'Sign in with Google',
    microsoft: 'Sign in with Microsoft',
    noAccount: 'Do not have an account?',
    create: 'Create a new account',
    headline: 'A complete platform for Islamic knowledge',
    text: 'We bring scholars, lessons, and books into one trusted archive for students of knowledge.',
    books: 'Trusted books',
    lessons: 'Clear lessons',
    scholars: 'Recognized scholars',
    copyright: '2025 © Anwar Alolmaa - All rights reserved',
    demo: 'This action is available as a frontend demo only.',
    hidden: 'Show password',
    visible: 'Hide password',
  },
}

export function LoginPage() {
  const { dir, language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const copy = loginCopy[language]
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    localStorage.setItem('admin_logged_in', 'true')
    navigate('/admin')
  }

  function handleMockAction() {
    setMessage(copy.demo)
  }

  return (
    <main className="login-page" dir={dir}>
      <section className="login-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card__heading">
            <h1>{copy.welcome}</h1>
            <p>{copy.helper}</p>
          </div>

          <label className="login-field">
            <span>{copy.email}</span>
            <div>
              <Mail size={19} />
              <input autoComplete="email" inputMode="email" placeholder={copy.emailPlaceholder} type="email" />
            </div>
          </label>

          <label className="login-field">
            <span>{copy.password}</span>
            <div>
              <LockKeyhole size={19} />
              <input autoComplete="current-password" placeholder={copy.passwordPlaceholder} type={showPassword ? 'text' : 'password'} />
              <button aria-label={showPassword ? copy.visible : copy.hidden} onClick={() => setShowPassword((current) => !current)} type="button">
                <Eye size={18} />
              </button>
            </div>
          </label>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              <span>{copy.remember}</span>
            </label>
            <button className="login-link-button" onClick={handleMockAction} type="button">{copy.forgot}</button>
          </div>

          <button className="login-submit" type="submit">
            <LogIn size={19} />
            {copy.login}
          </button>

          <div className="login-divider">
            <span>{copy.divider}</span>
          </div>

          <div className="social-login-row">
            <button onClick={handleMockAction} type="button">
              <span className="google-mark">G</span>
              {copy.google}
            </button>
            <button onClick={handleMockAction} type="button">
              <span className="microsoft-mark" />
              {copy.microsoft}
            </button>
          </div>

          <p className="signup-line">
            {copy.noAccount} <button className="login-link-button" onClick={handleMockAction} type="button">{copy.create}</button>
          </p>
          {message ? <p className="login-helper-message">{message}</p> : null}
        </form>

        <p className="login-copyright">{copy.copyright}</p>
      </section>

      <section className="login-visual">
        <div className="login-language">
          <button aria-label="Toggle dark mode" onClick={toggleTheme} type="button">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className={language === 'ar' ? 'is-active' : ''} onClick={() => setLanguage('ar')} type="button">
            AR
          </button>
          <button className={language === 'en' ? 'is-active' : ''} onClick={() => setLanguage('en')} type="button">
            EN
          </button>
        </div>

        <Link className="login-brand" to="/">
          <BrandMark />
          <div>
            <strong>{copy.brand}</strong>
            <span>{copy.subtitle}</span>
          </div>
        </Link>

        <div className="login-arch">
          <img alt={copy.brand} src="/brand/channel-banner.jpg" />
        </div>

        <div className="login-visual-copy">
          <h2>{copy.headline}</h2>
          <p>{copy.text}</p>
          <div className="login-benefits">
            <span>
              <BookOpen size={24} />
              {copy.books}
            </span>
            <span>
              <GraduationCap size={24} />
              {copy.lessons}
            </span>
            <span>
              <UsersRound size={24} />
              {copy.scholars}
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
