// import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';
// import gsap from 'gsap';
// import { RevealImage } from './RevealImage';
// import { useCartStore } from '../store/useCartStore';
// import { Plus } from 'lucide-react';

// interface ProductCardProps {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl: string;
// }

// export const ProductCard = ({ id, name, price, imageUrl }: ProductCardProps) => {
//   const cardRef = useRef<HTMLAnchorElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { addToCart, toggleCart } = useCartStore();

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!containerRef.current) return;
//     const { left, top, width, height } = containerRef.current.getBoundingClientRect();
//     const x = (e.clientX - left) / width - 0.5;
//     const y = (e.clientY - top) / height - 0.5;

//     gsap.to(containerRef.current, {
//       rotateY: x * 15,
//       rotateX: -y * 15,
//       duration: 0.5,
//       ease: 'power3.out',
//       transformPerspective: 1000,
//     });
//   };

//   const handleMouseEnter = () => {
//     gsap.to(containerRef.current, {
//       y: -10,
//       scale: 1.02,
//       duration: 0.5,
//       ease: 'power3.out',
//       boxShadow: '0px 30px 40px rgba(0,0,0,0.5)',
//     });
//   };

//   const handleMouseLeave = () => {
//     gsap.to(containerRef.current, {
//       rotateY: 0,
//       rotateX: 0,
//       y: 0,
//       scale: 1,
//       duration: 0.7,
//       ease: 'power3.out',
//       boxShadow: '0px 0px 0px rgba(0,0,0,0)',
//     });
//   };

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     addToCart({ id, name, price, imageUrl });
//     toggleCart(); // Optional: open drawer when added
//   };

//   return (
//     <Link
//       to={`/product/${id}`}
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       className="block group cursor-pointer"
//       data-cursor="view"
//     >
//       <div
//         ref={containerRef}
//         className="relative aspect-3/4 overflow-hidden bg-brand-gray-900 mb-6 rounded-sm will-change-transform"
//       >
//         <RevealImage src={imageUrl} alt={name} className="w-full h-full absolute inset-0 grayscale group-hover:grayscale-0 transition-[filter] duration-700" />
//         <div className="absolute inset-0 bg-linear-to-t from-brand-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

//         {/* Quick Add To Cart Button */}
//         <button
//           onClick={handleAddToCart}
//           className="absolute bottom-4 right-4 z-20 w-10 h-10 bg-brand-white text-brand-black flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
//         >
//           <Plus size={20} strokeWidth={2} />
//         </button>
//       </div>
//       <div className="flex justify-between items-start opacity-80 group-hover:opacity-100 transition-opacity duration-300">
//         <h3 className="text-lg uppercase tracking-wider font-medium text-brand-white">
//           {name}
//         </h3>
//         <p className="text-brand-gray-300 font-light">₹{price.toLocaleString('en-IN')}</p>
//       </div>
//     </Link>
//   );
// };

//-----------------------video insted of img -----------------

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useCartStore } from "../store/useCartStore";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string; // fallback image (poster)
  // videoUrl: string; // NEW: video source
}

export const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
}: ProductCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { addToCart, toggleCart } = useCartStore();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(containerRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      duration: 0.5,
      ease: "power3.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseEnter = () => {
    // Play video on hover
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    gsap.to(containerRef.current, {
      y: -10,
      scale: 1.02,
      duration: 0.5,
      ease: "power3.out",
      boxShadow: "0px 30px 40px rgba(0,0,0,0.5)",
    });
  };

  const handleMouseLeave = () => {
    // Pause + reset video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    gsap.to(containerRef.current, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
      boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, imageUrl });
    toggleCart();
  };

  return (
    <Link
      to={`/product/${id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="block group cursor-pointer"
      data-cursor="view"
    >
      <div
        ref={containerRef}
        className="relative aspect-3/4 overflow-hidden bg-brand-gray-900 mb-6 rounded-sm will-change-transform"
      >
        {/* VIDEO */}
        <video
          ref={videoRef}
          src={imageUrl}
          poster={imageUrl}
          preload="none"
          muted
          loop
          playsInline
          className="w-full h-full absolute inset-0 object-cover transition-opacity duration-500"
        />

        {/* IMAGE FALLBACK (shows before hover) */}
        {/* <img
          src={imageUrl}
          alt={name}
          className="w-full h-full absolute inset-0 object-cover transition-opacity duration-500 group-hover:opacity-0"
        /> */}

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-brand-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 z-20 w-10 h-10 bg-brand-white text-brand-black flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105"
        >
          <Plus size={20} strokeWidth={2} />
        </button>
      </div>

      {/* TEXT */}
      <div className="flex justify-between items-start opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg uppercase tracking-wider font-medium text-brand-white">
          {name}
        </h3>
        <p className="text-brand-gray-300 font-light">
          ₹{price.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
};
