import type { AdminImportFormState } from './AdminImportForm'

type AdminImportSummaryProps = {
  copy: Record<string, string>
  state: AdminImportFormState
  videosFound: number
}

export function AdminImportSummary({ copy, state, videosFound }: AdminImportSummaryProps) {
  return (
    <aside className="admin-panel import-summary">
      <h3>{copy.summary}</h3>
      <dl>
        <div>
          <dt>{copy.typeLabel}</dt>
          <dd>{state.sourceType}</dd>
        </div>
        <div>
          <dt>{copy.videos}</dt>
          <dd>{state.sourceUrl.trim() ? videosFound : '-'}</dd>
        </div>
        <div>
          <dt>{copy.subtitlesShort}</dt>
          <dd>{state.importSubtitles ? copy.enabled : copy.disabled}</dd>
        </div>
        <div>
          <dt>{copy.pdfShort}</dt>
          <dd>{state.mergePdfs ? copy.enabled : copy.disabled}</dd>
        </div>
        <div>
          <dt>{copy.duplicatesShort}</dt>
          <dd>{state.checkDuplicates ? copy.enabled : copy.disabled}</dd>
        </div>
        <div>
          <dt>{copy.thumbnailLabel}</dt>
          <dd>{state.thumbnailMode}</dd>
        </div>
        <div>
          <dt>{copy.categoryLabel}</dt>
          <dd>{state.targetCategory || '-'}</dd>
        </div>
        <div>
          <dt>{copy.teacherLabel}</dt>
          <dd>{state.targetTeacher || '-'}</dd>
        </div>
      </dl>
    </aside>
  )
}
