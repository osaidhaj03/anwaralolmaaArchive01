import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { adminPages } from './data/adminSeed'
import { adminPagesEn } from './data/adminSeedEn'
import { ArchiveDataProvider, useArchiveData } from './context/ArchiveDataContext'
import { useLanguage } from './context/LanguageContext'
import { AdminShell } from './layouts/AdminShell'
import { AdminCourseLessonsPage } from './pages/admin/AdminCourseLessonsPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminManagementPage } from './pages/admin/AdminManagementPage'
import { AdminPlaceholderPage } from './pages/admin/AdminPlaceholderPage'
import { AdminYouTubeImportPage } from './pages/admin/AdminYouTubeImportPage'
import { CategoriesPage } from './pages/public/CategoriesPage'
import { CategoryDetailPage } from './pages/public/CategoryDetailPage'
import { CourseDetailPage } from './pages/public/CourseDetailPage'
import { CoursesPage } from './pages/public/CoursesPage'
import { FatwaPage } from './pages/public/FatwaPage'
import { FatwaDetailPage } from './pages/public/FatwaDetailPage'
import { LandingPage } from './pages/public/LandingPage'
import { LibraryPage } from './pages/public/LibraryPage'
import { LibraryDetailPage } from './pages/public/LibraryDetailPage'
import { LoginPage } from './pages/public/LoginPage'
import { ScholarProfilePage } from './pages/public/ScholarProfilePage'
import { ScholarAboutComingSoonPage } from './pages/public/ScholarAboutComingSoonPage'
import { SearchResultsPage } from './pages/public/SearchResultsPage'
import { ScholarsPage } from './pages/public/ScholarsPage'

function App() {
  return (
    <ArchiveDataProvider>
      <AppRoutes />
    </ArchiveDataProvider>
  )
}

function AppRoutes() {
  const { language } = useLanguage()
  const pages = language === 'ar' ? adminPages : adminPagesEn
  const { books, categories, courses, deleteBookRow, deleteCategoryRow, deleteCourseRow, deleteScholarRow, saveBookRow, saveCategoryRow, saveCourseRow, saveScholarRow, scholars, toggleBookRowStatus, toggleCategoryRowStatus, toggleCourseRowStatus } = useArchiveData()

  const teacherRows = scholars.map((item, index) => ({
    image: item.image,
    name: item.name.ar,
    english: item.name.en,
    specialty: language === 'ar' ? item.field.ar : item.field.en,
    courses: String(item.courses),
    lessons: String(item.lessons),
    fatwas: String(532 - index * 54),
    date: `2025-05-${String(Math.max(1, 14 - index)).padStart(2, '0')}`,
  }))

  const courseRows = courses.map((item) => ({
    title: language === 'ar' ? item.title.ar : item.title.en,
    teacher: language === 'ar' ? item.teacher.ar : item.teacher.en,
    category: language === 'ar' ? item.category.ar : item.category.en,
    level: language === 'ar' ? item.level.ar : item.level.en,
    lessons: String(item.lessons),
    status: language === 'ar' ? item.status.ar : item.status.en,
  }))

  const bookRows = books.map((item) => ({
    title: language === 'ar' ? item.title.ar : item.title.en,
    author: language === 'ar' ? item.author.ar : item.author.en,
    category: language === 'ar' ? item.category.ar : item.category.en,
    courses: String(item.explanations),
    file: language === 'ar' ? item.file.ar : item.file.en,
    status: language === 'ar' ? item.status.ar : item.status.en,
  }))

  const categoryRows = categories.map((item) => ({
    name: language === 'ar' ? item.title.ar : item.title.en,
    slug: item.id,
    courses: String(item.courses),
    lessons: String(item.lessons),
    status: language === 'ar' ? 'منشور' : 'Published',
    updated: language === 'ar' ? '17 يونيو 2026' : 'June 17, 2026',
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
          element={<AdminPlaceholderPage badge={language === 'ar' ? 'لاحقاً' : 'Later'} description={language === 'ar' ? 'هذه الصفحة ستضاف في مرحلة التفاعل والمراجعة.' : 'This page will be added during the moderation and interaction phase.'} title={language === 'ar' ? 'قريباً' : 'Coming soon'} />}
        />
        <Route
          path="/admin/search-index"
          element={<AdminManagementPage key={pages.searchIndex.title} page={pages.searchIndex} />}
        />
        <Route
          path="/admin/reports"
          element={<AdminPlaceholderPage badge={language === 'ar' ? 'لاحقاً' : 'Later'} description={language === 'ar' ? 'التقارير والتحليلات ستضاف بعد تثبيت بيانات المحتوى.' : 'Reports and analytics will be added after the content data model is stable.'} title={language === 'ar' ? 'قريباً' : 'Coming soon'} />}
        />
        <Route
          path="/admin/settings"
          element={<AdminPlaceholderPage badge={language === 'ar' ? 'لاحقاً' : 'Later'} description={language === 'ar' ? 'إعدادات الموقع والصلاحيات ستضاف بعد تثبيت صفحات الإدارة الأساسية.' : 'Site settings and permissions will be added after the core admin pages are stable.'} title={language === 'ar' ? 'قريباً' : 'Coming soon'} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
