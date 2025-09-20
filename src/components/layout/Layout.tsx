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
  Settings,
  Menu,
  X
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
import Footer from './Footer';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <header className="fixed top-2 sm:top-4 lg:top-8 left-2 sm:left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] lg:w-[1232px] h-[60px] sm:h-[65px] lg:h-[70px] bg-white shadow-[0px_2px_6px_rgba(0,0,0,0.09)] rounded-md z-50">
      <div className="flex justify-between items-center h-full px-3 sm:px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Logo Icon with R and orange triangle */}
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
                  <div className="w-full h-full bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base lg:text-lg">R</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-orange-500 transform rotate-45"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold text-blue-600">Reside.ao</span>
                  <span className="text-xs text-gray-500 -mt-1 hidden sm:block">Descubra Angola. Viva Angola</span>
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
                  <div className="flex items-center space-x-4 lg:space-x-6">
                    {/* Language Selector - Hidden on mobile */}
                    <div className="relative hidden sm:block">
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

                    {/* Login Button - Hidden on mobile */}
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 lg:px-4 flex items-center space-x-2 rounded-md hidden sm:flex">
                      <User size={16} />
                      <span className="text-sm font-medium hidden lg:inline">Fazer login</span>
                    </Button>

                    {/* Mobile Menu Button */}
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div className="space-y-2">
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
                            className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                          >
                            <span className="font-medium">{item.name}</span>
                            <ChevronDown size={16} className={`transition-transform ${(item.name === 'Our products' && isProductsMenuOpen) || (item.name === 'Benefits avaliables to partners' && isBenefitsMenuOpen) ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {((item.name === 'Our products' && isProductsMenuOpen) || 
                              (item.name === 'Benefits avaliables to partners' && isBenefitsMenuOpen)) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-4 space-y-1"
                              >
                                {item.dropdownItems?.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                    onClick={() => {
                                      setIsProductsMenuOpen(false);
                                      setIsBenefitsMenuOpen(false);
                                      setIsMobileMenuOpen(false);
                                    }}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                  </div>
                      ) : (
                    <Link
                      href={item.href}
                          className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                            item.current
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-700">Idioma</span>
                    <div className="grid grid-cols-1 gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className="flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md"
                          onClick={() => {
                            setIsLanguageMenuOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm text-gray-700">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Mobile Login Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center space-x-2 rounded-md">
                    <User size={16} />
                    <span className="font-medium">Fazer login</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
};


// Componente Layout principal
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 sm:pt-20 lg:pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;