/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ISwitch } from '@/types/types';

const switchBaseVariants = cva(
  "group inline-flex h-7 w-12 shrink-0 cursor-pointer select-none items-center rounded-full border-2 border-transparent bg-disabled-light transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 peer-checked:bg-primary-focused",
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

const switchThumbVariants = cva(
  'pointer-events-none block size-6 translate-x-0 rounded-full bg-button-text transition-transform group-data-[checked=true]:translate-x-5',
  {
    variants: {
      variant: {
        apple: 'ring-0',
        android: 'ring-2 ring-disabled-light group-data-[checked=true]:ring-primary',
      },
    },
    defaultVariants: {
      variant: 'apple',
    },
  },
);

const Switch = React.forwardRef<HTMLInputElement, ISwitch>(
  (
    {
      baseClassName = '',
      thumbClassName = '',
      containerClassName = '',
      variant = 'apple',
      id,
      defaultChecked = false,
      label,
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = React.useState(defaultChecked);
    return (
      <div className={containerClassName}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          id={id}
          className="peer hidden"
          {...props}
        />
        <label htmlFor={id} data-checked={checked} className={cn(switchBaseVariants({ variant }), baseClassName)}>
          <span className={cn(switchThumbVariants({ variant }), thumbClassName)} />
        </label>
        <Label>{label}</Label>
      </div>
    );
  },
);

export default Switch;
