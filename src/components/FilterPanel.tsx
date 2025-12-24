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
    <ScrollArea className="h-full max-h-[calc(100vh-8rem)]">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 space-y-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-bold text-foreground">{t.filters.title}</h3>
          {hasActiveFilters && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearFilters} 
                className="h-8 text-sm hover:text-primary transition-colors font-semibold"
              >
                {t.filters.clearAll}
              </Button>
            </motion.div>
          )}
        </div>

        <Separator className="bg-border/50" />

        <div className="space-y-4">
          <Label className="text-base font-bold text-foreground">{t.filters.categories}</Label>
          <div className="space-y-3">
            {categories.map((category, index) => (
              <motion.div 
                key={category.value} 
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <Checkbox
                  id={`category-${category.value}`}
                  checked={filters.categories.includes(category.value)}
                  onCheckedChange={() => toggleCategory(category.value)}
                  className="h-5 w-5"
                />
                <Label
                  htmlFor={`category-${category.value}`}
                  className="text-sm font-medium cursor-pointer text-foreground hover:text-primary transition-colors flex-1"
                >
                  {category.label}
                </Label>
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-bold text-foreground">{t.filters.priceRange}</Label>
            <div className="flex gap-1">
              {Array.from({ length: filters.priceRange[1] - filters.priceRange[0] + 1 }, (_, i) =>
                '$'.repeat(filters.priceRange[0] + i)
              ).map((price, i) => (
                <Badge key={i} variant="secondary" className="text-xs px-2 py-1 gradient-gold text-white border-0 font-bold shadow-sm">
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

        <Separator className="bg-border/50" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-bold text-foreground">{t.filters.minRating}</Label>
            <Badge variant="secondary" className="text-xs px-3 py-1 gradient-accent text-white border-0 font-bold shadow-sm">
              {filters.minRating}+ {t.filters.stars}
            </Badge>
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

        <Separator className="bg-border/50" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-bold text-foreground">{t.filters.distance}</Label>
            <Badge variant="secondary" className="text-xs px-3 py-1 gradient-primary text-white border-0 font-bold shadow-sm">
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

        <Separator className="bg-border/50" />

        <div className="space-y-4">
          <Label className="text-base font-bold text-foreground">{t.filters.availability}</Label>
          <div className="space-y-3">
            <motion.div 
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Checkbox
                id="open-now"
                checked={filters.openNow}
                onCheckedChange={(checked) => updateFilters({ openNow: !!checked })}
                className="h-5 w-5"
              />
              <Label htmlFor="open-now" className="text-sm font-medium cursor-pointer text-foreground hover:text-primary transition-colors flex-1">
                {t.filters.openNow}
              </Label>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Checkbox
                id="open-24"
                checked={filters.open24Hours}
                onCheckedChange={(checked) => updateFilters({ open24Hours: !!checked })}
                className="h-5 w-5"
              />
              <Label htmlFor="open-24" className="text-sm font-medium cursor-pointer text-foreground hover:text-primary transition-colors flex-1">
                {t.filters.open24Hours}
              </Label>
            </motion.div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        <div className="space-y-4">
          <Label className="text-base font-bold text-foreground">{t.filters.dietary}</Label>
          <div className="space-y-3">
            {dietaryOptions.map((option, index) => (
              <motion.div 
                key={option.value}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <Checkbox
                  id={`dietary-${option.value}`}
                  checked={filters.dietary.includes(option.value)}
                  onCheckedChange={() => toggleDietary(option.value)}
                  className="h-5 w-5"
                />
                <Label
                  htmlFor={`dietary-${option.value}`}
                  className="text-sm font-medium cursor-pointer text-foreground hover:text-primary transition-colors flex-1"
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
