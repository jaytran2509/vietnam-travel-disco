import type { Venue } from './types'

export const venues: Venue[] = [
  {
    id: 'pho-le',
    name: 'Phở Lệ',
    category: 'restaurant',
    images: [
      'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800',
    rating: 4.8,
    reviewCount: 342,
    priceLevel: '$',
    avgCostPerPerson: 50000,
    description: 'Legendary pho restaurant serving authentic Northern-style beef noodle soup since 1972. Known for rich, aromatic broth simmered for 24 hours and tender beef cuts.',
    address: '413-415 Nguyễn Trãi, Phường 7, Quận 5, Ho Chi Minh City',
    coordinates: { lat: 10.7545, lng: 106.6744 },
    phone: '+84 28 3855 2967',
    website: 'https://example.com/pho-le',
    openingHours: {
      monday: '06:00 - 22:00',
      tuesday: '06:00 - 22:00',
      wednesday: '06:00 - 22:00',
      thursday: '06:00 - 22:00',
      friday: '06:00 - 22:00',
      saturday: '06:00 - 22:00',
      sunday: '06:00 - 22:00'
    },
    isOpen24Hours: false,
    dietaryOptions: [],
    cuisineType: 'Vietnamese',
    features: ['Outdoor Seating', 'Takeaway', 'Family Friendly']
  },
  {
    id: 'banh-mi-huynh-hoa',
    name: 'Bánh Mì Huỳnh Hoa',
    category: 'restaurant',
    images: [
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
      'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800',
    rating: 4.6,
    reviewCount: 1289,
    priceLevel: '$',
    avgCostPerPerson: 35000,
    description: 'Famous banh mi shop offering incredibly generous portions of Vietnamese baguette sandwiches. Expect queues but worth the wait for their signature overflowing sandwiches.',
    address: '26 Lê Thị Riêng, Phường Bến Thành, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7699, lng: 106.6979 },
    phone: '+84 28 3829 4701',
    openingHours: {
      monday: '15:00 - 23:00',
      tuesday: '15:00 - 23:00',
      wednesday: '15:00 - 23:00',
      thursday: '15:00 - 23:00',
      friday: '15:00 - 23:00',
      saturday: '15:00 - 23:00',
      sunday: '15:00 - 23:00'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian'],
    cuisineType: 'Vietnamese',
    features: ['Street Food', 'Takeaway', 'Quick Service']
  },
  {
    id: 'bun-cha-hanoi',
    name: 'Bún Chả Hương Liên',
    category: 'restaurant',
    images: [
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
      'https://images.unsplash.com/photo-1584536131823-8d0b5e9c7c4e?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800',
    rating: 4.7,
    reviewCount: 856,
    priceLevel: '$',
    avgCostPerPerson: 60000,
    description: 'The famous bun cha restaurant where President Obama dined with Anthony Bourdain. Authentic Hanoi-style grilled pork with vermicelli noodles in sweet-sour broth.',
    address: '24 Lê Văn Hưu, Hai Bà Trưng, Hanoi',
    coordinates: { lat: 21.0170, lng: 105.8454 },
    phone: '+84 24 3943 4106',
    openingHours: {
      monday: '08:00 - 21:00',
      tuesday: '08:00 - 21:00',
      wednesday: '08:00 - 21:00',
      thursday: '08:00 - 21:00',
      friday: '08:00 - 21:00',
      saturday: '08:00 - 21:00',
      sunday: '08:00 - 21:00'
    },
    isOpen24Hours: false,
    dietaryOptions: [],
    cuisineType: 'Vietnamese',
    features: ['Historic', 'Local Favorite', 'Authentic']
  },
  {
    id: 'the-workshop-cafe',
    name: 'The Workshop Coffee',
    category: 'cafe',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    rating: 4.5,
    reviewCount: 678,
    priceLevel: '$$',
    avgCostPerPerson: 120000,
    description: 'Trendy specialty coffee shop known for expertly crafted Vietnamese and international coffee drinks. Industrial-chic interior perfect for working or relaxing.',
    address: '27 Ngô Đức Kế, Bến Nghé, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7740, lng: 106.7019 },
    phone: '+84 28 3824 6801',
    website: 'https://workshopcoffee.com',
    openingHours: {
      monday: '07:30 - 22:00',
      tuesday: '07:30 - 22:00',
      wednesday: '07:30 - 22:00',
      thursday: '07:30 - 22:00',
      friday: '07:30 - 22:00',
      saturday: '08:00 - 23:00',
      sunday: '08:00 - 23:00'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian', 'vegan'],
    cuisineType: 'Cafe',
    features: ['WiFi', 'Specialty Coffee', 'Instagram-worthy', 'Workspace']
  },
  {
    id: 'cong-caphe',
    name: 'Cộng Cà Phê',
    category: 'cafe',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
    rating: 4.4,
    reviewCount: 1432,
    priceLevel: '$',
    avgCostPerPerson: 70000,
    description: 'Vietnamese propaganda-themed cafe chain serving traditional coconut coffee and tea in nostalgic communist-era decor. Unique cultural experience.',
    address: '26 Lý Tự Trọng, Bến Nghé, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7744, lng: 106.7018 },
    phone: '+84 91 899 2635',
    openingHours: {
      monday: '07:00 - 23:00',
      tuesday: '07:00 - 23:00',
      wednesday: '07:00 - 23:00',
      thursday: '07:00 - 23:00',
      friday: '07:00 - 23:00',
      saturday: '07:00 - 00:00',
      sunday: '07:00 - 00:00'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian', 'vegan'],
    cuisineType: 'Vietnamese Cafe',
    features: ['Cultural', 'Unique Decor', 'Photo Spot', 'Local Chain']
  },
  {
    id: 'apartment-cafe',
    name: 'The Apartment',
    category: 'cafe',
    images: [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
    rating: 4.6,
    reviewCount: 543,
    priceLevel: '$$',
    avgCostPerPerson: 150000,
    description: 'Multi-floor cafe and restaurant in a renovated apartment building. Each floor has different ambiance from cozy cafe to rooftop bar with city views.',
    address: '50 Ngô Đức Kế, Bến Nghé, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7750, lng: 106.7025 },
    phone: '+84 28 6291 3024',
    website: 'https://theapartment.com.vn',
    openingHours: {
      monday: '10:00 - 23:00',
      tuesday: '10:00 - 23:00',
      wednesday: '10:00 - 23:00',
      thursday: '10:00 - 23:00',
      friday: '10:00 - 00:00',
      saturday: '10:00 - 00:00',
      sunday: '10:00 - 23:00'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian', 'vegan'],
    cuisineType: 'International',
    features: ['Rooftop', 'Bar', 'Restaurant', 'Multiple Floors', 'City Views']
  },
  {
    id: 'secret-garden',
    name: 'Secret Garden Restaurant',
    category: 'restaurant',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    rating: 4.5,
    reviewCount: 912,
    priceLevel: '$$',
    avgCostPerPerson: 180000,
    description: 'Hidden rooftop garden restaurant serving Vietnamese home-style cooking in a charming, lush setting. Must climb 5 floors but worth it for the atmosphere.',
    address: '158 Pasteur, Phường 6, Quận 3, Ho Chi Minh City',
    coordinates: { lat: 10.7830, lng: 106.6936 },
    phone: '+84 28 3822 2330',
    openingHours: {
      monday: '11:00 - 22:00',
      tuesday: '11:00 - 22:00',
      wednesday: '11:00 - 22:00',
      thursday: '11:00 - 22:00',
      friday: '11:00 - 22:00',
      saturday: '11:00 - 22:00',
      sunday: '11:00 - 22:00'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian'],
    cuisineType: 'Vietnamese',
    features: ['Rooftop', 'Garden', 'Romantic', 'Hidden Gem']
  },
  {
    id: 'ben-thanh-market',
    name: 'Bến Thành Market',
    category: 'attraction',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
    rating: 4.2,
    reviewCount: 2341,
    priceLevel: '$',
    avgCostPerPerson: 0,
    description: 'Iconic central market built in 1914, offering everything from souvenirs and handicrafts to street food and local products. A must-visit for experiencing local culture.',
    address: 'Lê Lợi, Phường Bến Thành, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7720, lng: 106.6980 },
    phone: '+84 28 3822 5699',
    openingHours: {
      monday: '06:00 - 18:00',
      tuesday: '06:00 - 18:00',
      wednesday: '06:00 - 18:00',
      thursday: '06:00 - 18:00',
      friday: '06:00 - 18:00',
      saturday: '06:00 - 18:00',
      sunday: '06:00 - 18:00'
    },
    isOpen24Hours: false,
    dietaryOptions: [],
    features: ['Shopping', 'Food Court', 'Historic', 'Cultural', 'Souvenirs']
  },
  {
    id: 'war-remnants-museum',
    name: 'War Remnants Museum',
    category: 'attraction',
    images: [
      'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800',
      'https://images.unsplash.com/photo-1581093458791-9d42bbee7c13?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800',
    rating: 4.6,
    reviewCount: 3124,
    priceLevel: '$',
    avgCostPerPerson: 40000,
    description: 'Powerful museum documenting the Vietnam War through photos, military equipment, and artifacts. Educational and moving experience for understanding Vietnamese history.',
    address: '28 Võ Văn Tần, Phường 6, Quận 3, Ho Chi Minh City',
    coordinates: { lat: 10.7797, lng: 106.6918 },
    phone: '+84 28 3930 5587',
    website: 'https://warremnantsmuseum.com',
    openingHours: {
      monday: '07:30 - 17:30',
      tuesday: '07:30 - 17:30',
      wednesday: '07:30 - 17:30',
      thursday: '07:30 - 17:30',
      friday: '07:30 - 17:30',
      saturday: '07:30 - 17:30',
      sunday: '07:30 - 17:30'
    },
    isOpen24Hours: false,
    dietaryOptions: [],
    features: ['Museum', 'Historic', 'Educational', 'Photo Exhibition']
  },
  {
    id: 'notre-dame-cathedral',
    name: 'Notre-Dame Cathedral Basilica',
    category: 'attraction',
    images: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
    rating: 4.5,
    reviewCount: 2876,
    priceLevel: '$',
    avgCostPerPerson: 0,
    description: 'Historic French colonial cathedral built in 1880 with beautiful neo-Romanesque architecture. Currently under renovation but exterior still impressive for photos.',
    address: '01 Công xã Paris, Bến Nghé, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7797, lng: 106.6990 },
    phone: '+84 28 3822 0477',
    openingHours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '08:00 - 17:00',
      sunday: '08:00 - 17:00'
    },
    isOpen24Hours: false,
    dietaryOptions: [],
    features: ['Historic', 'Architecture', 'Photo Spot', 'Religious Site']
  },
  {
    id: 'hoan-kiem-lake',
    name: 'Hoàn Kiếm Lake',
    category: 'attraction',
    images: [
      'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800',
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800',
    rating: 4.7,
    reviewCount: 4521,
    priceLevel: '$',
    avgCostPerPerson: 0,
    description: 'The heart and soul of Hanoi. Beautiful lake surrounded by walking paths, temples, and vibrant street life. Perfect for morning walks and evening strolls.',
    address: 'Hàng Trống, Hoàn Kiếm, Hanoi',
    coordinates: { lat: 21.0285, lng: 105.8542 },
    phone: '',
    openingHours: {
      monday: '00:00 - 23:59',
      tuesday: '00:00 - 23:59',
      wednesday: '00:00 - 23:59',
      thursday: '00:00 - 23:59',
      friday: '00:00 - 23:59',
      saturday: '00:00 - 23:59',
      sunday: '00:00 - 23:59'
    },
    isOpen24Hours: true,
    dietaryOptions: [],
    features: ['Park', 'Lake', 'Walking', 'Cultural', 'Free Entry']
  },
  {
    id: 'temple-of-literature',
    name: 'Temple of Literature',
    category: 'attraction',
    images: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
    rating: 4.6,
    reviewCount: 3245,
    priceLevel: '$',
    avgCostPerPerson: 30000,
    description: "Vietnam's first national university, built in 1070. Stunning example of traditional Vietnamese architecture with peaceful courtyards and ancient stone steles.",
    address: '58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hanoi',
    coordinates: { lat: 21.0277, lng: 105.8355 },
    phone: '+84 24 3845 2917',
    openingHours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 17:00',
      saturday: '08:00 - 17:00',
      sunday: '08:00 - 17:00'
    },
    isOpen24Hours: false,
    dietaryOptions: [],
    features: ['Temple', 'Historic', 'Architecture', 'Garden', 'Educational']
  },
  {
    id: 'propaganda-bistro',
    name: 'Propaganda Bistro',
    category: 'restaurant',
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    rating: 4.4,
    reviewCount: 678,
    priceLevel: '$$',
    avgCostPerPerson: 200000,
    description: 'Stylish bistro serving elevated Vietnamese cuisine in vintage propaganda-inspired decor. Modern takes on traditional dishes with creative presentation.',
    address: '21 Hàn Thuyên, Bến Nghé, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7770, lng: 106.7040 },
    phone: '+84 28 3822 9048',
    website: 'https://propagandabistro.com',
    openingHours: {
      monday: '11:00 - 23:00',
      tuesday: '11:00 - 23:00',
      wednesday: '11:00 - 23:00',
      thursday: '11:00 - 23:00',
      friday: '11:00 - 00:00',
      saturday: '11:00 - 00:00',
      sunday: '11:00 - 23:00'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian', 'vegan'],
    cuisineType: 'Vietnamese Fusion',
    features: ['Modern Vietnamese', 'Bar', 'Cocktails', 'Stylish Decor']
  },
  {
    id: 'com-tam-ba-ghien',
    name: 'Cơm Tấm Bà Ghiền',
    category: 'restaurant',
    images: [
      'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=800',
    rating: 4.7,
    reviewCount: 423,
    priceLevel: '$',
    avgCostPerPerson: 55000,
    description: 'Authentic broken rice specialist serving grilled pork chop, shredded pork skin, and egg with perfectly cooked broken rice. Local favorite for quick meals.',
    address: '80 Lê Lai, Phường Bến Thành, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7690, lng: 106.6952 },
    phone: '+84 90 123 4567',
    openingHours: {
      monday: '06:00 - 21:00',
      tuesday: '06:00 - 21:00',
      wednesday: '06:00 - 21:00',
      thursday: '06:00 - 21:00',
      friday: '06:00 - 21:00',
      saturday: '06:00 - 21:00',
      sunday: '06:00 - 21:00'
    },
    isOpen24Hours: false,
    dietaryOptions: [],
    cuisineType: 'Vietnamese',
    features: ['Local Favorite', 'Quick Service', 'Affordable']
  },
  {
    id: 'highland-coffee',
    name: 'Highlands Coffee',
    category: 'cafe',
    images: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
    rating: 4.3,
    reviewCount: 1567,
    priceLevel: '$$',
    avgCostPerPerson: 90000,
    description: "Vietnam's most popular coffee chain offering reliable Vietnamese and Western coffee drinks with comfortable seating. Great for meetings or remote work.",
    address: '234 Pasteur, Võ Thị Sáu, Quận 3, Ho Chi Minh City',
    coordinates: { lat: 10.7820, lng: 106.6945 },
    phone: '+84 28 3930 0686',
    website: 'https://highlandscoffee.com.vn',
    openingHours: {
      monday: '06:30 - 23:00',
      tuesday: '06:30 - 23:00',
      wednesday: '06:30 - 23:00',
      thursday: '06:30 - 23:00',
      friday: '06:30 - 23:00',
      saturday: '07:00 - 23:30',
      sunday: '07:00 - 23:30'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian', 'vegan'],
    cuisineType: 'Vietnamese Cafe',
    features: ['WiFi', 'Air Conditioning', 'Chain', 'Reliable', 'Workspace']
  },
  {
    id: 'saigon-skydeck',
    name: 'Saigon Skydeck',
    category: 'attraction',
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
    rating: 4.5,
    reviewCount: 2134,
    priceLevel: '$$',
    avgCostPerPerson: 200000,
    description: 'Observation deck on the 49th floor of Bitexco Tower offering 360-degree panoramic views of Saigon. Best visited at sunset for spectacular cityscape views.',
    address: '36 Hồ Tùng Mậu, Bến Nghé, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7718, lng: 106.7038 },
    phone: '+84 28 3915 6156',
    website: 'https://saigon-skydeck.com',
    openingHours: {
      monday: '09:30 - 21:30',
      tuesday: '09:30 - 21:30',
      wednesday: '09:30 - 21:30',
      thursday: '09:30 - 21:30',
      friday: '09:30 - 21:30',
      saturday: '09:30 - 21:30',
      sunday: '09:30 - 21:30'
    },
    isOpen24Hours: false,
    dietaryOptions: [],
    features: ['Observation Deck', 'City Views', 'Photo Spot', 'Sunset Views']
  },
  {
    id: 'l-usine-cafe',
    name: "L'Usine Cafe",
    category: 'cafe',
    images: [
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800',
    rating: 4.5,
    reviewCount: 891,
    priceLevel: '$$',
    avgCostPerPerson: 140000,
    description: 'Chic concept store combining specialty coffee, boutique shopping, and art gallery. Industrial-minimalist design popular with creative professionals and expats.',
    address: '151/5 Đồng Khởi, Bến Nghé, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7760, lng: 106.7045 },
    phone: '+84 28 6674 3565',
    website: 'https://lusinespace.com',
    openingHours: {
      monday: '08:00 - 22:00',
      tuesday: '08:00 - 22:00',
      wednesday: '08:00 - 22:00',
      thursday: '08:00 - 22:00',
      friday: '08:00 - 23:00',
      saturday: '08:00 - 23:00',
      sunday: '08:00 - 22:00'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian', 'vegan'],
    cuisineType: 'Cafe',
    features: ['WiFi', 'Shopping', 'Art Gallery', 'Boutique', 'Specialty Coffee']
  },
  {
    id: 'ao-dai-museum',
    name: 'Ao Dai Museum',
    category: 'attraction',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    rating: 4.4,
    reviewCount: 567,
    priceLevel: '$',
    avgCostPerPerson: 50000,
    description: "Unique museum dedicated to Vietnam's traditional dress, the ao dai. Beautiful collection showcasing the evolution of this iconic garment through history.",
    address: '206 Đường 61, Thảo Điền, Quận 2, Ho Chi Minh City',
    coordinates: { lat: 10.8023, lng: 106.7396 },
    phone: '+84 28 3744 2844',
    openingHours: {
      monday: 'Closed',
      tuesday: '09:00 - 17:00',
      wednesday: '09:00 - 17:00',
      thursday: '09:00 - 17:00',
      friday: '09:00 - 17:00',
      saturday: '09:00 - 17:00',
      sunday: '09:00 - 17:00'
    },
    isOpen24Hours: false,
    dietaryOptions: [],
    features: ['Museum', 'Cultural', 'Fashion', 'Photo Opportunity']
  },
  {
    id: 'nha-hang-ngon',
    name: 'Nhà Hàng Ngon',
    category: 'restaurant',
    images: [
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800',
    rating: 4.3,
    reviewCount: 2341,
    priceLevel: '$$',
    avgCostPerPerson: 150000,
    description: 'Popular restaurant featuring Vietnamese street food in comfortable, upscale setting. Large menu with dishes from across Vietnam, perfect for first-time visitors.',
    address: '160 Pasteur, Phường 6, Quận 3, Ho Chi Minh City',
    coordinates: { lat: 10.7830, lng: 106.6938 },
    phone: '+84 28 3827 7131',
    openingHours: {
      monday: '07:00 - 22:00',
      tuesday: '07:00 - 22:00',
      wednesday: '07:00 - 22:00',
      thursday: '07:00 - 22:00',
      friday: '07:00 - 22:00',
      saturday: '07:00 - 22:00',
      sunday: '07:00 - 22:00'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian'],
    cuisineType: 'Vietnamese',
    features: ['Family Friendly', 'Tourist Friendly', 'Large Menu', 'Garden Seating']
  },
  {
    id: 'trung-nguyen-coffee',
    name: 'Trung Nguyên Legend Café',
    category: 'cafe',
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'
    ],
    coverImage: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
    rating: 4.2,
    reviewCount: 789,
    priceLevel: '$$',
    avgCostPerPerson: 85000,
    description: "Famous Vietnamese coffee chain known for their legendary blends and unique coffee brewing rituals. Try their signature weasel coffee experience.",
    address: '26-28 Lê Thánh Tôn, Bến Nghé, Quận 1, Ho Chi Minh City',
    coordinates: { lat: 10.7742, lng: 106.7025 },
    phone: '+84 28 3825 4240',
    website: 'https://trungnguyenlegend.com',
    openingHours: {
      monday: '06:00 - 23:00',
      tuesday: '06:00 - 23:00',
      wednesday: '06:00 - 23:00',
      thursday: '06:00 - 23:00',
      friday: '06:00 - 23:00',
      saturday: '06:00 - 23:00',
      sunday: '06:00 - 23:00'
    },
    isOpen24Hours: false,
    dietaryOptions: ['vegetarian'],
    cuisineType: 'Vietnamese Coffee',
    features: ['Vietnamese Coffee', 'Coffee Ceremony', 'Traditional', 'Chain']
  }
]
