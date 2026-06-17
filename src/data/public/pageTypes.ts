import type { LucideIcon } from 'lucide-react'

export type PublicNavItemSeed = {
  label: string
  to: string
  icon: LucideIcon
}

export type PublicStatSeed = {
  value: string
  label: string
  icon: LucideIcon
}

export type CourseItem = {
  title: string
  teacher: string
  category: string
  level: string
  lessons: string
  hours: string
  students: string
  rating: string
  progress: number
  tone: string
  thumbnail: string
}

export type Scholar = {
  name: string
  title: string
  field: string
  country: string
  courses: number
  lessons: number
  students: string
  rating: string
  image: string
}

export type LibraryItem = {
  title: string
  author: string
  category: string
  type: string
  pages: string
  downloads: string
  views: string
  tone: string
}

export type FatwaItem = {
  title: string
  scholar: string
  category: string
  duration: string
  views: string
  date: string
  tone: string
  thumbnail: string
}

export type CategoryItem = {
  id: string
  title: string
  text: string
  icon: LucideIcon
  courses: number
  lessons: number
  books: number
}

export type LandingCategory = {
  title: string
  text: string
  icon: LucideIcon
}

export type LandingCourse = {
  title: string
  teacher: string
  lessons: string
  tone: string
  thumbnail?: string
}

export type CoursesCopy = {
  brand: string
  subtitle: string
  nav: PublicNavItemSeed[]
  searchLabel: string
  themeLabel: string
  languageLabel: string
  login: string
  breadcrumb: string
  title: string
  description: string
  searchPlaceholder: string
  all: string
  active: string
  completed: string
  empty: string
  stats: PublicStatSeed[]
  filtersTitle: string
  categoryFilter: string
  levelFilter: string
  statusFilter: string
  teacherFilter: string
  apply: string
  reset: string
  featured: string
  about: string
  content: string
  details: string
  showing: string
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  newsletterSuccess: string
  courses: CourseItem[]
}

export type ScholarsCopy = {
  brand: string
  subtitle: string
  nav: PublicNavItemSeed[]
  searchLabel: string
  themeLabel: string
  languageLabel: string
  login: string
  breadcrumb: string
  title: string
  description: string
  searchPlaceholder: string
  all: string
  fieldsTitle: string
  countriesTitle: string
  featuredTitle: string
  profile: string
  about: string
  contact: string
  stats: PublicStatSeed[]
  empty: string
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  newsletterSuccess: string
  scholars: Scholar[]
}

export type LibraryCopy = {
  brand: string
  subtitle: string
  nav: PublicNavItemSeed[]
  searchLabel: string
  themeLabel: string
  languageLabel: string
  login: string
  breadcrumb: string
  title: string
  description: string
  searchPlaceholder: string
  all: string
  categoryLabel: string
  authorLabel: string
  typeLabel: string
  latest: string
  mostDownloaded: string
  read: string
  download: string
  empty: string
  stats: PublicStatSeed[]
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  newsletterSuccess: string
  items: LibraryItem[]
}

export type FatwaCopy = {
  brand: string
  subtitle: string
  nav: PublicNavItemSeed[]
  searchLabel: string
  themeLabel: string
  languageLabel: string
  login: string
  breadcrumb: string
  title: string
  description: string
  searchPlaceholder: string
  all: string
  categoryLabel: string
  scholarLabel: string
  latest: string
  mostViewed: string
  watch: string
  empty: string
  stats: PublicStatSeed[]
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  newsletterSuccess: string
  items: FatwaItem[]
}

export type CategoriesCopy = {
  brand: string
  subtitle: string
  nav: PublicNavItemSeed[]
  searchLabel: string
  themeLabel: string
  languageLabel: string
  login: string
  breadcrumb: string
  title: string
  description: string
  searchPlaceholder: string
  sortLabel: string
  view: string
  empty: string
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  newsletterSuccess: string
  items: CategoryItem[]
}

export type LandingCopy = {
  brand: string
  subtitle: string
  nav: PublicNavItemSeed[]
  searchLabel: string
  themeLabel: string
  languageLabel: string
  login: string
  heroTitle: string
  heroText: string
  heroPlaceholder: string
  searchButton: string
  stats: PublicStatSeed[]
  categoriesTitle: string
  categories: LandingCategory[]
  coursesTitle: string
  coursesLink: string
  courses: LandingCourse[]
  scholarsTitle: string
  scholarsLink: string
  scholars: string[]
  booksTitle: string
  books: string[]
  bookMeta: string
  newsletterTitle: string
  newsletterText: string
  newsletterPlaceholder: string
  newsletterButton: string
  quickLinks: string
  footerText: string
  newsletterSuccess: string
}
