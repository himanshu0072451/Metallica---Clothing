import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const MagneticButton = ({ children, className, onClick, href, type = 'button' }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | any>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3; // Magnetic pull strength
    const y = (clientY - (top + height / 2)) * 0.3;

    gsap.to(buttonRef.current, {
      x,
      y,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const elProps = {
    ref: buttonRef,
    className: className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    "data-cursor": "link"
  };

  if (href) {
    return (
      <a href={href} {...elProps} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} {...elProps}>
      {children}
    </button>
  );
};
