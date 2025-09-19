'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Share2,
  Heart,
  Star,
  MapPin,
  Users,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Minus,
  CreditCard,
  CheckCircle,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Camera,
  Flag,
  Info,
  Shield,
  Award,
  Languages,
  AlertCircle,
  Thermometer,
  Umbrella,
  Mountain,
  TreePine,
  Waves,
  Car,
  Utensils,
  Backpack,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

interface ExperiencePageProps {
  params: { id: string };
}

export default function ExperiencePage({ params }: ExperiencePageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock experience data - in real app, fetch based on params.id
  const experience = {
    id: params.id,
    title: 'Safari no Parque Nacional da Kissama',
    description: 'Embarque em uma aventura inesquecível pelo maior parque nacional de Angola. Este safari oferece a oportunidade única de observar elefantes, girafas, zebras e muitas outras espécies em seu habitat natural, enquanto aprende sobre os esforços de conservação da vida selvagem angolana.',
    category: 'wildlife',
    location: 'Parque Nacional da Kissama, Bengo',
    duration: '8 horas',
    price: 85000,
    rating: 4.9,
    reviews: 127,
    maxGuests: 8,
    minGuests: 2,
    difficulty: 'Fácil',
    ageRestriction: '6+',
    languages: ['Português', 'Inglês'],
    instantBook: true,
    images: [
      '/images/kissama-1.jpg',
      '/images/kissama-2.jpg',
      '/images/kissama-3.jpg',
      '/images/kissama-4.jpg',
      '/images/kissama-5.jpg',
      '/images/kissama-6.jpg'
    ],
    host: {
      name: 'Carlos Mendes',
      avatar: '/images/host-carlos.jpg',
      joinDate: '2019-05-20',
      responseRate: 98,
      responseTime: '2 horas',
      superhost: true,
      verified: true,
      languages: ['Português', 'Inglês', 'Francês'],
      about: 'Guia especializado em vida selvagem com mais de 15 anos de experiência. Apaixonado pela conservação da natureza angolana e por compartilhar conhecimentos sobre nossa rica biodiversidade.',
      totalExperiences: 12,
      totalGuests: 2847
    },
    highlights: [
      'Avistamento garantido de elefantes e girafas',
      'Guia especializado em vida selvagem',
      'Transporte 4x4 confortável incluído',
      'Almoço tradicional angolano',
      'Pequenos grupos para melhor experiência',
      'Certificado de participação'
    ],
    included: [
      'Transporte ida e volta de Luanda',
      'Guia especializado bilíngue',
      'Almoço tradicional angolano',
      'Água e lanches',
      'Taxa de entrada no parque',
      'Seguro de atividade'
    ],
    notIncluded: [
      'Bebidas alcoólicas',
      'Gorjetas (opcional)',
      'Souvenirs pessoais',
      'Transporte de outras cidades'
    ],
    itinerary: [
      {
        time: '06:00',
        activity: 'Saída de Luanda',
        description: 'Encontro no hotel e início da viagem para o Parque Nacional da Kissama (2h de viagem)'
      },
      {
        time: '08:30',
        activity: 'Chegada ao Parque',
        description: 'Check-in no parque, briefing de segurança e início do safari'
      },
      {
        time: '09:00 - 12:00',
        activity: 'Safari Matinal',
        description: 'Exploração da zona norte do parque, avistamento de elefantes e outras espécies'
      },
      {
        time: '12:00 - 13:30',
        activity: 'Almoço',
        description: 'Almoço tradicional angolano no acampamento base com vista para o rio'
      },
      {
        time: '13:30 - 16:30',
        activity: 'Safari Vespertino',
        description: 'Continuação do safari pela zona sul, visita ao ponto de observação das girafas'
      },
      {
        time: '16:30',
        activity: 'Retorno',
        description: 'Início da viagem de volta para Luanda'
      },
      {
        time: '19:00',
        activity: 'Chegada',
        description: 'Chegada em Luanda e drop-off nos hotéis'
      }
    ],
    whatToBring: [
      'Roupas confortáveis em cores neutras',
      'Chapéu e óculos de sol',
      'Protetor solar',
      'Câmera fotográfica',
      'Binóculos (opcional)',
      'Medicamentos pessoais'
    ],
    meetingPoint: {
      name: 'Hotel Presidente Luanda',
      address: 'Largo 17 de Setembro, Luanda',
      coordinates: { lat: -8.8137, lng: 13.2302 },
      instructions: 'Encontro na recepção do hotel às 06:00. Nosso guia estará com uma placa "Angola Safari Adventures".'
    },
    cancellationPolicy: {
      type: 'Flexível',
      description: 'Cancelamento gratuito até 24 horas antes da experiência. Após esse período, será cobrada taxa de 50% do valor total.'
    },
    weatherInfo: {
      bestMonths: ['Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
      rainySeasonNote: 'Durante a estação chuvosa (Outubro-Abril), algumas estradas podem estar inacessíveis.'
    },
    safetyMeasures: [
      'Veículos 4x4 com equipamentos de segurança',
      'Guias certificados em primeiros socorros',
      'Comunicação por rádio com base',
      'Kit de primeiros socorros completo',
      'Seguro de atividade incluído'
    ],
    availableDates: [
      '2024-12-15',
      '2024-12-16',
      '2024-12-17',
      '2024-12-18',
      '2024-12-19',
      '2024-12-20'
    ],
    availableTimes: [
      '06:00',
      '07:00'
    ]
  };
  
  const reviews = [
    {
      id: 1,
      user: 'Sofia Rodrigues',
      avatar: '/images/user-sofia.jpg',
      rating: 5,
      date: '2024-11-20',
      comment: 'Experiência absolutamente incrível! O Carlos é um guia excepcional, muito conhecedor da fauna local. Conseguimos ver elefantes, girafas, zebras e muitos pássaros. O almoço estava delicioso e o transporte muito confortável. Recomendo 100%!',
      helpful: 23
    },
    {
      id: 2,
      user: 'Miguel Santos',
      avatar: '/images/user-miguel.jpg',
      rating: 5,
      date: '2024-11-15',
      comment: 'Safari fantástico! A organização foi perfeita desde o início. O parque é lindo e a vida selvagem é impressionante. O Carlos compartilhou muitas informações interessantes sobre conservação. Vale cada kwanza!',
      helpful: 18
    },
    {
      id: 3,
      user: 'Ana Costa',
      avatar: '/images/user-ana-c.jpg',
      rating: 4,
      date: '2024-11-10',
      comment: 'Muito boa experiência! Vimos muitos animais e o guia foi muito atencioso. Apenas o almoço poderia ter mais opções vegetarianas, mas no geral foi excelente. As crianças adoraram!',
      helpful: 12
    }
  ];
  
  const calculateTotal = () => {
    if (!selectedDate || !selectedTime || guests === 0) return 0;
    
    const basePrice = experience.price * guests;
    const serviceFee = Math.round(basePrice * 0.1);
    const total = basePrice + serviceFee;
    
    return { basePrice, serviceFee, total };
  };
  
  const renderImageGallery = () => (
    <div className="grid grid-cols-4 gap-2 h-96 mb-8">
      <div 
        className="col-span-2 row-span-2 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-l-2xl cursor-pointer relative overflow-hidden"
        onClick={() => setShowImageModal(true)}
      >
        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center">
          <Camera className="text-white" size={32} />
        </div>
      </div>
      
      {[1, 2, 3, 4].map((index: number) => (
        <div 
          key={index}
          className={`bg-gradient-to-br from-earth-400 to-earth-600 cursor-pointer relative overflow-hidden ${
            index === 2 ? 'rounded-tr-2xl' : index === 4 ? 'rounded-br-2xl' : ''
          }`}
          onClick={() => setShowImageModal(true)}
        >
          <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
        </div>
      ))}
      
      <button 
        onClick={() => setShowImageModal(true)}
        className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
      >
        <Camera size={16} />
        <span className="text-sm font-medium">Ver todas as fotos</span>
      </button>
    </div>
  );
  
  const renderBookingCard = () => {
    const total = calculateTotal();
    
    return (
      <Card className="p-6 sticky top-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {experience.price.toLocaleString()}
            </span>
            <span className="text-gray-600 ml-1">AOA/pessoa</span>
          </div>
          
          <div className="flex items-center">
            <Star className="fill-yellow-400 text-yellow-400" size={16} />
            <span className="ml-1 text-sm font-medium">{experience.rating}</span>
            <span className="ml-1 text-sm text-gray-600">({experience.reviews})</span>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <Input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Selecione um horário</option>
              {experience.availableTimes.map((time: any) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Participantes ({experience.minGuests}-{experience.maxGuests} pessoas)
            </label>
            <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2">
              <span>{guests} pessoa{guests > 1 ? 's' : ''}</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setGuests(Math.max(experience.minGuests, guests - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                >
                  <Minus size={16} />
                </button>
                <button 
                  onClick={() => setGuests(Math.min(experience.maxGuests, guests + 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {total && total.total > 0 && (
          <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>{experience.price.toLocaleString()} AOA x {guests} pessoa{guests > 1 ? 's' : ''}</span>
              <span>{total.basePrice.toLocaleString()} AOA</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxa de serviço</span>
              <span>{total.serviceFee.toLocaleString()} AOA</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.total.toLocaleString()} AOA</span>
              </div>
            </div>
          </div>
        )}
        
        <Button 
          className="w-full" 
          size="lg"
          onClick={() => setShowBookingModal(true)}
          disabled={!selectedDate || !selectedTime || guests === 0}
        >
          {experience.instantBook ? 'Reservar agora' : 'Solicitar reserva'}
        </Button>
        
        <p className="text-center text-sm text-gray-600 mt-3">
          Você não será cobrado ainda
        </p>
        
        <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-200">
          <Flag className="text-gray-400 mr-2" size={16} />
          <button className="text-sm text-gray-600 hover:text-gray-900 underline">
            Denunciar esta experiência
          </button>
        </div>
      </Card>
    );
  };
  
  const renderOverview = () => (
    <div className="space-y-8">
      {/* Experience Info */}
      <div>
        <div className="flex items-center space-x-6 text-gray-600 mb-6">
          <div className="flex items-center">
            <Clock size={20} className="mr-2" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center">
            <Users size={20} className="mr-2" />
            <span>Até {experience.maxGuests} pessoas</span>
          </div>
          <div className="flex items-center">
            <Mountain size={20} className="mr-2" />
            <span>Dificuldade: {experience.difficulty}</span>
          </div>
          <div className="flex items-center">
            <Users size={20} className="mr-2" />
            <span>Idade: {experience.ageRestriction}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-6">
          {experience.host.superhost && (
            <div className="flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full">
              <Star className="fill-current mr-1" size={16} />
              <span className="text-sm font-medium">Super Anfitrião</span>
            </div>
          )}
          
          {experience.instantBook && (
            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <CheckCircle className="mr-1" size={16} />
              <span className="text-sm font-medium">Reserva Instantânea</span>
            </div>
          )}
          
          <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            <Languages className="mr-1" size={16} />
            <span className="text-sm font-medium">{experience.languages.join(', ')}</span>
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          {experience.description}
        </p>
      </div>
      
      {/* Highlights */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Destaques da experiência</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {experience.highlights.map((highlight: any, index: number) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
              <span className="text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* What's Included */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">O que está incluído</h3>
          <div className="space-y-3">
            {experience.included.map((item: any, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">O que não está incluído</h3>
          <div className="space-y-3">
            {experience.notIncluded.map((item: any, index: number) => (
              <div key={index} className="flex items-start">
                <X className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderItinerary = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Itinerário detalhado</h3>
      
      <div className="space-y-6">
        {experience.itinerary.map((item: any, index: number) => (
          <div key={index} className="flex">
            <div className="flex-shrink-0 w-20 text-sm font-medium text-primary-600">
              {item.time}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{item.activity}</h4>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start">
          <Info className="text-blue-600 mr-3 mt-0.5" size={20} />
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Informações importantes</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• O itinerário pode sofrer alterações devido às condições climáticas</li>
              <li>• Avistamento de animais não pode ser garantido 100%</li>
              <li>• Recomendamos chegar 15 minutos antes do horário marcado</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
  
  const renderHost = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-lg">
              {experience.host.name.charAt(0)}
            </span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900 mr-3">{experience.host.name}</h3>
              {experience.host.superhost && (
                <div className="flex items-center bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                  <Star className="fill-current mr-1" size={14} />
                  <span className="text-xs font-medium">Super Anfitrião</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <div>
                <span className="font-medium">Membro desde:</span> {new Date(experience.host.joinDate).getFullYear()}
              </div>
              <div>
                <span className="font-medium">Taxa de resposta:</span> {experience.host.responseRate}%
              </div>
              <div>
                <span className="font-medium">Tempo de resposta:</span> {experience.host.responseTime}
              </div>
              <div>
                <span className="font-medium">Idiomas:</span> {experience.host.languages.join(', ')}
              </div>
              <div>
                <span className="font-medium">Experiências:</span> {experience.host.totalExperiences}
              </div>
              <div>
                <span className="font-medium">Hóspedes:</span> {experience.host.totalGuests.toLocaleString()}
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{experience.host.about}</p>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                Enviar mensagem
              </Button>
              <Button variant="outline" size="sm">
                Ligar
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
  
  const renderPreparation = () => (
    <div className="space-y-8">
      {/* What to Bring */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">O que levar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {experience.whatToBring.map((item: any, index: number) => (
            <div key={index} className="flex items-start">
              <Backpack className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" size={16} />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Meeting Point */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Ponto de encontro</h3>
        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <MapPin className="text-primary-600 mt-1" size={20} />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{experience.meetingPoint.name}</h4>
              <p className="text-gray-700 mb-3">{experience.meetingPoint.address}</p>
              <p className="text-sm text-gray-600">{experience.meetingPoint.instructions}</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Weather Info */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Informações climáticas</h3>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Thermometer className="text-orange-500 mt-1" size={20} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Melhores meses</h4>
                <p className="text-gray-700">{experience.weatherInfo.bestMonths.join(', ')}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Umbrella className="text-blue-500 mt-1" size={20} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Estação chuvosa</h4>
                <p className="text-gray-700">{experience.weatherInfo.rainySeasonNote}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Safety Measures */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Medidas de segurança</h3>
        <div className="space-y-3">
          {experience.safetyMeasures.map((measure: any, index: number) => (
            <div key={index} className="flex items-start">
              <Shield className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
              <span className="text-gray-700">{measure}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Star className="fill-yellow-400 text-yellow-400 mr-2" size={24} />
          <span className="text-2xl font-bold text-gray-900">{experience.rating}</span>
          <span className="text-gray-600 ml-2">• {experience.reviews} avaliações</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {reviews.map((review: any) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-earth-400 to-earth-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">
                  {review.user.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_: any, i: number) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </p>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {review.comment}
                </p>
                
                <div className="flex items-center text-xs text-gray-500">
                  <button className="hover:text-gray-700">
                    {review.helpful} pessoas acharam útil
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline">
          Mostrar todas as {experience.reviews} avaliações
        </Button>
      </div>
    </div>
  );
  
  const renderPolicies = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Política de cancelamento</h3>
        <div className="flex items-start space-x-3">
          <Info className="text-blue-600 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-gray-900 mb-2">{experience.cancellationPolicy.type}</h4>
            <p className="text-gray-700 text-sm">{experience.cancellationPolicy.description}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-yellow-600 mt-1" size={20} />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Importante saber</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Esta experiência depende das condições climáticas</li>
              <li>• Idade mínima: {experience.ageRestriction}</li>
              <li>• Não recomendado para pessoas com problemas de mobilidade</li>
              <li>• Animais de estimação não são permitidos</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
  
  const tabs = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'itinerary', label: 'Itinerário' },
    { id: 'host', label: 'Anfitrião' },
    { id: 'preparation', label: 'Preparação' },
    { id: 'reviews', label: 'Avaliações' },
    { id: 'policies', label: 'Políticas' }
  ];
  
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'itinerary': return renderItinerary();
      case 'host': return renderHost();
      case 'preparation': return renderPreparation();
      case 'reviews': return renderReviews();
      case 'policies': return renderPolicies();
      default: return renderOverview();
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost">
              Voltar
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost">
                Compartilhar
              </Button>
              <Button variant="ghost">
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Experience Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{experience.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Star className="fill-yellow-400 text-yellow-400 mr-1" size={16} />
              <span className="font-medium">{experience.rating}</span>
              <span className="ml-1">({experience.reviews} avaliações)</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>
        
        {/* Image Gallery */}
        {renderImageGallery()}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab: any) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
          
          {/* Booking Card */}
          <div className="lg:col-span-1">
            {renderBookingCard()}
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={32} />
            </button>
            
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
              <div className="bg-gradient-to-br from-primary-400 to-secondary-500 w-full h-3/4 rounded-lg" />
              
              <button 
                onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                className="absolute left-4 text-white hover:text-gray-300"
              >
                <ChevronLeft size={48} />
              </button>
              
              <button 
                onClick={() => setSelectedImageIndex(Math.min(experience.images.length - 1, selectedImageIndex + 1))}
                className="absolute right-4 text-white hover:text-gray-300"
              >
                <ChevronRight size={48} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
                {selectedImageIndex + 1} / {experience.images.length}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Confirmar reserva</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-700">Experiência:</span>
                <span className="font-medium">{experience.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Data:</span>
                <span className="font-medium">{new Date(selectedDate).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Horário:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Participantes:</span>
                <span className="font-medium">{guests}</span>
              </div>
            </div>
            
            {calculateTotal() && (
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>{typeof calculateTotal() === 'object' && calculateTotal() !== 0 ? (calculateTotal() as {total: number}).total.toLocaleString() : '0'} AOA</span>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <Button className="w-full">
                {experience.instantBook ? 'Confirmar e pagar' : 'Enviar solicitação'}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowBookingModal(false)}>
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}