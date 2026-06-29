import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { adminPages } from './data/adminSeed'
import { adminPagesEn } from './data/adminSeedEn'
import { ArchiveDataProvider, useArchiveData } from './context/ArchiveDataContext'
import { pickLocalizedText, formatNumber } from './data/shared/archive'
import { useLanguage } from './context/LanguageContext'

const AdminShell = lazy(() => import('./layouts/AdminShell').then((module) => ({ default: module.AdminShell })))
const AdminCategoriesPage = lazy(() => import('./pages/admin/AdminCategoriesPage').then((module) => ({ default: module.AdminCategoriesPage })))
const AdminCourseLessonsPage = lazy(() => import('./pages/admin/AdminCourseLessonsPage').then((module) => ({ default: module.AdminCourseLessonsPage })))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard })))
const AdminManagementPage = lazy(() => import('./pages/admin/AdminManagementPage').then((module) => ({ default: module.AdminManagementPage })))
const AdminScholarsPage = lazy(() => import('./pages/admin/AdminScholarsPage').then((module) => ({ default: module.AdminScholarsPage })))
const AdminScholarFormPage = lazy(() => import('./pages/admin/AdminScholarFormPage').then((module) => ({ default: module.AdminScholarFormPage })))
const AdminBookFormPage = lazy(() => import('./pages/admin/AdminBookFormPage').then((module) => ({ default: module.AdminBookFormPage })))
const AdminCourseFormPage = lazy(() => import('./pages/admin/AdminCourseFormPage').then((module) => ({ default: module.AdminCourseFormPage })))
const AdminPlaceholderPage = lazy(() => import('./pages/admin/AdminPlaceholderPage').then((module) => ({ default: module.AdminPlaceholderPage })))
const AdminYouTubeImportPage = lazy(() => import('./pages/admin/AdminYouTubeImportPage').then((module) => ({ default: module.AdminYouTubeImportPage })))
const AdminLectureFormPage = lazy(() => import('./pages/admin/AdminLectureFormPage').then((module) => ({ default: module.AdminLectureFormPage })))
const AdminLecturePartsPage = lazy(() => import('./pages/admin/AdminLecturePartsPage').then((module) => ({ default: module.AdminLecturePartsPage })))
const CategoriesPage = lazy(() => import('./pages/public/CategoriesPage').then((module) => ({ default: module.CategoriesPage })))
const CategoryDetailPage = lazy(() => import('./pages/public/CategoryDetailPage').then((module) => ({ default: module.CategoryDetailPage })))
const CourseDetailPage = lazy(() => import('./pages/public/CourseDetailPage').then((module) => ({ default: module.CourseDetailPage })))
const CoursesPage = lazy(() => import('./pages/public/CoursesPage').then((module) => ({ default: module.CoursesPage })))
const FatwaPage = lazy(() => import('./pages/public/FatwaPage').then((module) => ({ default: module.FatwaPage })))
const FatwaDetailPage = lazy(() => import('./pages/public/FatwaDetailPage').then((module) => ({ default: module.FatwaDetailPage })))
const LecturesPage = lazy(() => import('./pages/public/LecturesPage').then((module) => ({ default: module.LecturesPage })))
const LectureDetailPage = lazy(() => import('./pages/public/LectureDetailPage').then((module) => ({ default: module.LectureDetailPage })))
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
  const navigate = useNavigate()
  const { books, categories, courses, lectures, deleteBookRow, deleteCategoryRow, deleteCourseRow, saveBookRow, saveCategoryRow, saveCourseRow, toggleBookRowStatus, toggleCategoryRowStatus, toggleCourseRowStatus, deleteLectureRow, saveLectureRow, toggleLectureRowStatus } = useArchiveData()

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
    status: item.status ? pickLocalizedText(item.status, language) : (language === 'ar' ? 'منشور' : 'Published'),
    updated: item.updated ? pickLocalizedText(item.updated, language) : (language === 'ar' ? '17 يونيو 2026' : 'June 17, 2026'),
    description: pickLocalizedText(item.text, language),
    iconName: item.iconName || 'LibraryBig',
    imageUrl: item.imageUrl || '',
    parentId: item.parentId || '',
  }))

  const lectureRows = lectures.map((item) => ({
    title: pickLocalizedText(item.title, language),
    scholar: pickLocalizedText(item.scholar, language),
    category: pickLocalizedText(item.category, language),
    parts: `${item.parts.length} ${language === 'ar' ? 'أجزاء' : 'parts'}`,
    views: formatNumber(item.views),
    status: language === 'ar' ? 'منشور' : 'Published',
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
      <Route path="/lectures" element={<LecturesPage />} />
      <Route path="/lectures/:lectureId" element={<LectureDetailPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/:bookId" element={<LibraryDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AdminShell />}>
        <Route index path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/categories"
          element={<AdminCategoriesPage key={pages.categories.title} onDeleteRow={deleteCategoryRow} onSaveRow={saveCategoryRow} onToggleRowStatus={toggleCategoryRowStatus} page={pages.categories} rowsOverride={categoryRows} />}
        />
        <Route
          path="/admin/teachers"
          element={<AdminScholarsPage page={pages.teachers} />}
        />
        <Route
          path="/admin/teachers/new"
          element={<AdminScholarFormPage isAddMode={true} />}
        />
        <Route
          path="/admin/teachers/edit/:scholarId"
          element={<AdminScholarFormPage isAddMode={false} />}
        />
        <Route
          path="/admin/books"
          element={
            <AdminManagementPage
              key={pages.books.title}
              onDeleteRow={deleteBookRow}
              onSaveRow={saveBookRow}
              onToggleRowStatus={toggleBookRowStatus}
              page={pages.books}
              rowsOverride={bookRows}
              onAddClick={() => navigate('/admin/books/new')}
              onEditClick={(row) => {
                const originalIndex = bookRows.findIndex(r => r.title === row.title && r.author === row.author)
                const book = books[originalIndex]
                if (book) {
                  navigate(`/admin/books/edit/${book.id}`)
                }
              }}
            />
          }
        />
        <Route
          path="/admin/books/new"
          element={<AdminBookFormPage isAddMode={true} />}
        />
        <Route
          path="/admin/books/edit/:bookId"
          element={<AdminBookFormPage isAddMode={false} />}
        />
        <Route
          path="/admin/courses"
          element={
            <AdminManagementPage
              key={pages.courses.title}
              onDeleteRow={deleteCourseRow}
              onSaveRow={saveCourseRow}
              onToggleRowStatus={toggleCourseRowStatus}
              page={pages.courses}
              rowsOverride={courseRows}
              onAddClick={() => navigate('/admin/courses/new')}
              onEditClick={(row) => {
                const originalIndex = courseRows.findIndex(r => r.title === row.title && r.teacher === row.teacher)
                const course = courses[originalIndex]
                if (course) {
                  navigate(`/admin/courses/edit/${course.id}`)
                }
              }}
              getRowHref={(_, index) => `/admin/courses/${index + 1}`}
            />
          }
        />
        <Route
          path="/admin/courses/new"
          element={<AdminCourseFormPage isAddMode={true} />}
        />
        <Route
          path="/admin/courses/edit/:courseId"
          element={<AdminCourseFormPage isAddMode={false} />}
        />
        <Route
          path="/admin/courses/:courseId"
          element={<AdminCourseLessonsPage key={`${language}-${pages.lessons.title}`} coursesPage={pages.courses} lessonsPage={pages.lessons} />}
        />
        <Route path="/admin/lessons" element={<Navigate to="/admin/courses" replace />} />
        <Route
          path="/admin/lectures"
          element={
            <AdminManagementPage
              key={pages.lectures.title}
              onDeleteRow={deleteLectureRow}
              onSaveRow={saveLectureRow}
              onToggleRowStatus={toggleLectureRowStatus}
              page={pages.lectures}
              rowsOverride={lectureRows}
              onAddClick={() => navigate('/admin/lectures/new')}
              onEditClick={(row) => {
                const originalIndex = lectureRows.findIndex(r => r.title === row.title && r.scholar === row.scholar)
                const lecture = lectures[originalIndex]
                if (lecture) {
                  navigate(`/admin/lectures/edit/${lecture.id}`)
                }
              }}
              getRowHref={(row, index) => {
                const originalIndex = lectureRows.findIndex(r => r.title === row.title && r.scholar === row.scholar)
                const lecture = lectures[originalIndex]
                return lecture ? `/admin/lectures/${lecture.id}` : `/admin/lectures/${index + 1}`
              }}
              onImportClick={() => {
                alert(language === 'ar' ? 'جاري تهيئة واجهة استيراد المحاضرات...' : 'Initializing lectures import interface...')
              }}
            />
          }
        />
        <Route
          path="/admin/lectures/new"
          element={<AdminLectureFormPage isAddMode={true} />}
        />
        <Route
          path="/admin/lectures/edit/:lectureId"
          element={<AdminLectureFormPage isAddMode={false} />}
        />
        <Route
          path="/admin/lectures/:lectureId"
          element={<AdminLecturePartsPage />}
        />
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
