/* eslint-disable tailwindcss/no-custom-classname */
import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { XIcon } from '@phosphor-icons/react';
import type { VariantProps } from 'class-variance-authority';
import { cn, preventScrollShift } from '@/lib/utils';
import Button from '@/components/button';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

interface DrawerContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  position?: DrawerPosition;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  showCloseButton?: boolean;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a <Drawer /> component.');
  }
  return context;
};

interface DrawerProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: DrawerPosition;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  showCloseButton?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  position = 'left',
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  showCloseButton = true,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  return (
    <DrawerContext.Provider
      value={{
        open,
        setOpen,
        position,
        disableBackdropClick,
        disableEscapeKeyDown,
        showCloseButton,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

interface DrawerTriggerProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ children, asChild = false, className }) => {
  const { setOpen } = useDrawer();

  if (asChild) {
    if (!React.isValidElement(children)) {
      throw new Error('DrawerTrigger: when using asChild, children must be a single React element');
    }

    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<any>).props.onClick?.(e);
        setOpen(true);
      },
    });
  }

  return (
    <Button
      className={cn(className)}
      onClick={() => setOpen(true)}
    >
      {children}
    </Button>
  );
};

const overlayVariants = cva(
  'fixed inset-0 z-50 bg-black/50 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
);

const contentVariants = cva(
  'fixed z-50 bg-background shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      position: {
        left: 'inset-y-0 left-0 h-full w-full sm:max-w-sm data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
        right:
          'inset-y-0 right-0 h-full w-full sm:max-w-sm data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
        top: 'inset-x-0 top-0 w-full max-h-[85vh] data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
        bottom:
          'inset-x-0 bottom-0 w-full max-h-[85vh] data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
      },
    },
    defaultVariants: {
      position: 'left',
    },
  },
);

interface DrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contentVariants> {
  className?: string;
  children: React.ReactNode;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ className, children, ...props }) => {
  const { open, setOpen, position, disableBackdropClick, disableEscapeKeyDown, showCloseButton } =
    useDrawer();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      preventScrollShift.lock();
    }

    return () => {
      preventScrollShift.unlock();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscapeKeyDown) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, disableEscapeKeyDown, setOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disableBackdropClick) {
        setOpen(false);
      }
    },
    [disableBackdropClick, setOpen],
  );

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!open) return null;

  return createPortal(
    <Fragment>
      <div
        className={cn(overlayVariants())}
        data-state={open ? 'open' : 'closed'}
        onClick={handleBackdropClick}
      />

      <div
        ref={drawerRef}
        className={cn(contentVariants({ position }), 'flex flex-col', className)}
        data-state={open ? 'open' : 'closed'}
        onClick={handleContentClick}
        {...props}
      >
        {children}

        {showCloseButton && (
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </Fragment>,
    document.body,
  );
};

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-2 text-center sm:text-left px-6 pt-6', className)}
    {...props}
  />
);

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-6 pb-6',
      className,
    )}
    {...props}
  />
);

const DrawerTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
);

const DrawerDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);

const DrawerBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex-1 overflow-y-auto px-6 py-4', className)}
    {...props}
  />
);

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
};
