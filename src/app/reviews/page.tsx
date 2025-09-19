// Sistema de avaliações e comentários

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Filter,
  Search,
  Calendar,
  MapPin,
  User,
  Home,
  Flag,
  MoreHorizontal,
  Edit,
  Trash2,
  Reply,
  Heart,
  Share2,
  TrendingUp,
  Award,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { mockReviews, mockUsers, mockProperties, mockBookings } from '@/data/mockData';
import { formatDate, formatCurrency } from '@/utils';

interface Review {
  id: string;
  userId: string;
  propertyId: string;
  bookingId: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
  helpfulVotes: number;
  notHelpfulVotes: number;
  hostReply?: {
    content: string;
    createdAt: Date;
  };
  categories: {
    cleanliness: number;
    communication: number;
    checkIn: number;
    accuracy: number;
    location: number;
    value: number;
  };
  images?: string[];
  isVerified: boolean;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
  categoryAverages: {
    cleanliness: number;
    communication: number;
    checkIn: number;
    accuracy: number;
    location: number;
    value: number;
  };
}

const ReviewsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    categories: {
      cleanliness: 0,
      communication: 0,
      checkIn: 0,
      accuracy: 0,
      location: 0,
      value: 0
    }
  });

  // Mock reviews data
  const [reviews] = useState<Review[]>([
    {
      id: 'rev1',
      userId: 'user2',
      propertyId: 'prop1',
      bookingId: 'booking1',
      rating: 5,
      title: 'Experiência incrível!',
      comment: 'A propriedade superou todas as expectativas. Local limpo, bem localizado e o anfitrião foi muito atencioso. Recomendo fortemente!',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      helpfulVotes: 12,
      notHelpfulVotes: 1,
      categories: {
        cleanliness: 5,
        communication: 5,
        checkIn: 4,
        accuracy: 5,
        location: 5,
        value: 4
      },
      isVerified: true,
      hostReply: {
        content: 'Muito obrigado pela avaliação! Foi um prazer recebê-los.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
      }
    },
    {
      id: 'rev2',
      userId: 'user3',
      propertyId: 'prop1',
      bookingId: 'booking2',
      rating: 4,
      title: 'Boa estadia',
      comment: 'Local agradável e bem localizado. Apenas alguns detalhes de limpeza poderiam ser melhorados.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      helpfulVotes: 8,
      notHelpfulVotes: 2,
      categories: {
        cleanliness: 3,
        communication: 4,
        checkIn: 4,
        accuracy: 4,
        location: 5,
        value: 4
      },
      isVerified: true
    },
    {
      id: 'rev3',
      userId: 'user4',
      propertyId: 'prop2',
      bookingId: 'booking3',
      rating: 5,
      title: 'Perfeito para famílias',
      comment: 'Excelente para quem viaja com crianças. Espaço amplo, seguro e com todas as comodidades necessárias.',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      helpfulVotes: 15,
      notHelpfulVotes: 0,
      categories: {
        cleanliness: 5,
        communication: 5,
        checkIn: 5,
        accuracy: 5,
        location: 4,
        value: 5
      },
      isVerified: true
    }
  ]);

  // Calculate review statistics
  const calculateStats = (propertyId?: string): ReviewStats => {
    const propertyReviews = propertyId 
      ? reviews.filter(r => r.propertyId === propertyId)
      : reviews;

    const totalReviews = propertyReviews.length;
    const averageRating = totalReviews > 0 
      ? propertyReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    propertyReviews.forEach(review => {
      ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
    });

    const categoryAverages = {
      cleanliness: 0,
      communication: 0,
      checkIn: 0,
      accuracy: 0,
      location: 0,
      value: 0
    };

    if (totalReviews > 0) {
      Object.keys(categoryAverages).forEach(category => {
        categoryAverages[category as keyof typeof categoryAverages] = 
          propertyReviews.reduce((sum, r) => sum + r.categories[category as keyof typeof r.categories], 0) / totalReviews;
      });
    }

    return {
      averageRating,
      totalReviews,
      ratingDistribution,
      categoryAverages
    };
  };

  const stats = calculateStats();

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.title.trim() || !newReview.comment.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Avaliação enviada',
      description: 'Sua avaliação foi enviada com sucesso!'
    });

    setIsWritingReview(false);
    setNewReview({
      rating: 0,
      title: '',
      comment: '',
      categories: {
        cleanliness: 0,
        communication: 0,
        checkIn: 0,
        accuracy: 0,
        location: 0,
        value: 0
      }
    });
  };

  const handleVoteHelpful = (reviewId: string, isHelpful: boolean) => {
    toast({
      title: 'Voto registrado',
      description: `Obrigado por avaliar esta resenha como ${isHelpful ? 'útil' : 'não útil'}.`
    });
  };

  const StarRating = ({ rating, size = 'sm', interactive = false, onRatingChange }: {
    rating: number;
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
  }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(star)}
            className={`${sizeClasses[size]} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          >
            <Star
              className={`w-full h-full ${
                star <= rating
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const CategoryRating = ({ label, rating, onRatingChange }: {
    label: string;
    rating: number;
    onRatingChange?: (rating: number) => void;
  }) => (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <StarRating
        rating={rating}
        interactive={!!onRatingChange}
        onRatingChange={onRatingChange}
      />
    </div>
  );

  const ReviewCard = ({ review }: { review: Review }) => {
    const reviewer = mockUsers.find(u => u.id === review.userId);
      const property = mockProperties.find(p => p.id === review.propertyId);
      const booking = mockBookings.find(b => b.id === review.bookingId);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border rounded-lg p-6 space-y-4"
      >
        {/* Review Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={reviewer?.avatar} alt={reviewer?.firstName} />
              <AvatarFallback>
                {reviewer?.firstName?.[0]}{reviewer?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">
                  {reviewer?.firstName} {reviewer?.lastName}
                </h3>
                {review.isVerified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{formatDate(review.createdAt)}</span>
                {booking && (
                  <>
                    <span>•</span>
                    <span>Estadia verificada</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Flag className="w-4 h-4 mr-2" />
                Reportar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </DropdownMenuItem>
              {review.userId === user?.id && (
                <>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Property Info */}
        {property && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Home className="w-4 h-4" />
            <span>{property.title}</span>
            <span>•</span>
            <MapPin className="w-3 h-3" />
            <span>{property.location?.city}, {property.location?.province}</span>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <StarRating rating={review.rating} size="md" />
          <span className="font-semibold">{review.rating}.0</span>
        </div>

        {/* Review Content */}
        <div>
          <h4 className="font-semibold mb-2">{review.title}</h4>
          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
        </div>

        {/* Category Ratings */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <CategoryRating label="Limpeza" rating={review.categories.cleanliness} />
          <CategoryRating label="Comunicação" rating={review.categories.communication} />
          <CategoryRating label="Check-in" rating={review.categories.checkIn} />
          <CategoryRating label="Precisão" rating={review.categories.accuracy} />
          <CategoryRating label="Localização" rating={review.categories.location} />
          <CategoryRating label="Custo-benefício" rating={review.categories.value} />
        </div>

        {/* Host Reply */}
        {review.hostReply && (
          <div className="border-l-4 border-primary pl-4 bg-muted/20 p-4 rounded-r-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm">Resposta do anfitrião</span>
              <span className="text-xs text-muted-foreground">
                {formatDate(review.hostReply.createdAt)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{review.hostReply.content}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleVoteHelpful(review.id, true)}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Útil ({review.helpfulVotes})</span>
            </button>
            <button
              onClick={() => handleVoteHelpful(review.id, false)}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Não útil ({review.notHelpfulVotes})</span>
            </button>
          </div>
          
          <Button variant="ghost" size="sm">
            <Reply className="w-4 h-4 mr-2" />
            Responder
          </Button>
        </div>
      </motion.div>
    );
  };

  const ReviewStats = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span>Estatísticas de Avaliações</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.averageRating.toFixed(1)}</div>
          <StarRating rating={Math.round(stats.averageRating)} size="lg" />
          <p className="text-muted-foreground mt-2">
            Baseado em {stats.totalReviews} avaliações
          </p>
        </div>

        <Separator />

        {/* Rating Distribution */}
        <div className="space-y-3">
          <h4 className="font-semibold">Distribuição de Notas</h4>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = stats.ratingDistribution[rating];
            const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
            return (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm">{rating}</span>
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                </div>
                <Progress value={percentage} className="flex-1" />
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Category Averages */}
        <div className="space-y-3">
          <h4 className="font-semibold">Médias por Categoria</h4>
          <div className="space-y-2">
            <CategoryRating label="Limpeza" rating={stats.categoryAverages.cleanliness} />
            <CategoryRating label="Comunicação" rating={stats.categoryAverages.communication} />
            <CategoryRating label="Check-in" rating={stats.categoryAverages.checkIn} />
            <CategoryRating label="Precisão" rating={stats.categoryAverages.accuracy} />
            <CategoryRating label="Localização" rating={stats.categoryAverages.location} />
            <CategoryRating label="Custo-benefício" rating={stats.categoryAverages.value} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const WriteReviewDialog = () => (
    <Dialog open={isWritingReview} onOpenChange={setIsWritingReview}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Escrever Avaliação</DialogTitle>
          <DialogDescription>
            Compartilhe sua experiência para ajudar outros viajantes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overall Rating */}
          <div>
            <label className="text-sm font-medium mb-2 block">Avaliação Geral *</label>
            <StarRating
              rating={newReview.rating}
              size="lg"
              interactive
              onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
            />
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">Título da Avaliação *</label>
            <Input
              placeholder="Resuma sua experiência..."
              value={newReview.title}
              onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium mb-2 block">Comentário *</label>
            <Textarea
              placeholder="Conte-nos sobre sua estadia..."
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              className="min-h-[120px]"
            />
          </div>

          {/* Category Ratings */}
          <div>
            <label className="text-sm font-medium mb-4 block">Avaliações por Categoria</label>
            <div className="space-y-4">
              <CategoryRating
                label="Limpeza"
                rating={newReview.categories.cleanliness}
                onRatingChange={(rating) => setNewReview(prev => ({
                  ...prev,
                  categories: { ...prev.categories, cleanliness: rating }
                }))}
              />
              <CategoryRating
                label="Comunicação"
                rating={newReview.categories.communication}
                onRatingChange={(rating) => setNewReview(prev => ({
                  ...prev,
                  categories: { ...prev.categories, communication: rating }
                }))}
              />
              <CategoryRating
                label="Check-in"
                rating={newReview.categories.checkIn}
                onRatingChange={(rating) => setNewReview(prev => ({
                  ...prev,
                  categories: { ...prev.categories, checkIn: rating }
                }))}
              />
              <CategoryRating
                label="Precisão"
                rating={newReview.categories.accuracy}
                onRatingChange={(rating) => setNewReview(prev => ({
                  ...prev,
                  categories: { ...prev.categories, accuracy: rating }
                }))}
              />
              <CategoryRating
                label="Localização"
                rating={newReview.categories.location}
                onRatingChange={(rating) => setNewReview(prev => ({
                  ...prev,
                  categories: { ...prev.categories, location: rating }
                }))}
              />
              <CategoryRating
                label="Custo-benefício"
                rating={newReview.categories.value}
                onRatingChange={(rating) => setNewReview(prev => ({
                  ...prev,
                  categories: { ...prev.categories, value: rating }
                }))}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsWritingReview(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmitReview}>
            Publicar Avaliação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpfulVotes - a.helpfulVotes;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Avaliações e Comentários</h1>
            <p className="text-muted-foreground">
              Veja o que outros viajantes estão dizendo sobre as propriedades
            </p>
          </div>
          <Button onClick={() => setIsWritingReview(true)}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Escrever Avaliação
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ReviewStats />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar avaliações..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Mais recentes</SelectItem>
                      <SelectItem value="oldest">Mais antigas</SelectItem>
                      <SelectItem value="highest">Maior nota</SelectItem>
                      <SelectItem value="lowest">Menor nota</SelectItem>
                      <SelectItem value="helpful">Mais úteis</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue placeholder="Nota" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="5">5 estrelas</SelectItem>
                      <SelectItem value="4">4 estrelas</SelectItem>
                      <SelectItem value="3">3 estrelas</SelectItem>
                      <SelectItem value="2">2 estrelas</SelectItem>
                      <SelectItem value="1">1 estrela</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-6">
              <AnimatePresence>
                {sortedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </AnimatePresence>
              
              {sortedReviews.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma avaliação encontrada</h3>
                    <p className="text-muted-foreground">
                      Tente ajustar os filtros ou seja o primeiro a avaliar!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <WriteReviewDialog />
      </div>
    </div>
  );
};

export default ReviewsPage;