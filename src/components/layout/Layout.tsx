// Layout principal da aplicação

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  User,
  Heart,
  Bell,
  Settings,
  LogOut,
  Globe,
  Sun,
  Moon,
  Monitor,
  MapPin,
  Calendar,
  Users,
  Home,
  Compass,
  BarChart3,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useUI';
import { cn } from '@/utils';

// Tipos
interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
  requiresAuth?: boolean;
  hostOnly?: boolean;
}

// Itens de navegação
const navItems: NavItem[] = [
  {
    label: 'Início',
    href: '/',
    icon: <Home className="w-4 h-4" />
  },
  {
    label: 'Buscar',
    href: '/search',
    icon: <Search className="w-4 h-4" />
  },
  {
    label: 'Experiências',
    href: '/experiences',
    icon: <Compass className="w-4 h-4" />
  },
  {
    label: 'Comparar',
    href: '/compare',
    icon: <BarChart3 className="w-4 h-4" />
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <User className="w-4 h-4" />,
    requiresAuth: true
  },
  {
    label: 'Anfitrião',
    href: '/host',
    icon: <Settings className="w-4 h-4" />,
    requiresAuth: true,
    hostOnly: true
  }
];

// Componente Header
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  // Fechar menu mobile ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Função para busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Filtrar itens de navegação baseado no usuário
  const filteredNavItems = navItems.filter(item => {
    if (item.requiresAuth && !user) return false;
    if (item.hostOnly && (!user || user.role !== 'host')) return false;
    return true;
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="hidden font-bold sm:inline-block">
              Angola Tourism
            </span>
          </Link>

          {/* Barra de busca - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar destinos, acomodações..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-1">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Ações do usuário */}
          <div className="flex items-center space-x-2">
            {/* Toggle de tema */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {user ? (
              <>
                {/* Notificações */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    3
                  </Badge>
                </Button>

                {/* Menu do usuário */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=favorites">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favoritos</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=bookings">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Reservas</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'host' && (
                      <DropdownMenuItem asChild>
                        <Link href="/host">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Painel do Anfitrião</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Cadastrar</Link>
                </Button>
              </div>
            )}

            {/* Menu mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t"
            >
              <div className="py-4 space-y-4">
                {/* Barra de busca mobile */}
                <form onSubmit={handleSearch} className="px-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar destinos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>

                {/* Navegação mobile */}
                <nav className="space-y-2 px-2">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Ações mobile */}
                <div className="px-2 pt-4 border-t">
                  <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className="w-full justify-start"
                  >
                    {isDark ? (
                      <Sun className="mr-2 h-4 w-4" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4" />
                    )}
                    Alternar tema
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

// Componente Footer
const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <MapPin className="h-4 w-4" />
              </div>
              <span className="font-bold">Angola Tourism</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Descubra as maravilhas de Angola. Encontre acomodações únicas, 
              experiências autênticas e crie memórias inesquecíveis.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold">Explorar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground">
                  Acomodações
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-muted-foreground hover:text-foreground">
                  Experiências
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted-foreground hover:text-foreground">
                  Comparar preços
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-foreground">
                  Destinos
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="space-y-4">
            <h3 className="font-semibold">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Central de ajuda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-muted-foreground hover:text-foreground">
                  Segurança
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Para anfitriões */}
          <div className="space-y-4">
            <h3 className="font-semibold">Anfitriões</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/host" className="text-muted-foreground hover:text-foreground">
                  Seja um anfitrião
                </Link>
              </li>
              <li>
                <Link href="/host/resources" className="text-muted-foreground hover:text-foreground">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/host/community" className="text-muted-foreground hover:text-foreground">
                  Comunidade
                </Link>
              </li>
              <li>
                <Link href="/host/standards" className="text-muted-foreground hover:text-foreground">
                  Padrões de qualidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Angola Tourism. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacidade
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Globe className="h-3 w-3" />
              <span>Português</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Componente Layout principal
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;