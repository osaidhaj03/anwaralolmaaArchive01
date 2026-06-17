import { PublicFooter } from '../PublicFooter'
import { PublicHeader, type PublicNavItem } from '../PublicHeader'

type PublicChromeCopy = {
  brand: string
  footerText: string
  languageLabel: string
  login: string
  nav: PublicNavItem[]
  newsletterButton: string
  newsletterPlaceholder: string
  newsletterText: string
  newsletterTitle: string
  quickLinks: string
  searchLabel: string
  subtitle: string
  themeLabel: string
}

type FooterLink = {
  label: string
  to: string
}

type PublicPageHeaderProps = {
  activeTo?: string
  copy: PublicChromeCopy
}

type PublicPageFooterProps = {
  copy: PublicChromeCopy
  quickLinksItems?: FooterLink[]
  successText: string
}

export function PublicPageHeader({ activeTo, copy }: PublicPageHeaderProps) {
  return (
    <PublicHeader
      activeTo={activeTo}
      brand={copy.brand}
      languageLabel={copy.languageLabel}
      login={copy.login}
      nav={copy.nav}
      searchLabel={copy.searchLabel}
      subtitle={copy.subtitle}
      themeLabel={copy.themeLabel}
    />
  )
}

export function PublicPageFooter({ copy, quickLinksItems = defaultFooterLinks(copy), successText }: PublicPageFooterProps) {
  return (
    <PublicFooter
      brand={copy.brand}
      footerText={copy.footerText}
      newsletterButton={copy.newsletterButton}
      newsletterPlaceholder={copy.newsletterPlaceholder}
      newsletterText={copy.newsletterText}
      newsletterTitle={copy.newsletterTitle}
      quickLinks={copy.quickLinks}
      quickLinksItems={quickLinksItems}
      successText={successText}
    />
  )
}

function defaultFooterLinks(copy: PublicChromeCopy): FooterLink[] {
  return [
    { label: copy.nav[2]?.label ?? 'Courses', to: '/courses' },
    { label: copy.nav[3]?.label ?? 'Scholars', to: '/scholars' },
    { label: copy.nav[5]?.label ?? 'Library', to: '/library' },
  ]
}
