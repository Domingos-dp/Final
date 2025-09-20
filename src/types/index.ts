// Tipos principais da aplicação

// Tipos de usuário
export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  languages?: string[];
  isHost?: boolean;
  isVerified?: boolean;
  isSuperhost?: boolean;
  bio?: string;
  location?: string;
  role?: 'user' | 'host' | 'admin';
  favorites?: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Tipos de propriedade/acomodação
export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  images: string[];
  location: Location;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  hostId: string;
  host: User;
  availability: DateRange[];
  rules: string[];
  cancellationPolicy: CancellationPolicy;
  isInstantBook: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType = 
  | 'hotel'
  | 'apartment'
  | 'house'
  | 'villa'
  | 'resort'
  | 'lodge'
  | 'guesthouse'
  | 'hostel'
  | 'camping';

// Tipos de experiência
export interface Experience {
  id: string;
  title: string;
  description: string;
  category: ExperienceCategory;
  images: string[];
  location: Location;
  duration: number; // em horas
  maxParticipants: number;
  minAge?: number;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  hostId: string;
  host: User;
  included: string[];
  requirements: string[];
  itinerary: ItineraryItem[];
  availability: DateRange[];
  cancellationPolicy: CancellationPolicy;
  createdAt: string;
  updatedAt: string;
}

export type ExperienceCategory = 
  | 'adventure'
  | 'culture'
  | 'nature'
  | 'food'
  | 'history'
  | 'wildlife'
  | 'photography'
  | 'music'
  | 'sports'
  | 'wellness';

export interface ItineraryItem {
  time: string;
  activity: string;
  location?: string;
  duration?: number;
}

// Tipos de localização
export interface Location {
  address: string;
  city: string;
  province: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zipCode?: string;
}

// Tipos de reserva
export interface Booking {
  id: string;
  userId: string;
  user: User;
  propertyId?: string;
  property?: Property;
  experienceId?: string;
  experience?: Experience;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights?: number;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no-show';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'refunded'
  | 'failed';

// Tipos de avaliação
export interface Review {
  id: string;
  userId: string;
  user: User;
  propertyId?: string;
  experienceId?: string;
  bookingId: string;
  rating: number;
  comment: string;
  images?: string[];
  response?: {
    comment: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Tipos de busca e filtros
export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  propertyTypes?: PropertyType[];
  priceRange?: {
    min: number;
    max: number;
  };
  amenities?: string[];
  rating?: number;
  instantBook?: boolean;
}

export interface ExperienceFilters {
  location?: string;
  date?: string;
  participants?: number;
  categories?: ExperienceCategory[];
  priceRange?: {
    min: number;
    max: number;
  };
  duration?: {
    min: number;
    max: number;
  };
  rating?: number;
}

// Tipos utilitários
export interface DateRange {
  startDate: string;
  endDate: string;
}

export type CancellationPolicy = 
  | 'flexible'
  | 'moderate'
  | 'strict'
  | 'super-strict';

export interface ApiResponse<T> {
  data: T | null;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos de notificação
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

export type NotificationType = 
  | 'booking'
  | 'payment'
  | 'review'
  | 'message'
  | 'promotion'
  | 'system';

// Tipos de chat/mensagem
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  type: MessageType;
  attachments?: string[];
  isRead: boolean;
  createdAt: string;
}

export type MessageType = 'text' | 'image' | 'file' | 'system';

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

// Tipos de comparação de preços
export interface PriceComparison {
  propertyId: string;
  property: Property;
  prices: PlatformPrice[];
  lowestPrice: number;
  averagePrice: number;
  currency: string;
}

export interface PlatformPrice {
  platform: string;
  price: number;
  url: string;
  features: string[];
  rating?: number;
  availability: boolean;
}

// Tipos de dashboard
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  occupancyRate: number;
  newMessages: number;
  pendingReviews: number;
}

export interface HostStats extends DashboardStats {
  totalProperties: number;
  totalExperiences: number;
  monthlyEarnings: number;
  upcomingBookings: number;
}

// Tipos de formulário
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  agreeToTerms: boolean;
  subscribeNewsletter?: boolean;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
  confirmPassword: string;
}

// Tipos de configuração
export interface AppConfig {
  apiUrl: string;
  mapboxToken: string;
  stripePublicKey: string;
  supportedCurrencies: string[];
  supportedLanguages: string[];
  defaultCurrency: string;
  defaultLanguage: string;
}

// Tipos de erro
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  
}

// Tipos de contexto
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginForm) => Promise<void>;
  register: (data: RegisterForm) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface SearchContextType {
  filters: SearchFilters;
  results: Property[];
  isLoading: boolean;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  search: () => Promise<void>;
  clearFilters: () => void;
}

// Tipos de componente
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends ComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface CardProps extends ComponentProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}