import { type FormEvent } from 'react'
import { Eye, LockKeyhole, LogIn, Mail } from 'lucide-react'

type LoginFormProps = {
  copy: Record<string, string>
  message: string
  showPassword: boolean
  onMockAction: () => void
  onPasswordToggle: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function LoginForm({ copy, message, onMockAction, onPasswordToggle, onSubmit, showPassword }: LoginFormProps) {
  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div className="login-card__heading">
        <h1>{copy.welcome}</h1>
        <p>{copy.helper}</p>
      </div>

      <label className="login-field">
        <span>{copy.email}</span>
        <div>
          <Mail size={19} />
          <input autoComplete="email" inputMode="email" placeholder={copy.emailPlaceholder} type="email" />
        </div>
      </label>

      <label className="login-field">
        <span>{copy.password}</span>
        <div>
          <LockKeyhole size={19} />
          <input autoComplete="current-password" placeholder={copy.passwordPlaceholder} type={showPassword ? 'text' : 'password'} />
          <button aria-label={showPassword ? copy.visible : copy.hidden} onClick={onPasswordToggle} type="button">
            <Eye size={18} />
          </button>
        </div>
      </label>

      <div className="login-options">
        <label>
          <input type="checkbox" />
          <span>{copy.remember}</span>
        </label>
        <button className="login-link-button" onClick={onMockAction} type="button">
          {copy.forgot}
        </button>
      </div>

      <button className="login-submit" type="submit">
        <LogIn size={19} />
        {copy.login}
      </button>

      <div className="login-divider">
        <span>{copy.divider}</span>
      </div>

      <div className="social-login-row">
        <button onClick={onMockAction} type="button">
          <span className="google-mark">G</span>
          {copy.google}
        </button>
        <button onClick={onMockAction} type="button">
          <span className="microsoft-mark" />
          {copy.microsoft}
        </button>
      </div>

      <p className="signup-line">
        {copy.noAccount}{' '}
        <button className="login-link-button" onClick={onMockAction} type="button">
          {copy.create}
        </button>
      </p>
      {message ? <p className="login-helper-message">{message}</p> : null}
    </form>
  )
}
