'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  Globe, 
  User, 
  Heart, 
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  MapPin
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navigation = [
    { name: 'Início', href: '/', current: pathname === '/' },
    { name: 'Hospedagens', href: '/search?type=accommodation', current: pathname.startsWith('/search') },
    { name: 'Experiências', href: '/experiences', current: pathname.startsWith('/experiences') },
    { name: 'Roteiros IA', href: '/itinerary', current: pathname.startsWith('/itinerary') },
    { name: 'Comparador', href: '/compare', current: pathname.startsWith('/compare') },
  ];
  
  const languages = [
    { code: 'pt', name: 'Português', flag: '🇦🇴' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];
  
  const userMenuItems = [
    { name: 'Meu Perfil', href: '/profile', icon: User },
    { name: 'Minhas Reservas', href: '/bookings', icon: MapPin },
    { name: 'Favoritos', href: '/favorites', icon: Heart },
    { name: 'Mensagens', href: '/messages', icon: MessageCircle },
    { name: 'Notificações', href: '/notifications', icon: Bell },
    { name: 'Configurações', href: '/settings', icon: Settings },
  ];
  
  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Angola Travel
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Mobile */}
            <button className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Search size={20} />
            </button>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 p-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Globe size={20} />
                <span className="hidden sm:block text-sm">PT</span>
              </button>
              
              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-medium border border-gray-100 py-2 z-50"
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
            
            {/* Host Link */}
            <Link
              href="/host"
              className="hidden sm:block text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              Seja um Anfitrião
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 border border-gray-300 rounded-full hover:shadow-md transition-all"
              >
                <Menu size={16} className="text-gray-600" />
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              </button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-medium border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">João Silva</p>
                      <p className="text-sm text-gray-500">joao@email.com</p>
                    </div>
                    
                    <div className="py-2">
                      {userMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Icon size={16} />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2">
                      <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                        <LogOut size={16} />
                        <span>Sair</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    item.current
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/host"
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Seja um Anfitrião
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;