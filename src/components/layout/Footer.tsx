'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Globe
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Destinos',
      links: [
        { name: 'Luanda', href: '/search?location=luanda' },
        { name: 'Benguela', href: '/search?location=benguela' },
        { name: 'Huambo', href: '/search?location=huambo' },
        { name: 'Lobito', href: '/search?location=lobito' },
        { name: 'Namibe', href: '/search?location=namibe' },
        { name: 'Malanje', href: '/search?location=malanje' },
      ],
    },
    {
      title: 'Experiências',
      links: [
        { name: 'Turismo Cultural', href: '/experiences?category=cultural' },
        { name: 'Aventura', href: '/experiences?category=adventure' },
        { name: 'Gastronomia', href: '/experiences?category=food' },
        { name: 'Natureza', href: '/experiences?category=nature' },
        { name: 'História', href: '/experiences?category=history' },
        { name: 'Arte Local', href: '/experiences?category=art' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Central de Ajuda', href: '/help' },
        { name: 'Cancelamento', href: '/help/cancellation' },
        { name: 'Segurança', href: '/safety' },
        { name: 'Acessibilidade', href: '/accessibility' },
        { name: 'Denunciar', href: '/report' },
        { name: 'Contato', href: '/contact' },
      ],
    },
    {
      title: 'Anfitriões',
      links: [
        { name: 'Seja um Anfitrião', href: '/host' },
        { name: 'Centro de Recursos', href: '/host/resources' },
        { name: 'Comunidade', href: '/host/community' },
        { name: 'Responsabilidade Social', href: '/social-responsibility' },
        { name: 'Parceiros', href: '/partners' },
        { name: 'Investidores', href: '/investors' },
      ],
    },
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/angolatravel' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/angolatravel' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/angolatravel' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/angolatravel' },
  ];
  
  const languages = [
    { code: 'pt', name: 'Português', flag: '🇦🇴' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];
  
  const currencies = ['AOA', 'USD', 'EUR'];
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold">Angola Travel</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Descubra a beleza de Angola através de experiências autênticas e hospedagens únicas.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+244 923 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contato@angolatravel.ao</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Luanda, Angola</span>
              </div>
            </div>
          </div>
          
          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">Receba nossas novidades</h3>
            <p className="text-gray-400 text-sm mb-4">
              Fique por dentro das melhores ofertas e destinos de Angola.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2024 Angola Travel. Todos os direitos reservados.
            </div>
            
            {/* Language and Currency Selectors */}
            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-gray-400" />
                <select className="bg-transparent text-sm text-gray-400 border-none focus:outline-none cursor-pointer">
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-gray-900">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Currency Selector */}
              <select className="bg-transparent text-sm text-gray-400 border-none focus:outline-none cursor-pointer">
                {currencies.map((currency) => (
                  <option key={currency} value={currency} className="bg-gray-900">
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Termos
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;