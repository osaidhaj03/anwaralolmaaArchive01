/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import * as Icons from 'lucide-react'
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
  sharedLectures,
  VIDEO_THUMBNAIL,
  type SharedBook,
  type SharedCategory,
  type SharedCourse,
  type SharedFatwa,
  type SharedScholar,
  type SharedLecture,
  type Localized,
} from '../data/shared/archive'

type ArchiveDataContextValue = {
  scholars: SharedScholar[]
  courses: SharedCourse[]
  books: SharedBook[]
  categories: SharedCategory[]
  fatwas: SharedFatwa[]
  lectures: SharedLecture[]
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
  saveBulkLessons: (courseIndex: number, rows: Record<string, string>[]) => void
  deleteLessonRow: (courseIndex: number, index: number) => void
  reorderLessons: (courseIndex: number) => void
  saveLectureRow: (row: Record<string, string>, index: number | null) => void
  deleteLectureRow: (index: number) => void
  toggleLectureRowStatus: (index: number, language: Language) => void
  saveLecturePartRow: (lectureIndex: number, row: Record<string, string>, index: number | null) => void
  deleteLecturePartRow: (lectureIndex: number, index: number) => void
}

export type ArchiveStats = {
  public: {
    categories: number
    courses: number
    lessons: number
    scholars: number
    books: number
    fatwas: number
    lectures: number
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
    lectures: number
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
  videoLinks?: { label: string; url: string; platform?: string; type?: 'video' | 'audio' }[]
  descriptionShort?: string
  descriptionLong?: string
  transcription?: string
  attachments?: { name: string; url: string; type: string }[]
  thumbnail?: string
}

const ArchiveDataContext = createContext<ArchiveDataContextValue | null>(null)
const STORAGE_KEYS = {
  scholars: 'anwar-archive-scholars',
  courses: 'anwar-archive-courses',
  books: 'anwar-archive-books-v2',
  categories: 'anwar-archive-categories',
  lessons: 'anwar-archive-lessons',
  lectures: 'anwar-archive-lectures-v2',
} as const

export function ArchiveDataProvider({ children }: { children: ReactNode }) {
  const [scholars, setScholars] = useState<SharedScholar[]>(() => normalizeScholars(readStoredValue(STORAGE_KEYS.scholars, sharedScholars)))
  const [courses, setCourses] = useState(() => readStoredValue(STORAGE_KEYS.courses, sharedCourses))
  const [books, setBooks] = useState(() => readStoredValue(STORAGE_KEYS.books, sharedBooks))
  const [categories, setCategories] = useState<SharedCategory[]>(() => normalizeCategories(readStoredValue(STORAGE_KEYS.categories, sharedCategories)))
  const [lessonsByCourse, setLessonsByCourse] = useState<Record<string, CourseLesson[]>>(() => readStoredValue(STORAGE_KEYS.lessons, buildDefaultLessons(sharedCourses)))
  const [lectures, setLectures] = useState<SharedLecture[]>(() => readStoredValue(STORAGE_KEYS.lectures, sharedLectures))

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

  useEffect(() => {
    writeStoredValue(STORAGE_KEYS.lectures, lectures)
  }, [lectures])

  const value = useMemo<ArchiveDataContextValue>(
    () => ({
      scholars,
      courses,
      books,
      categories,
      fatwas: sharedFatwas,
      lectures,
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
        let IconComponent = LibraryBig
        if (next.iconName && (Icons as any)[next.iconName]) {
          IconComponent = (Icons as any)[next.iconName]
        }
        next.icon = IconComponent

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
      toggleCategoryRowStatus(index) {
        setCategories((current) =>
          current.map((item, itemIndex) =>
            itemIndex === index
              ? {
                  ...item,
                  status:
                    item.status?.ar === 'منشور'
                      ? { ar: 'مراجعة', en: 'Review' }
                      : item.status?.ar === 'مراجعة'
                        ? { ar: 'مسودة', en: 'Draft' }
                        : { ar: 'منشور', en: 'Published' },
                }
              : item,
          ),
        )
      },
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
      saveBulkLessons(courseIndex, rows) {
        setLessonsByCourse((current) => {
          const key = String(courseIndex)
          const newLessons = rows.map(row => lessonFromRow(row))
          const currentLessons = current[key] ?? []
          const nextLessons = [...currentLessons, ...newLessons]
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
      saveLectureRow(row, index) {
        const next = lectureFromRow(row, index)
        setLectures((current) => {
          if (index === null || index < 0 || index >= current.length) {
            return [next, ...current]
          }
          return current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...next } : item))
        })
      },
      deleteLectureRow(index) {
        setLectures((current) => current.filter((_, itemIndex) => itemIndex !== index))
      },
      toggleLectureRowStatus() {},
      saveLecturePartRow(lectureIndex, row, index) {
        setLectures((current) => current.map((item, itemIndex) => {
          if (itemIndex !== lectureIndex) return item
          const newPart = {
            title: { ar: row.title || '', en: row.title || '' },
            duration: row.duration || '00:00',
            videoUrl: row.videoUrl || '',
            audioUrl: row.audioUrl || '',
            description: { ar: row.description || '', en: row.description || '' },
          }
          let newParts = [...item.parts]
          if (index === null || index < 0 || index >= newParts.length) {
            newParts.push(newPart)
          } else {
            newParts = newParts.map((p, pIndex) => pIndex === index ? newPart : p)
          }
          return { ...item, parts: newParts }
        }))
      },
      deleteLecturePartRow(lectureIndex, index) {
        setLectures((current) => current.map((item, itemIndex) => {
          if (itemIndex !== lectureIndex) return item
          return { ...item, parts: item.parts.filter((_, pIndex) => pIndex !== index) }
        }))
      },
    }),
    [books, categories, courses, lessonsByCourse, scholars, lectures],
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
    title: { ar: row.title || 'عالم شرعي', en: row.title || 'Scholar' },
    field: { ar: row.specialty || 'عام', en: row.specialty || 'General' },
    country: { ar: row.country || 'السعودية', en: row.country || 'Saudi Arabia' },
    courses: Number(row.courses || '0'),
    lessons: Number(String(row.lessons || '0').replace(/[^\d]/g, '')),
    students: 50000 + Number(row.courses || '0') * 2100,
    rating: row.rating || '4.8',
    image: row.image || '/scholars/Screenshot 2026-06-16 222158.png',
    bioShort: { ar: row.bioShort || '', en: row.bioShort || '' },
    bioLong: { ar: row.bioLong || '', en: row.bioLong || '' },
    birthYear: row.birthYear || '',
    deathYear: row.deathYear || '',
    categoryId: row.categoryId || '',
    kunya: { ar: row.kunya || '', en: row.kunya || '' },
    madhab: { ar: row.madhab || '', en: row.madhab || '' },
    seoTitle: row.seoTitle || '',
    seoDescription: row.seoDescription || '',
    seoKeywords: row.seoKeywords || '',
  }
}

function courseFromRow(row: Record<string, string>, index: number | null): SharedCourse {
  return {
    id: slugify(row.title || `course-${index ?? Date.now()}`),
    title: { ar: row.title || '', en: row.title || '' },
    teacher: { ar: row.teacher || '', en: row.teacher || '' },
    category: { ar: row.category || 'عام', en: row.category || 'General' },
    categoryId: row.categoryId || 'fiqh',
    level: { ar: row.level || 'متوسط', en: row.level || 'Intermediate' },
    lessons: Number(row.lessons || '0'),
    hours: Math.max(12, Math.round(Number(row.lessons || '0') / 3)),
    students: 4000 + Number(row.lessons || '0') * 18,
    rating: '4.7',
    progress: row.status === 'Published' || row.status === 'منشور' ? 82 : row.status === 'Review' || row.status === 'مراجعة' ? 55 : 24,
    tone: row.tone || 'green',
    status: localizedStatus(row.status),
    thumbnail: row.thumbnail || VIDEO_THUMBNAIL,
    descriptionShort: { ar: row.descriptionShort || '', en: row.descriptionShort || '' },
    descriptionLong: { ar: row.descriptionLong || '', en: row.descriptionLong || '' },
    seoTitle: row.seoTitle || '',
    seoDescription: row.seoDescription || '',
    seoKeywords: row.seoKeywords || '',
  }
}

function bookFromRow(row: Record<string, string>, index: number | null): SharedBook {
  return {
    id: slugify(row.title || `book-${index ?? Date.now()}`),
    title: { ar: row.title || '', en: row.title || '' },
    author: { ar: row.author || '', en: row.author || '' },
    category: { ar: row.category || 'عام', en: row.category || 'General' },
    type: { ar: 'كتاب', en: 'Book' },
    pages: Number(row.pages || '120'),
    downloads: Number(row.downloads || '4000'),
    views: Number(row.views || '12000'),
    tone: row.tone || 'green',
    explanations: Number(row.courses || '0'),
    file: row.file === 'Missing' ? { ar: 'ناقص', en: 'Missing' } : { ar: 'PDF', en: 'PDF' },
    status: localizedStatus(row.status),
    coverImage: row.coverImage || '',
    bookImages: row.bookImages ? row.bookImages.split(',,,') : [],
    downloadLink: row.downloadLink || '',
    fileType: row.fileType || '',
    source: row.source || '',
    kamelahLink: row.kamelahLink || row.shamelaLink || '',
    descriptionShort: { ar: row.descriptionShort || '', en: row.descriptionShort || '' },
    descriptionLong: { ar: row.descriptionLong || '', en: row.descriptionLong || '' },
    madhab: { ar: row.madhab || '', en: row.madhab || '' },
    volumes: (() => {
      try {
        return row.volumes ? JSON.parse(row.volumes) : []
      } catch (e) {
        return []
      }
    })(),
    downloadLinks: (() => {
      try {
        if (row.downloadLinks) {
          return JSON.parse(row.downloadLinks)
        }
      } catch (e) {}
      if (row.downloadLink) {
        return [{ url: row.downloadLink, fileType: row.fileType || 'PDF', source: row.source || '' }]
      }
      return []
    })(),
    seoTitle: row.seoTitle || '',
    seoDescription: row.seoDescription || '',
    seoKeywords: row.seoKeywords || '',
  }
}

function lectureFromRow(row: Record<string, string>, index: number | null): SharedLecture {
  return {
    id: row.id || slugify(row.title || `lecture-${index ?? Date.now()}`),
    title: { ar: row.title || '', en: row.title || '' },
    scholar: { ar: row.scholar || '', en: row.scholar || '' },
    scholarId: row.scholarId || 'saleh-fawzan',
    category: { ar: row.category || 'عام', en: row.category || 'General' },
    categoryId: row.categoryId || 'fiqh',
    views: Number(row.views || '0'),
    date: row.date || new Date().toISOString().split('T')[0],
    tone: row.tone || 'green',
    thumbnail: row.thumbnail || VIDEO_THUMBNAIL,
    description: { ar: row.description || '', en: row.description || '' },
    parts: (() => {
      try {
        return row.parts ? JSON.parse(row.parts) : []
      } catch (e) {
        return []
      }
    })(),
  }
}

function categoryFromRow(row: Record<string, string>, index: number | null): SharedCategory {
  const now = new Date()
  const formattedAr = `${now.getDate()} يونيو ${now.getFullYear()}`
  const formattedEn = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return {
    id: row.slug || slugify(row.name || `category-${index ?? Date.now()}`),
    title: { ar: row.name || '', en: row.name || '' },
    text: { ar: row.description || row.name || '', en: row.description || row.name || '' },
    icon: LibraryBig,
    iconName: row.iconName || 'LibraryBig',
    imageUrl: row.imageUrl || '',
    parentId: row.parentId || '',
    courses: Number(String(row.courses || '0').replace(/[^\d]/g, '')),
    lessons: Number(String(row.lessons || '0').replace(/[^\d]/g, '')),
    books: Math.max(12, Math.round(Number(String(row.courses || '0').replace(/[^\d]/g, '')) / 2)),
    status: localizedStatus(row.status),
    updated: row.updated ? { ar: row.updated, en: row.updated } : { ar: formattedAr, en: formattedEn },
    seoTitle: row.seoTitle || '',
    seoDescription: row.seoDescription || '',
    seoKeywords: row.seoKeywords || '',
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
  return categories.map((category, index) => {
    let IconComponent = Icons.Folder || LibraryBig
    const iconName = category.iconName || ''
    if (iconName && (Icons as any)[iconName]) {
      IconComponent = (Icons as any)[iconName]
    } else {
      IconComponent = sharedCategories.find((item) => item.id === category.id)?.icon ?? Icons.Folder ?? LibraryBig
    }
    return {
      ...category,
      icon: IconComponent,
      iconName: iconName || (sharedCategories.find((item) => item.id === category.id)?.icon as any)?.name || 'Folder',
      imageUrl: category.imageUrl || '',
      parentId: category.parentId || '',
      status: category.status || (index === 4 ? { ar: 'مراجعة', en: 'Review' } : { ar: 'منشور', en: 'Published' }),
      updated: category.updated || { ar: `${15 - index} يونيو 2026`, en: `June ${15 - index}, 2026` },
    }
  })
}

function normalizeScholars(scholars: SharedScholar[]) {
  const seedDefaults: Record<string, { bioShort: Localized; bioLong: Localized; birthYear: string; deathYear?: string; categoryId: string }> = {
    'saleh-fawzan': {
      bioShort: {
        ar: 'عضو هيئة كبار العلماء، وعضو اللجنة الدائمة للبحوث العلمية والإفتاء بالمملكة العربية السعودية، وفقيه ومحاضر بارز.',
        en: 'Member of the Council of Senior Scholars and the Permanent Committee for Fatwa, a prominent jurist and lecturer.'
      },
      bioLong: {
        ar: 'الشيخ صالح بن فوزان بن عبد الله الفوزان. ولد عام 1935م في القصيم. تلقى تعليمه الديني على أيدي كبار العلماء والتحق بجامعة الإمام محمد بن سعود الإسلامية. عُرف بمنهجيته الدقيقة ودروسه في العقيدة والفقه وشرح كتاب التوحيد.',
        en: 'Shaykh Saleh bin Fawzan al-Fawzan. Born in 1935 in Al-Qassim. He studied under senior scholars and joined Imam Mohammad Ibn Saud Islamic University. Famous for his lessons in Aqidah, Fiqh, and explanations of Kitab at-Tawhid.'
      },
      birthYear: '1354 هـ / 1935 م',
      categoryId: 'fiqh',
    },
    'ibn-uthaymeen': {
      bioShort: {
        ar: 'الشيخ الفقيه والمفسر، أستاذ العقيدة والفقه بجامعة الإمام بالقصيم سابقاً، وعضو هيئة كبار العلماء، رحمه الله.',
        en: 'The renowned jurist and commentator, former professor of Aqidah and Fiqh at Imam University, and member of the Council of Senior Scholars.'
      },
      bioLong: {
        ar: 'الشيخ محمد بن صالح العثيمين. ولد في عنيزة بالقصيم عام 1347هـ وتتلمذ على يد الشيخ السعدي والشيخ ابن باز. اشتهر بتسهيل العلوم وتصنيف الشروح الميسرة في شتى العلوم الشرعية وتوفي عام 1421هـ رحمه الله.',
        en: 'Shaykh Muhammad ibn Saleh al-Uthaymeen. Born in Unayzah in 1347 AH. He studied under Shaykh as-Sa\'di and Shaykh Ibn Baz. Renowned for simplifying Islamic sciences and authoring accessible commentaries. Passed away in 1421 AH.'
      },
      birthYear: '1347 هـ / 1929 م',
      deathYear: '1421 هـ / 2001 م',
      categoryId: 'fiqh',
    },
    'ibn-baz': {
      bioShort: {
        ar: 'سماحة الشيخ المفتي العام السابق للمملكة العربية السعودية، ورئيس هيئة كبار العلماء، ورئيس إدارة البحوث العلمية والإفتاء، رحمه الله.',
        en: 'The former Grand Mufti of Saudi Arabia, President of the Council of Senior Scholars, and one of the leading scholars of the 20th century.'
      },
      bioLong: {
        ar: 'الشيخ عبد العزيز بن عبد الله بن باز. ولد في الرياض عام 1330هـ وفقد بصره في شبابه، وحفظ القرآن والعلوم الشرعية مبكراً. درّس وأفتى ونشر العلم لأكثر من نصف قرن، وتولى الفتوى العامة وتوفي عام 1420هـ رحمه الله.',
        en: 'Shaykh Abdulaziz ibn Abdullah Ibn Baz. Born in Riyadh in 1330 AH. He lost his sight in his youth and memorized the Quran and Islamic sciences early on. He taught and issued fatwas for over 50 years, passing away in 1420 AH.'
      },
      birthYear: '1330 هـ / 1912 م',
      deathYear: '1420 هـ / 1999 م',
      categoryId: 'aqidah',
    },
  }

  return scholars.map((scholar) => {
    const defaults = seedDefaults[scholar.id] || {
      bioShort: { ar: 'عالم شرعي ومحاضر يشارك في تدريس العلوم الإسلامية والأرشيف العلمي.', en: 'Islamic scholar and lecturer teaching Islamic sciences.' },
      bioLong: { ar: 'عالم شرعي يشارك في الأنشطة الدعوية والتعليمية، وله دروس مسجلة في شروح المتون وتحرير المسائل الشرعية.', en: 'Islamic scholar engaged in educational and dawah activities, with recorded lessons explaining classical texts.' },
      birthYear: '—',
      categoryId: scholar.field?.ar?.includes('فقه') ? 'fiqh' : scholar.field?.ar?.includes('عقيدة') ? 'aqidah' : 'hadith',
    }

    return {
      ...scholar,
      bioShort: scholar.bioShort || defaults.bioShort,
      bioLong: scholar.bioLong || defaults.bioLong,
      birthYear: scholar.birthYear || defaults.birthYear,
      deathYear: scholar.deathYear || defaults.deathYear,
      categoryId: scholar.categoryId || defaults.categoryId,
    }
  })
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
  const { books, categories, courses, fatwas, lectures, scholars } = useArchiveData()

  return useMemo(
    () => ({
      scholars: scholars.map((item) => ({
        id: item.id,
        name: pickLocalizedText(item.name, language),
        title: pickLocalizedText(item.title, language),
        field: pickLocalizedText(item.field, language),
        country: pickLocalizedText(item.country, language),
        courses: item.courses,
        lessons: item.lessons,
        students: formatNumber(item.students),
        rating: item.rating,
        image: item.image,
        bioShort: item.bioShort ? pickLocalizedText(item.bioShort, language) : '',
        bioLong: item.bioLong ? pickLocalizedText(item.bioLong, language) : '',
        birthYear: item.birthYear || '',
        deathYear: item.deathYear || '',
        categoryId: item.categoryId || '',
        seoTitle: item.seoTitle || '',
        seoDescription: item.seoDescription || '',
        seoKeywords: item.seoKeywords || '',
      })),
      courses: courses.map((item) => {
        const resolvedCategory = categories.find((category) => category.id === item.categoryId)
        return {
          id: item.id,
          title: pickLocalizedText(item.title, language),
          teacher: pickLocalizedText(item.teacher, language),
          category: resolvedCategory ? pickLocalizedText(resolvedCategory.title, language) : pickLocalizedText(item.category, language),
          categoryId: item.categoryId,
          level: pickLocalizedText(item.level, language),
          lessons:
            language === 'ar'
              ? `${formatNumber(item.lessons)} درس`
              : language === 'uz'
              ? `${formatNumber(item.lessons)} dars`
              : language === 'uzCyr'
              ? `${formatNumber(item.lessons)} дарс`
              : language === 'ru'
              ? `${formatNumber(item.lessons)} уроков`
              : `${formatNumber(item.lessons)} lessons`,
          hours:
            language === 'ar'
              ? `${item.hours} ساعة`
              : language === 'uz'
              ? `${item.hours} soat`
              : language === 'uzCyr'
              ? `${item.hours} соат`
              : language === 'ru'
              ? `${item.hours} часов`
              : `${item.hours} hours`,
          students: formatNumber(item.students),
          rating: item.rating,
          progress: item.progress,
          tone: item.tone,
          thumbnail: item.thumbnail || VIDEO_THUMBNAIL,
          descriptionShort: item.descriptionShort ? pickLocalizedText(item.descriptionShort, language) : '',
          descriptionLong: item.descriptionLong ? pickLocalizedText(item.descriptionLong, language) : '',
          seoTitle: item.seoTitle || '',
          seoDescription: item.seoDescription || '',
          seoKeywords: item.seoKeywords || '',
        }
      }),
      books: books.map((item) => ({
        id: item.id,
        title: pickLocalizedText(item.title, language),
        author: pickLocalizedText(item.author, language),
        category: pickLocalizedText(item.category, language),
        type: pickLocalizedText(item.type, language),
        pages: String(item.pages),
        downloads: formatNumber(item.downloads),
        views: formatNumber(item.views),
        tone: item.tone,
        coverImage: item.coverImage || '',
        bookImages: item.bookImages || [],
        downloadLink: item.downloadLink || '',
        fileType: item.fileType || '',
        source: item.source || '',
        kamelahLink: item.kamelahLink || '',
        descriptionShort: item.descriptionShort ? pickLocalizedText(item.descriptionShort, language) : '',
        descriptionLong: item.descriptionLong ? pickLocalizedText(item.descriptionLong, language) : '',
        madhab: item.madhab ? pickLocalizedText(item.madhab, language) : '',
        volumes: item.volumes || [],
        downloadLinks: item.downloadLinks || [],
        seoTitle: item.seoTitle || '',
        seoDescription: item.seoDescription || '',
        seoKeywords: item.seoKeywords || '',
      })),
      categories: categories.map((item) => {
        const parent = categories.find((c) => c.id === item.parentId)
        return {
          id: item.id,
          title: pickLocalizedText(item.title, language),
          text: pickLocalizedText(item.text, language),
          icon: item.icon,
          imageUrl: item.imageUrl || '',
          parentId: item.parentId || '',
          parentTitle: parent ? pickLocalizedText(parent.title, language) : '',
          courses: item.courses,
          lessons: item.lessons,
          books: item.books,
          seoTitle: item.seoTitle || '',
          seoDescription: item.seoDescription || '',
          seoKeywords: item.seoKeywords || '',
        }
      }),
      fatwas: fatwas.map((item) => ({
        title: pickLocalizedText(item.title, language),
        scholar: pickLocalizedText(item.scholar, language),
        category: pickLocalizedText(item.category, language),
        duration: item.duration,
        views: formatNumber(item.views),
        date: item.date,
        tone: item.tone,
        thumbnail: item.thumbnail || VIDEO_THUMBNAIL,
      })),
      lectures: lectures.map((item) => ({
        id: item.id,
        title: pickLocalizedText(item.title, language),
        scholar: pickLocalizedText(item.scholar, language),
        scholarId: item.scholarId,
        category: pickLocalizedText(item.category, language),
        categoryId: item.categoryId,
        views: formatNumber(item.views),
        date: item.date,
        tone: item.tone,
        thumbnail: item.thumbnail || VIDEO_THUMBNAIL,
        description: item.description ? pickLocalizedText(item.description, language) : '',
        parts: item.parts.map((p) => ({
          title: pickLocalizedText(p.title, language),
          duration: p.duration,
          videoUrl: p.videoUrl,
          audioUrl: p.audioUrl,
          description: p.description ? pickLocalizedText(p.description, language) : '',
        })),
      })),
    }),
    [books, categories, courses, fatwas, language, scholars, lectures],
  )
}

export function useArchiveStats(): ArchiveStats {
  const { books, categories, courses, fatwas, lectures, lessonsByCourse, scholars } = useArchiveData()

  return useMemo(() => {
    const lessonEntries = Object.values(lessonsByCourse)
    const lessons = lessonEntries.reduce((total, items) => total + items.length, 0)
    const courseStudents = courses.reduce((total, item) => total + item.students, 0)
    const scholarStudents = scholars.reduce((total, item) => total + item.students, 0)
    const downloads = books.reduce((total, item) => total + item.downloads, 0)
    const bookReads = books.reduce((total, item) => total + item.views, 0)
    const fatwaReads = fatwas.reduce((total, item) => total + item.views, 0)
    const lectureReads = lectures.reduce((total, item) => total + item.views, 0)
    const reads = bookReads + fatwaReads + lectureReads
    const lectureWatchHours = lectures.reduce((total, item) => {
      const partsDuration = item.parts.reduce((pTotal, p) => pTotal + durationToHours(p.duration), 0)
      return total + partsDuration
    }, 0)
    const watchHours =
      courses.reduce((total, item) => total + item.hours, 0) +
      fatwas.reduce((total, item) => total + durationToHours(item.duration), 0) +
      lectureWatchHours
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
        lectures: lectures.length,
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
        lectures: lectures.length,
        views: reads,
        watchHours: Math.round(watchHours),
        activeUsers,
        totalUsers,
        pageVisits,
      },
    }
  }, [books, categories.length, courses, fatwas, lectures, lessonsByCourse, scholars])
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
        title: lessonIndex === 0 ? 'مقدمة الدورة والتعريف بالكتاب المشروح' : `الدرس ${lessonIndex + 1}: شرح المسائل الفقهية والتحرير`,
        videoLinks: [
          { label: 'البث الرئيسي (YouTube)', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
          { label: 'بث احتياطي 1 (سيرفر داخلي)', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { label: 'بث احتياطي 2 (Telegram Direct)', url: 'https://www.w3schools.com/html/movie.mp4' }
        ],
        descriptionShort: 'يتضمن هذا الدرس شرحاً وافياً وموجزاً لأهم القضايا والمسائل التي طُرحت في الفصل الدراسي مع توضيح الأدلة الشرعية.',
        descriptionLong: 'في هذه المحاضرة المفصلة، يتناول فضيلة الشيخ بالشرح والتحليل أبواب الكتاب، حيث بدأ بشرح أهم القواعد الأصولية المرتبطة بالباب، ثم ثنّى بذكر الخلاف الفقهي وتوجيه أقوال الأئمة الأربعة، مع التركيز على المذهب الراجح بالدليل والأثر الشرعي، وينتهي الدرس بالإجابة على أسئلة الطلاب الحضور.',
        transcription: 'بسم الله الرحمن الرحيم، الحمد لله رب العالمين، والصلاة والسلام على نبينا محمد وعلى آله وصحبه أجمعين. أما بعد، فهذا هو المجلس الأول من مجالس شرح هذا الكتاب المبارك، وسنتكلم اليوم إن شاء الله عن مقدمة المصنف والتمهيد للباب الأول من أبواب العبادات والتعريف بالاصطلاحات التي سنستعملها طيلة هذه الدورة العلمية المباركة لكي يتيسر على طالب العلم المبتدئ والمتوسط فهم كلام أهل العلم وضبط أصول المسائل الفقهية...',
        attachments: [
          { name: 'كتاب الشرح المساعد (ملف PDF)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'PDF' },
          { name: 'ملخص الدرس والخرائط الذهنية', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'PDF' }
        ]
      })),
    ]),
  ) as Record<string, CourseLesson[]>
}

function lessonFromRow(row: Record<string, string>): CourseLesson {
  let parsedLinks: { label: string; url: string; platform?: string; type?: 'video' | 'audio' }[] = []
  try {
    if (row.videoLinks) {
      parsedLinks = JSON.parse(row.videoLinks)
    }
  } catch (e) {}

  parsedLinks = parsedLinks.map(link => {
    let platform = link.platform
    if (!platform) {
      const url = link.url.toLowerCase()
      if (url.includes('youtube.com') || url.includes('youtu.be')) platform = 'youtube'
      else if (url.includes('t.me') || url.includes('telegram')) platform = 'telegram'
      else if (url.includes('vimeo.com')) platform = 'vimeo'
      else if (url.includes('archive.org')) platform = 'archive'
      else platform = 'custom'
    }
    return { ...link, platform, type: link.type || 'video' }
  })

  let parsedAttachments: { name: string; url: string; type: string }[] = []
  try {
    if (row.attachments) {
      parsedAttachments = JSON.parse(row.attachments)
    }
  } catch (e) {}

  return {
    course: row.course || '',
    duration: row.duration || '45:00',
    locked: row.status === 'Draft' || row.status === 'مسودة',
    number: row.number || '1',
    status: row.status || 'Draft',
    teacher: row.teacher || '',
    title: row.title || '',
    videoLinks: parsedLinks.length > 0 ? parsedLinks : (row.videoUrl ? [{ label: 'البث الرئيسي (YouTube)', url: row.videoUrl, platform: 'youtube', type: 'video' }] : []),
    descriptionShort: row.descriptionShort || '',
    descriptionLong: row.descriptionLong || '',
    transcription: row.transcription || '',
    attachments: parsedAttachments,
    thumbnail: row.thumbnail || '',
  }
}

function renumberLessons(lessons: CourseLesson[]) {
  return lessons.map((lesson, index) => ({ ...lesson, number: String(index + 1) }))
}

function durationToHours(duration: string) {
  const [minutes = '0', seconds = '0'] = duration.split(':')
  return Number(minutes) / 60 + Number(seconds) / 3600
}
