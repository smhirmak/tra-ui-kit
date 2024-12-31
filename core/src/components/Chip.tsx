import { X } from '@/assets/Icons';
import { cn } from '@/lib/utils';
import { IChip } from '@/types/types';
import { cva } from 'class-variance-authority';
import React from 'react';

const chipVariants = cva(
  `flex  w-fit select-none items-center rounded-4xl border border-disabled-dark text-disabled-dark transition-colors
  hover:bg-disabled-dark/10  hover:text-disabled-dark`,
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
        true: 'border-primary text-primary hover:border-primary/70 hover:text-primary/70',
        false: '',
      },
      selected: {
        true: 'border-primary bg-primary text-neutral-white hover:bg-primary/90',
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
          className="ml-1 rounded-full p-0.5 hover:bg-primary/50 hover:text-primary-5"
        >
          {deleteIcon ?? <X />}
        </div>
      )}
    </button>
  ),
);

export default Chip;
