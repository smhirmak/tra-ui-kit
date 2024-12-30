import { cn } from '@/lib/utils';
import { IBadge } from '@/types/types';
import { cva } from 'class-variance-authority';
import React from 'react';

const badgeVariants = cva(
  'flex w-fit items-center justify-center rounded-full bg-tra-primary text-tra-neutral-white',
  {
    variants: {
      variant: {
        circular: '',
        rectangular: '',
      },
      size: {
        default: 'h-7 min-w-7 p-1.5',
        lg: 'h-10 min-w-10 p-2.5',
        sm: 'h-2.5 min-w-2.5 text-sm',
      },
      color: {
        primary: 'bg-tra-primary text-tra-neutral-white',
        secondary: 'bg-tra-secondary text-tra-neutral-white',
        tetriary: 'bg-tra-tetriary text-tra-neutral-white',
        error: 'bg-error text-tra-neutral-white',
        success: 'bg-success text-tra-neutral-white',
        warning: 'bg-warning text-tra-neutral-white',
      },
    },
    defaultVariants: {
      variant: 'circular',
      size: 'default',
      color: 'primary',
    },
  },
);

const Badge: React.FC<IBadge> = ({ className, color, icon, size, text, variant = 'circular' }) => (
  <div className={cn(badgeVariants({ variant, size, color }), className)}>
    {icon && <span className={text && 'mr-1'}>{icon}</span>}
    {text && <span>{text}</span>}
  </div>
);

export default Badge;
