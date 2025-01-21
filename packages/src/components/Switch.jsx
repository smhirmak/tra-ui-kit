import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Label from './Label';

const switchBaseVariants = cva(
  'bg-disabled-light focus-visible:ring-ring focus-visible:ring-offset-background peer-checked:bg-primary-focused group inline-flex h-7 w-12 shrink-0 cursor-pointer select-none items-center rounded-full  border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        apple: 'h-7',
        android: 'h-6',
      },
    },
    defaultVariants: {
      variant: 'apple',
    },
  },
);

const switchThumbVariants = cva(
  'bg-button-text pointer-events-none block size-6 translate-x-0 rounded-full transition-transform group-data-[checked=true]:translate-x-5',
  {
    variants: {
      variant: {
        apple: 'ring-0',
        android: 'ring-disabled-light group-data-[checked=true]:ring-primary ring-2',
      },
    },
    defaultVariants: {
      variant: 'apple',
    },
  },
);

const Switch = React.forwardRef(
  (
    {
      className = '',
      thumbClassName = '',
      containerClassName = '',
      variant = 'apple',
      id,
      label,
      labelClassName,
      showRequiredIcon = false,
      disabled = false,
      checked,
      onChange,
      ...props
    },
    ref,
  ) => (
    <div className={cn('flex gap-2', containerClassName)}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={e => onChange && onChange(e.target.checked)}
        id={id}
        disabled={disabled}
        className="peer hidden"
        {...props}
      />
      <label htmlFor={id} data-checked={checked} className={cn(switchBaseVariants({ variant }), className)}>
        <span className={cn(switchThumbVariants({ variant }), thumbClassName)} />
      </label>
      <Label
        className={cn('select-none', labelClassName)}
        htmlFor={id}
        id={`${id}-label`}
        disabled={disabled}
        showRequiredIcon={showRequiredIcon}
      >
        {label}
      </Label>
    </div>
  ),
);

export default Switch;
