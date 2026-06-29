import { useState } from 'react'
import type { AdminPageSeed, AdminTableRow } from '../../data/adminSeed'
import { Plus, Trash2, Video, FileText, Layers, BookOpen } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

type AdminCourseLessonModalProps = {
  cancelLabel: string
  isAddMode: boolean
  lesson: AdminTableRow
  lessonsPage: AdminPageSeed
  saveLabel: string
  title: string
  onChange: (lesson: AdminTableRow) => void
  onClose: () => void
  onSave: () => void
}

export function AdminCourseLessonModal({
  cancelLabel,
  isAddMode,
  lesson,
  onChange,
  onClose,
  onSave,
  saveLabel,
  title,
}: AdminCourseLessonModalProps) {
  const { language, dir } = useLanguage()
  const [activeTab, setActiveTab] = useState<'basic' | 'videos' | 'text' | 'attachments'>('basic')

  // Safely parse JSON arrays
  const parsedLinks = (() => {
    try {
      return lesson.videoLinks ? JSON.parse(lesson.videoLinks as string) : []
    } catch {
      return []
    }
  })() as { label: string; url: string; platform?: string; type?: 'video' | 'audio' }[]

  const parsedAttachments = (() => {
    try {
      return lesson.attachments ? JSON.parse(lesson.attachments as string) : []
    } catch {
      return []
    }
  })() as { name: string; url: string; type: string }[]

  const updateLinks = (links: typeof parsedLinks) => {
    onChange({ ...lesson, videoLinks: JSON.stringify(links) })
  }

  const updateAttachments = (attachments: typeof parsedAttachments) => {
    onChange({ ...lesson, attachments: JSON.stringify(attachments) })
  }

  const addLinkField = () => {
    updateLinks([...parsedLinks, { label: '', url: '', platform: 'youtube', type: 'video' }])
  }

  const removeLinkField = (index: number) => {
    updateLinks(parsedLinks.filter((_, idx) => idx !== index))
  }

  const handleLinkChange = (index: number, updates: Partial<{ label: string; url: string; platform: string; type: 'video' | 'audio' }>) => {
    const updated = parsedLinks.map((item, idx) => (idx === index ? { ...item, ...updates } : item))
    updateLinks(updated)
  }

  const addAttachmentField = () => {
    updateAttachments([...parsedAttachments, { name: '', url: '', type: 'PDF' }])
  }

  const removeAttachmentField = (index: number) => {
    updateAttachments(parsedAttachments.filter((_, idx) => idx !== index))
  }

  const handleAttachmentChange = (index: number, key: 'name' | 'url' | 'type', value: string) => {
    const updated = parsedAttachments.map((item, idx) => (idx === index ? { ...item, [key]: value } : item))
    updateAttachments(updated)
  }

  return (
    <div className="modal-backdrop" role="presentation" dir={dir} style={{ zIndex: 1100 }}>
      <section
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          width: '100%',
          maxWidth: '750px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        <header style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0d263d', margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            type="button"
            style={{ background: 'none', border: 'none', fontSize: '24px', color: '#94a3b8', cursor: 'pointer' }}
          >
            ×
          </button>
        </header>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', padding: '0 12px' }}>
          <button
            onClick={() => setActiveTab('basic')}
            type="button"
            style={{
              padding: '14px 18px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: 600,
              color: activeTab === 'basic' ? 'var(--color-gold, #c5a880)' : '#64748b',
              borderBottom: activeTab === 'basic' ? '3px solid var(--color-gold, #c5a880)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Layers size={14} />
            {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Info'}
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            type="button"
            style={{
              padding: '14px 18px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: 600,
              color: activeTab === 'videos' ? 'var(--color-gold, #c5a880)' : '#64748b',
              borderBottom: activeTab === 'videos' ? '3px solid var(--color-gold, #c5a880)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Video size={14} />
            {language === 'ar' ? 'روابط الدرس' : 'Lesson Links'}
          </button>

          <button
            onClick={() => setActiveTab('text')}
            type="button"
            style={{
              padding: '14px 18px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: 600,
              color: activeTab === 'text' ? 'var(--color-gold, #c5a880)' : '#64748b',
              borderBottom: activeTab === 'text' ? '3px solid var(--color-gold, #c5a880)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FileText size={14} />
            {language === 'ar' ? 'الوصف والتفريغ' : 'Text & Transcript'}
          </button>

          <button
            onClick={() => setActiveTab('attachments')}
            type="button"
            style={{
              padding: '14px 18px',
              border: 'none',
              background: 'none',
              fontSize: '14px',
              fontWeight: 600,
              color: activeTab === 'attachments' ? 'var(--color-gold, #c5a880)' : '#64748b',
              borderBottom: activeTab === 'attachments' ? '3px solid var(--color-gold, #c5a880)' : '3px solid transparent',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <BookOpen size={14} />
            {language === 'ar' ? 'المرافقات' : 'Attachments'}
          </button>
        </div>

        {/* Content Area */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          {/* 1. Basic Info */}
          {activeTab === 'basic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, color: '#334155' }}>
                <span>{language === 'ar' ? 'عنوان الدرس' : 'Lesson Title'} <span style={{ color: '#ef4444' }}>*</span></span>
                <input
                  autoFocus={isAddMode}
                  onChange={(e) => onChange({ ...lesson, title: e.target.value })}
                  placeholder={language === 'ar' ? 'مثال: الدرس الأول: تمهيد ومقدمة' : 'e.g. Lesson 1: Introduction'}
                  value={lesson.title ?? ''}
                  required
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, color: '#334155' }}>
                  <span>{language === 'ar' ? 'مدة الدرس (دقائق:ثوانٍ)' : 'Duration (MM:SS)'}</span>
                  <input
                    onChange={(e) => onChange({ ...lesson, duration: e.target.value })}
                    placeholder="45:00"
                    value={lesson.duration ?? ''}
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, color: '#334155' }}>
                  <span>{language === 'ar' ? 'حالة النشر' : 'Status'}</span>
                  <select
                    onChange={(e) => onChange({ ...lesson, status: e.target.value })}
                    value={lesson.status ?? 'Draft'}
                    style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', outline: 'none' }}
                  >
                    <option value="منشور">{language === 'ar' ? 'منشور' : 'Published'}</option>
                    <option value="مسودة">{language === 'ar' ? 'مسودة' : 'Draft'}</option>
                  </select>
                </label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, color: '#334155' }}>
                  <span>{language === 'ar' ? 'الصورة المصغرة للدرس' : 'Lesson Thumbnail'}</span>
                  
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '4px' }}>
                    {lesson.thumbnail ? (
                      <div style={{ position: 'relative', width: '120px', height: '68px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                        <img src={lesson.thumbnail} alt="Thumbnail preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => onChange({ ...lesson, thumbnail: '' })}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: 'rgba(239, 68, 68, 0.9)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title={language === 'ar' ? 'حذف الصورة' : 'Remove Image'}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div style={{
                        width: '120px',
                        height: '68px',
                        borderRadius: '8px',
                        border: '2px dashed #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94a3b8',
                        fontSize: '11px',
                        background: '#fafafa'
                      }}>
                        {language === 'ar' ? 'لا توجد صورة' : 'No image'}
                      </div>
                    )}

                    <div style={{ flex: 1 }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              onChange({ ...lesson, thumbnail: event.target?.result as string })
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        style={{ display: 'none' }}
                        id="lesson-thumbnail-file-upload"
                      />
                      <label
                        htmlFor="lesson-thumbnail-file-upload"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          background: '#fff',
                          color: '#334155',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {language === 'ar' ? 'رفع صورة مصغرة' : 'Upload Thumbnail'}
                      </label>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>
                        {language === 'ar' ? 'اختر ملف صورة من جهازك.' : 'Select an image file from your device.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Video Links */}
          {activeTab === 'videos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {language === 'ar' ? 'أضف روابط المشاهدة المتعددة للدرس ليختار الطالب بينها.' : 'Add multiple streaming URLs for students to choose from.'}
                </span>
                <button
                  type="button"
                  onClick={addLinkField}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={14} />
                  {language === 'ar' ? 'إضافة رابط' : 'Add Link'}
                </button>
              </div>

              {parsedLinks.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
                  {language === 'ar' ? 'لم يتم إضافة أي روابط بعد. اضغط إضافة رابط للأعلى.' : 'No links added yet. Click Add Link above.'}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {parsedLinks.map((link, idx) => (
                    <div key={`link-${idx}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      {/* Platform Select */}
                      <select
                        value={link.platform ?? 'youtube'}
                        onChange={(e) => {
                          const plat = e.target.value
                          const defaultLabels: Record<string, Record<string, string>> = {
                            youtube: { ar: 'يوتيوب', en: 'YouTube' },
                            telegram: { ar: 'تيليجرام', en: 'Telegram' },
                            vimeo: { ar: 'فيميو', en: 'Vimeo' },
                            archive: { ar: 'أرشيف الإنترنت', en: 'Internet Archive' },
                            custom: { ar: 'رابط مخصص', en: 'Custom Server' }
                          }
                          const defaultLabel = defaultLabels[plat]?.[language] || defaultLabels[plat]?.['ar'] || ''
                          handleLinkChange(idx, { platform: plat, label: defaultLabel })
                        }}
                        style={{ width: '130px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', outline: 'none' }}
                      >
                        <option value="youtube">YouTube</option>
                        <option value="telegram">Telegram</option>
                        <option value="vimeo">Vimeo</option>
                        <option value="archive">Archive.org</option>
                        <option value="custom">{language === 'ar' ? 'مخصص' : 'Custom'}</option>
                      </select>

                      {/* Format Select */}
                      <select
                        value={link.type ?? 'video'}
                        onChange={(e) => handleLinkChange(idx, { type: e.target.value as 'video' | 'audio' })}
                        style={{ width: '110px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', outline: 'none' }}
                      >
                        <option value="video">{language === 'ar' ? 'مرئي' : 'Video'}</option>
                        <option value="audio">{language === 'ar' ? 'صوتي' : 'Audio'}</option>
                      </select>

                      <input
                        placeholder={language === 'ar' ? 'اسم الرابط (مثال: يوتيوب، سيرفر خاص)' : 'Link Label (e.g. YouTube, Main)'}
                        value={link.label}
                        onChange={(e) => handleLinkChange(idx, { label: e.target.value })}
                        style={{ width: '150px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                      />

                      <input
                        placeholder="https://..."
                        value={link.url}
                        onChange={(e) => handleLinkChange(idx, { url: e.target.value })}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                      />

                      <button
                        type="button"
                        onClick={() => removeLinkField(idx)}
                        style={{
                          padding: '10px',
                          color: '#ef4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. Text & Descriptions */}
          {activeTab === 'text' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, color: '#334155' }}>
                <span>{language === 'ar' ? 'الوصف المختصر للدرس' : 'Short Description'}</span>
                <textarea
                  placeholder={language === 'ar' ? 'اكتب ملخصاً قصيراً للدرس...' : 'Brief summary of the lesson...'}
                  value={lesson.descriptionShort ?? ''}
                  onChange={(e) => onChange({ ...lesson, descriptionShort: e.target.value })}
                  rows={2}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, color: '#334155' }}>
                <span>{language === 'ar' ? 'ملخص الدرس' : 'Lesson Summary'}</span>
                <textarea
                  placeholder={language === 'ar' ? 'اكتب ملخصاً وتفاصيل لنقاط الدرس المشروحة...' : 'Lesson summary and main points...'}
                  value={lesson.descriptionLong ?? ''}
                  onChange={(e) => onChange({ ...lesson, descriptionLong: e.target.value })}
                  rows={4}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600, color: '#334155' }}>
                <span>{language === 'ar' ? 'التفريغ الإملائي الكامل للدرس (تفريغ المحاضرة)' : 'Lesson Transcription (Text)'}</span>
                <textarea
                  placeholder={language === 'ar' ? 'الصق التفريغ النصي للمحاضرة هنا ليقرأه الطلاب...' : 'Paste transcription text here for students to read...'}
                  value={lesson.transcription ?? ''}
                  onChange={(e) => onChange({ ...lesson, transcription: e.target.value })}
                  rows={6}
                  style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}
                />
              </label>
            </div>
          )}

          {/* 4. Attachments */}
          {activeTab === 'attachments' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {language === 'ar' ? 'أضف الملفات والمرافقات التابعة للدرس (مثل ملخصات PDF، خرائط ذهنية).' : 'Add accompaniments and files for this lesson.'}
                </span>
                <button
                  type="button"
                  onClick={addAttachmentField}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={14} />
                  {language === 'ar' ? 'إضافة ملف' : 'Add File'}
                </button>
              </div>

              {parsedAttachments.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1', borderRadius: '8px' }}>
                  {language === 'ar' ? 'لم يتم إضافة أي مرافقات بعد. اضغط إضافة ملف للأعلى.' : 'No files added yet. Click Add File above.'}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {parsedAttachments.map((file, idx) => (
                    <div key={`file-${idx}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        placeholder={language === 'ar' ? 'اسم الملف (مثال: تلخيص الدرس الأول)' : 'File Name (e.g. Lesson 1 Notes)'}
                        value={file.name}
                        onChange={(e) => handleAttachmentChange(idx, 'name', e.target.value)}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                      />
                      <input
                        placeholder="https://..."
                        value={file.url}
                        onChange={(e) => handleAttachmentChange(idx, 'url', e.target.value)}
                        style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                      />
                      <select
                        value={file.type}
                        onChange={(e) => handleAttachmentChange(idx, 'type', e.target.value)}
                        style={{ width: '90px', padding: '10px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff' }}
                      >
                        <option value="PDF">PDF</option>
                        <option value="WORD">Word</option>
                        <option value="AUDIO">Audio</option>
                        <option value="ZIP">ZIP</option>
                        <option value="IMAGE">Image</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeAttachmentField(idx)}
                        style={{
                          padding: '10px',
                          color: '#ef4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <footer style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifySelf: 'flex-end', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            type="button"
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: '#fff',
              border: '1px solid #cbd5e1',
              color: '#334155',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {cancelLabel}
          </button>
          <button
            className="gold-button"
            onClick={onSave}
            type="button"
            disabled={!lesson.title?.trim()}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              background: lesson.title?.trim() ? 'var(--color-gold, #c5a880)' : '#cbd5e1',
              border: 'none',
              color: '#fff',
              fontWeight: 600,
              cursor: lesson.title?.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            {saveLabel}
          </button>
        </footer>
      </section>
    </div>
  )
}
