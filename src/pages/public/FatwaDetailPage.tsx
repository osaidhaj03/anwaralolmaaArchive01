import { Clock3, Eye, MessageCircleQuestion, Play, UserRound } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PublicFooter } from '../../components/PublicFooter'
import { PublicHeader } from '../../components/PublicHeader'
import { DetailInfoList } from '../../components/public/DetailInfoList'
import { DetailRelatedLinks } from '../../components/public/DetailRelatedLinks'
import { useLanguage, type Language } from '../../context/LanguageContext'
import { fatwaCopy } from '../../data/public/fatwa'

const detailCopy: Record<Language, Record<string, string>> = {
  ar: {
    breadcrumb: 'الرئيسية / الفتاوى / تفاصيل الفتوى',
    summary: 'ملخص الفتوى',
    answer: 'جواب مختصر مرتب مع إمكانية العودة للمحتوى المرتبط والاستماع للمادة الأصلية.',
    watch: 'تشغيل الفتوى',
    scholar: 'العالم',
    category: 'التصنيف',
    duration: 'المدة',
    views: 'المشاهدات',
    related: 'فتاوى مرتبطة',
    descriptionText: 'هذه الفتوى تعرض الجواب المعتمد في المسألة مع إحالة موجزة إلى أصل الباب والتنبيه على القيود المهمة المتعلقة بالحكم.',
    successText: 'تم تسجيل بريدك في القائمة البريدية.',
  },
  en: {
    breadcrumb: 'Home / Fatwa / Fatwa details',
    summary: 'Fatwa summary',
    answer: 'A concise answer view with quick access to related material and the original recording.',
    watch: 'Play fatwa',
    scholar: 'Scholar',
    category: 'Category',
    duration: 'Duration',
    views: 'Views',
    related: 'Related fatwas',
    descriptionText: 'This fatwa presents the relied-upon answer, with a brief pointer to the broader topic and the main legal qualifiers.',
    successText: 'Your email has been added to the newsletter list.',
  },
  uz: {
    breadcrumb: 'Bosh sahifa / Fatvolar / Tafsilotlar',
    summary: 'Fatvo qisqacha mazmuni',
    answer: 'Tegishli materiallar va asl yozuvga tezkor kirish imkoniyatiga ega qisqa javob.',
    watch: 'Eshitish / Ko‘rish',
    scholar: 'Ustoz',
    category: 'Kategoriya',
    duration: 'Davomiyligi',
    views: 'Ko‘rishlar',
    related: 'Tegishli fatvolar',
    descriptionText: 'Ushbu fatvo ko‘rib chiqilayotgan masala bo‘yicha ishonchli javobni, uning ilmiy asoslari va muhim shartlari bilan birga taqdim etadi.',
    successText: 'Emailingiz xabarnomalar ro‘yxatiga qo‘shildi.',
  },
  uzCyr: {
    breadcrumb: 'Бош саҳифа / Фатволар / Тафсилотлар',
    summary: 'Фатво қисқача мазмуни',
    answer: 'Тегишли материаллар ва асл ёзувга тезкор кириш имкониятига эга қисқа жавоб.',
    watch: 'Эшитиш / Кўриш',
    scholar: 'Устоз',
    category: 'Категория',
    duration: 'Давомийлиги',
    views: 'Кўришлар',
    related: 'Тегишли фатволар',
    descriptionText: 'Ушбу фатво кўриб чиқилаётган масала бўйича ишончли жавобни, унинг илмий асослари ва муҳим шартлари билан бирга тақдим этади.',
    successText: 'Эмаилингиз хабарномалар рўйхатига қўшилди.',
  },
  ru: {
    breadcrumb: 'Главная / Фетвы / Детали фетвы',
    summary: 'Краткое содержание фетвы',
    answer: 'Краткий ответ с возможностью перехода к похожим материалам и оригинальной записи.',
    watch: 'Воспроизвести фетву',
    scholar: 'Ученый',
    category: 'Категория',
    duration: 'Длительность',
    views: 'Просмотры',
    related: 'Похожие фетвы',
    descriptionText: 'Эта фетва представляет собой авторитетный ответ на вопрос с краткой ссылкой на первоисточник и указанием важных правовых ограничений.',
    successText: 'Ваш email добавлен в список рассылки.',
  },
}

export function FatwaDetailPage() {
  const { fatwaId } = useParams()
  const { dir, language } = useLanguage()
  const pageCopy = fatwaCopy[language]
  const copy = detailCopy[language]
  const index = Number(fatwaId) - 1
  const item = pageCopy.items[index]

  if (!item) {
    return <Navigate to="/fatwa" replace />
  }

  return (
    <main className="public-site" dir={dir}>
      <PublicHeader activeTo="/fatwa" brand={pageCopy.brand} languageLabel={pageCopy.languageLabel} login={pageCopy.login} nav={pageCopy.nav} searchLabel={pageCopy.searchLabel} subtitle={pageCopy.subtitle} themeLabel={pageCopy.themeLabel} />

      <section className="fatwa-detail-hero islamic-soft-pattern">
        <div className="public-container fatwa-detail-hero__inner">
          <span>{copy.breadcrumb}</span>
          <div className="fatwa-detail-head">
            <div className={`fatwa-thumb tone-${item.tone}`}>
              <MessageCircleQuestion size={44} />
              <span>{item.duration}</span>
            </div>
            <div className="fatwa-detail-copy">
              <small>{item.category}</small>
              <h1>{item.title}</h1>
              <p>{copy.answer}</p>
              <Link className="fatwa-detail-play" to="/login"><Play size={16} />{copy.watch}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="public-container fatwa-detail-layout">
        <div className="fatwa-detail-main">
          <article className="fatwa-detail-card">
            <h2>{copy.summary}</h2>
            <p>{copy.descriptionText}</p>
          </article>
          <article className="fatwa-detail-card">
            <h2>{copy.related}</h2>
            <DetailRelatedLinks
              className="fatwa-detail-related"
              items={pageCopy.items.filter((candidate) => candidate.category === item.category && candidate.title !== item.title).slice(0, 3).map((related) => ({
                description: related.scholar,
                title: related.title,
                to: `/fatwa/${pageCopy.items.findIndex((candidate) => candidate.title === related.title) + 1}`,
              }))}
            />
          </article>
        </div>
        <aside className="fatwa-detail-side">
          <article className="fatwa-detail-card">
            <DetailInfoList
              className="fatwa-detail-info"
              items={[
                { label: copy.scholar, value: <><UserRound size={15} />{item.scholar}</> },
                { label: copy.category, value: item.category },
                { label: copy.duration, value: <><Clock3 size={15} />{item.duration}</> },
                { label: copy.views, value: <><Eye size={15} />{item.views}</> },
              ]}
            />
          </article>
        </aside>
      </section>

      <PublicFooter
        brand={pageCopy.brand}
        footerText={pageCopy.footerText}
        newsletterButton={pageCopy.newsletterButton}
        newsletterPlaceholder={pageCopy.newsletterPlaceholder}
        newsletterText={pageCopy.newsletterText}
        newsletterTitle={pageCopy.newsletterTitle}
        quickLinks={pageCopy.quickLinks}
        quickLinksItems={[
          { label: pageCopy.nav[2].label, to: '/courses' },
          { label: pageCopy.nav[3].label, to: '/scholars' },
          { label: pageCopy.nav[5].label, to: '/library' },
        ]}
        successText={copy.successText}
      />
    </main>
  )
}
