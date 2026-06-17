/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LibraryBig } from 'lucide-react'
import type { Language } from './LanguageContext'
import {
  formatNumber,
  pickLocalizedText,
  sharedBooks,
  sharedCategories,
  sharedCourses,
  sharedFatwas,
  sharedScholars,
  type SharedBook,
  type SharedCategory,
  type SharedCourse,
  type SharedFatwa,
  type SharedScholar,
} from '../data/shared/archive'

type ArchiveDataContextValue = {
  scholars: SharedScholar[]
  courses: SharedCourse[]
  books: SharedBook[]
  categories: SharedCategory[]
  fatwas: SharedFatwa[]
  lessonsByCourse: Record<string, CourseLesson[]>
  saveScholarRow: (row: Record<string, string>, index: number | null) => void
  deleteScholarRow: (index: number) => void
  toggleScholarRowStatus: (index: number, language: Language) => void
  saveCourseRow: (row: Record<string, string>, index: number | null) => void
  deleteCourseRow: (index: number) => void
  toggleCourseRowStatus: (index: number, language: Language) => void
  saveBookRow: (row: Record<string, string>, index: number | null) => void
  deleteBookRow: (index: number) => void
  toggleBookRowStatus: (index: number, language: Language) => void
  saveCategoryRow: (row: Record<string, string>, index: number | null) => void
  deleteCategoryRow: (index: number) => void
  toggleCategoryRowStatus: (index: number, language: Language) => void
  saveLessonRow: (courseIndex: number, row: Record<string, string>, index: number | null) => void
  deleteLessonRow: (courseIndex: number, index: number) => void
  reorderLessons: (courseIndex: number) => void
}

export type ArchiveStats = {
  public: {
    categories: number
    courses: number
    lessons: number
    scholars: number
    books: number
    fatwas: number
    downloads: number
    reads: number
    students: number
  }
  admin: {
    scholars: number
    courses: number
    lessons: number
    books: number
    fatwas: number
    views: number
    watchHours: number
    activeUsers: number
    totalUsers: number
    pageVisits: number
  }
}

export type CourseLesson = {
  course: string
  duration: string
  locked: boolean
  number: string
  status: string
  teacher: string
  title: string
}

const ArchiveDataContext = createContext<ArchiveDataContextValue | null>(null)
const STORAGE_KEYS = {
  scholars: 'anwar-archive-scholars',
  courses: 'anwar-archive-courses',
  books: 'anwar-archive-books',
  categories: 'anwar-archive-categories',
  lessons: 'anwar-archive-lessons',
} as const

export function ArchiveDataProvider({ children }: { children: ReactNode }) {
  const [scholars, setScholars] = useState(() => readStoredValue(STORAGE_KEYS.scholars, sharedScholars))
  const [courses, setCourses] = useState(() => readStoredValue(STORAGE_KEYS.courses, sharedCourses))
  const [books, setBooks] = useState(() => readStoredValue(STORAGE_KEYS.books, sharedBooks))
  const [categories, setCategories] = useState(() => normalizeCategories(readStoredValue(STORAGE_KEYS.categories, sharedCategories)))
  const [lessonsByCourse, setLessonsByCourse] = useState<Record<string, CourseLesson[]>>(() => readStoredValue(STORAGE_KEYS.lessons, buildDefaultLessons(sharedCourses)))

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.scholars, scholars)
  }, [scholars])

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.courses, courses)
  }, [courses])

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.books, books)
  }, [books])

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.categories, categories)
  }, [categories])

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.lessons, lessonsByCourse)
  }, [lessonsByCourse])

  const value = useMemo<ArchiveDataContextValue>(
    () => ({
      scholars,
      courses,
      books,
      categories,
      fatwas: sharedFatwas,
      lessonsByCourse,
      saveScholarRow(row, index) {
        const next = scholarFromRow(row, index)
        setScholars((current) => {
          if (index === null || index < 0 || index >= current.length) {
            return [next, ...current]
          }
          return current.map((item, itemIndex) => (itemIndex === index ? next : item))
        })
      },
      deleteScholarRow(index) {
        setScholars((current) => current.filter((_, itemIndex) => itemIndex !== index))
      },
      toggleScholarRowStatus() {},
      saveCourseRow(row, index) {
        const next = courseFromRow(row, index)
        setCourses((current) => {
          if (index === null || index < 0 || index >= current.length) {
            return [next, ...current]
          }
          return current.map((item, itemIndex) => (itemIndex === index ? next : item))
        })
      },
      deleteCourseRow(index) {
        setCourses((current) => current.filter((_, itemIndex) => itemIndex !== index))
      },
      toggleCourseRowStatus(index) {
        setCourses((current) =>
          current.map((item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,
                  status:
                    item.status.ar === 'منشور'
                      ? { ar: 'مراجعة', en: 'Review' }
                      : item.status.ar === 'مراجعة'
                        ? { ar: 'مسودة', en: 'Draft' }
                        : { ar: 'منشور', en: 'Published' },
                }
              : item,
          ),
        )
      },
      saveBookRow(row, index) {
        const next = bookFromRow(row, index)
        setBooks((current) => {
          if (index === null || index < 0 || index >= current.length) {
            return [next, ...current]
          }
          return current.map((item, itemIndex) => (itemIndex === index ? next : item))
        })
      },
      deleteBookRow(index) {
        setBooks((current) => current.filter((_, itemIndex) => itemIndex !== index))
      },
      toggleBookRowStatus(index) {
        setBooks((current) =>
          current.map((item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,
                  status:
                    item.status.ar === 'منشور'
                      ? { ar: 'مراجعة', en: 'Review' }
                      : { ar: 'منشور', en: 'Published' },
                }
              : item,
          ),
        )
      },
      saveCategoryRow(row, index) {
        const next = categoryFromRow(row, index)
        setCategories((current) => {
          if (index === null || index < 0 || index >= current.length) {
            return [next, ...current]
          }
          return current.map((item, itemIndex) => (itemIndex === index ? next : item))
        })
      },
      deleteCategoryRow(index) {
        setCategories((current) => current.filter((_, itemIndex) => itemIndex !== index))
      },
      toggleCategoryRowStatus() {},
      saveLessonRow(courseIndex, row, index) {
        setLessonsByCourse((current) => {
          const key = String(courseIndex)
          const nextLesson = lessonFromRow(row)
          const currentLessons = current[key] ?? []
          const nextLessons =
            index === null || index < 0 || index >= currentLessons.length
              ? [...currentLessons, nextLesson]
              : currentLessons.map((item, itemIndex) => (itemIndex === index ? nextLesson : item))
          return { ...current, [key]: renumberLessons(nextLessons) }
        })
      },
      deleteLessonRow(courseIndex, index) {
        setLessonsByCourse((current) => {
          const key = String(courseIndex)
          const currentLessons = current[key] ?? []
          return { ...current, [key]: renumberLessons(currentLessons.filter((_, itemIndex) => itemIndex !== index)) }
        })
      },
      reorderLessons(courseIndex) {
        setLessonsByCourse((current) => {
          const key = String(courseIndex)
          const currentLessons = current[key] ?? []
          return { ...current, [key]: renumberLessons([...currentLessons].reverse()) }
        })
      },
    }),
    [books, categories, courses, lessonsByCourse, scholars],
  )

  return <ArchiveDataContext.Provider value={value}>{children}</ArchiveDataContext.Provider>
}

export function useArchiveData() {
  const context = useContext(ArchiveDataContext)
  if (!context) {
    throw new Error('useArchiveData must be used within ArchiveDataProvider')
  }
  return context
}

function scholarFromRow(row: Record<string, string>, index: number | null): SharedScholar {
  return {
    id: slugify(row.english || row.name || `scholar-${index ?? Date.now()}`),
    name: { ar: row.name || '', en: row.english || row.name || '' },
    title: { ar: row.specialty ? `متخصص في ${row.specialty}` : 'عالم شرعي', en: row.specialty || 'Scholar' },
    field: { ar: row.specialty || 'عام', en: row.specialty || 'General' },
    country: { ar: 'السعودية', en: 'Saudi Arabia' },
    courses: Number(row.courses || '0'),
    lessons: Number(String(row.lessons || '0').replace(/[^\d]/g, '')),
    students: 50000 + Number(row.courses || '0') * 2100,
    rating: '4.8',
    image: row.image || '/scholars/Screenshot 2026-06-16 222158.png',
  }
}

function courseFromRow(row: Record<string, string>, index: number | null): SharedCourse {
  return {
    id: slugify(row.title || `course-${index ?? Date.now()}`),
    title: { ar: row.title || '', en: row.title || '' },
    teacher: { ar: row.teacher || '', en: row.teacher || '' },
    category: { ar: row.category || 'عام', en: row.category || 'General' },
    categoryId: 'fiqh',
    level: { ar: row.level || 'متوسط', en: row.level || 'Intermediate' },
    lessons: Number(row.lessons || '0'),
    hours: Math.max(12, Math.round(Number(row.lessons || '0') / 3)),
    students: 4000 + Number(row.lessons || '0') * 18,
    rating: '4.7',
    progress: row.status === 'Published' || row.status === 'منشور' ? 82 : row.status === 'Review' || row.status === 'مراجعة' ? 55 : 24,
    tone: 'green',
    status: localizedStatus(row.status),
  }
}

function bookFromRow(row: Record<string, string>, index: number | null): SharedBook {
  return {
    id: slugify(row.title || `book-${index ?? Date.now()}`),
    title: { ar: row.title || '', en: row.title || '' },
    author: { ar: row.author || '', en: row.author || '' },
    category: { ar: row.category || 'عام', en: row.category || 'General' },
    type: { ar: 'كتاب', en: 'Book' },
    pages: 120,
    downloads: 4000,
    views: 12000,
    tone: 'green',
    explanations: Number(row.courses || '0'),
    file: row.file === 'Missing' ? { ar: 'ناقص', en: 'Missing' } : { ar: 'PDF', en: 'PDF' },
    status: localizedStatus(row.status),
  }
}

function categoryFromRow(row: Record<string, string>, index: number | null): SharedCategory {
  return {
    id: row.slug || slugify(row.name || `category-${index ?? Date.now()}`),
    title: { ar: row.name || '', en: row.name || '' },
    text: { ar: row.description || row.name || '', en: row.description || row.name || '' },
    icon: sharedCategories[index ?? 0]?.icon ?? LibraryBig,
    courses: Number(String(row.courses || '0').replace(/[^\d]/g, '')),
    lessons: Number(String(row.lessons || '0').replace(/[^\d]/g, '')),
    books: Math.max(12, Math.round(Number(String(row.courses || '0').replace(/[^\d]/g, '')) / 2)),
  }
}

function localizedStatus(status: string | undefined) {
  if (status === 'Review' || status === 'مراجعة') return { ar: 'مراجعة', en: 'Review' }
  if (status === 'Draft' || status === 'مسودة') return { ar: 'مسودة', en: 'Draft' }
  return { ar: 'منشور', en: 'Published' }
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff]+/g, '-').replace(/^-+|-+$/g, '')
}

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function normalizeCategories(categories: SharedCategory[]) {
  return categories.map((category, index) => ({
    ...category,
    icon: sharedCategories.find((item) => item.id === category.id)?.icon ?? sharedCategories[index]?.icon ?? LibraryBig,
  }))
}

function writeStoredValue<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore storage write failures in mock mode.
  }
}

export function useLocalizedArchive(language: Language) {
  const { books, categories, courses, fatwas, scholars } = useArchiveData()

  return useMemo(
    () => ({
      scholars: scholars.map((item) => ({
        name: pickLocalizedText(item.name, language),
        title: pickLocalizedText(item.title, language),
        field: pickLocalizedText(item.field, language),
        country: pickLocalizedText(item.country, language),
        courses: item.courses,
        lessons: item.lessons,
        students: formatNumber(item.students),
        rating: item.rating,
        image: item.image,
      })),
      courses: courses.map((item) => {
        const resolvedCategory = categories.find((category) => category.id === item.categoryId)
        return {
          title: pickLocalizedText(item.title, language),
          teacher: pickLocalizedText(item.teacher, language),
          category: resolvedCategory ? pickLocalizedText(resolvedCategory.title, language) : pickLocalizedText(item.category, language),
          categoryId: item.categoryId,
          level: pickLocalizedText(item.level, language),
          lessons: language === 'ar' ? `${formatNumber(item.lessons)} درس` : `${formatNumber(item.lessons)} lessons`,
          hours: language === 'ar' ? `${item.hours} ساعة` : `${item.hours} hours`,
          students: formatNumber(item.students),
          rating: item.rating,
          progress: item.progress,
          tone: item.tone,
        }
      }),
      books: books.map((item) => ({
        title: pickLocalizedText(item.title, language),
        author: pickLocalizedText(item.author, language),
        category: pickLocalizedText(item.category, language),
        type: pickLocalizedText(item.type, language),
        pages: String(item.pages),
        downloads: formatNumber(item.downloads),
        views: formatNumber(item.views),
        tone: item.tone,
      })),
      categories: categories.map((item) => ({
        id: item.id,
        title: pickLocalizedText(item.title, language),
        text: pickLocalizedText(item.text, language),
        icon: item.icon,
        courses: item.courses,
        lessons: item.lessons,
        books: item.books,
      })),
      fatwas: fatwas.map((item) => ({
        title: pickLocalizedText(item.title, language),
        scholar: pickLocalizedText(item.scholar, language),
        category: pickLocalizedText(item.category, language),
        duration: item.duration,
        views: formatNumber(item.views),
        date: item.date,
        tone: item.tone,
      })),
    }),
    [books, categories, courses, fatwas, language, scholars],
  )
}

export function useArchiveStats(): ArchiveStats {
  const { books, categories, courses, fatwas, lessonsByCourse, scholars } = useArchiveData()

  return useMemo(() => {
    const lessonEntries = Object.values(lessonsByCourse)
    const lessons = lessonEntries.reduce((total, items) => total + items.length, 0)
    const courseStudents = courses.reduce((total, item) => total + item.students, 0)
    const scholarStudents = scholars.reduce((total, item) => total + item.students, 0)
    const downloads = books.reduce((total, item) => total + item.downloads, 0)
    const bookReads = books.reduce((total, item) => total + item.views, 0)
    const fatwaReads = fatwas.reduce((total, item) => total + item.views, 0)
    const reads = bookReads + fatwaReads
    const watchHours =
      courses.reduce((total, item) => total + item.hours, 0) +
      fatwas.reduce((total, item) => total + durationToHours(item.duration), 0)
    const activeUsers = Math.max(courses.length * 120, Math.round(courseStudents * 0.18))
    const totalUsers = Math.max(activeUsers + 5000, Math.round((courseStudents + scholarStudents) * 0.32))
    const pageVisits = reads + downloads + activeUsers * 4

    return {
      public: {
        categories: categories.length,
        courses: courses.length,
        lessons,
        scholars: scholars.length,
        books: books.length,
        fatwas: fatwas.length,
        downloads,
        reads,
        students: courseStudents,
      },
      admin: {
        scholars: scholars.length,
        courses: courses.length,
        lessons,
        books: books.length,
        fatwas: fatwas.length,
        views: reads,
        watchHours: Math.round(watchHours),
        activeUsers,
        totalUsers,
        pageVisits,
      },
    }
  }, [books, categories.length, courses, fatwas, lessonsByCourse, scholars])
}

function buildDefaultLessons(courses: SharedCourse[]) {
  return Object.fromEntries(
    courses.map((course, index) => [
      String(index),
      Array.from({ length: 8 }, (_, lessonIndex) => ({
        course: course.title.en,
        duration: ['45:32', '43:18', '48:05', '50:21', '46:15', '44:30', '41:12', '52:08'][lessonIndex],
        locked: lessonIndex > 2,
        number: String(lessonIndex + 1),
        status: lessonIndex > 2 ? 'Draft' : 'Published',
        teacher: course.teacher.en,
        title: lessonIndex === 0 ? 'Course introduction and book overview' : `${course.title.en} - Lesson ${lessonIndex + 1}`,
      })),
    ]),
  ) as Record<string, CourseLesson[]>
}

function lessonFromRow(row: Record<string, string>): CourseLesson {
  return {
    course: row.course || '',
    duration: row.duration || '45:00',
    locked: row.status === 'Draft' || row.status === 'مسودة',
    number: row.number || '1',
    status: row.status || 'Draft',
    teacher: row.teacher || '',
    title: row.title || '',
  }
}

function renumberLessons(lessons: CourseLesson[]) {
  return lessons.map((lesson, index) => ({ ...lesson, number: String(index + 1) }))
}

function durationToHours(duration: string) {
  const [minutes = '0', seconds = '0'] = duration.split(':')
  return Number(minutes) / 60 + Number(seconds) / 3600
}
