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
      className="relative h-[280px] md:h-[320px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/90 to-primary"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600)',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl px-4 text-center space-y-5">
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-sm md:text-base text-white/95 drop-shadow-md max-w-xl mx-auto">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-2.5">
          <div className="relative group bg-white rounded-lg p-0.5 shadow-lg">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60 transition-colors group-focus-within:text-primary z-10" />
              <Input
                placeholder={t.hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 pr-3 h-10 text-sm bg-white border-0 shadow-none transition-all duration-200 focus-visible:ring-0 rounded-md"
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
                    'cursor-pointer px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 shadow-sm',
                    isSelected 
                      ? 'bg-white text-primary border-0 hover:bg-white/95' 
                      : 'bg-white/90 text-foreground border-0 hover:bg-white'
                  )}
                  onClick={() => onCategoryClick(category.value)}
                >
                  <span className="mr-1 text-xs">{category.emoji}</span>
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
