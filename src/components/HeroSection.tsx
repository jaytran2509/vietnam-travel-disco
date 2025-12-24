import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { VenueCategory } from '@/lib/types'

interface HeroSectionProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategories: VenueCategory[]
  onCategoryClick: (category: VenueCategory) => void
}

const categories: { value: VenueCategory; label: string; emoji: string }[] = [
  { value: 'restaurant', label: 'Restaurants', emoji: '🍜' },
  { value: 'cafe', label: 'Cafés', emoji: '☕' },
  { value: 'attraction', label: 'Attractions', emoji: '🏛️' },
]

export function HeroSection({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryClick,
}: HeroSectionProps) {
  return (
    <div className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 w-full max-w-4xl px-6 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Discover Vietnam
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Explore authentic restaurants, trendy cafés, and cultural attractions across Saigon
            and Hanoi
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for places, cuisine, or location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-14 text-base bg-white/95 backdrop-blur-sm border-0 shadow-xl"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.value)
              return (
                <Badge
                  key={category.value}
                  variant={isSelected ? 'default' : 'secondary'}
                  className="cursor-pointer px-4 py-2 text-sm bg-white/90 backdrop-blur-sm hover:bg-white transition-all hover:scale-105"
                  onClick={() => onCategoryClick(category.value)}
                >
                  <span className="mr-2">{category.emoji}</span>
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
