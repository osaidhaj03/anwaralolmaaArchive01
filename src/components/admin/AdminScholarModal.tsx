import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import { useLanguage, type Language } from '../../context/LanguageContext'
import type { SharedCategory } from '../../data/shared/archive'

type AdminScholarModalProps = {
  isAddMode: boolean
  row: Record<string, string>
  onChange: (row: Record<string, string>) => void
  onClose: () => void
  onSave: () => void
  categoriesList: SharedCategory[]
}

const modalCopy: Record<Language, Record<string, string>> = {
  ar: {
    addTitle: 'إضافة عالم جديد',
    editTitle: 'تعديل بيانات العالم',
    nameAr: 'الاسم (بالعربية)',
    nameEn: 'الاسم (بالإنجليزية)',
    title: 'اللقب/الوظيفة (مثال: عضو هيئة كبار العلماء)',
    specialty: 'التخصص العلمي الرئيسي',
    country: 'البلد',
    birthYear: 'سنة الميلاد (هجري / ميلادي)',
    deathYear: 'سنة الوفاة (اختياري - هجري / ميلادي)',
    bioShort: 'السيرة المختصرة (تظهر في البطاقة العامة)',
    bioLong: 'السيرة المفصلة (تظهر في صفحة التفاصيل حول العالم)',
    coursesCount: 'عدد الدورات',
    lessonsCount: 'عدد الدروس',
    imageLabel: 'صورة العالم (الرمزية)',
    uploadBtn: 'اختر ملف الصورة للرفع',
    removeImageBtn: 'إزالة الصورة',
    imageGuidelines: 'القياس الموصى به: نسبة 1:1 مربعة (مثل 256×256 بكسل). الصيغ المدعومة: PNG, JPG, WEBP. الحد الأقصى للحجم: 200 كيلوبايت لتفادي ملء الذاكرة.',
    imageTooLarge: 'تنبيه: حجم الصورة كبير جداً (أكثر من 200 كيلوبايت). قد يؤدي ذلك لبطء الصفحة أو مشاكل في الحفظ بالمتصفح.',
    save: 'حفظ التغييرات',
    cancel: 'إلغاء',
    selectCategory: '— اختر التخصص الرئيسي —',
    requiredField: 'هذا الحقل مطلوب',
  },
  en: {
    addTitle: 'Add New Scholar',
    editTitle: 'Edit Scholar Details',
    nameAr: 'Name (Arabic)',
    nameEn: 'Name (English)',
    title: 'Title / Job (e.g. Senior Scholar)',
    specialty: 'Primary Scientific Specialty',
    country: 'Country',
    birthYear: 'Birth Year (Hijri / Gregorian)',
    deathYear: 'Death Year (Optional - Hijri / Gregorian)',
    bioShort: 'Short Biography (Shown on card)',
    bioLong: 'Detailed Biography (Shown on Scholar About page)',
    coursesCount: 'Courses Count',
    lessonsCount: 'Lessons Count',
    imageLabel: 'Scholar Image (Avatar)',
    uploadBtn: 'Choose Image File',
    removeImageBtn: 'Remove Image',
    imageGuidelines: 'Recommended: 1:1 square ratio (e.g. 256x256px). Formats: PNG, JPG, WEBP. Max size: 200KB to avoid memory issues.',
    imageTooLarge: 'Warning: Image size is too large (over 200KB). This might slow down storage or page speed.',
    save: 'Save Changes',
    cancel: 'Cancel',
    selectCategory: '— Select Primary Specialty —',
    requiredField: 'Required field',
  },
  uz: {
    addTitle: 'Yangi olim qo‘shish',
    editTitle: 'Olim ma’lumotlarini tahrirlash',
    nameAr: 'Ism (Arabcha)',
    nameEn: 'Ism (Inglizcha)',
    title: 'Unvon / Lavozim',
    specialty: 'Asosiy ilmiy yo‘nalish',
    country: 'Mamlakat',
    birthYear: 'Tug‘ilgan yili (Hijriy / Milodiy)',
    deathYear: 'Vafot etgan yili (ixtiyoriy)',
    bioShort: 'Qisqa tarjimai hol (Karta uchun)',
    bioLong: 'Batafsil tarjimai hol (Batafsil sahifa uchun)',
    coursesCount: 'Kurslar soni',
    lessonsCount: 'Darslar soni',
    imageLabel: 'Olim surati (Avatar)',
    uploadBtn: 'Rasm yuklash',
    removeImageBtn: 'Rasmni o‘chirish',
    imageGuidelines: 'Tavsiya etilgan o‘lcham: 1:1 kvadrat (masalan 256×256px). PNG, JPG, WEBP. Maksimal hajm: 200KB.',
    imageTooLarge: 'Ogohlantirish: Rasm hajmi juda katta (200KB dan ko‘p).',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    selectCategory: '— Asosiy yo‘nalishni tanlang —',
    requiredField: 'Majburiy maydon',
  },
  uzCyr: {
    addTitle: 'Янги олим қўшиш',
    editTitle: 'Олим маълумотларини таҳрирлаш',
    nameAr: 'Исм (Арабча)',
    nameEn: 'Исм (Инглизча)',
    title: 'Унвон / Лавозим',
    specialty: 'Асосий илмий йўналиш',
    country: 'Мамлакат',
    birthYear: 'Туғилган йили (Ҳижрий / Милодий)',
    deathYear: 'Вафот этган йили (ихтиёрий)',
    bioShort: 'Қисқа таржимаи ҳол (Карта учун)',
    bioLong: 'Батафсил таржимаи ҳол (Батафсил саҳифа учун)',
    coursesCount: 'Курслар сони',
    lessonsCount: 'Дарслар сони',
    imageLabel: 'Олим сурати (Аватар)',
    uploadBtn: 'Расм юклаш',
    removeImageBtn: 'Расмни ўчириш',
    imageGuidelines: 'Тавсия этилган ўлчам: 1:1 квадрат (масалан 256×256px). PNG, JPG, WEBP. Максимал ҳажм: 200KB.',
    imageTooLarge: 'Огоҳлантириш: Расм ҳажми жуда катта (200КБ дан кўп).',
    save: 'Сақлаш',
    cancel: 'Бекор қилиш',
    selectCategory: '— Асосий йўналишни танланг —',
    requiredField: 'Мажбурий майдон',
  },
  ru: {
    addTitle: 'Добавить ученого',
    editTitle: 'Редактировать данные ученого',
    nameAr: 'Имя (на арабском)',
    nameEn: 'Имя (на английском)',
    title: 'Титул / Должность (например: Член совета ученых)',
    specialty: 'Основная специализация',
    country: 'Страна',
    birthYear: 'Год рождения (Хиджра / Григ.)',
    deathYear: 'Год смерти (Опционально - Хиджра / Григ.)',
    bioShort: 'Краткая биография (для карточки)',
    bioLong: 'Подробная биография (для страницы "О себе")',
    coursesCount: 'Количество курсов',
    lessonsCount: 'Количество уроков',
    imageLabel: 'Фото ученого (Аватар)',
    uploadBtn: 'Выбрать изображение',
    removeImageBtn: 'Удалить изображение',
    imageGuidelines: 'Рекомендуется: квадратное соотношение сторон 1:1 (например, 256x256px). Форматы: PNG, JPG, WEBP. Максимальный размер: 200 КБ.',
    imageTooLarge: 'Предупреждение: Размер изображения слишком велик (более 200 КБ).',
    save: 'Сохранить изменения',
    cancel: 'Отмена',
    selectCategory: '— Выберите специализацию —',
    requiredField: 'Обязательное поле',
  },
}

export function AdminScholarModal({
  isAddMode,
  row,
  onChange,
  onClose,
  onSave,
  categoriesList,
}: AdminScholarModalProps) {
  const { language, dir } = useLanguage()
  const copy = modalCopy[language] || modalCopy['ar']
  const [imageWarning, setImageWarning] = useState<string | null>(null)

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
      onChange({
        ...row,
        image: base64,
      })
    }
    reader.readAsDataURL(file)
  }

  function handleCategoryChange(catId: string) {
    const matchedCat = categoriesList.find((c) => c.id === catId)
    const specialtyText = matchedCat ? matchedCat.title[language] || matchedCat.title['ar'] : ''
    onChange({
      ...row,
      categoryId: catId,
      specialty: specialtyText,
    })
  }

  // Handle closing modal on Escape key press
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const isValid = (row.name?.trim() || '').length > 0

  return (
    <div className="modal-backdrop" role="presentation" dir={dir}>
      <section
        className="admin-modal scholar-modal-layout"
        role="dialog"
        aria-modal="true"
        aria-label={isAddMode ? copy.addTitle : copy.editTitle}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1100px', width: '95%', maxHeight: '90vh' }}
      >
        <header>
          <h2>{isAddMode ? copy.addTitle : copy.editTitle}</h2>
          <button onClick={onClose} type="button" className="close-modal-btn">
            ×
          </button>
        </header>

        <div className="modal-form scholar-modal-form" style={{ maxHeight: 'calc(90vh - 140px)', overflowY: 'auto', padding: '24px' }}>
          {/* Names Grid */}
          <div className="form-grid-two">
            <label>
              {copy.nameAr} <span className="required-star">*</span>
              <input
                autoFocus
                onChange={(e) => onChange({ ...row, name: e.target.value })}
                placeholder="مثال: الشيخ عبدالعزيز بن باز"
                value={row.name ?? ''}
                required
              />
            </label>

            <label>
              {copy.nameEn}
              <input
                onChange={(e) => onChange({ ...row, english: e.target.value })}
                placeholder="e.g., Shaykh Abdulaziz Ibn Baz"
                value={row.english ?? ''}
              />
            </label>
          </div>

          {/* Title & Category Grid */}
          <div className="form-grid-two" style={{ marginTop: '12px' }}>
            <label>
              {copy.title}
              <input
                onChange={(e) => onChange({ ...row, title: e.target.value })}
                placeholder="مثال: مفتي عام سابق"
                value={row.title ?? ''}
              />
            </label>

            <label>
              {copy.specialty}
              <select
                onChange={(e) => handleCategoryChange(e.target.value)}
                value={row.categoryId ?? ''}
                className="form-select"
              >
                <option value="">{copy.selectCategory}</option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title[language] || cat.title['ar']}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Country, Birth, Death Years */}
          <div className="form-grid-three" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '12px' }}>
            <label>
              {copy.country}
              <input
                onChange={(e) => onChange({ ...row, country: e.target.value })}
                placeholder="مثال: السعودية"
                value={row.country ?? ''}
              />
            </label>

            <label>
              {copy.birthYear}
              <input
                onChange={(e) => onChange({ ...row, birthYear: e.target.value })}
                placeholder="مثال: 1330 هـ / 1912 م"
                value={row.birthYear ?? ''}
              />
            </label>

            <label>
              {copy.deathYear}
              <input
                onChange={(e) => onChange({ ...row, deathYear: e.target.value })}
                placeholder="مثال: 1420 هـ / 1999 م"
                value={row.deathYear ?? ''}
              />
            </label>
          </div>

          {/* Courses & Lessons numbers */}
          <div className="form-grid-two" style={{ marginTop: '12px' }}>
            <label>
              {copy.coursesCount}
              <input
                type="number"
                min="0"
                onChange={(e) => onChange({ ...row, courses: e.target.value })}
                value={row.courses ?? '0'}
              />
            </label>

            <label>
              {copy.lessonsCount}
              <input
                type="number"
                min="0"
                onChange={(e) => onChange({ ...row, lessons: e.target.value })}
                value={row.lessons ?? '0'}
              />
            </label>
          </div>

          {/* Short Bio */}
          <label style={{ display: 'block', marginTop: '12px' }}>
            {copy.bioShort}
            <textarea
              onChange={(e) => onChange({ ...row, bioShort: e.target.value })}
              placeholder="اكتب خلاصة سريعة لسيرة العالم تظهر في بطاقة التعريف..."
              value={row.bioShort ?? ''}
              rows={3}
              className="form-textarea"
              style={{ width: '100%' }}
            />
          </label>

          {/* Long Bio */}
          <label style={{ display: 'block', marginTop: '12px' }}>
            {copy.bioLong}
            <textarea
              onChange={(e) => onChange({ ...row, bioLong: e.target.value })}
              placeholder="اكتب السيرة المفصلة للعالم ومسيرته العلمية وطلبه للعلم ومشايخه..."
              value={row.bioLong ?? ''}
              rows={6}
              className="form-textarea"
              style={{ width: '100%' }}
            />
          </label>

          {/* Image upload section */}
          <div className="icon-selector-section" style={{ marginTop: '16px' }}>
            <span className="icon-selector-title" style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>{copy.imageLabel}</span>
            <div
              className="custom-image-upload-wrap"
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                background: 'var(--color-bg-100, #f8fafc)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid rgba(13, 38, 61, 0.08)',
              }}
            >
              {row.image ? (
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img
                    src={row.image}
                    alt="Scholar Preview"
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      background: '#fff',
                      border: '2px solid var(--color-gold, #c5a880)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      onChange({ ...row, image: '' })
                      setImageWarning(null)
                    }}
                    className="cancel-btn"
                    style={{
                      fontSize: '12px',
                      minHeight: '32px',
                      color: '#ef4444',
                      borderColor: 'rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    {copy.removeImageBtn}
                  </button>
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="scholar-avatar-upload-input"
                  />
                  <label
                    htmlFor="scholar-avatar-upload-input"
                    className="gold-button"
                    style={{
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      minHeight: '38px',
                      padding: '0 16px',
                      margin: 0,
                      alignSelf: 'flex-start',
                    }}
                  >
                    {copy.uploadBtn}
                  </label>
                  <span style={{ fontSize: '11px', color: '#6b7280', lineHeight: '1.4' }}>
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
                  padding: '8px 12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '8px',
                }}
              >
                <Icons.AlertTriangle size={14} />
                <span>{imageWarning}</span>
              </div>
            )}
          </div>
        </div>

        <footer>
          <button onClick={onClose} type="button" className="cancel-btn">
            {copy.cancel}
          </button>
          <button
            className="gold-button save-btn"
            onClick={onSave}
            type="button"
            disabled={!isValid}
          >
            {copy.save}
          </button>
        </footer>
      </section>
    </div>
  )
}
