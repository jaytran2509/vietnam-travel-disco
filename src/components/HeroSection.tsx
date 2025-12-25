import { MagnifyingGlass, TrendUp, Users, Star, CaretDown } from '@phosphor-icons/react'
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
  variant?: 'landing' | 'app'
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryClick,
  variant = 'app',
}: HeroSectionProps) {
  const { t } = useLanguage()

  const categories: { value: VenueCategory; label: string; emoji: string }[] = [
    { value: 'restaurant', label: t.categories.restaurants, emoji: '🍜' },
    { value: 'cafe', label: t.categories.cafes, emoji: '☕' },
    { value: 'attraction', label: t.categories.attractions, emoji: '🏛️' },
  ]

  const stats = [
    { icon: TrendUp, label: '1000+ Destinations', value: '1000+' },
    { icon: Users, label: '50K+ Travelers', value: '50K+' },
    { icon: Star, label: '4.9 Rating', value: '4.9' },
  ]

  return (
    <div className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://cdn.pixabay.com/video/2023/07/17/171885-846738095_large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl px-4 text-center space-y-8 py-12"
      >
        <div className="space-y-6">
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight drop-shadow-2xl">
            <span className="text-gradient-animated inline-block">
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
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-white/95 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg"
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
          <div className="relative group glassmorphism rounded-2xl p-2 shadow-2xl border border-white/30 backdrop-blur-xl">
            <div className="relative">
              <MagnifyingGlass className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/60 transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110 z-10" weight="bold" />
              <Input
                placeholder={t.hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-14 pr-6 h-14 text-[15px] bg-white/95 backdrop-blur-sm border-0 shadow-none transition-all duration-300 focus-visible:ring-0 focus-visible:bg-white rounded-xl font-medium text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
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
                      'cursor-pointer px-4 py-2 text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm',
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
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-2"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{ 
                opacity: { duration: 0.5, delay: 1 + index * 0.1 },
                y: { duration: 3, delay: 1 + index * 0.1, repeat: Infinity, ease: "easeInOut" }
              }}
              className="flex items-center gap-2.5 glassmorphism px-4 py-2.5 rounded-full shadow-lg border border-white/20 backdrop-blur-xl"
            >
              <stat.icon className="h-4 w-4 text-white flex-shrink-0" weight="bold" />
              <div className="text-left">
                <div className="text-white font-bold text-sm leading-none mb-0.5">{stat.value}</div>
                <div className="text-white/80 text-xs font-medium leading-none">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="pt-6"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/80 text-sm font-medium flex flex-col items-center gap-2"
          >
            <span>Scroll to explore</span>
            <CaretDown weight="bold" className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
