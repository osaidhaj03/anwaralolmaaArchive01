import { type FormEvent } from 'react'
import { Eye, LockKeyhole, LogIn, Mail, User } from 'lucide-react'

type LoginFormProps = {
  copy: Record<string, string>
  message: string
  showPassword: boolean
  isSignUp: boolean
  onToggleSignUp: () => void
  onMockAction: () => void
  onPasswordToggle: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function LoginForm({
  copy,
  message,
  showPassword,
  isSignUp,
  onToggleSignUp,
  onMockAction,
  onPasswordToggle,
  onSubmit,
}: LoginFormProps) {
  return (
    <form className="login-card" onSubmit={onSubmit}>
      <div className="login-card__heading">
        <h1>{isSignUp ? copy.create : copy.welcome}</h1>
        <p>{isSignUp ? '' : copy.helper}</p>
      </div>

      {isSignUp && (
        <label className="login-field">
          <span>{copy.name}</span>
          <div>
            <input placeholder={copy.namePlaceholder} type="text" required />
            <User size={19} />
          </div>
        </label>
      )}

      <label className="login-field">
        <span>{copy.email}</span>
        <div>
          <input autoComplete="email" inputMode="email" placeholder={copy.emailPlaceholder} type="email" required />
          <Mail size={19} />
        </div>
      </label>

      <label className="login-field">
        <span>{copy.password}</span>
        <div>
          <LockKeyhole size={19} />
          <input autoComplete="current-password" placeholder={copy.passwordPlaceholder} type={showPassword ? 'text' : 'password'} required />
          <button aria-label={showPassword ? copy.visible : copy.hidden} onClick={onPasswordToggle} type="button" className="login-password-toggle">
            <Eye size={18} />
          </button>
        </div>
      </label>

      {isSignUp && (
        <label className="login-field">
          <span>{copy.confirmPassword}</span>
          <div>
            <LockKeyhole size={19} />
            <input placeholder={copy.confirmPasswordPlaceholder} type={showPassword ? 'text' : 'password'} required />
          </div>
        </label>
      )}

      <div className="login-options">
        <label>
          <input type="checkbox" />
          <span>{copy.remember}</span>
        </label>
        {!isSignUp && (
          <button className="login-link-button" onClick={onMockAction} type="button">
            {copy.forgot}
          </button>
        )}
      </div>

      <button className="login-submit" type="submit">
        <LogIn size={19} />
        {isSignUp ? copy.signUp : copy.login}
      </button>

      <div className="login-divider">
        <span>{copy.divider}</span>
      </div>

      <div className="social-login-row">
        <button onClick={onMockAction} type="button">
          <svg viewBox="0 0 24 24" width="18" height="18" style={{ marginRight: '6px' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          {copy.google}
        </button>
        <button onClick={onMockAction} type="button">
          <span className="microsoft-mark" />
          {copy.microsoft}
        </button>
      </div>

      <p className="signup-line">
        {isSignUp ? copy.haveAccount : copy.noAccount}{' '}
        <button className="login-link-button" onClick={onToggleSignUp} type="button">
          {isSignUp ? copy.login : copy.create}
        </button>
      </p>
      {message ? <p className="login-helper-message">{message}</p> : null}
    </form>
  )
}
