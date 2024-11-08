import { X } from '@/assets/Icons';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React from 'react';

const chipVariants = cva(
  `text-tra-disabled-dark  border border-tra-disabled-dark rounded-4xl select-none flex items-center w-fit transition-colors
  hover:text-tra-disabled-dark  hover:bg-tra-disabled-dark/10`,
  {
    variants: {
      size: {
        default: 'px-5 py-1.5 text-base',
        sm: 'px-4 py-1 text-sm',
        lg: 'px-6 py-1.5 text-lg',
      },
      clickable: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
      active: {
        true: 'text-tra-primary border-tra-primary hover:text-tra-primary/70 hover:border-tra-primary/70',
        false: '',
      },
      selected: {
        true: 'bg-tra-primary hover:bg-tra-primary/90 border-tra-primary text-tra-neutral-white',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      clickable: false,
      active: false,
      selected: false,
    },
  },
);

interface IChip {
  active?: boolean;
  deleteIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  id?: string;
  label?: string;
  labelClassName?: string;
  onClick?: (e: string | number | undefined | null) => void;
  onDelete?: (e: string | number | undefined | null) => void;
  selected?: boolean;
  size?: 'default' | 'sm' | 'lg';
  startIcon?: React.ReactNode;
}

const Chip = React.forwardRef<HTMLButtonElement, IChip>(
  ({
    active = false,
    deleteIcon,
    endIcon,
    id,
    label,
    labelClassName,
    onClick,
    onDelete,
    selected = false,
    size = 'default',
    startIcon,
  }, ref) => (
    <button ref={ref} id={id} className={cn(chipVariants({ size, clickable: Boolean(onClick), active, selected }))} type="button" onClick={onClick ? () => onClick(id) : () => { }}>
      {(startIcon)
        && <span className="mr-1.5">{startIcon}</span>}
      <span className={`TraChipLabel ${cn(labelClassName)}`}>{label}</span>
      {(endIcon)
        && <span className="ml-1.5">{endIcon}</span>}
      {onDelete && (
        <div
          role="button"
          tabIndex={0}
          onClick={e => { e.stopPropagation(); onDelete(id); }}
          onKeyPress={e => { if (e.key === 'Enter') { e.stopPropagation(); onDelete(id); } }}
          className="ml-1 rounded-full p-0.5 hover:bg-tra-primary/50 hover:text-tra-primary-5"
        >
          {deleteIcon ?? <X />}
        </div>
      )}
    </button>
  ),
);

export default Chip;
