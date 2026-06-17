import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { adminPages } from './data/adminSeed'
import { adminPagesEn } from './data/adminSeedEn'
import { ArchiveDataProvider, useArchiveData } from './context/ArchiveDataContext'
import { pickLocalizedText } from './data/shared/archive'
import { useLanguage } from './context/LanguageContext'

const AdminShell = lazy(() => import('./layouts/AdminShell').then((module) => ({ default: module.AdminShell })))
const AdminCourseLessonsPage = lazy(() => import('./pages/admin/AdminCourseLessonsPage').then((module) => ({ default: module.AdminCourseLessonsPage })))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard })))
const AdminManagementPage = lazy(() => import('./pages/admin/AdminManagementPage').then((module) => ({ default: module.AdminManagementPage })))
const AdminPlaceholderPage = lazy(() => import('./pages/admin/AdminPlaceholderPage').then((module) => ({ default: module.AdminPlaceholderPage })))
const AdminYouTubeImportPage = lazy(() => import('./pages/admin/AdminYouTubeImportPage').then((module) => ({ default: module.AdminYouTubeImportPage })))
const CategoriesPage = lazy(() => import('./pages/public/CategoriesPage').then((module) => ({ default: module.CategoriesPage })))
const CategoryDetailPage = lazy(() => import('./pages/public/CategoryDetailPage').then((module) => ({ default: module.CategoryDetailPage })))
const CourseDetailPage = lazy(() => import('./pages/public/CourseDetailPage').then((module) => ({ default: module.CourseDetailPage })))
const CoursesPage = lazy(() => import('./pages/public/CoursesPage').then((module) => ({ default: module.CoursesPage })))
const FatwaPage = lazy(() => import('./pages/public/FatwaPage').then((module) => ({ default: module.FatwaPage })))
const FatwaDetailPage = lazy(() => import('./pages/public/FatwaDetailPage').then((module) => ({ default: module.FatwaDetailPage })))
const LandingPage = lazy(() => import('./pages/public/LandingPage').then((module) => ({ default: module.LandingPage })))
const LibraryPage = lazy(() => import('./pages/public/LibraryPage').then((module) => ({ default: module.LibraryPage })))
const LibraryDetailPage = lazy(() => import('./pages/public/LibraryDetailPage').then((module) => ({ default: module.LibraryDetailPage })))
const LoginPage = lazy(() => import('./pages/public/LoginPage').then((module) => ({ default: module.LoginPage })))
const ScholarProfilePage = lazy(() => import('./pages/public/ScholarProfilePage').then((module) => ({ default: module.ScholarProfilePage })))
const ScholarAboutComingSoonPage = lazy(() => import('./pages/public/ScholarAboutComingSoonPage').then((module) => ({ default: module.ScholarAboutComingSoonPage })))
const SearchResultsPage = lazy(() => import('./pages/public/SearchResultsPage').then((module) => ({ default: module.SearchResultsPage })))
const ScholarsPage = lazy(() => import('./pages/public/ScholarsPage').then((module) => ({ default: module.ScholarsPage })))

function App() {
  return (
    <ArchiveDataProvider>
      <Suspense fallback={<div className="route-loader" />}>
        <AppRoutes />
      </Suspense>
    </ArchiveDataProvider>
  )
}

function AppRoutes() {
  const { language } = useLanguage()
  const pages = language === 'ar' ? adminPages : adminPagesEn
  const { books, categories, courses, deleteBookRow, deleteCategoryRow, deleteCourseRow, deleteScholarRow, saveBookRow, saveCategoryRow, saveCourseRow, saveScholarRow, scholars, toggleBookRowStatus, toggleCategoryRowStatus, toggleCourseRowStatus } = useArchiveData()

  useEffect(() => {
    document.title =
      language === 'ar'
        ? 'أنوار العلماء - منصة العلم الشرعي'
        : language === 'uz'
        ? 'Anvar al-Ulamo - Ilmiy platforma'
        : language === 'uzCyr'
        ? 'Анвар ал-Уламо - Илмий платформа'
        : language === 'ru'
        ? 'Анвар аль-Улама - Исламская научная платформа'
        : 'Anwar Alolmaa - Islamic Knowledge Platform'
  }, [language])

  const teacherRows = scholars.map((item, index) => ({
    image: item.image,
    name: pickLocalizedText(item.name, language),
    english: item.name.en,
    specialty: pickLocalizedText(item.field, language),
    courses: String(item.courses),
    lessons: String(item.lessons),
    fatwas: String(532 - index * 54),
    date: `2025-05-${String(Math.max(1, 14 - index)).padStart(2, '0')}`,
  }))

  const courseRows = courses.map((item) => ({
    title: pickLocalizedText(item.title, language),
    teacher: pickLocalizedText(item.teacher, language),
    category: pickLocalizedText(item.category, language),
    level: pickLocalizedText(item.level, language),
    lessons: String(item.lessons),
    status: pickLocalizedText(item.status, language),
  }))

  const bookRows = books.map((item) => ({
    title: pickLocalizedText(item.title, language),
    author: pickLocalizedText(item.author, language),
    category: pickLocalizedText(item.category, language),
    courses: String(item.explanations),
    file: pickLocalizedText(item.file, language),
    status: pickLocalizedText(item.status, language),
  }))

  const categoryRows = categories.map((item) => ({
    name: pickLocalizedText(item.title, language),
    slug: item.id,
    courses: String(item.courses),
    lessons: String(item.lessons),
    status: language === 'ar' ? 'منشور' : language === 'uz' ? 'Faol' : language === 'uzCyr' ? 'Фаол' : language === 'ru' ? 'Опубликовано' : 'Published',
    updated: language === 'ar' ? '17 يونيو 2026' : language === 'uz' ? '17-Iyun, 2026' : language === 'uzCyr' ? '17-Июн, 2026' : language === 'ru' ? '17 июня 2026' : 'June 17, 2026',
  }))

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/:categoryId" element={<CategoryDetailPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:courseId" element={<CourseDetailPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/scholars" element={<ScholarsPage />} />
      <Route path="/scholars/:scholarId" element={<ScholarProfilePage />} />
      <Route path="/scholars/:scholarId/about" element={<ScholarAboutComingSoonPage />} />
      <Route path="/fatwa" element={<FatwaPage />} />
      <Route path="/fatwa/:fatwaId" element={<FatwaDetailPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/:bookId" element={<LibraryDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AdminShell />}>
        <Route index path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/categories"
          element={<AdminManagementPage key={pages.categories.title} onDeleteRow={deleteCategoryRow} onSaveRow={saveCategoryRow} onToggleRowStatus={toggleCategoryRowStatus} page={pages.categories} rowsOverride={categoryRows} />}
        />
        <Route
          path="/admin/teachers"
          element={<AdminManagementPage key={pages.teachers.title} onDeleteRow={deleteScholarRow} onSaveRow={saveScholarRow} page={pages.teachers} rowsOverride={teacherRows} />}
        />
        <Route
          path="/admin/books"
          element={<AdminManagementPage key={pages.books.title} onDeleteRow={deleteBookRow} onSaveRow={saveBookRow} onToggleRowStatus={toggleBookRowStatus} page={pages.books} rowsOverride={bookRows} />}
        />
        <Route
          path="/admin/courses"
          element={<AdminManagementPage getRowHref={(_, index) => `/admin/courses/${index + 1}`} key={pages.courses.title} onDeleteRow={deleteCourseRow} onSaveRow={saveCourseRow} onToggleRowStatus={toggleCourseRowStatus} page={pages.courses} rowsOverride={courseRows} />}
        />
        <Route
          path="/admin/courses/:courseId"
          element={<AdminCourseLessonsPage key={`${language}-${pages.lessons.title}`} coursesPage={pages.courses} lessonsPage={pages.lessons} />}
        />
        <Route path="/admin/lessons" element={<Navigate to="/admin/courses" replace />} />
        <Route
          path="/admin/youtube-import"
          element={<AdminYouTubeImportPage />}
        />
        <Route
          path="/admin/import-review"
          element={<AdminManagementPage key={pages.importReview.title} page={pages.importReview} />}
        />
        <Route
          path="/admin/comments"
          element={<AdminPlaceholderPage badge={language === 'ar' ? 'لاحقاً' : language === 'uz' ? 'Keyinroq' : language === 'uzCyr' ? 'Кейинроқ' : language === 'ru' ? 'Позже' : 'Later'} description={language === 'ar' ? 'هذه الصفحة ستضاف في مرحلة التفاعل والمراجعة.' : language === 'uz' ? 'Ushbu sahifa moderatsiya bosqichida qo‘shiladi.' : language === 'uzCyr' ? 'Ушбу саҳифа модерация босқичида қўшилади.' : language === 'ru' ? 'Эта страница будет добавлена на этапе модерации.' : 'This page will be added during the moderation and interaction phase.'} title={language === 'ar' ? 'قريباً' : language === 'uz' ? 'Tez kunda' : language === 'uzCyr' ? 'Тез кунда' : language === 'ru' ? 'Скоро' : 'Coming soon'} />}
        />
        <Route
          path="/admin/search-index"
          element={<AdminManagementPage key={pages.searchIndex.title} page={pages.searchIndex} />}
        />
        <Route
          path="/admin/reports"
          element={<AdminPlaceholderPage badge={language === 'ar' ? 'لاحقاً' : language === 'uz' ? 'Keyinroq' : language === 'uzCyr' ? 'Кейинроқ' : language === 'ru' ? 'Позже' : 'Later'} description={language === 'ar' ? 'التقارير والتحليلات ستضاف بعد تثبيت بيانات المحتوى.' : language === 'uz' ? 'Hisobotlar va tahlillar kontent modeli barqarorlashgandan keyin qo‘shiladi.' : language === 'uzCyr' ? 'Ҳисоботлар ва таҳлиллар контент модели барқарорлашгандан кейин қўшилади.' : language === 'ru' ? 'Отчеты и аналитика будут добавлены после стабилизации модели данных контента.' : 'Reports and analytics will be added after the content data model is stable.'} title={language === 'ar' ? 'قريباً' : language === 'uz' ? 'Tez kunda' : language === 'uzCyr' ? 'Тез кунда' : language === 'ru' ? 'Скоро' : 'Coming soon'} />}
        />
        <Route
          path="/admin/settings"
          element={<AdminPlaceholderPage badge={language === 'ar' ? 'لاحقاً' : language === 'uz' ? 'Keyinroq' : language === 'uzCyr' ? 'Кейинроқ' : language === 'ru' ? 'Позже' : 'Later'} description={language === 'ar' ? 'إعدادات الموقع والصلاحيات ستضاف بعد تثبيت صفحات الإدارة الأساسية.' : language === 'uz' ? 'Sayt sozlamalari va ruxsatnomalar asosiy boshqaruv sahifalari tayyor bo‘lgach qo‘shiladi.' : language === 'uzCyr' ? 'Сайт созламалари ва рухсатномалар асосий бошқарув саҳифалари тайёр бўлгач қўшилади.' : language === 'ru' ? 'Настройки сайта и разрешения будут добавлены после готовности основных страниц администрирования.' : 'Site settings and permissions will be added after the core admin pages are stable.'} title={language === 'ar' ? 'قريباً' : language === 'uz' ? 'Tez kunda' : language === 'uzCyr' ? 'Тез кунда' : language === 'ru' ? 'Скоро' : 'Coming soon'} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
