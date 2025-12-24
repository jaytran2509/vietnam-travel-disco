import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'
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
    <div className="relative h-[380px] md:h-[460px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1600)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl px-4 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {t.hero.title}
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-3">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.hero.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-11 text-sm bg-white/95 backdrop-blur-sm border-0 shadow-xl"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.value)
              return (
                <Badge
                  key={category.value}
                  variant={isSelected ? 'default' : 'secondary'}
                  className="cursor-pointer px-3 py-1 text-xs bg-white/90 backdrop-blur-sm hover:bg-white transition-all hover:scale-105"
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
