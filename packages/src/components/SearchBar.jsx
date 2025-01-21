import { MagnifyingGlass } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import React from 'react';
import TextField from '@/components/TextField';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
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

const SearchBar = ({
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
  const { t } = useLocalizeContext();
  return (
    <TextField
      variant={variant}
      label={label ?? t('Search')}
      labelClassName="-top-[2px] "
      size={size}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type={type}
      placeholder={t(placeholder)}
      startIcon={<MagnifyingGlass className={cn(iconVariants({ size, disabled }), iconClassName)} />}
      borderRadius={borderRadius}
      alwaysTop
      {...otherProps}
    />
  );
};

export default SearchBar;
