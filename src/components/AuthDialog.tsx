import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/contexts/ToastContext'
import { generateId } from '@/lib/helpers'
import { Eye, EyeSlash, CheckCircle, XCircle, Spinner } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { User } from '@/lib/types'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin: (user: User, rememberMe: boolean) => void
}

export function AuthDialog({ open, onOpenChange, onLogin }: AuthDialogProps) {
  const { t } = useLanguage()
  const toast = useToast()
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false)
  const [signupErrors, setSignupErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({})
  const [isSigningUp, setIsSigningUp] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateLoginForm = () => {
    const errors: { email?: string; password?: string } = {}
    
    if (!loginEmail) {
      errors.email = t.validation.emailRequired
    } else if (!validateEmail(loginEmail)) {
      errors.email = t.validation.emailInvalid
    }
    
    if (!loginPassword) {
      errors.password = t.validation.passwordRequired
    } else if (loginPassword.length < 6) {
      errors.password = t.validation.passwordMinLength
    }
    
    setLoginErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateSignupForm = () => {
    const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {}
    
    if (!signupName) {
      errors.name = t.validation.nameRequired
    } else if (signupName.length < 2) {
      errors.name = t.validation.nameMinLength
    }
    
    if (!signupEmail) {
      errors.email = t.validation.emailRequired
    } else if (!validateEmail(signupEmail)) {
      errors.email = t.validation.emailInvalid
    }
    
    if (!signupPassword) {
      errors.password = t.validation.passwordRequired
    } else if (signupPassword.length < 6) {
      errors.password = t.validation.passwordMinLength
    }
    
    if (!signupConfirmPassword) {
      errors.confirmPassword = t.validation.confirmPasswordRequired
    } else if (signupPassword !== signupConfirmPassword) {
      errors.confirmPassword = t.validation.passwordsDoNotMatch
    }
    
    setSignupErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateLoginForm()) {
      return
    }

    setIsLoggingIn(true)

    await new Promise(resolve => setTimeout(resolve, 800))

    const user: User = {
      id: generateId(),
      email: loginEmail,
      name: loginEmail.split('@')[0],
      preferences: {},
      createdAt: new Date().toISOString(),
    }

    onLogin(user, rememberMe)
    toast.success(t.auth.loginSuccess)
    
    setIsLoggingIn(false)
    onOpenChange(false)

    setLoginEmail('')
    setLoginPassword('')
    setRememberMe(false)
    setLoginErrors({})
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateSignupForm()) {
      return
    }

    setIsSigningUp(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const user: User = {
      id: generateId(),
      email: signupEmail,
      name: signupName,
      preferences: {},
      createdAt: new Date().toISOString(),
    }

    onLogin(user, false)
    toast.success(t.auth.signupSuccess)
    
    setIsSigningUp(false)
    onOpenChange(false)

    setSignupName('')
    setSignupEmail('')
    setSignupPassword('')
    setSignupConfirmPassword('')
    setSignupErrors({})
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' }
    if (password.length < 6) return { strength: 33, label: t.auth.weak, color: 'bg-destructive' }
    if (password.length < 10) return { strength: 66, label: t.auth.good, color: 'bg-accent' }
    return { strength: 100, label: t.auth.strong, color: 'bg-success' }
  }

  const passwordStrength = getPasswordStrength(signupPassword)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[460px] bg-white border-0 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-8 pt-8 pb-6">
          <DialogTitle className="text-2xl font-bold text-foreground tracking-tight">{t.auth.loginTitle}</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1.5">{t.auth.subtitle}</p>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <div className="px-8">
            <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/30 rounded-lg">
              <TabsTrigger 
                value="login" 
                className="text-[13px] font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2.5 px-4 text-muted-foreground data-[state=active]:text-foreground transition-all duration-200"
              >
                {t.auth.signIn}
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="text-[13px] font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2.5 px-4 text-muted-foreground data-[state=active]:text-foreground transition-all duration-200"
              >
                {t.auth.createAccount}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="login" className="mt-0 px-8 pt-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-[13px] font-semibold text-foreground">
                  {t.auth.email}
                </Label>
                <div className="relative">
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value)
                      if (loginErrors.email) setLoginErrors({ ...loginErrors, email: undefined })
                    }}
                    onBlur={() => loginEmail && validateLoginForm()}
                    className={`h-11 text-[15px] border-2 rounded-xl transition-all duration-200 ${
                      loginErrors.email 
                        ? 'border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20' 
                        : 'border-input focus-visible:border-primary focus-visible:ring-primary/20'
                    } focus-visible:ring-4 bg-white placeholder:text-muted-foreground/60`}
                  />
                  {loginEmail && !loginErrors.email && (
                    <CheckCircle weight="fill" className="absolute right-3 top-1/2 -translate-y-1/2 text-success w-5 h-5 animate-in fade-in zoom-in duration-200" />
                  )}
                  {loginErrors.email && (
                    <XCircle weight="fill" className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive w-5 h-5 animate-in fade-in zoom-in duration-200" />
                  )}
                </div>
                {loginErrors.email && (
                  <p className="text-xs text-destructive font-medium flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
                    {loginErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-[13px] font-semibold text-foreground">
                  {t.auth.password}
                </Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value)
                      if (loginErrors.password) setLoginErrors({ ...loginErrors, password: undefined })
                    }}
                    onBlur={() => loginPassword && validateLoginForm()}
                    className={`h-11 text-[15px] border-2 rounded-xl transition-all duration-200 pr-10 ${
                      loginErrors.password 
                        ? 'border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20' 
                        : 'border-input focus-visible:border-primary focus-visible:ring-primary/20'
                    } focus-visible:ring-4 bg-white placeholder:text-muted-foreground/60`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50"
                  >
                    {showLoginPassword ? <EyeSlash weight="bold" className="w-5 h-5" /> : <Eye weight="bold" className="w-5 h-5" />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-xs text-destructive font-medium flex items-center gap-1 animate-in slide-in-from-top-1 duration-200">
                    {loginErrors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary border-2 h-4.5 w-4.5 rounded-md transition-all duration-200"
                  />
                  <Label
                    htmlFor="remember-me"
                    className="text-[13px] cursor-pointer text-muted-foreground font-medium select-none"
                  >
                    {t.auth.rememberMe}
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-[13px] text-primary hover:text-primary-hover h-auto py-0 px-0 font-semibold hover:bg-transparent"
                  onClick={() => toast.info(t.auth.passwordRecoveryComingSoon)}
                >
                  {t.auth.forgotPassword}
                </Button>
              </div>

              <Button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full h-11 text-[15px] bg-primary text-white hover:bg-primary-hover font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <>
                    <Spinner className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  t.auth.loginButton
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-0 px-8 pt-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-[13px] font-semibold text-foreground">
                  {t.auth.name}
                </Label>
                <div className="relative">
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => {
                      setSignupName(e.target.value)
                      if (signupErrors.name) setSignupErrors({ ...signupErrors, name: undefined })
                    }}
                    onBlur={() => signupName && validateSignupForm()}
                    className={`h-11 text-[15px] border-2 rounded-xl transition-all duration-200 ${
                      signupErrors.name 
                        ? 'border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20' 
                        : 'border-input focus-visible:border-primary focus-visible:ring-primary/20'
                    } focus-visible:ring-4 bg-white placeholder:text-muted-foreground/60`}
                  />
                  {signupName && !signupErrors.name && signupName.length >= 2 && (
                    <CheckCircle weight="fill" className="absolute right-3 top-1/2 -translate-y-1/2 text-success w-5 h-5 animate-in fade-in zoom-in duration-200" />
                  )}
                </div>
                {signupErrors.name && (
                  <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1 duration-200">
                    {signupErrors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-[13px] font-semibold text-foreground">
                  {t.auth.email}
                </Label>
                <div className="relative">
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    value={signupEmail}
                    onChange={(e) => {
                      setSignupEmail(e.target.value)
                      if (signupErrors.email) setSignupErrors({ ...signupErrors, email: undefined })
                    }}
                    onBlur={() => signupEmail && validateSignupForm()}
                    className={`h-11 text-[15px] border-2 rounded-xl transition-all duration-200 ${
                      signupErrors.email 
                        ? 'border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20' 
                        : 'border-input focus-visible:border-primary focus-visible:ring-primary/20'
                    } focus-visible:ring-4 bg-white placeholder:text-muted-foreground/60`}
                  />
                  {signupEmail && !signupErrors.email && validateEmail(signupEmail) && (
                    <CheckCircle weight="fill" className="absolute right-3 top-1/2 -translate-y-1/2 text-success w-5 h-5 animate-in fade-in zoom-in duration-200" />
                  )}
                </div>
                {signupErrors.email && (
                  <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1 duration-200">
                    {signupErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-[13px] font-semibold text-foreground">
                  {t.auth.password}
                </Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={signupPassword}
                    onChange={(e) => {
                      setSignupPassword(e.target.value)
                      if (signupErrors.password) setSignupErrors({ ...signupErrors, password: undefined })
                    }}
                    className={`h-11 text-[15px] border-2 rounded-xl transition-all duration-200 pr-10 ${
                      signupErrors.password 
                        ? 'border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20' 
                        : 'border-input focus-visible:border-primary focus-visible:ring-primary/20'
                    } focus-visible:ring-4 bg-white placeholder:text-muted-foreground/60`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50"
                  >
                    {showSignupPassword ? <EyeSlash weight="bold" className="w-5 h-5" /> : <Eye weight="bold" className="w-5 h-5" />}
                  </button>
                </div>
                {signupPassword && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-1 duration-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">{t.auth.passwordStrength}:</span>
                      <span className={`font-semibold ${
                        passwordStrength.strength === 100 ? 'text-success' :
                        passwordStrength.strength === 66 ? 'text-accent' : 'text-destructive'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${passwordStrength.color} transition-all duration-300 ease-out rounded-full`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                  </div>
                )}
                {signupErrors.password && (
                  <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1 duration-200">
                    {signupErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password" className="text-[13px] font-semibold text-foreground">
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id="signup-confirm-password"
                    type={showSignupConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={signupConfirmPassword}
                    onChange={(e) => {
                      setSignupConfirmPassword(e.target.value)
                      if (signupErrors.confirmPassword) setSignupErrors({ ...signupErrors, confirmPassword: undefined })
                    }}
                    className={`h-11 text-[15px] border-2 rounded-xl transition-all duration-200 pr-10 ${
                      signupErrors.confirmPassword 
                        ? 'border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20' 
                        : 'border-input focus-visible:border-primary focus-visible:ring-primary/20'
                    } focus-visible:ring-4 bg-white placeholder:text-muted-foreground/60`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50"
                  >
                    {showSignupConfirmPassword ? <EyeSlash weight="bold" className="w-5 h-5" /> : <Eye weight="bold" className="w-5 h-5" />}
                  </button>
                  {signupConfirmPassword && signupPassword === signupConfirmPassword && (
                    <CheckCircle weight="fill" className="absolute right-11 top-1/2 -translate-y-1/2 text-success w-5 h-5 animate-in fade-in zoom-in duration-200" />
                  )}
                </div>
                {signupErrors.confirmPassword && (
                  <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1 duration-200">
                    {signupErrors.confirmPassword}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                disabled={isSigningUp}
                className="w-full h-11 text-[15px] bg-primary text-white hover:bg-primary-hover font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              >
                {isSigningUp ? (
                  <>
                    <Spinner className="w-5 h-5 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  t.auth.signupButton
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="px-8 py-6 bg-muted/20 border-t border-border/50">
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-muted/20 px-3 text-muted-foreground font-medium">{t.auth.orContinueWith}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.info(t.auth.socialLoginComingSoon)}
              className="border-2 border-border hover:border-foreground hover:bg-muted/30 h-11 text-[13px] font-semibold rounded-xl transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.info(t.auth.socialLoginComingSoon)}
              className="border-2 border-border hover:border-foreground hover:bg-muted/30 h-11 text-[13px] font-semibold rounded-xl transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
