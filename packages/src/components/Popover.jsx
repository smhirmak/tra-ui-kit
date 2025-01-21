import React, { createContext, useContext, useRef, useEffect, useState, useMemo } from 'react';

const PopoverContext = createContext(undefined);

const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('usePopover must be used within Popover');
  return context;
};

export const Popover = ({
  children,
  open: controlledOpen,
  onOpenChange,
  disabled = false,
  dropdownAlign = 'left',
}) => {
  const [open, setOpen] = useState(controlledOpen ?? false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen]);

  const handleOpenChange = (newOpen) => {
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
    const handleClickOutside = (event) => {
      if (contentRef.current
          && !contentRef.current.contains(event.target)
          && !triggerRef.current?.contains(event.target)) {
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

export const PopoverTrigger = ({
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

export const PopoverContent = React.forwardRef(
  ({ children, className }, forwardedRef) => {
    const { open, contentRef, styles, setOpen } = usePopover();

    // Merge the refs
    const mergedRef = (node) => {
      if (forwardedRef) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else {
          forwardedRef.current = node;
        }
      }
      if (contentRef.current !== node) {
        contentRef.current = node;
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
