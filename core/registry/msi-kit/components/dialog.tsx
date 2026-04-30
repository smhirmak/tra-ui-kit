/* eslint-disable tailwindcss/no-custom-classname */
import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'class-variance-authority';
import { XIcon } from '@phosphor-icons/react';
import type { VariantProps } from 'class-variance-authority';
import { cn, preventScrollShift } from '@/lib/utils';
import Button from '@/components/button';

export type DialogSize = 'sm' | 'default' | 'lg' | 'xl' | 'full';

interface DialogContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  size?: DialogSize;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  showCloseButton?: boolean;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a <Dialog /> component.');
  }
  return context;
};

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: DialogSize;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  showCloseButton?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  size,
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
    <DialogContext.Provider
      value={{ open, setOpen, size, disableBackdropClick, disableEscapeKeyDown, showCloseButton }}
    >
      {children}
    </DialogContext.Provider>
  );
};

interface DialogTriggerProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({ children, asChild = false, className }) => {
  const { setOpen } = useDialog();

  if (asChild) {
    if (!React.isValidElement(children)) {
      throw new Error('DialogTrigger: when using asChild, children must be a single React element');
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
  `fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-background p-6 shadow-soft-grey duration-200 
    data-[state=open]:animate-in 
    data-[state=closed]:animate-out 
    data-[state=closed]:fade-out-0 
    data-[state=open]:fade-in-0 
    data-[state=closed]:zoom-out-95 
    data-[state=open]:zoom-in-95 
    data-[state=closed]:slide-out-to-left-1/2 
    data-[state=closed]:slide-out-to-top-[48%] 
    data-[state=open]:slide-in-from-left-1/2 
    data-[state=open]:slide-in-from-top-[48%] 
    sm:rounded-lg`,
  {
    variants: {
      size: {
        default: 'max-w-[calc(100%-2rem)] sm:max-w-[425px]',
        sm: 'max-w-sm',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] h-[95vh] overflow-y-auto',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contentVariants> {
  className?: string;
  children: React.ReactNode;
}

const DialogContent: React.FC<DialogContentProps> = ({ className, children, ...props }) => {
  const { open, setOpen, size, disableBackdropClick, disableEscapeKeyDown, showCloseButton } =
    useDialog();
  const [isRendered, setIsRendered] = useState(open);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (open) {
      setIsRendered(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsRendered(false);
      }, 150);
    }
    return () => clearTimeout(timeoutId);
  }, [open]);

  useEffect(() => {
    if (isRendered) {
      preventScrollShift.lock();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableEscapeKeyDown) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      if (!open) {
        preventScrollShift.unlock();
      }
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isRendered, disableEscapeKeyDown, setOpen, open]);

  if (!isRendered) return null;

  return createPortal(
    <Fragment>
      <div
        className={cn(overlayVariants(), className)}
        data-state={open ? 'open' : 'closed'}
        onClick={() => !disableBackdropClick && setOpen(false)}
      />

      <div
        className={cn(contentVariants({ size }), className)}
        data-state={open ? 'open' : 'closed'}
        {...props}
      >
        {children}

        {showCloseButton && (
          <button
            type="button"
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

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
);

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
);

const DialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
