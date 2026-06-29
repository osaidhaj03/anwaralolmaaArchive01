import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Save, Play } from 'lucide-react'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { useArchiveData } from '../../context/ArchiveDataContext'

const copyTranslations: Record<Language, Record<string, string>> = {
  ar: {
    addTitle: 'إضافة محاضرة جديدة',
    editTitle: 'تعديل بيانات المحاضرة',
    lectureTitle: 'عنوان المحاضرة',
    teacher: 'المحاضر / الشيخ',
    category: 'القسم العلمي التابع له',
    statusLabel: 'حالة النشر',
    save: 'حفظ البيانات',
    cancel: 'إلغاء وتراجع',
    selectCategory: '— اختر القسم —',
    selectTeacher: '— اختر الشيخ —',
    requiredField: 'هذا الحقل مطلوب',
    basicTab: 'المعلومات الأساسية',
    descTab: 'الوصف والتعريف',
    previewTitle: 'معاينة بطاقة المحاضرة',
    previewSubtitle: 'هكذا ستظهر المحاضرة في المنصة للمستخدمين',
    placeholderTitle: 'عنوان المحاضرة يظهر هنا',
    placeholderTeacher: 'اسم الشيخ / المحاضر',
    successAdd: 'تم إضافة المحاضرة بنجاح',
    successEdit: 'تم تحديث بيانات المحاضرة بنجاح',
    thumbnail: 'الصورة المصغرة للمحاضرة',
    descriptionLabel: 'الوصف التعريفي بالمحاضرة',
  },
  en: {
    addTitle: 'Add New Lecture',
    editTitle: 'Edit Lecture Details',
    lectureTitle: 'Lecture Title',
    teacher: 'Lecturer / Scholar',
    category: 'Scientific Category',
    statusLabel: 'Publication Status',
    save: 'Save Details',
    cancel: 'Cancel',
    selectCategory: '— Select Category —',
    selectTeacher: '— Select Scholar —',
    requiredField: 'Required field',
    basicTab: 'Basic Info',
    descTab: 'Descriptions',
    previewTitle: 'Lecture Card Preview',
    previewSubtitle: 'How the lecture card will appear on the platform',
    placeholderTitle: 'Lecture title here',
    placeholderTeacher: 'Scholar name',
    successAdd: 'Lecture added successfully',
    successEdit: 'Lecture updated successfully',
    thumbnail: 'Lecture Thumbnail URL',
    descriptionLabel: 'Lecture Description',
  },
  uz: {
    addTitle: 'Yangi ma’ruza qo‘shish',
    editTitle: 'Ma’ruza ma’lumotlarini tahrirlash',
    lectureTitle: 'Ma’ruza sarlavhasi',
    teacher: 'Ma’ruzachi / Shayx',
    category: 'Kategoriya',
    statusLabel: 'Holat',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    selectCategory: '— Kategoriyani tanlang —',
    selectTeacher: '— Shayxni tanlang —',
    requiredField: 'Majburiy maydon',
    basicTab: 'Asosiy ma’lumotlar',
    descTab: 'Tavsif',
    previewTitle: 'Karta ko‘rinishi',
    previewSubtitle: 'Platformada ma’ruza kartasi qanday ko‘rinishi',
    placeholderTitle: 'Ma’ruza sarlavhasi',
    placeholderTeacher: 'Ma’ruzachi nomi',
    successAdd: 'Ma’ruza muvaffaqiyatli qo‘shildi',
    successEdit: 'Ma’ruza ma’lumotlari yangilandi',
    thumbnail: 'Muqova rasmi URL',
    descriptionLabel: 'Ma’ruza tavsifi',
  },
  uzCyr: {
    addTitle: 'Янги маъруза қўшиш',
    editTitle: 'Маъруза маълумотларини таҳрирлаш',
    lectureTitle: 'Маъруза сарлавҳаси',
    teacher: 'Маърузачи / Шайх',
    category: 'Категория',
    statusLabel: 'Ҳолат',
    save: 'Сақлаш',
    cancel: 'Бекор қилиш',
    selectCategory: '— Категорияни танланг —',
    selectTeacher: '— Шайхни танланг —',
    requiredField: 'Мажбурий майдон',
    basicTab: 'Асосий маълумотлар',
    descTab: 'Тавсиф',
    previewTitle: 'Карта кўриниши',
    previewSubtitle: 'Платформада маъруза картаси қандай кўриниши',
    placeholderTitle: 'Маъруза сарлавҳаси',
    placeholderTeacher: 'Маърузачи номи',
    successAdd: 'Маъруза муваффақиятли қўшилди',
    successEdit: 'Маъруза маълумотлари янгиланди',
    thumbnail: 'Муқова расми URL',
    descriptionLabel: 'Маъруза тавсифи',
  },
  ru: {
    addTitle: 'Добавить новую лекцию',
    editTitle: 'Редактировать данные лекции',
    lectureTitle: 'Название лекции',
    teacher: 'Лектор / Шейх',
    category: 'Категория',
    statusLabel: 'Статус публикации',
    save: 'Сохранить данные',
    cancel: 'Отмена',
    selectCategory: '— Выберите категорию —',
    selectTeacher: '— Выберите лектора —',
    requiredField: 'Это поле обязательно для заполнения',
    basicTab: 'Основная информация',
    descTab: 'Описание',
    previewTitle: 'Предпросмотр карточки лекции',
    previewSubtitle: 'Так лекция будет выглядеть на платформе',
    placeholderTitle: 'Название лекции появится здесь',
    placeholderTeacher: 'Имя шейха / лектора',
    successAdd: 'Лекция успешно добавлена',
    successEdit: 'Данные лекции успешно обновлены',
    thumbnail: 'Миниатюра лекции (обложка)',
    descriptionLabel: 'Описание лекции',
  }
}

export function AdminLectureFormPage({ isAddMode }: { isAddMode: boolean }) {
  const { lectureId } = useParams()
  const { language, dir } = useLanguage()
  const navigate = useNavigate()
  const { lectures, scholars, categories, saveLectureRow } = useArchiveData()
  const copy = copyTranslations[language] || copyTranslations.ar

  const [activeTab, setActiveTab] = useState<'basic' | 'desc'>('basic')
  const [successMsg, setSuccessMsg] = useState('')

  const originalIndex = isAddMode ? null : lectures.findIndex((item) => item.id === lectureId)
  const currentLecture = originalIndex !== null && originalIndex !== -1 ? lectures[originalIndex] : null

  // Fields state
  const [titleAr, setTitleAr] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [scholarId, setScholarId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tone, setTone] = useState('green')
  const [thumbnail, setThumbnail] = useState('/Video thumbnail/seedvideothumb.png')
  const [descAr, setDescAr] = useState('')
  const [descEn, setDescEn] = useState('')

  useEffect(() => {
    if (currentLecture) {
      setTitleAr(currentLecture.title.ar)
      setTitleEn(currentLecture.title.en)
      setScholarId(currentLecture.scholarId)
      setCategoryId(currentLecture.categoryId)
      setTone(currentLecture.tone || 'green')
      setThumbnail(currentLecture.thumbnail || '/Video thumbnail/seedvideothumb.png')
      setDescAr(currentLecture.description?.ar || '')
      setDescEn(currentLecture.description?.en || '')
    }
  }, [currentLecture])

  const BackIcon = language === 'ar' ? ArrowRight : ArrowLeft

  function handleSave(event: React.FormEvent) {
    event.preventDefault()

    const selectedScholar = scholars.find((s) => s.id === scholarId)
    const selectedCategory = categories.find((c) => c.id === categoryId)

    const row: Record<string, string> = {
      id: currentLecture?.id || '',
      title: JSON.stringify({ ar: titleAr, en: titleEn }),
      scholar: JSON.stringify({ ar: selectedScholar?.name.ar || '', en: selectedScholar?.name.en || '' }),
      scholarId,
      category: JSON.stringify({ ar: selectedCategory?.title.ar || '', en: selectedCategory?.title.en || '' }),
      categoryId,
      views: currentLecture?.views ? String(currentLecture.views) : '0',
      date: currentLecture?.date || new Date().toISOString().split('T')[0],
      tone,
      thumbnail,
      description: JSON.stringify({ ar: descAr, en: descEn }),
      parts: currentLecture?.parts ? JSON.stringify(currentLecture.parts) : '[]'
    }

    saveLectureRow(row, originalIndex)
    setSuccessMsg(isAddMode ? copy.successAdd : copy.successEdit)
    setTimeout(() => {
      navigate('/admin/lectures')
    }, 1500)
  }

  return (
    <div className="admin-page" dir={dir}>
      <div className="admin-page__header">
        <div>
          <button className="admin-btn admin-btn--secondary" onClick={() => navigate('/admin/lectures')} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }} type="button">
            <BackIcon size={16} />
            <span>{copy.cancel}</span>
          </button>
          <h1 className="admin-page__title">{isAddMode ? copy.addTitle : copy.editTitle}</h1>
        </div>
      </div>

      {successMsg && (
        <div style={{ padding: '16px', background: '#ecfdf5', border: '1px solid #10b981', color: '#065f46', borderRadius: '8px', marginBottom: '24px', fontWeight: 600 }}>
          {successMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }} className="lecture-form-layout">
        
        {/* Form panel */}
        <form onSubmit={handleSave} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <button
              type="button"
              onClick={() => setActiveTab('basic')}
              style={{
                padding: '16px 24px',
                border: 'none',
                background: activeTab === 'basic' ? '#fff' : 'transparent',
                borderBottom: activeTab === 'basic' ? '3px solid var(--color-primary-600)' : '3px solid transparent',
                color: activeTab === 'basic' ? 'var(--color-primary-700)' : '#475569',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {copy.basicTab}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('desc')}
              style={{
                padding: '16px 24px',
                border: 'none',
                background: activeTab === 'desc' ? '#fff' : 'transparent',
                borderBottom: activeTab === 'desc' ? '3px solid var(--color-primary-600)' : '3px solid transparent',
                color: activeTab === 'desc' ? 'var(--color-primary-700)' : '#475569',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {copy.descTab}
            </button>
          </div>

          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {activeTab === 'basic' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      {copy.lectureTitle} (العربية) *
                    </label>
                    <input
                      required
                      type="text"
                      value={titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      {copy.lectureTitle} (English) *
                    </label>
                    <input
                      required
                      type="text"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      {copy.teacher} *
                    </label>
                    <select
                      required
                      value={scholarId}
                      onChange={(e) => setScholarId(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    >
                      <option value="">{copy.selectTeacher}</option>
                      {scholars.map((s) => (
                        <option key={s.id} value={s.id}>{s.name[language === 'ar' ? 'ar' : 'en']}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      {copy.category} *
                    </label>
                    <select
                      required
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    >
                      <option value="">{copy.selectCategory}</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.title[language === 'ar' ? 'ar' : 'en']}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      {copy.thumbnail}
                    </label>
                    <input
                      type="text"
                      value={thumbnail}
                      onChange={(e) => setThumbnail(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                      لون البطاقة (Tone Color)
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    >
                      <option value="green">أخضر (Green)</option>
                      <option value="navy">كحلي (Navy)</option>
                      <option value="gold">ذهبي (Gold)</option>
                      <option value="blue">أزرق (Blue)</option>
                      <option value="brown">بني (Brown)</option>
                      <option value="cream">كريمي (Cream)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'desc' && (
              <>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                    {copy.descriptionAr || 'الوصف بالعربية'}
                  </label>
                  <textarea
                    rows={6}
                    value={descAr}
                    onChange={(e) => setDescAr(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                    {copy.descriptionEn || 'الوصف بالإنجليزية'}
                  </label>
                  <textarea
                    rows={6}
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit' }}
                  />
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
              <button
                type="button"
                className="admin-btn admin-btn--secondary"
                onClick={() => navigate('/admin/lectures')}
              >
                {copy.cancel}
              </button>
              <button
                type="submit"
                className="admin-btn admin-btn--primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Save size={16} />
                <span>{copy.save}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Preview Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', margin: 0 }}>{copy.previewTitle}</h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{copy.previewSubtitle}</p>
          
          <div className="fatwa-card" style={{ cursor: 'default', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            <div className={`fatwa-thumb tone-${tone}`} style={{ position: 'relative', aspectRatio: '16/9' }}>
              <img alt="" src={thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <Play size={30} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }} />
            </div>
            <div className="fatwa-card__body" style={{ padding: '16px' }}>
              <small style={{ color: 'var(--color-primary-600)', fontSize: '12px', fontWeight: 600 }}>
                {categories.find((c) => c.id === categoryId)?.title[language === 'ar' ? 'ar' : 'en'] || 'القسم العلمى'}
              </small>
              <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '8px 0', color: '#0f172a' }}>
                {language === 'ar' ? (titleAr || copy.placeholderTitle) : (titleEn || copy.placeholderTitle)}
              </h2>
              <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
                {scholars.find((s) => s.id === scholarId)?.name[language === 'ar' ? 'ar' : 'en'] || copy.placeholderTeacher}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
