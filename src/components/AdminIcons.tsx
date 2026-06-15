import type { SVGProps } from 'react'

export function BrandMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 56 56" aria-hidden="true" {...props}>
      <circle cx="28" cy="28" r="26" fill="#fff" stroke="#d8b56d" strokeWidth="2" />
      <circle cx="28" cy="28" r="20" fill="#f7f6f2" stroke="#2c8c8c" strokeWidth="1.4" />
      <path
        d="M28 12c-2.5 4.5-1.6 8.3 2.8 11.3-3.7.3-6.5-1.1-8.2-4.2-.3 4.7 1.5 8 5.4 9.8v13"
        fill="none"
        stroke="#b8862d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
      <path
        d="M18 42h20M21 36h14M23 31h10"
        fill="none"
        stroke="#1f3a5f"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  )
}
