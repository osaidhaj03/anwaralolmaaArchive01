import { BookOpen, GraduationCap, LibraryBig, UserRound, type LucideIcon } from 'lucide-react'
import type { Language } from '../../context/LanguageContext'

type Localized = {
  ar: string
  en: string
}

export type SharedCategory = {
  id: string
  title: Localized
  text: Localized
  icon: LucideIcon
  courses: number
  lessons: number
  books: number
}

export type SharedScholar = {
  id: string
  name: Localized
  title: Localized
  field: Localized
  country: Localized
  courses: number
  lessons: number
  students: number
  rating: string
  image: string
}

export type SharedCourse = {
  id: string
  title: Localized
  teacher: Localized
  category: Localized
  categoryId: string
  level: Localized
  lessons: number
  hours: number
  students: number
  rating: string
  progress: number
  tone: string
  status: Localized
}

export type SharedBook = {
  id: string
  title: Localized
  author: Localized
  category: Localized
  type: Localized
  pages: number
  downloads: number
  views: number
  tone: string
  explanations: number
  file: Localized
  status: Localized
}

export type SharedFatwa = {
  id: string
  title: Localized
  scholar: Localized
  category: Localized
  duration: string
  views: number
  date: string
  tone: string
}

export const sharedCategories: SharedCategory[] = [
  { id: 'quran', title: { ar: 'القرآن الكريم', en: 'Quran Studies' }, text: { ar: 'علوم القرآن والتفسير وعلومه', en: 'Tafsir, recitation, and Quranic sciences' }, icon: BookOpen, courses: 89, lessons: 2541, books: 156 },
  { id: 'aqidah', title: { ar: 'العقيدة', en: 'Aqidah' }, text: { ar: 'العقيدة والتوحيد وأصول الإيمان', en: 'Creed, tawhid, and foundations of faith' }, icon: LibraryBig, courses: 78, lessons: 1356, books: 78 },
  { id: 'fiqh', title: { ar: 'الفقه وأصوله', en: 'Fiqh and Usul' }, text: { ar: 'الفقه الإسلامي وأصول الفقه والقواعد', en: 'Islamic jurisprudence, usul, and legal maxims' }, icon: GraduationCap, courses: 332, lessons: 5412, books: 632 },
  { id: 'hadith', title: { ar: 'الحديث وعلومه', en: 'Hadith Sciences' }, text: { ar: 'السنة النبوية وشرح الأحاديث', en: 'Prophetic tradition and hadith commentary' }, icon: BookOpen, courses: 210, lessons: 3612, books: 210 },
  { id: 'seerah', title: { ar: 'السيرة النبوية', en: 'Prophetic Seerah' }, text: { ar: 'سيرة النبي والدروس المستفادة', en: 'Biography of the Prophet and lessons from it' }, icon: UserRound, courses: 32, lessons: 845, books: 312 },
  { id: 'arabic', title: { ar: 'اللغة العربية', en: 'Arabic Language' }, text: { ar: 'النحو والصرف والبلاغة', en: 'Grammar, morphology, and rhetoric' }, icon: LibraryBig, courses: 45, lessons: 1624, books: 86 },
]

export const sharedScholars: SharedScholar[] = [
  { id: 'saleh-fawzan', name: { ar: 'الشيخ صالح الفوزان', en: 'Shaykh Saleh Al-Fawzan' }, title: { ar: 'عضو هيئة كبار العلماء', en: 'Senior Scholars Council member' }, field: { ar: 'الفقه وأصوله', en: 'Fiqh and Usul' }, country: { ar: 'السعودية', en: 'Saudi Arabia' }, courses: 42, lessons: 1860, students: 156842, rating: '4.9', image: '/scholars/Screenshot 2026-06-16 222158.png' },
  { id: 'ibn-uthaymeen', name: { ar: 'الشيخ محمد بن صالح العثيمين', en: 'Shaykh Ibn Uthaymeen' }, title: { ar: 'عالم وفقيه', en: 'Scholar and jurist' }, field: { ar: 'الفقه والعقيدة', en: 'Fiqh and Aqidah' }, country: { ar: 'السعودية', en: 'Saudi Arabia' }, courses: 38, lessons: 1520, students: 142300, rating: '4.9', image: '/scholars/Screenshot 2026-06-16 222008.png' },
  { id: 'ibn-baz', name: { ar: 'الشيخ عبدالعزيز بن باز', en: 'Shaykh Abdulaziz Ibn Baz' }, title: { ar: 'مفتي عام سابق', en: 'Former grand mufti' }, field: { ar: 'العقيدة والفتوى', en: 'Aqidah and Fatwa' }, country: { ar: 'السعودية', en: 'Saudi Arabia' }, courses: 45, lessons: 2156, students: 180215, rating: '5.0', image: '/scholars/Screenshot 2026-06-16 222158.png' },
  { id: 'saad-shithri', name: { ar: 'الشيخ سعد الشثري', en: 'Shaykh Saad Al-Shithri' }, title: { ar: 'أستاذ الفقه وأصوله', en: 'Professor of Usul al-Fiqh' }, field: { ar: 'أصول الفقه', en: 'Usul al-Fiqh' }, country: { ar: 'السعودية', en: 'Saudi Arabia' }, courses: 28, lessons: 856, students: 84210, rating: '4.8', image: '/scholars/Screenshot 2026-06-16 222008.png' },
  { id: 'rabi-madkhali', name: { ar: 'الشيخ ربيع المدخلي', en: 'Shaykh Rabi Al-Madkhali' }, title: { ar: 'أستاذ الحديث', en: 'Hadith professor' }, field: { ar: 'الحديث وعلومه', en: 'Hadith Sciences' }, country: { ar: 'السعودية', en: 'Saudi Arabia' }, courses: 31, lessons: 980, students: 74920, rating: '4.7', image: '/scholars/Screenshot 2026-06-16 222158.png' },
  { id: 'raslan', name: { ar: 'الشيخ محمد سعيد رسلان', en: 'Shaykh Muhammad Saeed Raslan' }, title: { ar: 'داعية ومحاضر', en: 'Lecturer and preacher' }, field: { ar: 'العقيدة والسلوك', en: 'Aqidah and Conduct' }, country: { ar: 'مصر', en: 'Egypt' }, courses: 35, lessons: 1245, students: 92410, rating: '4.8', image: '/scholars/Screenshot 2026-06-16 222008.png' },
  { id: 'abdulmuhsin-abbad', name: { ar: 'الشيخ عبدالمحسن العباد', en: 'Shaykh Abdulmuhsin Al-Abbad' }, title: { ar: 'محدث وفقيه', en: 'Hadith scholar' }, field: { ar: 'الحديث وعلومه', en: 'Hadith Sciences' }, country: { ar: 'السعودية', en: 'Saudi Arabia' }, courses: 26, lessons: 732, students: 63125, rating: '4.7', image: '/scholars/Screenshot 2026-06-16 222158.png' },
  { id: 'qaradawi', name: { ar: 'الشيخ يوسف القرضاوي', en: 'Shaykh Yusuf Al-Qaradawi' }, title: { ar: 'عالم شرعي', en: 'Islamic scholar' }, field: { ar: 'الفقه المقارن', en: 'Comparative Fiqh' }, country: { ar: 'قطر', en: 'Qatar' }, courses: 24, lessons: 690, students: 58700, rating: '4.5', image: '/scholars/Screenshot 2026-06-16 222008.png' },
]

export const sharedCourses: SharedCourse[] = [
  { id: 'manhaj-salikin', title: { ar: 'شرح منهج السالكين في الفقه', en: 'Manhaj as-Salikin in Fiqh' }, teacher: { ar: 'د. صالح بن فوزان الفوزان', en: 'Dr. Saleh Al-Fawzan' }, category: { ar: 'الفقه', en: 'Fiqh' }, categoryId: 'fiqh', level: { ar: 'متقدم', en: 'Advanced' }, lessons: 245, hours: 86, students: 12542, rating: '4.8', progress: 85, tone: 'green', status: { ar: 'منشور', en: 'Published' } },
  { id: 'fiqh-worship', title: { ar: 'فقه العبادات على مذهب السلف', en: 'Fiqh of Worship' }, teacher: { ar: 'د. محمد بن صالح العثيمين', en: 'Dr. Ibn Uthaymeen' }, category: { ar: 'الفقه', en: 'Fiqh' }, categoryId: 'fiqh', level: { ar: 'متوسط', en: 'Intermediate' }, lessons: 186, hours: 60, students: 8421, rating: '4.7', progress: 60, tone: 'gold', status: { ar: 'منشور', en: 'Published' } },
  { id: 'comprehensive-fiqh', title: { ar: 'الجامع في الفقه الإسلامي', en: 'Comprehensive Islamic Fiqh' }, teacher: { ar: 'د. سعد بن ناصر الشثري', en: 'Dr. Saad Al-Shithri' }, category: { ar: 'الفقه', en: 'Fiqh' }, categoryId: 'fiqh', level: { ar: 'متقدم', en: 'Advanced' }, lessons: 312, hours: 96, students: 15231, rating: '4.9', progress: 72, tone: 'navy', status: { ar: 'منشور', en: 'Published' } },
  { id: 'usul-maxims', title: { ar: 'أصول الفقه وقواعده', en: 'Usul al-Fiqh and Maxims' }, teacher: { ar: 'د. عبدالعزيز بن باز', en: 'Dr. Abdulaziz Ibn Baz' }, category: { ar: 'أصول الفقه', en: 'Usul' }, categoryId: 'fiqh', level: { ar: 'متوسط', en: 'Intermediate' }, lessons: 156, hours: 45, students: 6321, rating: '4.6', progress: 30, tone: 'cream', status: { ar: 'مسودة', en: 'Draft' } },
  { id: 'legal-maxims', title: { ar: 'القواعد الفقهية وتطبيقاتها', en: 'Legal Maxims and Applications' }, teacher: { ar: 'د. عبدالرحمن السعدي', en: 'Dr. Abdulrahman As-Saadi' }, category: { ar: 'الفقه', en: 'Fiqh' }, categoryId: 'fiqh', level: { ar: 'متوسط', en: 'Intermediate' }, lessons: 98, hours: 38, students: 4256, rating: '4.5', progress: 65, tone: 'brown', status: { ar: 'مراجعة', en: 'Review' } },
  { id: 'financial-transactions', title: { ar: 'المعاملات المالية في الفقه الإسلامي', en: 'Financial Transactions in Fiqh' }, teacher: { ar: 'د. محمد المختار الشنقيطي', en: 'Dr. Muhammad Al-Shinqiti' }, category: { ar: 'المعاملات', en: 'Transactions' }, categoryId: 'fiqh', level: { ar: 'متقدم', en: 'Advanced' }, lessons: 210, hours: 72, students: 9870, rating: '4.8', progress: 68, tone: 'green', status: { ar: 'منشور', en: 'Published' } },
  { id: 'four-schools-worship', title: { ar: 'فقه العبادات على المذاهب الأربعة', en: 'Worship Across the Four Schools' }, teacher: { ar: 'د. عبدالمحسن العباد', en: 'Dr. Abdulmuhsin Al-Abbad' }, category: { ar: 'العبادات', en: 'Worship' }, categoryId: 'fiqh', level: { ar: 'متقدم', en: 'Advanced' }, lessons: 278, hours: 92, students: 11624, rating: '4.7', progress: 80, tone: 'blue', status: { ar: 'منشور', en: 'Published' } },
  { id: 'fatwa-rules', title: { ar: 'الفتوى ضوابط وأحكام', en: 'Fatwa: Rules and Etiquette' }, teacher: { ar: 'د. صالح الفوزان', en: 'Dr. Saleh Al-Fawzan' }, category: { ar: 'الفتوى', en: 'Fatwa' }, categoryId: 'fiqh', level: { ar: 'متوسط', en: 'Intermediate' }, lessons: 112, hours: 32, students: 5420, rating: '4.4', progress: 40, tone: 'navy', status: { ar: 'مراجعة', en: 'Review' } },
]

export const sharedBooks: SharedBook[] = [
  { id: 'kitab-tawhid', title: { ar: 'كتاب التوحيد', en: 'Kitab at-Tawhid' }, author: { ar: 'الإمام محمد بن عبدالوهاب', en: 'Imam Muhammad ibn Abd al-Wahhab' }, category: { ar: 'العقيدة', en: 'Aqidah' }, type: { ar: 'متن', en: 'Primer' }, pages: 128, downloads: 12540, views: 45210, tone: 'green', explanations: 12, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'wasitiyyah', title: { ar: 'العقيدة الواسطية', en: 'Al-Aqidah Al-Wasitiyyah' }, author: { ar: 'شيخ الإسلام ابن تيمية', en: 'Ibn Taymiyyah' }, category: { ar: 'العقيدة', en: 'Aqidah' }, type: { ar: 'متن', en: 'Primer' }, pages: 96, downloads: 10421, views: 39810, tone: 'navy', explanations: 7, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'riyad-salihin', title: { ar: 'رياض الصالحين', en: 'Riyad as-Salihin' }, author: { ar: 'الإمام النووي', en: 'Imam An-Nawawi' }, category: { ar: 'الحديث', en: 'Hadith' }, type: { ar: 'كتاب', en: 'Book' }, pages: 540, downloads: 18760, views: 68430, tone: 'brown', explanations: 8, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'bulugh-maram', title: { ar: 'بلوغ المرام', en: 'Bulugh Al-Maram' }, author: { ar: 'الحافظ ابن حجر', en: 'Ibn Hajar' }, category: { ar: 'الحديث', en: 'Hadith' }, type: { ar: 'كتاب', en: 'Book' }, pages: 420, downloads: 9240, views: 31200, tone: 'gold', explanations: 5, file: { ar: 'ناقص', en: 'Missing' }, status: { ar: 'مراجعة', en: 'Review' } },
  { id: 'manhaj-book', title: { ar: 'منهج السالكين', en: 'Manhaj as-Salikin' }, author: { ar: 'الشيخ عبدالرحمن السعدي', en: 'Abdulrahman As-Saadi' }, category: { ar: 'الفقه', en: 'Fiqh' }, type: { ar: 'متن', en: 'Primer' }, pages: 180, downloads: 8520, views: 27540, tone: 'blue', explanations: 3, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'three-principles', title: { ar: 'الأصول الثلاثة', en: 'Al-Usul Ath-Thalathah' }, author: { ar: 'الإمام محمد بن عبدالوهاب', en: 'Imam Muhammad ibn Abd al-Wahhab' }, category: { ar: 'العقيدة', en: 'Aqidah' }, type: { ar: 'متن', en: 'Primer' }, pages: 48, downloads: 15320, views: 52110, tone: 'cream', explanations: 4, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
]

export const sharedFatwas: SharedFatwa[] = [
  { id: 'sea-water-wudu', title: { ar: 'حكم الوضوء بماء البحر', en: 'Ruling on making wudu with seawater' }, scholar: { ar: 'الشيخ عبدالعزيز بن باز', en: 'Shaykh Abdulaziz Ibn Baz' }, category: { ar: 'الطهارة', en: 'Purification' }, duration: '3:15', views: 4215, date: '2025-05-16', tone: 'green' },
  { id: 'combining-prayers', title: { ar: 'حكم الجمع بين الصلاتين للمسافر', en: 'Combining prayers while travelling' }, scholar: { ar: 'الشيخ صالح الفوزان', en: 'Shaykh Saleh Al-Fawzan' }, category: { ar: 'الصلاة', en: 'Prayer' }, duration: '6:42', views: 8920, date: '2025-05-15', tone: 'navy' },
  { id: 'zakat-savings', title: { ar: 'ضوابط الزكاة في المال المدخر', en: 'Zakat on saved money' }, scholar: { ar: 'الشيخ ابن عثيمين', en: 'Shaykh Ibn Uthaymeen' }, category: { ar: 'الزكاة', en: 'Zakat' }, duration: '9:10', views: 12340, date: '2025-05-14', tone: 'gold' },
  { id: 'asking-etiquette', title: { ar: 'آداب طالب العلم في السؤال', en: 'How students of knowledge should ask' }, scholar: { ar: 'الشيخ سعد الشثري', en: 'Shaykh Saad Al-Shithri' }, category: { ar: 'طلب العلم', en: 'Knowledge' }, duration: '7:28', views: 5812, date: '2025-05-13', tone: 'blue' },
  { id: 'installment-sales', title: { ar: 'حكم البيع بالتقسيط', en: 'Ruling on installment sales' }, scholar: { ar: 'الشيخ محمد المختار الشنقيطي', en: 'Shaykh Muhammad Al-Shinqiti' }, category: { ar: 'المعاملات', en: 'Transactions' }, duration: '11:04', views: 9540, date: '2025-05-12', tone: 'brown' },
  { id: 'repenting-backbiting', title: { ar: 'التوبة من الغيبة والنميمة', en: 'Repenting from backbiting' }, scholar: { ar: 'الشيخ محمد سعيد رسلان', en: 'Shaykh Muhammad Saeed Raslan' }, category: { ar: 'الآداب', en: 'Conduct' }, duration: '5:36', views: 6730, date: '2025-05-11', tone: 'cream' },
]

export const sharedArchiveMetrics = {
  public: {
    categories: 20,
    courses: 300,
    lessons: 10842,
    scholars: 48,
    books: 328,
    fatwas: 1532,
    downloads: 42000,
    reads: 245000,
    students: 156000,
  },
  admin: {
    scholars: 86,
    courses: 342,
    lessons: 12842,
    books: 1245,
    fatwas: 532,
    views: 2453876,
  },
}

export function pickLocalizedText(value: Localized, language: Language) {
  return value[language]
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatCompact(value: number) {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}K`
  }
  return String(value)
}
