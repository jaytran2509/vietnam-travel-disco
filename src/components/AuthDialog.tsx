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
    toast.success('Welcome back!')
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
    toast.success(`Welcome, ${signupName}!`)
    onOpenChange(false)

    setSignupName('')
    setSignupEmail('')
    setSignupPassword('')
    setSignupConfirmPassword('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Welcome</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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
                  className="text-sm font-normal cursor-pointer"
                >
                  Remember me
                </Label>
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-sm text-muted-foreground"
                onClick={() => toast.info('Password recovery coming soon!')}
              >
                Forgot password?
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
