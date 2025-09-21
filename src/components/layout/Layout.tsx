// Layout principal da aplicação - simple wrapper that uses shared Header/Footer

'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

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