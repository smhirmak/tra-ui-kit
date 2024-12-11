/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { CaretDown, Check } from '@/assets/Icons';
import { cn } from '@/lib/utils';
import Button from '../Button';

const SelectContent = React.forwardRef(({ className, children, open, ...props }, ref) => {
  if (!open) return null;
  return (
    <div
      ref={ref}
      className={cn(
        `relative z-50 max-h-96 bg-background min-w-[6rem] overflow-hidden rounded-md border text-popover-foreground shadow-md 
      data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
      data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 
      data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
        className,
      )}
      {...props}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  );
});
SelectContent.displayName = 'SelectContent';

const SelectTrigger = React.forwardRef(({ className, children, onToggle, open, ...props }, ref) => (
  <Button
    ref={ref}
    disableEffect
    onClick={onToggle}
    aria-expanded={open}
    role="combobox"
    className={cn(
      `flex h-10 w-full items-center justify-between rounded-md border border-tra-input bg-tra-input-fill px-3 py-2 text-sm ring-offset-background
    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    [&>span]:line-clamp-1`,
      className,
    )}
    {...props}
  >
    {children}
    <CaretDown className="size-4 opacity-50" />
  </Button>
));
SelectTrigger.displayName = 'SelectTrigger';

const Select = ({ children, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleToggle = () => setOpen(prev => !prev);
  const handleSelect = value => {
    setSelectedValue(value);
    setOpen(false);
  };

  return (
    <div {...props}>
      <SelectTrigger onToggle={handleToggle} open={open}>
        {selectedValue || 'Select an option'}
      </SelectTrigger>
      <SelectContent open={open}>
        {React.Children.map(children, child => {
          if (child.type === SelectItem) {
            return React.cloneElement(child, { onSelect: handleSelect });
          }
          return child;
        })}
      </SelectContent>
    </div>
  );
};

const SelectGroup = ({ children, ...props }) => <div {...props}>{children}</div>;

const SelectValue = ({ children, ...props }) => <span {...props}>{children}</span>;

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = 'SelectLabel';

const SelectItem = React.forwardRef(({ className, children, onSelect, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none 
      focus:bg-tra-button-disabled focus:text-tra-button-disabled-text
      data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
      className,
    )}
    onClick={() => onSelect(children)}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <Check className="size-4" />
    </span>
    <span>{children}</span>
  </div>
));
SelectItem.displayName = 'SelectItem';

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-tra-button-disabled', className)}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectSeparator';

export {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
};
