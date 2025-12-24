import { MagnifyingGlass } from '@phosphor-icons/react'
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

  return (
    <div 
      className="relative h-[320px] md:h-[360px] flex items-center justify-center overflow-hidden bg-primary"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/20" />

      <div className="relative z-10 w-full max-w-3xl px-4 text-center space-y-6">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.15] tracking-tight">
            {t.hero.title}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto font-medium leading-relaxed">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-3">
          <div className="relative group bg-white rounded-xl p-1 shadow-lg">
            <div className="relative">
              <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary z-10" weight="bold" />
              <Input
                placeholder={t.hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-11 pr-4 h-12 text-[15px] bg-white border-0 shadow-none transition-all duration-200 focus-visible:ring-0 rounded-lg font-medium text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.value)
              return (
                <Badge
                  key={category.value}
                  variant={isSelected ? 'default' : 'secondary'}
                  className={cn(
                    'cursor-pointer px-3 py-1.5 text-sm font-semibold transition-all duration-200 shadow-sm',
                    isSelected 
                      ? 'bg-white text-primary border-0 hover:bg-white/95 hover:shadow' 
                      : 'bg-white/95 text-text-body border-0 hover:bg-white hover:text-text-dark'
                  )}
                  onClick={() => onCategoryClick(category.value)}
                >
                  <span className="mr-1.5 text-sm">{category.emoji}</span>
                  {category.label}
                </Badge>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
