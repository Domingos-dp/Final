// Painel do usuário turista - Dashboard principal

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Calendar,
  Heart,
  MapPin,
  Star,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  Edit,
  Camera,
  Phone,
  Mail,
  Globe,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import mockData from '@/data/mockData';
import { formatCurrency, formatDate } from '@/utils';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data para o usuário atual
  const userBookings = mockData.bookings.filter(booking => booking.userId === user?.id);
  const userReviews = mockData.reviews.filter(review => review.userId === user?.id);
  const userFavorites = mockData.properties.filter(property => 
    (user?.favorites || []).includes(property.id)
  );

  const stats = {
    totalBookings: userBookings.length,
    completedTrips: userBookings.filter((b: any) => b.status === 'completed').length,
    upcomingTrips: userBookings.filter((b: any) => b.status === 'confirmed').length,
    totalSpent: userBookings.reduce((sum: number, booking: any) => sum + (booking.totalPrice || 0), 0),
    reviewsGiven: userReviews.length,
    favoriteProperties: userFavorites.length
  };

  const profileCompletion = () => {
    let completion = 0;
    if (user && 'firstName' in user) completion += 20;
    if (user && 'lastName' in user) completion += 20;
    if (user?.email) completion += 20;
    if (user?.phone) completion += 20;
    if (user?.avatar) completion += 20;
    return completion;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header do Dashboard */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.avatar} alt={user?.firstName as string} />
              <AvatarFallback className="text-lg">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                Olá, {user?.firstName}!
              </h1>
              <p className="text-muted-foreground">
                Bem-vindo ao seu painel de controle
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Viagens</p>
                    <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Próximas Viagens</p>
                    <p className="text-2xl font-bold">{stats.upcomingTrips}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Gasto</p>
                    <p className="text-2xl font-bold">{formatCurrency(stats.totalSpent)}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Favoritos</p>
                    <p className="text-2xl font-bold">{stats.favoriteProperties}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tabs do Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="bookings">Minhas Reservas</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Perfil Completion */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Completar Perfil</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {profileCompletion()}% completo
                      </span>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                    <Progress value={profileCompletion()} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Complete seu perfil para ter uma melhor experiência na plataforma.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Próximas Viagens */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Próximas Viagens</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userBookings
                      .filter((booking: any) => booking.status === 'confirmed')
                      .slice(0, 3)
                      .map((booking: any) => {
                        const property = mockData.properties.find((p: any) => p.id === booking.propertyId);
                        return (
                          <div key={booking.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{property?.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              {booking.status}
                            </Badge>
                          </div>
                        );
                      })}
                    {userBookings.filter(b => b.status === 'confirmed').length === 0 && (
                      <p className="text-center text-muted-foreground py-8">
                        Nenhuma viagem agendada
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Atividade Recente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userBookings.slice(0, 5).map((booking: any) => {
                    const property = mockData.properties.find((p: any) => p.id === booking.propertyId);
                    return (
                      <div key={booking.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(booking.status)}`} />
                        <div className="flex-1">
                          <p className="font-medium">
                            Reserva em {property?.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(booking.createdAt)} • {formatCurrency(booking.totalPrice)}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {booking.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Minhas Reservas */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userBookings.map((booking: any) => {
                    const property = mockData.properties.find((p: any) => p.id === booking.propertyId);
                    return (
                      <div key={booking.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                            <div>
                              <h3 className="font-semibold text-lg">{property?.title}</h3>
                              <p className="text-muted-foreground flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {property?.location?.city}, {property?.location?.province}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                              className="flex items-center space-x-1"
                            >
                              {getStatusIcon(booking.status)}
                              <span>{booking.status}</span>
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Check-in</p>
                            <p className="font-medium">{formatDate(booking.checkIn)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Check-out</p>
                            <p className="font-medium">{formatDate(booking.checkOut)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="font-medium">{formatCurrency(booking.totalPrice)}</p>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Reservado em {formatDate(booking.createdAt)}
                          </p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Button>
                            {booking.status === 'confirmed' && (
                              <Button variant="outline" size="sm">
                                Cancelar
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {userBookings.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Nenhuma reserva encontrada</h3>
                      <p className="text-muted-foreground mb-4">
                        Você ainda não fez nenhuma reserva. Explore nossas acomodações!
                      </p>
                      <Button>
                        Explorar Propriedades
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favoritos */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Propriedades Favoritas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userFavorites.map((property: any) => (
                    <div key={property.id} className="border rounded-lg overflow-hidden">
                      <div className="w-full h-48 bg-gray-200" />
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{property.title}</h3>
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          </Button>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {property.location?.city}, {property.location?.province}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{property.rating}</span>
                          </div>
                          <p className="font-semibold">
                            {formatCurrency(property.pricePerNight)}/noite
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {userFavorites.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Nenhum favorito ainda</h3>
                      <p className="text-muted-foreground mb-4">
                        Adicione propriedades aos seus favoritos para encontrá-las facilmente!
                      </p>
                      <Button>
                        Explorar Propriedades
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Perfil */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Informações Pessoais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={user?.avatar} alt={user?.firstName} />
                        <AvatarFallback className="text-xl">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        size="sm" 
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {user?.firstName} {user?.lastName}
                      </h3>
                      <p className="text-muted-foreground">Membro desde {formatDate(user?.createdAt || new Date())}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{user?.phone || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span>Angola</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </CardContent>
              </Card>

              {/* Estatísticas do Usuário */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Suas Estatísticas</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-primary">{stats.completedTrips}</p>
                      <p className="text-sm text-muted-foreground">Viagens Completas</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-500">{stats.reviewsGiven}</p>
                      <p className="text-sm text-muted-foreground">Avaliações Dadas</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nível de Confiança</span>
                      <Badge variant="secondary">Verificado</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <Badge>Viajante Ativo</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pontos de Fidelidade</span>
                      <span className="font-medium">1,250 pts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;