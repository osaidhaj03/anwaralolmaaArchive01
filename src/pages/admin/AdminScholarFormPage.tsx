import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Save, Upload, X, AlertTriangle, User, Calendar, BookOpen, Globe, Check } from 'lucide-react'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { useArchiveData } from '../../context/ArchiveDataContext'
import { pickLocalizedText } from '../../data/shared/archive'

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
  { ar: 'إران', en: 'Iran' },
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
  { ar: 'إيطاليا', en: 'Italy' },
  { ar: 'إسبانيا', en: 'Spain' },
  { ar: 'السنغال', en: 'Senegal' },
  { ar: 'نيجيريا', en: 'Nigeria' },
  { ar: 'النيجر', en: 'Niger' },
  { ar: 'مالي', en: 'Mali' },
  { ar: 'تشاد', en: 'Chad' },
  { ar: 'ألبانيا', en: 'Albania' },
  { ar: 'البوسنة والهرسك', en: 'Bosnia and Herzegovina' },
  { ar: 'كندا', en: 'Canada' },
  { ar: 'أستراليا', en: 'Australia' },
  { ar: 'الصين', en: 'China' },
  { ar: 'اليابان', en: 'Japan' },
  { ar: 'السويد', en: 'Sweden' },
  { ar: 'النرويج', en: 'Norway' },
  { ar: 'الدنمارك', en: 'Denmark' },
  { ar: 'هولندا', en: 'Netherlands' },
  { ar: 'بلجيكا', en: 'Belgium' },
  { ar: 'سويسرا', en: 'Switzerland' },
  { ar: 'النمسا', en: 'Austria' },
  { ar: 'اليونان', en: 'Greece' },
  { ar: 'قبرص', en: 'Cyprus' },
  { ar: 'أوكرانيا', en: 'Ukraine' },
  { ar: 'بولندا', en: 'Poland' },
  { ar: 'رومانيا', en: 'Romania' },
  { ar: 'بلغاريا', en: 'Bulgaria' },
  { ar: 'البرازيل', en: 'Brazil' },
  { ar: 'الأرجنتين', en: 'Argentina' },
  { ar: 'المكسيك', en: 'Mexico' },
  { ar: 'جنوب إفريقيا', en: 'South Africa' },
  { ar: 'كينيا', en: 'Kenya' },
  { ar: 'تنزانيا', en: 'Tanzania' },
  { ar: 'أوغندا', en: 'Uganda' },
  { ar: 'غانا', en: 'Ghana' },
  { ar: 'ساحل العاج', en: 'Ivory Coast' },
  { ar: 'الكاميرون', en: 'Cameroon' },
  { ar: 'الكونغو', en: 'Congo' },
  { ar: 'أنغولا', en: 'Angola' },
  { ar: 'إثيوبيا', en: 'Ethiopia' },
  { ar: 'إريتريا', en: 'Eritrea' },
  { ar: 'زيمبابوي', en: 'Zimbabwe' },
]

const copyTranslations: Record<Language, Record<string, string>> = {
  ar: {
    addTitle: 'إضافة عالم جديد',
    editTitle: 'تعديل بيانات العالم',
    nameAr: 'الاسم الكامل',
    nameEn: 'الاسم بالإنجليزية',
    kunya: 'الكنية (مثال: أبو عبد الله)',
    title: 'اللقب (مثال: شيخ، علامة...)',
    specialty: 'التخصص العلمي (الفئة الرئيسية)',
    madhab: 'المذهب الفقهي',
    selectMadhab: '— اختر المذهب الفقهي —',
    country: 'البلد والنشأة',
    birthYear: 'سنة الميلاد (هجري / ميلادي)',
    deathYear: 'سنة الوفاة (اختياري)',
    bioShort: 'نبذة مختصرة (تظهر في بطاقة التعريف)',
    bioLong: 'السيرة الذاتية المفصلة والمسيرة العلمية',
    coursesCount: 'عدد الدورات التعليمية',
    lessonsCount: 'عدد الدروس المسجلة',
    imageLabel: 'صورة العالم (الرمزية)',
    uploadBtn: 'تحميل صورة شخصية',
    removeImageBtn: 'حذف الصورة',
    imageGuidelines: 'المقاس الموصى به: نسبة 1:1 مربعة (مثال: 256×256 بكسل). الصيغ: PNG, JPG, WEBP.',
    imageTooLarge: 'تنبيه: حجم الصورة كبير جداً (أكثر من 200 كيلوبايت). قد يؤدي ذلك لبطء في الأداء.',
    save: 'حفظ البيانات',
    cancel: 'إلغاء وتراجع',
    selectCategory: '— اختر التخصص الرئيسي —',
    requiredField: 'هذا الحقل مطلوب',
    basicTab: 'المعلومات الأساسية',
    bioTab: 'السيرة والتاريخ',
    statsTab: 'الإحصائيات والصورة',
    previewTitle: 'معاينة بطاقة العالم العامة',
    previewSubtitle: 'هكذا سيظهر العالم في صفحات الموقع للمستخدمين',
    placeholderName: 'اسم العالم يظهر هنا',
    placeholderTitle: 'اللقب العلمي',
    placeholderSpecialty: 'التخصص العلمي',
    placeholderCountry: 'البلد',
    courses: 'الدورات',
    lessons: 'الدروس',
    successAdd: 'تم إضافة العالم بنجاح',
    successEdit: 'تم تحديث بيانات العالم بنجاح',
  },
  en: {
    addTitle: 'Add New Scholar',
    editTitle: 'Edit Scholar Details',
    nameAr: 'Full Name',
    nameEn: 'Name (English)',
    kunya: 'Kunya (e.g., Abu Abdullah)',
    title: 'Title (e.g., Shaykh, Alim...)',
    specialty: 'Specialty Area',
    madhab: 'Fiqh Madhab (School)',
    selectMadhab: '— Select Madhab —',
    country: 'Country',
    birthYear: 'Birth Year (Hijri / Gregorian)',
    deathYear: 'Death Year (Optional)',
    bioShort: 'Short Biography (Shown on card)',
    bioLong: 'Detailed Biography (Shown on Scholar Profile page)',
    coursesCount: 'Courses Count',
    lessonsCount: 'Lessons Count',
    imageLabel: 'Scholar Image',
    uploadBtn: 'Upload Photo',
    removeImageBtn: 'Remove Photo',
    imageGuidelines: 'Recommended: 1:1 square ratio. PNG, JPG, WEBP.',
    imageTooLarge: 'Warning: Image size is too large.',
    save: 'Save Details',
    cancel: 'Cancel',
    selectCategory: '— Select Primary Specialty —',
    requiredField: 'Required field',
    basicTab: 'Basic Info',
    bioTab: 'Bio & History',
    statsTab: 'Stats & Media',
    previewTitle: 'Public Card Preview',
    previewSubtitle: 'How the scholar will appear in directory listing',
    placeholderName: 'Scholar name here',
    placeholderTitle: 'Academic Title',
    placeholderSpecialty: 'Specialty Area',
    placeholderCountry: 'Country',
    courses: 'Courses',
    lessons: 'Lessons',
    successAdd: 'Scholar added successfully',
    successEdit: 'Scholar updated successfully',
  },
  uz: {
    addTitle: 'Yangi olim qo‘shish',
    editTitle: 'Olim ma’lumotlarini tahrirlash',
    nameAr: 'To‘liq ismi',
    nameEn: 'Ismi (Inglizcha)',
    kunya: 'Kunya (masalan, Abu Abdulloh)',
    title: 'Unvoni (Shayx, Alloma...)',
    specialty: 'Asosiy yo‘nalish',
    madhab: 'Fiqhiy mazhab',
    selectMadhab: '— Mazhabni tanlang —',
    country: 'Mamlakat',
    birthYear: 'Tug‘ilgan yili',
    deathYear: 'Vafot etgan yili (ixtiyoriy)',
    bioShort: 'Qisqa tarjimai hol',
    bioLong: 'Batafsil tarjimai hol',
    coursesCount: 'Kurslar soni',
    lessonsCount: 'Darslar soni',
    imageLabel: 'Rasm',
    uploadBtn: 'Rasm yuklash',
    removeImageBtn: 'Rasmni o‘chirish',
    imageGuidelines: 'Tavsiya etilgan o‘lcham: 1:1 kvadrat.',
    imageTooLarge: 'Rasm hajmi juda katta.',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    selectCategory: '— Yo‘nalishni tanlang —',
    requiredField: 'Majburiy maydon',
    basicTab: 'Asosiy ma’lumotlar',
    bioTab: 'Tarjimai hol',
    statsTab: 'Statistika va rasm',
    previewTitle: 'Karta ko‘rinishi',
    previewSubtitle: 'Olim saytda qanday ko‘rinishi',
    placeholderName: 'Olim ismi',
    placeholderTitle: 'Lavozimi',
    placeholderSpecialty: 'Yo‘nalishi',
    placeholderCountry: 'Mamlakat',
    courses: 'Kurslar',
    lessons: 'Darslar',
    successAdd: 'Muvaffaqiyatli qo‘shildi',
    successEdit: 'Muvaffaqiyatli yangilandi',
  },
  uzCyr: {
    addTitle: 'Янги олим қўшиш',
    editTitle: 'Олим маълумотларини таҳрирлаш',
    nameAr: 'Тўлиқ исми',
    nameEn: 'Исми (Инглизча)',
    kunya: 'Куня (масалан, Абу Абдуллоҳ)',
    title: 'Унвони (Шайх, Аллома...)',
    specialty: 'Асосий йўналиш',
    madhab: 'Фиқҳий мазҳаб',
    selectMadhab: '— Мазҳабни танланг —',
    country: 'Мамлакат',
    birthYear: 'Туғилган йили',
    deathYear: 'Вафот этган йили (ихтиёрий)',
    bioShort: 'Қисқа таржимаи ҳол',
    bioLong: 'Батафсил таржимаи ҳол',
    coursesCount: 'Курслар сони',
    lessonsCount: 'Дарслар сони',
    imageLabel: 'Расм',
    uploadBtn: 'Расм юклаш',
    removeImageBtn: 'Расмни ўчириш',
    imageGuidelines: 'Тавсия этилган ўлчам: 1:1 квадрат.',
    imageTooLarge: 'Расм ҳажми жуда катта.',
    save: 'Сақлаш',
    cancel: 'Бекор қилиш',
    selectCategory: '— Йўналишни танланг —',
    requiredField: 'Мажбурий майдон',
    basicTab: 'Асосий маълумотлар',
    bioTab: 'Таржимаи ҳол',
    statsTab: 'Статистика ва расм',
    previewTitle: 'Карта кўриниши',
    previewSubtitle: 'Олим сайтда қандай кўриниши',
    placeholderName: 'Олим исми',
    placeholderTitle: 'Лавозими',
    placeholderSpecialty: 'Йўналиши',
    placeholderCountry: 'Мамлакат',
    courses: 'Курслар',
    lessons: 'Дарслар',
    successAdd: 'Муваффақиятли қўшилди',
    successEdit: 'Муваффақиятли янгиланди',
  },
  ru: {
    addTitle: 'Добавить ученого',
    editTitle: 'Редактировать данные ученого',
    nameAr: 'Полное имя',
    nameEn: 'Имя (на английском)',
    kunya: 'Кунья (например, Абу Абдуллах)',
    title: 'Титул (Шейх, Алим...)',
    specialty: 'Специализация',
    madhab: 'Мазхаб (школа)',
    selectMadhab: '— Выберите мазхаб —',
    country: 'Страна',
    birthYear: 'Год рождения',
    deathYear: 'Год смерти (Опционально)',
    bioShort: 'Краткая биография',
    bioLong: 'Подробная биография',
    coursesCount: 'Количество курсов',
    lessonsCount: 'Количество уроков',
    imageLabel: 'Фото ученого',
    uploadBtn: 'Выбрать фото',
    removeImageBtn: 'Удалить фото',
    imageGuidelines: 'Рекомендуется: квадрат 1:1.',
    imageTooLarge: 'Предупреждение: Размер файла превышает 200 КБ.',
    save: 'Сохранить изменения',
    cancel: 'Отмена',
    selectCategory: '— Выберите специализацию —',
    requiredField: 'Обязательное поле',
    basicTab: 'Основная информация',
    bioTab: 'Биография и даты',
    statsTab: 'Статистика и фото',
    previewTitle: 'Предпросмотр карточки',
    previewSubtitle: 'Как карточка будет выглядеть в общем списке',
    placeholderName: 'Имя ученого',
    placeholderTitle: 'Ученое звание',
    placeholderSpecialty: 'Направление',
    placeholderCountry: 'Страна',
    courses: 'Курсы',
    lessons: 'Уроки',
    successAdd: 'Ученый успешно добавлен',
    successEdit: 'Данные ученого обновлены',
  },
}

type AdminScholarFormPageProps = {
  isAddMode: boolean
}

export function AdminScholarFormPage({ isAddMode }: AdminScholarFormPageProps) {
  const { language, dir } = useLanguage()
  const { scholars, categories, saveScholarRow } = useArchiveData()
  const navigate = useNavigate()
  const { scholarId } = useParams<{ scholarId: string }>()

  const copy = copyTranslations[language] || copyTranslations['ar']

  const [activeTab, setActiveTab] = useState<'basic' | 'bio' | 'stats' | 'seo'>('basic')
  const [imageWarning, setImageWarning] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Find existing scholar and index if editing
  const existingScholarIndex = scholarId ? scholars.findIndex((s) => s.id === scholarId) : -1
  const existingScholar = existingScholarIndex !== -1 ? scholars[existingScholarIndex] : null

  // Local state for the fields
  const [form, setForm] = useState<Record<string, string>>({
    name: '',
    english: '',
    kunya: '',
    title: '',
    specialty: '',
    madhab: '',
    country: '',
    courses: '0',
    lessons: '0',
    rating: '4.8',
    image: '',
    bioShort: '',
    bioLong: '',
    birthYear: '',
    deathYear: '',
    categoryId: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  })

  // Load existing scholar details
  useEffect(() => {
    if (!isAddMode && existingScholar) {
      setForm({
        name: existingScholar.name.ar || '',
        english: existingScholar.name.en || '',
        kunya: existingScholar.kunya?.ar || '',
        title: existingScholar.title.ar || '',
        specialty: existingScholar.field.ar || '',
        madhab: existingScholar.madhab?.ar || '',
        country: existingScholar.country.ar || '',
        courses: String(existingScholar.courses || '0'),
        lessons: String(existingScholar.lessons || '0'),
        rating: existingScholar.rating || '4.8',
        image: existingScholar.image || '',
        bioShort: existingScholar.bioShort?.ar || '',
        bioLong: existingScholar.bioLong?.ar || '',
        birthYear: existingScholar.birthYear || '',
        deathYear: existingScholar.deathYear || '',
        categoryId: existingScholar.categoryId || '',
        seoTitle: existingScholar.seoTitle || '',
        seoDescription: existingScholar.seoDescription || '',
        seoKeywords: existingScholar.seoKeywords || '',
      })
    }
  }, [isAddMode, existingScholar])

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const fileSizeKB = file.size / 1024
    if (fileSizeKB > 200) {
      setImageWarning(copy.imageTooLarge)
    } else {
      setImageWarning(null)
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setForm((prev) => ({ ...prev, image: base64 }))
    }
    reader.readAsDataURL(file)
  }

  function handleCategoryChange(catId: string) {
    const matchedCat = categories.find((c) => c.id === catId)
    const specialtyText = matchedCat ? matchedCat.title[language] || matchedCat.title['ar'] : ''
    setForm((prev) => ({
      ...prev,
      categoryId: catId,
      specialty: specialtyText,
    }))
  }

  function handleSave() {
    if (!form.name?.trim()) return

    const saveIndex = isAddMode ? null : existingScholarIndex
    saveScholarRow(form, saveIndex)

    setSuccessMessage(isAddMode ? copy.successAdd : copy.successEdit)
    setTimeout(() => {
      navigate('/admin/teachers')
    }, 1500)
  }

  const isValid = (form.name?.trim() || '').length > 0
  const resolvedCategory = categories.find((c) => c.id === form.categoryId)
  const categoryName = resolvedCategory ? pickLocalizedText(resolvedCategory.title, language) : (form.specialty || copy.placeholderSpecialty)

  // Constructing display name for preview (incorporating Kunya and Title if they exist)
  const displayName = form.name ? `${form.kunya ? form.kunya + ' / ' : ''}${form.name}` : copy.placeholderName

  return (
    <div className="admin-page" dir={dir} style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Top Banner / Breadcrumb */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
            <span>لوحة التحكم</span>
            {dir === 'rtl' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/admin/teachers')}>العلماء والمدرسين</span>
            {dir === 'rtl' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            <span style={{ color: '#0d263d', fontWeight: 600 }}>{isAddMode ? copy.addTitle : copy.editTitle}</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0d263d', margin: 0 }}>
            {isAddMode ? copy.addTitle : copy.editTitle}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/admin/teachers')}
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
              <User size={16} />
              {copy.basicTab}
            </button>
            <button
              onClick={() => setActiveTab('bio')}
              style={{
                padding: '18px 24px',
                border: 'none',
                background: 'none',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'bio' ? 'var(--color-gold, #c5a880)' : '#64748b',
                borderBottom: activeTab === 'bio' ? '3px solid var(--color-gold, #c5a880)' : '3px solid transparent',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Calendar size={16} />
              {copy.bioTab}
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              style={{
                padding: '18px 24px',
                border: 'none',
                background: 'none',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'stats' ? 'var(--color-gold, #c5a880)' : '#64748b',
                borderBottom: activeTab === 'stats' ? '3px solid var(--color-gold, #c5a880)' : '3px solid transparent',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <BookOpen size={16} />
              {copy.statsTab}
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
                
                {/* الاسم الكامل والكنية */}
                <div className="form-grid-two">
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.nameAr} <span style={{ color: '#ef4444' }}>*</span></span>
                    <input
                      autoFocus
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="مثال: صالح بن فوزان الفوزان"
                      value={form.name ?? ''}
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

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.kunya}</span>
                    <input
                      onChange={(e) => setForm((prev) => ({ ...prev, kunya: e.target.value }))}
                      placeholder="مثال: أبو عبد الله"
                      value={form.kunya ?? ''}
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
                </div>

                {/* اللقب والتخصص الفئة */}
                <div className="form-grid-two">
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.title}</span>
                    <input
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="مثال: شيخ، علامة، محدث"
                      value={form.title ?? ''}
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

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.specialty}</span>
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

                {/* المذهب والبلد */}
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
                    <span>{copy.country}</span>
                    <input
                      list="countries-datalist"
                      onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                      placeholder="اختر أو اكتب اسم البلد..."
                      value={form.country ?? ''}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                    <datalist id="countries-datalist">
                      {countriesList.map((country) => (
                        <option key={country.en} value={country.ar}>
                          {country.en}
                        </option>
                      ))}
                    </datalist>
                  </label>
                </div>

                {/* الاسم بالإنجليزية */}
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155', maxWidth: '50%' }}>
                  <span>{copy.nameEn}</span>
                  <input
                    onChange={(e) => setForm((prev) => ({ ...prev, english: e.target.value }))}
                    placeholder="e.g., Saleh Al-Fawzan"
                    value={form.english ?? ''}
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

            {/* 2. Bio & History Tab */}
            {activeTab === 'bio' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="form-grid-two">
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.birthYear}</span>
                    <input
                      onChange={(e) => setForm((prev) => ({ ...prev, birthYear: e.target.value }))}
                      placeholder="مثال: 1354 هـ / 1935 م"
                      value={form.birthYear ?? ''}
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
                    <span>{copy.deathYear}</span>
                    <input
                      onChange={(e) => setForm((prev) => ({ ...prev, deathYear: e.target.value }))}
                      placeholder="اتركه فارغاً إذا كان على قيد الحياة"
                      value={form.deathYear ?? ''}
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

                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{copy.bioShort}</span>
                  <textarea
                    onChange={(e) => setForm((prev) => ({ ...prev, bioShort: e.target.value }))}
                    placeholder="نبذة مركزة وسريعة تظهر في قوائم العلماء..."
                    value={form.bioShort ?? ''}
                    rows={3}
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
                  <span>{copy.bioLong}</span>
                  <textarea
                    onChange={(e) => setForm((prev) => ({ ...prev, bioLong: e.target.value }))}
                    placeholder="اكتب السيرة العلمية بالتفصيل (المشايخ، طلب العلم، التآليف والجهود العلمية)..."
                    value={form.bioLong ?? ''}
                    rows={8}
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

            {/* 3. Stats & Media Tab */}
            {activeTab === 'stats' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="form-grid-two">
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.coursesCount}</span>
                    <input
                      type="number"
                      min="0"
                      onChange={(e) => setForm((prev) => ({ ...prev, courses: e.target.value }))}
                      value={form.courses ?? '0'}
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
                    <span>{copy.lessonsCount}</span>
                    <input
                      type="number"
                      min="0"
                      onChange={(e) => setForm((prev) => ({ ...prev, lessons: e.target.value }))}
                      value={form.lessons ?? '0'}
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

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                  <span style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
                    {copy.imageLabel}
                  </span>
                  <div
                    style={{
                      border: '2px dashed #cbd5e1',
                      borderRadius: '12px',
                      padding: '32px',
                      textAlign: 'center',
                      background: '#f8fafc',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                      justifyContent: 'center',
                    }}
                  >
                    {form.image ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <img
                          src={form.image}
                          alt="Scholar Preview"
                          style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '4px solid #fff',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1), 0 0 0 2px var(--color-gold, #c5a880)',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setForm((prev) => ({ ...prev, image: '' }))
                            setImageWarning(null)
                          }}
                          className="cancel-btn"
                          style={{
                            fontSize: '13px',
                            padding: '8px 16px',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '6px',
                            background: '#fff',
                            cursor: 'pointer',
                          }}
                        >
                          {copy.removeImageBtn}
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '16px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b' }}>
                          <Upload size={32} />
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                          id="scholar-avatar-upload-page-input"
                        />
                        <label
                          htmlFor="scholar-avatar-upload-page-input"
                          style={{
                            display: 'inline-flex',
                            background: 'var(--color-gold, #c5a880)',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '14px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                          }}
                        >
                          {copy.uploadBtn}
                        </label>
                        <span style={{ fontSize: '12px', color: '#64748b', maxWidth: '300px', lineHeight: 1.5 }}>
                          {copy.imageGuidelines}
                        </span>
                      </div>
                    )}
                  </div>

                  {imageWarning && (
                    <div
                      style={{
                        color: '#b45309',
                        background: '#fffbeb',
                        border: '1px solid #fde68a',
                        borderRadius: '6px',
                        padding: '12px',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '12px',
                      }}
                    >
                      <AlertTriangle size={16} />
                      <span>{imageWarning}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. SEO Tab */}
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

        {/* Right Side: Scholar Live Public Card Preview */}
        <aside style={{ position: 'sticky', top: '24px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0d263d', margin: '0 0 4px 0' }}>{copy.previewTitle}</h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px 0' }}>{copy.previewSubtitle}</p>

            {/* Public Card Mockup */}
            <div
              style={{
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                position: 'relative',
                background: 'linear-gradient(to bottom, #ffffff, #fafaf9)',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.04)',
              }}
            >
              {/* Avatar Preview */}
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Scholar Avatar"
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #fff',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      background: '#fff',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      background: '#f1f5f9',
                      color: 'var(--color-primary-600, #0d263d)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      fontWeight: 800,
                      border: '3px solid #fff',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                    }}
                  >
                    {form.name ? form.name.charAt(0) : 'ش'}
                  </div>
                )}
              </div>

              {/* Scholar Name (Incorporating Title & Kunya) */}
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0d263d', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                {displayName}
              </h4>

              {/* Scholar Role/Title */}
              <span
                style={{
                  fontSize: '13px',
                  color: '#64748b',
                  display: 'block',
                  marginBottom: '12px',
                  minHeight: '18px',
                }}
              >
                {form.title || copy.placeholderTitle}
              </span>

              {/* Specialty & Madhab Tag Container */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'var(--color-gold-50, #fcfaf7)',
                    border: '1px solid rgba(197, 168, 128, 0.2)',
                    color: 'var(--color-gold-800, #8c6d3f)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {categoryName}
                </span>

                {form.madhab && (
                  <span
                    style={{
                      display: 'inline-block',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      color: '#475569',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {form.madhab}
                  </span>
                )}
              </div>

              {/* Country */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                <Globe size={13} style={{ color: 'var(--color-gold, #c5a880)' }} />
                <span>{form.country || copy.placeholderCountry}</span>
              </div>

              {/* Counts Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '16px',
                  gap: '12px',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '18px', fontWeight: 800, color: '#0d263d' }}>
                    {form.courses || '0'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{copy.courses}</span>
                </div>
                <div style={{ textAlign: 'center', borderRight: dir === 'rtl' ? 'none' : '1px solid #e2e8f0', borderLeft: dir === 'rtl' ? '1px solid #e2e8f0' : 'none' }}>
                  <span style={{ display: 'block', fontSize: '18px', fontWeight: 800, color: '#0d263d' }}>
                    {form.lessons || '0'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{copy.lessons}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
