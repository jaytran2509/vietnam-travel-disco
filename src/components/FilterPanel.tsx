import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Star } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { SearchFilters, VenueCategory, DietaryPreference } from '@/lib/types'

interface FilterPanelProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  onClearFilters: () => void
}

export function FilterPanel({ filters, onFiltersChange, onClearFilters }: FilterPanelProps) {
  const { t } = useLanguage()

  const categories: { value: VenueCategory; label: string }[] = [
    { value: 'restaurant', label: t.categories.restaurants },
    { value: 'cafe', label: t.categories.cafes },
    { value: 'attraction', label: t.categories.attractions },
  ]

  const dietaryOptions: { value: DietaryPreference; label: string }[] = [
    { value: 'vegetarian', label: t.filters.vegetarian },
    { value: 'vegan', label: t.filters.vegan },
    { value: 'halal', label: t.filters.halal },
  ]

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleCategory = (category: VenueCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    updateFilters({ categories: newCategories })
  }

  const toggleDietary = (dietary: DietaryPreference) => {
    const newDietary = filters.dietary.includes(dietary)
      ? filters.dietary.filter((d) => d !== dietary)
      : [...filters.dietary, dietary]
    updateFilters({ dietary: newDietary })
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 1 ||
    filters.priceRange[1] < 4 ||
    filters.minRating > 0 ||
    filters.maxDistance < 50 ||
    filters.openNow ||
    filters.open24Hours ||
    filters.dietary.length > 0

  const priceLabels = ['$', '$$', '$$$', '$$$$']

  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-dark">{t.filters.title}</h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters} 
              className="text-xs text-text-body hover:text-text-dark underline h-8 px-2"
            >
              {t.filters.clearAll}
            </Button>
          )}
        </div>

        <Separator className="bg-border-light" />

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-text-dark">{t.filters.categories}</Label>
          <div className="space-y-2.5">
            {categories.map((category) => (
              <div 
                key={category.value} 
                className="flex items-center space-x-2.5"
              >
                <Checkbox
                  id={`category-${category.value}`}
                  checked={filters.categories.includes(category.value)}
                  onCheckedChange={() => toggleCategory(category.value)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary h-4 w-4"
                />
                <label
                  htmlFor={`category-${category.value}`}
                  className="text-sm text-text-dark cursor-pointer flex-1"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border-light" />

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-text-dark">{t.filters.priceRange}</Label>
          <div className="space-y-3">
            <Slider
              min={1}
              max={4}
              step={1}
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
              className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
            />
            <div className="flex justify-between text-sm text-text-body">
              <span>{priceLabels[filters.priceRange[0] - 1]}</span>
              <span>{priceLabels[filters.priceRange[1] - 1]}</span>
            </div>
          </div>
        </div>

        <Separator className="bg-border-light" />

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-text-dark">{t.filters.minRating}</Label>
          <div className="grid grid-cols-2 gap-2">
            {[0, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => updateFilters({ minRating: rating })}
                className={`
                  flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border transition-all text-sm
                  ${filters.minRating === rating 
                    ? 'border-text-dark bg-bg-gray' 
                    : 'border-border-medium hover:border-text-dark'
                  }
                `}
              >
                {rating === 0 ? (
                  <span className="text-text-body">{t.filters.any}</span>
                ) : (
                  <>
                    <Star weight="fill" className="h-3.5 w-3.5" />
                    <span className="font-medium">{rating}+</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        <Separator className="bg-border-light" />

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-text-dark">{t.filters.availability}</Label>
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2.5">
              <Checkbox
                id="open-now"
                checked={filters.openNow}
                onCheckedChange={(checked) => updateFilters({ openNow: checked as boolean })}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary h-4 w-4"
              />
              <label
                htmlFor="open-now"
                className="text-sm text-text-dark cursor-pointer flex-1"
              >
                {t.filters.openNow}
              </label>
            </div>
            <div className="flex items-center space-x-2.5">
              <Checkbox
                id="open-24"
                checked={filters.open24Hours}
                onCheckedChange={(checked) => updateFilters({ open24Hours: checked as boolean })}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary h-4 w-4"
              />
              <label
                htmlFor="open-24"
                className="text-sm text-text-dark cursor-pointer flex-1"
              >
                {t.filters.open24Hours}
              </label>
            </div>
          </div>
        </div>

        <Separator className="bg-border-light" />

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-text-dark">{t.filters.dietary}</Label>
          <div className="space-y-2.5">
            {dietaryOptions.map((option) => (
              <div 
                key={option.value} 
                className="flex items-center space-x-2.5"
              >
                <Checkbox
                  id={`dietary-${option.value}`}
                  checked={filters.dietary.includes(option.value)}
                  onCheckedChange={() => toggleDietary(option.value)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary h-4 w-4"
                />
                <label
                  htmlFor={`dietary-${option.value}`}
                  className="text-sm text-text-dark cursor-pointer flex-1"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
