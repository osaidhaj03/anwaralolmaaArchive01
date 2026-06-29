import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Save, X, Check, Upload, Clock, GraduationCap } from 'lucide-react'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { useArchiveData } from '../../context/ArchiveDataContext'

const copyTranslations: Partial<Record<Language, Record<string, string>>> = {
  ar: {
    addTitle: 'إضافة دورة جديدة',
    editTitle: 'تعديل بيانات الدورة',
    courseTitle: 'عنوان الدورة التعليمية',
    teacher: 'المدرس / المحاضر',
    category: 'القسم العلمي التابع له',
    level: 'المستوى الدراسي',
    statusLabel: 'حالة النشر',
    save: 'حفظ البيانات',
    cancel: 'إلغاء وتراجع',
    selectCategory: '— اختر القسم —',
    selectTeacher: '— اختر المدرس —',
    requiredField: 'هذا الحقل مطلوب',
    basicTab: 'المعلومات الأساسية',
    descTab: 'الوصف والتعريف',
    seoTab: 'إعدادات SEO والأرشفة',
    previewTitle: 'معاينة بطاقة الدورة',
    previewSubtitle: 'هكذا ستظهر الدورة في المنصة التعليمية للمستخدمين',
    placeholderTitle: 'عنوان الدورة يظهر هنا',
    placeholderTeacher: 'اسم الشيخ / المحاضر',
    successAdd: 'تم إضافة الدورة بنجاح',
    successEdit: 'تم تحديث بيانات الدورة بنجاح',
    thumbnail: 'الصورة المصغرة للدورة (غلاف الدورة)',
    descriptionShortLabel: 'الوصف المختصر للدورة',
    descriptionLongLabel: 'الوصف التفصيلي (الطويل) للدورة',
    seoTitleLabel: 'عنوان الصفحة (SEO Title)',
    seoDescLabel: 'وصف الصفحة (SEO Description)',
    seoKeywordsLabel: 'الكلمات المفتاحية (SEO Keywords)',
    seoTitlePlaceholder: 'اكتب عنوان الصفحة المخصص لمحركات البحث',
    seoDescPlaceholder: 'اكتب وصفاً مختصراً جداً ليظهر في نتائج البحث',
    seoKeywordsPlaceholder: 'كلمة، كلمة أخرى، مذهب، علم شرعي',
  },
  en: {
    addTitle: 'Add New Course',
    editTitle: 'Edit Course Details',
    courseTitle: 'Course Title',
    teacher: 'Teacher / Lecturer',
    category: 'Scientific Category',
    level: 'Study Level',
    statusLabel: 'Publication Status',
    save: 'Save Details',
    cancel: 'Cancel',
    selectCategory: '— Select Category —',
    selectTeacher: '— Select Teacher —',
    requiredField: 'Required field',
    basicTab: 'Basic Info',
    descTab: 'Descriptions',
    seoTab: 'SEO Settings',
    previewTitle: 'Course Card Preview',
    previewSubtitle: 'How the course card will appear on the platform',
    placeholderTitle: 'Course title here',
    placeholderTeacher: 'Lecturer name',
    successAdd: 'Course added successfully',
    successEdit: 'Course updated successfully',
    thumbnail: 'Course Thumbnail Image',
    descriptionShortLabel: 'Short Description',
    descriptionLongLabel: 'Long Description',
    seoTitleLabel: 'Page Title (SEO Title)',
    seoDescLabel: 'Page Description (SEO Description)',
    seoKeywordsLabel: 'Keywords (SEO Keywords)',
    seoTitlePlaceholder: 'Enter custom page title for search engines',
    seoDescPlaceholder: 'Enter meta description to show in search results',
    seoKeywordsPlaceholder: 'keyword1, keyword2, keyword3',
  },
}

type AdminCourseFormPageProps = {
  isAddMode: boolean
}

export function AdminCourseFormPage({ isAddMode }: AdminCourseFormPageProps) {
  const { language, dir } = useLanguage()
  const { courses, scholars, categories, saveCourseRow } = useArchiveData()
  const navigate = useNavigate()
  const { courseId } = useParams<{ courseId: string }>()

  const copy = (copyTranslations[language] || copyTranslations['ar'] || {}) as Record<string, string>

  const [activeTab, setActiveTab] = useState<'basic' | 'description' | 'seo'>('basic')
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  const [showAddLevelModal, setShowAddLevelModal] = useState(false)
  const [newLevelInput, setNewLevelInput] = useState('')
  const [levels, setLevels] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('study_levels')
      return stored ? JSON.parse(stored) : ['مبتدئ', 'متوسط', 'متقدم', 'عام / للجميع', 'بكالوريوس', 'دبلوم', 'دبلوم متوسط', 'ماجستير', 'دكتوراه']
    } catch {
      return ['مبتدئ', 'متوسط', 'متقدم', 'عام / للجميع', 'بكالوريوس', 'دبلوم', 'دبلوم متوسط', 'ماجستير', 'دكتوراه']
    }
  })

  const saveLevels = (newLevels: string[]) => {
    setLevels(newLevels)
    try {
      localStorage.setItem('study_levels', JSON.stringify(newLevels))
    } catch (e) {}
  }

  // Find existing course if editing
  // The course index in courses matches ID or index
  const matchedIndex = courseId ? courses.findIndex(c => c.id === courseId || String(courses.indexOf(c) + 1) === courseId) : -1
  const existingCourse = matchedIndex !== -1 ? courses[matchedIndex] : null

  // Local state for the fields
  const [form, setForm] = useState<Record<string, string>>({
    title: '',
    teacher: '',
    category: '',
    categoryId: '',
    level: 'متوسط',
    lessons: '12',
    hours: '4',
    tone: 'green',
    status: 'منشور',
    thumbnail: '',
    descriptionShort: '',
    descriptionLong: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  })

  // Load existing details
  useEffect(() => {
    if (!isAddMode && existingCourse) {
      const matchedCat = categories.find(c => c.title.ar === existingCourse.category.ar || c.title.en === existingCourse.category.en)
      setForm({
        title: existingCourse.title.ar || '',
        teacher: existingCourse.teacher.ar || '',
        category: existingCourse.category.ar || '',
        categoryId: matchedCat?.id || '',
        level: existingCourse.level.ar || 'متوسط',
        lessons: String(existingCourse.lessons || '0'),
        hours: String(existingCourse.hours || '0'),
        tone: existingCourse.tone || 'green',
        status: existingCourse.status.ar || 'منشور',
        thumbnail: existingCourse.thumbnail || '',
        descriptionShort: existingCourse.descriptionShort?.ar || '',
        descriptionLong: existingCourse.descriptionLong?.ar || '',
        seoTitle: existingCourse.seoTitle || '',
        seoDescription: existingCourse.seoDescription || '',
        seoKeywords: existingCourse.seoKeywords || '',
      })
      // Ensure level is added to list if not present
      const currentLvl = existingCourse.level.ar
      if (currentLvl && !levels.includes(currentLvl)) {
        saveLevels([...levels, currentLvl])
      }
    }
  }, [isAddMode, existingCourse, categories])

  function handleCategoryChange(catId: string) {
    const matchedCat = categories.find((c) => c.id === catId)
    const categoryText = matchedCat ? matchedCat.title[language] || matchedCat.title['ar'] : ''
    setForm((prev) => ({
      ...prev,
      categoryId: catId,
      category: categoryText,
    }))
  }

  function handleThumbnailUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setForm((prev) => ({ ...prev, thumbnail: base64 }))
    }
    reader.readAsDataURL(file)
  }

  function handleSave() {
    if (!form.title?.trim() || !form.teacher?.trim()) return

    const saveIndex = isAddMode ? null : matchedIndex
    saveCourseRow(form, saveIndex)

    setSuccessMessage(isAddMode ? copy.successAdd : copy.successEdit)
    setTimeout(() => {
      navigate('/admin/courses')
    }, 1500)
  }

  const isValid = (form.title?.trim() || '').length > 0 && (form.author?.trim() || '').length > 0 || true // allow edit save if loaded
  const teacherName = form.teacher || copy.placeholderTeacher
  const courseTitleDisplay = form.title || copy.placeholderTitle

  return (
    <div className="admin-page" dir={dir} style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Top Banner */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
            <span>لوحة التحكم</span>
            {dir === 'rtl' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/admin/courses')}>الدورات التعليمية</span>
            {dir === 'rtl' ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            <span style={{ color: '#0d263d', fontWeight: 600 }}>{isAddMode ? copy.addTitle : copy.editTitle}</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0d263d', margin: 0 }}>
            {isAddMode ? copy.addTitle : copy.editTitle}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/admin/courses')}
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

      {/* Form Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        
        {/* Main Form Fields Panel */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {/* Tabs header */}
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px', paddingBottom: '12px' }}>
            <button
              onClick={() => setActiveTab('basic')}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: 600,
                color: activeTab === 'basic' ? 'var(--color-gold, #c5a880)' : '#64748b',
                borderBottom: activeTab === 'basic' ? '2px solid var(--color-gold, #c5a880)' : 'none',
                padding: '4px 12px 10px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copy.basicTab}
            </button>
            <button
              onClick={() => setActiveTab('description')}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: 600,
                color: activeTab === 'description' ? 'var(--color-gold, #c5a880)' : '#64748b',
                borderBottom: activeTab === 'description' ? '2px solid var(--color-gold, #c5a880)' : 'none',
                padding: '4px 12px 10px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copy.descTab}
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: 600,
                color: activeTab === 'seo' ? 'var(--color-gold, #c5a880)' : '#64748b',
                borderBottom: activeTab === 'seo' ? '2px solid var(--color-gold, #c5a880)' : 'none',
                padding: '4px 12px 10px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copy.seoTab}
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 1. Basic Info Tab */}
            {activeTab === 'basic' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{copy.courseTitle} <span style={{ color: '#ef4444' }}>*</span></span>
                  <input
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder={copy.placeholderTitle}
                    value={form.title ?? ''}
                    required
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                  />
                </label>

                <div className="form-grid-two">
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.teacher} <span style={{ color: '#ef4444' }}>*</span></span>
                    <select
                      onChange={(e) => setForm((prev) => ({ ...prev, teacher: e.target.value }))}
                      value={form.teacher ?? ''}
                      required
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        background: '#fff',
                        outline: 'none',
                      }}
                    >
                      <option value="">{copy.selectTeacher}</option>
                      {scholars.map((scholar) => {
                        const nameText = scholar.name[language] || scholar.name['ar']
                        return (
                          <option key={scholar.id} value={scholar.name.ar}>
                            {nameText}
                          </option>
                        )
                      })}
                    </select>
                  </label>

                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.category} <span style={{ color: '#ef4444' }}>*</span></span>
                    <select
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      value={form.categoryId ?? ''}
                      required
                      style={{
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '15px',
                        background: '#fff',
                        outline: 'none',
                      }}
                    >
                      <option value="">{copy.selectCategory}</option>
                      {categories.map((cat) => {
                        const titleText = cat.title[language] || cat.title['ar']
                        return (
                          <option key={cat.id} value={cat.id}>
                            {titleText}
                          </option>
                        )
                      })}
                    </select>
                  </label>
                </div>

                <div className="form-grid-two">
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                    <span>{copy.level}</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <select
                        onChange={(e) => setForm((prev) => ({ ...prev, level: e.target.value }))}
                        value={form.level ?? 'متوسط'}
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '15px',
                          background: '#fff',
                          outline: 'none',
                        }}
                      >
                        {levels.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setShowAddLevelModal(true)}
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          background: '#f8fafc',
                          color: '#0d263d',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: 1 }}>+</span>
                      </button>
                    </div>
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
                      <option value="منشور">{language === 'ar' ? 'منشور' : 'Published'}</option>
                      <option value="مراجعة">{language === 'ar' ? 'تحت المراجعة' : 'In Review'}</option>
                      <option value="مسودة">{language === 'ar' ? 'مسودة' : 'Draft'}</option>
                    </select>
                  </label>
                </div>

                {/* صورة الغلاف */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                  <span style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
                    {copy.thumbnail}
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
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    <Upload size={32} style={{ color: '#94a3b8' }} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>
                      {form.thumbnail ? 'تعديل صورة الغلاف' : 'اسحب أو اختر ملف صورة الغلاف'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Description Tab */}
            {activeTab === 'description' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{copy.descriptionShortLabel}</span>
                  <textarea
                    onChange={(e) => setForm((prev) => ({ ...prev, descriptionShort: e.target.value }))}
                    placeholder="اكتب وصفاً موجزاً وملخصاً للدورة التعليمية..."
                    value={form.descriptionShort ?? ''}
                    rows={3}
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
                  <span>{copy.descriptionLongLabel}</span>
                  <textarea
                    onChange={(e) => setForm((prev) => ({ ...prev, descriptionLong: e.target.value }))}
                    placeholder="اكتب تفاصيل الدورة، محاورها، المخرجات التعليمية المتوقعة والمنهج المتبع بالتفصيل..."
                    value={form.descriptionLong ?? ''}
                    rows={8}
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
              </div>
            )}

            {/* 3. SEO Tab */}
            {activeTab === 'seo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontWeight: 600, color: '#334155' }}>
                  <span>{copy.seoTitleLabel}</span>
                  <input
                    onChange={(e) => setForm((prev) => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder={copy.seoTitlePlaceholder}
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
                  <span>{copy.seoDescLabel}</span>
                  <textarea
                    onChange={(e) => setForm((prev) => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder={copy.seoDescPlaceholder}
                    value={form.seoDescription ?? ''}
                    rows={3}
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
                  <span>{copy.seoKeywordsLabel}</span>
                  <input
                    onChange={(e) => setForm((prev) => ({ ...prev, seoKeywords: e.target.value }))}
                    placeholder={copy.seoKeywordsPlaceholder}
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
          </form>
        </div>

        {/* Live Card Preview Panel */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0d263d', margin: '0 0 4px 0' }}>
              {copy.previewTitle}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: 1.4 }}>
              {copy.previewSubtitle}
            </p>

            {/* Course Card Component Render Mock */}
            <div className="public-course-card" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div className={`public-course-cover tone-${form.tone}`} style={{ height: '180px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {form.thumbnail ? (
                  <img src={form.thumbnail} alt={form.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#fff' }}>
                    <GraduationCap size={44} />
                    <span style={{ fontSize: '12px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '999px' }}>{form.level}</span>
                  </div>
                )}
              </div>
              <div className="public-course-body" style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>{courseTitleDisplay}</h3>
                <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 12px 0' }}>{teacherName}</p>
                <div className="public-course-meta" style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} />
                    {form.hours} {language === 'ar' ? 'ساعة' : 'hours'}
                  </span>
                  <span>{form.lessons} {language === 'ar' ? 'درس' : 'lessons'}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* Dynamic level creation modal */}
      {showAddLevelModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '28px',
            width: '100%',
            maxWidth: '440px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            direction: dir,
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0d263d', marginBottom: '16px' }}>
              {language === 'ar' ? 'إضافة مستوى دراسي جديد' : 'Add New Study Level'}
            </h3>
            <input
              type="text"
              placeholder={language === 'ar' ? 'مثال: بكالوريوس، ماجستير، دبلوم متوسط...' : 'e.g. Bachelor, Master, Diploma...'}
              value={newLevelInput}
              onChange={(e) => setNewLevelInput(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '15px',
                marginBottom: '20px',
                outline: 'none'
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => {
                  setShowAddLevelModal(false)
                  setNewLevelInput('')
                }}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  background: '#f1f5f9',
                  border: 'none',
                  color: '#475569',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const trimmed = newLevelInput.trim()
                  if (trimmed) {
                    if (!levels.includes(trimmed)) {
                      saveLevels([...levels, trimmed])
                    }
                    setForm(prev => ({ ...prev, level: trimmed }))
                    setShowAddLevelModal(false)
                    setNewLevelInput('')
                  }
                }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  background: 'var(--color-gold, #c5a880)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {language === 'ar' ? 'إضافة واختيار' : 'Add & Select'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
