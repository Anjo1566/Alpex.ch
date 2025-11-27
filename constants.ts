export const DEMO_TRIPS = [
  {
    id: 'demo-1',
    destination: 'Lissabon',
    country: 'Portugal',
    startDate: '2025-03-15',
    endDate: '2025-03-20',
    durationDays: 5,
    travelers: 2,
    description: 'Romantischer Kurztrip mit Alfama, Stränden und Pastéis.',
    imageUrl: 'https://picsum.photos/seed/lisbon/800/600',
    rating: 4.8,
    reviewsCount: 2340,
    priceFlight: 356,
    priceHotel: 420,
    priceActivities: 120,
    totalPrice: 896,
    highlights: ['Pastéis de Belém', 'Tram 28', 'Sintra Tagestrip'],
    status: 'booked'
  },
  {
    id: 'demo-2',
    destination: 'Bali',
    country: 'Indonesien',
    startDate: '2025-06-01',
    endDate: '2025-06-14',
    durationDays: 14,
    travelers: 1,
    description: 'Yoga Retreat und Dschungel Abenteuer.',
    imageUrl: 'https://picsum.photos/seed/bali/800/600',
    rating: 4.9,
    reviewsCount: 120,
    priceFlight: 1200,
    priceHotel: 800,
    priceActivities: 400,
    totalPrice: 2400,
    highlights: ['Ubud Monkey Forest', 'Surfing Canggu', 'Tempel Besuch'],
    status: 'draft'
  }
];

export const MOCK_USER = {
  id: 'u1',
  name: 'Lukas Meier',
  email: 'lukas@example.ch',
  avatarUrl: 'https://picsum.photos/seed/user/200/200'
};
