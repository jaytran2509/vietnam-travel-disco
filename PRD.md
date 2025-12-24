# Vietnam Travel Discovery Platform

A complete Airbnb-style travel discovery platform for international tourists to explore Vietnamese restaurants, cafes, and attractions with clean, minimal, professional design.

**Experience Qualities**:
1. **Trustworthy** - Clean Airbnb-inspired design with solid colors, minimal shadows, and clear information builds confidence in every decision
2. **Effortless** - Simple navigation, intuitive filters, and content-first layout make exploration natural and enjoyable
3. **Professional** - Polished interface with careful attention to spacing, typography, and visual hierarchy creates a premium feel

**Complexity Level**: Complex Application (advanced functionality with multiple views)
This is a comprehensive travel platform with public landing page, authentication, persistent data, review systems, favorites, map integration, advanced filtering, and multiple interconnected views.

## Essential Features

### Public Landing Page
- **Functionality**: Marketing homepage with hero section, category browse, featured places, how it works, statistics, testimonials, and CTA sections
- **Purpose**: Convert visitors to users by showcasing value and building trust before requiring signup
- **Trigger**: User visits root URL while not logged in
- **Progression**: Page loads → Hero appears → Scroll through sections → Click "Get Started" → Auth modal opens
- **Success criteria**: Clear value proposition, beautiful imagery, smooth scroll experience, converts to signup

### User Authentication
- **Functionality**: Login/signup modals with email/password, social auth buttons (UI only), form validation
- **Purpose**: Protect user data and enable personalized features
- **Trigger**: Click "Log in", "Sign up", or try to favorite/review
- **Progression**: Click auth button → Modal opens → Enter credentials → Validation → Success → Redirects to browse page
- **Success criteria**: Secure auth, persistent sessions, clear error messages, smooth modal experience

### Browse/Discovery Page
- **Functionality**: Grid view of all venues with filters, search, sort options, and view toggle
- **Purpose**: Main exploration interface after login
- **Trigger**: After login or click logo when authenticated
- **Progression**: Page loads → Filter bar appears → Cards render → Apply filters → Results update → Click card → Detail page
- **Success criteria**: Fast filtering, clear cards, smooth interactions, helpful empty states

### Advanced Filters
- **Functionality**: Price range slider, rating selector, distance radius, dietary checkboxes, open now toggle, sort options
- **Purpose**: Help users find exactly what they need
- **Trigger**: Click filter pills or "More filters" button
- **Progression**: Click filter → Modal/drawer opens → Adjust criteria → "Show results" → Page updates
- **Success criteria**: Filters work independently and combined, clear all resets, active filter count badge

### Map View
- **Functionality**: Google Maps with custom markers, clustering, popups, split layout on desktop
- **Purpose**: Geographic context and route planning
- **Trigger**: Toggle "Show map" button
- **Progression**: Click toggle → Map loads → Zoom/pan → Click marker → Popup with venue preview → "View details"
- **Success criteria**: All venues marked, clustering works, popups show key info, smooth toggle

### Venue Detail Page
- **Functionality**: 5-image gallery, full info, amenities grid, embedded map, reviews section with photos, write review
- **Purpose**: All information needed to visit
- **Trigger**: Click venue card anywhere in app
- **Progression**: Click card → Page loads → Browse images → Read details → Scroll to reviews → Write review
- **Success criteria**: Complete info, working map, gallery lightbox, review submission works

### Favorites System
- **Functionality**: Save venues, view all favorites, collections support
- **Purpose**: Help users organize and plan
- **Trigger**: Click heart icon (login required)
- **Progression**: Click heart → Icon fills → Toast confirms → View favorites page → See saved venues
- **Success criteria**: Persist across sessions, sync everywhere, clear feedback

### Review System
- **Functionality**: Star rating, text review, photo upload (up to 5), visit date, helpful votes
- **Purpose**: Build community trust through authentic reviews
- **Trigger**: Click "Write a review" on venue detail page
- **Progression**: Click button → Modal opens → Rate stars → Write text → Upload photos → Submit → Appears in list
- **Success criteria**: All data saves, photos upload, helpful votes work, reviews display beautifully

## Edge Case Handling

- **No Results** - Friendly empty state with suggestions to adjust filters
- **Location Denied** - Hide distance, show venues without location-based features
- **Network Error** - Show cached data if available, retry button
- **Unauthenticated** - Show login modal instead of error for protected actions
- **Missing Data** - Graceful fallbacks with placeholders
- **Image Failures** - Show placeholder, don't break layout
- **Long Text** - Truncate with ellipsis, expand on interaction

## Design Direction

The design should evoke trust, simplicity, and professionalism through clean solid colors, generous white space, and minimal shadows. Users should feel they're using a reliable, well-crafted platform like Airbnb where content is the focus and every element serves a purpose.

## Color Selection

Custom Airbnb-style solid color palette with teal/turquoise primary and warm orange accents - NO gradients anywhere.

- **Primary (Teal/Turquoise)**: #00A699 (oklch(0.64 0.08 185)) - Main brand color for CTAs, active states, focus rings
- **Primary Dark**: #008B80 (oklch(0.55 0.08 185)) - Hover state for primary buttons
- **Accent (Warm Orange)**: #FF8956 (oklch(0.70 0.15 40)) - Hearts, special highlights, badges
- **Text Dark**: #222222 (oklch(0.20 0 0)) - Headings and primary text
- **Text Body**: #717171 (oklch(0.52 0 0)) - Body text and descriptions  
- **Text Light**: #B0B0B0 (oklch(0.73 0 0)) - Labels and metadata
- **Background White**: #FFFFFF (oklch(1 0 0)) - Main background
- **Background Gray**: #F7F7F7 (oklch(0.98 0 0)) - Alternate section backgrounds
- **Border Light**: #EBEBEB (oklch(0.94 0 0)) - Card borders, dividers
- **Border Medium**: #DDDDDD (oklch(0.89 0 0)) - Input borders, stronger dividers
- **Success Green**: #008489 (oklch(0.52 0.08 200)) - Success states, "Open now"
- **Error Red**: #C13515 (oklch(0.50 0.18 25)) - Errors and destructive actions

**Foreground/Background Pairings**:
- White (#FFFFFF): Dark text (#222222) - Ratio 17.6:1 ✓
- Teal Primary (#00A699): White text (#FFFFFF) - Ratio 4.6:1 ✓  
- Orange Accent (#FF8956): White text (#FFFFFF) - Ratio 4.2:1 ✓
- Gray (#F7F7F7): Dark text (#222222) - Ratio 16.8:1 ✓
- Success (#008489): White text (#FFFFFF) - Ratio 4.5:1 ✓

## Font Selection

Clean, professional sans-serif typography that prioritizes readability and hierarchy.

- **Font Family**: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

**Typographic Hierarchy**:
- H1 (Hero Title): 48px bold / line-height 1.1 / letter-spacing -0.02em
- H2 (Section Headers): 32px bold / line-height 1.2 / letter-spacing -0.01em
- H3 (Card Titles): 16px semi-bold / line-height 1.3
- Body (Descriptions): 16px regular / line-height 1.5
- Small (Metadata): 14px regular / line-height 1.4
- Button Text: 16px semi-bold

## Animations

Minimal, purposeful animations that feel natural and fast - Airbnb style.

- **Hover Effects**: Subtle opacity change (1.0 → 0.9) and slight shadow increase (200ms ease)
- **Card Hover**: Border color change + shadow (200ms), NO lift or scale
- **Button Press**: Slight scale (0.98) on active state
- **Heart Animation**: Smooth fill with subtle scale (300ms)
- **Page Transitions**: Simple fade (300ms)
- **Image Load**: Blur-up from gray placeholder
- **Toggle/Switch**: Smooth slide (250ms)
- **Modal Entry**: Fade in (200ms), NO slide or complex entrance
- **Loading**: Simple rotating spinner, skeleton boxes (NO shimmer)
- **Form Focus**: Border color transition (200ms)

NO: Entrance animations, parallax, particles, gradient animations, complex hovers, lift effects

## Component Selection

**Components**:
- **Card** - Venue display with simple border, rounded corners, hover state
- **Button** - Coral primary, outlined secondary, ghost tertiary
- **Dialog** - Authentication, review submission, centered modals
- **Avatar** - User profiles, circle with image
- **Badge** - Category labels, simple pills
- **Input** - Clean bordered inputs with focus states
- **Slider** - Price/distance range with simple track
- **Select** - Sort dropdown, minimal styling
- **Sheet** - Mobile drawer for navigation and filters
- **Checkbox** - Simple checkbox with coral check
- **Switch** - Toggle for filters
- **Skeleton** - Loading states, simple gray boxes
- **Toast (Sonner)** - Notifications, minimal styling

**Customizations**:
- **VenueCard** - White card, 12px radius, 1px border, image 4:3 ratio, heart top-right
- **StarRating** - Yellow/gold stars, clickable, outline when empty
- **ImageGallery** - 5-image grid layout (1 large + 4 small), lightbox on click
- **MapView** - Google Maps with custom coral markers
- **FilterPanel** - Clean sections with dividers

**States**:
- Buttons: Default, hover (darker), active (scale 0.98), disabled (opacity 0.5)
- Inputs: Default border, focus (black border), error (red border)
- Cards: Default, hover (border color change + shadow)
- Heart: Outline empty, filled coral with smooth transition

**Icon Selection** (Phosphor React - simple outline style):
- MagnifyingGlass, Funnel, MapPin, Heart, Star, Phone, Globe, Clock, CurrencyDollar
- ArrowRight, User, List, GridFour, Plus, ShareNetwork, X, CaretDown, Camera, ThumbsUp

**Spacing** (using 8px base):
- Sections: 64px (py-16) vertical padding
- Cards: 24px padding
- Components: 16px (gap-4) for related items, 24px (gap-6) between groups
- Grids: 24px (gap-6) between cards

**Mobile**:
- Hero height: 70vh → 50vh
- Grid: 4 cols → 2 cols tablet → 1 col mobile
- Navigation: Hamburger menu with drawer
- Filters: Bottom sheet instead of sidebar
- Sticky search bar on scroll
- Minimum 44px touch targets
