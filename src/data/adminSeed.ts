import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock3,
  Database,
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
      { label: 'إجمالي الأقسام', value: '20', change: '+2 هذا الشهر', icon: Tags, tone: 'amber' },
      { label: 'دروس مرتبطة', value: '10,842', change: '+186 درس', icon: PlaySquare, tone: 'green' },
      { label: 'دورات مرتبطة', value: '300', change: '+12 دورة', icon: GraduationCap, tone: 'blue' },
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
    rows: [
      { name: 'الفقه وأصوله', slug: 'fiqh', courses: '332', lessons: '5,412', status: 'منشور', updated: '15 يونيو 2026' },
      { name: 'العقيدة', slug: 'aqeedah', courses: '78', lessons: '1,356', status: 'منشور', updated: '14 يونيو 2026' },
      { name: 'الحديث وعلومه', slug: 'hadith', courses: '156', lessons: '2,541', status: 'منشور', updated: '13 يونيو 2026' },
      { name: 'التفسير وعلوم القرآن', slug: 'tafsir', courses: '89', lessons: '1,624', status: 'منشور', updated: '12 يونيو 2026' },
      { name: 'السيرة النبوية', slug: 'seerah', courses: '32', lessons: '845', status: 'مراجعة', updated: '11 يونيو 2026' },
    ],
    insights: ['قسم الفقه هو الأكثر نشاطاً هذا الشهر.', 'ثلاثة أقسام تحتاج صوراً أو وصفاً أطول.', 'الأقسام المنشورة تظهر في الصفحة العامة مباشرة.'],
    notes: ['حافظ على أسماء قصيرة وواضحة.', 'يفضل ألا يتجاوز الوصف 180 حرفاً في البطاقات.'],
  },
  teachers: {
    title: 'إدارة العلماء',
    description: 'إدارة بيانات العلماء والمشايخ، تخصصاتهم، وروابط المحتوى المرتبط بهم.',
    actionLabel: 'إضافة عالم جديد',
    searchPlaceholder: 'ابحث عن عالم أو تخصص...',
    filters: ['كل التخصصات', 'الفقه', 'العقيدة', 'الحديث', 'التفسير'],
    stats: [
      { label: 'إجمالي العلماء', value: '86', change: '+3%', icon: UsersRound, tone: 'green' },
      { label: 'إجمالي الدورات', value: '342', change: '+8%', icon: GraduationCap, tone: 'violet' },
      { label: 'إجمالي الدروس', value: '12,842', change: '+45%', icon: PlaySquare, tone: 'amber' },
      { label: 'إجمالي الكتب', value: '1,245', change: '+18%', icon: BookOpen, tone: 'blue' },
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
    rows: [
      { image: 'https://i.pravatar.cc/96?img=12', name: 'أ. د. صالح بن فوزان الفوزان', english: 'Dr. Saleh Al-Fawzan', specialty: 'الفقه', courses: '45', lessons: '1,245', fatwas: '532', date: '2025-05-14' },
      { image: 'https://i.pravatar.cc/96?img=15', name: 'د. سعد بن تركي الخثلان', english: 'Dr. Saad Al-Khathlan', specialty: 'التفسير', courses: '28', lessons: '856', fatwas: '214', date: '2025-05-13' },
      { image: 'https://i.pravatar.cc/96?img=32', name: 'د. عصام بن عبدالله السنبل', english: 'Dr. Essam Al-Sunbul', specialty: 'السيرة', courses: '35', lessons: '642', fatwas: '98', date: '2025-05-12' },
      { image: 'https://i.pravatar.cc/96?img=60', name: 'د. خالد بن عبدالرحمن الجريسي', english: 'Dr. Khalid Al-Jeraisy', specialty: 'الحديث', courses: '22', lessons: '521', fatwas: '76', date: '2025-05-12' },
      { image: 'https://i.pravatar.cc/96?img=68', name: 'د. علي بن حسن الحلبي', english: 'Dr. Ali Al-Halabi', specialty: 'العقيدة', courses: '18', lessons: '412', fatwas: '63', date: '2025-05-10' },
    ],
    insights: ['خمسة علماء لديهم بيانات ناقصة في روابط التواصل.', 'أكثر تخصص يظهر في المحتوى الحالي هو الفقه.', 'الأسماء الإنجليزية مفيدة للبحث والفهرسة لاحقاً.'],
    notes: ['اربط كل عالم بتخصص رئيسي وتخصصات فرعية.', 'الصورة يجب أن تكون واضحة وبنسبة مربعة.'],
  },
  books: {
    title: 'إدارة الكتب',
    description: 'إدارة الكتب والمتون وربطها بالدورات والشروح والمرفقات.',
    actionLabel: 'إضافة كتاب',
    searchPlaceholder: 'ابحث عن كتاب أو مؤلف...',
    filters: ['كل الأقسام', 'له PDF', 'بدون غلاف', 'مرتبط بدورات'],
    stats: [
      { label: 'إجمالي الكتب', value: '328', change: '+41 مرتبط', icon: BookOpen, tone: 'green' },
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
    rows: [
      { title: 'كتاب التوحيد', author: 'محمد بن عبدالوهاب', category: 'العقيدة', courses: '12', file: 'PDF', status: 'منشور' },
      { title: 'الأربعون النووية', author: 'الإمام النووي', category: 'الحديث', courses: '9', file: 'PDF', status: 'منشور' },
      { title: 'العقيدة الواسطية', author: 'ابن تيمية', category: 'العقيدة', courses: '7', file: 'PDF', status: 'منشور' },
      { title: 'بلوغ المرام', author: 'ابن حجر العسقلاني', category: 'الفقه', courses: '5', file: 'ناقص', status: 'مراجعة' },
      { title: 'رياض الصالحين', author: 'الإمام النووي', category: 'الحديث', courses: '8', file: 'PDF', status: 'منشور' },
    ],
    insights: ['كتب العقيدة هي الأعلى ارتباطاً بالدورات.', '27 كتاباً يحتاج غلافاً مناسباً.', 'ملفات PDF يجب أن تراجع قبل النشر العام.'],
    notes: ['يمكن ربط الكتاب بأكثر من دورة.', 'استخدم أسماء المؤلفين بصيغة موحدة.'],
  },
  courses: {
    title: 'إدارة الدورات',
    description: 'إدارة الدورات العلمية، مستويات الدراسة، وربط الكتب والدروس.',
    actionLabel: 'إضافة دورة',
    searchPlaceholder: 'ابحث عن دورة...',
    filters: ['كل الأقسام', 'مبتدئ', 'متوسط', 'متقدم', 'منشور'],
    stats: [
      { label: 'إجمالي الدورات', value: '300', change: '+12 دورة', icon: GraduationCap, tone: 'blue' },
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
    rows: [
      { title: 'شرح منهج السالكين في الفقه', teacher: 'د. صالح الفوزان', category: 'الفقه', level: 'متقدم', lessons: '245', status: 'منشور' },
      { title: 'فقه العبادات على مذهب السلف', teacher: 'د. محمد العثيمين', category: 'الفقه', level: 'متوسط', lessons: '186', status: 'منشور' },
      { title: 'شرح العقيدة الواسطية', teacher: 'د. سعد الشثري', category: 'العقيدة', level: 'متوسط', lessons: '72', status: 'مراجعة' },
      { title: 'تفسير سورة البقرة', teacher: 'د. محمد المنجد', category: 'التفسير', level: 'متقدم', lessons: '210', status: 'منشور' },
      { title: 'أصول الفقه وقواعده', teacher: 'د. عبدالعزيز بن باز', category: 'الفقه', level: 'متوسط', lessons: '156', status: 'مسودة' },
    ],
    insights: ['الدورات الطويلة تحتاج تقسيم أبواب واضح.', 'ربط الكتب بالدورات سيحسن صفحة الكتاب العامة.', 'الدورات غير المكتملة يمكن عرضها بعلامة جارية.'],
    notes: ['ثبّت المستوى العلمي لكل دورة.', 'غلاف الدورة يجب أن يكون بنسبة 16:9.'],
  },
  lessons: {
    title: 'المحتوى والدروس',
    description: 'إدارة الدروس والمحاضرات المستقلة وروابط يوتيوب والمرفقات.',
    actionLabel: 'إضافة درس',
    searchPlaceholder: 'ابحث عن درس أو رابط يوتيوب...',
    filters: ['كل الدورات', 'له مرفقات', 'رابط صالح', 'يحتاج تصنيف'],
    stats: [
      { label: 'إجمالي الدروس', value: '10,842', change: '+186 درس', icon: PlaySquare, tone: 'green' },
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
    rows: [
      { title: 'مقدمة الدورة والتعريف بالكتاب', course: 'منهج السالكين', teacher: 'د. صالح الفوزان', number: '1', duration: '45:32', status: 'منشور' },
      { title: 'أهمية علم الفقه', course: 'منهج السالكين', teacher: 'د. صالح الفوزان', number: '2', duration: '43:18', status: 'منشور' },
      { title: 'باب الطهارة', course: 'فقه العبادات', teacher: 'د. محمد العثيمين', number: '5', duration: '48:05', status: 'مراجعة' },
      { title: 'مصادر الفقه وأدلته', course: 'أصول الفقه', teacher: 'د. عبدالعزيز بن باز', number: '7', duration: '50:21', status: 'منشور' },
      { title: 'شرح حديث إنما الأعمال بالنيات', course: 'الأربعون النووية', teacher: 'د. سعد الشثري', number: '3', duration: '39:12', status: 'مسودة' },
    ],
    insights: ['312 درساً مستورداً يحتاج تصنيفاً نهائياً.', 'أولوية المراجعة للدروس التي لديها مشاهدات عالية.', 'أرقام الدروس ضرورية لصفحة مشاهدة الدرس.'],
    notes: ['تحقق من رابط يوتيوب قبل النشر.', 'استخدم مدة الفيديو بصيغة موحدة.'],
  },
  youtubeImport: {
    title: 'الاستيراد من يوتيوب',
    description: 'استيراد بيانات القنوات وقوائم التشغيل وتجهيزها للمراجعة قبل النشر.',
    actionLabel: 'بدء استيراد جديد',
    searchPlaceholder: 'ابحث في عمليات الاستيراد...',
    filters: ['كل الحالات', 'مكتمل', 'قيد المعالجة', 'فشل', 'يحتاج مراجعة'],
    stats: [
      { label: 'عمليات الاستيراد', value: '42', change: '+5 هذا الأسبوع', icon: UploadCloud, tone: 'blue' },
      { label: 'فيديوهات مستوردة', value: '8,742', change: '+438 فيديو', icon: PlaySquare, tone: 'green' },
      { label: 'قيد المعالجة', value: '214', change: '3 قوائم', icon: Clock3, tone: 'amber' },
      { label: 'فشل الاستيراد', value: '17', change: 'روابط خاصة', icon: AlertTriangle, tone: 'rose' },
    ],
    columns: [
      { key: 'source', label: 'المصدر' },
      { key: 'type', label: 'النوع' },
      { key: 'videos', label: 'الفيديوهات' },
      { key: 'classified', label: 'المصنف' },
      { key: 'status', label: 'الحالة' },
      { key: 'date', label: 'التاريخ' },
    ],
    rows: [
      { source: 'قائمة شرح كتاب التوحيد', type: 'Playlist', videos: '45', classified: '42', status: 'مكتمل', date: '2026-06-15' },
      { source: 'قناة الدروس الفقهية', type: 'Channel', videos: '312', classified: '184', status: 'قيد المعالجة', date: '2026-06-14' },
      { source: 'سلسلة أصول الفقه', type: 'Playlist', videos: '28', classified: '28', status: 'مكتمل', date: '2026-06-13' },
      { source: 'محاضرات رمضانية', type: 'Playlist', videos: '19', classified: '0', status: 'فشل', date: '2026-06-12' },
      { source: 'فتاوى قصيرة', type: 'Channel', videos: '540', classified: '231', status: 'يحتاج مراجعة', date: '2026-06-11' },
    ],
    insights: ['لا ينشر أي فيديو مستورد قبل المراجعة.', 'روابط القنوات الخاصة تظهر كفشل استيراد.', 'التصنيف السريع سيقلل وقت مراجعة الفيديوهات.'],
    notes: ['احفظ رابط المصدر الأصلي لكل فيديو.', 'راقب التكرار قبل اعتماد المحتوى.'],
  },
  importReview: {
    title: 'مراجعة الاستيراد',
    description: 'تصنيف الفيديوهات المستوردة وربطها بالقسم والشيخ والدورة المناسبة.',
    actionLabel: 'اعتماد المحدد',
    searchPlaceholder: 'ابحث في المحتوى غير المصنف...',
    filters: ['كل الفيديوهات', 'بدون شيخ', 'بدون قسم', 'مكرر محتمل', 'جاهز للاعتماد'],
    stats: [
      { label: 'غير مصنف', value: '312', change: '-44 اليوم', icon: AlertTriangle, tone: 'amber' },
      { label: 'جاهز للاعتماد', value: '128', change: '+31', icon: CheckCircle2, tone: 'green' },
      { label: 'مكرر محتمل', value: '26', change: 'يحتاج فحص', icon: Database, tone: 'rose' },
      { label: 'بدون شيخ', value: '74', change: 'تصنيف ناقص', icon: UsersRound, tone: 'blue' },
    ],
    columns: [
      { key: 'title', label: 'عنوان الفيديو' },
      { key: 'suggestedType', label: 'النوع المقترح' },
      { key: 'teacher', label: 'الشيخ' },
      { key: 'category', label: 'القسم' },
      { key: 'confidence', label: 'الثقة' },
      { key: 'status', label: 'الحالة' },
    ],
    rows: [
      { title: 'شرح باب الطهارة - الدرس الأول', suggestedType: 'درس', teacher: 'د. صالح الفوزان', category: 'الفقه', confidence: '92%', status: 'جاهز' },
      { title: 'حكم طلب العلم عبر التسجيلات', suggestedType: 'فتوى', teacher: 'غير محدد', category: 'الفقه', confidence: '61%', status: 'ناقص' },
      { title: 'أهمية العقيدة الصحيحة', suggestedType: 'محاضرة', teacher: 'د. سعد الشثري', category: 'العقيدة', confidence: '78%', status: 'مراجعة' },
      { title: 'شرح كتاب التوحيد 12', suggestedType: 'درس', teacher: 'د. محمد المنجد', category: 'العقيدة', confidence: '88%', status: 'جاهز' },
      { title: 'فقه الأسرة - مجلس مفتوح', suggestedType: 'محاضرة', teacher: 'غير محدد', category: 'غير محدد', confidence: '45%', status: 'ناقص' },
    ],
    insights: ['العناصر ذات الثقة المنخفضة تحتاج مراجعة يدوية.', 'يمكن اعتماد العناصر الجاهزة دفعة واحدة.', 'المكرر المحتمل لا يظهر للعامة حتى يحسم.'],
    notes: ['ابدأ بالفيديوهات ذات المشاهدات الأعلى.', 'لا تعتمد محتوى بدون شيخ أو قسم.'],
  },
  comments: {
    title: 'التعليقات والتنبيهات',
    description: 'متابعة تعليقات الطلاب والبلاغات والتنبيهات المرتبطة بالمحتوى.',
    actionLabel: 'إرسال تنبيه',
    searchPlaceholder: 'ابحث في التعليقات والبلاغات...',
    filters: ['كل العناصر', 'تعليقات', 'بلاغات', 'روابط معطلة', 'بانتظار الرد'],
    stats: [
      { label: 'تعليقات جديدة', value: '84', change: '+16 اليوم', icon: MessageCircle, tone: 'blue' },
      { label: 'بلاغات روابط', value: '23', change: '7 حرجة', icon: Link2, tone: 'rose' },
      { label: 'بانتظار مراجعة', value: '41', change: '-12', icon: Clock3, tone: 'amber' },
      { label: 'تمت المعالجة', value: '518', change: '+33', icon: CheckCircle2, tone: 'green' },
    ],
    columns: [
      { key: 'type', label: 'النوع' },
      { key: 'content', label: 'المحتوى المرتبط' },
      { key: 'message', label: 'النص' },
      { key: 'user', label: 'المستخدم' },
      { key: 'status', label: 'الحالة' },
      { key: 'time', label: 'الوقت' },
    ],
    rows: [
      { type: 'تعليق', content: 'شرح كتاب التوحيد', message: 'جزاكم الله خيراً على الترتيب', user: 'أبو عبدالله', status: 'منشور', time: 'قبل 10 دقائق' },
      { type: 'بلاغ', content: 'باب الطهارة', message: 'رابط المرفق لا يعمل', user: 'طالب علم', status: 'مراجعة', time: 'قبل 25 دقيقة' },
      { type: 'تنبيه', content: 'تفسير البقرة', message: 'فيديو خاص على يوتيوب', user: 'النظام', status: 'حرج', time: 'قبل ساعة' },
      { type: 'تعليق', content: 'أصول الفقه', message: 'هل يوجد ملف PDF للدرس؟', user: 'أم محمد', status: 'بانتظار رد', time: 'اليوم' },
      { type: 'بلاغ', content: 'فتوى طلب العلم', message: 'التصنيف غير دقيق', user: 'أحمد', status: 'مراجعة', time: 'أمس' },
    ],
    insights: ['بلاغات الروابط المعطلة لها أولوية عالية.', 'التعليقات يمكن تفعيلها لاحقاً بعد ضبط الإشراف.', 'بعض التنبيهات تأتي من فحص النظام الآلي.'],
    notes: ['لا تظهر التعليقات الجديدة قبل المراجعة.', 'سجل سبب إخفاء أي تعليق.'],
  },
  searchIndex: {
    title: 'فهرس البحث',
    description: 'متابعة جودة البحث، الكلمات الشائعة، والمحتوى الذي لا يجد له الطلاب نتائج.',
    actionLabel: 'إعادة الفهرسة',
    searchPlaceholder: 'ابحث عن كلمة أو نتيجة...',
    filters: ['كل الكلمات', 'بلا نتائج', 'نتائج قليلة', 'كلمات شائعة', 'تحتاج وسوم'],
    stats: [
      { label: 'عمليات بحث', value: '24,812', change: '+18%', icon: Search, tone: 'blue' },
      { label: 'بلا نتائج', value: '1,204', change: '-6%', icon: AlertTriangle, tone: 'rose' },
      { label: 'وسوم مفقودة', value: '312', change: 'مراجعة', icon: Tags, tone: 'amber' },
      { label: 'مفهرس', value: '92%', change: '+4%', icon: Database, tone: 'green' },
    ],
    columns: [
      { key: 'query', label: 'كلمة البحث' },
      { key: 'count', label: 'عدد البحث' },
      { key: 'results', label: 'النتائج' },
      { key: 'topType', label: 'أكثر نوع' },
      { key: 'suggestion', label: 'اقتراح' },
      { key: 'status', label: 'الحالة' },
    ],
    rows: [
      { query: 'الوضوء', count: '1,258', results: '842', topType: 'دروس', suggestion: 'جيد', status: 'مفهرس' },
      { query: 'زكاة الذهب', count: '684', results: '32', topType: 'فتاوى', suggestion: 'أضف وسوم', status: 'مراجعة' },
      { query: 'العقيدة الواسطية', count: '512', results: '76', topType: 'دورات', suggestion: 'ربط الكتب', status: 'مفهرس' },
      { query: 'أحكام السفر', count: '308', results: '0', topType: '-', suggestion: 'محتوى ناقص', status: 'حرج' },
      { query: 'طلب العلم', count: '286', results: '118', topType: 'محاضرات', suggestion: 'تحسين الوصف', status: 'مراجعة' },
    ],
    insights: ['الكلمات بلا نتائج تكشف احتياجاً حقيقياً للمحتوى.', 'الوسوم تحسن نتائج البحث في المرحلة الأولى.', 'لاحقاً يمكن فهرسة التفريغات النصية.'],
    notes: ['لا تعتمد على العنوان فقط في البحث.', 'استخدم الوصف والوسوم لتحسين النتائج.'],
  },
  reports: {
    title: 'الإحصائيات والتقارير',
    description: 'مؤشرات استخدام المنصة، أداء المحتوى، ونشاط الطلاب.',
    actionLabel: 'تصدير تقرير',
    searchPlaceholder: 'ابحث في التقارير...',
    filters: ['آخر 7 أيام', 'آخر 30 يوم', 'هذا الشهر', 'الأعلى مشاهدة'],
    stats: [
      { label: 'زيارات الصفحات', value: '684,220', change: '+21%', icon: Eye, tone: 'teal' },
      { label: 'مشاهدات الدروس', value: '2,453,876', change: '+18%', icon: PlaySquare, tone: 'green' },
      { label: 'طلاب نشطون', value: '32,450', change: '+9%', icon: UsersRound, tone: 'blue' },
      { label: 'تصديرات CSV', value: '18', change: '+4', icon: Database, tone: 'amber' },
    ],
    columns: [
      { key: 'report', label: 'التقرير' },
      { key: 'scope', label: 'النطاق' },
      { key: 'value', label: 'القيمة' },
      { key: 'change', label: 'التغير' },
      { key: 'owner', label: 'المسؤول' },
      { key: 'updated', label: 'آخر تحديث' },
    ],
    rows: [
      { report: 'أكثر الدورات مشاهدة', scope: '30 يوم', value: '125,430', change: '+18%', owner: 'النظام', updated: 'اليوم' },
      { report: 'كلمات البحث بلا نتائج', scope: '30 يوم', value: '1,204', change: '-6%', owner: 'فريق المحتوى', updated: 'اليوم' },
      { report: 'المحتوى غير المصنف', scope: 'حالي', value: '312', change: '-44', owner: 'المراجعة', updated: 'أمس' },
      { report: 'الروابط المعطلة', scope: 'حالي', value: '23', change: '+7', owner: 'النظام', updated: 'أمس' },
      { report: 'نشاط الطلاب', scope: '7 أيام', value: '32,450', change: '+9%', owner: 'التحليلات', updated: 'اليوم' },
    ],
    insights: ['تقارير البحث تساعد في اختيار المحتوى القادم.', 'المحتوى غير المصنف يتناقص بعد التصنيف السريع.', 'الروابط المعطلة تحتاج معالجة أسبوعية.'],
    notes: ['التقارير حالياً بيانات وهمية للواجهة.', 'لاحقاً تربط بجداول views وsearch_logs.'],
  },
  settings: {
    title: 'الإعدادات',
    description: 'إعدادات الموقع والهوية البصرية والصلاحيات العامة.',
    actionLabel: 'حفظ الإعدادات',
    searchPlaceholder: 'ابحث في الإعدادات...',
    filters: ['الهوية', 'الصلاحيات', 'SEO', 'التخزين', 'الإشعارات'],
    stats: [
      { label: 'إعدادات الهوية', value: '12', change: 'مكتملة', icon: Settings, tone: 'blue' },
      { label: 'مدراء النظام', value: '4', change: '+1', icon: UsersRound, tone: 'green' },
      { label: 'قوالب SEO', value: '9', change: 'مراجعة', icon: Search, tone: 'amber' },
      { label: 'تنبيهات النظام', value: '6', change: 'نشطة', icon: AlertTriangle, tone: 'rose' },
    ],
    columns: [
      { key: 'setting', label: 'الإعداد' },
      { key: 'group', label: 'المجموعة' },
      { key: 'value', label: 'القيمة الحالية' },
      { key: 'status', label: 'الحالة' },
      { key: 'owner', label: 'المسؤول' },
      { key: 'updated', label: 'آخر تعديل' },
    ],
    rows: [
      { setting: 'اسم الموقع', group: 'الهوية', value: 'أنوار العلماء', status: 'مفعل', owner: 'مدير النظام', updated: 'اليوم' },
      { setting: 'اللون الأساسي', group: 'الهوية', value: '#B8862D', status: 'مفعل', owner: 'التصميم', updated: 'أمس' },
      { setting: 'وصف SEO الافتراضي', group: 'SEO', value: 'أرشيف علمي للدروس...', status: 'مراجعة', owner: 'المحتوى', updated: '12 يونيو' },
      { setting: 'صلاحية إضافة محتوى', group: 'الصلاحيات', value: 'Admin, Editor', status: 'مفعل', owner: 'مدير النظام', updated: '10 يونيو' },
      { setting: 'تنبيه الروابط المعطلة', group: 'الإشعارات', value: 'يومي', status: 'مفعل', owner: 'النظام', updated: '9 يونيو' },
    ],
    insights: ['إعدادات الهوية متوافقة مع دليل التصميم.', 'صلاحيات المحررين تحتاج شاشة مستقلة لاحقاً.', 'SEO الافتراضي يظهر عند عدم وجود وصف خاص.'],
    notes: ['لا تغير الألوان الأساسية بدون مراجعة التصميم.', 'أي إعداد أمني يحتاج سجل تعديل.'],
  },
}
