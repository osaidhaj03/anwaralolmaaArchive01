import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock3,
  Eye,
  GraduationCap,
  LibraryBig,
  Link2,
  MessageCircle,
  PlaySquare,
  Search,
  Settings,
  Tags,
  UploadCloud,
  UsersRound,
} from 'lucide-react'
import { formatNumber, sharedArchiveMetrics, sharedBooks, sharedCategories, sharedCourses, sharedScholars, sharedLectures } from './shared/archive'

export type AdminStat = {
  label: string
  value: string
  change: string
  icon: LucideIcon
  tone: 'blue' | 'green' | 'violet' | 'amber' | 'rose' | 'teal'
}

export type AdminTableColumn = {
  key: string
  label: string
}

export type AdminTableRow = Record<string, string>

export type AdminPageSeed = {
  title: string
  description: string
  actionLabel: string
  searchPlaceholder: string
  filters: string[]
  stats: AdminStat[]
  columns: AdminTableColumn[]
  rows: AdminTableRow[]
  insights: string[]
  notes: string[]
}

export const adminPages: Record<string, AdminPageSeed> = {
  categories: {
    title: 'إدارة التصنيفات',
    description: 'تنظيم الأقسام العلمية التي يعتمد عليها تصفح الأرشيف وربط المحتوى.',
    actionLabel: 'إضافة تصنيف',
    searchPlaceholder: 'ابحث عن قسم أو وصف...',
    filters: ['كل الحالات', 'منشور', 'مسودة', 'الأكثر محتوى'],
    stats: [
      { label: 'إجمالي الأقسام', value: String(sharedArchiveMetrics.public.categories), change: '+2 هذا الشهر', icon: Tags, tone: 'amber' },
      { label: 'دروس مرتبطة', value: formatNumber(sharedArchiveMetrics.public.lessons), change: '+186 درس', icon: PlaySquare, tone: 'green' },
      { label: 'دورات مرتبطة', value: String(sharedArchiveMetrics.public.courses), change: '+12 دورة', icon: GraduationCap, tone: 'blue' },
      { label: 'أقسام تحتاج مراجعة', value: '3', change: 'ترتيب وصور', icon: AlertTriangle, tone: 'rose' },
    ],
    columns: [
      { key: 'name', label: 'القسم' },
      { key: 'slug', label: 'الرابط' },
      { key: 'courses', label: 'الدورات' },
      { key: 'lessons', label: 'الدروس' },
      { key: 'status', label: 'الحالة' },
      { key: 'updated', label: 'آخر تحديث' },
    ],
    rows: sharedCategories.map((item, index) => ({
      name: item.title.ar,
      slug: item.id,
      courses: formatNumber(item.courses),
      lessons: formatNumber(item.lessons),
      status: index === 4 ? 'مراجعة' : 'منشور',
      updated: `${15 - index} يونيو 2026`,
    })),
    insights: ['الأقسام هنا مرتبطة مباشرة بصفحات التصنيف العامة.', 'أي تعديل في الاسم أو الوصف يجب أن ينعكس في الواجهة العامة.', 'بيانات العدادات تأتي من المصدر المشترك نفسه.'],
    notes: ['حافظ على أسماء قصيرة وواضحة.', 'يفضل ألا يتجاوز الوصف 180 حرفاً في البطاقات.'],
  },
  teachers: {
    title: 'إدارة العلماء',
    description: 'إدارة بيانات العلماء والمشايخ، تخصصاتهم، وروابط المحتوى المرتبط بهم.',
    actionLabel: 'إضافة عالم جديد',
    searchPlaceholder: 'ابحث عن عالم أو تخصص...',
    filters: ['كل التخصصات', 'الفقه', 'العقيدة', 'الحديث', 'التفسير'],
    stats: [
      { label: 'إجمالي العلماء', value: String(sharedArchiveMetrics.admin.scholars), change: '+3%', icon: UsersRound, tone: 'green' },
      { label: 'إجمالي الدورات', value: String(sharedArchiveMetrics.admin.courses), change: '+8%', icon: GraduationCap, tone: 'violet' },
      { label: 'إجمالي الدروس', value: formatNumber(sharedArchiveMetrics.admin.lessons), change: '+45%', icon: PlaySquare, tone: 'amber' },
      { label: 'إجمالي الكتب', value: formatNumber(sharedArchiveMetrics.admin.books), change: '+18%', icon: BookOpen, tone: 'blue' },
    ],
    columns: [
      { key: 'image', label: 'الصورة' },
      { key: 'name', label: 'الاسم بالعربية' },
      { key: 'english', label: 'الاسم بالإنجليزية' },
      { key: 'specialty', label: 'التخصص' },
      { key: 'courses', label: 'الدورات' },
      { key: 'lessons', label: 'الدروس' },
      { key: 'fatwas', label: 'الفتاوى' },
      { key: 'date', label: 'تاريخ الإضافة' },
    ],
    rows: sharedScholars.map((item, index) => ({
      image: item.image,
      name: item.name.ar,
      english: item.name.en,
      specialty: item.field.ar,
      courses: String(item.courses),
      lessons: formatNumber(item.lessons),
      fatwas: String(532 - index * 54),
      date: `2025-05-${String(14 - index).padStart(2, '0')}`,
    })),
    insights: ['هذه البيانات يجب أن تطابق بطاقات العلماء في الواجهة العامة.', 'الصورة والاسم والتخصص الآن من المصدر المشترك نفسه.', 'الأسماء الإنجليزية مفيدة للبحث والفهرسة لاحقاً.'],
    notes: ['اربط كل عالم بتخصص رئيسي وتخصصات فرعية.', 'الصورة يجب أن تكون واضحة وبنسبة مربعة.'],
  },
  books: {
    title: 'إدارة الكتب',
    description: 'إدارة الكتب والمتون وربطها بالدورات والشروح والمرفقات.',
    actionLabel: 'إضافة كتاب',
    searchPlaceholder: 'ابحث عن كتاب أو مؤلف...',
    filters: ['كل الأقسام', 'له PDF', 'بدون غلاف', 'مرتبط بدورات'],
    stats: [
      { label: 'إجمالي الكتب', value: String(sharedArchiveMetrics.public.books), change: '+41 مرتبط', icon: BookOpen, tone: 'green' },
      { label: 'ملفات PDF', value: '214', change: '+12 ملف', icon: LibraryBig, tone: 'blue' },
      { label: 'شروح مرتبطة', value: '486', change: '+19 شرح', icon: GraduationCap, tone: 'amber' },
      { label: 'تحتاج غلاف', value: '27', change: 'مراجعة', icon: AlertTriangle, tone: 'rose' },
    ],
    columns: [
      { key: 'title', label: 'الكتاب' },
      { key: 'author', label: 'المؤلف' },
      { key: 'category', label: 'القسم' },
      { key: 'courses', label: 'الشروح' },
      { key: 'file', label: 'الملف' },
      { key: 'status', label: 'الحالة' },
    ],
    rows: sharedBooks.map((item) => ({
      title: item.title.ar,
      author: item.author.ar,
      category: item.category.ar,
      courses: String(item.explanations),
      file: item.file.ar,
      status: item.status.ar,
    })),
    insights: ['هذه الكتب مرتبطة الآن مباشرة بالمكتبة العامة.', 'أي تغيير في الاسم أو المؤلف سينعكس في صفحة المكتبة.', 'ملفات PDF يجب أن تراجع قبل النشر العام.'],
    notes: ['يمكن ربط الكتاب بأكثر من دورة.', 'استخدم أسماء المؤلفين بصيغة موحدة.'],
  },
  courses: {
    title: 'إدارة الدورات',
    description: 'إدارة الدورات العلمية، مستويات الدراسة، وربط الكتب والدروس.',
    actionLabel: 'إضافة دورة',
    searchPlaceholder: 'ابحث عن دورة...',
    filters: ['كل الأقسام', 'مبتدئ', 'متوسط', 'متقدم', 'منشور'],
    stats: [
      { label: 'إجمالي الدورات', value: String(sharedArchiveMetrics.public.courses), change: '+12 دورة', icon: GraduationCap, tone: 'blue' },
      { label: 'دورات مكتملة', value: '218', change: '72%', icon: CheckCircle2, tone: 'green' },
      { label: 'قيد المراجعة', value: '34', change: 'تحتاج تدقيق', icon: Clock3, tone: 'amber' },
      { label: 'بدون كتاب', value: '48', change: 'ربط مطلوب', icon: BookOpen, tone: 'rose' },
    ],
    columns: [
      { key: 'title', label: 'الدورة' },
      { key: 'teacher', label: 'الشيخ' },
      { key: 'category', label: 'القسم' },
      { key: 'level', label: 'المستوى' },
      { key: 'lessons', label: 'الدروس' },
      { key: 'status', label: 'الحالة' },
    ],
    rows: sharedCourses.map((item) => ({
      title: item.title.ar,
      teacher: item.teacher.ar,
      category: item.category.ar,
      level: item.level.ar,
      lessons: String(item.lessons),
      status: item.status.ar,
    })),
    insights: ['الدورات هنا والواجهة العامة الآن من نفس المصدر.', 'ربط الكتب بالدورات سيحسن صفحة الكتاب العامة.', 'الدورات غير المكتملة يمكن عرضها بعلامة جارية.'],
    notes: ['ثبّت المستوى العلمي لكل دورة.', 'غلاف الدورة يجب أن يكون بنسبة 16:9.'],
  },
  lessons: {
    title: 'المحتوى والدروس',
    description: 'إدارة الدروس والمحاضرات المستقلة وروابط يوتيوب والمرفقات.',
    actionLabel: 'إضافة درس',
    searchPlaceholder: 'ابحث عن درس أو رابط يوتيوب...',
    filters: ['كل الدورات', 'له مرفقات', 'رابط صالح', 'يحتاج تصنيف'],
    stats: [
      { label: 'إجمالي الدروس', value: formatNumber(sharedArchiveMetrics.public.lessons), change: '+186 درس', icon: PlaySquare, tone: 'green' },
      { label: 'محاضرات مستقلة', value: '1,256', change: '+24 محاضرة', icon: LibraryBig, tone: 'blue' },
      { label: 'تحتاج تصنيف', value: '312', change: 'مراجعة', icon: AlertTriangle, tone: 'rose' },
      { label: 'مرفقات مرتبطة', value: '714', change: '+33 ملف', icon: Link2, tone: 'amber' },
    ],
    columns: [
      { key: 'title', label: 'العنوان' },
      { key: 'course', label: 'الدورة' },
      { key: 'teacher', label: 'الشيخ' },
      { key: 'number', label: 'رقم الدرس' },
      { key: 'duration', label: 'المدة' },
      { key: 'status', label: 'الحالة' },
    ],
    rows: sharedCourses.slice(0, 5).map((item, index) => ({
      title: index === 0 ? 'مقدمة الدورة والتعريف بالكتاب' : `الدرس ${index + 1} من ${item.title.ar}`,
      course: item.title.ar,
      teacher: item.teacher.ar,
      number: String(index + 1),
      duration: `${45 + index}:${String((index * 7 + 12) % 60).padStart(2, '0')}`,
      status: item.status.ar,
    })),
    insights: ['مصدر الدورات هو نفسه الذي يغذي قائمة الدروس.', 'أرقام الدروس ضرورية لصفحة مشاهدة الدرس.', 'المرفقات ستصبح لاحقاً جزءاً من المصدر المشترك أيضاً.'],
    notes: ['تحقق من رابط يوتيوب قبل النشر.', 'استخدم مدة الفيديو بصيغة موحدة.'],
  },
  lectures: {
    title: 'إدارة المحاضرات العامة',
    description: 'تنظيم وإدارة المحاضرات العامة المستقلة واللقاءات وتحديث أجزائها وروابط البث والمحتوى.',
    actionLabel: 'إضافة محاضرة جديدة',
    searchPlaceholder: 'ابحث عن محاضرة، شيخ أو تصنيف...',
    filters: ['كل الحالات', 'منشور', 'مسودة', 'مراجعة'],
    stats: [
      { label: 'إجمالي المحاضرات', value: String(sharedArchiveMetrics.public.lectures), change: '+5 هذا الشهر', icon: PlaySquare, tone: 'teal' },
      { label: 'ساعات الاستماع المقدرة', value: '430 ساعة', change: '+32 ساعة', icon: Clock3, tone: 'green' },
      { label: 'المشايخ المشاركين', value: String(sharedArchiveMetrics.public.scholars), change: 'نشطين', icon: UsersRound, tone: 'blue' },
      { label: 'محاضرات تحتاج مراجعة', value: '1', change: 'روابط الصوت', icon: AlertTriangle, tone: 'rose' },
    ],
    columns: [
      { key: 'title', label: 'المحاضرة' },
      { key: 'scholar', label: 'المحاضر' },
      { key: 'category', label: 'القسم' },
      { key: 'parts', label: 'عدد الأجزاء' },
      { key: 'views', label: 'المشاهدات' },
      { key: 'status', label: 'الحالة' },
    ],
    rows: sharedLectures.map((item, index) => ({
      title: item.title.ar,
      scholar: item.scholar.ar,
      category: item.category.ar,
      parts: `${item.parts.length} أجزاء`,
      views: formatNumber(item.views),
      status: index === 2 ? 'مسودة' : 'منشور',
    })),
    insights: ['المحاضرات العامة تكون مستقلة ولا تتبع دورة معينة.', 'كل محاضرة يمكن أن تحتوي على جزء واحد أو أجزاء متعددة.', 'يمكن للمستخدمين التبديل بين تشغيل الفيديو أو الصوت لكل جزء.'],
    notes: ['تأكد من إدخال روابط الفيديو والصوت لكل جزء.', 'يفضل إرفاق ملخص أو متن مع المحاضرات الطويلة.'],
  },
  youtubeImport: makeOpsPage('الاستيراد من يوتيوب', 'استيراد بيانات القنوات وقوائم التشغيل وتجهيزها للمراجعة قبل النشر.', 'بدء استيراد جديد', UploadCloud),
  importReview: makeOpsPage('مراجعة الاستيراد', 'تصنيف الفيديوهات المستوردة وربطها بالقسم والشيخ والدورة المناسبة.', 'اعتماد المحدد', CheckCircle2),
  comments: makeOpsPage('التعليقات والتنبيهات', 'متابعة تعليقات الطلاب والبلاغات والتنبيهات المرتبطة بالمحتوى.', 'إرسال تنبيه', MessageCircle),
  searchIndex: makeOpsPage('فهرس البحث', 'متابعة جودة البحث، الكلمات الشائعة، والمحتوى الذي لا يجد له الطلاب نتائج.', 'إعادة الفهرسة', Search),
  reports: makeOpsPage('الإحصائيات والتقارير', 'مؤشرات استخدام المنصة، أداء المحتوى، ونشاط الطلاب.', 'تصدير تقرير', Eye),
  settings: makeOpsPage('الإعدادات', 'إعدادات الموقع والهوية البصرية والصلاحيات العامة.', 'حفظ الإعدادات', Settings),
}

function makeOpsPage(title: string, description: string, actionLabel: string, icon: AdminPageSeed['stats'][number]['icon']): AdminPageSeed {
  return {
    title,
    description,
    actionLabel,
    searchPlaceholder: 'ابحث في السجلات...',
    filters: ['الكل', 'منشور', 'مراجعة', 'مسودة', 'يحتاج إجراء'],
    stats: [
      { label: 'إجمالي السجلات', value: '1,245', change: '+12%', icon, tone: 'blue' },
      { label: 'تمت المعالجة', value: '932', change: '+48 اليوم', icon: CheckCircle2, tone: 'green' },
      { label: 'قيد المراجعة', value: '214', change: 'يحتاج انتباهاً', icon: Clock3, tone: 'amber' },
      { label: 'معلق', value: '17', change: 'إصلاح يدوي', icon: AlertTriangle, tone: 'rose' },
    ],
    columns: [
      { key: 'title', label: 'العنوان' },
      { key: 'type', label: 'النوع' },
      { key: 'owner', label: 'المسؤول' },
      { key: 'count', label: 'العدد' },
      { key: 'status', label: 'الحالة' },
      { key: 'updated', label: 'آخر تحديث' },
    ],
    rows: [
      { title: 'Tawhid playlist import', type: 'Playlist', owner: 'Content Team', count: '45', status: 'Published', updated: 'Today' },
      { title: 'Fiqh lessons cleanup', type: 'Review', owner: 'Editorial', count: '312', status: 'Review', updated: 'Yesterday' },
      { title: 'Broken YouTube links', type: 'System check', owner: 'System', count: '23', status: 'Draft', updated: 'June 12' },
      { title: 'Search terms without results', type: 'Report', owner: 'Analytics', count: '1,204', status: 'Review', updated: 'June 11' },
      { title: 'SEO defaults update', type: 'Settings', owner: 'Admin', count: '9', status: 'Published', updated: 'June 10' },
    ],
    insights: ['المرحلة الحالية توحد مصدر المحتوى أولاً.', 'صفحات العمليات هذه ستربط لاحقاً ببيانات حقيقية.', 'الأولوية الآن للاتساق بين الإدارة والواجهة العامة.'],
    notes: ['حافظ على أسماء الحالات بشكل موحد.', 'كل سجل تشغيلي يجب أن يكون له مالك واضح.'],
  }
}
