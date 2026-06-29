import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Save, X, FileText, BookOpen, Layers, Check, Plus, Trash2, Upload, Globe } from 'lucide-react'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { useArchiveData } from '../../context/ArchiveDataContext'

// List of all countries in Arabic and English for datalist and lookup
const countriesList = [
  { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
  { ar: 'مصر', en: 'Egypt' },
  { ar: 'اليمن', en: 'Yemen' },
  { ar: 'سوريا', en: 'Syria' },
  { ar: 'العراق', en: 'Iraq' },
  { ar: 'الأردن', en: 'Jordan' },
  { ar: 'فلسطين', en: 'Palestine' },
  { ar: 'المغرب', en: 'Morocco' },
  { ar: 'الجزائر', en: 'Algeria' },
  { ar: 'تونس', en: 'Tunisia' },
  { ar: 'ليبيا', en: 'Libya' },
  { ar: 'السودان', en: 'Sudan' },
  { ar: 'الكويت', en: 'Kuwait' },
  { ar: 'قطر', en: 'Qatar' },
  { ar: 'الإمارات العربية المتحدة', en: 'United Arab Emirates' },
  { ar: 'البحرين', en: 'Bahrain' },
  { ar: 'سلطنة عمان', en: 'Oman' },
  { ar: 'أوزبكستان', en: 'Uzbekistan' },
  { ar: 'تركيا', en: 'Turkey' },
  { ar: 'لبنان', en: 'Lebanon' },
  { ar: 'موريتانيا', en: 'Mauritania' },
  { ar: 'الصومال', en: 'Somalia' },
  { ar: 'جيبوتي', en: 'Djibouti' },
  { ar: 'جزر القمر', en: 'Comoros' },
  { ar: 'أفغانستان', en: 'Afghanistan' },
  { ar: 'باكستان', en: 'Pakistan' },
  { ar: 'بنجلاديش', en: 'Bangladesh' },
  { ar: 'الهند', en: 'India' },
  { ar: 'إندونيسيا', en: 'Indonesia' },
  { ar: 'ماليزيا', en: 'Malaysia' },
  { ar: 'إيران', en: 'Iran' },
  { ar: 'أذربيجان', en: 'Azerbaijan' },
  { ar: 'كازاخستان', en: 'Kazakhstan' },
  { ar: 'قيرغيزستان', en: 'Kyrgyzstan' },
  { ar: 'طاجيكستان', en: 'Tajikistan' },
  { ar: 'تركمانستان', en: 'Turkmenistan' },
  { ar: 'روسيا', en: 'Russia' },
  { ar: 'الولايات المتحدة الأمريكية', en: 'United States of America' },
  { ar: 'المملكة المتحدة', en: 'United Kingdom' },
  { ar: 'فرنسا', en: 'France' },
  { ar: 'ألمانيا', en: 'Germany' },
]

const copyTranslations: Partial<Record<Language, Record<string, string>>> = {
  ar: {
    addTitle: 'إضافة كتاب جديد',
    editTitle: 'تعديل بيانات الكتاب',
    bookTitle: 'عنوان الكتاب',
    author: 'المؤلف / المصنف',
    category: 'القسم / التصنيف الرئيسي',
    fileLabel: 'ملف الكتاب أو الحالة',
    statusLabel: 'حالة النشر',
    pagesCount: 'عدد الصفحات للمجلد الرئيسي',
    toneLabel: 'اللون المميز للبطاقة (Tone)',
    save: 'حفظ البيانات',
    cancel: 'إلغاء وتراجع',
    selectCategory: '— اختر القسم الرئيسي —',
    selectAuthor: '— اختر المؤلف أو المصنف —',
    requiredField: 'هذا الحقل مطلوب',
    basicTab: 'المعلومات الأساسية',
    detailsTab: 'الملفات والوسائط والأجزاء',
    previewTitle: 'معاينة بطاقة الكتاب العامة',
    previewSubtitle: 'هكذا سيظهر الكتاب في المكتبة الرقمية للمستخدمين',
    placeholderTitle: 'عنوان الكتاب يظهر هنا',
    placeholderAuthor: 'اسم المؤلف',
    placeholderCategory: 'القسم العلمي',
    successAdd: 'تم إضافة الكتاب بنجاح',
    successEdit: 'تم تحديث بيانات الكتاب بنجاح',
    toneGreen: 'أخضر هادئ',
    toneBlue: 'أزرق داكن',
    toneGold: 'ذهبي كلاسيكي',
    toneRed: 'أحمر قرمزي',
    pages: 'صفحة',
    madhab: 'المذهب الفقهي للكتاب',
    selectMadhab: '— اختر المذهب الفقهي —',
    coverImage: 'صورة غلاف الكتاب الرئيسي',
    bookImages: 'صور من داخل الكتاب (للمعاينة المعرض)',
    downloadLink: 'رابط التنزيل المباشر (للكتاب أو المجلد الأول)',
    fileType: 'صيغة الملف',
    source: 'المصدر (مثال: تلجرام، المكتبة الكاملة)',
    kamelahLink: 'رابط الكتاب في المكتبة الكاملة (alkamelah.com)',
    descriptionShort: 'وصف مختصر للكتاب',
    descriptionLong: 'وصف مفصل أو محتوى الكتاب وجداوله',
    addAuthorTitle: 'تعريف مؤلف جديد',
    authorNameAr: 'اسم المؤلف الكامل (بالعربية)',
    authorKunya: 'الكنية (مثال: أبو عبد الله)',
    authorTitle: 'اللقب (مثال: شيخ، علامة)',
    authorCountry: 'البلد والنشأة',
    authorMadhab: 'المذهب الفقهي للمؤلف',
    hasVolumesLabel: 'هذا الكتاب يتكون من أجزاء/مجلدات متعددة',
    addVolumeBtn: 'إضافة جزء / مجلد جديد',
    volumeTitle: 'عنوان الجزء (مثال: المجلد الأول، الجزء 2)',
    volumeLink: 'رابط تحميل الجزء',
    volumeFileType: 'صيغة ملف الجزء',
    volumePages: 'الصفحات',
    volumeCover: 'غلاف مخصص للجزء (اختياري)',
  },
  en: {
    addTitle: 'Add New Book',
    editTitle: 'Edit Book Details',
    bookTitle: 'Book Title',
    author: 'Author',
    category: 'Category',
    fileLabel: 'Book File / Status',
    statusLabel: 'Publication Status',
    pagesCount: 'Pages (Main Volume)',
    toneLabel: 'Card Accent Tone',
    save: 'Save Details',
    cancel: 'Cancel',
    selectCategory: '— Select Category —',
    selectAuthor: '— Select Author —',
    requiredField: 'Required field',
    basicTab: 'Basic Info',
    detailsTab: 'Files & Volumes',
    previewTitle: 'Public Card Preview',
    previewSubtitle: 'How the book will appear in the digital library',
    placeholderTitle: 'Book title here',
    placeholderAuthor: 'Author name',
    placeholderCategory: 'Category',
    successAdd: 'Book added successfully',
    successEdit: 'Book updated successfully',
    toneGreen: 'Quiet Green',
    toneBlue: 'Deep Blue',
    toneGold: 'Classic Gold',
    toneRed: 'Crimson Red',
    pages: 'Pages',
    madhab: 'Madhab',
    selectMadhab: '— Select Madhab —',
    coverImage: 'Main Cover Image',
    bookImages: 'Preview Pages Images',
    downloadLink: 'Direct Download Link',
    fileType: 'File Format',
    source: 'Source (e.g. Telegram, Kamelah)',
    kamelahLink: 'Kamelah Library Link',
    descriptionShort: 'Short Description',
    descriptionLong: 'Detailed Description',
    addAuthorTitle: 'Define New Author',
    authorNameAr: 'Full Name',
    authorKunya: 'Kunya',
    authorTitle: 'Title',
    authorCountry: 'Country',
    authorMadhab: 'Madhab',
    hasVolumesLabel: 'This book consists of multiple volumes/parts',
    addVolumeBtn: 'Add New Volume / Part',
    volumeTitle: 'Volume Title (e.g., Vol 1, Part 2)',
    volumeLink: 'Download Link',
    volumeFileType: 'Format',
    volumePages: 'Pages',
    volumeCover: 'Custom Cover (Optional)',
  },
}

type AdminBookFormPageProps = {
  isAddMode: boolean
}

interface BookVolumeState {
  title: string
  downloadLink: string
  fileType: string
  pages: string
  coverImage?: string
  coverType?: 'main' | 'custom' | 'none'
}

export function AdminBookFormPage({ isAddMode }: AdminBookFormPageProps) {
  const { language, dir } = useLanguage()
  const { books, scholars, categories, saveBookRow, saveScholarRow } = useArchiveData()
  const navigate = useNavigate()
  const { bookId } = useParams<{ bookId: string }>()

  const copy = (copyTranslations[language] || copyTranslations['ar'] || {}) as Record<string, string>

  const [activeTab, setActiveTab] = useState<'basic' | 'details' | 'seo'>('basic')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Author Modal States
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false)
  const [authorForm, setAuthorForm] = useState({
    name: '',
    english: '',
    kunya: '',
    title: '',
    specialty: 'عام',
    madhab: '',
    country: '',
  })

  // Volumes States
  const [hasVolumes, setHasVolumes] = useState(false)
  const [volumes, setVolumes] = useState<BookVolumeState[]>([])

  // Download Links States
  const [downloadLinks, setDownloadLinks] = useState<{ url: string; fileType: string; source: string }[]>([])

  // Find existing book and index if editing
  const existingBookIndex = bookId ? books.findIndex((b) => b.id === bookId) : -1
  const existingBook = existingBookIndex !== -1 ? books[existingBookIndex] : null

  // Local state for the fields
  const [form, setForm] = useState<Record<string, string>>({
    title: '',
    author: '',
    category: '',
    categoryId: '',
    courses: '0',
    pages: '150',
    downloads: '0',
    views: '0',
    tone: 'green',
    file: 'PDF',
    status: 'منشور',
    coverImage: '',
    bookImages: '', // comma-separated strings of Base64
    downloadLink: '',
    fileType: 'PDF',
    source: '',
    kamelahLink: '',
    descriptionShort: '',
    descriptionLong: '',
    madhab: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  })

  useEffect(() => {
    if (!isAddMode && existingBook) {
      const matchedCat = categories.find(c => c.title.ar === existingBook.category.ar || c.title.en === existingBook.category.en)
      setForm({
        title: existingBook.title.ar || '',
        author: existingBook.author.ar || '',
        category: existingBook.category.ar || '',
        categoryId: matchedCat?.id || '',
        courses: String(existingBook.explanations || '0'),
        pages: String(existingBook.pages || '120'),
        downloads: String(existingBook.downloads || '0'),
        views: String(existingBook.views || '0'),
        tone: existingBook.tone || 'green',
        file: existingBook.file.ar === 'ناقص' ? 'Missing' : 'PDF',
        status: existingBook.status.ar || 'منشور',
        coverImage: existingBook.coverImage || '',
        bookImages: existingBook.bookImages ? existingBook.bookImages.join(',,,') : '',
        downloadLink: existingBook.downloadLink || '',
        fileType: existingBook.fileType || 'PDF',
        source: existingBook.source || '',
        kamelahLink: existingBook.kamelahLink || '',
        descriptionShort: existingBook.descriptionShort?.ar || '',
        descriptionLong: existingBook.descriptionLong?.ar || '',
        madhab: existingBook.madhab?.ar || '',
        seoTitle: existingBook.seoTitle || '',
        seoDescription: existingBook.seoDescription || '',
        seoKeywords: existingBook.seoKeywords || '',
      })

      if (existingBook.volumes && existingBook.volumes.length > 0) {
        setHasVolumes(true)
        setVolumes(existingBook.volumes.map(v => ({
          title: v.title || '',
          downloadLink: v.downloadLink || '',
          fileType: v.fileType || 'PDF',
          pages: String(v.pages || '150'),
          coverImage: v.coverImage || '',
          coverType: v.coverType || (v.coverImage ? 'custom' : 'main'),
        })))
      }

      if (existingBook.downloadLinks && existingBook.downloadLinks.length > 0) {
        setDownloadLinks(existingBook.downloadLinks.map(dl => ({
          url: dl.url || '',
          fileType: dl.fileType || 'PDF',
          source: dl.source || '',
        })))
      } else if (existingBook.downloadLink) {
        setDownloadLinks([{
          url: existingBook.downloadLink,
          fileType: existingBook.fileType || 'PDF',
          source: existingBook.source || '',
        }])
      } else {
        setDownloadLinks([])
      }
    }
  }, [isAddMode, existingBook, categories])

  function handleCategoryChange(catId: string) {
    const matchedCat = categories.find((c) => c.id === catId)
    const categoryText = matchedCat ? matchedCat.title[language] || matchedCat.title['ar'] : ''
    setForm((prev) => ({
      ...prev,
      categoryId: catId,
      category: categoryText,
    }))
  }

  // File Upload Handlers
  function handleCoverUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setForm((prev) => ({ ...prev, coverImage: base64 }))
    }
    reader.readAsDataURL(file)
  }

  function handleBookImagesUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0) return

    const currentImages = form.bookImages ? form.bookImages.split(',,,') : []
    const loaders = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(loaders).then((base64s) => {
      const nextImages = [...currentImages, ...base64s]
      setForm((prev) => ({ ...prev, bookImages: nextImages.join(',,,') }))
    })
  }

  function handleRemoveBookImage(index: number) {
    const currentImages = form.bookImages ? form.bookImages.split(',,,') : []
    const nextImages = currentImages.filter((_, idx) => idx !== index)
    setForm((prev) => ({ ...prev, bookImages: nextImages.join(',,,') }))
  }

  // Volumes Handlers
  function handleAddVolume() {
    setVolumes((prev) => [
      ...prev,
      { title: '', downloadLink: '', fileType: 'PDF', pages: '150', coverImage: '', coverType: 'main' },
    ])
  }

  function handleRemoveVolume(index: number) {
    setVolumes((prev) => prev.filter((_, idx) => idx !== index))
  }

  function handleVolumeChange(index: number, key: keyof BookVolumeState, value: string) {
    setVolumes((prev) =>
      prev.map((vol, idx) => (idx === index ? { ...vol, [key]: value } : vol))
    )
  }

  function handleVolumeCoverUpload(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setVolumes((prev) =>
        prev.map((vol, idx) => (idx === index ? { ...vol, coverImage: base64 } : vol))
      )
    }
    reader.readAsDataURL(file)
  }

  function handleSaveAuthor() {
    if (!authorForm.name.trim()) return

    // Save scholar
    saveScholarRow({
      name: authorForm.name,
      english: authorForm.english || authorForm.name,
      kunya: authorForm.kunya,
      title: authorForm.title,
      specialty: authorForm.specialty,
      madhab: authorForm.madhab,
      country: authorForm.country,
      courses: '0',
      lessons: '0',
      rating: '4.8',
    }, null)

    // Select this scholar as author in form
    setForm((prev) => ({
      ...prev,
      author: authorForm.name,
    }))

    // Reset and close
    setAuthorForm({
      name: '',
      english: '',
      kunya: '',
      title: '',
      specialty: 'عام',
      madhab: '',
      country: '',
    })
    setIsAuthorModalOpen(false)
  }

  function handleSave() {
    if (!form.title?.trim() || !form.author?.trim()) return

    // Format volumes payload
    const finalVolumes = hasVolumes
      ? volumes.map((v) => ({
          title: v.title,
          downloadLink: v.downloadLink,
          fileType: v.fileType,
          pages: Number(v.pages || '0'),
          coverImage: v.coverType === 'custom' ? v.coverImage : undefined,
          coverType: v.coverType || 'main',
        }))
      : []

    // Format downloadLinks payload
    const finalDownloadLinks = downloadLinks.map((dl) => ({
      url: dl.url,
      fileType: dl.fileType,
      source: dl.source,
    }))

    const finalForm = {
      ...form,
      volumes: JSON.stringify(finalVolumes),
      downloadLinks: JSON.stringify(finalDownloadLinks),
      downloadLink: finalDownloadLinks[0]?.url || '',
      fileType: finalDownloadLinks[0]?.fileType || 'PDF',
      source: finalDownloadLinks[0]?.source || '',
    }

    const saveIndex = isAddMode ? null : existingBookIndex
    saveBookRow(finalForm, saveIndex)

    setSuccessMessage(isAddMode ? copy.successAdd : copy.successEdit)
    setTimeout(() => {
      navigate('/admin/books')
    }, 1500)
  }

  const isValid = (form.title?.trim() || '').length > 0 && (form.author?.trim() || '').length > 0
  const authorName = form.author || copy.placeholderAuthor
  const bookTitleDisplay = form.title || copy.placeholderTitle
  const bookImagesList = form.bookImages ? form.bookImages.split(',,,') : []

  // Resolve color classes for card preview based on chosen tone
  const getToneStyles = (tone: string) => {
    switch (tone) {
      case 'blue':
        return {
          border: '1px solid #1e3a8a',
          background: 'linear-gradient(135deg, #1e3a8a, #0d1e3d)',
          accent: '#3b82f6',
          text: '#ffffff',
          subtitle: '#93c5fd',
        }
      case 'gold':
        return {
          border: '1px solid #854d0e',
          background: 'linear-gradient(135deg, #854d0e, #451a03)',
          accent: '#fbbf24',
          text: '#ffffff',
          subtitle: '#fde047',
        }
      case 'red':
        return {
          border: '1px solid #991b1b',
          background: 'linear-gradient(135deg, #991b1b, #450a0a)',
          accent: '#f87171',
          text: '#ffffff',
          subtitle: '#fca5a5',
        }
      case 'green':
      default:
        return {
          border: '1px solid #166534',
          background: 'linear-gradient(135deg, #134e5e, #71b280)',
          accent: '#a7f3d0',
          text: '#ffffff',
          subtitle: '#d1fae5',
        }
    }
  }

  const previewStyles = getToneStyles(form.tone)

  return (
    <div className="admin-page" dir={dir} style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Top Banner / Breadcrumb */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
            <span>لوحة التحكم</span>
            {dir === 'rtl' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/admin/books')}>الكتب والمصنفات</span>
            {dir === 'rtl' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            <span style={{ color: '#0d263d', fontWeight: 600 }}>{isAddMode ? copy.addTitle : copy.editTitle}</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0d263d', margin: 0 }}>
            {isAddMode ? copy.addTitle : copy.editTitle}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/admin/books')}
            type="button"
            className="cancel-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '44px',
              padding: '0 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              color: '#334155',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <X size={16} />
            {copy.cancel}
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="gold-button"
            disabled={!isValid}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '44px',
              padding: '0 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isValid ? 'pointer' : 'not-allowed',
              opacity: isValid ? 1 : 0.6,
              background: 'var(--color-gold, #c5a880)',
              border: 'none',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(197, 168, 128, 0.2)',
              transition: 'all 0.2s',
            }}
          >
            <Save size={16} />
            {copy.save}
          </button>
        </div>
      </header>

      {/* Success Notification */}
      {successMessage && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #10b981',
            color: '#065f46',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '16px',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <Check size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        {/* Left Side: Professional Tabs & Forms */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)', overflow: 'hidden' }}>
          {/* Tab Navigation */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', padding: '0 16px' }}>
            <button
              onClick={() => setActiveTab('basic')}
              style={{
                padding: '18px 24px',
                border: 'none',
                background: 'none',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'basic' ? 'var(--color-gold, #c5a880)' : '#64748b',
                borderBottom: activeTab === 'basic' ? '3px solid var(--color-gold, #c5a880)' : '3px solid transparent',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <BookOpen size={16} />
              {copy.basicTab}
            </button>
            <button
              onClick={() => setActiveTab('details')}
              style={{
                padding: '18px 24px',
                border: 'none',
                background: 'none',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'details' ? 'var(--color-gold, #c5a880)' : '#64748b',
                borderBottom: activeTab === 'details' ? '3px solid var(--color-gold, #c5a880)' : '3px solid transparent',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Layers size={16} />
              {copy.detailsTab}
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              style={{
                padding: '18px 24px',
                border: 'none',
                background: 'none',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'seo' ? 'var(--color-gold, #c5a880)' : '#64748b',
                borderBottom: activeTab === 'seo' ? '3px solid var(--color-gold, #c5a880)' : '3px solid transparent',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Globe size={16} />
              {language === 'ar' ? 'أرشفة و SEO' : 'SEO Settings'}
            </button>
          </div>

          {/* Form Content Wrapper */}
          <div style={{ padding: '32px' }}>
            {/* 1. Basic Info Tab */}
            {activeTab === 'basic' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* عنوان الكتاب */}
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{copy.bookTitle} <span style={{ color: '#ef4444' }}>*</span></span>
                  <input
                    autoFocus
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="مثال: العقيدة الواسطية، صحيح البخاري، عمدة الفقه"
                    value={form.title ?? ''}
                    required
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border 0.2s',
                    }}
                  />
                </label>

                {/* المؤلف المصنف */}
                <div className="form-grid-two" style={{ alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <span style={{ fontWeight: 600, color: '#334155' }}>{copy.author} <span style={{ color: '#ef4444' }}>*</span></span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        list="authors-datalist"
                        onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                        placeholder="اختر أو اكتب اسم المؤلف..."
                        value={form.author ?? ''}
                        required
                        style={{
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '15px',
                          outline: 'none',
                          flex: 1,
                        }}
                      />
                      <datalist id="authors-datalist">
                        {scholars.map((scholar) => (
                          <option key={scholar.id} value={scholar.name.ar}>
                            {scholar.name.en}
                          </option>
                        ))}
                      </datalist>
                      <button
                        type="button"
                        onClick={() => setIsAuthorModalOpen(true)}
                        style={{
                          display: 'inline-flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '46px',
                          height: '46px',
                          borderRadius: '8px',
                          background: 'var(--color-gold, #c5a880)',
                          color: '#fff',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                        title={copy.addAuthorTitle}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  {/* القسم الرئيسي */}
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.category}</span>
                    <select
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      value={form.categoryId ?? ''}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        background: '#fff',
                        outline: 'none',
                        cursor: 'pointer',
                        height: '46px',
                      }}
                    >
                      <option value="">{copy.selectCategory}</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.title[language] || cat.title['ar']}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* المذهب وحالة النشر */}
                <div className="form-grid-two">
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.madhab}</span>
                    <select
                      onChange={(e) => setForm((prev) => ({ ...prev, madhab: e.target.value }))}
                      value={form.madhab ?? ''}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        background: '#fff',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">{copy.selectMadhab}</option>
                      <option value="حنفي">حنفي</option>
                      <option value="شافعي">شافعي</option>
                      <option value="مالكي">مالكي</option>
                      <option value="حنبلي">حنبلي</option>
                      <option value="عام">عام / غير محدد</option>
                    </select>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.statusLabel}</span>
                    <select
                      onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                      value={form.status ?? 'منشور'}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        background: '#fff',
                        outline: 'none',
                      }}
                    >
                      <option value="منشور">منشور (Published)</option>
                      <option value="مراجعة">مراجعة (Review)</option>
                      <option value="مسودة">مسودة (Draft)</option>
                    </select>
                  </label>
                </div>

                {/* الأوصاف المختصرة والطويلة */}
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{copy.descriptionShort}</span>
                  <textarea
                    onChange={(e) => setForm((prev) => ({ ...prev, descriptionShort: e.target.value }))}
                    placeholder="اكتب نبذة مختصرة عن موضوع الكتاب..."
                    value={form.descriptionShort ?? ''}
                    rows={2}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{copy.descriptionLong}</span>
                  <textarea
                    onChange={(e) => setForm((prev) => ({ ...prev, descriptionLong: e.target.value }))}
                    placeholder="اكتب بالتفصيل مقدمة الكتاب أو فصوله أو ترجمة أوسع لمحتواه..."
                    value={form.descriptionLong ?? ''}
                    rows={5}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </label>
              </div>
            )}

            {/* 2. File & Media & Volumes Tab */}
            {activeTab === 'details' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* خيار الأجزاء المتعددة */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={hasVolumes}
                    onChange={(e) => setHasVolumes(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span>{copy.hasVolumesLabel}</span>
                </label>

                {/* البيانات الفنية العامة المتاحة دائماً */}
                <div className="form-grid-two">
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.pagesCount}</span>
                    <input
                      type="number"
                      min="1"
                      onChange={(e) => setForm((prev) => ({ ...prev, pages: e.target.value }))}
                      value={form.pages ?? '150'}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.toneLabel}</span>
                    <select
                      onChange={(e) => setForm((prev) => ({ ...prev, tone: e.target.value }))}
                      value={form.tone ?? 'green'}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        background: '#fff',
                        outline: 'none',
                      }}
                    >
                      <option value="green">{copy.toneGreen}</option>
                      <option value="blue">{copy.toneBlue}</option>
                      <option value="gold">{copy.toneGold}</option>
                      <option value="red">{copy.toneRed}</option>
                    </select>
                  </label>
                </div>

                {/* روابط التنزيل الفردية (في حال عدم وجود أجزاء) */}
                {!hasVolumes ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#0d263d' }}>روابط التنزيل المتاحة للكتاب (يمكن إضافة أكثر من رابط)</span>
                      <button
                        type="button"
                        onClick={() => setDownloadLinks(prev => [...prev, { url: '', fileType: 'PDF', source: '' }])}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'var(--color-gold, #c5a880)',
                          color: '#fff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <Plus size={16} />
                        إضافة رابط تنزيل جديد
                      </button>
                    </div>

                    {downloadLinks.map((link, idx) => (
                      <div key={idx} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                        <button
                          type="button"
                          onClick={() => setDownloadLinks(prev => prev.filter((_, i) => i !== idx))}
                          style={{ position: 'absolute', top: '12px', left: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          title="حذف الرابط"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="form-grid-two" style={{ marginTop: '8px' }}>
                          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                            <span>رابط التنزيل <span style={{ color: '#ef4444' }}>*</span></span>
                            <input
                              onChange={(e) => setDownloadLinks(prev => prev.map((dl, i) => i === idx ? { ...dl, url: e.target.value } : dl))}
                              placeholder="https://example.com/book.pdf"
                              value={link.url}
                              required
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                          </label>

                          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                            <span>المصدر / الوعاء (مثال: تلجرام، المكتبة الكاملة)</span>
                            <input
                              onChange={(e) => setDownloadLinks(prev => prev.map((dl, i) => i === idx ? { ...dl, source: e.target.value } : dl))}
                              placeholder="مثال: المكتبة الكاملة، تلجرام"
                              value={link.source}
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                          </label>
                        </div>

                        <div style={{ maxWidth: '300px' }}>
                          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                            <span>صيغة الملف</span>
                            <select
                              onChange={(e) => setDownloadLinks(prev => prev.map((dl, i) => i === idx ? { ...dl, fileType: e.target.value } : dl))}
                              value={link.fileType}
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
                            >
                              <option value="PDF">PDF</option>
                              <option value="Word">Word (.doc / .docx)</option>
                              <option value=".bok">E-Book (.bok)</option>
                              <option value="أخرى">أخرى</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    ))}

                    {downloadLinks.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '24px', color: '#64748b', background: '#fff', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
                        لا يوجد أي روابط تنزيل مضافة حالياً. اضغط على الزر أعلاه لإضافة رابط.
                      </div>
                    )}
                  </div>
                ) : (
                  /* إدارة الأجزاء المتعددة ديناميكياً */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#0d263d' }}>قائمة الأجزاء والمجلدات الملحقة</span>
                      <button
                        type="button"
                        onClick={handleAddVolume}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'var(--color-gold, #c5a880)',
                          color: '#fff',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(197, 168, 128, 0.2)',
                        }}
                      >
                        <Plus size={16} />
                        {copy.addVolumeBtn}
                      </button>
                    </div>

                    {volumes.map((vol, index) => (
                      <div key={index} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                        <button
                          type="button"
                          onClick={() => handleRemoveVolume(index)}
                          style={{ position: 'absolute', top: '12px', left: '12px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                          title="حذف الجزء"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="form-grid-two" style={{ marginTop: '8px' }}>
                          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                            <span>{copy.volumeTitle} <span style={{ color: '#ef4444' }}>*</span></span>
                            <input
                              onChange={(e) => handleVolumeChange(index, 'title', e.target.value)}
                              placeholder="مثال: المجلد الأول"
                              value={vol.title}
                              required
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                          </label>

                          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                            <span>{copy.volumeLink} <span style={{ color: '#ef4444' }}>*</span></span>
                            <input
                              onChange={(e) => handleVolumeChange(index, 'downloadLink', e.target.value)}
                              placeholder="رابط التحميل المباشر للجزء..."
                              value={vol.downloadLink}
                              required
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                          </label>
                        </div>

                        <div className="form-grid-two">
                          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                            <span>{copy.volumeFileType}</span>
                            <select
                              onChange={(e) => handleVolumeChange(index, 'fileType', e.target.value)}
                              value={vol.fileType}
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
                            >
                              <option value="PDF">PDF</option>
                              <option value="Word">Word (.doc)</option>
                              <option value=".bok">E-Book (.bok)</option>
                              <option value="أخرى">أخرى</option>
                            </select>
                          </label>

                          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                            <span>{copy.volumePages}</span>
                            <input
                              type="number"
                              min="1"
                              onChange={(e) => handleVolumeChange(index, 'pages', e.target.value)}
                              value={vol.pages}
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            />
                          </label>
                        </div>

                        {/* خيارات غلاف المجلد */}
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: '4px', alignItems: 'flex-end' }}>
                          <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, flex: 1, minWidth: '200px' }}>
                            <span>خيارات غلاف المجلد / الجزء</span>
                            <select
                              onChange={(e) => handleVolumeChange(index, 'coverType', e.target.value)}
                              value={vol.coverType || 'main'}
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
                            >
                              <option value="main">نفس غلاف الكتاب الرئيسي</option>
                              <option value="custom">غلاف مخصص لهذا المجلد (رفع صورة)</option>
                              <option value="none">بدون غلاف (رابط تنزيل فقط)</option>
                            </select>
                          </label>

                          {vol.coverType === 'custom' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, flex: 1, minWidth: '200px' }}>
                              <span>رفع صورة الغلاف المخصص</span>
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleVolumeCoverUpload(index, e)}
                                  style={{ display: 'none' }}
                                  id={`volume-cover-upload-${index}`}
                                />
                                <label
                                  htmlFor={`volume-cover-upload-${index}`}
                                  style={{
                                    padding: '8px 16px',
                                    background: '#f1f5f9',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    textAlign: 'center'
                                  }}
                                >
                                  اختيار صورة...
                                </label>
                                {vol.coverImage && (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <img src={vol.coverImage} alt="Vol cover preview" style={{ width: '40px', height: '55px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                                    <button
                                      type="button"
                                      onClick={() => handleVolumeChange(index, 'coverImage', '')}
                                      style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }}
                                    >
                                      إزالة
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* المصدر ورابط المكتبة الكاملة المشتركة */}
                <div className="form-grid-two" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.source}</span>
                    <input
                      onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value }))}
                      placeholder="مثال: تلجرام، المكتبة الكاملة"
                      value={form.source ?? ''}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.kamelahLink}</span>
                    <input
                      onChange={(e) => setForm((prev) => ({ ...prev, kamelahLink: e.target.value }))}
                      placeholder="مثال: https://alkamelah.com/book/123"
                      value={form.kamelahLink ?? ''}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                  </label>
                </div>

                {/* صورة الغلاف */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                  <span style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
                    {copy.coverImage}
                  </span>
                  <div
                    style={{
                      border: '2px dashed #cbd5e1',
                      borderRadius: '12px',
                      padding: '24px',
                      textAlign: 'center',
                      background: '#f8fafc',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    {form.coverImage ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={form.coverImage}
                          alt="Cover Preview"
                          style={{
                            width: '100px',
                            height: '140px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, coverImage: '' }))}
                          style={{
                            fontSize: '13px',
                            padding: '6px 12px',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '6px',
                            background: '#fff',
                            cursor: 'pointer',
                          }}
                        >
                          حذف الغلاف
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <Upload size={24} style={{ color: '#64748b' }} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverUpload}
                          style={{ display: 'none' }}
                          id="book-cover-upload"
                        />
                        <label
                          htmlFor="book-cover-upload"
                          style={{
                            display: 'inline-flex',
                            background: 'var(--color-gold, #c5a880)',
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '13px',
                          }}
                        >
                          تحميل صورة الغلاف
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* صور المعاينة من داخل الكتاب */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                  <span style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
                    {copy.bookImages}
                  </span>
                  <div
                    style={{
                      border: '2px dashed #cbd5e1',
                      borderRadius: '12px',
                      padding: '24px',
                      background: '#f8fafc',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleBookImagesUpload}
                        style={{ display: 'none' }}
                        id="book-images-upload"
                      />
                      <label
                        htmlFor="book-images-upload"
                        style={{
                          display: 'inline-flex',
                          background: 'var(--color-gold, #c5a880)',
                          color: '#fff',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        إضافة صور من الكتاب (المعاينة)
                      </label>
                    </div>

                    {bookImagesList.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '12px', marginTop: '12px' }}>
                        {bookImagesList.map((imgBase64, idx) => (
                          <div key={idx} style={{ position: 'relative', width: '80px', height: '110px', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <img src={imgBase64} alt="Book page preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button
                              type="button"
                              onClick={() => handleRemoveBookImage(idx)}
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: 'rgba(239, 68, 68, 0.9)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                width: '22px',
                                height: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                              }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* 3. SEO Tab */}
            {activeTab === 'seo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{language === 'ar' ? 'عنوان الصفحة (SEO Title)' : 'Page Title (SEO Title)'}</span>
                  <input
                    onChange={(e) => setForm((prev) => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder={language === 'ar' ? 'اكتب عنوان الصفحة المخصص لمحركات البحث' : 'Enter custom page title'}
                    value={form.seoTitle ?? ''}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{language === 'ar' ? 'وصف الصفحة (SEO Description)' : 'Page Description (SEO Description)'}</span>
                  <textarea
                    onChange={(e) => setForm((prev) => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder={language === 'ar' ? 'اكتب وصفاً مختصراً جداً ليظهر في نتائج البحث' : 'Enter meta description'}
                    value={form.seoDescription ?? ''}
                    rows={4}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{language === 'ar' ? 'الكلمات المفتاحية (SEO Keywords)' : 'Keywords (SEO Keywords)'}</span>
                  <input
                    onChange={(e) => setForm((prev) => ({ ...prev, seoKeywords: e.target.value }))}
                    placeholder={language === 'ar' ? 'كلمة، كلمة أخرى، مذهب، علم شرعي' : 'keyword1, keyword2'}
                    value={form.seoKeywords ?? ''}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                    }}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Book Live Public Card Preview */}
        <aside style={{ position: 'sticky', top: '24px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0d263d', margin: '0 0 4px 0' }}>{copy.previewTitle}</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px 0' }}>{copy.previewSubtitle}</p>

            {/* Book Card Mockup */}
            <div
              style={{
                borderRadius: '12px',
                padding: '24px',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: previewStyles.text,
                background: previewStyles.background,
                border: previewStyles.border,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Pattern Background overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.08,
                  backgroundImage: 'radial-gradient(circle, #000 10%, transparent 10%)',
                  backgroundSize: '12px 12px',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', alignItems: 'start' }}>
                {/* Custom Cover Preview in Card */}
                {form.coverImage && (
                  <img
                    src={form.coverImage}
                    alt="Book Cover"
                    style={{
                      width: '70px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  />
                )}

                <div style={{ flex: 1 }}>
                  {/* Book Category */}
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: previewStyles.accent,
                      background: 'rgba(255,255,255,0.1)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      display: 'inline-block',
                      marginBottom: '10px',
                    }}
                  >
                    {form.category || copy.placeholderCategory}
                  </span>

                  {/* Book Title */}
                  <h4 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 6px 0', lineHeight: 1.3 }}>
                    {bookTitleDisplay}
                  </h4>

                  {/* Book Author */}
                  <span style={{ fontSize: '13px', opacity: 0.9, display: 'block', color: previewStyles.subtitle }}>
                    {authorName}
                  </span>

                  {/* Madhab details */}
                  {form.madhab && (
                    <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '6px' }}>
                      المذهب: {form.madhab}
                    </span>
                  )}
                </div>
              </div>

              {/* Short description preview */}
              {form.descriptionShort && (
                <p style={{ fontSize: '12px', opacity: 0.85, margin: '12px 0 0 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                  {form.descriptionShort}
                </p>
              )}

              {/* Stats Footer of the Book */}
              <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px', marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.95 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FileText size={13} />
                    <span>{hasVolumes ? volumes.length : 1} {hasVolumes ? 'أجزاء' : `${form.pages} ${copy.pages}`}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {hasVolumes ? (
                      <span style={{ background: '#10b981', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>
                        مجلدات متعددة
                      </span>
                    ) : form.downloadLink ? (
                      <span style={{ background: '#10b981', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>
                        {form.fileType} جاهز
                      </span>
                    ) : (
                      <span style={{ background: '#ef4444', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>
                        غير متوفر
                      </span>
                    )}
                  </div>
                </div>

                {form.source && (
                  <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '6px', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                    المصدر: {form.source}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Define New Author Modal (Scholar creation on the fly) */}
      {isAuthorModalOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsAuthorModalOpen(false)}>
          <section
            className="admin-modal"
            role="dialog"
            aria-modal="true"
            aria-label={copy.addAuthorTitle}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '600px', width: '90%' }}
          >
            <header>
              <h2>{copy.addAuthorTitle}</h2>
              <button onClick={() => setIsAuthorModalOpen(false)} type="button" className="close-modal-btn">
                ×
              </button>
            </header>

            <div className="modal-form" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600 }}>
                <span>{copy.authorNameAr} <span style={{ color: '#ef4444' }}>*</span></span>
                <input
                  autoFocus
                  onChange={(e) => setAuthorForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="مثال: الإمام ابن قدامة المقدسي"
                  value={authorForm.name}
                  required
                  style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </label>

              <div className="form-grid-two">
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600 }}>
                  <span>{copy.authorKunya}</span>
                  <input
                    onChange={(e) => setAuthorForm((prev) => ({ ...prev, kunya: e.target.value }))}
                    placeholder="مثال: أبو محمد"
                    value={authorForm.kunya}
                    style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600 }}>
                  <span>{copy.authorTitle}</span>
                  <input
                    onChange={(e) => setAuthorForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="مثال: موفق الدين"
                    value={authorForm.title}
                    style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </label>
              </div>

              <div className="form-grid-two">
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600 }}>
                  <span>{copy.authorMadhab}</span>
                  <select
                    onChange={(e) => setAuthorForm((prev) => ({ ...prev, madhab: e.target.value }))}
                    value={authorForm.madhab}
                    style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
                  >
                    <option value="">{copy.selectMadhab}</option>
                    <option value="حنفي">حنفي</option>
                    <option value="شافعي">شافعي</option>
                    <option value="مالكي">مالكي</option>
                    <option value="حنبلي">حنبلي</option>
                    <option value="عام">عام / غير محدد</option>
                  </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600 }}>
                  <span>{copy.authorCountry}</span>
                  <input
                    list="author-countries-datalist"
                    onChange={(e) => setAuthorForm((prev) => ({ ...prev, country: e.target.value }))}
                    placeholder="اختر أو اكتب البلد..."
                    value={authorForm.country}
                    style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                  <datalist id="author-countries-datalist">
                    {countriesList.map((c) => (
                      <option key={c.en} value={c.ar}>
                        {c.en}
                      </option>
                    ))}
                  </datalist>
                </label>
              </div>
            </div>

            <footer>
              <button onClick={() => setIsAuthorModalOpen(false)} type="button" className="cancel-btn">
                {copy.cancel}
              </button>
              <button
                className="gold-button"
                onClick={handleSaveAuthor}
                type="button"
                disabled={!authorForm.name.trim()}
                style={{ background: 'var(--color-gold, #c5a880)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: authorForm.name.trim() ? 'pointer' : 'not-allowed' }}
              >
                تعريف وحفظ
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  )
}
