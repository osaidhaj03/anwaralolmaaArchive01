import { useState, useRef } from 'react'
import { Download, Upload, AlertCircle, CheckCircle } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

type AdminExcelImportModalProps = {
  onClose: () => void
  onImport: (lessons: any[]) => void
}

export function AdminExcelImportModal({ onClose, onImport }: AdminExcelImportModalProps) {
  const { language, dir } = useLanguage()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [importedData, setImportedData] = useState<any[] | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const downloadTemplate = () => {
    const headers = 'Title,Duration,Status,Type,Thumbnail,DescriptionShort,DescriptionLong,Transcription,VideoLinks,Attachments'
    const example = '"الدرس الأول: مقدمة وتمهيد","45:00","منشور","video","https://images.unsplash.com/photo-1516321318423-f06f85e504b3","وصف مختصر للدرس الأول","ملخص طويل وشامل لدرس اليوم","بسم الله الرحمن الرحيم...","[{\\"label\\":\\"يوتيوب\\",\\"url\\":\\"https://www.youtube.com/watch?v=I9ojAAgoWe8\\",\\"platform\\":\\"youtube\\"}]","[{\\"name\\":\\"كتاب الشرح\\",\\"url\\":\\"https://example.com/book.pdf\\",\\"type\\":\\"PDF\\"}]"'
    const csvContent = '\ufeff' + headers + '\n' + example
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'lessons_template.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const parseCSV = (text: string) => {
    const lines: string[][] = []
    let row: string[] = []
    let insideQuote = false
    let currentVal = ''

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const nextChar = text[i + 1]

      if (char === '"') {
        if (insideQuote && nextChar === '"') {
          currentVal += '"'
          i++
        } else {
          insideQuote = !insideQuote
        }
      } else if (char === ',' && !insideQuote) {
        row.push(currentVal.trim())
        currentVal = ''
      } else if ((char === '\r' || char === '\n') && !insideQuote) {
        if (char === '\r' && nextChar === '\n') {
          i++
        }
        row.push(currentVal.trim())
        if (row.length > 0 && (row.length > 1 || row[0] !== '')) {
          lines.push(row)
        }
        row = []
        currentVal = ''
      } else {
        currentVal += char
      }
    }
    if (currentVal || row.length > 0) {
      row.push(currentVal.trim())
      lines.push(row)
    }
    return lines
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setSuccess(null)
    setImportedData(null)
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        const parsed = parseCSV(text)
        if (parsed.length <= 1) {
          setError(language === 'ar' ? 'الملف فارغ أو لا يحتوي على أسطر بيانات.' : 'File is empty or contains no data.')
          return
        }

        const headers = parsed[0].map(h => h.toLowerCase().trim())
        const dataRows = parsed.slice(1)

        // Helper indexes
        const titleIdx = headers.indexOf('title')
        const durationIdx = headers.indexOf('duration')
        const statusIdx = headers.indexOf('status')
        const thumbIdx = headers.indexOf('thumbnail')
        const descShortIdx = headers.indexOf('descriptionshort')
        const descLongIdx = headers.indexOf('descriptionlong')
        const transcriptIdx = headers.indexOf('transcription')
        const videosIdx = headers.indexOf('videolinks')
        const attachIdx = headers.indexOf('attachments')

        if (titleIdx === -1) {
          setError(language === 'ar' ? 'عامود العنوان (Title) مطلوب في الملف.' : 'Title column is required in CSV.')
          return
        }

        const formattedLessons = dataRows.map((row) => {
          const title = row[titleIdx] || ''
          const duration = durationIdx !== -1 ? row[durationIdx] || '45:00' : '45:00'
          const status = statusIdx !== -1 ? row[statusIdx] || 'منشور' : 'منشور'
          const thumbnail = thumbIdx !== -1 ? row[thumbIdx] || '' : ''
          const descriptionShort = descShortIdx !== -1 ? row[descShortIdx] || '' : ''
          const descriptionLong = descLongIdx !== -1 ? row[descLongIdx] || '' : ''
          const transcription = transcriptIdx !== -1 ? row[transcriptIdx] || '' : ''
          
          let videoLinks = '[]'
          if (videosIdx !== -1 && row[videosIdx]) {
            videoLinks = row[videosIdx]
          }
          let attachments = '[]'
          if (attachIdx !== -1 && row[attachIdx]) {
            attachments = row[attachIdx]
          }

          return {
            title,
            duration,
            status,
            thumbnail,
            descriptionShort,
            descriptionLong,
            transcription,
            videoLinks,
            attachments,
            locked: status === 'Draft' || status === 'مسودة'
          }
        }).filter(lesson => lesson.title.trim() !== '')

        if (formattedLessons.length === 0) {
          setError(language === 'ar' ? 'لم يتم العثور على أي دروس صالحة للاستيراد.' : 'No valid lessons found to import.')
          return
        }

        setImportedData(formattedLessons)
        setSuccess(language === 'ar' ? `تم تحليل ${formattedLessons.length} دروس بنجاح. اضغط حفظ لإتمام الاستيراد.` : `Parsed ${formattedLessons.length} lessons. Click save to complete.`)
      } catch (err) {
        setError(language === 'ar' ? 'حدث خطأ أثناء قراءة الملف.' : 'Error reading file.')
      }
    }
    reader.readAsText(file, 'UTF-8')
  }

  const handleSave = () => {
    if (!importedData) return
    onImport(importedData)
    onClose()
  }

  return (
    <div className="modal-backdrop" role="presentation" dir={dir} style={{ zIndex: 1100 }}>
      <section
        className="admin-modal"
        role="dialog"
        style={{
          width: '100%',
          maxWidth: '550px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        <header style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0d263d', margin: 0 }}>
            {language === 'ar' ? 'استيراد دروس الدورة من Excel / CSV' : 'Import Course Lessons'}
          </h2>
          <button
            onClick={onClose}
            type="button"
            style={{ background: 'none', border: 'none', fontSize: '24px', color: '#94a3b8', cursor: 'pointer' }}
          >
            ×
          </button>
        </header>

        <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Step 1: Download Template */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#1e293b' }}>
              {language === 'ar' ? '1. تنزيل قالب البيانات' : '1. Download Data Template'}
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              {language === 'ar' 
                ? 'قم بتنزيل ملف القالب بصيغة CSV لتعبئة الدروس بالشكل والترتيب الصحيحين لضمان نجاح الاستيراد.'
                : 'Download the template file in CSV format to populate lessons correctly.'}
            </p>
            <button
              type="button"
              onClick={downloadTemplate}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                background: '#fff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                width: 'fit-content',
                marginTop: '4px',
                transition: 'all 0.2s'
              }}
            >
              <Download size={16} />
              {language === 'ar' ? 'تنزيل القالب' : 'Download Template'}
            </button>
          </div>

          {/* Step 2: Upload File */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#1e293b' }}>
              {language === 'ar' ? '2. رفع الملف المعدل' : '2. Upload Modified File'}
            </h3>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '12px',
                padding: '30px',
                textAlign: 'center',
                background: '#fafafa',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Upload size={36} style={{ color: '#94a3b8' }} />
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>
                {fileName ? fileName : (language === 'ar' ? 'اختر ملف CSV لرفعه' : 'Choose CSV file to upload')}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                {language === 'ar' ? 'يدعم صيغة CSV مفرقة بفاصلة' : 'Supports standard CSV files'}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv"
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Feedback Area */}
          {error && (
            <div style={{ display: 'flex', gap: '10px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>{error}</div>
            </div>
          )}

          {success && (
            <div style={{ display: 'flex', gap: '10px', background: '#f0fdf4', border: '1px solid #dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
              <CheckCircle size={18} style={{ flexShrink: 0 }} />
              <div>{success}</div>
            </div>
          )}

        </div>

        <footer style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            type="button"
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#475569'
            }}
          >
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          
          <button
            onClick={handleSave}
            disabled={!importedData}
            type="button"
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: importedData ? 'var(--color-gold, #c5a880)' : '#cbd5e1',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: importedData ? 'pointer' : 'not-allowed',
              boxShadow: importedData ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {language === 'ar' ? 'استيراد الدروس' : 'Import Lessons'}
          </button>
        </footer>
      </section>
    </div>
  )
}
