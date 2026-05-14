import { cva } from 'class-variance-authority';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/button';

export const inputVariants = cva(
  `flex w-full border bg-transparent px-3 py-2 border-input 
  hover:shadow-soft-primary  
  focus-visible:border-primary-focused focus-visible:shadow-hard-primary focus-visible:border focus-visible:outline-hidden
  disabled:text-neutral-grey disabled:cursor-not-allowed 
  transition-all file:mr-2 file:h-fit file:cursor-pointer
  file:rounded-md file:bg-neutral-disabled-text file:text-neutral-black file:border-0 file:bg-transparent file:p-2 file:text-sm file:font-medium file:transition-all file:hover:contrast-125`,
  {
    variants: {
      variant: {
        filled:
          'disabled:bg-input-light disabled:placeholder:text-neutral-200 dark:disabled:placeholder:text-neutral-800',
        outlined:
          'border-none outline-hidden focus-visible:border-none focus-visible:outline-hidden',
        underlined:
          'disabled:bg-input-light disabled:placeholder:text-neutral-200 dark:disabled:placeholder:text-neutral-800 border-t-0 border-x-0 focus-visible:border-t-0 focus-visible:border-x-0',
        filledUnderlined:
          'disabled:bg-input-light disabled:placeholder:text-neutral-200 dark:disabled:placeholder:text-neutral-800 border-t-0 border-x-0 focus-visible:border-t-0 focus-visible:border-x-0',
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
        true: 'h-28 w-full overflow-y-auto',
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
        className:
          'border-error focus-visible:border-error focus-visible:outline-error outline-hidden focus-visible:shadow-none focus-visible:-outline-offset-1',
      },
      {
        error: true,
        variant: 'underlined',
        className:
          'border-b-error focus-visible:border-b-error outline-hidden focus-visible:shadow-none focus-visible:-outline-offset-1',
      },
      {
        error: true,
        variant: 'filledUnderlined',
        className:
          'border-b-error focus-visible:border-b-error outline-hidden focus-visible:shadow-none focus-visible:-outline-offset-1',
      },
    ],
  },
);

interface IInput
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  autoComplete?: string;
  borderRadius?: 'default' | 'lg';
  className?: string;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  error?: boolean | null | undefined;
  size?: 'default' | 'sm' | 'lg' | undefined;
  startIcon?: React.ReactNode;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  variant?: 'filled' | 'outlined' | 'underlined' | 'filledUnderlined';
  textarea?: boolean;
  noWrapper?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, IInput>((props, ref) => {
  const {
    borderRadius,
    className = '',
    endIcon,
    error,
    size,
    startIcon,
    type = 'text',
    variant = 'filled',
    value,
    onChange,
    autoComplete,
    textarea = false,
    noWrapper = false,
    containerClassName,
    ...restProps
  } = props;
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const Comp = textarea ? 'textarea' : 'input';
  const hasIconsOrToggle = Boolean(startIcon || endIcon || type === 'password');

  const renderWithoutWrapper = noWrapper && !hasIconsOrToggle;

  if (renderWithoutWrapper) {
    return (
      <Comp
        type={passwordVisible ? 'text' : type}
        className={cn(inputVariants({ variant, size, error, borderRadius, textarea }), className)}
        ref={ref as React.Ref<HTMLInputElement & HTMLTextAreaElement>}
        autoComplete={autoComplete ?? 'off'}
        value={value}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          if (!target.disabled && onChange)
            onChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
        }}
        rows={textarea ? 4 : undefined}
        {...(restProps as React.InputHTMLAttributes<HTMLInputElement> &
          React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    );
  }

  return (
    <div className={cn('relative flex w-full items-center', containerClassName)}>
      {startIcon && <span className="absolute left-3 text-current">{startIcon}</span>}
      <Comp
        type={passwordVisible ? 'text' : type}
        className={cn(inputVariants({ variant, size, error, borderRadius, textarea }), className)}
        ref={ref as React.Ref<HTMLInputElement & HTMLTextAreaElement>}
        autoComplete={autoComplete ?? 'off'}
        value={value}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          if (!target.disabled && onChange)
            onChange(e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
        }}
        style={{
          paddingLeft: startIcon ? '2.5rem' : undefined,
          paddingRight: endIcon || type === 'password' ? '2.5rem' : undefined,
        }}
        rows={textarea ? 4 : undefined}
        {...(restProps as React.InputHTMLAttributes<HTMLInputElement> &
          React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
      {endIcon && <span className="absolute right-3 text-current">{endIcon}</span>}
      {type === 'password' && (
        <Button
          className="z-3 absolute right-3 size-6 min-h-[unset] min-w-[unset] bg-transparent text-current hover:bg-transparent"
          size="icon"
          type="button"
          onClick={() => setPasswordVisible((prev) => !prev)}
        >
          {passwordVisible ? (
            <EyeSlashIcon className="size-4 dark:text-gray-400" />
          ) : (
            <EyeIcon className="size-4 dark:text-white" />
          )}
        </Button>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export default Input;
