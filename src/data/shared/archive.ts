import { BookOpen, GraduationCap, LibraryBig, UserRound, type LucideIcon } from 'lucide-react'
import type { Language } from '../../context/LanguageContext'

export type Localized = {
  ar: string
  en: string
  uz?: string
  uzCyr?: string
  ru?: string
}

export type SharedCategory = {
  id: string
  title: Localized
  text: Localized
  icon: LucideIcon
  courses: number
  lessons: number
  books: number
  status?: Localized
  updated?: Localized
  iconName?: string
  imageUrl?: string
  parentId?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
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
  bioShort?: Localized
  bioLong?: Localized
  birthYear?: string
  deathYear?: string
  categoryId?: string
  kunya?: Localized
  madhab?: Localized
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
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
  thumbnail: string
  descriptionShort?: Localized
  descriptionLong?: Localized
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
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
  coverImage?: string
  bookImages?: string[]
  downloadLink?: string
  fileType?: string
  source?: string
  kamelahLink?: string
  descriptionShort?: Localized
  descriptionLong?: Localized
  madhab?: Localized
  volumes?: SharedBookVolume[]
  downloadLinks?: { url: string; fileType: string; source: string }[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

export type SharedBookVolume = {
  title: string
  downloadLink: string
  fileType: string
  coverImage?: string
  pages?: number
  coverType?: 'main' | 'custom' | 'none'
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
  thumbnail: string
}

export type SharedLecturePart = {
  title: Localized
  duration: string
  videoUrl?: string
  audioUrl?: string
  description?: Localized
}

export type SharedLecture = {
  id: string
  title: Localized
  scholar: Localized
  scholarId: string
  category: Localized
  categoryId: string
  views: number
  date: string
  tone: string
  thumbnail: string
  description?: Localized
  parts: SharedLecturePart[]
}


export const VIDEO_THUMBNAIL = '/Video thumbnail/seedvideothumb.png'

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
  { id: 'manhaj-salikin', title: { ar: 'شرح منهج السالكين في الفقه', en: 'Manhaj as-Salikin in Fiqh' }, teacher: { ar: 'د. صالح بن فوزان الفوزان', en: 'Dr. Saleh Al-Fawzan' }, category: { ar: 'الفقه', en: 'Fiqh' }, categoryId: 'fiqh', level: { ar: 'متقدم', en: 'Advanced' }, lessons: 245, hours: 86, students: 12542, rating: '4.8', progress: 85, tone: 'green', status: { ar: 'منشور', en: 'Published' }, thumbnail: VIDEO_THUMBNAIL },
  { id: 'fiqh-worship', title: { ar: 'فقه العبادات على مذهب السلف', en: 'Fiqh of Worship' }, teacher: { ar: 'د. محمد بن صالح العثيمين', en: 'Dr. Ibn Uthaymeen' }, category: { ar: 'الفقه', en: 'Fiqh' }, categoryId: 'fiqh', level: { ar: 'متوسط', en: 'Intermediate' }, lessons: 186, hours: 60, students: 8421, rating: '4.7', progress: 60, tone: 'gold', status: { ar: 'منشور', en: 'Published' }, thumbnail: VIDEO_THUMBNAIL },
  { id: 'comprehensive-fiqh', title: { ar: 'الجامع في الفقه الإسلامي', en: 'Comprehensive Islamic Fiqh' }, teacher: { ar: 'د. سعد بن ناصر الشثري', en: 'Dr. Saad Al-Shithri' }, category: { ar: 'الفقه', en: 'Fiqh' }, categoryId: 'fiqh', level: { ar: 'متقدم', en: 'Advanced' }, lessons: 312, hours: 96, students: 15231, rating: '4.9', progress: 72, tone: 'navy', status: { ar: 'منشور', en: 'Published' }, thumbnail: VIDEO_THUMBNAIL },
  { id: 'usul-maxims', title: { ar: 'أصول الفقه وقواعده', en: 'Usul al-Fiqh and Maxims' }, teacher: { ar: 'د. عبدالعزيز بن باز', en: 'Dr. Abdulaziz Ibn Baz' }, category: { ar: 'أصول الفقه', en: 'Usul' }, categoryId: 'fiqh', level: { ar: 'متوسط', en: 'Intermediate' }, lessons: 156, hours: 45, students: 6321, rating: '4.6', progress: 30, tone: 'cream', status: { ar: 'مسودة', en: 'Draft' }, thumbnail: VIDEO_THUMBNAIL },
  { id: 'legal-maxims', title: { ar: 'القواعد الفقهية وتطبيقاتها', en: 'Legal Maxims and Applications' }, teacher: { ar: 'د. عبدالرحمن السعدي', en: 'Dr. Abdulrahman As-Saadi' }, category: { ar: 'الفقه', en: 'Fiqh' }, categoryId: 'fiqh', level: { ar: 'متوسط', en: 'Intermediate' }, lessons: 98, hours: 38, students: 4256, rating: '4.5', progress: 65, tone: 'brown', status: { ar: 'مراجعة', en: 'Review' }, thumbnail: VIDEO_THUMBNAIL },
  { id: 'financial-transactions', title: { ar: 'المعاملات المالية في الفقه الإسلامي', en: 'Financial Transactions in Fiqh' }, teacher: { ar: 'د. محمد المختار الشنقيطي', en: 'Dr. Muhammad Al-Shinqiti' }, category: { ar: 'المعاملات', en: 'Transactions' }, categoryId: 'fiqh', level: { ar: 'متقدم', en: 'Advanced' }, lessons: 210, hours: 72, students: 9870, rating: '4.8', progress: 68, tone: 'green', status: { ar: 'منشور', en: 'Published' }, thumbnail: VIDEO_THUMBNAIL },
  { id: 'four-schools-worship', title: { ar: 'فقه العبادات على المذاهب الأربعة', en: 'Worship Across the Four Schools' }, teacher: { ar: 'د. عبدالمحسن العباد', en: 'Dr. Abdulmuhsin Al-Abbad' }, category: { ar: 'العبادات', en: 'Worship' }, categoryId: 'fiqh', level: { ar: 'متقدم', en: 'Advanced' }, lessons: 278, hours: 92, students: 11624, rating: '4.7', progress: 80, tone: 'blue', status: { ar: 'منشور', en: 'Published' }, thumbnail: VIDEO_THUMBNAIL },
  { id: 'fatwa-rules', title: { ar: 'الفتوى ضوابط وأحكام', en: 'Fatwa: Rules and Etiquette' }, teacher: { ar: 'د. صالح الفوزان', en: 'Dr. Saleh Al-Fawzan' }, category: { ar: 'الفتوى', en: 'Fatwa' }, categoryId: 'fiqh', level: { ar: 'متوسط', en: 'Intermediate' }, lessons: 112, hours: 32, students: 5420, rating: '4.4', progress: 40, tone: 'navy', status: { ar: 'مراجعة', en: 'Review' }, thumbnail: VIDEO_THUMBNAIL },
]

export const sharedBooks: SharedBook[] = [
  { id: 'kitab-tawhid', title: { ar: 'كتاب التوحيد', en: 'Kitab at-Tawhid' }, author: { ar: 'الإمام محمد بن عبدالوهاب', en: 'Imam Muhammad ibn Abd al-Wahhab' }, category: { ar: 'العقيدة', en: 'Aqidah' }, type: { ar: 'متن', en: 'Primer' }, pages: 128, downloads: 12540, views: 45210, tone: 'green', explanations: 12, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'wasitiyyah', title: { ar: 'العقيدة الواسطية', en: 'Al-Aqidah Al-Wasitiyyah' }, author: { ar: 'شيخ الإسلام ابن تيمية', en: 'Ibn Taymiyyah' }, category: { ar: 'العقيدة', en: 'Aqidah' }, type: { ar: 'متن', en: 'Primer' }, pages: 96, downloads: 10421, views: 39810, tone: 'navy', explanations: 7, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'riyad-salihin', title: { ar: 'رياض الصالحين', en: 'Riyad as-Salihin' }, author: { ar: 'الإمام النووي', en: 'Imam An-Nawawi' }, category: { ar: 'الحديث', en: 'Hadith' }, type: { ar: 'كتاب', en: 'Book' }, pages: 540, downloads: 18760, views: 68430, tone: 'brown', explanations: 8, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'bulugh-maram', title: { ar: 'بلوغ المرام', en: 'Bulugh Al-Maram' }, author: { ar: 'الحافظ ابن حجر', en: 'Ibn Hajar' }, category: { ar: 'الحديث', en: 'Hadith' }, type: { ar: 'كتاب', en: 'Book' }, pages: 420, downloads: 9240, views: 31200, tone: 'gold', explanations: 5, file: { ar: 'ناقص', en: 'Missing' }, status: { ar: 'مراجعة', en: 'Review' } },
  { id: 'manhaj-book', title: { ar: 'منهج السالكين', en: 'Manhaj as-Salikin' }, author: { ar: 'الشيخ عبدالرحمن السعدي', en: 'Abdulrahman As-Saadi' }, category: { ar: 'الفقه', en: 'Fiqh' }, type: { ar: 'متن', en: 'Primer' }, pages: 180, downloads: 8520, views: 27540, tone: 'blue', explanations: 3, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'three-principles', title: { ar: 'الأصول الثلاثة', en: 'Al-Usul Ath-Thalathah' }, author: { ar: 'الإمام محمد بن عبدالوهاب', en: 'Imam Muhammad ibn Abd al-Wahhab' }, category: { ar: 'العقيدة', en: 'Aqidah' }, type: { ar: 'متن', en: 'Primer' }, pages: 48, downloads: 15320, views: 52110, tone: 'cream', explanations: 4, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'nawawi-40', title: { ar: 'الأربعون النووية', en: 'Al-Arba\'un An-Nawawiyyah' }, author: { ar: 'الإمام النووي', en: 'Imam An-Nawawi' }, category: { ar: 'الحديث', en: 'Hadith' }, type: { ar: 'متن', en: 'Primer' }, pages: 64, downloads: 14210, views: 48900, tone: 'green', explanations: 6, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'ajurrumiyyah', title: { ar: 'متن الآجرومية', en: 'Matn al-Ajurrumiyyah' }, author: { ar: 'ابن آجروم', en: 'Ibn Adjurrum' }, category: { ar: 'اللغة العربية', en: 'Arabic' }, type: { ar: 'متن', en: 'Primer' }, pages: 48, downloads: 11200, views: 35120, tone: 'navy', explanations: 4, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'jalalayn', title: { ar: 'تفسير الجلالين', en: 'Tafsir al-Jalalayn' }, author: { ar: 'الجلال المحلي والجلال السيوطي', en: 'Al-Mahalli and Al-Suyuti' }, category: { ar: 'القرآن الكريم', en: 'Quran' }, type: { ar: 'كتاب', en: 'Book' }, pages: 608, downloads: 9540, views: 32010, tone: 'brown', explanations: 7, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
  { id: 'zaad-maad', title: { ar: 'زاد المعاد', en: 'Zaad al-Ma\'ad' }, author: { ar: 'ابن قيم الجوزية', en: 'Ibn al-Qayyim' }, category: { ar: 'السيرة النبوية', en: 'Seerah' }, type: { ar: 'كتاب', en: 'Book' }, pages: 1200, downloads: 13500, views: 49210, tone: 'gold', explanations: 10, file: { ar: 'PDF', en: 'PDF' }, status: { ar: 'منشور', en: 'Published' } },
]

export const sharedFatwas: SharedFatwa[] = [
  { id: 'sea-water-wudu', title: { ar: 'حكم الوضوء بماء البحر', en: 'Ruling on making wudu with seawater' }, scholar: { ar: 'الشيخ عبدالعزيز بن باز', en: 'Shaykh Abdulaziz Ibn Baz' }, category: { ar: 'الطهارة', en: 'Purification' }, duration: '3:15', views: 4215, date: '2025-05-16', tone: 'green', thumbnail: VIDEO_THUMBNAIL },
  { id: 'combining-prayers', title: { ar: 'حكم الجمع بين الصلاتين للمسافر', en: 'Combining prayers while travelling' }, scholar: { ar: 'الشيخ صالح الفوزان', en: 'Shaykh Saleh Al-Fawzan' }, category: { ar: 'الصلاة', en: 'Prayer' }, duration: '6:42', views: 8920, date: '2025-05-15', tone: 'navy', thumbnail: VIDEO_THUMBNAIL },
  { id: 'zakat-savings', title: { ar: 'ضوابط الزكاة في المال المدخر', en: 'Zakat on saved money' }, scholar: { ar: 'الشيخ ابن عثيمين', en: 'Shaykh Ibn Uthaymeen' }, category: { ar: 'الزكاة', en: 'Zakat' }, duration: '9:10', views: 12340, date: '2025-05-14', tone: 'gold', thumbnail: VIDEO_THUMBNAIL },
  { id: 'asking-etiquette', title: { ar: 'آداب طالب العلم في السؤال', en: 'How students of knowledge should ask' }, scholar: { ar: 'الشيخ سعد الشثري', en: 'Shaykh Saad Al-Shithri' }, category: { ar: 'طلب العلم', en: 'Knowledge' }, duration: '7:28', views: 5812, date: '2025-05-13', tone: 'blue', thumbnail: VIDEO_THUMBNAIL },
  { id: 'installment-sales', title: { ar: 'حكم البيع بالتقسيط', en: 'Ruling on installment sales' }, scholar: { ar: 'الشيخ محمد المختار الشنقيطي', en: 'Shaykh Muhammad Al-Shinqiti' }, category: { ar: 'المعاملات', en: 'Transactions' }, duration: '11:04', views: 9540, date: '2025-05-12', tone: 'brown', thumbnail: VIDEO_THUMBNAIL },
  { id: 'repenting-backbiting', title: { ar: 'التوبة من الغيبة والنميمة', en: 'Repenting from backbiting' }, scholar: { ar: 'الشيخ محمد سعيد رسلان', en: 'Shaykh Muhammad Saeed Raslan' }, category: { ar: 'الآداب', en: 'Conduct' }, duration: '5:36', views: 6730, date: '2025-05-11', tone: 'cream', thumbnail: VIDEO_THUMBNAIL },
]

export const sharedLectures: SharedLecture[] = [
  {
    id: 'importance-of-knowledge',
    title: { ar: 'أهمية العلم والعمل به', en: 'The Importance of Knowledge and Action' },
    scholar: { ar: 'الشيخ صالح الفوزان', en: 'Shaykh Saleh Al-Fawzan' },
    scholarId: 'saleh-fawzan',
    category: { ar: 'العقيدة', en: 'Aqidah' },
    categoryId: 'aqidah',
    views: 8940,
    date: '2025-06-01',
    tone: 'green',
    thumbnail: VIDEO_THUMBNAIL,
    description: {
      ar: 'محاضرة قيمة تتناول منزلة العلم في الإسلام ووجوب العمل بمقتضى العلم والتحذير من إهمال العمل.',
      en: 'A valuable lecture on the status of knowledge in Islam, the obligation of acting upon it, and a warning against neglecting action.'
    },
    parts: [
      {
        title: { ar: 'الجزء الأول والوحيد', en: 'Part 1' },
        duration: '45:12',
        videoUrl: 'https://www.youtube.com/watch?v=mock1',
        audioUrl: 'https://example.com/audio/mock1.mp3',
        description: { ar: 'منزلة العلم والعمل به وثمرته في الدنيا والآخرة.', en: 'The status of knowledge and its fruit in this life and the hereafter.' }
      }
    ]
  },
  {
    id: 'rights-of-prophet',
    title: { ar: 'حقوق النبي صلى الله عليه وسلم على أمته', en: 'Rights of the Prophet Over His Ummah' },
    scholar: { ar: 'الشيخ محمد بن صالح العثيمين', en: 'Shaykh Ibn Uthaymeen' },
    scholarId: 'ibn-uthaymeen',
    category: { ar: 'السيرة النبوية', en: 'Prophetic Seerah' },
    categoryId: 'seerah',
    views: 12450,
    date: '2025-05-28',
    tone: 'navy',
    thumbnail: VIDEO_THUMBNAIL,
    description: {
      ar: 'محاضرة توضح وجوب محبة النبي صلى الله عليه وسلم، وتوقيره، ونصرته، واتباع سنته وشريعته.',
      en: 'A lecture outlining the obligation of loving, honoring, supporting, and following the Prophet\'s Sunnah.'
    },
    parts: [
      {
        title: { ar: 'الجزء الأول: وجوب المحبة والاتباع', en: 'Part 1: Obligation of Love and Following' },
        duration: '32:40',
        videoUrl: 'https://www.youtube.com/watch?v=mock2_1',
        audioUrl: 'https://example.com/audio/mock2_1.mp3',
        description: { ar: 'توضيح وجوب تقديم محبة النبي على النفس والولد والناس أجمعين.', en: 'Explaining the obligation of prioritizing the love of the Prophet.' }
      },
      {
        title: { ar: 'الجزء الثاني: التوقير ونصرة السنة', en: 'Part 2: Honoring and Supporting the Sunnah' },
        duration: '28:15',
        videoUrl: 'https://www.youtube.com/watch?v=mock2_2',
        audioUrl: 'https://example.com/audio/mock2_2.mp3',
        description: { ar: 'آداب التعامل مع سنته صلى الله عليه وسلم والدفاع عنها.', en: 'Etiquettes of dealing with his Sunnah and defending it.' }
      }
    ]
  },
  {
    id: 'etiquette-student-fitnah',
    title: { ar: 'آداب طالب العلم في الفتن', en: 'Etiquette of the Student of Knowledge During Tribulations' },
    scholar: { ar: 'الشيخ سعد الشثري', en: 'Shaykh Saad Al-Shithri' },
    scholarId: 'saad-shithri',
    category: { ar: 'الفقه وأصوله', en: 'Fiqh and Usul' },
    categoryId: 'fiqh',
    views: 6512,
    date: '2025-05-20',
    tone: 'gold',
    thumbnail: VIDEO_THUMBNAIL,
    description: {
      ar: 'محاضرة توعوية هامة للطلاب حول كيفية التعامل مع الفتن، والالتزام بأقوال العلماء الكبار وعدم العجلة.',
      en: 'An important lecture for students on how to deal with tribulations, adhering to the opinions of senior scholars, and avoiding haste.'
    },
    parts: [
      {
        title: { ar: 'القسم الأول: الصبر والتأني', en: 'Part 1: Patience and Deliberation' },
        duration: '22:10',
        videoUrl: 'https://www.youtube.com/watch?v=mock3_1',
        audioUrl: 'https://example.com/audio/mock3_1.mp3',
        description: { ar: 'ضرورة الرجوع للعلماء الكبار في النوازل.', en: 'The necessity of referring back to senior scholars.' }
      },
      {
        title: { ar: 'القسم الثاني: حفظ اللسان والائتلاف', en: 'Part 2: Guarding the Tongue and Unity' },
        duration: '25:34',
        videoUrl: 'https://www.youtube.com/watch?v=mock3_2',
        audioUrl: 'https://example.com/audio/mock3_2.mp3',
        description: { ar: 'التحذير من الغيبة والنميمة وإثارة النزاعات.', en: 'Warning against backbiting, gossip, and raising disputes.' }
      },
      {
        title: { ar: 'القسم الثالث: الثبات العلمي والعملي', en: 'Part 3: Scientific and Practical Steadfastness' },
        duration: '30:05',
        videoUrl: 'https://www.youtube.com/watch?v=mock3_3',
        audioUrl: 'https://example.com/audio/mock3_3.mp3',
        description: { ar: 'الاستمرار في تلقي العلم والتحلي بالأخلاق الكريمة.', en: 'Continuing the path of acquiring knowledge and displaying noble character.' }
      }
    ]
  }
]

export const sharedArchiveMetrics = {
  public: {
    categories: 20,
    courses: 300,
    lessons: 10842,
    scholars: 48,
    books: 328,
    fatwas: 1532,
    lectures: 142,
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
    lectures: 142,
    views: 2453876,
  },
}

export function pickLocalizedText(value: Localized, language: Language): string {
  const val = value as Record<string, string>
  if (val && val[language]) {
    return val[language]
  }
  if (language === 'uzCyr' && val['uz']) return val['uz']
  if (val['en']) return val['en']
  return val['ar'] || ''
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
