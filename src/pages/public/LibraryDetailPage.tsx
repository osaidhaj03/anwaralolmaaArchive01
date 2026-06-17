import { BookOpen, Eye, FileText, UserRound } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { DetailInfoCard, DetailRelatedCard, DetailTextCard } from '../../components/public/DetailCards'
import { PublicPageFooter, PublicPageHeader } from '../../components/public/PublicPageChrome'
import { useLocalizedArchive } from '../../context/ArchiveDataContext'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { libraryCopy } from '../../data/public/library'

const detailCopy: Record<Language, Record<string, string>> = {
  ar: {
    breadcrumb: 'الرئيسية / المكتبة / تفاصيل الكتاب',
    overview: 'عن الكتاب',
    description: 'نسخة للقراءة والمراجعة مع بيانات مختصرة عن المؤلف ومجال الكتاب واستخداماته في الدرس العلمي.',
    author: 'المؤلف',
    category: 'القسم',
    type: 'النوع',
    pages: 'الصفحات',
    reads: 'القراءات',
    readNow: 'القراءة الآن',
    related: 'كتب ذات صلة',
  },
  en: {
    breadcrumb: 'Home / Library / Book details',
    overview: 'About this book',
    description: 'A reading and reference page with author details, subject context, and quick access actions.',
    author: 'Author',
    category: 'Category',
    type: 'Type',
    pages: 'Pages',
    reads: 'Reads',
    readNow: 'Read now',
    related: 'Related books',
  },
  uz: {
    breadcrumb: 'Bosh sahifa / Kutubxona / Tafsilotlar',
    overview: 'Kitob haqida',
    description: 'Muallif va mavzu tafsilotlari bo‘lgan o‘qish va ma’lumot olish sahifasi.',
    author: 'Muallif',
    category: 'Kategoriya',
    type: 'Tur',
    pages: 'Sahifalar',
    reads: 'O‘qildi',
    readNow: 'Hozir o‘qish',
    related: 'Tegishli kitoblar',
  },
  uzCyr: {
    breadcrumb: 'Бош саҳифа / Кутубхона / Тафсилотлар',
    overview: 'Китоб ҳақида',
    description: 'Муаллиф ва мавзу тафсилотлари бўлган ўқиш ва маълумот олиш саҳифаси.',
    author: 'Муаллиф',
    category: 'Категория',
    type: 'Тур',
    pages: 'Саҳифалар',
    reads: 'Ўқилди',
    readNow: 'Ҳозир ўқиш',
    related: 'Тегишли китоблар',
  },
  ru: {
    breadcrumb: 'Главная / Библиотека / Детали книги',
    overview: 'О книге',
    description: 'Страница для чтения и справок с информацией об авторе, тематике и быстрым переходом.',
    author: 'Автор',
    category: 'Категория',
    type: 'Тип',
    pages: 'Страницы',
    reads: 'Прочтения',
    readNow: 'Читать сейчас',
    related: 'Похожие книги',
  },
}

export function LibraryDetailPage() {
  const { bookId } = useParams()
  const { dir, language } = useLanguage()
  const pageCopy = libraryCopy[language]
  const archive = useLocalizedArchive(language)
  const copy = detailCopy[language]
  const index = Number(bookId) - 1
  const item = archive.books[index]

  if (!item) {
    return <Navigate to="/library" replace />
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicPageHeader activeTo="/library" copy={pageCopy} />

      <section className="library-detail-hero islamic-soft-pattern">
        <div className="public-container library-detail-hero__inner">
          <span>{copy.breadcrumb}</span>
          <div className="library-detail-head">
            <div className={`library-book-cover tone-${item.tone}`}><BookOpen size={48} /><span>{item.type}</span></div>
            <div className="library-detail-copy">
              <small>{item.category}</small>
              <h1>{item.title}</h1>
              <p>{copy.description}</p>
              <div className="library-detail-actions">
                <Link to="/login">{copy.readNow}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="public-container library-detail-layout">
        <div className="library-detail-main">
          <DetailTextCard className="library-detail-card" title={copy.overview}>
            <p>{language === 'ar' ? 'يُستخدم هذا الكتاب في الدراسة التمهيدية والمراجعة المنهجية، مع ترتيب واضح للأبواب وسهولة في الرجوع إلى المسائل.' : 'This title is used for guided study and structured review, with clearly arranged chapters and easy reference points.'}</p>
          </DetailTextCard>
          <DetailRelatedCard
            cardClassName="library-detail-card"
            linkClassName="library-detail-related"
            title={copy.related}
            items={archive.books.filter((candidate) => candidate.category === item.category && candidate.title !== item.title).slice(0, 3).map((related) => ({
                description: related.author,
                title: related.title,
                to: `/library/${archive.books.findIndex((candidate) => candidate.title === related.title) + 1}`,
            }))}
          />
        </div>
        <aside className="library-detail-side">
          <DetailInfoCard
            cardClassName="library-detail-card"
            listClassName="library-detail-info"
            items={[
                { label: copy.author, value: <><UserRound size={15} />{item.author}</> },
                { label: copy.category, value: item.category },
                { label: copy.type, value: item.type },
                { label: copy.pages, value: <><FileText size={15} />{item.pages}</> },
                { label: copy.reads, value: <><Eye size={15} />{item.views}</> },
            ]}
          />
        </aside>
      </section>

      <PublicPageFooter
        copy={pageCopy}
        quickLinksItems={[
          { label: pageCopy.nav[2].label, to: '/courses' },
          { label: pageCopy.nav[3].label, to: '/scholars' },
          { label: pageCopy.nav[4].label, to: '/fatwa' },
        ]}
        successText={pageCopy.newsletterSuccess}
      />
    </main>
  )
}
