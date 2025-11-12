import { cva } from 'class-variance-authority';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import React from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';

export const inputVariants = cva(
  `focus-visible:border-1 placeholder:text-muted-foreground border-input file:bg-neutral-disabled-text file:text-neutral-black hover:shadow-soft-primary focus-visible:border-primary-focused focus-visible:shadow-hard-primary
  disabled:text-neutral-grey 
  flex w-full border bg-transparent 
  px-3 py-2 file:mr-2 file:h-fit
  file:cursor-pointer 
  file:rounded-md file:border-0 file:bg-transparent file:p-2 file:text-sm file:font-medium file:transition-all 
  file:hover:contrast-125 focus-visible:outline-none disabled:cursor-not-allowed `,
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
        className: 'border-error focus-visible:border-error focus-visible:outline-error outline-none focus-visible:shadow-none focus-visible:-outline-offset-1',
      },
      {
        error: true,
        variant: 'underlined',
        className: 'border-b-error focus-visible:border-b-error outline-none focus-visible:shadow-none focus-visible:-outline-offset-1',
      },
      {
        error: true,
        variant: 'filledUnderlined',
        className: 'border-b-error focus-visible:border-b-error outline-none focus-visible:shadow-none focus-visible:-outline-offset-1',
      },
    ],
  },
);

const Input = React.forwardRef((props, ref) => {
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
        ref={ref}
        autoComplete={autoComplete ?? 'off'}
        value={value}
        onChange={e => onChange && onChange(e)}
        style={{
          paddingLeft: startIcon ? '2.5rem' : undefined,
          paddingRight: endIcon ? '2.5rem' : undefined,
        }}
        rows={textarea ? 4 : undefined}
        {...restProps}
      />
      {endIcon && (
        <span className="absolute right-3 text-current">
          {endIcon}
        </span>
      )}
      {type === 'password'
        && (
          <Button className="z-3 absolute right-3 bg-transparent text-current hover:bg-transparent" size="icon" type="button" onClick={() => setPasswordVisible(prev => !prev)}>
            {passwordVisible
              ? <EyeSlash className="size-4 dark:text-gray-400" />
              : <Eye className="size-4 dark:text-white" />}
          </Button>
        )}
    </div>
  );
});
Input.displayName = 'Input';

export default Input;
