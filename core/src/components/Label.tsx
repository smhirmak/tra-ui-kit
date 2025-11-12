import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Info } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import Tooltip from '@/components/Tooltip';

export const labelVariants = cva(
  `font-medium leading-none
  peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
  {
    variants: {
      variant: {
        filled: '',
        outlined: '',
        underlined: '',
        filledUnderlined: '',
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
      filledUnderlined: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface ILabel
  extends VariantProps<typeof labelVariants> {
  alwaysTop?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  htmlFor?: string;
  id?: string;
  outlineFocused?: boolean;
  showRequiredIcon?: boolean;
  size?: 'sm' | 'default' | 'lg' | undefined;
  tooltip?: string | string[] | null;
  variant?: 'filled' | 'outlined' | 'underlined' | 'filledUnderlined';
}

const Label = React.forwardRef<HTMLLabelElement, ILabel>(({
  className = '',
  children,
  disabled,
  htmlFor,
  id,
  outlineFocused,
  showRequiredIcon,
  size,
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
    <span className={cn(tooltip && 'flex items-center gap-1')}>
      <span className={`${showRequiredIcon ? 'after:text-error after:content-required after:ml-0.5' : ''} ${disabled ? 'text-input cursor-not-allowed' : ''}`}>
        {children}
      </span>
      {(tooltip) && (
        <Tooltip position="bottom" content={tooltip}>
          <Info className={cn(tooltipVariants({ size, variant }))} />
        </Tooltip>
      )}
    </span>
  </label>
));

export default Label;
