import type { SVGProps } from 'react'

export function BrandMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 56 56" aria-hidden="true" {...props}>
      <image href="/Icons/MainIcon.jpg" height="56" preserveAspectRatio="xMidYMid meet" width="56" />
    </svg>
  )
}
