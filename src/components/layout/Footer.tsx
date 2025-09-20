'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail,
  ArrowRight,
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';
import { Button } from '../ui/Button';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full min-h-[450px] bg-[#F8F8F8]">
      {/* Main Content */}
      <div className="relative w-full min-h-full px-4 sm:px-8 lg:px-[104px] py-8 sm:py-12 lg:py-[50px] max-w-7xl mx-auto">
        
        {/* Mobile and Tablet Layout */}
        <div className="block lg:hidden space-y-8">
          {/* Logo and Brand Section */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 transform rotate-45"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-600">Reside.ao</span>
                <span className="text-xs text-[#A6A6A7] -mt-1">Descubra Angola. Viva Angola</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-[#A6A6A7] text-sm leading-7">
              Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[#A6A6A7]" />
                <span className="text-[#A6A6A7] text-sm">+244 943434233 | +244 9342312344</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#A6A6A7]" />
                <span className="text-[#A6A6A7] text-sm">reside@co.ao</span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Informações Column */}
            <div>
              <h3 className="text-[#FF9416] font-bold text-lg mb-4">Informações</h3>
              <ul className="space-y-2">
                {['Contacts', 'Regulation', 'Safety Tips', 'Terms and conditions'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-[#A6A6A7] text-sm leading-7 hover:text-gray-600">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alguns Links Column */}
            <div>
              <h3 className="text-[#FF9416] font-bold text-lg mb-4">Alguns Links</h3>
              <ul className="space-y-2">
                {['About Us', 'How it works', 'Privacy Policy', 'Site map'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-[#A6A6A7] text-sm leading-7 hover:text-gray-600">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Regista-te Column */}
          <div>
            <h3 className="text-[#FF9416] font-bold text-lg mb-4">Regista-te</h3>
            <p className="text-[#A6A6A7] text-sm leading-7 mb-4">
              Use our built-in analytics dashboard to pull valuable insights and monitor
            </p>
            <Button className="bg-[#4045EB] hover:bg-[#4045EB]/90 text-[#F5F5F5] px-6 py-3 rounded flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-sm font-bold">Create an account</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Separator Line */}
          <div className="w-full h-[1px] bg-[#E0E0E0] rounded"></div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <p className="text-[#A6A6A7] text-sm text-center sm:text-left">@2024 | Reside.ao. All rights reserved</p>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              {/* Twitter */}
              <div className="w-8 h-8 sm:w-[37px] sm:h-[37px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              
              {/* Facebook */}
              <div className="w-8 h-8 sm:w-[37px] sm:h-[37px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              
              {/* Instagram */}
              <div className="w-8 h-8 sm:w-[37px] sm:h-[37px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              
              {/* LinkedIn */}
              <div className="w-8 h-8 sm:w-[37px] sm:h-[37px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Logo and Brand Section */}
          <div className="absolute left-0 top-[50px] w-[306px]">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-8 h-8">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 transform rotate-45"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-600">Reside.ao</span>
                <span className="text-xs text-[#A6A6A7] -mt-1">Descubra Angola. Viva Angola</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-[#A6A6A7] text-sm leading-7 mb-4 w-[306px]">
              Use our built-in analytics dashboard to pull valuable insights and monitor the value of your Krypto portfolio over time.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-6 h-6 text-[#A6A6A7]" />
                <span className="text-[#A6A6A7] text-sm">+244 943434233 | +244 9342312344</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-6 h-6 text-[#A6A6A7]" />
                <span className="text-[#A6A6A7] text-sm">reside@co.ao</span>
              </div>
            </div>
          </div>

          {/* Informações Column */}
          <div className="absolute left-[383px] top-[50px] w-[154px]">
            <h3 className="text-[#FF9416] font-bold text-xl mb-4">Informações</h3>
            <ul className="space-y-2">
              {['Contacts', 'Regulation', 'Safety Tips', 'Terms and conditions'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[#A6A6A7] text-sm leading-7 hover:text-gray-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Alguns Links Column */}
          <div className="absolute left-[591px] top-[50px] w-[129px]">
            <h3 className="text-[#FF9416] font-bold text-xl mb-4">Alguns Links</h3>
            <ul className="space-y-2">
              {['About Us', 'How it works', 'Privacy Policy', 'Site map'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-[#A6A6A7] text-sm leading-7 hover:text-gray-600">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regista-te Column */}
          <div className="absolute left-[774px] top-[50px] w-[260px]">
            <h3 className="text-[#FF9416] font-bold text-xl mb-4">Regista-te</h3>
            <p className="text-[#A6A6A7] text-sm leading-7 mb-4 w-[260px]">
              Use our built-in analytics dashboard to pull valuable insights and monitor
            </p>
            <Button className="bg-[#4045EB] hover:bg-[#4045EB]/90 text-[#F5F5F5] px-[22px] py-3 rounded flex items-center space-x-2 w-[215px] h-[45px]">
              <span className="text-sm font-bold">Create an account</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Separator Line */}
          <div className="absolute left-0 top-[295px] w-full h-[1px] bg-[#E0E0E0] rounded"></div>

          {/* Bottom Section */}
          <div className="absolute left-0 top-[315px] w-full flex justify-between items-center">
            {/* Copyright */}
            <p className="text-[#A6A6A7] text-sm">@2024 | Reside.ao. All rights reserved</p>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              {/* Twitter */}
              <div className="w-[37px] h-[37px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              
              {/* Facebook */}
              <div className="w-[37px] h-[37px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              
              {/* Instagram */}
              <div className="w-[37px] h-[37px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              
              {/* LinkedIn */}
              <div className="w-[37px] h-[37px] bg-[#D9D9D9] rounded-full flex items-center justify-center">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;