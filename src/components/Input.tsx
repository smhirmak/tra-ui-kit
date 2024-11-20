import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { IInput } from '@/types/types';
import { Eye, EyeSlash } from '@/assets/Icons';
import Button from './Button';

// eslint-disable-next-line tailwindcss/no-custom-classname, tailwindcss/no-contradicting-classname
export const inputVariants = cva(
  `focus-visible:border-1 placeholder:text-muted-foreground flex w-full border border-tra-input bg-tra-input-fill
  px-3
  py-2 file:mr-2 file:h-fit file:cursor-pointer 
  file:rounded-md file:border-0 file:bg-tra-neutral-disabled-text file:bg-transparent
  file:p-2 
  file:text-sm file:font-medium file:text-tra-neutral-black file:transition-all hover:shadow-input-hover file:hover:contrast-125 focus-visible:border-tra-primary-focused 
  focus-visible:shadow-input-focus focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-tra-input-light disabled:text-tra-neutral-grey disabled:placeholder:text-tra-input`,
  {
    variants: {
      size: {
        default: 'h-14 text-base',
        sm: 'h-13 text-sm',
        lg: 'h-15 text-lg',
      },
      error: {
        true: 'border-error outline-none focus-visible:border-error focus-visible:shadow-none focus-visible:-outline-offset-1 focus-visible:outline-error',
        false: '',
      },
      borderRadius: {
        default: 'rounded-md',
        lg: 'rounded-5xl',
      },
    },
    defaultVariants: {
      size: 'default',
      error: false,
      borderRadius: 'default',
    },
  },
);

const Input = React.forwardRef<HTMLInputElement, IInput>(
  ({
    borderRadius,
    className = '',
    endIcon,
    error,
    size,
    startIcon,
    type,
    value,
    ...props
  }, ref) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    return (
      <div className="flex items-center">
        {startIcon && (
        <span className="absolute left-3 text-current">
          {startIcon}
        </span>
        )}
        <input
          type={passwordVisible ? 'text' : type}
          className={cn(inputVariants({ size, error, borderRadius }), className)}
          ref={ref}
          value={value}
          style={{
            paddingLeft: startIcon ? '2.5rem' : undefined,
            paddingRight: endIcon ? '2.5rem' : undefined,
          }}
        // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
        {endIcon && (
        <span className="absolute right-3 text-current">
          {endIcon}
        </span>
        )}
        {type === 'password'
              && (
                <Button className="absolute right-3 bg-transparent text-current hover:bg-transparent" size="icon" type="button" onClick={() => setPasswordVisible(prev => !prev)}>
                  {passwordVisible
                    ? <EyeSlash className=" dark:text-gray-400" />
                    : <Eye className=" dark:text-white" />}
                </Button>
              )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export default Input;
