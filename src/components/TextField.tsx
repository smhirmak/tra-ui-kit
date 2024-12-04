import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, { useRef, useState } from 'react';
import { ITextField } from '@/types/types';
import Input from './Input';
import Label from './Label';

const textFieldStyles = cva('mb-2 mt-4 flex h-fit flex-col', {
  variants: {
    variant: {
      filled: 'relative',
      outlined: 'relative',
      underlined: 'relative',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

const labelStyles = cva('mb-1 transition-all duration-150 ease-cubic', {
  variants: {
    variant: {
      filled: 'absolute -top-1/2',
      outlined: 'absolute left-[18px] top-1/4 z-20 text-lg text-tra-neutral-light-black',
      underlined: 'absolute left-0 top-1/2 -translate-y-1/2 transform',
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
      outlineFocused: true,
      variant: 'underlined',
      className: 'left-0 top-0 -translate-y-1/2 ',
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

const inputStyles = cva('p-2 transition-colors', {
  variants: {
    variant: {
      filled: '',
      outlined: 'z-2 border-none',
      underlined: 'rounded-none border-x-0 border-t-0 bg-transparent hover:bg-transparent hover:shadow-none focus-visible:shadow-none disabled:bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

const fieldsetStyles = cva(
  `pointer-events-none absolute inset-0 z-10 m-0 h-14 min-w-0 overflow-hidden rounded border border-solid border-tra-input p-3 outline-none transition-all 
  disabled:border-tra-input-light disabled:bg-tra-input-light disabled:placeholder:text-tra-input`,
  {
    variants: {
      inputFocused: {
        true: 'border-tra-primary-focused',
        false: '',
      },
      error: {
        true: 'border-error focus-visible:shadow-none focus-visible:-outline-offset-1 focus-visible:outline-error',
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

const TextField = React.forwardRef<HTMLInputElement, ITextField>(({
  alwaysTop,
  borderRadius,
  disabled = false,
  endIcon,
  error,
  id,
  name,
  inputClassName,
  label,
  labelClassName = '',
  onChange,
  onWheel,
  placeholder,
  showRequiredIcon,
  size = 'default',
  startIcon,
  tooltip = null,
  type,
  value,
  variant = 'filled',
  ...otherProps
}, ref) => {
  const { t } = useLocalizeContext();
  const [inputFocused, setInputFocused] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div ref={ref} className={cn(textFieldStyles({ variant }))}>
      <Label
        ref={labelRef}
        className={` 
          ${cn(labelStyles({ variant, borderRadius, isHaveStartIcon: Boolean(startIcon), outlineFocused: inputFocused || !!value || Boolean(inputRef?.current?.value) }))}
          ${labelClassName}`}
        variant={variant}
        outlineFocused={inputFocused || !!value || Boolean(inputRef?.current?.value)}
        htmlFor={id}
        id={`${id}-label`}
        size={size}
        tooltip={tooltip}
        startIcon={startIcon}
        alwaysTop={alwaysTop}
        disabled={disabled}
        borderRadius={borderRadius}
        showRequiredIcon={showRequiredIcon}
      >
        {label}
      </Label>
      <Input
        id={id}
        ref={inputRef}
        variant={variant}
        className={`${cn(inputStyles({ variant }))} ${inputClassName}`}
        size={size}
        name={name}
        error={error}
        value={value}
        onWheel={onWheel}
        onChange={onChange}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        disabled={disabled}
        type={type}
        placeholder={variant !== 'outlined' ? t(placeholder) : ''}
        endIcon={endIcon}
        startIcon={startIcon}
        borderRadius={borderRadius}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
      {variant === 'outlined' && (
        <fieldset disabled={disabled} className={cn(fieldsetStyles({ inputFocused, error, borderRadius, size }))}>
          <legend className={`float-[unset] invisible block h-0 w-fit overflow-hidden p-0 text-base ${(inputFocused || !!value || Boolean(inputRef?.current?.value)) && 'px-2'}`}>
            {(inputFocused || !!value || Boolean(inputRef?.current?.value)) ? (
              <span>
                <span className={`${showRequiredIcon ? 'after:ml-0.5 after:text-error after:content-required' : ''}`}>{label}</span>
                {(tooltip) && (
                <span className="inline-block size-5" />
                )}
              </span>
            ) : ''}
          </legend>
        </fieldset>
      )}
    </div>
  );
});

export default TextField;
