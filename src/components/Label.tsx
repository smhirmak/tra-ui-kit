import { cva } from 'class-variance-authority';
import * as React from 'react';

import { Info } from '@/assets/Icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ILabel } from '@/types/types';

export const labelVariants = cva(
  `font-medium leading-none
  peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
  {
    variants: {
      variant: {
        filled: '',
        outlined: '',
        underlined: '',
      },
      size: {
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
      },
      outlineFocused: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
    compoundVariants: [
      {
        outlineFocused: true,
        variant: 'outlined',
        className: 'z-20 -translate-y-7',
      },
    ],
  },
);

const tooltipVariants = cva('', {
  variants: {
    size: {
      default: 'size-[18px]',
      sm: 'size-4',
      lg: 'size-5',
    },
    variant: {
      filled: '',
      outlined: '',
      underlined: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const Label = React.forwardRef<HTMLLabelElement, ILabel>(({
  alwaysTop,
  borderRadius,
  className = '',
  children,
  disabled,
  htmlFor,
  id,
  outlineFocused,
  showRequiredIcon,
  size,
  startIcon,
  tooltip,
  variant,
  ...props
}, ref) => (
  <label
    ref={ref}
    className={cn(labelVariants({ size, variant, outlineFocused }), className)}
    htmlFor={htmlFor}
    id={id}
      // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <span className="flex items-center gap-1">
      <span className={`${showRequiredIcon ? 'after:ml-0.5 after:text-error after:content-required' : ''} ${disabled ? 'cursor-not-allowed text-tra-input' : ''}`}>
        {children}
      </span>
      {(tooltip) && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className={cn(tooltipVariants({ size, variant }))} />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {Array.isArray(tooltip) ? (
                tooltip.map((item, index) => <div key={index}>{item}</div>)
              ) : (
                <div>{tooltip}</div>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </span>
  </label>
));

export default Label;
