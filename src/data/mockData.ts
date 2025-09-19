// Dados mock para desenvolvimento e testes

import { 
  User, 
  Property, 
  Experience, 
  Booking, 
  Review, 
  Notification, 
  Message, 
  Conversation,
  PriceComparison,
  DashboardStats,
  HostStats
} from '@/types';

// Usuários mock
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'joao.silva@email.com',
    name: 'João Silva',
    firstName: 'João',
    lastName: 'Silva',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '+244912345678',
    dateOfBirth: '1985-03-15',
    nationality: 'Angola',
    languages: ['Português', 'Inglês'],
    isHost: true,
    isVerified: true,
    role: 'host',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    email: 'maria.santos@email.com',
    name: 'Maria Santos',
    firstName: 'Maria',
    lastName: 'Santos',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    phone: '+244923456789',
    dateOfBirth: '1990-07-22',
    nationality: 'Angola',
    languages: ['Português', 'Francês'],
    isHost: false,
    isVerified: true,
    role: 'user',
    createdAt: '2023-02-20T14:30:00Z',
    updatedAt: '2024-01-10T09:15:00Z'
  },
  {
    id: '3',
    email: 'carlos.mendes@email.com',
    name: 'Carlos Mendes',
    firstName: 'Carlos',
    lastName: 'Mendes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '+244934567890',
    dateOfBirth: '1978-11-08',
    nationality: 'Angola',
    languages: ['Português', 'Inglês', 'Espanhol'],
    isHost: true,
    isVerified: true,
    isSuperhost: true,
    role: 'host',
    createdAt: '2022-11-05T16:45:00Z',
    updatedAt: '2024-01-12T11:20:00Z'
  },
  {
    id: 'user2',
    email: 'ana.costa@email.com',
    name: 'Ana Costa',
    firstName: 'Ana',
    lastName: 'Costa',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    phone: '+244945678901',
    dateOfBirth: '1992-05-18',
    nationality: 'Angola',
    languages: ['Português'],
    isHost: false,
    isVerified: true,
    role: 'user',
    createdAt: '2023-05-10T08:30:00Z',
    updatedAt: '2024-01-05T14:15:00Z'
  },
  {
    id: 'user3',
    email: 'pedro.oliveira@email.com',
    name: 'Pedro Oliveira',
    firstName: 'Pedro',
    lastName: 'Oliveira',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    phone: '+244956789012',
    dateOfBirth: '1987-09-25',
    nationality: 'Angola',
    languages: ['Português', 'Inglês'],
    isHost: false,
    isVerified: true,
    role: 'user',
    createdAt: '2023-03-22T12:45:00Z',
    updatedAt: '2024-01-08T16:30:00Z'
  },
  {
    id: 'user4',
    email: 'lucia.fernandes@email.com',
    name: 'Lúcia Fernandes',
    firstName: 'Lúcia',
    lastName: 'Fernandes',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    phone: '+244967890123',
    dateOfBirth: '1991-12-03',
    nationality: 'Angola',
    languages: ['Português', 'Francês'],
    isHost: false,
    isVerified: true,
    role: 'user',
    createdAt: '2023-07-14T09:20:00Z',
    updatedAt: '2024-01-12T11:45:00Z'
  }
];

// Propriedades mock
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Villa Luxuosa na Ilha do Mussulo',
    description: 'Uma villa espetacular com vista para o mar, localizada na paradisíaca Ilha do Mussulo. Perfeita para relaxar e desfrutar das belas praias de Angola.',
    type: 'villa',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'
    ],
    location: {
      address: 'Ilha do Mussulo',
      city: 'Luanda',
      province: 'Luanda',
      country: 'Angola',
      coordinates: { lat: -8.9094, lng: 13.1975 },
      zipCode: '1000'
    },
    amenities: ['Wi-Fi', 'Piscina', 'Ar Condicionado', 'Cozinha', 'Estacionamento', 'Vista para o Mar', 'Jardim'],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    pricePerNight: 25000,
    currency: 'AOA',
    rating: 4.8,
    reviewCount: 24,
    hostId: '1',
    host: mockUsers[0],
    availability: [
      { startDate: '2024-02-01', endDate: '2024-02-28' },
      { startDate: '2024-03-15', endDate: '2024-04-30' }
    ],
    rules: ['Não fumar', 'Não são permitidos animais', 'Festa/evento não permitido'],
    cancellationPolicy: 'moderate',
    isInstantBook: true,
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2024-01-10T15:30:00Z'
  },
  {
    id: '2',
    title: 'Apartamento Moderno no Centro de Luanda',
    description: 'Apartamento contemporâneo no coração de Luanda, próximo aos principais pontos turísticos e comerciais da cidade.',
    type: 'apartment',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
    ],
    location: {
      address: 'Rua Amílcar Cabral, 123',
      city: 'Luanda',
      province: 'Luanda',
      country: 'Angola',
      coordinates: { lat: -8.8390, lng: 13.2894 },
      zipCode: '1001'
    },
    amenities: ['Wi-Fi', 'Ar Condicionado', 'Cozinha', 'Elevador', 'Segurança 24h'],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 12000,
    currency: 'AOA',
    rating: 4.5,
    reviewCount: 18,
    hostId: '3',
    host: mockUsers[2],
    availability: [
      { startDate: '2024-02-10', endDate: '2024-03-10' },
      { startDate: '2024-04-01', endDate: '2024-05-31' }
    ],
    rules: ['Não fumar', 'Silêncio após 22h'],
    cancellationPolicy: 'flexible',
    isInstantBook: false,
    createdAt: '2023-08-20T14:15:00Z',
    updatedAt: '2024-01-08T09:45:00Z'
  },
  {
    id: '3',
    title: 'Lodge Eco-Friendly no Parque Nacional da Kissama',
    description: 'Experiência única de safari em lodge sustentável no Parque Nacional da Kissama, com observação da vida selvagem.',
    type: 'lodge',
    images: [
      'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    location: {
      address: 'Parque Nacional da Kissama',
      city: 'Kissama',
      province: 'Bengo',
      country: 'Angola',
      coordinates: { lat: -9.1667, lng: 13.8333 },
      zipCode: '2000'
    },
    amenities: ['Wi-Fi', 'Restaurante', 'Safari', 'Observação de Animais', 'Fogueira'],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    pricePerNight: 18000,
    currency: 'AOA',
    rating: 4.9,
    reviewCount: 31,
    hostId: '1',
    host: mockUsers[0],
    availability: [
      { startDate: '2024-03-01', endDate: '2024-06-30' },
      { startDate: '2024-08-01', endDate: '2024-11-30' }
    ],
    rules: ['Respeitar a vida selvagem', 'Não fazer barulho excessivo'],
    cancellationPolicy: 'strict',
    isInstantBook: true,
    createdAt: '2023-04-10T11:30:00Z',
    updatedAt: '2024-01-05T16:20:00Z'
  }
];

// Experiências mock
export const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'Tour Cultural pela Cidade Baixa de Luanda',
    description: 'Descubra a rica história e cultura de Angola através de um tour guiado pela histórica Cidade Baixa de Luanda.',
    category: 'culture',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
    ],
    location: {
      address: 'Cidade Baixa',
      city: 'Luanda',
      province: 'Luanda',
      country: 'Angola',
      coordinates: { lat: -8.8390, lng: 13.2894 }
    },
    duration: 4,
    maxParticipants: 12,
    minAge: 12,
    price: 8000,
    currency: 'AOA',
    rating: 4.7,
    reviewCount: 45,
    hostId: '3',
    host: mockUsers[2],
    included: ['Guia especializado', 'Transporte', 'Lanche', 'Entrada em museus'],
    requirements: ['Calçado confortável', 'Protetor solar', 'Câmera fotográfica'],
    itinerary: [
      { time: '09:00', activity: 'Encontro no Largo do Kinaxixi', duration: 30 },
      { time: '09:30', activity: 'Visita ao Museu Nacional de Antropologia', duration: 90 },
      { time: '11:00', activity: 'Caminhada pela Fortaleza de São Miguel', duration: 60 },
      { time: '12:00', activity: 'Almoço tradicional angolano', duration: 60 },
      { time: '13:00', activity: 'Visita ao Mercado do Benfica', duration: 90 }
    ],
    availability: [
      { startDate: '2024-02-01', endDate: '2024-12-31' }
    ],
    cancellationPolicy: 'moderate',
    createdAt: '2023-07-12T09:15:00Z',
    updatedAt: '2024-01-03T14:45:00Z'
  },
  {
    id: '2',
    title: 'Safari Fotográfico no Parque Nacional da Kissama',
    description: 'Aventura inesquecível de safari fotográfico para observar elefantes, antílopes e outras espécies da fauna angolana.',
    category: 'wildlife',
    images: [
      'https://images.unsplash.com/photo-1520637736862-4d197d17c93a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    location: {
      address: 'Parque Nacional da Kissama',
      city: 'Kissama',
      province: 'Bengo',
      country: 'Angola',
      coordinates: { lat: -9.1667, lng: 13.8333 }
    },
    duration: 8,
    maxParticipants: 8,
    minAge: 16,
    price: 15000,
    currency: 'AOA',
    rating: 4.9,
    reviewCount: 28,
    hostId: '1',
    host: mockUsers[0],
    included: ['Veículo 4x4', 'Guia especializado', 'Almoço', 'Água', 'Binóculos'],
    requirements: ['Roupas neutras', 'Chapéu', 'Protetor solar', 'Câmera com zoom'],
    itinerary: [
      { time: '06:00', activity: 'Saída de Luanda', duration: 120 },
      { time: '08:00', activity: 'Chegada ao parque e briefing', duration: 30 },
      { time: '08:30', activity: 'Safari matinal', duration: 180 },
      { time: '12:00', activity: 'Almoço no lodge', duration: 60 },
      { time: '13:00', activity: 'Safari vespertino', duration: 180 },
      { time: '16:00', activity: 'Retorno a Luanda', duration: 120 }
    ],
    availability: [
      { startDate: '2024-03-01', endDate: '2024-11-30' }
    ],
    cancellationPolicy: 'strict',
    createdAt: '2023-05-18T13:20:00Z',
    updatedAt: '2024-01-07T10:30:00Z'
  }
];

// Reservas mock
export const mockBookings: Booking[] = [
  {
    id: '1',
    userId: '2',
    user: mockUsers[1],
    propertyId: '1',
    property: mockProperties[0],
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    guests: 4,
    totalPrice: 125000,
    currency: 'AOA',
    status: 'confirmed',
    paymentStatus: 'paid',
    specialRequests: 'Chegada após 18h',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    experienceId: '1',
    experience: mockExperiences[0],
    checkIn: '2024-02-25',
    checkOut: '2024-02-25',
    guests: 2,
    totalPrice: 16000,
    currency: 'AOA',
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-01-15T09:45:00Z',
    updatedAt: '2024-01-15T09:45:00Z'
  }
];

// Avaliações mock
export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '2',
    user: mockUsers[1],
    propertyId: '1',
    bookingId: '1',
    rating: 5,
    comment: 'Experiência incrível! A villa é ainda mais bonita do que nas fotos. O João foi um anfitrião excepcional.',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop'],
    response: {
      comment: 'Muito obrigado pela avaliação! Foi um prazer recebê-los.',
      createdAt: '2024-01-12T10:15:00Z'
    },
    createdAt: '2024-01-11T16:20:00Z',
    updatedAt: '2024-01-11T16:20:00Z'
  }
];

// Notificações mock
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'booking',
    title: 'Nova Reserva',
    message: 'Você recebeu uma nova reserva para Villa Luxuosa na Ilha do Mussulo',
    isRead: false,
    data: { bookingId: '1' },
    createdAt: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    type: 'review',
    title: 'Avalie sua Estadia',
    message: 'Como foi sua experiência na Villa Luxuosa? Deixe sua avaliação.',
    isRead: true,
    data: { bookingId: '1' },
    createdAt: '2024-01-10T09:00:00Z'
  }
];

// Mensagens mock
export const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '2',
    sender: mockUsers[1],
    content: 'Olá! Gostaria de saber mais detalhes sobre a villa.',
    type: 'text',
    isRead: true,
    createdAt: '2024-01-08T10:30:00Z'
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '1',
    sender: mockUsers[0],
    content: 'Olá Maria! Claro, ficarei feliz em ajudar. O que gostaria de saber?',
    type: 'text',
    isRead: true,
    createdAt: '2024-01-08T11:15:00Z'
  }
];

// Conversas mock
export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessages[1],
    unreadCount: 0,
    createdAt: '2024-01-08T10:30:00Z',
    updatedAt: '2024-01-08T11:15:00Z'
  }
];

// Comparação de preços mock
export const mockPriceComparisons: PriceComparison[] = [
  {
    propertyId: '1',
    property: mockProperties[0],
    prices: [
      {
        platform: 'Angola Travel',
        price: 25000,
        url: '/property/1',
        features: ['Cancelamento grátis', 'Reserva instantânea'],
        rating: 4.8,
        availability: true
      },
      {
        platform: 'Booking.com',
        price: 28000,
        url: 'https://booking.com/hotel/ao/villa-mussulo',
        features: ['Café da manhã incluído'],
        rating: 4.6,
        availability: true
      },
      {
        platform: 'Expedia',
        price: 26500,
        url: 'https://expedia.com/hotel/villa-mussulo',
        features: ['Pontos de fidelidade'],
        rating: 4.7,
        availability: false
      }
    ],
    lowestPrice: 25000,
    averagePrice: 26500,
    currency: 'AOA'
  }
];

// Estatísticas do dashboard mock
export const mockDashboardStats: DashboardStats = {
  totalBookings: 12,
  totalRevenue: 450000,
  averageRating: 4.7,
  occupancyRate: 75,
  newMessages: 3,
  pendingReviews: 2
};

// Estatísticas do host mock
export const mockHostStats: HostStats = {
  ...mockDashboardStats,
  totalProperties: 3,
  totalExperiences: 2,
  monthlyEarnings: 180000,
  upcomingBookings: 5
};

// Dados de gráficos mock
export const mockChartData = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 45000, bookings: 8 },
    { month: 'Fev', revenue: 52000, bookings: 12 },
    { month: 'Mar', revenue: 48000, bookings: 10 },
    { month: 'Abr', revenue: 61000, bookings: 15 },
    { month: 'Mai', revenue: 55000, bookings: 13 },
    { month: 'Jun', revenue: 67000, bookings: 18 }
  ],
  propertyPerformance: [
    { name: 'Villa Mussulo', bookings: 24, revenue: 600000, rating: 4.8 },
    { name: 'Apt Centro', bookings: 18, revenue: 216000, rating: 4.5 },
    { name: 'Lodge Kissama', bookings: 31, revenue: 558000, rating: 4.9 }
  ]
};

// Cidades populares mock
export const mockPopularCities = [
  {
    name: 'Luanda',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    properties: 156,
    averagePrice: 15000
  },
  {
    name: 'Benguela',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    properties: 89,
    averagePrice: 12000
  },
  {
    name: 'Huambo',
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop',
    properties: 67,
    averagePrice: 10000
  },
  {
    name: 'Lobito',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    properties: 45,
    averagePrice: 11000
  }
];

// Amenidades disponíveis
export const mockAmenities = [
  'Wi-Fi',
  'Piscina',
  'Ar Condicionado',
  'Cozinha',
  'Estacionamento',
  'Vista para o Mar',
  'Jardim',
  'Elevador',
  'Segurança 24h',
  'Restaurante',
  'Safari',
  'Observação de Animais',
  'Fogueira',
  'Academia',
  'Spa',
  'Bar',
  'Lavanderia',
  'Terraço',
  'Churrasqueira',
  'TV a Cabo'
];

// Tipos de propriedade com ícones
export const mockPropertyTypes = [
  { type: 'hotel', label: 'Hotel', icon: '🏨' },
  { type: 'apartment', label: 'Apartamento', icon: '🏢' },
  { type: 'house', label: 'Casa', icon: '🏠' },
  { type: 'villa', label: 'Villa', icon: '🏖️' },
  { type: 'resort', label: 'Resort', icon: '🏝️' },
  { type: 'lodge', label: 'Lodge', icon: '🏕️' },
  { type: 'guesthouse', label: 'Pousada', icon: '🏡' },
  { type: 'hostel', label: 'Hostel', icon: '🛏️' },
  { type: 'camping', label: 'Camping', icon: '⛺' }
];

// Categorias de experiência
export const mockExperienceCategories = [
  { category: 'adventure', label: 'Aventura', icon: '🏔️' },
  { category: 'culture', label: 'Cultura', icon: '🏛️' },
  { category: 'nature', label: 'Natureza', icon: '🌿' },
  { category: 'food', label: 'Gastronomia', icon: '🍽️' },
  { category: 'history', label: 'História', icon: '📚' },
  { category: 'wildlife', label: 'Vida Selvagem', icon: '🦁' },
  { category: 'photography', label: 'Fotografia', icon: '📸' },
  { category: 'music', label: 'Música', icon: '🎵' },
  { category: 'sports', label: 'Esportes', icon: '⚽' },
  { category: 'wellness', label: 'Bem-estar', icon: '🧘' }
];

export default {
  users: mockUsers,
  properties: mockProperties,
  experiences: mockExperiences,
  bookings: mockBookings,
  reviews: mockReviews,
  notifications: mockNotifications,
  messages: mockMessages,
  conversations: mockConversations,
  priceComparisons: mockPriceComparisons,
  dashboardStats: mockDashboardStats,
  hostStats: mockHostStats,
  chartData: mockChartData,
  popularCities: mockPopularCities,
  amenities: mockAmenities,
  propertyTypes: mockPropertyTypes,
  experienceCategories: mockExperienceCategories
};