import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
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

  return (
    <ScrollArea className="h-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="p-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-semibold text-foreground">{t.filters.title}</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-7 text-xs hover:text-primary transition-colors">
              {t.filters.clearAll}
            </Button>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">{t.filters.categories}</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <motion.div 
                key={category.value} 
                className="flex items-center space-x-2"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <Checkbox
                  id={`category-${category.value}`}
                  checked={filters.categories.includes(category.value)}
                  onCheckedChange={() => toggleCategory(category.value)}
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={`category-${category.value}`}
                  className="text-xs font-normal cursor-pointer text-foreground hover:text-primary transition-colors"
                >
                  {category.label}
                </Label>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground">{t.filters.priceRange}</Label>
            <div className="flex gap-0.5">
              {Array.from({ length: filters.priceRange[1] - filters.priceRange[0] + 1 }, (_, i) =>
                '$'.repeat(filters.priceRange[0] + i)
              ).map((price, i) => (
                <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground font-medium">
                  {price}
                </Badge>
              ))}
            </div>
          </div>
          <Slider
            min={1}
            max={4}
            step={1}
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            className="w-full"
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground">{t.filters.minRating}</Label>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground font-medium">{filters.minRating}+ {t.filters.stars}</Badge>
          </div>
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={[filters.minRating]}
            onValueChange={(value) => updateFilters({ minRating: value[0] })}
            className="w-full"
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground">{t.filters.distance}</Label>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-secondary text-secondary-foreground font-medium">
              {filters.maxDistance >= 50 ? t.filters.any : `${filters.maxDistance}km`}
            </Badge>
          </div>
          <Slider
            min={1}
            max={50}
            step={1}
            value={[filters.maxDistance]}
            onValueChange={(value) => updateFilters({ maxDistance: value[0] })}
            className="w-full"
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">{t.filters.availability}</Label>
          <div className="space-y-2">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <Checkbox
                id="open-now"
                checked={filters.openNow}
                onCheckedChange={(checked) => updateFilters({ openNow: checked as boolean })}
                className="h-4 w-4"
              />
              <Label htmlFor="open-now" className="text-xs font-normal cursor-pointer text-foreground hover:text-primary transition-colors">
                {t.filters.openNow}
              </Label>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <Checkbox
                id="open-24h"
                checked={filters.open24Hours}
                onCheckedChange={(checked) => updateFilters({ open24Hours: checked as boolean })}
                className="h-4 w-4"
              />
              <Label htmlFor="open-24h" className="text-xs font-normal cursor-pointer text-foreground hover:text-primary transition-colors">
                {t.filters.open24Hours}
              </Label>
            </motion.div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">{t.filters.dietary}</Label>
          <div className="space-y-2">
            {dietaryOptions.map((option) => (
              <motion.div 
                key={option.value} 
                className="flex items-center space-x-2"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <Checkbox
                  id={`dietary-${option.value}`}
                  checked={filters.dietary.includes(option.value)}
                  onCheckedChange={() => toggleDietary(option.value)}
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={`dietary-${option.value}`}
                  className="text-xs font-normal cursor-pointer text-foreground hover:text-primary transition-colors"
                >
                  {option.label}
                </Label>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </ScrollArea>
  )
}
