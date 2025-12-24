import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import type { VenueCategory } from '@/lib/types'

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-[380px] md:h-[460px] flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl px-4 text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
            {t.hero.title}
          </h1>
          <p className="text-sm md:text-base text-white drop-shadow-lg max-w-xl mx-auto">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-xl mx-auto space-y-3"
        >
          <div className="relative group">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60 transition-colors group-focus-within:text-primary" />
            <Input
              placeholder={t.hero.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-11 text-sm bg-white backdrop-blur-sm border-0 shadow-xl transition-all duration-300 focus:shadow-2xl focus:scale-[1.02]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category, index) => {
              const isSelected = selectedCategories.includes(category.value)
              return (
                <motion.div
                  key={category.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <Badge
                    variant={isSelected ? 'default' : 'secondary'}
                    className="cursor-pointer px-3 py-1.5 text-xs bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110 hover:shadow-lg text-foreground font-medium border border-transparent hover:border-primary/20"
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
