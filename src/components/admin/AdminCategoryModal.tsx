import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'
import { useLanguage, type Language } from '../../context/LanguageContext'

type AdminCategoryModalProps = {
  isAddMode: boolean
  row: Record<string, string>
  onChange: (row: Record<string, string>) => void
  onClose: () => void
  onSave: () => void
  categoriesList?: Record<string, string>[]
}

const modalCopy: Record<Language, Record<string, string>> = {
  ar: {
    addTitle: 'إضافة تصنيف جديد',
    editTitle: 'تعديل التصنيف',
    name: 'اسم القسم العلمي',
    slug: 'الرابط الخاص (Slug)',
    description: 'الوصف التعريفي',
    status: 'الحالة',
    save: 'حفظ التغييرات',
    cancel: 'إلغاء',
    statusPublished: 'منشور',
    statusReview: 'مراجعة',
    statusDraft: 'مسودة',
    placeholderName: 'مثال: الفقه وأصوله',
    placeholderSlug: 'مثال: fiqh',
    placeholderDescription: 'اكتب وصفاً مختصراً يظهر للطلاب في بطاقة التصنيف...',
    customImage: 'رفع أيقونة مخصصة (صورة)',
    uploadBtn: 'اختر ملف الصورة للرفع',
    removeImageBtn: 'إزالة الصورة المخصصة',
    imageGuidelines: 'القياس الموصى به: نسبة 1:1 مربعة (مثل 128×128 أو 256×256 بكسل). الصيغ المدعومة: SVG, PNG, JPG. الحد الأقصى للحجم: 100 كيلوبايت لتفادي ملء الذاكرة.',
    imageGuidelinesShort: '1:1 مربع، بحد أقصى 100 كيلوبايت، SVG/PNG/JPG',
    imageTooLarge: 'تنبيه: حجم الصورة كبير جداً (أكثر من 100 كيلوبايت). قد يؤدي ذلك لبطء الصفحة أو مشاكل في الحفظ بالمتصفح.',
    parentCategory: 'ينتمي إلى القسم الرئيسي',
    rootCategoryOption: '— قسم رئيسي مستقل (بدون أب) —',
  },
  en: {
    addTitle: 'Add New Category',
    editTitle: 'Edit Category',
    name: 'Category Name',
    slug: 'Custom URL (Slug)',
    description: 'Description',
    status: 'Status',
    save: 'Save Changes',
    cancel: 'Cancel',
    statusPublished: 'Published',
    statusReview: 'Review',
    statusDraft: 'Draft',
    placeholderName: 'e.g., Fiqh & Usul',
    placeholderSlug: 'e.g., fiqh',
    placeholderDescription: 'Write a brief description that students will see on the card...',
    customImage: 'Upload Custom Icon (Image)',
    uploadBtn: 'Choose Image File',
    removeImageBtn: 'Remove Custom Image & Revert',
    imageGuidelines: 'Recommended: 1:1 square ratio (e.g. 128x128 or 256x256px). Supported formats: SVG, PNG, JPG. Max size: 100KB to prevent storage issues.',
    imageGuidelinesShort: '1:1 square, max 100KB, SVG/PNG/JPG',
    imageTooLarge: 'Warning: Image size is too large (over 100KB). This might slow down storage or page speed.',
    parentCategory: 'Belongs to Parent Category',
    rootCategoryOption: '— Independent Category (No Parent) —',
  },
  uz: {
    addTitle: 'Yangi kategoriya qo‘shish',
    editTitle: 'Kategoriyani tahrirlash',
    name: 'Kategoriya nomi',
    slug: 'Havola (Slug)',
    description: 'Tavsif',
    status: 'Holat',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    statusPublished: 'Faol',
    statusReview: 'Ko‘rib chiqilmoqda',
    statusDraft: 'Loyiha',
    placeholderName: 'Masalan: Fiqh',
    placeholderSlug: 'Masalan: fiqh',
    placeholderDescription: 'Tavsif yozing...',
    customImage: 'Maxsus rasm yuklash',
    uploadBtn: 'Rasm faylini tanlash',
    removeImageBtn: 'Rasmni o‘chirish',
    imageGuidelines: 'Tavsiya etilgan o‘lcham: 1:1 kvadrat (masalan 128×128px). SVG, PNG, JPG. Maksimal hajm: 100KB.',
    imageGuidelinesShort: '1:1 kvadrat, max 100KB, SVG/PNG/JPG',
    imageTooLarge: 'Ogohlantirish: Rasm hajmi juda katta (100KB dan ko‘p).',
    parentCategory: 'Asosiy kategoriya',
    rootCategoryOption: '— Mustaqil kategoriya (Asosiysi yo‘q) —',
  },
  uzCyr: {
    addTitle: 'Янги категория қўшиш',
    editTitle: 'Категорияни таҳрирлаш',
    name: 'Категория номи',
    slug: 'Ҳавола (Slug)',
    description: 'Тавсиф',
    status: 'Ҳолат',
    save: 'Сақлаш',
    cancel: 'Бекор қилиш',
    statusPublished: 'Фаол',
    statusReview: 'Кўриб чиқилмоқда',
    statusDraft: 'Лойиҳа',
    placeholderName: 'Масалан: Фиқҳ',
    placeholderSlug: 'Масалан: fiqh',
    placeholderDescription: 'Тавсиф ёзинг...',
    customImage: 'Махсус расм юклаш',
    uploadBtn: 'Расм файлини танлаш',
    removeImageBtn: 'Расмни ўчириш',
    imageGuidelines: 'Тавсия этилган ўлчам: 1:1 квадрат (масалан 128×128px). SVG, PNG, JPG. Максимал ҳажм: 100KB.',
    imageGuidelinesShort: '1:1 квадрат, макс 100КБ, SVG/PNG/JPG',
    imageTooLarge: 'Огоҳлантириш: Расм ҳажми жуда катта (100КБ дан кўп).',
    parentCategory: 'Асосий категория',
    rootCategoryOption: '— Мустақил категория (Асосийси йўқ) —',
  },
  ru: {
    addTitle: 'Добавить новую категорию',
    editTitle: 'Редактировать категорию',
    name: 'Название категории',
    slug: 'Ссылка (Slug)',
    description: 'Описание',
    status: 'Статус',
    save: 'Сохранить изменения',
    cancel: 'Отмена',
    statusPublished: 'Опубликовано',
    statusReview: 'На проверке',
    statusDraft: 'Черновик',
    placeholderName: 'Например: Фикх',
    placeholderSlug: 'Например: fiqh',
    placeholderDescription: 'Введите краткое описание категории...',
    customImage: 'Загрузить иконку (Изображение)',
    uploadBtn: 'Выбрать файл изображения',
    removeImageBtn: 'Удалить изображение',
    imageGuidelines: 'Рекомендуемый размер: квадрат 1:1 (например 128×128px). Форматы: SVG, PNG, JPG. Макс. размер: 100 КБ.',
    imageGuidelinesShort: '1:1 квадрат, макс. 100КБ, SVG/PNG/JPG',
    imageTooLarge: 'Предупреждение: Размер изображения превышает 100 КБ.',
    parentCategory: 'Родительская категория',
    rootCategoryOption: '— Независимая категория (Без родительской) —',
  },
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function AdminCategoryModal({
  isAddMode,
  onChange,
  onClose,
  onSave,
  row,
  categoriesList = [],
}: AdminCategoryModalProps) {
  const { language, dir } = useLanguage()
  const copy = modalCopy[language] || modalCopy['ar']
  const [imageWarning, setImageWarning] = useState<string | null>(null)

  // Auto-generate slug when name changes in add mode
  function handleNameChange(name: string) {
    if (isAddMode) {
      onChange({
        ...row,
        name,
        slug: slugify(name),
      })
    } else {
      onChange({
        ...row,
        name,
      })
    }
  }

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const fileSizeKB = file.size / 1024
    if (fileSizeKB > 100) {
      setImageWarning(copy.imageTooLarge)
    } else {
      setImageWarning(null)
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      onChange({
        ...row,
        imageUrl: base64,
      })
    }
    reader.readAsDataURL(file)
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

  const selectedStatus = row.status || copy.statusPublished
  const selectedParent = row.parentId || ''

  // Filter categories list to prevent referencing itself as a parent category
  const parentOptions = categoriesList.filter((cat) => cat.slug !== row.slug)

  return (
    <div className="modal-backdrop" role="presentation" dir={dir}>
      <section
        className="admin-modal category-modal-layout"
        role="dialog"
        aria-modal="true"
        aria-label={isAddMode ? copy.addTitle : copy.editTitle}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <h2>{isAddMode ? copy.addTitle : copy.editTitle}</h2>
          <button onClick={onClose} type="button" className="close-modal-btn">
            ×
          </button>
        </header>

        <div className="modal-form category-modal-form">
          <div className="form-grid-two">
            <label>
              {copy.name} <span className="required-star">*</span>
              <input
                autoFocus
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder={copy.placeholderName}
                value={row.name ?? ''}
                required
              />
            </label>

            <label>
              {copy.slug} <span className="required-star">*</span>
              <input
                onChange={(e) => onChange({ ...row, slug: slugify(e.target.value) })}
                placeholder={copy.placeholderSlug}
                value={row.slug ?? ''}
                required
              />
            </label>
          </div>

          <label>
            {copy.description}
            <textarea
              onChange={(e) => onChange({ ...row, description: e.target.value })}
              placeholder={copy.placeholderDescription}
              value={row.description ?? ''}
              rows={3}
              className="form-textarea"
            />
          </label>

          <div className="form-grid-two">
            <label>
              {copy.status}
              <select
                onChange={(e) => onChange({ ...row, status: e.target.value })}
                value={selectedStatus}
                className="form-select"
              >
                <option value={copy.statusPublished}>{copy.statusPublished}</option>
                <option value={copy.statusReview}>{copy.statusReview}</option>
                <option value={copy.statusDraft}>{copy.statusDraft}</option>
              </select>
            </label>

            <label>
              {copy.parentCategory}
              <select
                onChange={(e) => onChange({ ...row, parentId: e.target.value })}
                value={selectedParent}
                className="form-select"
              >
                <option value="">{copy.rootCategoryOption}</option>
                {parentOptions.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* SEO fields */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontWeight: 700, color: '#0d263d', fontSize: '15px' }}>
              {language === 'ar' ? 'إعدادات SEO والأرشفة' : 'SEO Settings'}
            </span>
            
            <label>
              {language === 'ar' ? 'عنوان الصفحة (SEO Title)' : 'Page Title (SEO Title)'}
              <input
                onChange={(e) => onChange({ ...row, seoTitle: e.target.value })}
                placeholder={language === 'ar' ? 'عنوان الصفحة لمحركات البحث' : 'Page title for SEO'}
                value={row.seoTitle ?? ''}
              />
            </label>

            <label>
              {language === 'ar' ? 'وصف الصفحة (SEO Description)' : 'Page Description (SEO Description)'}
              <textarea
                onChange={(e) => onChange({ ...row, seoDescription: e.target.value })}
                placeholder={language === 'ar' ? 'وصف مختصر يظهر في محركات البحث...' : 'Brief meta description...'}
                value={row.seoDescription ?? ''}
                rows={2}
                className="form-textarea"
                style={{ resize: 'vertical' }}
              />
            </label>

            <label>
              {language === 'ar' ? 'الكلمات المفتاحية (SEO Keywords)' : 'Keywords (SEO Keywords)'}
              <input
                onChange={(e) => onChange({ ...row, seoKeywords: e.target.value })}
                placeholder={language === 'ar' ? 'كلمات، دلالية، أرشفة' : 'keywords, tags'}
                value={row.seoKeywords ?? ''}
              />
            </label>
          </div>

          {/* Custom image upload section */}
          <div className="icon-selector-section">
            <span className="icon-selector-title">{copy.customImage}</span>
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
              {row.imageUrl ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <img
                    src={row.imageUrl}
                    alt="preview"
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'contain',
                      background: '#fff',
                      padding: '4px',
                      borderRadius: '8px',
                      border: '1px solid rgba(13, 38, 61, 0.12)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      onChange({ ...row, imageUrl: '' })
                      setImageWarning(null)
                    }}
                    className="cancel-btn"
                    style={{
                      fontSize: '11px',
                      minHeight: '28px',
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
                    id="category-icon-upload-input"
                  />
                  <label
                    htmlFor="category-icon-upload-input"
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
            disabled={!row.name?.trim() || !row.slug?.trim()}
          >
            {copy.save}
          </button>
        </footer>
      </section>
    </div>
  )
}
