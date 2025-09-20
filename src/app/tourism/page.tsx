'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { mockExperiences, mockPopularCities } from '@/data/mockData';

export default function TourismPage() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  type Destination = {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
  };

  // Prefer mock experiences for richer data; fall back to mocked popular cities
  const destinations: Destination[] = mockExperiences.slice(0, 3).map((e, i) => ({
    id: `d-${e.id}`,
    title: e.title,
    description: e.description,
    location: `${e.location.city ?? e.location.address ?? ''}`,
    price: e.price ?? (e.currency ? 0 : 0),
    rating: e.rating ?? 0,
  reviews: e.reviewCount ?? 0,
    image: e.images?.[0] ?? mockPopularCities[i]?.image ?? `/images/pungo-andongo.jpg`
  }));

  const filtered = destinations.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase()) || d.location.toLowerCase().includes(query.toLowerCase())
  );

  const renderCard = (d: Destination, idx: number) => (
    <motion.div key={d.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
      <Card className={viewMode === 'list' ? 'flex' : ''}>
        <div className={viewMode === 'list' ? 'w-56 flex-shrink-0' : 'h-48'}>
          <div className="h-full bg-gray-200 bg-center bg-cover" style={{ backgroundImage: `url(${d.image})` }} />
        </div>
        <CardContent className={viewMode === 'list' ? 'flex-1' : ''}>
          <CardHeader>
            <CardTitle>{d.title}</CardTitle>
            <p className="text-sm text-gray-600">{d.description}</p>
          </CardHeader>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={14} className="mr-1" />
              <span>{d.location}</span>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold">{d.price.toLocaleString()}</div>
              <div className="text-sm text-gray-600">AOA</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-sm text-gray-600">
              <Star size={14} className="text-yellow-400 mr-1" />
              <span className="font-medium">{d.rating}</span>
              <span className="ml-1 text-sm">({d.reviews})</span>
            </div>

            <Button size="sm">Ver</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Turismo em Angola</h1>
            <p className="text-lg text-primary-100 mt-2">Explore destinos, passeios e experiências para planejar sua viagem.</p>

            <div className="max-w-2xl mx-auto mt-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input placeholder="Buscar destinos, locais ou atividades..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-12 py-3 text-lg bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Destinos</h2>
          <div className="flex items-center space-x-3">
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="all">Todas as regiões</option>
              <option value="luanda">Luanda</option>
              <option value="bengo">Bengo</option>
              <option value="malanje">Malanje</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700'}`}>
                Grade
              </button>
              <button onClick={() => setViewMode('list')} className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700'}`}>
                Lista
              </button>
            </div>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filtered.map((d, i) => renderCard(d, i))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum destino encontrado</h3>
            <p className="text-gray-600 mb-4">Tente ajustar sua busca ou filtrar por outra região.</p>
            <Button variant="outline" onClick={() => setQuery('')}>Limpar busca</Button>
          </div>
        )}
      </div>
    </div>
  );
}
