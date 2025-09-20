// Reside.ao - Página Principal
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Home,
  Heart,
  Star,
  Building,
  Utensils,
  Car,
  Hotel,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Share2,
  Phone,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Componente Hero Section
const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Compra');

  const handleSearch = () => {
    console.log('Busca realizada');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Living Room */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop"
          alt="Living Room Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
            className="space-y-8"
        >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Descubra Angola, viva Angola
          </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Residência e turismo de um jeito facil.
            </p>
            <p className="text-lg text-gray-300">
              Willingness to solve problems presented by farmers.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              know more about us →
           </Button>
        </motion.div>

          {/* Right Content - Search Form */}
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="Compra" 
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'Compra' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Compra
                </TabsTrigger>
                <TabsTrigger 
                  value="Aluguel"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'Aluguel' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Aluguel
                </TabsTrigger>
                <TabsTrigger 
                  value="Risorte"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'Risorte' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Risorte
                </TabsTrigger>
                <TabsTrigger 
                  value="Turismo"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'Turismo' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Turismo
                </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Busque por cidade"
                        className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Busque por Bairro"
                        className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                  </div>
                  <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Valor total ate</option>
                        <option>Até 50.000 Kz</option>
                        <option>Até 100.000 Kz</option>
                        <option>Até 200.000 Kz</option>
                        <option>Acima de 200.000 Kz</option>
                    </select>
                  </div>
                  <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Numero de quartos</option>
                      <option>1 quarto</option>
                      <option>2 quartos</option>
                        <option>3 quartos</option>
                        <option>4+ quartos</option>
                    </select>
                    </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2">
                      <input type="radio" name="filter" className="text-blue-600" defaultChecked />
                    <span className="text-sm text-gray-700">Todos</span>
                  </label>
                  <label className="flex items-center space-x-2">
                      <input type="radio" name="filter" className="text-blue-600" />
                    <span className="text-sm text-gray-700">Mais antigos</span>
                  </label>
                  <label className="flex items-center space-x-2">
                      <input type="radio" name="filter" className="text-blue-600" />
                    <span className="text-sm text-gray-700">Recentes</span>
                  </label>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

// Seção de Categorias
const CategoriesSection: React.FC = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8 overflow-x-auto">
          {[
            { icon: Building, name: "Hoteis" },
            { icon: Home, name: "Hospedarias" },
            { icon: Building, name: "Terrenos" },
            { icon: Utensils, name: "Restaurantes" },
            { icon: Hotel, name: "Risort" },
            { icon: Home, name: "Vivendas" },
            { icon: Car, name: "Piscir" },
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-2 min-w-[100px] cursor-pointer hover:opacity-70 transition-opacity"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <category.icon className="w-6 h-6 text-gray-600" />
                </div>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Seção "Temos para si" - Grid de Categorias
const WeHaveForYouSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-orange-500 text-sm font-medium">01 • Temos para si</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Encontre o melhor de Angola em um unico local.
          </h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. Use our built-in of your Krypto portfolio over time.
              </p>
              <Link href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                Learn more
                <ChevronDown className="ml-1 w-4 h-4" />
              </Link>
            </div>
        </motion.div>

          {/* Right Content - Image Grid */}
            <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 h-96"
            >
            {/* Left Column - Full Height */}
            <div className="relative rounded-2xl overflow-hidden">
                  <Image
                src="https://images.unsplash.com/photo-1506905925346-14bda2d0b8e8?w=400&h=600&fit=crop"
                alt="Resorts"
                    fill
                className="object-cover"
                  />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                <h3 className="font-bold text-lg">Os melhores Risortes</h3>
                <p className="text-sm">113 Risortes disponiveis</p>
              </div>
                  <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Middle Column - Two Images */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-44">
                <Image
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop"
                  alt="Apartamentos"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-bold text-sm">Apartamentos</h3>
                  <p className="text-xs">113 Apartamentos disponiveis</p>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-gray-600" />
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-44">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
                  alt="Vivendas"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-bold text-sm">Vivendas</h3>
                  <p className="text-xs">113 Vivendas disponiveis</p>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Full Height */}
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=600&fit=crop"
                alt="Turismo"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                <h3 className="font-bold text-lg">Os melhores locais para turismo</h3>
                <p className="text-sm">113 Locais para turismo disponiveis</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </div>
              </div>
                  </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

// Seção de Aluguel de Apartamentos
const ApartmentRentalSection: React.FC = () => {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-orange-500 text-sm font-medium">02 • Aluguel de casas, apartamento</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Apartamentos perto de si
          </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
              title: "Apartamento 2º andar",
              price: "8.000 Kz/h",
              inclusion: "Direito a pequeno Almoço",
              bedrooms: 2,
              bathrooms: 2,
              broker: {
                name: "Maria Kaniki",
                phone: "+244 923 000 000",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
              }
            },
            {
              image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
              title: "Apartamento 5º andar",
              price: "12.000 Kz/h",
              inclusion: "Direito a pequeno Almoço",
              bedrooms: 3,
              bathrooms: 4,
              broker: {
                name: "Gelson Mesquita",
                phone: "+244 923 000 000",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
              }
            },
            {
              image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
              title: "Apartamento 3º andar",
              price: "6.000 Kz/h",
              inclusion: "Direito a pequeno Almoço",
              bedrooms: 1,
              bathrooms: 2,
              broker: {
                name: "Nelson Veloso",
                phone: "+244 923 000 000",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              }
            },
            {
              image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
              title: "Apartamento 4º andar",
              price: "8.000 Kz/h",
              inclusion: "Direito a pequeno Almoço",
              bedrooms: 2,
              bathrooms: 2,
              broker: {
                name: "Marta Kissame",
                phone: "+244 923 000 000",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
              }
            },
          ].map((apartment, index) => (
            <motion.div
              key={apartment.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="w-[296px] h-[513px] bg-white rounded-lg shadow-[0px_2px_6px_rgba(0,0,0,0.09)] overflow-hidden hover:shadow-lg transition-shadow">
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
                    <h3 className="text-lg font-medium text-gray-900">{apartment.title}</h3>
                    <button 
                      onClick={() => setShowShareModal(true)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
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
                      {apartment.price}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">Kz/h</span>
                  </div>
                  
                  {/* Inclusions */}
                  <p className="text-sm text-gray-600 mb-4">{apartment.inclusion}</p>
                  
                  {/* Separator */}
                  <div className="border-t border-gray-200 mb-4"></div>
                  
                  {/* Property Features */}
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 mr-2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9,22 9,12 15,12 15,22"/>
                      </svg>
                      <span className="text-sm text-gray-500">{apartment.bedrooms} Quartos</span>
                    </div>
                    <div className="flex items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 mr-2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                      <span className="text-sm text-gray-500">{apartment.bathrooms} Banheiros</span>
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
                          <span className="text-white text-sm font-medium">{apartment.broker.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{apartment.broker.name}</p>
                        <p className="text-xs text-gray-500">{apartment.broker.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Compartilhe com quem adoras</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Copiar Link", icon: Share2 },
                { name: "WatsApp", icon: Phone },
                { name: "Facebook", icon: Building },
                { name: "Twitter", icon: Building },
                { name: "Instagram", icon: Building },
                { name: "E-mail", icon: Building },
              ].map((item) => (
                <button
                  key={item.name}
                  className="flex items-center space-x-2 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

// Seção de Serviços
const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-orange-500 text-sm font-medium">03 • Nossos serviços</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Temos para si os melhores serviços do mercado.
              </h2>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Temos para si os melhores</h3>
                    <p className="text-gray-600">
                      Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. Use our built-in of your Krypto portfolio over time.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1506905925346-14bda2d0b8e8?w=600&h=400&fit=crop"
              alt="Serviços Angola"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-6">
              <p className="text-sm">
                Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. Use our built-in of your Krypto portfolio over time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Seção de Turismo
const TourismSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-orange-500 text-sm font-medium">04 • Turismo</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Encontre o melhor de Angola em um unico local.
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. Use our built-in of your Krypto portfolio over time.
              </p>
              <Link href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                Learn more +
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              {
                image: "https://images.unsplash.com/photo-1506905925346-14bda2d0b8e8?w=300&h=400&fit=crop",
                title: "Barra do Kwanza",
                date: "24.OUT.2024 - 28.OUT.2024",
                price: "18.000Kz",
                rating: "4,9"
              },
              {
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=400&fit=crop",
                title: "Barra do Kwanza",
                date: "24.OUT.2024 - 28.OUT.2024",
                price: "18.000Kz",
                rating: "4,9"
              },
              {
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=400&fit=crop",
                title: "Barra do Kwanza",
                date: "24.OUT.2024 - 28.OUT.2024",
                price: "18.000Kz",
                rating: "4,9"
              },
            ].map((destination, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden group">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  width={300}
                  height={400}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{destination.rating}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                  <p className="text-sm">{destination.date}</p>
                  <h3 className="font-bold text-lg">{destination.title}</h3>
                  <p className="text-xl font-bold">{destination.price}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg">
            know more about us →
          </Button>
        </div>
      </div>
    </section>
  );
};

// Seção "Melhores serviços" (05)
const BestServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-orange-500 text-sm font-medium">05 • Melhores serviços</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Encontre o melhor de Angola em um unico local.
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time. Use our built-in of your Krypto portfolio over time.
              </p>
              <Link href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                Learn more +
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 h-96"
          >
            {/* Left Column - Full Height Event Hall */}
            <div className="relative rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f1426e4b2e?w=400&h=600&fit=crop"
                alt="Event Hall"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                <h3 className="font-bold text-lg">Os melhores Salões de Eventos</h3>
                <p className="text-sm">113 Salões disponiveis</p>
              </div>
            </div>

            {/* Right Column - Two Images Stacked */}
            <div className="space-y-4">
              {/* Top Right - Restaurant */}
              <div className="relative rounded-2xl overflow-hidden h-44 group">
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
                  alt="Restaurant"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-gray-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-bold text-sm">Os melhores Restaurantes</h3>
                  <p className="text-xs">113 Risortes disponiveis</p>
                </div>
              </div>

              {/* Bottom Right - Land */}
              <div className="relative rounded-2xl overflow-hidden h-44 group">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-14bda2d0b8e8?w=400&h=300&fit=crop"
                  alt="Land"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-gray-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-bold text-sm">Os melhores Terrenos</h3>
                  <p className="text-xs">113 Risortes disponiveis</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Seção FAQ e Avaliações (06)
const FAQAndReviewsSection: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqItems = [
    "Como usar fertilizantes?",
    "O que fazer em casos de estress dos gados?",
    "Como posso aderir aos serviços?",
    "Em quanto tempo leva o tratamento do solo?",
    "Como posso aderir aos serviços?",
    "Em quanto tempo leva o tratamento do solo?"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <span className="text-orange-500 text-sm font-medium">06 • Perguntas frequentes</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Perguntas mais frequentes
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-100 rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <p className="text-gray-600">
                      Esta é uma resposta de exemplo para a pergunta "{question}". 
                      Aqui você pode fornecer informações detalhadas sobre o tópico.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-100 rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="text-orange-500 text-sm font-medium">06 • Avaliações</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              O que os nossos cliente dizem
            </h2>
          </div>

          <div className="flex items-center justify-between mb-8">
            <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
              Ate ao momento tenho tido bons resultados, agradeço muito pelos serviços que têm prestado, 
              consegui alavancar os meus lucros em um curto tempo e ainda vender produtos de qualidade
            </p>
            
            <div className="flex flex-col items-center">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                alt="Marcus Candida"
                width={60}
                height={60}
                className="rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">Marcus Candida</h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// Componente principal da página
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <WeHaveForYouSection />
      <ApartmentRentalSection />
      <ServicesSection />
      <TourismSection />
      <BestServicesSection />
      <FAQAndReviewsSection />
    </div>
  );
}
