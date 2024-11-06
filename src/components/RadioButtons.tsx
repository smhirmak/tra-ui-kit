import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';

import { Circle } from '@/assets/Icons';
import Label from '@/components/Label';
import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn('grid gap-2', className)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

type RadioGroupItemProps = {
  className?: string;
  disabled?: boolean;
  id: string;
  label?: string;
} & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({
  className,
  disabled,
  id,
  label,
  ...props
}, ref) => (
  <div className="flex items-center space-x-2">
    <RadioGroupPrimitive.Item
      ref={ref}
      id={id}
      disabled={disabled}
      className={cn(
        `bg-tra-disabled-light-dark aspect-square h-4 w-4 rounded-full border border-tra-primary text-tra-primary ring-offset-background 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-tra-primary focus-visible:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="size-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
    {label && <Label htmlFor={id} id={`id-${label}`} className="select-none" disabled={disabled}>{label}</Label>}
  </div>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
