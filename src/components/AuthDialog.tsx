import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { generateId } from '@/lib/helpers'
import type { User } from '@/lib/types'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin: (user: User, rememberMe: boolean) => void
}

export function AuthDialog({ open, onOpenChange, onLogin }: AuthDialogProps) {
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
    toast.success('Successfully logged in!')
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
    toast.success('Account created successfully!')
    onOpenChange(false)

    setSignupName('')
    setSignupEmail('')
    setSignupPassword('')
    setSignupConfirmPassword('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border border-border rounded-lg shadow-card-hover">
        <DialogHeader className="border-b border-border pb-3">
          <DialogTitle className="text-lg font-semibold">Welcome</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="login" 
              className="text-xs font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-foreground rounded-none pb-2"
            >
              Log in
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="text-xs font-semibold data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-foreground rounded-none pb-2"
            >
              Sign up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleLogin} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="login-email" className="text-xs font-semibold">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="h-9 text-sm border-input rounded-md focus:border-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-password" className="text-xs font-semibold">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="h-9 text-sm border-input rounded-md focus:border-foreground"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label
                  htmlFor="remember-me"
                  className="text-xs cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-md"
              >
                Log in
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-xs text-primary hover:text-primary/80 h-auto py-2"
                onClick={() => toast.info('Password recovery coming soon!')}
              >
                Forgot password?
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <form onSubmit={handleSignup} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="signup-name" className="text-xs font-semibold">Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="h-9 text-sm border-input rounded-md focus:border-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-email" className="text-xs font-semibold">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="h-9 text-sm border-input rounded-md focus:border-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-password" className="text-xs font-semibold">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="h-9 text-sm border-input rounded-md focus:border-foreground"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-confirm-password" className="text-xs font-semibold">Confirm Password</Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  className="h-9 text-sm border-input rounded-md focus:border-foreground"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-md"
              >
                Sign up
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="pt-3 border-t border-border">
          <p className="text-center text-xs text-text-body mb-3">Or continue with</p>
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.info('Social login coming soon!')}
              className="border-input hover:border-foreground h-9 text-xs"
            >
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.info('Social login coming soon!')}
              className="border-input hover:border-foreground h-9 text-xs"
            >
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
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
