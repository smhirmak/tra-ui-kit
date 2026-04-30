// V0 Button - Old version with different styling
import { cva } from 'class-variance-authority';
import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  `relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-md text-sm font-medium
  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        solid: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outlined: 'border-2 border-primary text-primary hover:bg-primary/10',
        ghost: 'text-primary hover:bg-primary/10',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 px-3',
        lg: 'h-12 px-6',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'default',
    },
  },
);

export interface IButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({ children, className, variant, size, type, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type ?? 'button'}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';

export default Button;
