import { useEffect, useState } from 'react'
import { Clipboard, FileText, Image, Link2, PlayCircle, RotateCcw } from 'lucide-react'
import { useLanguage, type Language } from '../../context/LanguageContext'

export function AdminYouTubeImportPage() {
  const { language } = useLanguage()
  const copy = youtubeImportCopy[language]
  const [sourceUrl, setSourceUrl] = useState('')
  const [sourceType, setSourceType] = useState('playlist')
  const [targetCategory, setTargetCategory] = useState('')
  const [targetTeacher, setTargetTeacher] = useState('')
  const [preset, setPreset] = useState('course')
  const [thumbnailMode, setThumbnailMode] = useState('youtube')
  const [importSubtitles, setImportSubtitles] = useState(true)
  const [mergePdfs, setMergePdfs] = useState(false)
  const [checkDuplicates, setCheckDuplicates] = useState(true)
  const [message, setMessage] = useState('')

  const videosFound = sourceUrl.trim() ? getMockVideoCount(sourceType, sourceUrl) : 0

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
    if (!sourceUrl.trim()) {
      setMessage(copy.urlRequired)
      return
    }

    setMessage(copy.importStarted)
  }

  function resetForm() {
    setSourceUrl('')
    setSourceType('playlist')
    setTargetCategory('')
    setTargetTeacher('')
    setPreset('course')
    setThumbnailMode('youtube')
    setImportSubtitles(true)
    setMergePdfs(false)
    setCheckDuplicates(true)
    setMessage('')
  }

  async function pasteUrl() {
    try {
      const text = await navigator.clipboard.readText()
      setSourceUrl(text)
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
        <div className="admin-panel youtube-import-card">
          <div className="youtube-import-icon">
            <PlayCircle size={30} />
          </div>

          <label>
            {copy.urlLabel}
            <div className="import-input-row">
              <Link2 size={18} />
              <input
                onChange={(event) => setSourceUrl(event.target.value)}
                placeholder={copy.urlPlaceholder}
                value={sourceUrl}
              />
              <button onClick={pasteUrl} type="button">
                <Clipboard size={16} />
                {copy.paste}
              </button>
            </div>
          </label>

          {sourceUrl.trim() ? (
            <p className="found-count">
              <PlayCircle size={16} />
              {videosFound} {copy.videosFound}
            </p>
          ) : null}

          <div className="compact-form-grid">
            <label>
              {copy.typeLabel}
              <select onChange={(event) => setSourceType(event.target.value)} value={sourceType}>
                <option value="playlist">{copy.playlist}</option>
                <option value="channel">{copy.channel}</option>
                <option value="video">{copy.video}</option>
              </select>
            </label>

            <label>
              {copy.presetLabel}
              <select onChange={(event) => setPreset(event.target.value)} value={preset}>
                <option value="course">{copy.coursePreset}</option>
                <option value="lecture">{copy.lecturePreset}</option>
                <option value="fatwa">{copy.fatwaPreset}</option>
                <option value="book">{copy.bookPreset}</option>
              </select>
            </label>

            <label>
              {copy.thumbnailLabel}
              <select onChange={(event) => setThumbnailMode(event.target.value)} value={thumbnailMode}>
                <option value="youtube">{copy.youtubeThumbnail}</option>
                <option value="custom">{copy.customThumbnail}</option>
                <option value="placeholder">{copy.placeholderThumbnail}</option>
              </select>
            </label>

            <label>
              {copy.categoryLabel}
              <input onChange={(event) => setTargetCategory(event.target.value)} placeholder={copy.optional} value={targetCategory} />
            </label>

            <label>
              {copy.teacherLabel}
              <input onChange={(event) => setTargetTeacher(event.target.value)} placeholder={copy.optional} value={targetTeacher} />
            </label>
          </div>

          <div className="import-checks">
            <label>
              <input checked={importSubtitles} onChange={(event) => setImportSubtitles(event.target.checked)} type="checkbox" />
              <span>
                <FileText size={16} />
                {copy.subtitles}
              </span>
            </label>
            <label>
              <input checked={mergePdfs} onChange={(event) => setMergePdfs(event.target.checked)} type="checkbox" />
              <span>
                <FileText size={16} />
                {copy.mergePdfs}
              </span>
            </label>
            <label>
              <input checked={checkDuplicates} onChange={(event) => setCheckDuplicates(event.target.checked)} type="checkbox" />
              <span>
                <Image size={16} />
                {copy.duplicates}
              </span>
            </label>
          </div>

          {message ? <p className="form-message">{message}</p> : null}

          <div className="youtube-import-actions">
            <button className="gold-button" onClick={startImport} type="button">
              <PlayCircle size={18} />
              {copy.start}
            </button>
            <button onClick={resetForm} type="button">
              <RotateCcw size={17} />
              {copy.reset}
            </button>
          </div>
        </div>

        <aside className="admin-panel import-summary">
          <h3>{copy.summary}</h3>
          <dl>
            <div>
              <dt>{copy.typeLabel}</dt>
              <dd>{sourceType}</dd>
            </div>
            <div>
              <dt>{copy.videos}</dt>
              <dd>{sourceUrl.trim() ? videosFound : '-'}</dd>
            </div>
            <div>
              <dt>{copy.subtitlesShort}</dt>
              <dd>{importSubtitles ? copy.enabled : copy.disabled}</dd>
            </div>
            <div>
              <dt>{copy.pdfShort}</dt>
              <dd>{mergePdfs ? copy.enabled : copy.disabled}</dd>
            </div>
            <div>
              <dt>{copy.duplicatesShort}</dt>
              <dd>{checkDuplicates ? copy.enabled : copy.disabled}</dd>
            </div>
            <div>
              <dt>{copy.thumbnailLabel}</dt>
              <dd>{thumbnailMode}</dd>
            </div>
            <div>
              <dt>{copy.categoryLabel}</dt>
              <dd>{targetCategory || '-'}</dd>
            </div>
            <div>
              <dt>{copy.teacherLabel}</dt>
              <dd>{targetTeacher || '-'}</dd>
            </div>
          </dl>
        </aside>
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
}
