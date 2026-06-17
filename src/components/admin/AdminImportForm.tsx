import { Clipboard, FileText, Image, Link2, PlayCircle, RotateCcw } from 'lucide-react'

export type AdminImportFormState = {
  checkDuplicates: boolean
  importSubtitles: boolean
  mergePdfs: boolean
  preset: string
  sourceType: string
  sourceUrl: string
  targetCategory: string
  targetTeacher: string
  thumbnailMode: string
}

type AdminImportFormProps = {
  copy: Record<string, string>
  message: string
  state: AdminImportFormState
  videosFound: number
  onPaste: () => void
  onReset: () => void
  onStart: () => void
  onStateChange: (state: AdminImportFormState) => void
}

export function AdminImportForm({ copy, message, onPaste, onReset, onStart, onStateChange, state, videosFound }: AdminImportFormProps) {
  function updateState(update: Partial<AdminImportFormState>) {
    onStateChange({ ...state, ...update })
  }

  return (
    <div className="admin-panel youtube-import-card">
      <div className="youtube-import-icon">
        <PlayCircle size={30} />
      </div>

      <label>
        {copy.urlLabel}
        <div className="import-input-row">
          <Link2 size={18} />
          <input onChange={(event) => updateState({ sourceUrl: event.target.value })} placeholder={copy.urlPlaceholder} value={state.sourceUrl} />
          <button onClick={onPaste} type="button">
            <Clipboard size={16} />
            {copy.paste}
          </button>
        </div>
      </label>

      {state.sourceUrl.trim() ? (
        <p className="found-count">
          <PlayCircle size={16} />
          {videosFound} {copy.videosFound}
        </p>
      ) : null}

      <div className="compact-form-grid">
        <label>
          {copy.typeLabel}
          <select onChange={(event) => updateState({ sourceType: event.target.value })} value={state.sourceType}>
            <option value="playlist">{copy.playlist}</option>
            <option value="channel">{copy.channel}</option>
            <option value="video">{copy.video}</option>
          </select>
        </label>

        <label>
          {copy.presetLabel}
          <select onChange={(event) => updateState({ preset: event.target.value })} value={state.preset}>
            <option value="course">{copy.coursePreset}</option>
            <option value="lecture">{copy.lecturePreset}</option>
            <option value="fatwa">{copy.fatwaPreset}</option>
            <option value="book">{copy.bookPreset}</option>
          </select>
        </label>

        <label>
          {copy.thumbnailLabel}
          <select onChange={(event) => updateState({ thumbnailMode: event.target.value })} value={state.thumbnailMode}>
            <option value="youtube">{copy.youtubeThumbnail}</option>
            <option value="custom">{copy.customThumbnail}</option>
            <option value="placeholder">{copy.placeholderThumbnail}</option>
          </select>
        </label>

        <label>
          {copy.categoryLabel}
          <input onChange={(event) => updateState({ targetCategory: event.target.value })} placeholder={copy.optional} value={state.targetCategory} />
        </label>

        <label>
          {copy.teacherLabel}
          <input onChange={(event) => updateState({ targetTeacher: event.target.value })} placeholder={copy.optional} value={state.targetTeacher} />
        </label>
      </div>

      <div className="import-checks">
        <label>
          <input checked={state.importSubtitles} onChange={(event) => updateState({ importSubtitles: event.target.checked })} type="checkbox" />
          <span>
            <FileText size={16} />
            {copy.subtitles}
          </span>
        </label>
        <label>
          <input checked={state.mergePdfs} onChange={(event) => updateState({ mergePdfs: event.target.checked })} type="checkbox" />
          <span>
            <FileText size={16} />
            {copy.mergePdfs}
          </span>
        </label>
        <label>
          <input checked={state.checkDuplicates} onChange={(event) => updateState({ checkDuplicates: event.target.checked })} type="checkbox" />
          <span>
            <Image size={16} />
            {copy.duplicates}
          </span>
        </label>
      </div>

      {message ? <p className="form-message">{message}</p> : null}

      <div className="youtube-import-actions">
        <button className="gold-button" onClick={onStart} type="button">
          <PlayCircle size={18} />
          {copy.start}
        </button>
        <button onClick={onReset} type="button">
          <RotateCcw size={17} />
          {copy.reset}
        </button>
      </div>
    </div>
  )
}
