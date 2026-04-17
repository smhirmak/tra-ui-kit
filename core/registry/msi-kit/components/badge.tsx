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
        sm: 'h-5 min-w-5 text-xs',
      },
      color: {
        primary: 'bg-primary text-neutral-white',
        secondary: 'bg-secondary text-neutral-white',
        tertiary: 'bg-tertiary text-neutral-white',
        error: 'bg-error text-neutral-white',
        success: 'bg-success text-neutral-white',
        warning: 'bg-warning text-neutral-white',
      },
      text: {
        true: '',
        false: '',
      }
    },
    defaultVariants: {
      variant: 'circular',
      size: 'default',
      color: 'primary',
    },
    compoundVariants: [
      {
        color: 'primary',
        text: true,
        className: 'bg-primary/30 text-primary',
      },
      {
        color: 'secondary',
        text: true,
        className: 'bg-secondary/30 text-secondary',
      },
      {
        color: 'tertiary',
        text: true,
        className: 'bg-tertiary/30 text-tertiary',
      },
      {
        color: 'error',
        text: true,
        className: 'bg-error/30 text-error',
      },
      {
        color: 'success',
        text: true,
        className: 'bg-success/30 text-success',
      },
      {
        color: 'warning',
        text: true,
        className: 'bg-warning/30 text-warning',
      },
    ]
  },
);

interface IBadge {
  className?: string;
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning';
  icon?: React.ReactNode;
  size?: 'default' | 'sm' | 'lg';
  text?: string;
  variant?: 'circular' | 'rectangular';
  textClassName?: string;
}

const Badge: React.FC<IBadge> = ({ className, color, icon, size, text, variant = 'circular', textClassName }) => (
  <div className={cn(badgeVariants({ variant, size, color, text: !!text }), className)}>
    {icon && <span className={text && 'mr-1'}>{icon}</span>}
    {text && <span className={cn(textClassName, 'p-1 font-medium')}>{text}</span>}
  </div>
);

export default Badge;
