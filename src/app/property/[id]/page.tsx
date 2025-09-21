// Página de detalhes da propriedade com sistema de reserva

'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
// motion intentionally removed (unused)
import {
  MapPin,
  Star,
  Heart,
  Share2,
  Wifi,
  Car,
  Coffee,
  Tv,
  Wind,
  Users,
  Bed,
  Bath,
  Calendar,
  CreditCard,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  MessageCircle,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { mockProperties, mockUsers, mockReviews } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/utils';

interface BookingFormData {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  specialRequests: string;
}

const PropertyDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const propertyId = params.id as string;

  // Find property from mock data
  const property = mockProperties.find(p => p.id === propertyId);
  const propertyReviews = mockReviews.filter(r => r.propertyId === propertyId);
  const host = mockUsers.find(u => u.id === property?.hostId);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    checkIn: null,
    checkOut: null,
    guests: 1,
    specialRequests: ''
  });
  const [isBooking, setIsBooking] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Propriedade não encontrada</h1>
          <Button onClick={() => router.back()}>
            Voltar
          </Button>
        </div>
      </div>
    );
  }

  const images = property.images || ['/placeholder-property.jpg'];
  const amenities = [
    { icon: Wifi, label: 'Wi-Fi gratuito', available: true },
    { icon: Car, label: 'Estacionamento', available: true },
    { icon: Coffee, label: 'Café da manhã', available: property.amenities?.includes('breakfast') },
    { icon: Tv, label: 'TV a cabo', available: true },
    { icon: Wind, label: 'Ar condicionado', available: property.amenities?.includes('ac') },
  ];

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const diffTime = Math.abs(bookingData.checkOut.getTime() - bookingData.checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = nights * property.pricePerNight;
    const serviceFee = subtotal * 0.1; // 10% service fee
    const taxes = subtotal * 0.05; // 5% taxes
    return {
      nights,
      subtotal,
      serviceFee,
      taxes,
      total: subtotal + serviceFee + taxes
    };
  };

  const handleBooking = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa fazer login para fazer uma reserva.",
        variant: "destructive"
      });
      router.push('/auth/login');
      return;
    }

    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast({
        title: "Datas obrigatórias",
        description: "Por favor, selecione as datas de check-in e check-out.",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);
    
    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Reserva solicitada!",
        description: "Sua reserva foi enviada e está aguardando confirmação do anfitrião."
      });

      router.push('/dashboard?tab=bookings');
    } catch {
      toast({
        title: "Erro na reserva",
        description: "Ocorreu um erro ao processar sua reserva. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: isFavorite 
        ? "Propriedade removida da sua lista de favoritos."
        : "Propriedade adicionada à sua lista de favoritos."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleFavorite}
              className={isFavorite ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favoritado' : 'Favoritar'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Images */}
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-muted-foreground">Imagem da Propriedade</span>
                  </div>
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-primary' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location?.city}, {property.location?.province}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-muted-foreground ml-1">({propertyReviews.length} avaliações)</span>
                    </div>
                    <Badge variant="secondary">{property.type}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatCurrency(property.pricePerNight)}</div>
                  <div className="text-muted-foreground">por noite</div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{property.maxGuests} hóspedes</span>
                </div>
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{property.bedrooms} quartos</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span>{property.bathrooms} banheiros</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h2 className="text-xl font-semibold mb-4">Sobre esta propriedade</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Comodidades</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => {
                  const Icon = amenity.icon;
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        amenity.available 
                          ? 'border-green-200 bg-green-50 text-green-700' 
                          : 'border-gray-200 bg-gray-50 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{amenity.label}</span>
                      {amenity.available ? (
                        <Check className="w-4 h-4 ml-auto" />
                      ) : (
                        <X className="w-4 h-4 ml-auto" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Host Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={host?.avatar} alt={host?.firstName} />
                      <AvatarFallback>
                        {host?.firstName?.[0]}{host?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Anfitrião: {host?.firstName} {host?.lastName}
                      </h3>
                      <p className="text-muted-foreground">
                        Membro desde {formatDate(host?.createdAt || new Date())}
                      </p>
                      <div className="flex items-center mt-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm font-medium">4.9</span>
                        <span className="text-sm text-muted-foreground ml-1">(127 avaliações)</span>
                        <Badge variant="secondary" className="ml-2">
                          <Award className="w-3 h-3 mr-1" />
                          Superhost
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Mensagem
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Ligar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Avaliações</h2>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-muted-foreground ml-1">({propertyReviews.length} avaliações)</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {propertyReviews.slice(0, 4).map((review) => {
                  const reviewer = mockUsers.find(u => u.id === review.userId);
                  return (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={reviewer?.avatar} alt={reviewer?.firstName} />
                            <AvatarFallback>
                              {reviewer?.firstName?.[0]}{reviewer?.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {reviewer?.firstName} {reviewer?.lastName}
                            </p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${
                                    i < review.rating 
                                      ? 'text-yellow-500 fill-current' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-2">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {propertyReviews.length > 4 && (
                <div className="text-center mt-6">
                  <Button variant="outline">
                    Ver todas as avaliações
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Fazer Reserva</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{formatCurrency(property.pricePerNight)}</div>
                      <div className="text-sm text-muted-foreground">por noite</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Check-in/Check-out */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="checkin">Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {bookingData.checkIn ? formatDate(bookingData.checkIn) : "Selecionar"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={bookingData.checkIn || undefined}
                            onSelect={(date) => setBookingData(prev => ({ ...prev, checkIn: date || null }))}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="checkout">Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {bookingData.checkOut ? formatDate(bookingData.checkOut) : "Selecionar"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={bookingData.checkOut || undefined}
                            onSelect={(date) => setBookingData(prev => ({ ...prev, checkOut: date || null }))}
                            disabled={(date) => date < (bookingData.checkIn || new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <Label htmlFor="guests">Hóspedes</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max={property.maxGuests}
                      value={bookingData.guests}
                      onChange={(e) => setBookingData(prev => ({ 
                        ...prev, 
                        guests: parseInt(e.target.value) || 1 
                      }))}
                    />
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="requests">Solicitações especiais (opcional)</Label>
                    <Textarea
                      id="requests"
                      placeholder="Alguma solicitação especial para sua estadia?"
                      value={bookingData.specialRequests}
                      onChange={(e) => setBookingData(prev => ({ 
                        ...prev, 
                        specialRequests: e.target.value 
                      }))}
                      rows={3}
                    />
                  </div>

                  {/* Price Breakdown */}
                  {bookingData.checkIn && bookingData.checkOut && (
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>{formatCurrency(property.pricePerNight)} x {calculateTotal().nights} noites</span>
                        <span>{formatCurrency(calculateTotal().subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxa de serviço</span>
                        <span>{formatCurrency(calculateTotal().serviceFee)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Impostos</span>
                        <span>{formatCurrency(calculateTotal().taxes)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(calculateTotal().total)}</span>
                      </div>
                    </div>
                  )}

                  {/* Booking Button */}
                  <Button 
                    className="w-full" 
                    onClick={handleBooking}
                    disabled={isBooking || !bookingData.checkIn || !bookingData.checkOut}
                  >
                    {isBooking ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Reservar Agora
                      </div>
                    )}
                  </Button>

                  <div className="flex items-center justify-center text-xs text-muted-foreground mt-2">
                    <Shield className="w-3 h-3 mr-1" />
                    <span>Você não será cobrado ainda</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;