// Homepage principal da plataforma de turismo de Angola

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Play,
  Heart,
  Award,
  Globe,
  Camera,
  Mountain,
  Waves,
  TreePine,
  Building,
  Compass,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProperties, mockExperiences, mockUsers } from '@/data/mockData';
import { cn, formatCurrency, formatRating } from '@/utils';
import type { Property, Experience, User } from '@/types';

// Componente Hero Section
const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [activeTab, setActiveTab] = useState('stays');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);
    if (searchQuery) params.set('q', searchQuery);
    
    const url = activeTab === 'experiences' ? '/experiences' : '/search';
    router.push(`${url}?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Padrão decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full" />
        <div className="absolute top-40 right-32 w-24 h-24 border border-white rounded-full" />
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Descubra as Maravilhas de
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Angola
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Encontre acomodações únicas, experiências autênticas e crie memórias inesquecíveis
            no coração da África.
          </p>

          {/* Formulário de busca */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="stays" className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>Acomodações</span>
                </TabsTrigger>
                <TabsTrigger value="experiences" className="flex items-center space-x-2">
                  <Compass className="w-4 h-4" />
                  <span>Experiências</span>
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSearch}>
                <TabsContent value="stays" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destino
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="text"
                          placeholder="Luanda, Benguela..."
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hóspedes
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="number"
                          min="1"
                          max="16"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experiences" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        O que você quer fazer?
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="text"
                          placeholder="Safari, culinária, cultura..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Localização
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="text"
                          placeholder="Qualquer lugar"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <Button type="submit" size="lg" className="w-full md:w-auto mt-6">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </form>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Componente de destinos populares
const PopularDestinations: React.FC = () => {
  const destinations = [
    {
      name: 'Luanda',
      image: '/images/luanda.jpg',
      properties: 245,
      description: 'Capital vibrante com vida noturna agitada',
      icon: <Building className="w-5 h-5" />
    },
    {
      name: 'Benguela',
      image: '/images/benguela.jpg',
      properties: 89,
      description: 'Praias paradisíacas e história colonial',
      icon: <Waves className="w-5 h-5" />
    },
    {
      name: 'Huambo',
      image: '/images/huambo.jpg',
      properties: 67,
      description: 'Montanhas e clima ameno',
      icon: <Mountain className="w-5 h-5" />
    },
    {
      name: 'Lubango',
      image: '/images/lubango.jpg',
      properties: 54,
      description: 'Paisagens deslumbrantes da Serra da Leba',
      icon: <TreePine className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Destinos Populares
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore os destinos mais procurados em Angola e descubra
            experiências únicas em cada região.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/search?location=${destination.name}`}>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4 text-white">
                      {destination.icon}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                      <p className="text-sm opacity-90">{destination.properties} propriedades</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      {destination.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente de propriedades em destaque
const FeaturedProperties: React.FC = () => {
  const featuredProperties = mockProperties.slice(0, 6);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Acomodações em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Propriedades selecionadas especialmente para você, com as melhores
            avaliações e experiências únicas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/property/${property.id}`}>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600" />
                    <div className="absolute top-4 right-4">
                      <Button size="icon" variant="secondary" className="rounded-full">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-yellow-900">
                        <Award className="w-3 h-3 mr-1" />
                        Destaque
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{formatRating(property.rating)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location?.city}, {property.location?.province}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">
                          {formatCurrency(property.pricePerNight)}
                        </span>
                        <span className="text-sm text-muted-foreground">/noite</span>
                      </div>
                      <Badge variant="outline">{property.type}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild size="lg">
            <Link href="/search">
              Ver todas as acomodações
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Componente de experiências
const FeaturedExperiences: React.FC = () => {
  const featuredExperiences = mockExperiences.slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experiências Únicas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Viva momentos inesquecíveis com experiências autênticas
            guiadas por locais apaixonados por Angola.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/experiences/${experience.id}`}>
                <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600" />
                    <div className="absolute top-4 right-4">
                      <Button size="icon" variant="secondary" className="rounded-full">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Clock className="w-3 h-3 mr-1" />
                        {experience.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {experience.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {experience.location?.city}, {experience.location?.province}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{formatRating(experience.rating)}</span>
                        <span className="text-muted-foreground">({experience.reviewCount})</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold">
                          {formatCurrency(experience.price)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild size="lg">
            <Link href="/experiences">
              Ver todas as experiências
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Componente de estatísticas
const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Building className="w-8 h-8" />,
      value: '1,200+',
      label: 'Acomodações',
      description: 'Propriedades verificadas'
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: '50,000+',
      label: 'Viajantes',
      description: 'Experiências criadas'
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: '4.8',
      label: 'Avaliação média',
      description: 'De satisfação'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      value: '100%',
      label: 'Segurança',
      description: 'Pagamentos protegidos'
    }
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Números que Inspiram Confiança
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Milhares de viajantes já descobriram Angola conosco.
            Junte-se a esta comunidade apaixonada por aventuras.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-4 text-primary-foreground/80">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-sm opacity-80">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente principal da homepage
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PopularDestinations />
      <FeaturedProperties />
      <FeaturedExperiences />
      <StatsSection />
    </div>
  );
};

export default HomePage;
