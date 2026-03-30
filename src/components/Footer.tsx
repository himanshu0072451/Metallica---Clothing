import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full bg-brand-black text-brand-gray-500 py-12 px-8 border-t border-brand-gray-900 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-brand-white font-bold tracking-widest uppercase mb-4">Metalica</h3>
          <p className="text-sm leading-relaxed">Modern Everyday Wear.<br/>Based in Nagpur.</p>
        </div>
        <div>
          <h4 className="text-brand-white text-sm font-semibold uppercase tracking-widest mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/collection" className="hover:text-brand-white transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-brand-white transition-colors">T-Shirts</a></li>
            <li><a href="#" className="hover:text-brand-white transition-colors">Trousers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-brand-white text-sm font-semibold uppercase tracking-widest mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-brand-white transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-brand-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-brand-white transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-brand-white text-sm font-semibold uppercase tracking-widest mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-brand-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-gray-900 text-sm flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Metalica Clothing. All rights reserved.</p>
        <p>Nagpur, India</p>
      </div>
    </footer>
  );
};
