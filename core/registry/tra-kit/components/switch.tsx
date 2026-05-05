import * as React from 'react';

import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Label from './label';

const switchBaseVariants = cva(
  'bg-disabled-light focus-visible:ring-ring focus-visible:ring-offset-background peer-checked:bg-primary-focused group inline-flex h-7 w-12 shrink-0 select-none items-center rounded-full  border-2 border-transparent transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        apple: 'h-7',
        android: 'h-6',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'cursor-pointer',
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

interface ISwitch {
  className?: string;
  thumbClassName?: string;
  containerClassName?: string;
  id: string;
  defaultChecked?: boolean;
  variant?: 'apple' | 'android';
  label?: string;
  showRequiredIcon?: boolean;
  labelClassName?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (e: boolean) => void;
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

    return (
      <div className={cn('flex gap-2', disabled && 'select-none', containerClassName)}>
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
          className={cn(switchBaseVariants({ variant, disabled }), className)}
        >
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
    );
  },
);

export default Switch;
