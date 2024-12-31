import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { IInput } from '@/types/types';
import { Eye, EyeSlash } from '@/assets/Icons';
import React from 'react';
import Button from './Button';

// eslint-disable-next-line tailwindcss/no-custom-classname, tailwindcss/no-contradicting-classname
export const inputVariants = cva(
  `focus-visible:border-1 placeholder:text-muted-foreground flex w-full border border-input bg-transparent px-3
  py-2 
  file:mr-2 file:h-fit file:cursor-pointer file:rounded-md 
  file:border-0 file:bg-neutral-disabled-text file:bg-transparent file:p-2
  file:text-sm 
  file:font-medium file:text-neutral-black file:transition-all hover:shadow-soft-primary file:hover:contrast-125 focus-visible:border-primary-focused focus-visible:shadow-hard-primary 
  focus-visible:outline-none disabled:cursor-not-allowed disabled:text-neutral-grey `,
  {
    variants: {
      variant: {
        filled: 'disabled:bg-input-light disabled:placeholder:text-input',
        outlined: 'border-none outline-none focus-visible:border-none focus-visible:outline-none',
        underlined: 'disabled:bg-input-light disabled:placeholder:text-input',
        filledUnderlined: 'disabled:bg-input-light disabled:placeholder:text-input',
      },
      size: {
        default: 'h-14 text-base',
        sm: 'h-13 text-sm',
        lg: 'h-15 text-lg',
      },
      error: {
        true: 'focus-visible:shadow-none',
        false: '',
      },
      borderRadius: {
        default: 'rounded-md',
        lg: 'rounded-5xl',
      },
      textarea: {
        true: 'h-[calc(1.75rem*4)] w-full overflow-y-auto',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      error: false,
      borderRadius: 'default',
      variant: 'filled',
    },
    compoundVariants: [
      {
        error: true,
        variant: 'filled',
        className: 'border-error outline-none focus-visible:border-error focus-visible:shadow-none focus-visible:-outline-offset-1 focus-visible:outline-error',
      },
      {
        error: true,
        variant: 'underlined',
        className: 'border-b-error outline-none focus-visible:border-b-error focus-visible:shadow-none focus-visible:-outline-offset-1',
      },
      {
        error: true,
        variant: 'filledUnderlined',
        className: 'border-b-error outline-none focus-visible:border-b-error focus-visible:shadow-none focus-visible:-outline-offset-1',
      },
    ],
  },
);

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, IInput>(
  (props, ref) => {
    const {
      borderRadius,
      className = '',
      endIcon,
      error,
      size,
      startIcon,
      type,
      variant = 'filled',
      value,
      onChange,
      autoComplete,
      textarea = false,
      ...restProps
    } = props;
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const Comp = textarea ? 'textarea' : 'input';
    return (
      <div className="flex w-full items-center">
        {startIcon && (
        <span className="absolute left-3 text-current">
          {startIcon}
        </span>
        )}
        <Comp
          type={passwordVisible ? 'text' : type}
          className={cn(inputVariants({ variant, size, error, borderRadius, textarea }), className)}
          ref={ref as React.Ref<HTMLInputElement & HTMLTextAreaElement>}
          autoComplete={autoComplete ?? 'off'}
          value={value}
          onChange={e => onChange && onChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)}
          style={{
            paddingLeft: startIcon ? '2.5rem' : undefined,
            paddingRight: endIcon ? '2.5rem' : undefined,
          }}
          rows={textarea ? 4 : undefined}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(restProps as React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
        {endIcon && (
        <span className="absolute right-3 text-current">
          {endIcon}
        </span>
        )}
        {type === 'password'
              && (
                <Button className="absolute right-3 z-3 bg-transparent text-current hover:bg-transparent" size="icon" type="button" onClick={() => setPasswordVisible(prev => !prev)}>
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
