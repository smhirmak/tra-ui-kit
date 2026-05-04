import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import React from 'react';
import type { ITextField } from '@/components/ui/text-field';
import TextField from '@/components/ui/text-field';
import { cn } from '@/lib/utils';

const iconVariants = cva('', {
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
});

type ISearchField = {
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
} & Omit<ITextField, 'children'>;

const SearchField: React.FC<ISearchField> = ({
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
}) => (
  <TextField
    variant={variant}
    label={label ?? 'Search'}
    size={size}
    value={value}
    onChange={onChange}
    disabled={disabled}
    type={type}
    placeholder={placeholder}
    startIcon={
      <MagnifyingGlassIcon className={cn(iconVariants({ size, disabled }), iconClassName)} />
    }
    borderRadius={borderRadius}
    alwaysTop
    {...otherProps}
  />
);

export default SearchField;
