'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

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
  <header className="fixed top-8 left-[104px] w-[1232px] h-[70px] bg-navbar/95 shadow-[0px_2px_6px_rgba(0,0,0,0.09)] rounded-md z-50">
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
                                className="block px-4 py-2 text-sm text-black hover:bg-gray-50"
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
                        <span className="text-sm text-black">{lang.name}</span>
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

export default Header;