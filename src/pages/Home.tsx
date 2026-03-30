import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import { PageTransition } from "../utils/PageTransition";
import { ProductCard } from "../components/ProductCard";
import { MagneticButton } from "../components/MagneticButton";
import { Preloader } from "../components/Preloader";

import { FeaturedProducts } from "../components/FeaturedProducts";
import { ShopVibe } from "../components/ShopVibe";
import { WhyUs } from "../components/WhyUs";
import { BrandStory } from "../components/BrandStory";
import { AsymmetricalGrid } from "../components/AsymmetricalGrid";
import { ReviewMarquee } from "../components/ReviewMarquee";
import { InstagramGrid } from "../components/InstagramGrid";
import { FinalCTA } from "../components/FinalCTA";

gsap.registerPlugin(ScrollTrigger);

// const FEATURED_LOOKS = [
//   { id: '1', name: 'Oversized Box Tee', price: 2499, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80' },
//   { id: '2', name: 'Structured Trousers', price: 4999, imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80' },
//   { id: '3', name: 'Minimalist Hoodie', price: 5499, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80' },
//   { id: '4', name: 'Essential Cropped Jacket', price: 6999, imageUrl: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80' },
//   { id: '5', name: 'Heavyweight Long Sleeve', price: 2999, imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80' },
// ];

const FEATURED_LOOKS = [
  {
    id: "1",
    name: "Oversized Tee",
    price: 2499,
    imageUrl:
      "./Videos/IMP Oversized TShirt.mp4",
  },
  {
    id: "2",
    name: "Baggy Jeans",
    price: 4999,
    imageUrl:
      "./Videos/IMP Baggy Jeans.mp4",
  },
  {
    id: "3",
    name: "BOXY FIT SHIRT",
    price: 5499,
    imageUrl:
      "./Videos/IMP BOXY FIT SHIRT.mp4",
  },
  {
    id: "4",
    name: "Old Money Shirts",
    price: 6999,
    imageUrl:
      "./Videos/IMP OLD MONEY.mp4",
  },
  {
    id: "5",
    name: "IMP Korean Pants",
    price: 2999,
    imageUrl:
      "./Videos/IMP KoreanPants.mp4",
  },
];

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // Hero refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll refs
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Main animation effect triggered after preloader finishes
  useEffect(() => {
    if (!preloaderComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Cinematic Split Text Reveal
      tl.fromTo(
        ".hero-char",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.05,
          ease: "power3.out",
        },
      )
        // Overall subtle scale-in of the title
        .to(
          titleRef.current,
          {
            scale: 1.03,
            duration: 4,
            ease: "power1.out",
          },
          "<",
        )

        // 2. Subtext Reveal
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.7",
        )

        // 3. CTA Button Reveal
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8",
        )

        // 4. Live Indicators Reveal
        .to(
          ".live-indicator",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        );

      // Hero Scroll Fades smoothly out
      gsap.to(heroWrapperRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Horizontal Scroll Section
      if (horizontalSectionRef.current && sliderRef.current) {
        const sliderWidth = sliderRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollAmt = sliderWidth - windowWidth + 200;

        gsap.to(sliderRef.current, {
          x: -scrollAmt,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollAmt}`,
            invalidateOnRefresh: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [preloaderComplete]);

  // Mouse Parallax Interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!titleRef.current || !heroWrapperRef.current) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;

    gsap.to(titleRef.current, {
      x,
      y,
      duration: 1,
      ease: "power2.out",
    });

    // Background parallax opposite direction
    gsap.to(".hero-canvas-container", {
      x: -x * 0.5,
      y: -y * 0.5,
      duration: 1.5,
      ease: "power2.out",
    });
  };

  const heroText = "METALICA STORE";

  return (
    <PageTransition>
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}

      <div className="w-full relative bg-brand-black" ref={containerRef}>
        {/* --- 1. Hero Section --- */}
        <section
          className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <div className="hero-canvas-container absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600&q=80"
              alt="Shop Interior"
              className="w-full h-full object-cover opacity-40 blur-xs scale-110"
            />
            <div className="absolute inset-0 bg-brand-black/40" />
          </div>

          <div
            ref={heroWrapperRef}
            className="z-10 flex flex-col items-center text-center px-4 mix-blend-difference w-full max-w-7xl relative"
          >
            {/* Main Split Text */}
            <h1
              ref={titleRef}
              className="flex justify-center flex-wrap text-[9vw] leading-none font-bold tracking-tighter uppercase mb-6 pointer-events-none origin-center"
            >
              {heroText.split("").map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block opacity-0"
                  style={{ width: char === " " ? "3vw" : "auto" }}
                >
                  {char}
                </span>
              ))}
            </h1>

            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl font-light tracking-widest text-brand-gray-300 mb-2 uppercase pointer-events-none opacity-0"
            >
              Your Everyday Streetwear Destination
            </p>

            <p className="hero-meta text-sm md:text-base font-medium tracking-[0.2em] text-brand-gray-400 mb-12 uppercase opacity-0 translate-y-4">
              📍 Nagpur, India
            </p>

            <div
              ref={ctaRef}
              className="opacity-0 flex flex-col md:flex-row gap-6 items-center"
            >
              <MagneticButton>
                <Link
                  to="/collection"
                  className="inline-block relative overflow-hidden group border border-brand-white px-10 py-5 uppercase tracking-widest text-sm text-brand-white hover:text-brand-black transition-colors duration-500 rounded-full bg-transparent"
                >
                  <span className="relative z-10 transition-colors duration-500">
                    Explore Collection
                  </span>
                  <div className="absolute inset-0 bg-brand-white transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-full" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#visit"
                  className="inline-block relative overflow-hidden group border border-brand-gray-600 px-10 py-5 uppercase tracking-widest text-sm text-brand-white hover:text-brand-black transition-colors duration-500 rounded-full bg-transparent"
                >
                  <span className="relative z-10 transition-colors duration-500">
                    Visit Store
                  </span>
                  <div className="absolute inset-0 bg-brand-gray-200 transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0 rounded-full" />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Live Shop Indicators */}
          <div className="live-indicator absolute top-32 left-8 md:top-40 md:left-12 z-20 flex items-center gap-3 px-4 py-2 bg-brand-black/30 backdrop-blur-md rounded-full border border-brand-white/10 opacity-0 translate-y-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs tracking-widest uppercase text-brand-white">
              Open Now
            </span>
          </div>

          <div className="live-indicator absolute bottom-40 right-8 md:bottom-48 md:right-12 z-20 flex items-center gap-3 px-4 py-2 bg-brand-black/30 backdrop-blur-md rounded-full border border-brand-white/10 opacity-0 translate-y-4">
            <span className="text-xs tracking-widest uppercase text-brand-white">
              50+ Styles Available
            </span>
          </div>

          <div className="live-indicator absolute top-1/2 left-8 md:left-12 z-20 flex items-center gap-3 px-4 py-2 bg-brand-black/30 backdrop-blur-md rounded-full border border-brand-white/10 opacity-0 translate-y-4">
            <span className="text-xs tracking-widest uppercase text-brand-white">
              New Arrivals Weekly
            </span>
          </div>

          <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-brand-black to-transparent pointer-events-none z-20" />
        </section>

        {/* --- 2. Featured Products --- */}
        <FeaturedProducts />

        {/* --- 3. Shop Vibe Section --- */}
        <ShopVibe />

        {/* --- 4. Brand Story Section --- */}
        <BrandStory />

        {/* --- 5. Horizontal Scroll Featured Section --- */}
        <section
          ref={horizontalSectionRef}
          className="w-full h-screen bg-brand-black flex flex-col justify-center overflow-hidden relative z-20"
        >
          <div className="absolute top-16 left-8 md:left-16 z-30">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-2">
              Featured Lookbook
            </h2>
            <Link
              to="/collection"
              className="text-sm uppercase tracking-widest text-brand-gray-400 hover:text-brand-white transition-colors border-b border-brand-gray-700 hover:border-brand-white pb-1 inline-block"
              data-cursor="link"
            >
              View Entire Set
            </Link>
          </div>

          <div
            ref={sliderRef}
            className="flex gap-12 px-8 md:px-32 w-max items-center mt-20"
          >
            {FEATURED_LOOKS.map((product, index) => (
              <div
                key={product.id}
                className={`w-[70vw] md:w-[35vw] shrink-0 ${index % 2 === 0 ? "-mt-24" : "mt-24"}`}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>

        {/* --- 6. Why Us Section --- */}
        <WhyUs />

        {/* --- 7. Asymmetrical Product Showcase --- */}
        <AsymmetricalGrid />

        {/* --- 8. Reviews / Social Proof Marquee --- */}
        <ReviewMarquee />

        {/* --- 9. Instagram Grid --- */}
        <InstagramGrid />

        {/* --- 10. Final Call to Action --- */}
        <FinalCTA />
      </div>
    </PageTransition>
  );
};
