// Dashboard administrativo para gestão da plataforma

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Home,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MapPin,
  Phone,
  Mail,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import mockData from '@/data/mockData';
import { formatCurrency, formatDate } from '@/utils';

interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  monthlyGrowth: {
    users: number;
    properties: number;
    bookings: number;
    revenue: number;
  };
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock admin stats
  const stats: AdminStats = {
    totalUsers: mockData.users.length,
    totalProperties: mockData.properties.length,
    totalBookings: mockData.bookings.length,
    totalRevenue: mockData.bookings.reduce((sum: number, booking: any) => sum + booking.totalPrice, 0),
    monthlyGrowth: {
      users: 12.5,
      properties: 8.3,
      bookings: 15.7,
      revenue: 23.4
    }
  };

  const handleUserAction = (action: string, userId: string) => {
    toast({
      title: `Ação executada`,
      description: `${action} aplicada ao usuário ${userId}`
    });
  };

  const handlePropertyAction = (action: string, propertyId: string) => {
    toast({
      title: `Ação executada`,
      description: `${action} aplicada à propriedade ${propertyId}`
    });
  };

  const handleBookingAction = (action: string, bookingId: string) => {
    toast({
      title: `Ação executada`,
      description: `${action} aplicada à reserva ${bookingId}`
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, label: 'Ativo' },
      inactive: { variant: 'secondary' as const, label: 'Inativo' },
      suspended: { variant: 'destructive' as const, label: 'Suspenso' },
      pending: { variant: 'outline' as const, label: 'Pendente' },
      confirmed: { variant: 'default' as const, label: 'Confirmado' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelado' },
      completed: { variant: 'secondary' as const, label: 'Concluído' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const StatCard = ({ title, value, change, icon: Icon, color }: {
    title: string;
    value: string | number;
    change: number;
    icon: any;
    color: string;
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center mt-2">
              <TrendingUp className={`w-4 h-4 mr-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change >= 0 ? '+' : ''}{change}% este mês
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Usuários"
          value={stats.totalUsers}
          change={stats.monthlyGrowth.users}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Propriedades"
          value={stats.totalProperties}
          change={stats.monthlyGrowth.properties}
          icon={Home}
          color="bg-green-500"
        />
        <StatCard
          title="Reservas"
          value={stats.totalBookings}
          change={stats.monthlyGrowth.bookings}
          icon={Calendar}
          color="bg-purple-500"
        />
        <StatCard
          title="Receita Total"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.monthlyGrowth.revenue}
          icon={DollarSign}
          color="bg-orange-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reservas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.bookings.slice(0, 5).map((booking: any) => {
                const property = mockData.properties.find((p: any) => p.id === booking.propertyId);
                const user = mockData.users.find((u: any) => u.id === booking.userId);
                return (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user?.avatar} alt={user?.firstName} />
                        <AvatarFallback>
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{property?.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.firstName} {user?.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(booking.totalPrice)}</p>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Propriedades Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.properties.slice(0, 5).map((property: any) => {
                const bookingCount = mockData.bookings.filter((b: any) => b.propertyId === property.id).length;
                return (
                  <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                        <Home className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{property.location?.city}, {property.location?.province}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{bookingCount} reservas</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm">{property.rating}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestão de Usuários</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cadastro</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} alt={user.firstName} />
                      <AvatarFallback>
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        {user.phone && (
                          <>
                            <Phone className="w-3 h-3 mr-1" />
                            <span className="mr-3">{user.phone}</span>
                          </>
                        )}
                        {user.isVerified && (
                          <div className="flex items-center text-green-600">
                            <Shield className="w-3 h-3 mr-1" />
                            <span>Verificado</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role === 'admin' ? 'Admin' : 'Usuário'}
                  </Badge>
                </TableCell>
                <TableCell>{getStatusBadge('active')}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUserAction('Visualizar', user.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction('Editar', user.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction('Suspender', user.id)}>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Suspender
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const PropertiesTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestão de Propriedades</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Propriedade
        </Button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.properties.map((property: any) => {
          const host = mockData.users.find((u: any) => u.id === property.hostId);
          const bookingCount = mockData.bookings.filter((b: any) => b.propertyId === property.id).length;
          return (
            <Card key={property.id}>
              <CardContent className="p-4">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{property.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{property.location?.city}, {property.location?.province}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                    <Badge variant="secondary">{property.type}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{formatCurrency(property.pricePerNight)}/noite</span>
                    <span className="text-sm text-muted-foreground">{bookingCount} reservas</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={host?.avatar} alt={host?.firstName} />
                      <AvatarFallback className="text-xs">
                        {host?.firstName?.[0]}{host?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{host?.firstName} {host?.lastName}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handlePropertyAction('Visualizar', property.id)}>
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handlePropertyAction('Editar', property.id)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const BookingsTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Gestão de Reservas</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Bookings Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reserva</TableHead>
              <TableHead>Propriedade</TableHead>
              <TableHead>Hóspede</TableHead>
              <TableHead>Datas</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.bookings.map((booking: any) => {
              const property = mockData.properties.find((p: any) => p.id === booking.propertyId);
              const user = mockData.users.find((u: any) => u.id === booking.userId);
              return (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">#{booking.id.slice(-6)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(booking.createdAt)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{property?.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{property?.location?.city}, {property?.location?.province}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} alt={user?.firstName} />
                        <AvatarFallback className="text-xs">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{formatDate(booking.checkIn)}</p>
                      <p className="text-sm text-muted-foreground">até {formatDate(booking.checkOut)}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{formatCurrency(booking.totalPrice)}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleBookingAction('Visualizar', booking.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBookingAction('Aprovar', booking.id)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Aprovar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBookingAction('Cancelar', booking.id)}>
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancelar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Acesso Negado</h1>
          <p className="text-muted-foreground mb-4">
            Você não tem permissão para acessar o painel administrativo.
          </p>
          <Button onClick={() => window.history.back()}>
            Voltar
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gerencie usuários, propriedades e reservas da plataforma Angola Travel
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="properties">Propriedades</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>
            <TabsContent value="users">
              <UsersTab />
            </TabsContent>
            <TabsContent value="properties">
              <PropertiesTab />
            </TabsContent>
            <TabsContent value="bookings">
              <BookingsTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;