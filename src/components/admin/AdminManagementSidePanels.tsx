type AdminManagementSidePanelsProps = {
  insights: string[]
  insightsTitle: string
  notes: string[]
  notesTitle: string
}

export function AdminManagementSidePanels({ insights, insightsTitle, notes, notesTitle }: AdminManagementSidePanelsProps) {
  return (
    <aside className="management-side">
      <article className="admin-panel">
        <div className="admin-panel__header">
          <h2>{insightsTitle}</h2>
        </div>
        <div className="note-list">
          {insights.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </article>

      <article className="admin-panel">
        <div className="admin-panel__header">
          <h2>{notesTitle}</h2>
        </div>
        <div className="work-notes">
          {notes.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </article>
    </aside>
  )
}
