'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  MapPin,
  Star,
  Users,
  Calendar,
  ArrowUpDown,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  Award,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Heart,
  Share2,
  Eye,
  Wifi,
  Car,
  Coffee,
  Waves,
  Dumbbell,
  UtensilsCrossed
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function ComparePage() {
  const [searchQuery, setSearchQuery] = useState('Luanda');
  const [checkIn, setCheckIn] = useState('2024-12-20');
  const [checkOut, setCheckOut] = useState('2024-12-25');
  const [guests, setGuests] = useState(2);
  const [sortBy, setSortBy] = useState('price');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Mock comparison data
  const properties = [
    {
      id: '1',
      name: 'Hotel Presidente Luanda',
      location: 'Luanda Centro',
      rating: 4.5,
      reviews: 1247,
      image: '/images/hotel-presidente.jpg',
      amenities: ['wifi', 'pool', 'gym', 'restaurant', 'parking'],
      description: 'Hotel de luxo no coração de Luanda com vista para a baía',
      prices: [
        {
          platform: 'Angola Travel',
          price: 180000,
          originalPrice: 200000,
          discount: 10,
          availability: 'Disponível',
          cancellation: 'Cancelamento gratuito',
          breakfast: true,
          directBooking: true,
          featured: true
        },
        {
          platform: 'Booking.com',
          price: 195000,
          originalPrice: 195000,
          discount: 0,
          availability: 'Últimos 2 quartos',
          cancellation: 'Não reembolsável',
          breakfast: false,
          directBooking: false,
          featured: false
        },
        {
          platform: 'Expedia',
          price: 188000,
          originalPrice: 210000,
          discount: 10,
          availability: 'Disponível',
          cancellation: 'Cancelamento gratuito',
          breakfast: true,
          directBooking: false,
          featured: false
        },
        {
          platform: 'Hotels.com',
          price: 192000,
          originalPrice: 192000,
          discount: 0,
          availability: 'Disponível',
          cancellation: 'Cancelamento gratuito',
          breakfast: false,
          directBooking: false,
          featured: false
        }
      ]
    },
    {
      id: '2',
      name: 'Epic Sana Luanda Hotel',
      location: 'Ilha do Cabo',
      rating: 4.7,
      reviews: 892,
      image: '/images/epic-sana.jpg',
      amenities: ['wifi', 'pool', 'spa', 'restaurant', 'beach'],
      description: 'Resort de luxo na Ilha do Cabo com praia privativa',
      prices: [
        {
          platform: 'Angola Travel',
          price: 250000,
          originalPrice: 280000,
          discount: 11,
          availability: 'Disponível',
          cancellation: 'Cancelamento gratuito',
          breakfast: true,
          directBooking: true,
          featured: true
        },
        {
          platform: 'Booking.com',
          price: 275000,
          originalPrice: 275000,
          discount: 0,
          availability: 'Disponível',
          cancellation: 'Não reembolsável',
          breakfast: false,
          directBooking: false,
          featured: false
        },
        {
          platform: 'Expedia',
          price: 268000,
          originalPrice: 290000,
          discount: 8,
          availability: 'Últimos 3 quartos',
          cancellation: 'Cancelamento gratuito',
          breakfast: true,
          directBooking: false,
          featured: false
        }
      ]
    },
    {
      id: '3',
      name: 'Skyna Hotel Luanda',
      location: 'Talatona',
      rating: 4.3,
      reviews: 654,
      image: '/images/skyna-hotel.jpg',
      amenities: ['wifi', 'pool', 'gym', 'restaurant', 'parking', 'spa'],
      description: 'Hotel moderno em Talatona com excelente localização',
      prices: [
        {
          platform: 'Angola Travel',
          price: 145000,
          originalPrice: 160000,
          discount: 9,
          availability: 'Disponível',
          cancellation: 'Cancelamento gratuito',
          breakfast: true,
          directBooking: true,
          featured: true
        },
        {
          platform: 'Booking.com',
          price: 158000,
          originalPrice: 158000,
          discount: 0,
          availability: 'Disponível',
          cancellation: 'Cancelamento gratuito',
          breakfast: false,
          directBooking: false,
          featured: false
        },
        {
          platform: 'Hotels.com',
          price: 152000,
          originalPrice: 165000,
          discount: 8,
          availability: 'Disponível',
          cancellation: 'Não reembolsável',
          breakfast: true,
          directBooking: false,
          featured: false
        },
        {
          platform: 'Agoda',
          price: 149000,
          originalPrice: 149000,
          discount: 0,
          availability: 'Últimos 4 quartos',
          cancellation: 'Cancelamento gratuito',
          breakfast: false,
          directBooking: false,
          featured: false
        }
      ]
    },
    {
      id: '4',
      name: 'Hotel Baía Luanda',
      location: 'Marginal',
      rating: 4.1,
      reviews: 423,
      image: '/images/baia-luanda.jpg',
      amenities: ['wifi', 'restaurant', 'parking', 'bar'],
      description: 'Hotel boutique na marginal com vista para o mar',
      prices: [
        {
          platform: 'Angola Travel',
          price: 95000,
          originalPrice: 110000,
          discount: 14,
          availability: 'Disponível',
          cancellation: 'Cancelamento gratuito',
          breakfast: true,
          directBooking: true,
          featured: true
        },
        {
          platform: 'Booking.com',
          price: 105000,
          originalPrice: 105000,
          discount: 0,
          availability: 'Disponível',
          cancellation: 'Não reembolsável',
          breakfast: false,
          directBooking: false,
          featured: false
        },
        {
          platform: 'Expedia',
          price: 102000,
          originalPrice: 115000,
          discount: 11,
          availability: 'Disponível',
          cancellation: 'Cancelamento gratuito',
          breakfast: false,
          directBooking: false,
          featured: false
        }
      ]
    }
  ];
  
  const amenityIcons = {
    wifi: Wifi,
    pool: Waves,
    gym: Dumbbell,
    restaurant: UtensilsCrossed,
    parking: Car,
    spa: Coffee,
    beach: Waves,
    bar: Coffee
  };
  
  const sortedProperties = [...properties].sort((a, b) => {
    const aMinPrice = Math.min(...a.prices.map(p => p.price));
    const bMinPrice = Math.min(...b.prices.map(p => p.price));
    
    switch (sortBy) {
      case 'price':
        return aMinPrice - bMinPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'discount':
        const aMaxDiscount = Math.max(...a.prices.map(p => p.discount));
        const bMaxDiscount = Math.max(...b.prices.map(p => p.discount));
        return bMaxDiscount - aMaxDiscount;
      default:
        return 0;
    }
  });
  
  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };
  
  const getBestPrice = (prices: any[]) => {
    return prices.reduce((best, current) => 
      current.price < best.price ? current : best
    );
  };
  
  const renderPriceComparison = (property: any) => {
    const bestPrice = getBestPrice(property.prices);
    const sortedPrices = [...property.prices].sort((a, b) => a.price - b.price);
    
    return (
      <div className="space-y-3">
        {sortedPrices.map((priceInfo, index) => (
          <motion.div
            key={priceInfo.platform}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`border rounded-lg p-4 transition-all hover:shadow-md ${
              priceInfo.price === bestPrice.price 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900">{priceInfo.platform}</span>
                  {priceInfo.featured && (
                    <div className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      <span className="text-xs font-medium">Recomendado</span>
                    </div>
                  )}
                  {priceInfo.price === bestPrice.price && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      <span className="text-xs font-medium">Melhor preço</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  {priceInfo.originalPrice > priceInfo.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {priceInfo.originalPrice.toLocaleString()} AOA
                    </span>
                  )}
                  <span className="text-xl font-bold text-gray-900">
                    {priceInfo.price.toLocaleString()} AOA
                  </span>
                </div>
                
                {priceInfo.discount > 0 && (
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingDown size={14} className="mr-1" />
                    <span>-{priceInfo.discount}%</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  {priceInfo.availability === 'Disponível' ? (
                    <CheckCircle className="text-green-500 mr-1" size={14} />
                  ) : (
                    <AlertCircle className="text-orange-500 mr-1" size={14} />
                  )}
                  <span>{priceInfo.availability}</span>
                </div>
                
                <div className="flex items-center">
                  {priceInfo.cancellation === 'Cancelamento gratuito' ? (
                    <CheckCircle className="text-green-500 mr-1" size={14} />
                  ) : (
                    <AlertCircle className="text-red-500 mr-1" size={14} />
                  )}
                  <span>{priceInfo.cancellation}</span>
                </div>
                
                {priceInfo.breakfast && (
                  <div className="flex items-center">
                    <Coffee className="text-orange-500 mr-1" size={14} />
                    <span>Café incluído</span>
                  </div>
                )}
              </div>
              
              <Button 
                size="sm" 
                variant={priceInfo.directBooking ? 'default' : 'outline'}
>
                {priceInfo.directBooking ? <Zap size={16} /> : <ExternalLink size={16} />}
              
                {priceInfo.directBooking ? 'Reservar' : 'Ver oferta'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };
  
  const renderPropertyCard = (property: any, index: number) => {
    const bestPrice = getBestPrice(property.prices);
    const maxDiscount = Math.max(...property.prices.map((p: { discount: number }) => p.discount));
    
    return (
      <motion.div
        key={property.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden hover:shadow-xl transition-shadow">
          <div className="p-6">
            {/* Property Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg flex-shrink-0">
                {maxDiscount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{maxDiscount}%
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {property.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-sm">{property.location?.city}, {property.location?.province}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <Star className="fill-yellow-400 text-yellow-400 mr-1" size={14} />
                      <span className="text-sm font-medium">{property.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">({property.reviews} avaliações)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => toggleFavorite(property.id)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Heart 
                        size={16} 
                        className={favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                      />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Share2 size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{property.description}</p>
                
                {/* Amenities */}
                <div className="flex items-center space-x-3 mb-4">
                  {property.amenities.slice(0, 5).map((amenity: string) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                    return Icon ? (
                      <div key={amenity} className="flex items-center text-gray-500">
                        <Icon size={14} />
                      </div>
                    ) : null;
                  })}
                  {property.amenities.length > 5 && (
                    <span className="text-xs text-gray-500">+{property.amenities.length - 5} mais</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Price Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">A partir de</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">
                    {bestPrice.price.toLocaleString()} AOA
                  </span>
                  <span className="text-sm text-gray-600 ml-1">/noite</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Melhor oferta em {bestPrice.platform}</span>
                {bestPrice.discount > 0 && (
                  <div className="flex items-center text-green-600">
                    <TrendingDown size={14} className="mr-1" />
                    <span>Economia de {bestPrice.discount}%</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Toggle Price Comparison */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {property.prices.length} ofertas disponíveis
              </span>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedProperty(
                  selectedProperty === property.id ? null : property.id
                )}
>
                <Eye className="mr-2" size={16} />
              
                {selectedProperty === property.id ? 'Ocultar' : 'Comparar'} preços
              </Button>
            </div>
            
            {/* Price Comparison */}
            {selectedProperty === property.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Comparação de preços</h4>
                {renderPriceComparison(property)}
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Compare e Economize
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Encontre os melhores preços para sua hospedagem em Angola. 
              Compare ofertas de múltiplas plataformas em um só lugar.
            </p>
          </motion.div>
          
          {/* Search Form */}
          <Card className="p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Cidade ou hotel"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <Input 
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <Input 
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hóspedes</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} hóspede{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button size="lg">
                <Search size={20} className="mr-2" />
                Buscar e comparar preços
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {sortedProperties.length} hotéis encontrados em {searchQuery}
            </h2>
            <p className="text-gray-600">
              {checkIn} - {checkOut} • {guests} hóspede{guests > 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtros
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="price">Menor preço</option>
                <option value="rating">Melhor avaliação</option>
                <option value="reviews">Mais avaliações</option>
                <option value="discount">Maior desconto</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Faixa de preço (por noite)
                  </label>
                  <div className="space-y-2">
                    <Input placeholder="Preço mínimo" />
                    <Input placeholder="Preço máximo" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avaliação mínima
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Qualquer avaliação</option>
                    <option value="4.5">4.5+ estrelas</option>
                    <option value="4.0">4.0+ estrelas</option>
                    <option value="3.5">3.5+ estrelas</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comodidades
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Wi-Fi gratuito</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Piscina</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Estacionamento</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cancelamento
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Cancelamento gratuito</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline">
                  Limpar filtros
                </Button>
                <Button>
                  Aplicar filtros
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Price Comparison Info */}
        <Card className="p-4 mb-8 bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <Info className="text-blue-600 mr-3" size={20} />
            <div>
              <h3 className="font-semibold text-blue-800">Como funciona nossa comparação</h3>
              <p className="text-blue-700 text-sm">
                Comparamos preços em tempo real de múltiplas plataformas para garantir que você encontre a melhor oferta. 
                Preços podem variar devido a promoções exclusivas e disponibilidade.
              </p>
            </div>
          </div>
        </Card>
        
        {/* Properties List */}
        <div className="space-y-6">
          {sortedProperties.map((property, index) => 
            renderPropertyCard(property, index)
          )}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Carregar mais resultados
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-green-600" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Seguro e Confiável</h3>
            <p className="text-gray-600 text-sm">
              Todas as reservas são protegidas e verificamos a autenticidade das ofertas.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-blue-600" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Preços em Tempo Real</h3>
            <p className="text-gray-600 text-sm">
              Atualizamos os preços constantemente para garantir informações precisas.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-purple-600" size={32} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Melhor Preço Garantido</h3>
            <p className="text-gray-600 text-sm">
              Se encontrar um preço melhor, igualamos a oferta ou devolvemos a diferença.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}