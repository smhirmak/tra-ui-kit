import { MagnifyingGlass } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import React from 'react';
import TextField from '@/components/text-field';
import { cn } from '@/lib/utils';

const iconVariants = cva(
  '',
  {
    variants: {
      size: {
        default: 'size-5',
        sm: 'size-4',
        lg: 'size-6',
      },
      disabled: {
        true: 'text-input',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      disabled: false,
    },
  },
);

interface ISearchBar {
  borderRadius?: 'default' | 'lg';
  disabled?: boolean;
  iconClassName?: string;
  label?: string;
  placeholder?: string;
  size?: 'default' | 'sm' | 'lg';
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  value: string | number;
  variant?: 'filled' | 'outlined' | 'underlined';
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SearchBar: React.FC<
  ISearchBar> = ({
    borderRadius,
    disabled,
    iconClassName,
    label,
    onChange,
    placeholder = 'Search',
    size = 'default',
    type = 'text',
    value,
    variant = 'filled',
    ...otherProps
  }) => {
    return (
      <TextField
        variant={variant}
        label={label ?? 'Search'}
        labelClassName="-top-[2px] "
        size={size}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        startIcon={<MagnifyingGlass className={cn(iconVariants({ size, disabled }), iconClassName)} />}
        borderRadius={borderRadius}
        alwaysTop
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
    );
  };

export default SearchBar;
