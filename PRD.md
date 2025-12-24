# Vietnam Travel Discovery App

A comprehensive web application for international tourists to discover and explore authentic Vietnamese restaurants, cafés, and tourist attractions across Vietnam with an emphasis on Saigon and Hanoi.

**Experience Qualities**:
1. **Explorative** - Users should feel excited discovering hidden gems and popular spots through immersive visuals and detailed information
2. **Trustworthy** - Authentic reviews, accurate information, and reliable data create confidence in travel decisions
3. **Effortless** - Intuitive navigation, smart filters, and seamless map integration make planning simple and enjoyable

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a full-featured travel platform with user authentication, data persistence, review systems, favorites management, map integration, advanced filtering, and multiple interconnected views requiring sophisticated state management.

## Essential Features

### User Authentication System
- **Functionality**: Complete account lifecycle management with email validation, secure login/logout, profile management (name, avatar, preferences), password recovery, and persistent sessions
- **Purpose**: Enables personalized experiences, saves user preferences, protects user data, and builds trust through authenticated reviews
- **Trigger**: User clicks "Sign Up" or "Login" buttons in navigation or when accessing protected features (favorites, reviews)
- **Progression**: Click auth button → Form modal appears → Enter credentials → Validation feedback → Success toast → Modal closes → User logged in state → Profile icon appears
- **Success criteria**: Users can register, login persists across sessions with "Remember me", profile updates save correctly, password recovery works

### Main Discovery Interface
- **Functionality**: Grid/list view toggle showing categorized venues with images, ratings, pricing, distance, and favorite functionality
- **Purpose**: Primary exploration tool that helps users browse and quickly evaluate options at a glance
- **Trigger**: Landing page loads or user navigates to "Explore" section
- **Progression**: Page loads → Hero section appears → Category chips visible → Venue cards render in grid → User toggles view → Smooth transition to list layout
- **Success criteria**: Cards display all key information clearly, view transitions are smooth, favorites toggle instantly, distance calculations work

### Advanced Search & Filter System
- **Functionality**: Real-time search with multiple filters (category, price range, rating threshold, distance radius, open now, dietary preferences) and sorting options
- **Purpose**: Helps users narrow down options to match specific needs and preferences quickly
- **Trigger**: User types in search bar or opens filter panel
- **Progression**: Enter search term → Results update with debounce → Open filters → Adjust criteria → Apply filters → Results update → Sort dropdown → Re-order results
- **Success criteria**: Search responds within 300ms, filters work independently and combined, result count updates, clear filters resets to default

### Google Maps Integration
- **Functionality**: Interactive map displaying all venues as markers with clustering, popup previews, current location marker, and directions linking
- **Purpose**: Provides geographic context, helps users plan routes, visualize distances, and discover nearby venues
- **Trigger**: User clicks "Map View" toggle or views venue detail page
- **Progression**: Click map view → Map loads with markers → Zoom/pan interaction → Click marker → Popup appears → Click "Directions" → Opens Google Maps app/web
- **Success criteria**: All venues display correctly, clustering works on zoom out, popups show key info, directions link works on mobile and desktop

### Venue Detail Page
- **Functionality**: Comprehensive venue information with photo gallery, full details, embedded map, user reviews with photos, helpful votes, and similar venue suggestions
- **Purpose**: Provides all information needed to make informed decisions and take action (call, navigate, bookmark)
- **Trigger**: User clicks venue card from discovery interface or map popup
- **Progression**: Click venue → Page loads with skeleton → Images load → Scroll for info → View reviews → Click "Write Review" → Review modal → Submit → Success toast → Review appears
- **Success criteria**: All venue data displays correctly, photos open in lightbox, "Open Now" status accurate, embedded map shows correct location, reviews load

### Favorites & Collections
- **Functionality**: Save venues to favorites, create custom named collections, view all saved items on profile page, share collection links
- **Purpose**: Helps users organize discoveries, plan trips, and share recommendations with travel companions
- **Trigger**: User clicks heart icon on venue card (requires login prompt if not authenticated)
- **Progression**: Click heart → Login check → Icon fills → Toast confirms → View profile → See favorites → Create collection → Name it → Drag venues to collection → Share link → Others view collection
- **Success criteria**: Favorites persist across sessions, collections can be created/renamed/deleted, sharing generates unique URL, heart state syncs everywhere

### Review System
- **Functionality**: Submit star ratings with text reviews, upload up to 5 photos, select visit date, vote reviews helpful/not helpful
- **Purpose**: Builds community trust, provides authentic insights, helps others make decisions
- **Trigger**: User clicks "Write a Review" button on venue detail page
- **Progression**: Click review button → Login check → Modal opens → Select stars → Write text → Upload photos → Pick visit date → Submit → Validation → Success → Review appears at top
- **Success criteria**: Reviews save with all data, photos upload and display, helpful votes update count, own reviews can be edited/deleted

### Responsive Mobile Design
- **Functionality**: Mobile-first responsive layout with hamburger menu, touch-friendly controls, optimized images, gesture support
- **Purpose**: Ensures excellent experience for tourists using phones while traveling
- **Trigger**: App loads on mobile device or browser window resized
- **Progression**: Page loads → Mobile layout renders → Tap hamburger → Side drawer opens → Navigate sections → Swipe photo galleries → Tap to call → Maps open in app
- **Success criteria**: All features work on mobile, touch targets minimum 44px, images load quickly, gestures feel natural

### Multi-Language Support (i18n)
- **Functionality**: Complete internationalization with English and Vietnamese language support, persistent language preference, language switcher in navigation
- **Purpose**: Makes the app accessible to both international tourists and Vietnamese locals, enhancing usability for the target audience
- **Trigger**: User clicks language switcher (flag icon) in navigation bar
- **Progression**: Click language switcher → Dropdown opens with language options → Select language → All text updates instantly → Preference saved → Language persists across sessions
- **Success criteria**: All UI text translates correctly, language preference persists, no layout breaks, smooth transitions between languages

## Edge Case Handling

- **No Search Results** - Display friendly empty state with search tips and suggestion to adjust filters
- **Location Permission Denied** - Show venues without distance, prompt to enable location for better experience
- **Offline/Network Error** - Show cached data if available, friendly error message with retry button
- **Invalid Venue Data** - Gracefully handle missing images/info with placeholders and hide broken sections
- **Unauthenticated Actions** - Intercept protected actions (favorites, reviews) with login modal instead of error
- **Duplicate Reviews** - Prevent multiple reviews from same user on same venue, offer to edit existing
- **Image Upload Failures** - Show individual upload status, allow retry, don't block review submission
- **Map Loading Errors** - Fall back to static image with address or show error with alternative directions link
- **Long Venue Names/Text** - Truncate with ellipsis, show full text on hover/expand
- **Expired Sessions** - Detect and prompt re-login, preserve user's current action to resume after auth

## Design Direction

The design should evoke luxury, sophistication, and modern elegance through premium glassmorphism effects, dynamic gradients, and fluid animations. Users should feel they're experiencing a high-end, cutting-edge travel platform with stunning visuals and smooth micro-interactions. The aesthetic embraces contemporary design trends with vibrant gradients, transparent glass-like surfaces, and delightful motion design.

## Color Selection

A modern, luxurious palette featuring dynamic gradients and glass-morphic transparency inspired by premium digital experiences.

- **Primary Gradient**: Turquoise to Blue (from oklch(0.65 0.15 200) to oklch(0.55 0.18 250)) - Creates depth and sophistication, used for hero sections, primary CTAs, and premium elements
- **Secondary Gradient**: Orange to Pink (from oklch(0.72 0.20 40) to oklch(0.68 0.22 350)) - Warm, energetic accent for favorites, badges, and attention-grabbing elements
- **Background Colors**:
  - Pure White (oklch(0.99 0 0)) - Main background for clarity
  - Soft Gray (oklch(0.96 0.005 260)) - Subtle backgrounds for cards
  - Glass Overlay (oklch(1 0 0 / 0.8) with backdrop-blur-xl) - Glassmorphism effect
- **Text Colors**:
  - Dark Charcoal (oklch(0.22 0.01 260)) - Primary text on light backgrounds
  - Medium Gray (oklch(0.50 0.01 260)) - Secondary text and metadata
  - Pure White (oklch(0.99 0 0)) - Text on dark/gradient backgrounds
- **Accent Elements**:
  - Gold Gradient (from oklch(0.75 0.15 80) to oklch(0.68 0.18 60)) - Premium badges, rating stars
  - Success Green (oklch(0.65 0.18 150)) - Positive actions
  - Error Red (oklch(0.60 0.22 25)) - Warnings and errors
- **Foreground/Background Pairings**: 
  - White Background (oklch(0.99 0 0)): Dark Charcoal (oklch(0.22 0.01 260)) - Ratio 14.2:1 ✓
  - Turquoise Gradient: White text (oklch(0.99 0 0)) - Ratio 6.8:1 ✓
  - Orange-Pink Gradient: White text (oklch(0.99 0 0)) - Ratio 5.4:1 ✓
  - Glass Surface: Dark text with shadow for enhanced readability ✓

## Font Selection

Typography should feel bold, modern, and luxurious with strong hierarchy and generous spacing that commands attention.

- **Primary Font**: Space Grotesk - Bold geometric display font for impactful headlines
- **Secondary Font**: Inter - Clean system font for optimal readability in body text

**Typographic Hierarchy**:
- H1 (Hero Title): Space Grotesk Bold/56px/tight letter-spacing/-0.03em/responsive
- H2 (Section Headers): Space Grotesk Bold/32px/tight/-0.02em  
- H3 (Card Titles): Space Grotesk SemiBold/18px/normal/0em
- Body (Descriptions): Inter Regular/15px/relaxed/1.6 line-height
- Small (Metadata): Inter Medium/13px/normal/1.45 line-height
- Button Text: Space Grotesk SemiBold/15px/wide letter-spacing/0.03em

## Animations

Animations should feel premium, fluid, and delightful with micro-interactions throughout creating a luxurious, responsive experience.

- **Page Load**: Hero section fades in with upward movement (600ms), staggered card appearance (50ms delay each)
- **Card Hovers**: Lift with scale (1.05x) and enhanced shadow (300ms ease-out), image zoom (1.1x/400ms)
- **Favorite Heart**: Satisfying heartbeat scale animation (500ms spring) with gradient color shift
- **Button Interactions**: Gradient shimmer on hover, ripple effect on click, subtle bounce on press
- **Glassmorphism Elements**: Smooth backdrop-blur transitions, frosted glass appearance
- **Scroll Animations**: Parallax background, reveal animations as elements enter viewport
- **Loading States**: Skeleton screens with gradient shimmer sweep (2s infinite), smooth pulse
- **Modal Entry**: Slide up from bottom on mobile (350ms), scale + fade on desktop (300ms)
- **Form Inputs**: Floating label rise on focus (250ms), border gradient glow
- **Navigation**: Smooth sticky navbar with blur background, active state underline slide
- **Badge Animations**: "Open Now" pulsing glow effect (2s infinite)
- **Image Galleries**: Smooth swipe with momentum, lightbox zoom transition (400ms)
- **Particles**: Subtle floating particles in hero section for depth and ambiance
- **Cursor Glow**: Soft gradient glow following cursor on desktop (premium touch)
- **Toggle/Switch**: Smooth slide transition (300ms) with gradient thumb
- **Checkbox**: Checkmark draws in with path animation (400ms)
- **Toast Notifications**: Slide in from right with spring bounce (350ms)
- **Dropdown Menus**: Slide down with fade (250ms ease-out)
- **Star Ratings**: Individual star fill with gradient animation on hover/select
- **Scroll Progress**: Gradient bar showing page scroll progress at top
- **Dark Mode Toggle**: Smooth color transition across all elements (400ms)

## Component Selection

**Components**:
- **Card** - Primary container for venue displays in grid/list views, customized with hover states and image overlays
- **Button** - All CTAs with variants (primary turquoise, secondary teal, ghost for subtle actions, destructive for cancel)
- **Dialog** - Authentication forms, review submission, collection creation modals
- **Avatar** - User profiles in navigation and review sections
- **Badge** - Category labels, "Open Now" status, dietary preference tags
- **Input** - Search bars, form fields with icon prefixes
- **Slider** - Price range and distance radius filters
- **Select** - Sort dropdown, category multi-select in filters
- **Tabs** - Toggle between grid/list views, different profile sections
- **Separator** - Divide sections cleanly
- **Scroll Area** - Filter panels, review lists, photo galleries
- **Sheet** - Mobile navigation drawer, mobile filter panel
- **Popover** - Quick filter options, user menu dropdown
- **Skeleton** - Loading states for cards and content
- **Toast (Sonner)** - Success/error feedback for all actions
- **Form** (with react-hook-form + zod) - All user input validation

**Customizations**:
- **VenueCard** - Custom component with image, gradient overlay, favorite heart absolute positioned, rating stars, distance badge
- **StarRating** - Interactive star selector with hover preview and filled state using Phosphor icons
- **ImageGallery** - Swipeable lightbox with thumbnails and navigation
- **MapView** - Custom Google Maps wrapper with marker clustering and custom popup styling
- **FilterPanel** - Collapsible accordion sections for different filter groups
- **HeroSection** - Full-width hero with background image, overlay, centered search bar

**States**:
- Buttons: Default, hover (lift + darken), active (pressed scale), focus (ring), disabled (opacity + no pointer)
- Inputs: Default border, focus (primary color ring + border), error (destructive color), success (green accent)
- Cards: Default, hover (shadow + lift), active (slight press), loading (skeleton)
- Heart Icon: Empty outline, filled solid with scale animation, loading spinner during save

**Icon Selection**:
- MagnifyingGlass - Search functionality
- Funnel - Filter panel toggle
- MapPin - Location markers and venue locations
- Heart - Favorites (outline and filled states)
- Star - Ratings (outline and filled)
- Phone - Call action
- GlobeHemisphereWest - Website links
- Clock - Opening hours
- CurrencyDollar - Pricing information
- NavigationArrow - Directions/navigation
- User - Profile and authentication
- List/GridFour - View toggles
- Plus - Add to collection, create new
- ShareNetwork - Share collections
- X - Close modals, remove items
- CaretDown - Dropdowns and accordions
- Camera - Photo upload
- ThumbsUp - Helpful vote

**Spacing**:
- Section padding: p-6 md:p-12
- Card padding: p-4 md:p-6
- Component gap: gap-4 (16px) for related groups, gap-8 (32px) for sections
- Grid columns: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Consistent margin-bottom: mb-6 for section headers, mb-4 for subsections

**Mobile**:
- Hero height reduces from h-[600px] to h-[400px]
- Navigation collapses to hamburger menu with Sheet drawer
- Grid switches from 4 columns to single column
- Filter panel becomes bottom sheet instead of sidebar
- Images prioritize portrait orientation on mobile
- Touch targets minimum 44x44px for all interactive elements
- Sticky search bar on scroll for quick access
- Swipe gestures for image galleries and card actions
