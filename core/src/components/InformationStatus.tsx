/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { SealCheck, SealError, SealWarning } from '@/assets/Icons';
import { cn } from '@/lib/utils';
import { IInformationStatus } from '@/types/types';
import { cva } from 'class-variance-authority';
import React from 'react';

const informationStatusVariants = cva(
  'flex w-fit max-w-full gap-1 overflow-hidden text-ellipsis whitespace-normal break-normal rounded-md px-4 py-2 text-sm font-medium',
  {
    variants: {
      type: {
        success: 'bg-success-light text-success',
        error: 'bg-error-light text-error',
        warning: 'bg-secondary-light text-secondary',

      },
    },
    defaultVariants: {
      type: 'success',
    },
  },
);

const iconsStyle = cva('min-w-fit text-base');

const InformationStatus: React.FC<IInformationStatus> = ({
  className,
  icon,
  isHaveIcon = false,
  title,
  type = 'success',
  ...otherProps
}) => (
  <div
    className={cn(informationStatusVariants({ type }), className)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...otherProps}
  >
    <span className="mt-1">
      {(isHaveIcon || icon) && (
        type === 'success'
          ? (icon ?? <SealCheck className={cn(iconsStyle())} />) : type === 'warning'
            ? (icon ?? <SealWarning className={cn(iconsStyle())} />) : type === 'error'
              ? (icon ?? <SealError className={cn(iconsStyle())} />) : null
      )}
    </span>
    <span>{title}</span>
  </div>
);

export default InformationStatus;
