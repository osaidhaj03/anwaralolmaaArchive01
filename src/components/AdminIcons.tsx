import { useId } from 'react'
import type { SVGProps } from 'react'

export function BrandMark(props: SVGProps<SVGSVGElement>) {
  const clipId = useId()

  return (
    <svg viewBox="0 0 56 56" aria-hidden="true" {...props}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="28" cy="28" r="27" />
        </clipPath>
      </defs>
      <image
        clipPath={`url(#${clipId})`}
        height="64"
        href="/Icons/MainIcon.jpg"
        preserveAspectRatio="xMidYMid slice"
        width="64"
        x="-4"
        y="-4"
      />
    </svg>
  )
}
