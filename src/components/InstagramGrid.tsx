import React, { useRef, useEffect } from "react";
import { SwitchCamera } from "lucide-react";
import gsap from "gsap";

const IG_POSTS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    link: "#",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    link: "#",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1509631179647-0c500ba14112?w=800&q=80",
    link: "#",
  },
];

export const InstagramGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ig-item", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-brand-black px-4 md:px-8 py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.3em] uppercase text-brand-gray-500 mb-2">
              Community
            </h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tighter uppercase relative group inline-block">
              <a
                href="#"
                className="flex items-center gap-4 hover:text-brand-gray-300 transition-colors"
                data-cursor="link"
              >
                @metalica.clothing
              </a>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {IG_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.link}
              className="ig-item relative block aspect-square overflow-hidden group rounded-sm"
              data-cursor="view"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <SwitchCamera
                  className="text-brand-white w-12 h-12"
                  strokeWidth={1}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
