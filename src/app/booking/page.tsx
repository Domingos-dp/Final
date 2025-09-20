// Página para gerenciar reservas do usuário

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  X,
  MessageSquare,
  FileText,
  AlertCircle,
  Star,
  Download,
  Search,
  Home
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import mockData from '@/data/mockData';
import { formatCurrency, formatDate } from '@/utils';
import { Booking, Property, User } from '@/types';

const BookingPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter user bookings from mock data
  const userBookings = mockData.bookings.filter((booking: Booking) => booking.userId === user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <Check className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      case 'completed': return <Check className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendente';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Concluída';
      default: return 'Desconhecido';
    }
  };

  const handleBookingAction = (action: string, bookingId: string) => {
    toast({
      title: 'Ação executada',
      description: `${action} realizada para a reserva ${bookingId.slice(-6)}`
    });
  };

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const property = mockData.properties.find((p: Property) => p.id === booking.propertyId);
    const host = mockData.users.find((u: User) => u.id === property?.hostId);
    const isUpcoming = new Date(booking.checkIn) > new Date();
    const isPast = new Date(booking.checkOut) < new Date();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border rounded-lg overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Property Image */}
          <div className="w-full md:w-48 h-48 md:h-auto bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0 flex items-center justify-center">
            <Home className="w-8 h-8 text-primary" />
          </div>

          {/* Booking Details */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{property?.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{property?.location?.city}, {property?.location?.province}</span>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  <Badge className={`${getStatusColor(booking.status)} flex items-center space-x-1`}>
                    {getStatusIcon(booking.status)}
                    <span>{getStatusLabel(booking.status)}</span>
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{formatCurrency(booking.totalPrice)}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Check-in</span>
                </div>
                <div className="font-medium">{formatDate(booking.checkIn)}</div>
              </div>
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Check-out</span>
                </div>
                <div className="font-medium">{formatDate(booking.checkOut)}</div>
              </div>
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Hóspedes</span>
                </div>
                <div className="font-medium">{booking.guests}</div>
              </div>
              <div>
                <div className="flex items-center text-muted-foreground mb-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Noites</span>
                </div>
                <div className="font-medium">
                  {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))}
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/30 rounded-lg">
              <Avatar className="w-10 h-10">
                <AvatarImage src={host?.avatar} alt={host?.firstName} />
                <AvatarFallback>
                  {host?.firstName?.[0]}{host?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{host?.firstName} {host?.lastName}</p>
                <p className="text-sm text-muted-foreground">Anfitrião</p>
              </div>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Mensagem
              </Button>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {booking.status === 'confirmed' && isUpcoming && (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleBookingAction('Ver detalhes', booking.id)}>
                    <FileText className="w-4 h-4 mr-2" />
                    Ver detalhes
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBookingAction('Cancelar reserva', booking.id)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </>
              )}
              {booking.status === 'pending' && (
                <Button variant="outline" size="sm" onClick={() => handleBookingAction('Aguardar confirmação', booking.id)}>
                  <Clock className="w-4 h-4 mr-2" />
                  Aguardando confirmação
                </Button>
              )}
              {booking.status === 'completed' && isPast && (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleBookingAction('Avaliar estadia', booking.id)}>
                    <Star className="w-4 h-4 mr-2" />
                    Avaliar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBookingAction('Baixar recibo', booking.id)}>
                    <Download className="w-4 h-4 mr-2" />
                    Recibo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const filterBookings = (status: string) => {
    const now = new Date();
  return userBookings.filter((booking: Booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      
      switch (status) {
        case 'upcoming':
          return checkIn > now && booking.status !== 'cancelled';
        case 'current':
          return checkIn <= now && checkOut >= now && booking.status === 'confirmed';
        case 'past':
          return checkOut < now;
        case 'cancelled':
          return booking.status === 'cancelled';
        default:
          return true;
      }
  }).filter((booking: Booking) => {
      if (selectedFilter === 'all') return true;
      return booking.status === selectedFilter;
    }).filter((booking: Booking) => {
      const property = mockData.properties.find((p: Property) => p.id === booking.propertyId);
      return property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             property?.location?.city?.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const upcomingBookings = filterBookings('upcoming');
  const currentBookings = filterBookings('current');
  const pastBookings = filterBookings('past');
  const cancelledBookings = filterBookings('cancelled');

  const EmptyState = ({ message }: { message: string }) => (
    <Card>
      <CardContent className="text-center py-12">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Nenhuma reserva encontrada</h3>
        <p className="text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Minhas Reservas</h1>
          <p className="text-muted-foreground">
            Gerencie suas reservas, visualize detalhes e entre em contato com anfitriões
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por propriedade ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-input rounded-md px-3 py-2 bg-background"
              >
                <option value="all">Todos os status</option>
                <option value="confirmed">Confirmadas</option>
                <option value="pending">Pendentes</option>
                <option value="cancelled">Canceladas</option>
                <option value="completed">Concluídas</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">
              Próximas ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="current">
              Atuais ({currentBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Passadas ({pastBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Canceladas ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="upcoming">
              <div className="space-y-6">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <EmptyState message="Você não tem reservas próximas. Que tal explorar nossas propriedades?" />
                )}
              </div>
            </TabsContent>

            <TabsContent value="current">
              <div className="space-y-6">
                {currentBookings.length > 0 ? (
                  currentBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <EmptyState message="Você não está hospedado em nenhuma propriedade no momento." />
                )}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-6">
                {pastBookings.length > 0 ? (
                  pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <EmptyState message="Você ainda não teve nenhuma estadia conosco." />
                )}
              </div>
            </TabsContent>

            <TabsContent value="cancelled">
              <div className="space-y-6">
                {cancelledBookings.length > 0 ? (
                  cancelledBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <EmptyState message="Você não tem reservas canceladas." />
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default BookingPage;
