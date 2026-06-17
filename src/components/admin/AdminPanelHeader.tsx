import type { ReactNode } from 'react'

type AdminPanelHeaderProps = {
  title: string
  actionLabel?: string
  onAction?: () => void
  children?: ReactNode
}

export function AdminPanelHeader({ actionLabel, children, onAction, title }: AdminPanelHeaderProps) {
  return (
    <div className="admin-panel__header">
      <h2>{title}</h2>
      {children}
      {actionLabel && onAction ? (
        <button onClick={onAction} type="button">
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
