import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { Product } from './pages/Product';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ReactLenis root>
        <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-gray-700 selection:text-white flex flex-col uppercase-links-fixed font-[Assist]">
          <CustomCursor />
          <Navbar />
          <CartDrawer />
          <main className="grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </ReactLenis>
    </Router>
  );
}

export default App;