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
        variant: 'filled',
        outlineFocused: true,
        className: 'text-tra-primary',
      },
    ],
  },
);

const outlineLabelVariants = cva('relative z-1 pl-1', {
  variants: {
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
    },
    outlineFocused: {
      true: '',
      false: '',
    },
    alwaysTop: {
      true: '',
      false: '',
    },
    showRequiredIcon: {
      true: 'after:ml-0.5 after:text-error after:content-required',
      false: '',
    },
  },
  compoundVariants: [
    {
      size: 'default',
      outlineFocused: true,
      alwaysTop: false,
      className: 'text-sm',
    },
    {
      size: 'sm',
      outlineFocused: true,
      alwaysTop: false,
      className: 'text-xs',
    },
    {
      size: 'lg',
      outlineFocused: true,
      alwaysTop: false,
      className: 'text-base',
    },
  ],
  defaultVariants: {
    size: 'default',
    outlineFocused: false,
    showRequiredIcon: false,
  },
});

const outlineLabelBoxVariants = cva('absolute h-2 bg-tra-input-fill', {
  variants: {
    size: {
      default: 'top-[14px]',
      sm: 'top-[11.5px]',
      lg: 'top-[15.5px]',
    },
    disabled: {
      true: 'bg-tra-input-light',
      false: '',
    },
    borderRadius: {
      default: '',
      lg: 'left-0.5',
    },
  },
  defaultVariants: {
    size: 'default',
    disabled: false,
    borderRadius: 'default',
  },
});

const tooltipVariants = cva('', {
  variants: {
    size: {
      default: 'size-[18px]',
      sm: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const outlineTooltipVariants = cva('absolute z-50', {
  variants: {
    size: {
      default: 'top-0.5 ml-0.5',
      sm: 'top-px ml-0.5',
      lg: 'top-1 ml-1',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const Label = React.forwardRef<HTMLLabelElement, ILabel>(({
  alwaysTop,
  borderRadius,
  className,
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
  <div className="flex items-center gap-1">
    <label
      ref={ref}
      className={cn(labelVariants({ size, variant, outlineFocused }), className)}
      htmlFor={htmlFor}
      id={id}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {variant === 'outlined' ? (
        <div className={`relative ${disabled && 'cursor-not-allowed text-tra-neutral-grey'} ${(startIcon && !outlineFocused && !alwaysTop) && 'pl-7'}`}>
          <span className={cn(outlineLabelVariants({ size, outlineFocused, alwaysTop, showRequiredIcon }))}>{children}</span>
          <div
            style={{ width: tooltip ? `${ref && 'current' in ref ? +(ref.current?.offsetWidth ?? 0) + 25 : 0}px` : `${ref && 'current' in ref ? +(ref.current?.offsetWidth ?? 0) + 6 : 0}px` }}
            className={cn(outlineLabelBoxVariants({ size, disabled, borderRadius }))}
          />
          {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className={cn(outlineTooltipVariants({ size }))}>
                <Info className="" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          )}
        </div>
      ) : (
        <span className={`${showRequiredIcon ? 'after:ml-0.5 after:text-error after:content-required' : ''} ${disabled ? 'cursor-not-allowed text-tra-input' : ''}`}>{children}</span>
      )}

    </label>
    {(tooltip && variant !== 'outlined') && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info className={cn(tooltipVariants({ size }))} />
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
  </div>
));

export default Label;
