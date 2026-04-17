import React, { createContext, useContext, useRef, useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { cn, preventScrollShift } from '@/lib/utils';

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

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  dropdownAlign?: 'left' | 'right';
  forceTriggerWidth?: boolean;
  maxHeight?: number | string;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  dropdownAlign = 'left',
  forceTriggerWidth = false,
  maxHeight = 320,
}) => {
  const [open, setOpen] = useState(controlledOpen ?? false);
  const triggerRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const contentRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const [styles, setStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (open) {
      preventScrollShift.lock();
    } else {
      preventScrollShift.unlock();
    }
    return () => {
      preventScrollShift.unlock();
    };
  }, [open]);

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

      const maxHeightPx = typeof maxHeight === 'number' ? maxHeight : parseInt(maxHeight as string, 10) || 320;
      setStyles({
        position: 'fixed',
        top: spaceBelow > maxHeightPx ? `${rect.bottom}px` : 'auto',
        bottom: spaceBelow <= maxHeightPx ? `${window.innerHeight - rect.top}px` : 'auto',
        left: dropdownAlign === 'left' ? `${rect.left}px` : '',
        right: dropdownAlign === 'right' ? `${window.innerWidth - rect.right}px` : '',
        width: forceTriggerWidth ? `${rect.width}px` : `fit-content`,
        maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
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

Popover.displayName = 'Popover';

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLElement | null, PopoverTriggerProps>(
  ({ children, className, asChild = false }, forwardedRef) => {
    const { open, setOpen, triggerRef, disabled } = usePopover();

    // @ts-ignore
    const handleClick = (e?: React.MouseEvent) => {
      if (!disabled) {
        setOpen(!open);
      }
    };

    const setTriggerNode = (node: HTMLElement | null) => {
      (triggerRef as React.MutableRefObject<any>).current = node;
      if (!forwardedRef) return;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else (forwardedRef as React.MutableRefObject<any>).current = node;
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref: (node: HTMLElement) => {
          setTriggerNode(node);
          // Preserve the original ref if it exists
          const { ref } = children as any;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        },
        onClick: (e: React.MouseEvent) => {
          handleClick(e);
          // Call the original onClick if it exists
          const originalOnClick = (children as any)?.props?.onClick;
          if (typeof originalOnClick === 'function') {
            originalOnClick(e);
          }
        },
        'data-state': open ? 'open' : 'closed',
        'data-disabled': disabled,
      } as any);
    }

    return (
      <div
        ref={setTriggerNode as any}
        onClick={handleClick}
        className={cn(className)}
        data-state={open ? 'open' : 'closed'}
        data-disabled={disabled}
      >
        {children}
      </div>
    );
  },
);

PopoverTrigger.displayName = 'PopoverTrigger';

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'center' | 'left' | 'right';
  side?: 'top' | 'bottom';
  style?: React.CSSProperties;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, align, side, style: styleOverride }, forwardedRef) => {
    const { open, contentRef, styles, setOpen, triggerRef } = usePopover();

    // Merge the refs
    const mergedRef = (node: HTMLDivElement | null) => {
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node as any);
        } else {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }
      if (contentRef.current !== node) {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    if (!open) return null;

    // Compute final styles, allowing align/side overrides based on trigger rect
    const finalStyles: React.CSSProperties = { ...styles };
    try {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        if (align === 'right') {
          finalStyles.right = `${window.innerWidth - rect.right}px`;
          delete finalStyles.left;
        } else if (align === 'left') {
          finalStyles.left = `${rect.left}px`;
          delete finalStyles.right;
        }

        if (side === 'top') {
          finalStyles.bottom = `${window.innerHeight - rect.top}px`;
          delete finalStyles.top;
        } else if (side === 'bottom') {
          finalStyles.top = `${rect.bottom}px`;
          delete finalStyles.bottom;
        }
      }
    } catch (e) {
      // ignore measurement errors in server or unusual envs
    }

    const mergedStyles = { position: 'fixed', zIndex: 50, ...finalStyles, ...(styleOverride || {}) };

    return createPortal(
      <>
        <div
          className="fixed inset-0 z-40 overflow-hidden bg-transparent"
          style={{ height: '100vh' }}
          onClick={() => setOpen(false)}
        />
        <div ref={mergedRef} style={mergedStyles as React.CSSProperties} className={className}>
          {children}
        </div>
      </>,
      document.body
    );
  },
);

PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent };