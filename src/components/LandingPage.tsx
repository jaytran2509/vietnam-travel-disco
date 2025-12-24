import { useState } from 'react'
import { MagnifyingGlass, MapPin, Star, ArrowRight, Users } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      name: 'Restaurants',
      description: 'Authentic Vietnamese cuisine from street food to fine dining',
      image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&h=600&fit=crop'
    },
    {
      name: 'Cafes',
      description: 'Trendy coffee shops and cozy tea houses across Vietnam',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=600&fit=crop'
    },
    {
      name: 'Attractions',
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
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-lg font-bold text-foreground">VietnamTravel</h1>
            <Button onClick={onGetStarted} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-5 text-sm h-9">
              Sign up
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&h=1080&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-white font-bold mb-5 text-4xl md:text-5xl max-w-4xl mx-auto">
            Discover Authentic Vietnam
          </h1>
          <p className="text-white text-lg mb-10 max-w-2xl mx-auto">
            Find the best restaurants, cafes, and attractions recommended by travelers
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-search flex items-center p-1.5">
              <MagnifyingGlass className="text-text-light ml-3 flex-shrink-0" size={18} />
              <Input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0 text-sm h-11"
              />
              <Button 
                onClick={onGetStarted}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 text-sm rounded-lg flex-shrink-0 h-11"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-10 text-2xl">Explore by category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={onGetStarted}
                className="group text-left"
              >
                <div className="card-minimal overflow-hidden transition-all duration-200 hover:border-foreground hover:shadow-card-hover">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-1.5">{category.name}</h3>
                    <p className="text-text-body text-sm leading-snug">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-bg">
        <div className="container mx-auto px-6">
          <h2 className="mb-10 text-2xl">Popular places</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {featuredPlaces.map((place) => (
              <div key={place.id} className="card-minimal overflow-hidden bg-white">
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={place.image} 
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute top-2.5 right-2.5 p-1.5 bg-white rounded-full shadow-card hover:scale-110 transition-transform">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <MapPin size={12} className="text-text-light" />
                    <span className="text-text-light text-xs">{place.category}</span>
                  </div>
                  <h3 className="font-semibold mb-1.5 text-sm">{place.name}</h3>
                  <div className="flex items-center gap-1 mb-1.5">
                    <Star size={13} weight="fill" className="text-foreground" />
                    <span className="font-semibold text-xs">{place.rating}</span>
                    <span className="text-text-body text-xs">({place.reviews})</span>
                  </div>
                  <p className="text-text-body text-xs">{place.price} • {place.cuisine}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              onClick={onGetStarted}
              variant="outline" 
              className="font-semibold px-6 text-sm h-9 border-foreground text-foreground hover:bg-foreground hover:text-white"
            >
              Show all places
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-12 text-2xl">How it works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-text-body text-sm leading-snug">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-bg">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-card">
                <div className="font-bold text-3xl mb-1.5">{stat.value}</div>
                <div className="text-text-body text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center mb-10 text-2xl">What travelers say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-minimal bg-white p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} weight="fill" className="text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-snug text-sm">{testimonial.text}</p>
                <div className="flex items-center gap-2.5">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-xs">{testimonial.name}</div>
                    <div className="text-text-body text-xs">{testimonial.flag} {testimonial.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#FFF5F5] text-center">
        <div className="container mx-auto px-6">
          <h2 className="mb-3 text-2xl">Start exploring Vietnam today</h2>
          <p className="text-base text-text-body mb-6">Join thousands of travelers discovering amazing places</p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-11 text-sm"
          >
            Get Started - It's Free
            <ArrowRight size={18} className="ml-2" />
          </Button>
          <p className="text-text-light text-xs mt-3">No credit card required</p>
        </div>
      </section>

      <footer className="border-t border-border bg-white py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-base mb-3">VietnamTravel</h3>
              <p className="text-text-body text-xs">Discover authentic Vietnamese experiences</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Explore</h4>
              <ul className="space-y-1.5 text-text-body text-xs">
                <li><button onClick={onGetStarted} className="hover:text-foreground">Browse</button></li>
                <li><button onClick={onGetStarted} className="hover:text-foreground">Map</button></li>
                <li><button onClick={onGetStarted} className="hover:text-foreground">Favorites</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Company</h4>
              <ul className="space-y-1.5 text-text-body text-xs">
                <li><button className="hover:text-foreground">About</button></li>
                <li><button className="hover:text-foreground">Contact</button></li>
                <li><button className="hover:text-foreground">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Connect</h4>
              <div className="flex gap-2.5">
                <button className="w-8 h-8 rounded-full border border-border hover:border-foreground flex items-center justify-center">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full border border-border hover:border-foreground flex items-center justify-center">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </button>
                <button className="w-8 h-8 rounded-full border border-border hover:border-foreground flex items-center justify-center">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
              </div>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-border">
            <p className="text-text-light text-xs">© 2024 VietnamTravel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
