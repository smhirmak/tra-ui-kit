/* eslint-disable react/jsx-no-useless-fragment */
import { cva } from 'class-variance-authority';
import React, { useEffect, useRef } from 'react';

import LoadingSpinner from '@/components/ui/loading-spinner';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { cn } from '@/lib/utils';
import { IButton } from '@/types/types';

export const buttonVariants = cva(
  `btn-ripple ring-offset-background focus-visible:ring-ring relative inline-flex select-none flex-wrap items-center justify-center overflow-hidden whitespace-nowrap text-sm font-medium
  transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
  disabled:pointer-events-none `,
  {
    variants: {
      variant: {
        solid: 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-button-disabled disabled:text-button-disabled-text',
        outlined: 'border-primary text-primary-foreground hover:bg-primary/10 disabled:border-button-disabled-text disabled:text-button-disabled-text border-2 bg-transparent',
        ghost: 'text-primary hover:text-primary/90 disabled:text-button-disabled-text bg-transparent',
      },
      color: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        tetriary: 'bg-tetriary text-tetriary-foreground',
        error: 'bg-error text-error-foreground',
      },
      size: {
        default: 'h-14 px-7',
        sm: 'h-13 rounded-lg px-6',
        lg: 'h-15 rounded-lg px-8',
        icon: 'size-10 min-h-10 min-w-10 rounded-full',
      },
      rounded: {
        default: 'rounded-lg',
        lg: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        variant: 'outlined',
        color: 'primary',
        className: 'border-primary text-primary hover:bg-primary/10 bg-transparent',
      },
      {
        variant: 'outlined',
        color: 'secondary',
        className: 'border-secondary text-secondary hover:bg-secondary/10 bg-transparent',
      },
      {
        variant: 'outlined',
        color: 'tetriary',
        className: 'border-tetriary text-tetriary hover:bg-tetriary/10 bg-transparent',
      },
      {
        variant: 'outlined',
        color: 'error',
        className: 'border-error text-error hover:bg-error/10 hover:text-error/80 bg-transparent',
      },
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      },
      {
        variant: 'solid',
        color: 'tetriary',
        className: 'bg-tetriary text-tetriary-foreground hover:bg-tetriary/90',
      },
      {
        variant: 'solid',
        color: 'error',
        className: 'bg-error text-error-foreground hover:bg-error/80',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-primary hover:text-primary/80 bg-transparent',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        className: 'text-secondary hover:text-secondary/80 bg-transparent',
      },
      {
        variant: 'ghost',
        color: 'tetriary',
        className: 'text-tetriary hover:text-tetriary/80 bg-transparent',
      },
      {
        variant: 'ghost',
        color: 'error',
        className: 'text-error hover:text-error/80 bg-transparent',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'default',
      color: 'primary',
      rounded: 'default',
    },
  },
);

const spinnerVariants = cva(
  'border-t-button-disabled text-button-disabled-text mr-2 border-2',
  {
    variants: {
      size: {
        default: 'size-4 max-h-4 min-h-4 min-w-4 max-w-4',
        sm: 'size-3 max-h-3 min-h-3 min-w-3 max-w-3',
        lg: 'size-5 max-h-5 min-h-5 min-w-5 max-w-5',
        icon: 'size-3 max-h-3 min-h-3 min-w-3 max-w-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({
    asChild,
    children,
    className,
    color,
    disableEffect = false,
    disabled,
    effectColor = '#212129',
    effectOpacity = '0.3',
    loading = false,
    loadingSpinnerClassname,
    loadingText,
    rounded = 'default',
    size,
    variant,
    type,
    ...props
  }, ref) => {
    const Comp = asChild ?? 'button';
    const { t } = useLocalizeContext();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const btn = buttonRef.current;
      const handleClick = (event: MouseEvent) => {
        const { pageX, pageY, currentTarget } = event;
        if (currentTarget instanceof HTMLElement) {
          const x = ((pageX - currentTarget.offsetLeft) * 100) / currentTarget.offsetWidth;
          const y = ((pageY - currentTarget.offsetTop) * 100) / currentTarget.offsetHeight;
          const ripple = document.createElement('span');
          const uniqueClassName = `ripple-effect-${Math.random().toString(36).substr(2, 9)}`;
          ripple.classList.add('ripple-effect', uniqueClassName);
          ripple.style.left = `${x}%`;
          ripple.style.top = `${y}%`;

          const style = document.createElement('style');
          style.innerHTML = `
          .${uniqueClassName} {
            position: absolute;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            width: 5px;
            background-color: ${effectColor};
            height: 5px;
            pointer-events: none;
            z-index: 5;
            animation: ripple 0.8s linear infinite;
          }
          @keyframes ripple {
            0% {
              width: 0;
              height: 0;
              opacity: ${effectOpacity};
            }
            100% {
              width: 500px;
              height: 500px;
              opacity: 0;
            }
          }
        `;
          document.head.appendChild(style);

          btn!.appendChild(ripple);
          setTimeout(() => {
            ripple.remove();
            style.remove();
          }, 800);
        }
      };

      if (btn && !disableEffect) {
        btn.addEventListener('click', handleClick);
      }

      return () => {
        if (btn) {
          btn.removeEventListener('click', handleClick);
        }
      };
    }, [effectColor, effectOpacity, disableEffect]);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className, rounded }))}
        ref={ref || buttonRef}
        disabled={loading || disabled}
        type={type ?? 'button'}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {loading && (
          <LoadingSpinner className={cn(spinnerVariants({ size }), loadingSpinnerClassname)} />
        )}
        {/* eslint-disable-next-line no-nested-ternary */}
        <>{(loading && size !== 'icon') ? (loadingText ?? t('Sending...')) : (loading && size === 'icon') ? null : children}</>
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export default Button;
