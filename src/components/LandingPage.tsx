import { useState } from 'react'
import { MagnifyingGlass, Star, ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      name: t.categories.restaurants,
      description: 'Authentic Vietnamese cuisine from street food to fine dining',
      image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&h=600&fit=crop'
    },
    {
      name: t.categories.cafes,
      description: 'Trendy coffee shops and cozy tea houses across Vietnam',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=600&fit=crop'
    },
    {
      name: t.categories.attractions,
      description: 'Historic temples, museums, and must-see landmarks',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=600&fit=crop'
    }
  ]

  const featuredPlaces = [
    {
      id: '1',
      name: 'Phở Hà Nội',
      category: 'Restaurant',
      rating: 4.8,
      reviews: 234,
      price: '$$',
      cuisine: 'Vietnamese',
      image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Bánh Mì Huỳnh Hoa',
      category: 'Restaurant',
      rating: 4.9,
      reviews: 567,
      price: '$',
      cuisine: 'Street Food',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Cộng Cà Phê',
      category: 'Cafe',
      rating: 4.7,
      reviews: 445,
      price: '$',
      cuisine: 'Vietnamese Coffee',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop'
    },
    {
      id: '4',
      name: 'Ben Thanh Market',
      category: 'Attraction',
      rating: 4.5,
      reviews: 2345,
      price: 'Free',
      cuisine: 'Shopping',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop'
    }
  ]

  const steps = [
    {
      number: 1,
      title: 'Browse & Discover',
      description: 'Explore curated places with authentic reviews and stunning photos'
    },
    {
      number: 2,
      title: 'Read Reviews',
      description: 'Learn from real travelers about their experiences'
    },
    {
      number: 3,
      title: 'Save & Visit',
      description: 'Bookmark favorites and get directions to start exploring'
    }
  ]

  const stats = [
    { value: '500+', label: 'Verified Places' },
    { value: '12K+', label: 'Reviews' },
    { value: '50K+', label: 'Travelers' },
    { value: '15', label: 'Cities' }
  ]

  const testimonials = [
    {
      rating: 5,
      text: 'This app helped me find the most authentic pho place in Hanoi. The reviews were spot on and directions were perfect!',
      name: 'Sarah Johnson',
      country: 'USA',
      flag: '🇺🇸',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      rating: 5,
      text: 'I discovered hidden gem cafes I would have never found on my own. Saved all my favorites for next visit.',
      name: 'James Wilson',
      country: 'UK',
      flag: '🇬🇧',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      rating: 5,
      text: 'The best travel companion! Detailed info, great filters, and the map view made planning my days so easy.',
      name: 'Emma Brown',
      country: 'Australia',
      flag: '🇦🇺',
      avatar: 'https://i.pravatar.cc/150?img=5'
    }
  ]

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white border-b border-border"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-semibold text-primary tracking-tight"
            >
              Vietnam Travel
            </motion.h1>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={onGetStarted} 
                  className="font-medium px-4 text-sm h-9 rounded-lg"
                >
                  Sign up
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary to-accent animate-gradient">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&h=1080&fit=crop&q=90)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-title text-white font-bold mb-4 text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto leading-tight tracking-tight drop-shadow-lg"
          >
            Discover Authentic Vietnam
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/95 text-base md:text-lg mb-8 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow"
          >
            Find the best restaurants, cafes, and attractions recommended by travelers
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-1.5 flex items-center gap-2 border border-border"
          >
            <div className="flex-1 flex items-center gap-2 pl-3">
              <MagnifyingGlass className="h-5 w-5 text-foreground/60 flex-shrink-0" weight="bold" />
              <Input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground h-11 font-normal text-foreground bg-white"
              />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                className="font-medium px-6 h-11 rounded-lg text-sm"
                onClick={onGetStarted}
              >
                Search
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-10"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/70 text-xs font-medium flex flex-col items-center gap-1.5"
            >
              <span>Scroll to explore</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="animate-bounce">
                <path d="M10 15L5 10L6.5 8.5L10 12L13.5 8.5L15 10L10 15Z" fill="currentColor"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 tracking-tight"
          >
            Explore by category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
                onClick={onGetStarted}
              >
                <div className="aspect-square overflow-hidden rounded-xl mb-3 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <h3 className="font-semibold text-base text-foreground mb-1.5 tracking-tight group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10 tracking-tight"
          >
            Popular places
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer group"
                onClick={onGetStarted}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground font-medium">{place.category}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-1 tracking-tight group-hover:text-primary transition-colors">
                    {place.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs mb-2">
                    <Star weight="fill" className="h-3.5 w-3.5 text-accent" />
                    <span className="font-semibold text-foreground">{place.rating}</span>
                    <span className="text-muted-foreground">({place.reviews})</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{place.price}</span> · {place.cuisine}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline"
                className="font-medium px-8 h-10 rounded-lg text-sm hover:border-primary hover:text-primary transition-all duration-300"
                onClick={onGetStarted}
              >
                Show all places
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8 tracking-tight">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-6 text-center border border-border">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1.5 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8 tracking-tight">
            What travelers say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white border border-border rounded-lg p-5"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} weight="fill" className="h-3.5 w-3.5 text-primary" />
                  ))}
                </div>
                <p className="text-foreground text-sm mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-2.5">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.flag} {testimonial.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            Start exploring Vietnam today
          </h2>
          <p className="text-muted-foreground text-base mb-6 max-w-2xl mx-auto leading-relaxed">
            Join thousands of travelers discovering amazing places
          </p>
          <Button 
            onClick={onGetStarted}
            className="font-medium px-8 h-10 text-sm rounded-lg"
          >
            Get Started - It's Free <ArrowRight className="ml-1.5 h-4 w-4" weight="bold" />
          </Button>
          <p className="text-muted-foreground text-xs mt-3 font-medium">
            No credit card required
          </p>
        </div>
      </section>

      <footer className="bg-white border-t border-border py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-foreground mb-3 text-sm tracking-tight">Vietnam Travel</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Discover authentic Vietnam
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2.5 text-xs">Explore</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><button onClick={onGetStarted} className="hover:text-foreground transition-colors">Browse</button></li>
                <li><button onClick={onGetStarted} className="hover:text-foreground transition-colors">Map</button></li>
                <li><button onClick={onGetStarted} className="hover:text-foreground transition-colors">Favorites</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2.5 text-xs">Company</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors">About</button></li>
                <li><button className="hover:text-foreground transition-colors">Contact</button></li>
                <li><button className="hover:text-foreground transition-colors">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2.5 text-xs">Connect</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors">Facebook</button></li>
                <li><button className="hover:text-foreground transition-colors">Instagram</button></li>
                <li><button className="hover:text-foreground transition-colors">Twitter</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center">
            <p className="text-muted-foreground text-xs">
              © 2024 Vietnam Travel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
