import { useEffect, useState } from 'react'
import { AdminImportForm, type AdminImportFormState } from '../../components/admin/AdminImportForm'
import { AdminImportSummary } from '../../components/admin/AdminImportSummary'
import { useLanguage, type Language } from '../../context/LanguageContext'

const defaultImportState: AdminImportFormState = {
  checkDuplicates: true,
  importSubtitles: true,
  mergePdfs: false,
  preset: 'course',
  sourceType: 'playlist',
  sourceUrl: '',
  targetCategory: '',
  targetTeacher: '',
  thumbnailMode: 'youtube',
}

export function AdminYouTubeImportPage() {
  const { language } = useLanguage()
  const copy = youtubeImportCopy[language]
  const [importState, setImportState] = useState(defaultImportState)
  const [message, setMessage] = useState('')

  const videosFound = importState.sourceUrl.trim() ? getMockVideoCount(importState.sourceType, importState.sourceUrl) : 0

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMessage('')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function startImport() {
    if (!importState.sourceUrl.trim()) {
      setMessage(copy.urlRequired)
      return
    }

    setMessage(copy.importStarted)
  }

  function resetForm() {
    setImportState(defaultImportState)
    setMessage('')
  }

  async function pasteUrl() {
    try {
      const text = await navigator.clipboard.readText()
      setImportState((current) => ({ ...current, sourceUrl: text }))
      setMessage('')
    } catch {
      setMessage(copy.pasteFailed)
    }
  }

  return (
    <div className="admin-page import-only-page">
      <section className="management-hero">
        <div>
          <span>{copy.eyebrow}</span>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
      </section>

      <section className="import-layout">
        <AdminImportForm copy={copy} message={message} onPaste={pasteUrl} onReset={resetForm} onStart={startImport} onStateChange={setImportState} state={importState} videosFound={videosFound} />

        <AdminImportSummary copy={copy} state={importState} videosFound={videosFound} />
      </section>
    </div>
  )
}

function getMockVideoCount(sourceType: string, sourceUrl: string) {
  if (sourceType === 'video') return 1
  if (sourceType === 'channel') return 312
  if (sourceUrl.includes('list=')) return 45
  return 24
}

const youtubeImportCopy: Record<Language, Record<string, string>> = {
  ar: {
    eyebrow: 'لوحة التحكم',
    title: 'الاستيراد',
    description: 'أدخل رابط يوتيوب واضبط خيارات الاستيراد قبل الإرسال للمراجعة.',
    urlLabel: 'رابط يوتيوب',
    urlPlaceholder: 'https://www.youtube.com/playlist?list=...',
    typeLabel: 'نوع المصدر',
    playlist: 'قائمة تشغيل',
    channel: 'قناة',
    video: 'فيديو واحد',
    categoryLabel: 'القسم المستهدف',
    teacherLabel: 'الشيخ المستهدف',
    optional: 'اختياري',
    paste: 'لصق',
    videosFound: 'فيديو تم العثور عليه',
    presetLabel: 'Preset',
    coursePreset: 'قائمة دورة',
    lecturePreset: 'محاضرة واحدة',
    fatwaPreset: 'مقاطع فتاوى',
    bookPreset: 'شرح كتاب',
    thumbnailLabel: 'صورة الفيديو',
    youtubeThumbnail: 'صورة يوتيوب',
    customThumbnail: 'صورة مخصصة',
    placeholderThumbnail: 'غلاف تلقائي',
    subtitles: 'تحميل الترجمة من يوتيوب إن وجدت',
    mergePdfs: 'دمج ملفات PDF مع المحتوى',
    duplicates: 'فحص التكرار قبل الاستيراد',
    summary: 'ملخص الاستيراد',
    videos: 'الفيديوهات',
    subtitlesShort: 'الترجمة',
    pdfShort: 'PDF',
    duplicatesShort: 'التكرار',
    enabled: 'مفعل',
    disabled: 'غير مفعل',
    start: 'بدء الاستيراد',
    reset: 'إعادة تعيين',
    urlRequired: 'أدخل رابط يوتيوب أولاً.',
    importStarted: 'تم تجهيز طلب الاستيراد في الواجهة التجريبية.',
    pasteFailed: 'تعذر قراءة الحافظة من المتصفح.',
  },
  en: {
    eyebrow: 'Admin Panel',
    title: 'Import',
    description: 'Enter a YouTube link and configure the import before review.',
    urlLabel: 'YouTube URL',
    urlPlaceholder: 'https://www.youtube.com/playlist?list=...',
    typeLabel: 'Source type',
    playlist: 'Playlist',
    channel: 'Channel',
    video: 'Single video',
    categoryLabel: 'Target category',
    teacherLabel: 'Target scholar',
    optional: 'Optional',
    paste: 'Paste',
    videosFound: 'videos found',
    presetLabel: 'Preset',
    coursePreset: 'Course playlist',
    lecturePreset: 'Single lecture',
    fatwaPreset: 'Fatwa clips',
    bookPreset: 'Book explanation',
    thumbnailLabel: 'Thumbnail',
    youtubeThumbnail: 'YouTube thumbnail',
    customThumbnail: 'Custom thumbnail',
    placeholderThumbnail: 'Generated cover',
    subtitles: 'Import YouTube subtitles if available',
    mergePdfs: 'Merge PDF files with the content',
    duplicates: 'Check duplicates before import',
    summary: 'Import Summary',
    videos: 'Videos',
    subtitlesShort: 'Subtitles',
    pdfShort: 'PDF',
    duplicatesShort: 'Duplicates',
    enabled: 'Enabled',
    disabled: 'Disabled',
    start: 'Start import',
    reset: 'Reset',
    urlRequired: 'Enter a YouTube URL first.',
    importStarted: 'The mock import request is ready in the frontend.',
    pasteFailed: 'Could not read clipboard from the browser.',
  },
  uz: {
    eyebrow: 'Boshqaruv paneli',
    title: 'Import',
    description: 'YouTube havolasini kiriting va ko‘rib chiqishdan oldin importni sozlang.',
    urlLabel: 'YouTube havolasi',
    urlPlaceholder: 'https://www.youtube.com/playlist?list=...',
    typeLabel: 'Manba turi',
    playlist: 'Pleylist',
    channel: 'Kanal',
    video: 'Bitta video',
    categoryLabel: 'Maqsadli kategoriya',
    teacherLabel: 'Maqsadli ustoz',
    optional: 'Ixtiyoriy',
    paste: 'Joylashtirish',
    videosFound: 'ta video topildi',
    presetLabel: 'Shablon',
    coursePreset: 'Kurs pleylisti',
    lecturePreset: 'Bitta ma’ruza',
    fatwaPreset: 'Fatvo lavhalari',
    bookPreset: 'Kitob sharhi',
    thumbnailLabel: 'Muqova rasmi',
    youtubeThumbnail: 'YouTube muqovasi',
    customThumbnail: 'Maxsus muqova',
    placeholderThumbnail: 'Yaratilgan muqova',
    subtitles: 'Mavjud bo‘lsa, YouTube taglavhalarini yuklash',
    mergePdfs: 'PDF fayllarini kontentga birlashtirish',
    duplicates: 'Import qilishdan oldin takroriylikni tekshirish',
    summary: 'Import xulosasi',
    videos: 'Videolar',
    subtitlesShort: 'Subtitrlar',
    pdfShort: 'PDF',
    duplicatesShort: 'Takroriylik',
    enabled: 'Yoqilgan',
    disabled: 'O‘chirilgan',
    start: 'Importni boshlash',
    reset: 'Qayta sozlash',
    urlRequired: 'Avval YouTube havolasini kiriting.',
    importStarted: 'Import so‘rovi muvaffaqiyatli tayyorlandi.',
    pasteFailed: 'Vaqtinchalik xotiradan (clipboard) o‘qib bo‘lmadi.',
  },
  uzCyr: {
    eyebrow: 'Бошқарув панели',
    title: 'Импорт',
    description: 'YouTube ҳаволасини киритинг ва кўриб чиқишдан олдин импортни созланг.',
    urlLabel: 'YouTube ҳаволаси',
    urlPlaceholder: 'https://www.youtube.com/playlist?list=...',
    typeLabel: 'Манба тури',
    playlist: 'Плейлист',
    channel: 'Канал',
    video: 'Битта видео',
    categoryLabel: 'Мақсадли категория',
    teacherLabel: 'Мақсадли устоз',
    optional: 'Ихтиёрий',
    paste: 'Жойлаштириш',
    videosFound: 'та видео топилди',
    presetLabel: 'Шаблон',
    coursePreset: 'Курс плейлисти',
    lecturePreset: 'Битта маъруза',
    fatwaPreset: 'Фатво лавҳалари',
    bookPreset: 'Китоб шарҳи',
    thumbnailLabel: 'Муқова расми',
    youtubeThumbnail: 'YouTube муқоваси',
    customThumbnail: 'Махсус муқова',
    placeholderThumbnail: 'Яратилган муқова',
    subtitles: 'Мавжуд бўлса, YouTube таглавҳаларини юклаш',
    mergePdfs: 'PDF файлларни контентга бирлаштириш',
    duplicates: 'Импорт қилишдан олдин такрорийликни текишириш',
    summary: 'Импорт хулосаси',
    videos: 'Видеолар',
    subtitlesShort: 'Субтитрлар',
    pdfShort: 'PDF',
    duplicatesShort: 'Такрорийлик',
    enabled: 'Ёқилган',
    disabled: 'Ўчирилган',
    start: 'Импортни бошлаш',
    reset: 'Қайта созлаш',
    urlRequired: 'Аввал YouTube ҳаволасини киритинг.',
    importStarted: 'Импорт сўрови муваффақиятли тайёрланди.',
    pasteFailed: 'Вақтинчалик хотирадан ўқиб бўлмади.',
  },
  ru: {
    eyebrow: 'Панель управления',
    title: 'Импорт',
    description: 'Введите ссылку на YouTube и настройте параметры импорта перед отправкой.',
    urlLabel: 'YouTube URL',
    urlPlaceholder: 'https://www.youtube.com/playlist?list=...',
    typeLabel: 'Тип источника',
    playlist: 'Плейлист',
    channel: 'Канал',
    video: 'Одно видео',
    categoryLabel: 'Целевая категория',
    teacherLabel: 'Целевой ученый',
    optional: 'Необязательно',
    paste: 'Вставить',
    videosFound: 'видео найдено',
    presetLabel: 'Пресет',
    coursePreset: 'Плейлист курса',
    lecturePreset: 'Одна лекция',
    fatwaPreset: 'Нарезка фетв',
    bookPreset: 'Объяснение книги',
    thumbnailLabel: 'Миниатюра',
    youtubeThumbnail: 'Миниатюра YouTube',
    customThumbnail: 'Своя миниатюра',
    placeholderThumbnail: 'Автогенерация обложки',
    subtitles: 'Импортировать субтитры YouTube, если доступны',
    mergePdfs: 'Объединить PDF файлы с контентом',
    duplicates: 'Проверить на дубликаты перед импортом',
    summary: 'Сводка импорта',
    videos: 'Видео',
    subtitlesShort: 'Субтитры',
    pdfShort: 'PDF',
    duplicatesShort: 'Дубликаты',
    enabled: 'Включено',
    disabled: 'Выключено',
    start: 'Начать импорт',
    reset: 'Сбросить',
    urlRequired: 'Сначала введите YouTube URL.',
    importStarted: 'Демонстрационный запрос импорта подготовлен.',
    pasteFailed: 'Не удалось прочитать буфер обмена из браузера.',
  },
}
