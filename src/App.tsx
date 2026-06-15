import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { adminPages } from './data/adminSeed'
import { adminPagesEn } from './data/adminSeedEn'
import { useLanguage } from './context/LanguageContext'
import { AdminShell } from './layouts/AdminShell'
import { AdminCourseLessonsPage } from './pages/admin/AdminCourseLessonsPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminManagementPage } from './pages/admin/AdminManagementPage'
import { AdminPlaceholderPage } from './pages/admin/AdminPlaceholderPage'
import { AdminYouTubeImportPage } from './pages/admin/AdminYouTubeImportPage'

function App() {
  const { language } = useLanguage()
  const pages = language === 'ar' ? adminPages : adminPagesEn

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route element={<AdminShell />}>
        <Route index path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/categories"
          element={<AdminPlaceholderPage badge="USELESS" description={language === 'ar' ? 'هذا القسم متوقف حالياً في نسخة لوحة التحكم.' : 'This section is disabled in the current admin version.'} title="USELESS" />}
        />
        <Route
          path="/admin/teachers"
          element={<AdminManagementPage key={pages.teachers.title} page={pages.teachers} />}
        />
        <Route
          path="/admin/books"
          element={<AdminManagementPage key={pages.books.title} page={pages.books} />}
        />
        <Route
          path="/admin/courses"
          element={<AdminManagementPage getRowHref={(_, index) => `/admin/courses/${index + 1}`} key={pages.courses.title} page={pages.courses} />}
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
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}

export default App
