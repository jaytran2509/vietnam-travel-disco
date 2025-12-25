import { MagnifyingGlass, TrendUp, Users, Star } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'
import type { VenueCategory } from '@/lib/types'
import { cn } from '@/lib/utils'

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

  const categories: { value: VenueCategory; label: string; emoji: string }[] = [
    { value: 'restaurant', label: t.categories.restaurants, emoji: '🍜' },
    { value: 'cafe', label: t.categories.cafes, emoji: '☕' },
    { value: 'attraction', label: t.categories.attractions, emoji: '🏛️' },
  ]

  const stats = [
    { icon: Star, label: '500+ Places', value: '500+' },
    { icon: Users, label: '50K Travelers', value: '50K+' },
    { icon: TrendUp, label: '4.8 Rating', value: '4.8' },
  ]

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-accent animate-gradient">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&h=1080&fit=crop&q=90)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl px-4 text-center space-y-8 py-12"
      >
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight drop-shadow-lg"
          >
            {t.hero.title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow"
          >
            {t.hero.subtitle}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <div className="relative group glassmorphism rounded-2xl p-2 shadow-2xl border border-white/30">
            <div className="relative">
              <MagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-foreground/60 transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110 z-10" weight="bold" />
              <Input
                placeholder={t.hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-14 pr-6 h-16 text-base bg-white/90 backdrop-blur-sm border-0 shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:bg-white rounded-xl font-medium text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.value)
              return (
                <motion.div
                  key={category.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={isSelected ? 'default' : 'secondary'}
                    className={cn(
                      'cursor-pointer px-5 py-2.5 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm',
                      isSelected 
                        ? 'bg-white text-primary border-0 hover:bg-white/95' 
                        : 'bg-white/90 text-text-body border-0 hover:bg-white hover:text-text-dark'
                    )}
                    onClick={() => onCategoryClick(category.value)}
                  >
                    <span className="mr-2 text-base">{category.emoji}</span>
                    {category.label}
                  </Badge>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pt-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="flex items-center gap-3 glassmorphism px-5 py-3 rounded-full shadow-lg border border-white/20"
            >
              <stat.icon className="h-5 w-5 text-white" weight="bold" />
              <div className="text-left">
                <div className="text-white font-bold text-sm">{stat.value}</div>
                <div className="text-white/80 text-xs font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="pt-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/70 text-sm font-medium flex flex-col items-center gap-2"
          >
            <span>Scroll to explore</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce">
              <path d="M10 15L5 10L6.5 8.5L10 12L13.5 8.5L15 10L10 15Z" fill="currentColor"/>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
