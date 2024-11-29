import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { SwitchProps } from '@/types/types';

const switchVariants = cva(
  `peer inline-flex w-13 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
  disabled:cursor-not-allowed disabled:opacity-50 
  data-[state=checked]:bg-tra-primary data-[state=unchecked]:bg-tra-disabled-light
  `,
  {
    variants: {
      variant: {
        apple: 'h-7',
        android: 'h-6',
      },
    },
    defaultVariants: {
      variant: 'apple',
    },
  },
);

const switchPrimitivesVariants = cva(
  `pointer-events-none block size-6 rounded-full bg-tra-button-text shadow-lg transition-transform data-[state=checked]:translate-x-6 
  data-[state=unchecked]:translate-x-0
  `,
  {
    variants: {
      variant: {
        apple: 'ring-0',
        android: 'ring-2 data-[state=checked]:ring-tra-primary data-[state=unchecked]:ring-tra-disabled-light',
      },
    },
    defaultVariants: {
      variant: 'apple',
    },
  },
);

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ variant }), className)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(switchPrimitivesVariants({ variant }))}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
