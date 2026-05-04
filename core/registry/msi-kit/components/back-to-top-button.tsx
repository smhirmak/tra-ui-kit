import React, { useState, useEffect } from 'react';
import { CaretUpIcon } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/button';

const buttonVariants = cva(
  `size-10 min-h-10 min-w-10 rounded-full border border-neutral-grey
  text-neutral-grey transition-opacity duration-300 group-hover:border-primary  
  group-hover:text-primary!`,
  {
    variants: {
      isVisible: {
        true: 'opacity-100',
        false: 'pointer-events-none opacity-0',
      },
    },
  },
);

interface IBackToTopButton {
  buttonClassName?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  scrollThreshold?: number;
}

const BackToTopButton: React.FC<IBackToTopButton> = ({
  buttonClassName,
  containerClassName,
  icon,
  iconClassName,
  scrollThreshold = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > scrollThreshold);
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

  const IconComponent = icon ?? <CaretUpIcon className={cn('w-6 h-6', iconClassName)} />;

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-16 right-5 z-50 group before:absolute before:animate-ping hover:before:animate-none before:duration-2000 before:rounded-full before:bg-neutral-black/20 hover:before:bg-transparent before:content-[""] before:inset-0 hover:animate-bounce',
        containerClassName,
      )}
    >
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
