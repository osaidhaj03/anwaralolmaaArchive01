type AdminPlaceholderPageProps = {
  title: string
  description: string
  badge?: string
}

export function AdminPlaceholderPage({ title, description, badge = 'قيد البناء' }: AdminPlaceholderPageProps) {
  return (
    <div className="admin-page">
      <section className="admin-panel placeholder-panel">
        <span>{badge}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
    </div>
  )
}
