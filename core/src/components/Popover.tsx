/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// Popover.tsx
import React, { createContext, useContext, useRef, useEffect, useState, useMemo } from 'react';

type PopoverContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  styles: React.CSSProperties;
  disabled: boolean;
};

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('usePopover must be used within Popover');
  return context;
};

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  dropdownAlign?: 'left' | 'right';
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  dropdownAlign = 'left',
}) => {
  const [open, setOpen] = useState(controlledOpen ?? false);
  const triggerRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const contentRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const [styles, setStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen]);

  const handleOpenChange = (newOpen: boolean) => {
    if (disabled) return;
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
    if (controlledOpen === undefined) {
      setOpen(newOpen);
    }
  };

  const updatePosition = () => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // const spaceAbove = rect.top;

      setStyles({
        position: 'fixed',
        top: spaceBelow > 320 ? `${rect.bottom}px` : 'auto',
        bottom: spaceBelow <= 320 ? `${window.innerHeight - rect.top}px` : 'auto',
        left: dropdownAlign === 'left' ? `${rect.left}px` : '',
        right: dropdownAlign === 'right' ? `${window.innerWidth - rect.right}px` : '',
        width: `${rect.width}px`,
        maxHeight: '320px',
        zIndex: 50,
      });
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current
          && !contentRef.current.contains(event.target as Node)
          && !triggerRef.current?.contains(event.target as Node)) {
        handleOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const contextValue = useMemo(() => ({
    open,
    setOpen: handleOpenChange,
    triggerRef,
    contentRef,
    styles,
    disabled,
  }), [open, styles, triggerRef, contentRef, disabled]);

  return (
    <PopoverContext.Provider value={contextValue}>
      <div className="relative">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  children,
  className,
}) => {
  const { open, setOpen, triggerRef, disabled } = usePopover();
  return (
    <div
      ref={triggerRef}
      onClick={() => {
        if (!disabled) {
          setOpen(!open);
        }
      }}
      className={className}
      data-state={open ? 'open' : 'closed'}
      data-disabled={disabled}
    >
      {children}
    </div>
  );
};

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

export const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className }, forwardedRef) => {
    const { open, contentRef, styles, setOpen } = usePopover();

    // Merge the refs
    const mergedRef = (node: HTMLDivElement) => {
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }
      if (contentRef.current !== node) {
        if (contentRef.current !== node) {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }
    };

    if (!open) return null;

    return (
      <>
        <div
          className="fixed inset-0 z-40 overflow-hidden bg-transparent"
          style={{ height: '100vh' }}
          onClick={() => setOpen(false)}
        />
        <div
          ref={mergedRef}
          style={{
            ...styles,
            position: 'fixed',
            zIndex: 50,
          }}
          className={className}
        >
          {children}
        </div>
      </>
    );
  },
);
