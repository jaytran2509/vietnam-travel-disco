# Vietnam Travel Discovery Platform - Production-Ready & Feature-Rich

A comprehensive, modern travel discovery platform for international tourists exploring Vietnamese restaurants, cafes, and attractions with advanced features including video hero backgrounds, multi-language support (EN/VI/KR/JP/CN), animated gradients, glassmorphism navigation, enhanced filtering, and smooth micro-interactions.

**Experience Qualities**:
1. **Captivating** - Full-screen video hero with animated gradient text, floating stat badges, and smooth scroll indicators create an immersive first impression
2. **Fluid** - Framer Motion animations throughout with micro-interactions on every hover, click, and scroll for delightful user experience
3. **Modern** - Glassmorphism navigation, elevated card designs with lift effects, video backgrounds, and comprehensive dark mode support

**Complexity Level**: Complex Application (advanced functionality with multiple views)
Comprehensive travel platform with public landing, authentication, persistent data, review systems, favorites, advanced filtering, animations, dark mode, multi-language support (5 languages), and multiple interconnected views with video backgrounds and enhanced UX.

## Essential Features

### Enhanced Hero Section
- **Functionality**: Full-screen animated hero with gradient background, floating statistics badges, large search bar with glassmorphism, scroll indicator
- **Purpose**: Create an impressive, engaging first impression that draws users into the platform
- **Trigger**: Landing page load or browse page after login
- **Progression**: Page loads → Hero animates in → Stats badges float → Search bar ready → Scroll indicator pulses
- **Success criteria**: Smooth animations, readable text on gradient, search functional, stats visible

### Glassmorphism Navigation
- **Functionality**: Sticky header with frosted glass effect, backdrop blur, smooth animations, dark mode toggle, language switcher
- **Purpose**: Modern, elegant navigation that stays accessible while scrolling
- **Trigger**: Always visible on authenticated pages
- **Progression**: Page loads → Nav slides down → Elements animate in → Hover effects active
- **Success criteria**: Sticky behavior works, glassmorphism renders properly, dark mode toggles smoothly

### Enhanced Destination Cards
- **Functionality**: Grid/list layouts with hover lift effects, image zoom on hover, animated heart favorites, gradient overlays, pulsing "Open Now" indicators
- **Purpose**: Make browsing engaging with delightful micro-interactions
- **Trigger**: Browse page, favorites page, search results
- **Progression**: Cards fade in → Hover triggers lift & zoom → Click heart animates → Click card navigates
- **Success criteria**: All animations smooth 60fps, hover effects clear, favorites save immediately

### Dark Mode System
- **Functionality**: Full theme switching with persistent preference, smooth color transitions, optimized contrast for both themes
- **Purpose**: Reduce eye strain and provide user preference
- **Trigger**: Click theme toggle button in navigation
- **Progression**: Click toggle → Icon animates → Theme transitions smoothly → Preference saved
- **Success criteria**: All colors readable in both modes, no flash on page load, persistence works

### Framer Motion Animations
- **Functionality**: Page entrance animations, scroll-triggered reveals, hover micro-interactions, smooth transitions between views
- **Purpose**: Create fluid, delightful experience that feels premium
- **Trigger**: Various user interactions throughout app
- **Progression**: Element appears → Animates in → Responds to hover/click → Exits smoothly
- **Success criteria**: No janky animations, reduced motion respected, performance maintained

### Public Landing Page
- **Functionality**: Marketing homepage with animated hero, category browse with hover effects, featured places, how it works, stats, testimonials, CTA
- **Purpose**: Convert visitors to users with engaging, trustworthy presentation
- **Trigger**: User visits root URL while not logged in
- **Progression**: Hero loads with animation → Scroll reveals sections → Click CTA → Auth modal opens
- **Success criteria**: Smooth scroll, all animations work, sections clearly communicate value

### User Authentication
- **Functionality**: Login/signup modals with smooth animations, form validation, persistent sessions
- **Purpose**: Protect user data and enable personalized features
- **Trigger**: Click auth buttons or try protected actions
- **Progression**: Click → Modal animates in → Fill form → Submit → Success animation → Redirect
- **Success criteria**: Modal animations smooth, validation clear, sessions persist

### Browse/Discovery Page
- **Functionality**: Animated grid/list of venues with filters, search, sort, enhanced cards with hover effects
- **Purpose**: Main exploration interface with engaging interactions
- **Trigger**: After login or click logo when authenticated
- **Progression**: Page loads with stagger animation → Cards appear → Filters update with transitions → Results animate
- **Success criteria**: Fast filtering, smooth card animations, responsive layout

## Edge Case Handling

- **No Results** - Animated empty state with helpful suggestions
- **Location Denied** - Hide distance features gracefully
- **Network Error** - Show cached data with retry button
- **Unauthenticated** - Smooth modal animation instead of error
- **Missing Data** - Placeholder animations while loading
- **Image Failures** - Skeleton with shimmer effect
- **Slow Connections** - Progressive enhancement, core content first

## Design Direction

Modern, fluid, and captivating - every interaction should feel smooth and intentional. Animations add delight without being distracting. The glassmorphism and gradient effects create depth while maintaining clean readability. Dark mode provides comfortable viewing in any environment.

## Color Selection

Vibrant, modern palette with excellent dark mode support and smooth transitions.

- **Primary (Teal)**: oklch(0.58 0.12 195) - Vibrant brand color for actions
- **Primary Hover**: oklch(0.48 0.13 195) - Darker hover state
- **Accent (Warm Orange)**: oklch(0.68 0.14 35) - Hearts, highlights, ratings
- **Background Light**: oklch(0.995 0 0) - Soft white
- **Background Dark**: oklch(0.15 0 0) - Deep charcoal
- **Foreground Light**: oklch(0.25 0 0) - Nearly black text
- **Foreground Dark**: oklch(0.95 0 0) - Nearly white text
- **Muted Light**: oklch(0.965 0.003 240) - Subtle backgrounds
- **Muted Dark**: oklch(0.22 0.003 240) - Subtle dark backgrounds
- **Border Light**: oklch(0.92 0.002 240) - Light borders
- **Border Dark**: oklch(0.28 0.002 240) - Dark borders

**Dark Mode Adjustments**:
- All colors adjusted for WCAG AA contrast in dark theme
- Glassmorphism uses different opacity/blur for dark
- Gradients remain vibrant but not overwhelming

## Font Selection

Modern, clean typography with distinctive display font for heroes.

- **Display Font**: 'Playfair Display' - Elegant serif for hero titles
- **Body Font**: 'Inter' - Clean, highly readable sans-serif

**Typographic Hierarchy**:
- Hero Title: Playfair Display 900 / 48-72px / line-height 1.05 / letter-spacing -0.04em
- H1 (Sections): Inter 800 / 32-56px / line-height 1.1 / letter-spacing -0.03em  
- H2 (Subsections): Inter 700 / 24-40px / line-height 1.2 / letter-spacing -0.02em
- H3 (Cards): Inter 600 / 18-20px / line-height 1.3
- Body: Inter 400 / 15px / line-height 1.6
- Small: Inter 400 / 14px / line-height 1.4

## Animations

Purposeful, smooth animations using Framer Motion that enhance rather than distract.

**Hero Animations**:
- Title words fade and slide up in sequence (staggered)
- Search bar scales in with glassmorphism effect
- Stats badges float gently (infinite animation)
- Scroll indicator bounces softly

**Card Animations**:
- Entrance: Fade in + slide up (staggered in grid)
- Hover: Lift up 8px + shadow increase + image zoom 110%
- Heart: Scale pulse when clicked, smooth fill transition
- "Open Now": Pulsing dot indicator

**Navigation**:
- Initial: Slide down from top on page load
- Scroll: Sticky with smooth transition
- Theme toggle: Icon rotates and fades on switch
- Buttons: Scale on hover, press feedback

**Page Transitions**:
- Fade + slight slide (300ms ease-out)
- Modal: Backdrop fade + content scale in
- Drawer/Sheet: Slide from edge

**Scroll Reveals**:
- Sections fade in when 20% visible
- Cards stagger in sequence (100ms delay each)
- Stats count up when visible

**Loading States**:
- Skeleton screens with subtle shimmer gradient
- Smooth fade to actual content
- Progress indicators for async actions

**Micro-interactions**:
- Button hover: Slight scale 1.05
- Button press: Scale 0.95
- Input focus: Border color transition
- Checkbox: Check mark draws in
- Toggle: Slide with spring physics

All animations: 60fps, respect prefers-reduced-motion, no layout shift

## Component Selection

**Core UI Components** (shadcn v4):
- Card, Button, Input, Dialog, Avatar, Badge, Select, Slider, Checkbox, Switch, Skeleton, Toast (Sonner)

**Custom Enhanced Components**:
- **EnhancedHeroSection** - Animated gradient hero with floating badges and staggered text reveal
- **GlassmorphismNav** - Sticky navigation with frosted glass effect and smooth animations
- **AnimatedVenueCard** - Card with lift hover, image zoom, heart pulse animation, enhanced shadows
- **ThemeToggle** - Animated icon rotation and smooth theme transition
- **ScrollReveal** - Wrapper for animating elements on scroll into view
- **FloatingStats** - Gentle floating animation for stat badges
- **PulsingBadge** - Animated "Open Now" indicator with pulsing dot

**Animation Patterns**:
- All interactive elements have hover states (200-300ms transitions)
- Cards lift on hover with shadow increase
- Images zoom slightly on card hover
- Hearts pulse and fill smoothly when clicked
- Modals scale in with backdrop fade
- Page sections reveal on scroll

**States & Interactions**:
- Hover: Scale, shadow, color transitions
- Active: Pressed scale effect
- Focus: Ring with theme color
- Loading: Skeleton with shimmer
- Error: Shake animation + red border
- Success: Green check with scale

**Icons** (Phosphor React):
- All icons consistent weight and size
- Animate on state changes (favorites, theme)
- Use bold weight for emphasis

**Spacing & Layout**:
- Consistent 8px base grid
- Generous whitespace (64px section padding)
- Cards: 24px internal padding
- Responsive breakpoints: 768px, 1024px, 1280px

**Mobile Adaptations**:
- Hero height: 85vh → 70vh
- Text sizes scale down proportionally
- Grid: 4 cols → 2 → 1
- Touch targets minimum 44px
- Simplified animations for performance
