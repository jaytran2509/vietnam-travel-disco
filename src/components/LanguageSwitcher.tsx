import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Language } from '@/lib/i18n'

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-muted transition-all duration-300">
            <span className="text-lg">{currentLanguage?.flag}</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white border border-border-light rounded-xl shadow-lg min-w-[180px] animate-scale-in p-1"
      >
        {languages.map((lang, index) => (
          <motion.div
            key={lang.code}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <DropdownMenuItem
              onClick={() => setLanguage(lang.code)}
              className="text-sm cursor-pointer text-text-dark hover:bg-bg-gray hover:text-text-dark transition-all duration-200 rounded-lg px-3 py-2.5 focus:bg-bg-gray focus:text-text-dark"
            >
              <span className="mr-3 text-lg">{lang.flag}</span>
              <span className="flex-1 font-medium">{lang.name}</span>
              {language === lang.code && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-primary font-bold text-base"
                >
                  ✓
                </motion.span>
              )}
            </DropdownMenuItem>
          </motion.div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
