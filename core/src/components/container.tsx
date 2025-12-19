import { cva, VariantProps } from 'class-variance-authority';
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const containerVariants = cva('container mx-auto w-full', {
  variants: {
    maxWidth: {
      xs: 'max-w-full',
      sm: 'max-w-(--breakpoint-sm)',
      md: 'max-w-(--breakpoint-md)',
      lg: 'max-w-(--breakpoint-lg)',
      xl: 'max-w-(--breakpoint-xl)',
      '2xl': 'max-w-(--breakpoint-2xl)',
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

interface IContainer extends VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
}

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
