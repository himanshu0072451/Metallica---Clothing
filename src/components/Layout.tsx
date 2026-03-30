import React from 'react';
import { Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-gray-700 selection:text-white flex flex-col">
        <Navbar />
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
};

