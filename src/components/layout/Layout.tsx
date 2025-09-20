// Layout principal da aplicação

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  ChevronDown,
  Globe,
  MapPin,
  Calendar,
  Users,
  Home,
  Compass,
  BarChart3,
  MessageCircle,
  HelpCircle,
  Settings
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
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isBenefitsMenuOpen, setIsBenefitsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navigation = [
    { name: 'Home', href: '/', current: pathname === '/' },
    { 
      name: 'Our products', 
      href: '#', 
      current: false,
      hasDropdown: true,
      dropdownItems: [
        { name: 'Properties', href: '/properties' },
        { name: 'Apartments', href: '/apartments' },
        { name: 'Resorts', href: '/resorts' },
        { name: 'Tourism', href: '/tourism' },
      ]
    },
    { 
      name: 'Benefits avaliables to partners', 
      href: '#', 
      current: false,
      hasDropdown: true,
      dropdownItems: [
        { name: 'Partner Benefits', href: '/benefits' },
        { name: 'Commission Structure', href: '/commission' },
        { name: 'Support', href: '/support' },
      ]
    },
    { name: 'Anuncie seu espaço no Reside.ao', href: '/host', current: pathname.startsWith('/host') },
  ];
  
  const languages = [
    { code: 'pt', name: 'Português', flag: '🇦🇴' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];
  
  return (
    <header className="fixed top-8 left-1/2 transform -translate-x-1/2 w-[1232px] h-[70px] bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.09)] rounded-md z-50">
      <div className="flex justify-between items-center h-full px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                {/* Logo Icon with R and orange triangle */}
                <div className="relative w-8 h-8">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 transform rotate-45"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-blue-600">Reside.ao</span>
                  <span className="text-xs text-gray-500 -mt-1">Descubra Angola. Viva Angola</span>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => {
                        if (item.name === 'Our products') {
                          setIsProductsMenuOpen(!isProductsMenuOpen);
                          setIsBenefitsMenuOpen(false);
                        } else if (item.name === 'Benefits avaliables to partners') {
                          setIsBenefitsMenuOpen(!isBenefitsMenuOpen);
                          setIsProductsMenuOpen(false);
                        }
                      }}
                      className="flex items-center space-x-1 px-2 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={14} />
                    </button>
                    
                    <AnimatePresence>
                      {(item.name === 'Our products' && isProductsMenuOpen) || 
                       (item.name === 'Benefits avaliables to partners' && isBenefitsMenuOpen) ? (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                        >
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => {
                                setIsProductsMenuOpen(false);
                                setIsBenefitsMenuOpen(false);
                              }}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-2 py-2 text-sm font-medium transition-colors ${
                      item.current
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          {/* Right side */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 px-2 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <span className="text-sm font-medium">EN</span>
                <ChevronDown size={14} />
              </button>
              
              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                        onClick={() => setIsLanguageMenuOpen(false)}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm text-gray-700">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Login Button */}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center space-x-2 rounded-md">
              <User size={16} />
              <span className="text-sm font-medium">Fazer login</span>
            </Button>
          </div>
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
      <main className="flex-1 pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;