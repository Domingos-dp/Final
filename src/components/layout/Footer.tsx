'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Building,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      {/* Blue Line */}
      <div className="h-1 bg-blue-600"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Logo and Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div>
                <span className="text-xl font-bold text-blue-600">Reside.ao</span>
                <p className="text-xs text-gray-500">Descubra Angola, Viva Angola</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <Phone className="w-4 h-4" />
                <span>+244 943434233 | +244 9342312344</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <Building className="w-4 h-4" />
                <span>reside@co.co</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Informações */}
          <div>
            <h3 className="text-orange-500 font-bold text-lg mb-4">Informações</h3>
            <ul className="space-y-2">
              {['Contacts', 'Regulation', 'Safety Tips', 'Terms and conditions'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Alguns Links */}
          <div>
            <h3 className="text-orange-500 font-bold text-lg mb-4">Alguns Links</h3>
            <ul className="space-y-2">
              {['About Us', 'How it works', 'Privacy Policy', 'Site map'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Regista-te */}
          <div>
            <h3 className="text-orange-500 font-bold text-lg mb-4">Regista-te</h3>
            <p className="text-gray-500 text-sm mb-4">
              Use our built-in analytics dashboard to pull valuable insights and monitor
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2">
              <span>Create an account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">@2024 | Reside.co. All rights reserved</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {[
              { icon: Building, name: 'Twitter' },
              { icon: Building, name: 'LinkedIn' },
              { icon: Building, name: 'Facebook' },
              { icon: Phone, name: 'WhatsApp' },
              { icon: Building, name: 'Instagram' }
            ].map((social, index) => (
              <button
                key={index}
                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
              >
                <social.icon className="w-4 h-4 text-white" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;