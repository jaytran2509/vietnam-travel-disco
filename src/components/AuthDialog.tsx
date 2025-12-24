import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { generateId } from '@/lib/helpers'
import type { User } from '@/lib/types'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin: (user: User, rememberMe: boolean) => void
}

export function AuthDialog({ open, onOpenChange, onLogin }: AuthDialogProps) {
  const { t } = useLanguage()
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields')
      return
    }

    const user: User = {
      id: generateId(),
      email: loginEmail,
      name: loginEmail.split('@')[0],
      preferences: {},
      createdAt: new Date().toISOString(),
    }

    onLogin(user, rememberMe)
    toast.success(t.auth.loginSuccess)
    onOpenChange(false)

    setLoginEmail('')
    setLoginPassword('')
    setRememberMe(false)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()

    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (signupPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    const user: User = {
      id: generateId(),
      email: signupEmail,
      name: signupName,
      preferences: {},
      createdAt: new Date().toISOString(),
    }

    onLogin(user, false)
    toast.success(t.auth.signupSuccess)
    onOpenChange(false)

    setSignupName('')
    setSignupEmail('')
    setSignupPassword('')
    setSignupConfirmPassword('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-strong border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold text-gradient-primary">{t.nav.login}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-11 glass border border-white/30">
            <TabsTrigger 
              value="login" 
              className="text-sm font-semibold transition-all duration-300 data-[state=active]:gradient-primary data-[state=active]:text-white"
            >
              {t.auth.loginButton}
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="text-sm font-semibold transition-all duration-300 data-[state=active]:gradient-primary data-[state=active]:text-white"
            >
              {t.auth.signupButton}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleLogin} 
              className="space-y-5 mt-4"
            >
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm font-semibold text-foreground">{t.auth.email}</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="h-11 text-base transition-all duration-300 focus:shadow-lg glass border-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm font-semibold text-foreground">{t.auth.password}</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="h-11 text-base transition-all duration-300 focus:shadow-lg glass border-white/30"
                />
              </div>

              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="h-5 w-5"
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm font-medium cursor-pointer text-foreground hover:text-primary transition-colors"
                >
                  {t.auth.rememberMe}
                </Label>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-bold gradient-primary text-white border-0 shadow-xl btn-ripple"
                >
                  {t.auth.loginButton}
                </Button>
              </motion.div>

              <Button
                type="button"
                variant="ghost"
                className="w-full h-9 text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={() => toast.info('Password recovery coming soon!')}
              >
                Forgot password?
              </Button>
            </motion.form>
          </TabsContent>

          <TabsContent value="signup">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSignup} 
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-sm font-semibold text-foreground">{t.auth.name}</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="h-11 text-base transition-all duration-300 focus:shadow-lg glass border-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-semibold text-foreground">{t.auth.email}</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="h-11 text-base transition-all duration-300 focus:shadow-lg glass border-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-semibold text-foreground">{t.auth.password}</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="h-11 text-base transition-all duration-300 focus:shadow-lg glass border-white/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password" className="text-sm font-semibold text-foreground">Confirm Password</Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  className="h-11 text-base transition-all duration-300 focus:shadow-lg glass border-white/30"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full h-11 text-base font-bold gradient-primary text-white border-0 shadow-xl btn-ripple"
                >
                  {t.auth.signupButton}
                </Button>
              </motion.div>
            </motion.form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
