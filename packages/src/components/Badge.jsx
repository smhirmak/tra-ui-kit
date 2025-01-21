import { cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'bg-primary text-neutral-white flex w-fit items-center justify-center rounded-full',
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
        primary: 'bg-primary text-neutral-white',
        secondary: 'bg-secondary text-neutral-white',
        tetriary: 'bg-tetriary text-neutral-white',
        error: 'bg-error text-neutral-white',
        success: 'bg-success text-neutral-white',
        warning: 'bg-warning text-neutral-white',
      },
    },
    defaultVariants: {
      variant: 'circular',
      size: 'default',
      color: 'primary',
    },
  },
);

const Badge = ({ className, color, icon, size, text, variant = 'circular' }) => (
  <div className={cn(badgeVariants({ variant, size, color }), className)}>
    {icon && <span className={text && 'mr-1'}>{icon}</span>}
    {text && <span>{text}</span>}
  </div>
);

export default Badge;
