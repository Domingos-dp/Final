'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  DollarSign, 
  Star, 
  Users,
  Settings,
  Bell,
  Plus,
  Edit3,
  Eye,
  Trash2,
  MapPin,
  Camera,
  Upload,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  BarChart3,
  PieChart,
  FileText,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function HostDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  const hostData = {
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '+244 923 456 789',
    joinDate: '2022-03-15',
    totalProperties: 5,
    totalEarnings: 2850000,
    monthlyEarnings: 485000,
    occupancyRate: 78,
    averageRating: 4.8,
    totalReviews: 156,
    responseRate: 95
  };
  
  const properties = [
    {
      id: 1,
      name: 'Villa Sunset Namibe',
      location: 'Namibe, Angola',
      type: 'Villa',
      status: 'active',
      rating: 4.9,
      reviews: 45,
      price: 120000,
      occupancy: 85,
      earnings: 680000,
      image: '/images/villa-namibe.jpg',
      bookings: 12
    },
    {
      id: 2,
      name: 'Casa Colonial Huambo',
      location: 'Huambo, Angola',
      type: 'Casa',
      status: 'active',
      rating: 4.7,
      reviews: 32,
      price: 75000,
      occupancy: 72,
      earnings: 420000,
      image: '/images/casa-huambo.jpg',
      bookings: 8
    },
    {
      id: 3,
      name: 'Apartamento Marginal',
      location: 'Luanda, Angola',
      type: 'Apartamento',
      status: 'pending',
      rating: 0,
      reviews: 0,
      price: 95000,
      occupancy: 0,
      earnings: 0,
      image: '/images/apt-marginal.jpg',
      bookings: 0
    }
  ];
  
  const recentBookings = [
    {
      id: 1,
      propertyName: 'Villa Sunset Namibe',
      guestName: 'Maria Silva',
      checkIn: '2024-12-15',
      checkOut: '2024-12-18',
      guests: 4,
      status: 'confirmed',
      amount: 360000,
      // provide totalPrice for display; fallback to amount where appropriate
      totalPrice: 360000,
      nights: 3
    },
    {
      id: 2,
      propertyName: 'Casa Colonial Huambo',
      guestName: 'Pedro Costa',
      checkIn: '2024-12-20',
      checkOut: '2024-12-23',
      guests: 2,
      status: 'pending',
      amount: 225000,
      totalPrice: 225000,
      nights: 3
    },
    {
      id: 3,
      propertyName: 'Villa Sunset Namibe',
      guestName: 'Ana Ferreira',
      checkIn: '2024-12-10',
      checkOut: '2024-12-14',
      guests: 2,
      status: 'completed',
      amount: 480000,
      totalPrice: 480000,
      nights: 4
    }
  ];
  
  const monthlyStats = [
    { month: 'Jul', earnings: 320000, bookings: 8 },
    { month: 'Ago', earnings: 450000, bookings: 12 },
    { month: 'Set', earnings: 380000, bookings: 10 },
    { month: 'Out', earnings: 520000, bookings: 14 },
    { month: 'Nov', earnings: 485000, bookings: 13 },
    { month: 'Dez', earnings: 680000, bookings: 18 }
  ];
  
  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'properties', label: 'Propriedades', icon: Home },
    { id: 'bookings', label: 'Reservas', icon: Calendar },
    { id: 'earnings', label: 'Ganhos', icon: DollarSign },
    { id: 'reviews', label: 'Avaliações', icon: Star },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };
  
  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Bem-vindo, {hostData.name}!</h2>
            <p className="text-primary-100 mb-4">
              Gerencie suas propriedades e maximize seus ganhos
            </p>
            <Button variant="secondary">
              Adicionar propriedade
            </Button>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">
                {(hostData.monthlyEarnings / 1000).toFixed(0)}K AOA
              </div>
              <div className="text-primary-100">Este mês</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Home className="text-primary-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{hostData.totalProperties}</div>
          <div className="text-gray-600 text-sm">Propriedades ativas</div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
              <DollarSign className="text-secondary-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {(hostData.totalEarnings / 1000).toFixed(0)}K AOA
          </div>
          <div className="text-gray-600 text-sm">Total de ganhos</div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
              <Star className="text-accent-600" size={24} />
            </div>
            <div className="text-green-500 text-sm font-medium">+0.2</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{hostData.averageRating}</div>
          <div className="text-gray-600 text-sm">Avaliação média</div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-earth-100 rounded-xl flex items-center justify-center">
              <Users className="text-earth-600" size={24} />
            </div>
            <div className="text-green-500 text-sm font-medium">+5%</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{hostData.occupancyRate}%</div>
          <div className="text-gray-600 text-sm">Taxa de ocupação</div>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Earnings Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Ganhos Mensais</h3>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="month">Últimos 6 meses</option>
              <option value="year">Último ano</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {monthlyStats.map((stat: any, index: number) => (
              <div key={stat.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 text-sm text-gray-600">{stat.month}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ width: `${(stat.earnings / 680000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {(stat.earnings / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Atividade Recente</h3>
          
          <div className="space-y-4">
            {recentBookings.slice(0, 4).map((booking: any) => (
              <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-medium text-gray-900">{booking.guestName}</div>
                  <div className="text-sm text-gray-600">{booking.propertyName}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(booking.checkIn).toLocaleDateString('pt-BR')} - {new Date(booking.checkOut).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status === 'confirmed' ? 'Confirmado' : 
                     booking.status === 'pending' ? 'Pendente' : 'Concluído'}
                  </div>
                  <div className="text-sm font-medium text-gray-900 mt-1">
                      {(booking.totalPrice ?? booking.amount ?? 0).toLocaleString()} AOA
                    </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-4" onClick={() => setActiveTab('bookings')}>
            Ver todas as reservas
          </Button>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="w-full">
            Adicionar Propriedade
          </Button>
          <Button variant="outline" className="w-full">
            Gerenciar Calendário
          </Button>
          <Button variant="outline" className="w-full">
            Responder Mensagens
          </Button>
        </div>
      </Card>
    </div>
  );
  
  const renderProperties = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Minhas Propriedades</h2>
        <Button>
          Adicionar Propriedade
        </Button>
      </div>
      
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Buscar propriedades..." 
  
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option value="all">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="pending">Pendente</option>
            <option value="inactive">Inativo</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option value="all">Todos os tipos</option>
            <option value="villa">Villa</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
          </select>
        </div>
      </Card>
      
      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {properties.map((property: any) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="flex">
              <div className="w-48 h-48 bg-gradient-to-br from-primary-400 to-secondary-500 flex-shrink-0"></div>
              
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{property.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin size={16} className="mr-1" />
                      {property.location}
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                      {property.status === 'active' ? 'Ativo' : 
                       property.status === 'pending' ? 'Pendente' : 'Inativo'}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Preço/noite</div>
                    <div className="font-semibold text-gray-900">{property.price.toLocaleString()} AOA</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Ocupação</div>
                    <div className="font-semibold text-gray-900">{property.occupancy}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Avaliação</div>
                    <div className="flex items-center">
                      <Star className="fill-yellow-400 text-yellow-400" size={16} />
                      <span className="ml-1 font-semibold text-gray-900">{property.rating}</span>
                      <span className="ml-1 text-sm text-gray-600">({property.reviews})</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Ganhos</div>
                    <div className="font-semibold text-gray-900">{(property.earnings / 1000).toFixed(0)}K AOA</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="w-full">
                    Ver detalhes
                  </Button>
                  <Button size="sm" className="w-full">
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
  
  const renderBookings = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reservas</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            Filtros
          </Button>
          <Button variant="outline">
            Exportar
          </Button>
        </div>
      </div>
      
      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">24</div>
          <div className="text-gray-600 text-sm">Total este mês</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">18</div>
          <div className="text-gray-600 text-sm">Confirmadas</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">4</div>
          <div className="text-gray-600 text-sm">Pendentes</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">2</div>
          <div className="text-gray-600 text-sm">Canceladas</div>
        </Card>
      </div>
      
      {/* Bookings List */}
      <Card>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Reservas Recentes</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="all">Todas</option>
                <option value="confirmed">Confirmadas</option>
                <option value="pending">Pendentes</option>
                <option value="completed">Concluídas</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentBookings.map((booking: any) => (
            <div key={booking.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{booking.propertyName}</h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1">
                        {booking.status === 'confirmed' ? 'Confirmado' : 
                         booking.status === 'pending' ? 'Pendente' : 'Concluído'}
                      </span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Hóspede:</span> {booking.guestName}
                    </div>
                    <div>
                      <span className="font-medium">Check-in:</span> {new Date(booking.checkIn).toLocaleDateString('pt-BR')}
                    </div>
                    <div>
                      <span className="font-medium">Check-out:</span> {new Date(booking.checkOut).toLocaleDateString('pt-BR')}
                    </div>
                    <div>
                      <span className="font-medium">Hóspedes:</span> {booking.guests}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-lg font-semibold text-gray-900">
                      {(booking.totalPrice ?? booking.amount ?? 0).toLocaleString()} AOA
                      <span className="text-sm text-gray-600 font-normal ml-2">
                        ({booking.nights ?? 0} noites)
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Ver detalhes
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MessageSquare size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
  
  const renderEarnings = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Ganhos</h2>
        <Button variant="outline">
          Relatório Financeiro
        </Button>
      </div>
      
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Este Mês</h3>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {(hostData.monthlyEarnings / 1000).toFixed(0)}K AOA
          </div>
          <div className="text-sm text-green-600">+15% vs mês anterior</div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Acumulado</h3>
            <DollarSign className="text-primary-600" size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {(hostData.totalEarnings / 1000).toFixed(0)}K AOA
          </div>
          <div className="text-sm text-gray-600">Desde {new Date(hostData.joinDate).toLocaleDateString('pt-BR')}</div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Próximo Pagamento</h3>
            <Calendar className="text-secondary-600" size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">125K AOA</div>
          <div className="text-sm text-gray-600">Em 5 dias</div>
        </Card>
      </div>
      
      {/* Earnings by Property */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Ganhos por Propriedade</h3>
        
        <div className="space-y-4">
          {properties.filter((p: any) => p.earnings > 0).map((property: any) => (
            <div key={property.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-lg"></div>
                <div>
                  <h4 className="font-medium text-gray-900">{property.name}</h4>
                  <p className="text-sm text-gray-600">{property.location}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {(property.earnings / 1000).toFixed(0)}K AOA
                </div>
                <div className="text-sm text-gray-600">
                  {property.bookings} reservas
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Monthly Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Evolução Mensal</h3>
        
        <div className="space-y-4">
          {monthlyStats.map((stat: any) => (
            <div key={stat.month} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 text-sm text-gray-600">{stat.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 h-3 rounded-full" 
                    style={{ width: `${(stat.earnings / 680000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {(stat.earnings / 1000).toFixed(0)}K AOA
                </div>
                <div className="text-sm text-gray-600">
                  {stat.bookings} reservas
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
  
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'properties': return renderProperties();
      case 'bookings': return renderBookings();
      case 'earnings': return renderEarnings();
      default: return renderOverview();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home size={32} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{hostData.name}</h3>
                <p className="text-sm text-gray-600">Anfitrião desde {new Date(hostData.joinDate).getFullYear()}</p>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab: any) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} className="mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}