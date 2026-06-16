import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandMark } from './AdminIcons'

type FooterLink = {
  label: string
  to: string
}

type PublicFooterProps = {
  brand: string
  footerText: string
  newsletterButton: string
  newsletterPlaceholder: string
  newsletterText: string
  newsletterTitle: string
  quickLinks: string
  quickLinksItems: FooterLink[]
  successText: string
}

export function PublicFooter({
  brand,
  footerText,
  newsletterButton,
  newsletterPlaceholder,
  newsletterText,
  newsletterTitle,
  quickLinks,
  quickLinksItems,
  successText,
}: PublicFooterProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="public-footer">
      <div className="public-container footer-grid">
        <div className="newsletter-box">
          <h3>{newsletterTitle}</h3>
          <p>{submitted ? successText : newsletterText}</p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input onChange={(event) => setEmail(event.target.value)} placeholder={newsletterPlaceholder} type="email" value={email} />
            <button type="submit">{newsletterButton}</button>
          </form>
        </div>
        <div>
          <h3>{quickLinks}</h3>
          {quickLinksItems.map((item) => <Link key={`${item.to}-${item.label}`} to={item.to}>{item.label}</Link>)}
        </div>
        <div>
          <h3>{brand}</h3>
          <p>{footerText}</p>
          <BrandMark className="footer-mark" />
        </div>
      </div>
    </footer>
  )
}
