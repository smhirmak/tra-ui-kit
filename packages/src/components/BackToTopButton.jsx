import React, { useState, useEffect } from 'react';
import { CaretUp } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Button from './Button';

const buttonVariants = cva(
  `size-8 min-h-8 min-w-8 rounded-full border border-white/80
  text-white/80 transition-opacity duration-300 group-hover:border-white  
  group-hover:text-white`,
  {
    variants: {
      isVisible: {
        true: 'opacity-100',
        false: 'pointer-events-none opacity-0',
      },
    },
  },
);

const BackToTopButton = ({ buttonClassName, containerClassName, icon, iconClassName }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 500);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const IconComponent = icon ?? <CaretUp className={cn('w-6 h-6', iconClassName)} />;

  return (
    <div className={cn('fixed bottom-16 right-5 z-50 group hover:animate-bounce', containerClassName)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={cn(buttonVariants({ isVisible }), buttonClassName)}
      >
        {IconComponent}
      </Button>
    </div>
  );
};

export default BackToTopButton;
