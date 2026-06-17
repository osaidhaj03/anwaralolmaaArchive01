import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../../components/public/LoginForm'
import { LoginVisual } from '../../components/public/LoginVisual'
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
  uz: {
    brand: 'Anvar al-Ulamo',
    subtitle: 'Ilmiy platforma',
    welcome: 'Xush kelibsiz',
    helper: 'Boshqaruv paneliga kirish uchun tizimga kiring',
    email: 'Elektron pochta',
    emailPlaceholder: 'Email manzilingizni kiriting',
    password: 'Parol',
    passwordPlaceholder: 'Parolingizni kiriting',
    remember: 'Eslab qolish',
    forgot: 'Parolni unutdingizmi?',
    login: 'Kirish',
    divider: 'Yoki bu orqali kiring',
    google: 'Google orqali kirish',
    microsoft: 'Microsoft orqali kirish',
    noAccount: 'Hisobingiz yo‘qmi?',
    create: 'Yangi hisob yaratish',
    headline: 'Islomiy ilmlar uchun to‘liq platforma',
    text: 'Biz tolibi ilmlar uchun olimlar, darslar va kitoblarni bitta ishonchli arxivga jamlaymiz.',
    books: 'Ishonchli kitoblar',
    lessons: 'Tizimli darslar',
    scholars: 'Mo‘tabar olimlar',
    copyright: '2025 © Anvar al-Ulamo - Barcha huquqlar himoyalangan',
    demo: 'Ushbu harakat faqat demo rejimida ishlaydi.',
    hidden: 'Parolni ko‘rsatish',
    visible: 'Parolni yashirish',
  },
  uzCyr: {
    brand: 'Анвар ал-Уламо',
    subtitle: 'Илмий платформа',
    welcome: 'Хуш келибсиз',
    helper: 'Бошқарув панелига кириш учун тизимга киринг',
    email: 'Электрон почта',
    emailPlaceholder: 'Эмаил манзилингизни киритинг',
    password: 'Пароль',
    passwordPlaceholder: 'Паролингизни киритинг',
    remember: 'Эслаб қолиш',
    forgot: 'Паролни унутдингизми?',
    login: 'Кириш',
    divider: 'Ёки бу орқали киринг',
    google: 'Google орқали кириш',
    microsoft: 'Microsoft орқали кириш',
    noAccount: 'Ҳисобингиз йўқми?',
    create: 'Янги ҳисоб яратиш',
    headline: 'Исломий илмлар учун тўлиқ платформа',
    text: 'Биз толиби илмлар учун олимлар, дарслар ва китобларни битта ишончли архивга жамлаймиз.',
    books: 'Ишончли китоблар',
    lessons: 'Тизимли дарслар',
    scholars: 'Мўътабар олимлар',
    copyright: '2025 © Анвар ал-Уламо - Барча ҳуқуқлар ҳимояланган',
    demo: 'Ушбу ҳаракат фақат демо режимида ишлайди.',
    hidden: 'Паролни кўрсатиш',
    visible: 'Паролни яшириш',
  },
  ru: {
    brand: 'Анвар аль-Улама',
    subtitle: 'Платформа исламских знаний',
    welcome: 'С возвращением',
    helper: 'Войдите для доступа к панели управления',
    email: 'Электронная почта',
    emailPlaceholder: 'Введите ваш email',
    password: 'Пароль',
    passwordPlaceholder: 'Введите ваш пароль',
    remember: 'Запомнить меня',
    forgot: 'Забыли пароль?',
    login: 'Войти',
    divider: 'Или войти через',
    google: 'Войти через Google',
    microsoft: 'Войти через Microsoft',
    noAccount: 'Нет учетной записи?',
    create: 'Создать новый аккаунт',
    headline: 'Единая платформа для исламских знаний',
    text: 'Мы объединяем ученых, уроки и книги в один авторитетный архив для искателей знаний.',
    books: 'Проверенные книги',
    lessons: 'Понятные уроки',
    scholars: 'Признанные ученые',
    copyright: '2025 © Анвар аль-Улама - Все права защищены',
    demo: 'Это действие доступно только в демонстрационном режиме.',
    hidden: 'Показать пароль',
    visible: 'Скрыть пароль',
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
        <LoginForm copy={copy} message={message} onMockAction={handleMockAction} onPasswordToggle={() => setShowPassword((current) => !current)} onSubmit={handleSubmit} showPassword={showPassword} />

        <p className="login-copyright">{copy.copyright}</p>
      </section>

      <LoginVisual copy={copy} language={language} onLanguageChange={setLanguage} onThemeToggle={toggleTheme} theme={theme} />
    </main>
  )
}
