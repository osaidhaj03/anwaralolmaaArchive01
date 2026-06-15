import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Boxes,
  FileQuestion,
  Files,
  GraduationCap,
  Landmark,
  LibraryBig,
  Mic2,
  Tags,
  UserRoundCheck,
  Video,
} from 'lucide-react'

export type ContentType =
  | 'categories'
  | 'teachers'
  | 'books'
  | 'courses'
  | 'lessons'
  | 'lectures'
  | 'fatwas'
  | 'attachments'

export type Status = 'published' | 'draft' | 'review'

export type ContentRecord = {
  id: number
  type: ContentType
  title: string
  category: string
  teacher: string
  related: string
  status: Status
  lessons: number
  updatedAt: string
}

export type Metric = {
  label: string
  value: string
  change: string
  icon: LucideIcon
  tone: 'gold' | 'blue' | 'teal' | 'green'
}

export const contentLabels: Record<ContentType, string> = {
  categories: 'الأقسام',
  teachers: 'المشايخ',
  books: 'الكتب',
  courses: 'الدورات',
  lessons: 'الدروس',
  lectures: 'المحاضرات',
  fatwas: 'الفتاوى',
  attachments: 'المرفقات',
}

export const statusLabels: Record<Status, string> = {
  published: 'منشور',
  draft: 'مسودة',
  review: 'مراجعة',
}

export const navItems = [
  { label: 'لوحة التحكم', icon: Landmark, active: true },
  { label: 'إدارة المحتوى', icon: Boxes },
  { label: 'إضافة محتوى', icon: Files },
  { label: 'الأقسام', icon: Tags },
  { label: 'المشايخ', icon: UserRoundCheck },
  { label: 'الكتب والمتون', icon: LibraryBig },
  { label: 'الدورات', icon: GraduationCap },
  { label: 'الدروس', icon: Video },
  { label: 'الفتاوى', icon: FileQuestion },
]

export const metrics: Metric[] = [
  {
    label: 'الدورات',
    value: '300',
    change: '12 دورة تحتاج مراجعة',
    icon: GraduationCap,
    tone: 'gold',
  },
  {
    label: 'الدروس',
    value: '10,842',
    change: '186 درس مضاف هذا الشهر',
    icon: Video,
    tone: 'blue',
  },
  {
    label: 'المشايخ',
    value: '48',
    change: '6 ملفات غير مكتملة',
    icon: UserRoundCheck,
    tone: 'teal',
  },
  {
    label: 'الكتب',
    value: '328',
    change: '41 كتاب مرتبط بدورات',
    icon: BookOpen,
    tone: 'green',
  },
]

export const contentStats = [
  { type: 'categories' as const, total: 20, ready: 18 },
  { type: 'courses' as const, total: 300, ready: 256 },
  { type: 'lessons' as const, total: 10842, ready: 10218 },
  { type: 'lectures' as const, total: 1256, ready: 1104 },
  { type: 'fatwas' as const, total: 20136, ready: 18790 },
  { type: 'attachments' as const, total: 714, ready: 588 },
]

export const contentRecords: ContentRecord[] = [
  {
    id: 1001,
    type: 'courses',
    title: 'شرح صحيح البخاري',
    category: 'الحديث وعلومه',
    teacher: 'د. محمد سعيد رسلان',
    related: 'صحيح البخاري',
    status: 'published',
    lessons: 186,
    updatedAt: '15 يونيو 2026',
  },
  {
    id: 1002,
    type: 'courses',
    title: 'شرح كتاب التوحيد',
    category: 'العقيدة',
    teacher: 'د. ربيع السرحاني',
    related: 'كتاب التوحيد',
    status: 'review',
    lessons: 89,
    updatedAt: '14 يونيو 2026',
  },
  {
    id: 1003,
    type: 'lessons',
    title: 'باب الإيمان من رياض الصالحين',
    category: 'الحديث وعلومه',
    teacher: 'د. صالح أبو الحاج',
    related: 'رياض الصالحين',
    status: 'published',
    lessons: 1,
    updatedAt: '13 يونيو 2026',
  },
  {
    id: 1004,
    type: 'fatwas',
    title: 'حكم طلب العلم عبر الدروس المسجلة',
    category: 'الفقه وأصوله',
    teacher: 'د. سعد الشثري',
    related: 'فتاوى طلب العلم',
    status: 'draft',
    lessons: 0,
    updatedAt: '12 يونيو 2026',
  },
  {
    id: 1005,
    type: 'books',
    title: 'العقيدة الواسطية',
    category: 'العقيدة',
    teacher: 'ابن تيمية',
    related: '3 شروح مرتبطة',
    status: 'published',
    lessons: 0,
    updatedAt: '11 يونيو 2026',
  },
  {
    id: 1006,
    type: 'lectures',
    title: 'منهج أهل السنة في التلقي',
    category: 'التوحيد',
    teacher: 'د. عبد العزيز بن باز',
    related: 'محاضرة مستقلة',
    status: 'review',
    lessons: 1,
    updatedAt: '10 يونيو 2026',
  },
  {
    id: 1007,
    type: 'attachments',
    title: 'ملخص شرح كتاب التوحيد PDF',
    category: 'العقيدة',
    teacher: 'فريق التحرير',
    related: 'شرح كتاب التوحيد',
    status: 'published',
    lessons: 0,
    updatedAt: '9 يونيو 2026',
  },
]

export const activityItems = [
  {
    icon: Mic2,
    title: 'تم ربط 24 درس بقناة اليوتيوب',
    meta: 'الاستيراد التجريبي',
    time: 'قبل 18 دقيقة',
  },
  {
    icon: Files,
    title: '3 دورات بانتظار اعتماد الصور',
    meta: 'إدارة الدورات',
    time: 'قبل ساعة',
  },
  {
    icon: FileQuestion,
    title: '12 فتوى تحتاج تصنيف قسم وشيخ',
    meta: 'المحتوى غير المصنف',
    time: 'اليوم',
  },
]
