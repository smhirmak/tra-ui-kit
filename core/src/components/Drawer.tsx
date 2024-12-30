/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { X } from '@/assets/Icons';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: 'left' | 'right' | 'top' | 'bottom';
  mode?: 'overlay';
  alwaysOpen?: boolean;
  containerClassName?: string;
  backdropClassName?: string;
  closeButtonClassName?: string;
  title?: string | React.ReactNode;
  titleClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: string | React.ReactNode;
  footerClassName?: string;
}

const drawerVariants = cva('MsiDialog-container flex flex-col bg-tra-neutral-white px-6 py-2 shadow-lg transition-all duration-350 ease-in-out', {
  variants: {
    mode: {
      overlay: 'fixed z-50',
    },
    position: {
      left: 'inset-y-0 left-0 h-full w-fit',
      right: 'inset-y-0 right-0 h-full w-fit',
      top: 'inset-x-0 top-0 h-auto max-h-full w-full rounded-b-2xl md:rounded-b-none',
      bottom: 'inset-x-0 bottom-0 h-auto max-h-full w-full rounded-t-2xl md:rounded-t-none',
    },
    internalIsOpen: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    mode: 'overlay',
    position: 'left',
  },
  compoundVariants: [
    {
      position: 'left',
      internalIsOpen: true,
      className: 'translate-x-0',
    },
    {
      position: 'left',
      internalIsOpen: false,
      className: '-translate-x-full',
    },
    {
      position: 'right',
      internalIsOpen: true,
      className: 'translate-x-0',
    },
    {
      position: 'right',
      internalIsOpen: false,
      className: 'translate-x-full',
    },
    {
      position: 'top',
      internalIsOpen: true,
      className: 'translate-y-0',
    },
    {
      position: 'top',
      internalIsOpen: false,
      className: '-translate-y-full',
    },
    {
      position: 'bottom',
      internalIsOpen: true,
      className: 'translate-y-0',
    },
    {
      position: 'bottom',
      internalIsOpen: false,
      className: 'translate-y-full',
    },
  ],
});

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'left',
  mode = 'overlay',
  alwaysOpen = false,
  title,
  containerClassName = '',
  backdropClassName = '',
  closeButtonClassName = '',
  titleClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  footerClassName = '',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Disable scrolling when drawer is open
  useEffect(() => {
    setInternalIsOpen(isOpen);

    if (isOpen && !alwaysOpen) {
      const { scrollY } = window;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }, [isOpen, alwaysOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && !alwaysOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, alwaysOpen]);

  return (
    <>
      {(internalIsOpen || alwaysOpen) && mode === 'overlay' && (
        <div
          className={cn(
            'MsiDialog-backdrop fixed inset-0 bg-tra-neutral-black/70 dark:bg-tra-neutral-black/10 transition-opacity duration-350',
            { [internalIsOpen ? 'opacity-100' : 'opacity-0']: true },
            backdropClassName,
          )}
          onClick={!alwaysOpen ? onClose : undefined}
        />
      )}
      <div
        ref={drawerRef}
        className={cn(drawerVariants({ mode, position, internalIsOpen }), containerClassName)}
      >
        <div className={cn('MsiDialog-header my-2 flex items-center justify-between gap-2 border-b pb-2', { [position === 'right' ? 'flex-row-reverse' : 'flex-row']: true }, headerClassName)}>
          <p className={cn('MsiDialog-headerTitle text-2xl font-semibold', titleClassName)}>{title}</p>
          {!alwaysOpen && (
          <Button
            size="icon"
            variant="ghost"
            rounded="lg"
            onClick={onClose}
            className={cn('MsiDialog-closeButton bg-tra-neutral hover:bg-tra-neutral/80', closeButtonClassName)}
          >
            <X />
          </Button>
          )}
        </div>
        <div className={cn('MsiDialog-body h-full overflow-y-auto', bodyClassName)}>{children}</div>
        {footer && <div className={cn('MsiDialog-footer border-t my-2 pt-2', footerClassName)}>{footer}</div>}
      </div>
    </>
  );
};

export default Drawer;
