// Sistema de chat/mensagens entre usuários e anfitriões

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Clock,
  Check,
  CheckCheck,
  Star,
  Info,
  Archive,
  Trash2,
  Flag,
  User,
  Home
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import mockData from '@/data/mockData';
import { formatDate, formatDateTime } from '@/utils';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'booking' | 'system';
  isRead: boolean;
  bookingId?: string;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  propertyId?: string;
  bookingId?: string;
}

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversations and messages
  const [conversations] = useState<Conversation[]>([
    {
      id: 'conv1',
      participants: [user?.id || '', 'user2'],
      lastMessage: {
        id: 'msg1',
        senderId: 'user2',
        receiverId: user?.id || '',
        content: 'Olá! Gostaria de saber mais detalhes sobre a propriedade.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'text',
        isRead: false
      },
      unreadCount: 2,
      propertyId: 'prop1',
      bookingId: 'booking1'
    },
    {
      id: 'conv2',
      participants: [user?.id || '', 'user3'],
      lastMessage: {
        id: 'msg2',
        senderId: user?.id || '',
        receiverId: 'user3',
        content: 'Perfeito! Aguardo sua chegada.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: 'text',
        isRead: true
      },
      unreadCount: 0,
      propertyId: 'prop2',
      bookingId: 'booking2'
    },
    {
      id: 'conv3',
      participants: [user?.id || '', 'user4'],
      lastMessage: {
        id: 'msg3',
        senderId: 'user4',
        receiverId: user?.id || '',
        content: 'Obrigado pela hospedagem! Foi excelente.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        type: 'text',
        isRead: true
      },
      unreadCount: 0,
      propertyId: 'prop3'
    }
  ]);

  const [messages] = useState<Record<string, Message[]>>({
    conv1: [
      {
        id: 'msg1-1',
        senderId: 'user2',
        receiverId: user?.id || '',
        content: 'Olá! Vi sua propriedade e fiquei interessado.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        type: 'text',
        isRead: true
      },
      {
        id: 'msg1-2',
        senderId: user?.id || '',
        receiverId: 'user2',
        content: 'Olá! Fico feliz pelo seu interesse. Em que posso ajudá-lo?',
        timestamp: new Date(Date.now() - 1000 * 60 * 50),
        type: 'text',
        isRead: true
      },
      {
        id: 'msg1-3',
        senderId: 'user2',
        receiverId: user?.id || '',
        content: 'Gostaria de saber mais detalhes sobre a propriedade.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'text',
        isRead: false
      },
      {
        id: 'msg1-4',
        senderId: 'user2',
        receiverId: user?.id || '',
        content: 'Tem disponibilidade para o próximo fim de semana?',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        type: 'text',
        isRead: false
      }
    ],
    conv2: [
      {
        id: 'msg2-1',
        senderId: 'user3',
        receiverId: user?.id || '',
        content: 'Confirmando minha reserva para amanhã.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        type: 'text',
        isRead: true
      },
      {
        id: 'msg2-2',
        senderId: user?.id || '',
        receiverId: 'user3',
        content: 'Perfeito! Aguardo sua chegada.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: 'text',
        isRead: true
      }
    ],
    conv3: [
      {
        id: 'msg3-1',
        senderId: 'user4',
        receiverId: user?.id || '',
        content: 'Obrigado pela hospedagem! Foi excelente.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        type: 'text',
        isRead: true
      }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation, messages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || '',
      receiverId: getOtherParticipant(selectedConversation),
      content: messageText,
      timestamp: new Date(),
      type: 'text',
      isRead: false
    };

    // In a real app, this would be sent to the server
    toast({
      title: 'Mensagem enviada',
      description: 'Sua mensagem foi enviada com sucesso.'
    });

    setMessageText('');
  };

  const getOtherParticipant = (conversationId: string): string => {
    const conversation = conversations.find((c: any) => c.id === conversationId);
    return conversation?.participants.find((p: any) => p !== user?.id) || '';
  };

  const getParticipantInfo = (userId: string) => {
    return mockData.users.find((u: any) => u.id === userId) || {
      id: userId,
      firstName: 'Usuário',
      lastName: 'Desconhecido',
      avatar: '',
      email: ''
    };
  };

  const getPropertyInfo = (propertyId?: string) => {
    if (!propertyId) return null;
    return mockData.properties.find((p: any) => p.id === propertyId);
  };

  const getBookingInfo = (bookingId?: string) => {
    if (!bookingId) return null;
    return mockData.bookings.find((b: any) => b.id === bookingId);
  };

  const filteredConversations = conversations.filter((conv: any) => {
    const otherParticipant = getParticipantInfo(getOtherParticipant(conv.id));
    const fullName = `${otherParticipant.firstName} ${otherParticipant.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const selectedConversationData = conversations.find((c: any) => c.id === selectedConversation);
  const selectedMessages = selectedConversation ? messages[selectedConversation] || [] : [];
  const otherParticipant = selectedConversation ? getParticipantInfo(getOtherParticipant(selectedConversation)) : null;
  const propertyInfo = getPropertyInfo(selectedConversationData?.propertyId);
  const bookingInfo = getBookingInfo(selectedConversationData?.bookingId);

  const ConversationItem = ({ conversation }: { conversation: Conversation }) => {
    const otherUser = getParticipantInfo(getOtherParticipant(conversation.id));
    const property = getPropertyInfo(conversation.propertyId);
    const isSelected = selectedConversation === conversation.id;

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`p-4 cursor-pointer border-b transition-colors ${
          isSelected ? 'bg-primary/10 border-primary/20' : 'hover:bg-muted/50'
        }`}
        onClick={() => setSelectedConversation(conversation.id)}
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={otherUser.avatar} alt={otherUser.firstName} />
              <AvatarFallback>
                {otherUser.firstName?.[0]}{otherUser.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            {conversation.unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {conversation.unreadCount}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium truncate">
                {otherUser.firstName} {otherUser.lastName}
              </h3>
              <span className="text-xs text-muted-foreground">
                {formatDateTime(conversation.lastMessage.timestamp)}
              </span>
            </div>
            
            {property && (
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <Home className="w-3 h-3 mr-1" />
                <span className="truncate">{property.title}</span>
              </div>
            )}
            
            <p className="text-sm text-muted-foreground truncate">
              {conversation.lastMessage.senderId === user?.id && (
                <span className="mr-1">
                  {conversation.lastMessage.isRead ? (
                    <CheckCheck className="w-3 h-3 inline text-primary" />
                  ) : (
                    <Check className="w-3 h-3 inline" />
                  )}
                </span>
              )}
              {conversation.lastMessage.content}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  const MessageBubble = ({ message }: { message: Message }) => {
    const isOwn = message.senderId === user?.id;
    const sender = getParticipantInfo(message.senderId);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex items-end space-x-2 max-w-[70%] ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {!isOwn && (
            <Avatar className="w-8 h-8">
              <AvatarImage src={sender.avatar} alt={sender.firstName} />
              <AvatarFallback className="text-xs">
                {sender.firstName?.[0]}{sender.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div className={`rounded-2xl px-4 py-2 ${
            isOwn 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted'
          }`}>
            <p className="text-sm">{message.content}</p>
            <div className={`flex items-center justify-end mt-1 space-x-1 ${
              isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}>
              <span className="text-xs">{formatDateTime(message.timestamp)}</span>
              {isOwn && (
                message.isRead ? (
                  <CheckCheck className="w-3 h-3" />
                ) : (
                  <Check className="w-3 h-3" />
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Conversas</span>
                <Badge variant="secondary">
                  {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)}
                </Badge>
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                {filteredConversations.map((conversation) => (
                  <ConversationItem key={conversation.id} conversation={conversation} />
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2">
            {selectedConversation && otherParticipant ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.firstName} />
                        <AvatarFallback>
                          {otherParticipant.firstName?.[0]}{otherParticipant.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {otherParticipant.firstName} {otherParticipant.lastName}
                        </h3>
                        {propertyInfo && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Home className="w-3 h-3 mr-1" />
                            <span>{propertyInfo.title}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Info className="w-4 h-4 mr-2" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="w-4 h-4 mr-2" />
                            Arquivar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Flag className="w-4 h-4 mr-2" />
                            Reportar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir conversa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  {/* Booking Info */}
                  {bookingInfo && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Reserva #{bookingInfo.id.slice(-6)}</span>
                        </div>
                        <Badge variant="outline">{bookingInfo.status}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{formatDate(bookingInfo.checkIn)} - {formatDate(bookingInfo.checkOut)}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span>{bookingInfo.guests} hóspedes</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardHeader>

                {/* Messages */}
                <CardContent className="p-0">
                  <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                    <AnimatePresence>
                      {selectedMessages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Digite sua mensagem..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="min-h-[40px] max-h-[120px] resize-none"
                      />
                    </div>
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* No Conversation Selected */
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Selecione uma conversa</h3>
                  <p className="text-muted-foreground">
                    Escolha uma conversa da lista para começar a trocar mensagens.
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;