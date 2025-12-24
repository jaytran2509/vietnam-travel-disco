import { MagnifyingGlass, Sparkle } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import type { VenueCategory } from '@/lib/types'
import { useEffect, useState } from 'react'

interface HeroSectionProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategories: VenueCategory[]
  onCategoryClick: (category: VenueCategory) => void
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryClick,
}: HeroSectionProps) {
  const { t } = useLanguage()
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number; duration: number }[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [])

  const categories: { value: VenueCategory; label: string; emoji: string }[] = [
    { value: 'restaurant', label: t.categories.restaurants, emoji: '🍜' },
    { value: 'cafe', label: t.categories.cafes, emoji: '☕' },
    { value: 'attraction', label: t.categories.attractions, emoji: '🏛️' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 gradient-primary animate-gradient" />
      
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600)',
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-4xl px-4 text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-3"
          >
            <Sparkle className="h-6 w-6 text-white/80" weight="fill" />
          </motion.div>
          
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white drop-shadow-2xl leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-sm md:text-base text-white/90 drop-shadow-lg max-w-2xl mx-auto font-medium">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <div className="relative group glass-strong rounded-xl p-1 shadow-2xl">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60 transition-colors group-focus-within:text-primary z-10" />
              <Input
                placeholder={t.hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-3 h-11 text-sm bg-white/95 backdrop-blur-sm border-0 shadow-lg transition-all duration-300 focus:shadow-2xl focus:bg-white rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category, index) => {
              const isSelected = selectedCategories.includes(category.value)
              return (
                <motion.div
                  key={category.value}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={isSelected ? 'default' : 'secondary'}
                    className={`
                      cursor-pointer px-3 py-1.5 text-xs font-semibold
                      transition-all duration-300 shadow-lg
                      ${isSelected 
                        ? 'gradient-accent text-white border-0 animate-pulse' 
                        : 'glass-strong text-foreground border-white/30 hover:border-white/60'
                      }
                    `}
                    onClick={() => onCategoryClick(category.value)}
                  >
                    <span className="mr-1.5 text-sm">{category.emoji}</span>
                    {category.label}
                  </Badge>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
