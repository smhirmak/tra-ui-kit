import * as React from 'react';

import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Label from './label';

const switchBaseVariants = cva(
  'bg-disabled-light focus-visible:ring-ring focus-visible:ring-offset-background peer-checked:bg-primary-focused group inline-flex  shrink-0 select-none items-center rounded-full  border-2 border-transparent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        apple: '',
        android: '',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'cursor-pointer',
      },
      size: {
        default: 'w-12',
        sm: 'w-10',
        lg: 'w-14',
      },
    },
    compoundVariants: [
      {
        variant: 'apple',
        size: 'sm',
        className: 'h-6',
      },
      {
        variant: 'apple',
        size: 'lg',
        className: 'h-8',
      },
      {
        variant: 'apple',
        size: 'default',
        className: 'h-7',
      },
      {
        variant: 'android',
        size: 'sm',
        className: 'h-5',
      },
      {
        variant: 'android',
        size: 'lg',
        className: 'h-7',
      },
      {
        variant: 'android',
        size: 'default',
        className: 'h-6',
      },
    ],
    defaultVariants: {
      variant: 'apple',
      size: 'default',
    },
  },
);

const switchThumbVariants = cva(
  'bg-button-text pointer-events-none block translate-x-0 rounded-full transition-transform group-data-[checked=true]:translate-x-5',
  {
    variants: {
      variant: {
        apple: 'ring-0',
        android: 'ring-disabled-light group-data-[checked=true]:ring-primary ring-2',
      },
      size: {
        default: 'size-6',
        sm: 'size-5',
        lg: 'size-7',
      },
    },
    defaultVariants: {
      variant: 'apple',
      size: 'default',
    },
  },
);

interface ISwitch {
  className?: string;
  thumbClassName?: string;
  containerClassName?: string;
  id: string;
  defaultChecked?: boolean;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'apple' | 'android';
  label?: string;
  showRequiredIcon?: boolean;
  labelClassName?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: boolean) => void;
  labelSide?: 'left' | 'right';
}

const Switch = React.forwardRef<HTMLInputElement, ISwitch>(
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
      defaultChecked = false,
      onChange,
      size = 'default',
      labelSide = 'right',
      ...props
    },
    ref,
  ) => {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const resolvedChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e.target.checked);
    };

    const labelElement = label ? (
      <Label
        className={cn('select-none', labelClassName)}
        htmlFor={id}
        size={size}
        id={`${id}-label`}
        disabled={disabled}
        showRequiredIcon={showRequiredIcon}
      >
        {label}
      </Label>
    ) : null;

    return (
      <div className={cn('flex gap-2', disabled && 'select-none', containerClassName)}>
        {labelSide === 'left' && labelElement && <div className="order-0">{labelElement}</div>}
        <input
          ref={ref}
          type="checkbox"
          checked={resolvedChecked}
          onChange={handleChange}
          id={id}
          disabled={disabled}
          className="peer hidden"
          {...props}
        />
        <label
          htmlFor={id}
          data-checked={resolvedChecked}
          className={cn(switchBaseVariants({ variant, disabled, size }), className)}
        >
          <span className={cn(switchThumbVariants({ variant, size }), thumbClassName)} />
        </label>
        {labelSide === 'right' && labelElement && <div className="order-2">{labelElement}</div>}
      </div>
    );
  },
);

export default Switch;
