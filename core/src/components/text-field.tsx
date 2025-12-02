/* eslint-disable @typescript-eslint/array-type */
import { cva } from 'class-variance-authority';
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Input from '@/components/input';
import Label from '@/components/label';

const textFieldStyles = cva('TextField-container flex h-fit flex-col gap-1', {
  variants: {
    variant: {
      filled: 'relative',
      outlined: 'relative',
      underlined: 'relative',
      filledUnderlined: 'relative',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

const labelStyles = cva('ease-cubic transition-all duration-150', {
  variants: {
    variant: {
      filled: '',
      outlined: 'z-1 text-neutral-light-black absolute left-[18px] top-1/4 text-lg',
      underlined: 'absolute left-0 top-1/2 -translate-y-1/2 transform text-lg',
      filledUnderlined: 'absolute left-0 top-1/2 -translate-y-1/2 transform pl-5 text-lg',
    },
    borderRadius: {
      default: '',
      lg: '',
    },
    isHaveStartIcon: {
      true: '',
      false: '',
    },
    outlineFocused: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'filled',
    borderRadius: 'default',
  },
  compoundVariants: [
    {
      isHaveStartIcon: true,
      outlineFocused: false,
      variant: 'outlined',
      className: 'left-8',
    },
    {
      isHaveStartIcon: true,
      outlineFocused: true,
      variant: 'outlined',
      className: 'left-4',
    },
    {
      isHaveStartIcon: true,
      variant: 'filledUnderlined',
      className: 'left-8',
    },
    {
      isHaveStartIcon: true,
      variant: 'filledUnderlined',
      className: 'left-4',
    },
    {
      outlineFocused: true,
      variant: 'underlined',
      className: 'left-0 top-0 -translate-y-1/2 text-base',
    },
    {
      outlineFocused: true,
      variant: 'filledUnderlined',
      className: 'left-0 top-0 -translate-y-[20%] text-base',
    },
    {
      variant: 'outlined',
      borderRadius: 'lg',
      className: 'left-6',
    },
    {
      variant: 'filled',
      borderRadius: 'lg',
      className: 'left-6',
    },
  ],
});

const inputStyles = cva('disabled:bg-input-light p-2 pl-5 disabled:shadow-none', {
  variants: {
    variant: {
      filled: '',
      outlined: 'border-none',
      underlined: 'rounded-none border-x-0 border-t-0 bg-transparent hover:bg-transparent hover:shadow-none focus-visible:shadow-none disabled:bg-transparent',
      filledUnderlined: 'bg-input-fill hover:bg-input-fill rounded-none border-x-0 border-t-0 hover:shadow-none focus-visible:shadow-none disabled:bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

const fieldsetStyles = cva(
  `border-input disabled:border-input-light disabled:placeholder:text-input pointer-events-none absolute inset-0 m-0 h-14 min-w-0 overflow-hidden rounded border border-solid p-3 
  outline-none transition-all`,
  {
    variants: {
      inputFocused: {
        true: 'border-primary-focused',
        false: '',
      },
      error: {
        true: 'border-error focus-visible:outline-error focus-visible:shadow-none focus-visible:-outline-offset-1',
        false: '',
      },
      borderRadius: {
        default: 'rounded-md',
        lg: 'rounded-5xl',
      },
      size: {
        default: 'h-14',
        sm: 'h-13',
        lg: 'h-15',
      },
    },
  },
);

export interface ITextField {
  alwaysTop?: boolean;
  autoComplete?: string;
  borderRadius?: 'default' | 'lg';
  disabled?: boolean;
  endIcon?: React.ReactNode;
  error?: boolean;
  name?: string;
  id?: string;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showRequiredIcon?: boolean;
  size?: 'default' | 'sm' | 'lg';
  startIcon?: React.ReactNode;
  tooltip?: string | Array<string>;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value?: string | number;
  variant?: 'filled' | 'outlined' | 'underlined' | 'filledUnderlined';
  maxLength?: number;
  helperText?: string;
  textarea?: boolean;
  className?: string;
  fieldClassName?: string;
}

const TextField = React.forwardRef<HTMLInputElement, ITextField>(({
  borderRadius,
  disabled = false,
  endIcon,
  error,
  id,
  name,
  inputClassName = '',
  className = '',
  label,
  labelClassName = '',
  onChange,
  onBlur,
  onWheel,
  placeholder,
  showRequiredIcon,
  size = 'default',
  startIcon,
  tooltip = null,
  type,
  value,
  autoComplete,
  variant = 'filled',
  maxLength,
  helperText,
  textarea,
  fieldClassName,
  ...otherProps
}, ref) => {
  const [inputFocused, setInputFocused] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log({ size })

  return (
    <div ref={ref} className={cn(textFieldStyles({ variant }), className)}>
      <Label
        ref={labelRef}
        className={` 
          ${cn(labelStyles({ variant, borderRadius, isHaveStartIcon: Boolean(startIcon), outlineFocused: inputFocused || !!value || Boolean(inputRef.current?.value) }))}
          ${labelClassName}`}
        variant={variant}
        outlineFocused={inputFocused || !!value || Boolean(inputRef.current?.value)}
        htmlFor={id}
        id={`${id}-label`}
        size={size}
        tooltip={tooltip}
        disabled={disabled}
        showRequiredIcon={showRequiredIcon}
      >
        {label}
      </Label>
      <Input
        id={id}
        ref={inputRef}
        variant={variant}
        className={`${cn(inputStyles({ variant }))} ${inputClassName}`}
        autoComplete={autoComplete}
        size={size}
        name={name}
        error={error}
        value={value}
        onWheel={onWheel}
        onChange={onChange}
        onFocus={() => setInputFocused(true)}
        onBlur={(e) => { setInputFocused(false); onBlur && onBlur(e) }}
        disabled={disabled}
        type={type}
        placeholder={variant !== 'outlined' ? placeholder : ''}
        endIcon={endIcon}
        startIcon={startIcon}
        borderRadius={borderRadius}
        maxLength={maxLength}
        textarea={textarea}
        {...otherProps}
      />
      {variant === 'outlined' && (
        <fieldset disabled={disabled} className={cn(fieldsetStyles({ inputFocused, error, borderRadius, size }), fieldClassName)}>
          <legend className={`float-[unset] invisible block h-0 w-fit overflow-hidden p-0 text-base ${(inputFocused || !!value || Boolean(inputRef.current?.value)) && 'px-2'}`}>
            {(inputFocused || !!value || Boolean(inputRef.current?.value)) ? (
              <span>
                <span className={`${showRequiredIcon ? 'after:text-error after:content-required after:ml-0.5' : ''}`}>{label}</span>
                {(tooltip) && (
                  <span className="inline-block size-5" />
                )}
              </span>
            ) : ''}
          </legend>
        </fieldset>
      )}
      {helperText && <p className="text-neutral-light-black self-end text-sm">{helperText}</p>}
    </div>
  );
});

export default TextField;
