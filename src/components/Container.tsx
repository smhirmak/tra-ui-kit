import { cn } from '@/lib/utils';
import { IContainer } from '@/types/types';
import { cva } from 'class-variance-authority';
import React from 'react';

export const containerVariants = cva('container mx-auto w-full', {
  variants: {
    maxWidth: {
      xs: 'max-w-full',
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    },
    disableGutters: {
      true: 'px-0',
      false: 'px-4 md:px-6',
    },
    centered: {
      true: 'flex items-center justify-center',
      false: '',
    },
  },
  defaultVariants: {
    maxWidth: 'xl',
    disableGutters: false,
    centered: false,
  },
});

const Container: React.FC<IContainer> = ({
  as = 'div',
  centered = false,
  children,
  className = '',
  disableGutters = false,
  maxWidth = 'xl',
}) => {
  const Comp = as ?? 'div';
  return (
    <Comp className={cn(containerVariants({ maxWidth, disableGutters, centered }), className)}>
      {children}
    </Comp>
  );
};

export default Container;
