import { useState } from 'react'
import { MagnifyingGlass, Star, ArrowRight } from '@phosphor-icons/react'
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
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-primary tracking-tight">Vietnam Travel</h1>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button 
                onClick={onGetStarted} 
                className="font-semibold px-5 text-[15px] h-10 rounded-lg"
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-primary">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&h=1080&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/20" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-white font-bold mb-5 text-4xl md:text-5xl lg:text-[56px] max-w-4xl mx-auto leading-[1.1] tracking-tight">
            Discover Authentic Vietnam
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
            Find the best restaurants, cafes, and attractions recommended by travelers
          </p>
          
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-2 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 pl-4">
              <MagnifyingGlass className="h-5 w-5 text-muted-foreground flex-shrink-0" weight="bold" />
              <Input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] placeholder:text-muted-foreground h-12 font-medium text-foreground"
              />
            </div>
            <Button 
              className="font-semibold px-8 h-12 rounded-lg text-[15px]"
              onClick={onGetStarted}
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 tracking-tight">
            Explore by category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div 
                key={category.name}
                className="group cursor-pointer"
                onClick={onGetStarted}
              >
                <div className="aspect-square overflow-hidden rounded-xl mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
                  />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2 tracking-tight">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 tracking-tight">
            Popular places
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlaces.map((place) => (
              <div 
                key={place.id}
                className="bg-white border border-border rounded-xl overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={onGetStarted}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-medium">{place.category}</span>
                  </div>
                  <h3 className="font-semibold text-base text-foreground mb-2 line-clamp-1 tracking-tight">
                    {place.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm mb-2">
                    <Star weight="fill" className="h-3.5 w-3.5 text-foreground" />
                    <span className="font-semibold text-foreground">{place.rating}</span>
                    <span className="text-muted-foreground">({place.reviews})</span>
                  </div>
                  <div className="text-[15px] text-muted-foreground">
                    <span className="font-semibold text-foreground">{place.price}</span> · {place.cuisine}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button 
              variant="outline"
              className="font-semibold px-8 h-11 rounded-xl text-[15px]"
              onClick={onGetStarted}
            >
              Show all places
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 tracking-tight">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-8 text-center border border-border">
                <div className="text-4xl md:text-[44px] font-bold text-foreground mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-[15px] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 tracking-tight">
            What travelers say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} weight="fill" className="h-4 w-4 text-primary" />
                  ))}
                </div>
                <p className="text-foreground text-[15px] mb-5 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-[15px] text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.flag} {testimonial.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Start exploring Vietnam today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of travelers discovering amazing places
          </p>
          <Button 
            onClick={onGetStarted}
            className="font-semibold px-10 h-12 text-[15px] rounded-xl"
          >
            Get Started - It's Free <ArrowRight className="ml-2 h-5 w-5" weight="bold" />
          </Button>
          <p className="text-muted-foreground text-sm mt-4 font-medium">
            No credit card required
          </p>
        </div>
      </section>

      <footer className="bg-white border-t border-border py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4 text-base tracking-tight">Vietnam Travel</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Discover authentic Vietnam
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Explore</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={onGetStarted} className="hover:text-foreground transition-colors">Browse</button></li>
                <li><button onClick={onGetStarted} className="hover:text-foreground transition-colors">Map</button></li>
                <li><button onClick={onGetStarted} className="hover:text-foreground transition-colors">Favorites</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors">About</button></li>
                <li><button className="hover:text-foreground transition-colors">Contact</button></li>
                <li><button className="hover:text-foreground transition-colors">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-foreground transition-colors">Facebook</button></li>
                <li><button className="hover:text-foreground transition-colors">Instagram</button></li>
                <li><button className="hover:text-foreground transition-colors">Twitter</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Vietnam Travel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
