import React from 'react';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';

export const FinalCTA = () => {
  return (
    <section className="w-full min-h-[80vh] bg-brand-black flex flex-col items-center justify-center px-4 relative overflow-hidden pt-32 pb-48">
      
      {/* Subtle depth element */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gray-900 via-brand-black to-brand-black opacity-30 pointer-events-none" />

      <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter uppercase leading-none text-brand-white mix-blend-difference mb-12 text-center">
        Step Into <br/> The World
      </h2>

      <MagneticButton>
        <Link
          to="/collection"
          className="inline-block relative overflow-hidden group border border-brand-white px-12 py-6 uppercase tracking-widest text-sm text-brand-white hover:text-brand-black transition-colors duration-500 rounded-full bg-transparent z-10"
        >
          <span className="relative z-10 font-medium transition-colors duration-500 delay-100">Visit Store / Shop Now</span>
          <div className="absolute inset-0 bg-brand-white transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-full" />
        </Link>
      </MagneticButton>

    </section>
  );
};
