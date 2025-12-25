/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { XIcon } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import Button from './button';

interface IDrawer {
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

const drawerVariants = cva('MsiDialog-container bg-neutral-white duration-350 flex flex-col px-6 py-2 shadow-lg transition-all ease-in-out', {
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
      true: 'animate-in',
      false: 'animate-out',
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
      className: 'translate-x-0 slide-in-from-left',
    },
    {
      position: 'left',
      internalIsOpen: false,
      className: '-translate-x-full slide-out-to-left',
    },
    {
      position: 'right',
      internalIsOpen: true,
      className: 'translate-x-0 slide-in-from-right',
    },
    {
      position: 'right',
      internalIsOpen: false,
      className: 'translate-x-full slide-out-to-right',
    },
    {
      position: 'top',
      internalIsOpen: true,
      className: 'translate-y-0 slide-in-from-top',
    },
    {
      position: 'top',
      internalIsOpen: false,
      className: '-translate-y-full slide-out-to-top',
    },
    {
      position: 'bottom',
      internalIsOpen: true,
      className: 'translate-y-0 slide-in-from-bottom',
    },
    {
      position: 'bottom',
      internalIsOpen: false,
      className: 'translate-y-full slide-out-to-bottom',
    },
  ],
});

const Drawer: React.FC<IDrawer> = ({
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
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
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

  if (!internalIsOpen && !alwaysOpen) {
    return null;
  }

  const content = (
    <>
      {(internalIsOpen || alwaysOpen) && mode === 'overlay' && (
        <div
          className={cn(
            'MsiDialog-backdrop fixed inset-0 bg-neutral-black/70 dark:bg-neutral-black/10 transition-opacity duration-350',
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
              className={cn('MsiDialog-closeButton bg-neutral hover:bg-neutral/80', closeButtonClassName)}
            >
              <XIcon className="size-5" />
            </Button>
          )}
        </div>
        <div className={cn('MsiDialog-body h-full overflow-y-auto', bodyClassName)}>{children}</div>
        {footer && <div className={cn('MsiDialog-footer border-t my-2 pt-2', footerClassName)}>{footer}</div>}
      </div>
    </>
  );

  return createPortal(content, document.body);
};

export default Drawer;
