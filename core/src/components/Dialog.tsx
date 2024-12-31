/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import { X } from '@/assets/Icons';
import { IDialog } from '@/types/types';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import Button from './Button';

const dialogContainerVariants = cva('MsiDialog-container items fixed inset-0 z-50 flex justify-center overflow-y-auto bg-neutral-black/50', {
  variants: {
    position: {
      center: 'items-center',
      top: 'items-start',
      bottom: 'items-end',
      onlyMobileBottom: 'items-end md:items-center',
    },
  },
});

const dialogContentVariants = cva('MsiDialog-content relative rounded-lg bg-background p-10 shadow-xl transition-all duration-300 ease-in-out', {
  variants: {
    fullScreen: {
      true: 'h-screen !max-h-screen w-screen',
      false: '',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    open: {
      true: 'scale-100 opacity-100',
      false: 'pointer-events-none scale-95 opacity-0',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
      xl: '',
      '2xl': '',
    },
    scroll: {
      true: 'max-h-[90vh] overflow-y-auto',
      false: '',
    },
  },
  defaultVariants: {
    fullScreen: false,
    fullWidth: false,
    open: true,
    size: 'default',
    scroll: false,
  },
  compoundVariants: [
    {
      fullScreen: false,
      size: 'sm',
      className: 'max-w-screen-sm',
    },
    {
      fullScreen: false,
      size: 'default',
      className: 'max-w-screen-md',
    },
    {
      fullScreen: false,
      size: 'lg',
      className: 'max-w-screen-lg',
    },
    {
      fullScreen: false,
      size: 'xl',
      className: 'max-w-screen-xl',
    },
    {
      fullScreen: false,
      size: '2xl',
      className: 'max-w-screen-2xl',
    },
  ],
});

const Dialog: React.FC<IDialog> = ({
  children,
  open,
  onClose,
  size = 'default',
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  fullScreen = false,
  fullWidth = false,
  scroll = true,
  position = 'center',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !disableEscapeKeyDown) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose, disableEscapeKeyDown]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node) && !disableBackdropClick) {
      onClose();
    }
  };
  return (
    <div
      className={cn(dialogContainerVariants({ position }))}
      aria-labelledby="dialog-title"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className={cn(dialogContentVariants({ fullScreen, fullWidth, open, size, scroll }))}
        style={{ minWidth: '300px' }}
      >
        <div className="absolute right-2 top-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onClose}
          >
            <span className="sr-only">Kapat</span>
            <X className="size-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
