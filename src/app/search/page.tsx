'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Star,
  Heart,
  Grid3X3,
  List,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Map,
  Home,
  Building,
  Hotel,
  TreePine,
  Mountain,
  Wifi,
  Waves,
  Car,
  Coffee,
  AirVent,
  Tv
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
// Card not used in this file
import { Input } from '@/components/ui/Input';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [instantBook, setInstantBook] = useState(false);
  const [superhost, setSuperhost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  useEffect(() => {
    // determine viewport size on client only
    const handleResize = () => setIsMobileViewport(window.innerWidth < 640);
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const properties = [
    {
      id: 1,
      name: 'Apartamento 2º andar',
      location: { city: 'Luanda', province: 'Angola' },
      type: 'Apartamento',
      price: 8000,
      rating: 4.9,
      reviews: 45,
      image: '/images/villa-namibe.jpg',
      amenities: ['wifi', 'pool', 'parking', 'kitchen'],
      superhost: true,
      instantBook: true,
      description: 'Luxuosa villa com vista para o mar',
      beds: 2,
      baths: 2,
      maxGuests: 4,
      agent: {
        name: 'Maria Kaniki',
        phone: '(+244 923 000 000)',
        initials: 'MK'
      }
    },
    {
      id: 2,
      name: 'Casa Colonial Huambo',
      location: { city: 'Huambo', province: 'Angola' },
      type: 'Casa',
      price: 7500,
      rating: 4.7,
      reviews: 32,
      image: '/images/casa-huambo.jpg',
      amenities: ['wifi', 'parking', 'kitchen', 'garden'],
      superhost: false,
      instantBook: true,
      description: 'Charmosa casa colonial no centro histórico',
      beds: 3,
      baths: 2,
      maxGuests: 6,
      agent: {
        name: 'João Silva',
        phone: '(+244 923 111 111)',
        initials: 'JS'
      }
    },
    {
      id: 3,
      name: 'Apartamento Marginal',
      location: { city: 'Luanda', province: 'Angola' },
      type: 'Apartamento',
      price: 9500,
      rating: 4.5,
      reviews: 28,
      image: '/images/apt-marginal.jpg',
      amenities: ['wifi', 'ac', 'tv', 'kitchen'],
      superhost: true,
      instantBook: false,
      description: 'Moderno apartamento na Marginal de Luanda',
      beds: 2,
      baths: 2,
      maxGuests: 4,
      agent: {
        name: 'Ana Santos',
        phone: '(+244 923 222 222)',
        initials: 'AS'
      }
    },
    {
      id: 4,
      name: 'Lodge Safari Kissama',
      location: { city: 'Kissama', province: 'Angola' },
      type: 'Lodge',
      price: 18000,
      rating: 4.8,
      reviews: 67,
      image: '/images/lodge-kissama.jpg',
      amenities: ['wifi', 'restaurant', 'pool', 'safari'],
      superhost: true,
      instantBook: true,
      description: 'Lodge exclusivo no Parque Nacional da Kissama',
      beds: 2,
      baths: 1,
      maxGuests: 4,
      agent: {
        name: 'Carlos Mendes',
        phone: '(+244 923 333 333)',
        initials: 'CM'
      }
    },
    {
      id: 5,
      name: 'Pousada Praia Benguela',
      location: { city: 'Benguela', province: 'Angola' },
      type: 'Pousada',
      price: 6500,
      rating: 4.6,
      reviews: 23,
      image: '/images/pousada-benguela.jpg',
      amenities: ['wifi', 'beach', 'restaurant', 'parking'],
      superhost: false,
      instantBook: true,
      description: 'Pousada aconchegante na praia de Benguela',
      beds: 2,
      baths: 1,
      maxGuests: 4,
      agent: {
        name: 'Maria Kaniki',
        phone: '(+244 923 000 000)',
        initials: 'MK'
      }
    },
    {
      id: 6,
      name: 'Hotel Boutique Lubango',
      location: { city: 'Lubango', province: 'Angola' },
      type: 'Hotel',
      price: 11000,
      rating: 4.4,
      reviews: 89,
      image: '/images/hotel-lubango.jpg',
      amenities: ['wifi', 'restaurant', 'spa', 'gym'],
      superhost: false,
      instantBook: false,
      description: 'Hotel boutique no coração de Lubango',
      beds: 1,
      baths: 1,
      maxGuests: 2,
      agent: {
        name: 'Pedro Costa',
        phone: '(+244 923 444 444)',
        initials: 'PC'
      }
    },
    {
      id: 7,
      name: 'Casa de Praia Lobito',
      location: { city: 'Lobito', province: 'Angola' },
      type: 'Casa',
      price: 8500,
      rating: 4.3,
      reviews: 19,
      image: '/images/casa-lobito.jpg',
      amenities: ['wifi', 'beach', 'parking', 'kitchen'],
      superhost: false,
      instantBook: true,
      description: 'Casa moderna na praia de Lobito',
      beds: 3,
      baths: 2,
      maxGuests: 6,
      agent: {
        name: 'Sofia Alves',
        phone: '(+244 923 555 555)',
        initials: 'SA'
      }
    },
    {
      id: 8,
      name: 'Apartamento Centro Luanda',
      location: { city: 'Luanda', province: 'Angola' },
      type: 'Apartamento',
      price: 7000,
      rating: 4.2,
      reviews: 15,
      image: '/images/apt-centro.jpg',
      amenities: ['wifi', 'ac', 'tv', 'kitchen'],
      superhost: false,
      instantBook: false,
      description: 'Apartamento no centro de Luanda',
      beds: 2,
      baths: 1,
      maxGuests: 4,
      agent: {
        name: 'Rui Fernandes',
        phone: '(+244 923 666 666)',
        initials: 'RF'
      }
    },
    {
      id: 9,
      name: 'Villa Tropical Cabinda',
      location: { city: 'Cabinda', province: 'Angola' },
      type: 'Villa',
      price: 15000,
      rating: 4.7,
      reviews: 34,
      image: '/images/villa-cabinda.jpg',
      amenities: ['wifi', 'pool', 'beach', 'parking'],
      superhost: true,
      instantBook: true,
      description: 'Villa tropical em Cabinda',
      beds: 4,
      baths: 3,
      maxGuests: 8,
      agent: {
        name: 'Isabel Monteiro',
        phone: '(+244 923 777 777)',
        initials: 'IM'
      }
    },
    {
      id: 10,
      name: 'Hotel Resort Benguela',
      location: { city: 'Benguela', province: 'Angola' },
      type: 'Hotel',
      price: 13000,
      rating: 4.6,
      reviews: 78,
      image: '/images/hotel-benguela.jpg',
      amenities: ['wifi', 'pool', 'restaurant', 'spa'],
      superhost: false,
      instantBook: true,
      description: 'Resort de luxo em Benguela',
      beds: 2,
      baths: 2,
      maxGuests: 4,
      agent: {
        name: 'António Pereira',
        phone: '(+244 923 888 888)',
        initials: 'AP'
      }
    },
    {
      id: 11,
      name: 'Casa Colonial Malanje',
      location: { city: 'Malanje', province: 'Angola' },
      type: 'Casa',
      price: 6000,
      rating: 4.1,
      reviews: 12,
      image: '/images/casa-malanje.jpg',
      amenities: ['wifi', 'parking', 'garden', 'kitchen'],
      superhost: false,
      instantBook: false,
      description: 'Casa colonial histórica em Malanje',
      beds: 2,
      baths: 1,
      maxGuests: 4,
      agent: {
        name: 'Teresa Oliveira',
        phone: '(+244 923 999 999)',
        initials: 'TO'
      }
    },
    {
      id: 12,
      name: 'Apartamento Moderno Huambo',
      location: { city: 'Huambo', province: 'Angola' },
      type: 'Apartamento',
      price: 5500,
      rating: 4.0,
      reviews: 8,
      image: '/images/apt-huambo.jpg',
      amenities: ['wifi', 'ac', 'tv', 'kitchen'],
      superhost: false,
      instantBook: true,
      description: 'Apartamento moderno em Huambo',
      beds: 1,
      baths: 1,
      maxGuests: 2,
      agent: {
        name: 'Miguel Rodrigues',
        phone: '(+244 923 000 001)',
        initials: 'MR'
      }
    }
  ];
  
  const propertyTypeOptions = [
    { id: 'villa', label: 'Villa', icon: Home },
    { id: 'casa', label: 'Casa', icon: Home },
    { id: 'apartamento', label: 'Apartamento', icon: Building },
    { id: 'hotel', label: 'Hotel', icon: Hotel },
    { id: 'lodge', label: 'Lodge', icon: TreePine },
    { id: 'pousada', label: 'Pousada', icon: Mountain }
  ];
  
  const amenityOptions = [
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'pool', label: 'Piscina', icon: Waves },
    { id: 'parking', label: 'Estacionamento', icon: Car },
    { id: 'kitchen', label: 'Cozinha', icon: Coffee },
    { id: 'ac', label: 'Ar Condicionado', icon: AirVent },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'beach', label: 'Praia', icon: Waves },
    { id: 'restaurant', label: 'Restaurante', icon: Coffee },
    { id: 'spa', label: 'Spa', icon: TreePine },
    { id: 'gym', label: 'Academia', icon: Mountain },
    { id: 'safari', label: 'Safari', icon: TreePine },
    { id: 'garden', label: 'Jardim', icon: TreePine }
  ];
  
  const sortOptions = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'price_low', label: 'Menor preço' },
    { value: 'price_high', label: 'Maior preço' },
    { value: 'rating', label: 'Melhor avaliação' },
    { value: 'reviews', label: 'Mais avaliações' }
  ];

  // Pagination logic
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);
  
  const togglePropertyType = (type: string) => {
    setPropertyTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };
  
  const clearFilters = () => {
    setPriceRange([0, 500000]);
    setPropertyTypes([]);
    setAmenities([]);
    setRating(0);
    setInstantBook(false);
    setSuperhost(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Header - Compact */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Para onde você quer ir?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
              <div className="w-full">
                <Input 
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="h-12 w-full"
                />
              </div>
              
              <div className="w-full">
                <Input 
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="h-12 w-full"
                />
              </div>
              
              <div className="w-full">
                <select 
                  value={guests} 
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 h-12 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} hóspede{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div className="w-full">
                <Button size="lg" className="h-12 w-full">
                  <Search size={20} className="mr-2" />
                  <span className="hidden sm:inline">Buscar</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Responsive */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-4">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Limpar
                  </button>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 text-gray-600 hover:text-gray-700"
                  >
                    <ChevronDown size={20} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
              
              {/* Mobile Collapsible Content */}
              <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Faixa de Preço</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="number" 
                      placeholder="Mín"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-16 h-8 text-sm"
                    />
                    <span className="text-gray-500 text-sm">-</span>
                    <Input 
                      type="number" 
                      placeholder="Máx"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-16 h-8 text-sm"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} AOA por noite
                  </div>
                </div>
              </div>
              
              {/* Property Types */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Tipo de Propriedade</h4>
                <div className="space-y-2">
                  {propertyTypeOptions.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => togglePropertyType(type.id)}
                        className={`flex items-center w-full p-2 rounded-md border transition-colors text-sm ${
                          propertyTypes.includes(type.id)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon size={16} className="mr-2" />
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Amenities */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Comodidades</h4>
                <div className="space-y-2">
                  {amenityOptions.slice(0, 6).map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <button
                        key={amenity.id}
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`flex items-center w-full p-2 rounded-md border transition-colors text-sm ${
                          amenities.includes(amenity.id)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon size={14} className="mr-2" />
                        <span>{amenity.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Avaliação Mínima</h4>
                <div className="space-y-1">
                  {[4.5, 4.0, 3.5, 3.0].map((ratingValue) => (
                    <button
                      key={ratingValue}
                      onClick={() => setRating(rating === ratingValue ? 0 : ratingValue)}
                      className={`flex items-center w-full p-2 rounded-md transition-colors text-sm ${
                        rating === ratingValue
                          ? 'bg-primary-50 text-primary-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Star className="fill-yellow-400 text-yellow-400 mr-2" size={14} />
                      <span>{ratingValue}+ estrelas</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Special Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm">Recursos Especiais</h4>
                <div className="space-y-2">
                  <label className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      checked={instantBook}
                      onChange={(e) => setInstantBook(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded mr-2"
                    />
                    <span className="text-gray-700">Reserva Instantânea</span>
                  </label>
                  
                  <label className="flex items-center text-sm">
                    <input 
                      type="checkbox" 
                      checked={superhost}
                      onChange={(e) => setSuperhost(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded mr-2"
                    />
                    <span className="text-gray-700">Super Anfitrião</span>
                  </label>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {properties.length} propriedades encontradas
                </h2>
                {searchQuery && (
                  <p className="text-gray-600 text-sm mt-1">
                    Resultados para &quot;{searchQuery}&quot;
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Sort */}
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm h-9 w-full sm:w-auto"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                
                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Grid3X3 size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <List size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 ${viewMode === 'map' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Map size={14} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-2 mb-6 justify-items-center">
              {currentProperties.map((property) => (
                <div 
                  key={property.id} 
                  className="w-full max-w-[296px] h-[513px] bg-white rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.09)] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image Carousel */}
                  <div className="relative w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                    {/* Navigation Arrows */}
                    <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                      <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                      <ChevronRight size={16} className="text-gray-600" />
                    </button>
                    
                    {/* Heart Icon */}
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                      <Heart size={16} className="text-gray-600" />
                    </button>
                    
                    {/* Pagination Dots */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Property Details */}
                  <div className="p-4">
                    {/* Title and Share */}
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{property.name}</h3>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                          <polyline points="16,6 12,2 8,6"/>
                          <line x1="12" y1="2" x2="12" y2="15"/>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Price */}
                    <div className="mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {property.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 text-sm ml-1">Kz/h</span>
                    </div>
                    
                    {/* Inclusions */}
                    <p className="text-sm text-gray-600 mb-4">Direito a pequeno Almoço</p>
                    
                    {/* Separator */}
                    <div className="border-t border-gray-200 mb-4"></div>
                    
                    {/* Property Features */}
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 mr-2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                          <polyline points="9,22 9,12 15,12 15,22"/>
                        </svg>
                        <span className="text-sm text-gray-500">{property.beds} Quartos</span>
                      </div>
                      <div className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 mr-2">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                        </svg>
                        <span className="text-sm text-gray-500">{property.baths} Banheiros</span>
                      </div>
                    </div>
                    
                    {/* Separator */}
                    <div className="border-t border-gray-200 mb-4"></div>
                    
                    {/* Agent Information */}
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Corretor</p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">{property.agent?.initials || 'MK'}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{property.agent?.name || 'Maria Kaniki'}</p>
                          <p className="text-xs text-gray-500">{property.agent?.phone || '(+244 923 000 000)'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 px-3 text-sm"
              >
                <ChevronLeft size={14} className="mr-1" />
                <span className="hidden sm:inline">Anterior</span>
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(totalPages, isMobileViewport ? 3 : 5) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8 text-sm"
                    >
                      {page}
                    </Button>
                  );
                })}

                {totalPages > (isMobileViewport ? 3 : 5) && (
                  <>
                    <span className="text-gray-500 text-sm">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      className="w-8 h-8 text-sm"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 px-3 text-sm"
              >
                <span className="hidden sm:inline">Próximo</span>
                <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}