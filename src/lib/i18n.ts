export type Language = 'en' | 'vi'

export interface Translations {
  nav: {
    appTitle: string
    explore: string
    favorites: string
    login: string
    logout: string
  }
  hero: {
    title: string
    subtitle: string
    searchPlaceholder: string
  }
  categories: {
    restaurants: string
    cafes: string
    attractions: string
  }
  filters: {
    title: string
    clearAll: string
    categories: string
    priceRange: string
    minRating: string
    distance: string
    availability: string
    openNow: string
    open24Hours: string
    dietary: string
    vegetarian: string
    vegan: string
    halal: string
    stars: string
    any: string
  }
  results: {
    placesFound: string
    place: string
    places: string
    clearFilters: string
    noResults: string
    tryAdjusting: string
    clearAllFilters: string
    filtersActive: string
  }
  sort: {
    mostPopular: string
    highestRated: string
    nearest: string
    priceLowToHigh: string
    priceHighToLow: string
  }
  venue: {
    reviews: string
    perPerson: string
    away: string
    viewDetails: string
  }
  favorites: {
    title: string
    noFavorites: string
    saved: string
    addedToFavorites: string
    removedFromFavorites: string
    loginRequired: string
  }
  auth: {
    loginTitle: string
    signupTitle: string
    email: string
    password: string
    name: string
    rememberMe: string
    loginButton: string
    signupButton: string
    switchToSignup: string
    switchToLogin: string
    loginSuccess: string
    signupSuccess: string
  }
  common: {
    loading: string
    error: string
    comingSoon: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      appTitle: 'Vietnam Travel',
      explore: 'Explore',
      favorites: 'Favorites',
      login: 'Login / Sign Up',
      logout: 'Logout',
    },
    hero: {
      title: 'Discover Vietnam',
      subtitle: 'Explore authentic restaurants, trendy cafés, and cultural attractions across Saigon and Hanoi',
      searchPlaceholder: 'Search for places, cuisine, or location...',
    },
    categories: {
      restaurants: 'Restaurants',
      cafes: 'Cafés',
      attractions: 'Attractions',
    },
    filters: {
      title: 'Filters',
      clearAll: 'Clear All',
      categories: 'Categories',
      priceRange: 'Price Range',
      minRating: 'Minimum Rating',
      distance: 'Distance',
      availability: 'Availability',
      openNow: 'Open Now',
      open24Hours: 'Open 24 Hours',
      dietary: 'Dietary Preferences',
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      halal: 'Halal',
      stars: 'Stars',
      any: 'Any',
    },
    results: {
      placesFound: 'found',
      place: 'place',
      places: 'places',
      clearFilters: 'Clear filters',
      noResults: 'No places found',
      tryAdjusting: 'Try adjusting your filters or search terms to find more results',
      clearAllFilters: 'Clear all filters',
      filtersActive: 'Active',
    },
    sort: {
      mostPopular: 'Most Popular',
      highestRated: 'Highest Rated',
      nearest: 'Nearest',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
    },
    venue: {
      reviews: 'reviews',
      perPerson: 'per person',
      away: 'away',
      viewDetails: 'View Details',
    },
    favorites: {
      title: 'My Favorites',
      noFavorites: 'No favorites yet. Start exploring and save your favorite places!',
      saved: 'saved',
      addedToFavorites: 'Added to favorites',
      removedFromFavorites: 'Removed from favorites',
      loginRequired: 'Please login to save favorites',
    },
    auth: {
      loginTitle: 'Welcome Back',
      signupTitle: 'Create Account',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      rememberMe: 'Remember me',
      loginButton: 'Login',
      signupButton: 'Sign Up',
      switchToSignup: 'Need an account? Sign up',
      switchToLogin: 'Have an account? Login',
      loginSuccess: 'Welcome back!',
      signupSuccess: 'Account created successfully!',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      comingSoon: 'Venue detail view coming soon!',
    },
  },
  vi: {
    nav: {
      appTitle: 'Du Lịch Việt Nam',
      explore: 'Khám Phá',
      favorites: 'Yêu Thích',
      login: 'Đăng Nhập / Đăng Ký',
      logout: 'Đăng Xuất',
    },
    hero: {
      title: 'Khám Phá Việt Nam',
      subtitle: 'Tìm kiếm nhà hàng chính hiệu, quán cà phê thịnh hành và điểm tham quan văn hóa tại Sài Gòn và Hà Nội',
      searchPlaceholder: 'Tìm địa điểm, món ăn, hoặc vị trí...',
    },
    categories: {
      restaurants: 'Nhà Hàng',
      cafes: 'Quán Cà Phê',
      attractions: 'Điểm Tham Quan',
    },
    filters: {
      title: 'Bộ Lọc',
      clearAll: 'Xóa Tất Cả',
      categories: 'Danh Mục',
      priceRange: 'Mức Giá',
      minRating: 'Đánh Giá Tối Thiểu',
      distance: 'Khoảng Cách',
      availability: 'Tình Trạng',
      openNow: 'Đang Mở Cửa',
      open24Hours: 'Mở Cửa 24h',
      dietary: 'Chế Độ Ăn',
      vegetarian: 'Chay',
      vegan: 'Thuần Chay',
      halal: 'Halal',
      stars: 'Sao',
      any: 'Tất Cả',
    },
    results: {
      placesFound: 'tìm thấy',
      place: 'địa điểm',
      places: 'địa điểm',
      clearFilters: 'Xóa bộ lọc',
      noResults: 'Không tìm thấy địa điểm',
      tryAdjusting: 'Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để có thêm kết quả',
      clearAllFilters: 'Xóa tất cả bộ lọc',
      filtersActive: 'Đang Lọc',
    },
    sort: {
      mostPopular: 'Phổ Biến Nhất',
      highestRated: 'Đánh Giá Cao',
      nearest: 'Gần Nhất',
      priceLowToHigh: 'Giá: Thấp đến Cao',
      priceHighToLow: 'Giá: Cao đến Thấp',
    },
    venue: {
      reviews: 'đánh giá',
      perPerson: 'mỗi người',
      away: 'xa',
      viewDetails: 'Xem Chi Tiết',
    },
    favorites: {
      title: 'Yêu Thích Của Tôi',
      noFavorites: 'Chưa có địa điểm yêu thích. Bắt đầu khám phá và lưu các địa điểm bạn thích!',
      saved: 'đã lưu',
      addedToFavorites: 'Đã thêm vào yêu thích',
      removedFromFavorites: 'Đã xóa khỏi yêu thích',
      loginRequired: 'Vui lòng đăng nhập để lưu yêu thích',
    },
    auth: {
      loginTitle: 'Chào Mừng Trở Lại',
      signupTitle: 'Tạo Tài Khoản',
      email: 'Email',
      password: 'Mật Khẩu',
      name: 'Họ và Tên',
      rememberMe: 'Ghi nhớ đăng nhập',
      loginButton: 'Đăng Nhập',
      signupButton: 'Đăng Ký',
      switchToSignup: 'Chưa có tài khoản? Đăng ký',
      switchToLogin: 'Đã có tài khoản? Đăng nhập',
      loginSuccess: 'Chào mừng bạn trở lại!',
      signupSuccess: 'Tạo tài khoản thành công!',
    },
    common: {
      loading: 'Đang tải...',
      error: 'Đã xảy ra lỗi',
      comingSoon: 'Trang chi tiết sẽ sớm ra mắt!',
    },
  },
}
