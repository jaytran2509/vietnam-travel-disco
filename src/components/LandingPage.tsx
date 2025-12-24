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
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white border-b border-border-light">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-lg font-bold text-primary">Vietnam Travel</h1>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button 
                onClick={onGetStarted} 
                className="bg-primary text-white hover:bg-primary-hover font-medium px-4 text-sm h-9 rounded-lg transition-colors duration-200"
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&h=1080&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-white font-bold mb-4 text-3xl md:text-4xl max-w-3xl mx-auto leading-tight">
            Discover Authentic Vietnam
          </h1>
          <p className="text-white/90 text-base md:text-lg mb-6 max-w-2xl mx-auto">
            Find the best restaurants, cafes, and attractions recommended by travelers
          </p>
          
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-1.5 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 pl-3">
              <MagnifyingGlass className="h-4 w-4 text-text-body flex-shrink-0" />
              <Input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-text-body h-10"
              />
            </div>
            <Button 
              className="bg-primary hover:bg-primary-hover text-white font-medium px-6 h-10 rounded-md transition-colors duration-200 text-sm"
              onClick={onGetStarted}
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark text-center mb-8">
            Explore by category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categories.map((category) => (
              <div 
                key={category.name}
                className="group cursor-pointer"
                onClick={onGetStarted}
              >
                <div className="aspect-square overflow-hidden rounded-xl mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
                  />
                </div>
                <h3 className="font-semibold text-base text-text-dark mb-1">
                  {category.name}
                </h3>
                <p className="text-text-body text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-bg-gray">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark text-center mb-8">
            Popular places
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPlaces.map((place) => (
              <div 
                key={place.id}
                className="bg-white border border-border-light rounded-xl overflow-hidden hover:border-text-dark hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={onGetStarted}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-body">{place.category}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-text-dark mb-2 line-clamp-1">
                    {place.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs mb-1">
                    <Star weight="fill" className="h-3 w-3 text-text-dark" />
                    <span className="font-semibold text-text-dark">{place.rating}</span>
                    <span className="text-text-body">({place.reviews})</span>
                  </div>
                  <div className="text-xs text-text-body">
                    <span className="font-medium text-text-dark">{place.price}</span> · {place.cuisine}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              variant="outline"
              className="border-2 border-text-dark text-text-dark hover:bg-bg-gray font-medium px-6 h-10 rounded-lg text-sm"
              onClick={onGetStarted}
            >
              Show all places
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark text-center mb-8">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-text-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-bg-gray">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 text-center border border-border-light">
                <div className="text-3xl md:text-4xl font-bold text-text-dark mb-1">
                  {stat.value}
                </div>
                <div className="text-text-body text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark text-center mb-8">
            What travelers say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white border border-border-light rounded-xl p-5"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} weight="fill" className="h-3.5 w-3.5 text-primary" />
                  ))}
                </div>
                <p className="text-text-dark text-sm mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm text-text-dark">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-text-body">
                      {testimonial.flag} {testimonial.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-accent/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-3">
            Start exploring Vietnam today
          </h2>
          <p className="text-text-body text-base mb-6 max-w-2xl mx-auto">
            Join thousands of travelers discovering amazing places
          </p>
          <Button 
            onClick={onGetStarted}
            className="bg-primary hover:bg-primary-hover text-white font-medium px-8 h-11 text-sm rounded-lg transition-colors duration-200"
          >
            Get Started - It's Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-text-body text-xs mt-3">
            No credit card required
          </p>
        </div>
      </section>

      <footer className="bg-white border-t border-border-light py-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-text-dark mb-3 text-sm">Vietnam Travel</h3>
              <p className="text-text-body text-xs leading-relaxed">
                Discover authentic Vietnam
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text-dark mb-2 text-xs">Explore</h4>
              <ul className="space-y-1.5 text-xs text-text-body">
                <li><button onClick={onGetStarted} className="hover:text-text-dark transition-colors">Browse</button></li>
                <li><button onClick={onGetStarted} className="hover:text-text-dark transition-colors">Map</button></li>
                <li><button onClick={onGetStarted} className="hover:text-text-dark transition-colors">Favorites</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-dark mb-2 text-xs">Company</h4>
              <ul className="space-y-1.5 text-xs text-text-body">
                <li><button className="hover:text-text-dark transition-colors">About</button></li>
                <li><button className="hover:text-text-dark transition-colors">Contact</button></li>
                <li><button className="hover:text-text-dark transition-colors">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-dark mb-2 text-xs">Connect</h4>
              <ul className="space-y-1.5 text-xs text-text-body">
                <li><button className="hover:text-text-dark transition-colors">Facebook</button></li>
                <li><button className="hover:text-text-dark transition-colors">Instagram</button></li>
                <li><button className="hover:text-text-dark transition-colors">Twitter</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border-light pt-6 text-center">
            <p className="text-text-body text-xs">
              © 2024 Vietnam Travel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
