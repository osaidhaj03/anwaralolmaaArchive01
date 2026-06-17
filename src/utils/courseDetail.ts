import { FileImage, FileText } from 'lucide-react'
import type { Language } from '../context/LanguageContext'

export function getCourseLessonCountLabel(count: number, language: Language) {
  if (language === 'ar') return `${count} درس`
  if (language === 'uz') return `${count} dars`
  if (language === 'uzCyr') return `${count} дарс`
  if (language === 'ru') return `${count} уроков`
  return `${count} lessons`
}

export function getCourseMaterialRows(courseTitle: string, labels: Record<string, string>) {
  return [
    {
      title: `${courseTitle} - ${labels.materials}`,
      meta: 'PDF · 4.2 MB',
      icon: FileText,
    },
    {
      title: labels.courseOutline,
      meta: 'PDF · 620 KB',
      icon: FileText,
    },
    {
      title: labels.visualMap,
      meta: 'PNG · 1.1 MB',
      icon: FileImage,
    },
  ]
}
