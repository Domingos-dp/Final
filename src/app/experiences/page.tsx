'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Users,
  Calendar,
  Heart,
  Share2,
  ChevronDown,
  X,
  Mountain,
  Waves,
  Camera,
  Utensils,
  Music,
  TreePine,
  Compass,
  Sunset,
  Fish,
  Binoculars,
  Car,
  Plane
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function ExperiencesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const categories = [
    { id: 'all', label: 'Todas', icon: Compass },
    { id: 'adventure', label: 'Aventura', icon: Mountain },
    { id: 'culture', label: 'Cultura', icon: Music },
    { id: 'nature', label: 'Natureza', icon: TreePine },
    { id: 'food', label: 'Gastronomia', icon: Utensils },
    { id: 'beach', label: 'Praia', icon: Waves },
    { id: 'photography', label: 'Fotografia', icon: Camera },
    { id: 'wildlife', label: 'Vida Selvagem', icon: Binoculars }
  ];
  
  const experiences = [
    {
      id: '1',
      title: 'Safari no Parque Nacional da Kissama',
      description: 'Explore a vida selvagem angolana em um safari emocionante pelo maior parque nacional do país.',
      category: 'wildlife',
      location: 'Parque Nacional da Kissama',
      duration: '8 horas',
      price: 85000,
      rating: 4.9,
      reviews: 127,
      maxGuests: 8,
      image: '/images/kissama-safari.jpg',
      host: {
        name: 'Carlos Mendes',
        avatar: '/images/host-carlos.jpg',
        superhost: true
      },
      highlights: [
        'Avistamento de elefantes e girafas',
        'Guia especializado em vida selvagem',
        'Transporte 4x4 incluído',
        'Almoço tradicional angolano'
      ],
      included: ['Transporte', 'Guia', 'Almoço', 'Água'],
      languages: ['Português', 'Inglês'],
      difficulty: 'Fácil',
      ageRestriction: '6+'
    },
    {
      id: '2',
      title: 'Tour Cultural em Luanda',
      description: 'Descubra a rica história e cultura de Luanda através de seus monumentos, museus e mercados.',
      category: 'culture',
      location: 'Luanda',
      duration: '6 horas',
      price: 45000,
      rating: 4.7,
      reviews: 89,
      maxGuests: 12,
      image: '/images/luanda-culture.jpg',
      host: {
        name: 'Maria Santos',
        avatar: '/images/host-maria.jpg',
        superhost: false
      },
      highlights: [
        'Fortaleza de São Miguel',
        'Museu Nacional de Antropologia',
        'Mercado do Benfica',
        'Marginal de Luanda'
      ],
      included: ['Guia local', 'Entradas nos museus', 'Transporte'],
      languages: ['Português', 'Inglês', 'Francês'],
      difficulty: 'Fácil',
      ageRestriction: 'Todas as idades'
    },
    {
      id: '3',
      title: 'Trekking nas Pedras Negras do Pungo Andongo',
      description: 'Aventura épica pelas formações rochosas únicas do Pungo Andongo com vistas espetaculares.',
      category: 'adventure',
      location: 'Malanje',
      duration: '2 dias',
      price: 120000,
      rating: 4.8,
      reviews: 56,
      maxGuests: 6,
      image: '/images/pungo-andongo.jpg',
      host: {
        name: 'João Ferreira',
        avatar: '/images/host-joao.jpg',
        superhost: true
      },
      highlights: [
        'Formações rochosas únicas',
        'Acampamento sob as estrelas',
        'Trilhas desafiadoras',
        'Fotografia de paisagem'
      ],
      included: ['Equipamento de camping', 'Refeições', 'Guia especializado'],
      languages: ['Português'],
      difficulty: 'Difícil',
      ageRestriction: '16+'
    },
    {
      id: '4',
      title: 'Experiência Gastronômica Angolana',
      description: 'Aprenda a cozinhar pratos tradicionais angolanos com uma família local em Benguela.',
      category: 'food',
      location: 'Benguela',
      duration: '4 horas',
      price: 35000,
      rating: 4.9,
      reviews: 73,
      maxGuests: 8,
      image: '/images/cooking-class.jpg',
      host: {
        name: 'Ana Costa',
        avatar: '/images/host-ana.jpg',
        superhost: true
      },
      highlights: [
        'Aula de culinária tradicional',
        'Mercado local de ingredientes',
        'Degustação de vinhos locais',
        'Receitas para levar'
      ],
      included: ['Ingredientes', 'Receitas', 'Degustação', 'Certificado'],
      languages: ['Português', 'Inglês'],
      difficulty: 'Fácil',
      ageRestriction: '12+'
    },
    {
      id: '5',
      title: 'Pôr do Sol no Deserto do Namibe',
      description: 'Experimente a magia do deserto com um pôr do sol inesquecível nas dunas do Namibe.',
      category: 'nature',
      location: 'Namibe',
      duration: '5 horas',
      price: 65000,
      rating: 4.8,
      reviews: 94,
      maxGuests: 10,
      image: '/images/namibe-sunset.jpg',
      host: {
        name: 'Pedro Silva',
        avatar: '/images/host-pedro.jpg',
        superhost: false
      },
      highlights: [
        'Passeio pelas dunas',
        'Pôr do sol espetacular',
        'Chá tradicional no deserto',
        'Fotografia profissional'
      ],
      included: ['Transporte 4x4', 'Bebidas', 'Fotógrafo', 'Lanche'],
      languages: ['Português', 'Inglês'],
      difficulty: 'Moderado',
      ageRestriction: '8+'
    },
    {
      id: '6',
      title: 'Mergulho na Baía de Luanda',
      description: 'Explore o mundo subaquático da costa angolana com mergulho guiado para todos os níveis.',
      category: 'beach',
      location: 'Luanda',
      duration: '3 horas',
      price: 55000,
      rating: 4.6,
      reviews: 41,
      maxGuests: 6,
      image: '/images/diving-luanda.jpg',
      host: {
        name: 'Ricardo Nunes',
        avatar: '/images/host-ricardo.jpg',
        superhost: false
      },
      highlights: [
        'Mergulho para iniciantes',
        'Vida marinha diversificada',
        'Equipamento incluído',
        'Certificado PADI'
      ],
      included: ['Equipamento completo', 'Instrutor', 'Certificado'],
      languages: ['Português', 'Inglês'],
      difficulty: 'Fácil',
      ageRestriction: '14+'
    }
  ];
  
  const filteredExperiences = experiences.filter((experience: any) => {
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) || experience.location?.province?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory;
    const matchesDuration = selectedDuration === 'all' || 
                           (selectedDuration === 'short' && experience.duration.includes('hora')) ||
                           (selectedDuration === 'long' && experience.duration.includes('dia'));
    const matchesPrice = selectedPrice === 'all' ||
                        (selectedPrice === 'budget' && experience.price < 50000) ||
                        (selectedPrice === 'mid' && experience.price >= 50000 && experience.price < 100000) ||
                        (selectedPrice === 'luxury' && experience.price >= 100000);
    
    return matchesSearch && matchesCategory && matchesDuration && matchesPrice;
  });
  
  const toggleFavorite = (experienceId: string) => {
    setFavorites(prev => 
      prev.includes(experienceId) 
        ? prev.filter((id: any) => id !== experienceId)
        : [...prev, experienceId]
    );
  };
  
  const renderExperienceCard = (experience: any, index: number) => (
    <motion.div
      key={experience.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={viewMode === 'grid' ? '' : 'mb-6'}
    >
      <Card className={`overflow-hidden hover:shadow-xl transition-shadow cursor-pointer ${
        viewMode === 'list' ? 'flex' : ''
      }`}>
        <div className={`relative ${
          viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-48'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-500" />
          
          <div className="absolute top-3 right-3 flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(experience.id);
              }}
              className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <Heart 
                size={16} 
                className={favorites.includes(experience.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
            <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Share2 size={16} className="text-gray-600" />
            </button>
          </div>
          
          {experience.host.superhost && (
            <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full">
              <div className="flex items-center">
                <Star className="fill-yellow-400 text-yellow-400 mr-1" size={12} />
                <span className="text-xs font-medium">Super Anfitrião</span>
              </div>
            </div>
          )}
        </div>
        
        <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {experience.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin size={14} className="mr-1" />
                <span>{experience.location?.city}, {experience.location?.province}</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {experience.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center">
              <Users size={14} className="mr-1" />
              <span>Até {experience.maxGuests} pessoas</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="fill-yellow-400 text-yellow-400 mr-1" size={14} />
              <span className="text-sm font-medium">{experience.rating}</span>
              <span className="text-sm text-gray-600 ml-1">({experience.reviews})</span>
            </div>
            
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">
                {experience.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600 ml-1">AOA</span>
            </div>
          </div>
          
          {viewMode === 'list' && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {experience.highlights.slice(0, 3).map((highlight: any, idx: number) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {highlight}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-600">
                  <span>Dificuldade: {experience.difficulty}</span>
                  <span>Idade: {experience.ageRestriction}</span>
                </div>
                
                <Button size="sm">
                  Ver detalhes
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Experiências Únicas em Angola
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Descubra aventuras autênticas, cultura local e paisagens deslumbrantes 
              com anfitriões especializados
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Buscar experiências, locais ou atividades..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filtros
              </Button>
              
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm ${
                    viewMode === 'grid' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Grade
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm ${
                    viewMode === 'list' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Lista
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category: any) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full border transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duração
                  </label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">Todas as durações</option>
                    <option value="short">Até 1 dia</option>
                    <option value="long">Mais de 1 dia</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço
                  </label>
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">Todos os preços</option>
                    <option value="budget">Até 50.000 AOA</option>
                    <option value="mid">50.000 - 100.000 AOA</option>
                    <option value="luxury">Acima de 100.000 AOA</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedDuration('all');
                      setSelectedPrice('all');
                      setSearchQuery('');
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {filteredExperiences.length} experiência{filteredExperiences.length !== 1 ? 's' : ''} encontrada{filteredExperiences.length !== 1 ? 's' : ''}
            </h3>
            
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>Mais relevantes</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
              <option>Melhor avaliação</option>
              <option>Mais recentes</option>
            </select>
          </div>
        </div>
        
        {/* Experiences Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-0'}>
          {filteredExperiences.map((experience: any, index: number) => 
            renderExperienceCard(experience, index)
          )}
        </div>
        
        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma experiência encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar seus filtros ou buscar por outros termos.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDuration('all');
                setSelectedPrice('all');
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
        
        {/* Load More */}
        {filteredExperiences.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Carregar mais experiências
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}