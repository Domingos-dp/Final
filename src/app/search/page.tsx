'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Filter,
  Star,
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Wifi,
  Car,
  Coffee,
  Tv,
  AirVent,
  Waves,
  TreePine,
  Mountain,
  Building,
  Home,
  Hotel,
  Tent,
  ChevronDown,
  ChevronUp,
  Map,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [instantBook, setInstantBook] = useState(false);
  const [superhost, setSuperhost] = useState(false);
  
  const properties = [
    {
      id: 1,
      name: 'Villa Sunset Namibe',
      location: { city: 'Namibe', province: 'Angola' },
      type: 'Villa',
      price: 120000,
      rating: 4.9,
      reviews: 45,
      image: '/images/villa-namibe.jpg',
      amenities: ['wifi', 'pool', 'parking', 'kitchen'],
      superhost: true,
      instantBook: true,
      description: 'Luxuosa villa com vista para o mar',
      beds: 4,
      baths: 3,
      maxGuests: 8
    },
    {
      id: 2,
      name: 'Casa Colonial Huambo',
      location: { city: 'Huambo', province: 'Angola' },
      type: 'Casa',
      price: 75000,
      rating: 4.7,
      reviews: 32,
      image: '/images/casa-huambo.jpg',
      amenities: ['wifi', 'parking', 'kitchen', 'garden'],
      superhost: false,
      instantBook: true,
      description: 'Charmosa casa colonial no centro histórico',
      beds: 3,
      baths: 2,
      maxGuests: 6
    },
    {
      id: 3,
      name: 'Apartamento Marginal',
      location: { city: 'Luanda', province: 'Angola' },
      type: 'Apartamento',
      price: 95000,
      rating: 4.5,
      reviews: 28,
      image: '/images/apt-marginal.jpg',
      amenities: ['wifi', 'ac', 'tv', 'kitchen'],
      superhost: true,
      instantBook: false,
      description: 'Moderno apartamento na Marginal de Luanda',
      beds: 2,
      baths: 2,
      maxGuests: 4
    },
    {
      id: 4,
      name: 'Lodge Safari Kissama',
      location: { city: 'Kissama', province: 'Angola' },
      type: 'Lodge',
      price: 180000,
      rating: 4.8,
      reviews: 67,
      image: '/images/lodge-kissama.jpg',
      amenities: ['wifi', 'restaurant', 'pool', 'safari'],
      superhost: true,
      instantBook: true,
      description: 'Lodge exclusivo no Parque Nacional da Kissama',
      beds: 2,
      baths: 1,
      maxGuests: 4
    },
    {
      id: 5,
      name: 'Pousada Praia Benguela',
      location: { city: 'Benguela', province: 'Angola' },
      type: 'Pousada',
      price: 65000,
      rating: 4.6,
      reviews: 23,
      image: '/images/pousada-benguela.jpg',
      amenities: ['wifi', 'beach', 'restaurant', 'parking'],
      superhost: false,
      instantBook: true,
      description: 'Pousada aconchegante na praia de Benguela',
      beds: 2,
      baths: 1,
      maxGuests: 4
    },
    {
      id: 6,
      name: 'Hotel Boutique Lubango',
      location: { city: 'Lubango', province: 'Angola' },
      type: 'Hotel',
      price: 110000,
      rating: 4.4,
      reviews: 89,
      image: '/images/hotel-lubango.jpg',
      amenities: ['wifi', 'restaurant', 'spa', 'gym'],
      superhost: false,
      instantBook: false,
      description: 'Hotel boutique no coração de Lubango',
      beds: 1,
      baths: 1,
      maxGuests: 2
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
  
  const filteredProperties = properties.filter(property => {
    // Search query filter
    if (searchQuery && !property.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) && !property.location?.province?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Price range filter
    if (property.price < priceRange[0] || property.price > priceRange[1]) {
      return false;
    }
    
    // Property type filter
    if (propertyTypes.length > 0 && !propertyTypes.includes(property.type.toLowerCase())) {
      return false;
    }
    
    // Amenities filter
    if (amenities.length > 0 && !amenities.every(amenity => property.amenities.includes(amenity))) {
      return false;
    }
    
    // Rating filter
    if (rating > 0 && property.rating < rating) {
      return false;
    }
    
    // Instant book filter
    if (instantBook && !property.instantBook) {
      return false;
    }
    
    // Superhost filter
    if (superhost && !property.superhost) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_low': return a.price - b.price;
      case 'price_high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'reviews': return b.reviews - a.reviews;
      default: return 0;
    }
  });
  
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
  
  const renderSearchBar = () => (
    <Card className="p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder="Para onde você quer ir?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
          <Input 
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
          <Input 
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hóspedes</label>
          <select 
            value={guests} 
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {[1,2,3,4,5,6,7,8].map(num => (
              <option key={num} value={num}>{num} hóspede{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button size="lg" className="px-12">
          <Search size={20} className="mr-2" />
          Buscar
        </Button>
      </div>
    </Card>
  );
  
  const renderFilters = () => (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Limpar filtros
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Faixa de Preço</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Input 
                      type="number" 
                      placeholder="Mín"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    />
                    <span className="text-gray-500">-</span>
                    <Input 
                      type="number" 
                      placeholder="Máx"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} AOA por noite
                  </div>
                </div>
              </div>
              
              {/* Property Types */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Tipo de Propriedade</h4>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypeOptions.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => togglePropertyType(type.id)}
                        className={`flex items-center p-3 rounded-lg border transition-colors ${
                          propertyTypes.includes(type.id)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Icon size={20} className="mr-2" />
                        <span className="text-sm">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Amenities */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Comodidades</h4>
                <div className="grid grid-cols-2 gap-2">
                  {amenityOptions.slice(0, 8).map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <button
                        key={amenity.id}
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`flex items-center p-2 rounded-lg border transition-colors ${
                          amenities.includes(amenity.id)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Icon size={16} className="mr-2" />
                        <span className="text-xs">{amenity.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-200">
              {/* Rating */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Avaliação Mínima</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((ratingValue) => (
                    <button
                      key={ratingValue}
                      onClick={() => setRating(rating === ratingValue ? 0 : ratingValue)}
                      className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                        rating === ratingValue
                          ? 'bg-primary-50 text-primary-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Star className="fill-yellow-400 text-yellow-400 mr-2" size={16} />
                      <span className="text-sm">{ratingValue}+ estrelas</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Special Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Recursos Especiais</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={instantBook}
                      onChange={(e) => setInstantBook(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">Reserva Instantânea</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={superhost}
                      onChange={(e) => setSuperhost(e.target.checked)}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">Super Anfitrião</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  const renderPropertyCard = (property: any) => (
    <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 bg-gradient-to-br from-primary-400 to-secondary-500">
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart size={20} className="text-gray-600" />
        </button>
        
        {property.superhost && (
          <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded-full">
            <span className="text-xs font-medium text-gray-900">Super Anfitrião</span>
          </div>
        )}
        
        {property.instantBook && (
          <div className="absolute bottom-4 left-4 bg-primary-600 text-white px-2 py-1 rounded-full">
            <span className="text-xs font-medium">Reserva Instantânea</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{property.name}</h3>
          <div className="flex items-center">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="ml-1 text-sm text-gray-600">{property.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin size={16} className="mr-1" />
          {property.location?.city}, {property.location?.province}
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{property.description}</p>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span>{property.beds} cama{property.beds > 1 ? 's' : ''}</span>
          <span className="mx-2">•</span>
          <span>{property.baths} banheiro{property.baths > 1 ? 's' : ''}</span>
          <span className="mx-2">•</span>
          <span>{property.maxGuests} hóspedes</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {property.price.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm ml-1">AOA/noite</span>
          </div>
          
          <Button size="sm">
            Ver detalhes
          </Button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <span>{property.reviews} avaliações</span>
          </div>
        </div>
      </div>
    </Card>
  );
  
  const renderPropertyList = (property: any) => (
    <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex">
        <div className="w-64 h-48 bg-gradient-to-br from-primary-400 to-secondary-500 flex-shrink-0"></div>
        
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{property.name}</h3>
                <button className="p-2 text-gray-400 hover:text-red-500">
                  <Heart size={20} />
                </button>
              </div>
              
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin size={16} className="mr-1" />
                {property.location?.city}, {property.location?.province}
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{property.description}</p>
              
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <span>{property.beds} cama{property.beds > 1 ? 's' : ''}</span>
                <span className="mx-2">•</span>
                <span>{property.baths} banheiro{property.baths > 1 ? 's' : ''}</span>
                <span className="mx-2">•</span>
                <span>{property.maxGuests} hóspedes</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="fill-yellow-400 text-yellow-400" size={16} />
                  <span className="ml-1 text-sm text-gray-600">{property.rating} ({property.reviews} avaliações)</span>
                </div>
                
                {property.superhost && (
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                    Super Anfitrião
                  </span>
                )}
                
                {property.instantBook && (
                  <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                    Reserva Instantânea
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right ml-6">
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {property.price.toLocaleString()}
                </span>
                <span className="text-gray-600 text-sm ml-1 block">AOA/noite</span>
              </div>
              
              <Button size="sm">
                Ver detalhes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        {renderSearchBar()}
        
        {/* Filters */}
        {renderFilters()}
        
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProperties.length} propriedades encontradas
            </h2>
            {searchQuery && (
              <p className="text-gray-600 mt-1">
                Resultados para "{searchQuery}"
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sort */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            {/* Filters Toggle */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filtros
            </Button>
            
            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 ${viewMode === 'map' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Map size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Active Filters */}
        {(propertyTypes.length > 0 || amenities.length > 0 || rating > 0 || instantBook || superhost) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {propertyTypes.map(type => (
              <span key={type} className="inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                {propertyTypeOptions.find(opt => opt.id === type)?.label}
                <button 
                  onClick={() => togglePropertyType(type)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            
            {amenities.map(amenity => (
              <span key={amenity} className="inline-flex items-center bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm">
                {amenityOptions.find(opt => opt.id === amenity)?.label}
                <button 
                  onClick={() => toggleAmenity(amenity)}
                  className="ml-2 text-secondary-600 hover:text-secondary-800"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            
            {rating > 0 && (
              <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                {rating}+ estrelas
                <button 
                  onClick={() => setRating(0)}
                  className="ml-2 text-yellow-600 hover:text-yellow-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            
            {instantBook && (
              <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Reserva Instantânea
                <button 
                  onClick={() => setInstantBook(false)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            
            {superhost && (
              <span className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Super Anfitrião
                <button 
                  onClick={() => setSuperhost(false)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        )}
        
        {/* Results */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(renderPropertyCard)}
            </div>
          )}
          
          {viewMode === 'list' && (
            <div className="space-y-6">
              {filteredProperties.map(renderPropertyList)}
            </div>
          )}
          
          {viewMode === 'map' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {filteredProperties.map(renderPropertyCard)}
              </div>
              <div className="bg-gray-200 rounded-lg h-96 lg:h-auto flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Map size={48} className="mx-auto mb-4" />
                  <p>Mapa interativo será implementado aqui</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma propriedade encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar seus filtros ou buscar por outro destino
            </p>
            <Button onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        )}
        
        {/* Load More */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar mais propriedades
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}