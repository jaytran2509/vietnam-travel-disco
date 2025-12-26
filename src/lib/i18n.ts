export type Language = 'en' | 'vi' | 'ko' | 'ja' | 'zh'

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
    restaurant: string
    cafe: string
    attraction: string
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
    subtitle: string
    signIn: string
    createAccount: string
    forgotPassword: string
    orContinueWith: string
    passwordStrength: string
    weak: string
    good: string
    strong: string
    socialLoginComingSoon: string
    passwordRecoveryComingSoon: string
  }
  validation: {
    emailRequired: string
    emailInvalid: string
    passwordRequired: string
    passwordMinLength: string
    nameRequired: string
    nameMinLength: string
    confirmPasswordRequired: string
    passwordsDoNotMatch: string
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
      restaurant: 'Restaurant',
      cafe: 'Café',
      attraction: 'Attraction',
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
      subtitle: 'Sign in to continue your journey',
      signIn: 'Sign In',
      createAccount: 'Create Account',
      forgotPassword: 'Forgot password?',
      orContinueWith: 'Or continue with',
      passwordStrength: 'Password strength',
      weak: 'Weak',
      good: 'Good',
      strong: 'Strong',
      socialLoginComingSoon: 'Social login coming soon!',
      passwordRecoveryComingSoon: 'Password recovery coming soon!',
    },
    validation: {
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      nameRequired: 'Name is required',
      nameMinLength: 'Name must be at least 2 characters',
      confirmPasswordRequired: 'Please confirm your password',
      passwordsDoNotMatch: 'Passwords do not match',
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
      restaurant: 'Nhà Hàng',
      cafe: 'Quán Cà Phê',
      attraction: 'Điểm Tham Quan',
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
      subtitle: 'Đăng nhập để tiếp tục hành trình của bạn',
      signIn: 'Đăng Nhập',
      createAccount: 'Tạo Tài Khoản',
      forgotPassword: 'Quên mật khẩu?',
      orContinueWith: 'Hoặc tiếp tục với',
      passwordStrength: 'Độ mạnh mật khẩu',
      weak: 'Yếu',
      good: 'Tốt',
      strong: 'Mạnh',
      socialLoginComingSoon: 'Đăng nhập mạng xã hội sắp ra mắt!',
      passwordRecoveryComingSoon: 'Khôi phục mật khẩu sắp ra mắt!',
    },
    validation: {
      emailRequired: 'Vui lòng nhập email',
      emailInvalid: 'Vui lòng nhập email hợp lệ',
      passwordRequired: 'Vui lòng nhập mật khẩu',
      passwordMinLength: 'Mật khẩu phải có ít nhất 6 ký tự',
      nameRequired: 'Vui lòng nhập tên',
      nameMinLength: 'Tên phải có ít nhất 2 ký tự',
      confirmPasswordRequired: 'Vui lòng xác nhận mật khẩu',
      passwordsDoNotMatch: 'Mật khẩu không khớp',
    },
    common: {
      loading: 'Đang tải...',
      error: 'Đã xảy ra lỗi',
      comingSoon: 'Trang chi tiết sẽ sớm ra mắt!',
    },
  },
  ko: {
    nav: {
      appTitle: '베트남 여행',
      explore: '탐색',
      favorites: '즐겨찾기',
      login: '로그인 / 가입',
      logout: '로그아웃',
    },
    hero: {
      title: '베트남 발견',
      subtitle: '사이공과 하노이의 정통 레스토랑, 트렌디한 카페, 문화 명소를 탐험하세요',
      searchPlaceholder: '장소, 요리, 위치 검색...',
    },
    categories: {
      restaurants: '레스토랑',
      cafes: '카페',
      attractions: '명소',
      restaurant: '레스토랑',
      cafe: '카페',
      attraction: '명소',
    },
    filters: {
      title: '필터',
      clearAll: '모두 지우기',
      categories: '카테고리',
      priceRange: '가격대',
      minRating: '최소 평점',
      distance: '거리',
      availability: '이용 가능',
      openNow: '영업 중',
      open24Hours: '24시간 영업',
      dietary: '식단 선호',
      vegetarian: '채식',
      vegan: '비건',
      halal: '할랄',
      stars: '별',
      any: '전체',
    },
    results: {
      placesFound: '발견',
      place: '장소',
      places: '장소',
      clearFilters: '필터 지우기',
      noResults: '장소를 찾을 수 없습니다',
      tryAdjusting: '필터나 검색어를 조정하여 더 많은 결과를 찾아보세요',
      clearAllFilters: '모든 필터 지우기',
      filtersActive: '활성',
    },
    sort: {
      mostPopular: '인기순',
      highestRated: '평점순',
      nearest: '가까운순',
      priceLowToHigh: '가격: 낮은순',
      priceHighToLow: '가격: 높은순',
    },
    venue: {
      reviews: '리뷰',
      perPerson: '인당',
      away: '거리',
      viewDetails: '세부정보 보기',
    },
    favorites: {
      title: '내 즐겨찾기',
      noFavorites: '아직 즐겨찾기가 없습니다. 탐색을 시작하고 좋아하는 장소를 저장하세요!',
      saved: '저장됨',
      addedToFavorites: '즐겨찾기에 추가됨',
      removedFromFavorites: '즐겨찾기에서 제거됨',
      loginRequired: '즐겨찾기를 저장하려면 로그인하세요',
    },
    auth: {
      loginTitle: '돌아오신 것을 환영합니다',
      signupTitle: '계정 만들기',
      email: '이메일',
      password: '비밀번호',
      name: '이름',
      rememberMe: '로그인 상태 유지',
      loginButton: '로그인',
      signupButton: '가입',
      switchToSignup: '계정이 없으신가요? 가입하기',
      switchToLogin: '계정이 있으신가요? 로그인',
      loginSuccess: '환영합니다!',
      signupSuccess: '계정이 성공적으로 생성되었습니다!',
      subtitle: '계속하려면 로그인하세요',
      signIn: '로그인',
      createAccount: '계정 생성',
      forgotPassword: '비밀번호를 잊으셨나요?',
      orContinueWith: '또는 다음으로 계속',
      passwordStrength: '비밀번호 강도',
      weak: '약함',
      good: '좋음',
      strong: '강함',
      socialLoginComingSoon: '소셜 로그인은 곧 지원됩니다!',
      passwordRecoveryComingSoon: '비밀번호 복구는 곧 지원됩니다!',
    },
    validation: {
      emailRequired: '이메일을 입력해주세요',
      emailInvalid: '유효한 이메일을 입력해주세요',
      passwordRequired: '비밀번호를 입력해주세요',
      passwordMinLength: '비밀번호는 최소 6자 이상이어야 합니다',
      nameRequired: '이름을 입력해주세요',
      nameMinLength: '이름은 최소 2자 이상이어야 합니다',
      confirmPasswordRequired: '비밀번호를 확인해주세요',
      passwordsDoNotMatch: '비밀번호가 일치하지 않습니다',
    },
    common: {
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
      comingSoon: '곧 제공될 예정입니다!',
    },
  },
  ja: {
    nav: {
      appTitle: 'ベトナム旅行',
      explore: '探索',
      favorites: 'お気に入り',
      login: 'ログイン / 登録',
      logout: 'ログアウト',
    },
    hero: {
      title: 'ベトナムを発見',
      subtitle: 'サイゴンとハノイの本格的なレストラン、トレンディなカフェ、文化的な観光スポットを探索',
      searchPlaceholder: '場所、料理、位置で検索...',
    },
    categories: {
      restaurants: 'レストラン',
      cafes: 'カフェ',
      attractions: '観光スポット',
      restaurant: 'レストラン',
      cafe: 'カフェ',
      attraction: '観光スポット',
    },
    filters: {
      title: 'フィルター',
      clearAll: 'すべてクリア',
      categories: 'カテゴリー',
      priceRange: '価格帯',
      minRating: '最低評価',
      distance: '距離',
      availability: '営業状況',
      openNow: '営業中',
      open24Hours: '24時間営業',
      dietary: '食事の好み',
      vegetarian: 'ベジタリアン',
      vegan: 'ヴィーガン',
      halal: 'ハラール',
      stars: 'スター',
      any: 'すべて',
    },
    results: {
      placesFound: '見つかりました',
      place: '場所',
      places: '場所',
      clearFilters: 'フィルターをクリア',
      noResults: '場所が見つかりませんでした',
      tryAdjusting: 'フィルターや検索キーワードを調整して、より多くの結果を見つけてください',
      clearAllFilters: 'すべてのフィルターをクリア',
      filtersActive: 'アクティブ',
    },
    sort: {
      mostPopular: '人気順',
      highestRated: '評価順',
      nearest: '近い順',
      priceLowToHigh: '価格: 安い順',
      priceHighToLow: '価格: 高い順',
    },
    venue: {
      reviews: 'レビュー',
      perPerson: '一人当たり',
      away: '離れた',
      viewDetails: '詳細を見る',
    },
    favorites: {
      title: 'マイお気に入り',
      noFavorites: 'まだお気に入りがありません。探索を始めて、お気に入りの場所を保存しましょう！',
      saved: '保存済み',
      addedToFavorites: 'お気に入りに追加しました',
      removedFromFavorites: 'お気に入りから削除しました',
      loginRequired: 'お気に入りを保存するにはログインしてください',
    },
    auth: {
      loginTitle: 'おかえりなさい',
      signupTitle: 'アカウント作成',
      email: 'メール',
      password: 'パスワード',
      name: '名前',
      rememberMe: 'ログイン状態を保持',
      loginButton: 'ログイン',
      signupButton: '登録',
      switchToSignup: 'アカウントをお持ちでない方は登録',
      switchToLogin: 'アカウントをお持ちの方はログイン',
      loginSuccess: 'お帰りなさい！',
      signupSuccess: 'アカウントが正常に作成されました！',
      subtitle: '続けるにはログインしてください',
      signIn: 'ログイン',
      createAccount: 'アカウント作成',
      forgotPassword: 'パスワードをお忘れですか？',
      orContinueWith: 'または次で続ける',
      passwordStrength: 'パスワードの強度',
      weak: '弱い',
      good: '良い',
      strong: '強い',
      socialLoginComingSoon: 'ソーシャルログインは間もなく公開されます！',
      passwordRecoveryComingSoon: 'パスワードの復元は間もなく公開されます！',
    },
    validation: {
      emailRequired: 'メールアドレスを入力してください',
      emailInvalid: '有効なメールアドレスを入力してください',
      passwordRequired: 'パスワードを入力してください',
      passwordMinLength: 'パスワードは6文字以上である必要があります',
      nameRequired: '名前を入力してください',
      nameMinLength: '名前は2文字以上である必要があります',
      confirmPasswordRequired: 'パスワードを確認してください',
      passwordsDoNotMatch: 'パスワードが一致しません',
    },
    common: {
      loading: '読み込み中...',
      error: 'エラーが発生しました',
      comingSoon: '近日公開！',
    },
  },
  zh: {
    nav: {
      appTitle: '越南旅游',
      explore: '探索',
      favorites: '收藏',
      login: '登录 / 注册',
      logout: '登出',
    },
    hero: {
      title: '发现越南',
      subtitle: '探索西贡和河内的正宗餐厅、时尚咖啡馆和文化景点',
      searchPlaceholder: '搜索地点、美食或位置...',
    },
    categories: {
      restaurants: '餐厅',
      cafes: '咖啡馆',
      attractions: '景点',
      restaurant: '餐厅',
      cafe: '咖啡馆',
      attraction: '景点',
    },
    filters: {
      title: '筛选',
      clearAll: '清除全部',
      categories: '类别',
      priceRange: '价格范围',
      minRating: '最低评分',
      distance: '距离',
      availability: '营业状态',
      openNow: '营业中',
      open24Hours: '24小时营业',
      dietary: '饮食偏好',
      vegetarian: '素食',
      vegan: '纯素',
      halal: '清真',
      stars: '星级',
      any: '全部',
    },
    results: {
      placesFound: '找到',
      place: '地点',
      places: '地点',
      clearFilters: '清除筛选',
      noResults: '未找到地点',
      tryAdjusting: '尝试调整筛选条件或搜索关键词以获得更多结果',
      clearAllFilters: '清除所有筛选',
      filtersActive: '活跃',
    },
    sort: {
      mostPopular: '最受欢迎',
      highestRated: '评分最高',
      nearest: '最近',
      priceLowToHigh: '价格：从低到高',
      priceHighToLow: '价格：从高到低',
    },
    venue: {
      reviews: '评论',
      perPerson: '每人',
      away: '远',
      viewDetails: '查看详情',
    },
    favorites: {
      title: '我的收藏',
      noFavorites: '还没有收藏。开始探索并保存您喜欢的地点吧！',
      saved: '已保存',
      addedToFavorites: '已添加到收藏',
      removedFromFavorites: '已从收藏中移除',
      loginRequired: '请登录以保存收藏',
    },
    auth: {
      loginTitle: '欢迎回来',
      signupTitle: '创建账户',
      email: '电子邮件',
      password: '密码',
      name: '姓名',
      rememberMe: '记住我',
      loginButton: '登录',
      signupButton: '注册',
      switchToSignup: '还没有账户？注册',
      switchToLogin: '已有账户？登录',
      loginSuccess: '欢迎回来！',
      signupSuccess: '账户创建成功！',
      subtitle: '登录以继续您的旅程',
      signIn: '登录',
      createAccount: '创建账户',
      forgotPassword: '忘记密码？',
      orContinueWith: '或继续使用',
      passwordStrength: '密码强度',
      weak: '弱',
      good: '好',
      strong: '强',
      socialLoginComingSoon: '社交登录即将推出！',
      passwordRecoveryComingSoon: '密码恢复即将推出！',
    },
    validation: {
      emailRequired: '请输入电子邮件',
      emailInvalid: '请输入有效的电子邮件',
      passwordRequired: '请输入密码',
      passwordMinLength: '密码长度至少为6个字符',
      nameRequired: '请输入姓名',
      nameMinLength: '姓名长度至少为2个字符',
      confirmPasswordRequired: '请确认密码',
      passwordsDoNotMatch: '密码不匹配',
    },
    common: {
      loading: '加载中...',
      error: '发生错误',
      comingSoon: '即将推出！',
    },
  },
}
