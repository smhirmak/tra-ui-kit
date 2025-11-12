/* eslint-disable max-len */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { Check, Minus } from '@phosphor-icons/react';
import Label from '@/components/Label';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  `border-primary ring-offset-background focus-visible:ring-ring data-[disabled=true]:border-input data-[checked=true]:bg-primary data-[disabled=true]:bg-input data-[checked=true]:text-primary-foreground data-[checked=true]:disabled:bg-input peer flex
  shrink-0 select-none items-center justify-center rounded-sm
  border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
  data-[disabled=true]:cursor-not-allowed data-[disabled=true]:text-white data-[disabled=true]:opacity-50`,
  {
    variants: {
      variant: {
        rectangular: 'rounded-sm',
        circular: 'rounded-full',
      },
      size: {
        sm: 'size-3',
        default: 'size-4',
        lg: 'size-5',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'rectangular',
    },
  },
);

interface ICheckbox {
  className?: string;
  disabled?: boolean;
  id?: string
  label?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'rectangular' | 'circular';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  ICheckbox
>(({
  className,
  disabled,
  id,
  checked = false,
  label,
  size,
  variant,
  onChange,
  ...props
}, ref) => {
  const [checkedValue, setCheckedValue] = React.useState<boolean | undefined>(checked);
  return (
    <div className="relative flex items-center gap-2">
      <div>
        <label
          className={cn(checkboxVariants({ variant, size }), className)}
          htmlFor={id}
          data-disabled={disabled}
          data-checked={checkedValue}
        >
          {(disabled && !checkedValue)
            ? <Minus className={`${size === 'sm' ? 'size-2' : size === 'lg' ? 'size-4' : 'size-3'} ${variant === 'circular' ? 'rounded-full' : 'rounded-sm'} bg-input`} />
            : (disabled && checkedValue)
              ? (
                <Check className={`${size === 'sm' ? 'size-2' : size === 'lg' ? 'size-4' : 'size-3'} ${variant === 'circular' ? 'rounded-full' : 'rounded-sm'} bg-input`} />
              )
              : (
                <>
                  {checkedValue && (
                    <span
                      className={cn('flex items-center justify-center text-current')}
                    >
                      <Check className={`${size === 'sm' ? 'size-2' : size === 'lg' ? 'size-4' : 'size-3'} ${variant === 'circular' ? 'rounded-full' : 'rounded-sm'} bg-primary rounded-sm`} />
                    </span>
                  )}
                </>
              )}
        </label>
        <input
          ref={ref}
          type="checkbox"
          checked={checkedValue}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { if (!disabled) { setCheckedValue(e.target.checked); onChange?.(e.target.checked); } }}
          id={id}
          className="peer absolute left-0 top-0 opacity-0"
          {...props}
        />
      </div>
      {label && <Label className="select-none" htmlFor={id} id={`${id}-label`} disabled={disabled} size={size}>{label}</Label>}
    </div>
  );
});

export default Checkbox;
