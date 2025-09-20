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
  MapPin,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
    { name: 'Partners', href: '/partners', current: pathname.startsWith('/partners') },
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-blue-600">Reside.ao</span>
                  <span className="text-xs text-orange-500 -mt-1">Descubra Angola, Viva Angola</span>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
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
                      className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={16} />
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
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
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
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <span className="text-sm font-medium">EN</span>
                <ChevronDown size={16} />
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
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center space-x-2">
              <User size={16} />
              <span>Fazer login</span>
            </Button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
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
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      item.current
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="ml-4 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-3 py-1 text-sm text-gray-600 hover:text-blue-600"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;