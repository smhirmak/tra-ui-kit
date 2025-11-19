/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import { SealCheckIcon, SealWarningIcon } from '@phosphor-icons/react';
import { cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/lib/utils';

export const SealError: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`${cn(className)} size-4 text-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none">
    <g clipPath="url(#clip0_360_1098)">
      <path d="M9.04144 1.10041C9.60921 0.68369 10.2951 0.458984 10.9994 0.458984C11.7037 0.458984 12.3897 0.68369 12.9574 1.10041L14.2178 2.02625C14.469 2.20958 14.7614 2.3315 15.0694 2.37825L16.6149 2.61566C17.311 2.72239 17.9549 3.0484 18.453 3.54628C18.951 4.04416 19.2772 4.68794 19.3842 5.384L19.6216 6.93041C19.6683 7.23841 19.7894 7.53083 19.9736 7.782L20.8994 9.04241C21.3162 9.61019 21.5409 10.2961 21.5409 11.0004C21.5409 11.7047 21.3162 12.3906 20.8994 12.9584L19.9736 14.2188C19.7892 14.4701 19.6685 14.7623 19.6216 15.0704L19.3842 16.6159C19.2775 17.312 18.9514 17.9559 18.4536 18.4539C17.9557 18.952 17.3119 19.2782 16.6159 19.3852L15.0694 19.6226C14.7613 19.6694 14.4691 19.7902 14.2178 19.9746L12.9574 20.9004C12.3897 21.3171 11.7037 21.5418 10.9994 21.5418C10.2951 21.5418 9.60921 21.3171 9.04144 20.9004L7.78102 19.9746C7.52973 19.7902 7.23755 19.6694 6.92944 19.6226L5.38394 19.3852C4.68785 19.2784 4.04396 18.9524 3.54591 18.4545C3.04787 17.9567 2.72165 17.3129 2.61469 16.6168L2.37727 15.0704C2.3304 14.7623 2.20962 14.4701 2.02527 14.2188L1.09944 12.9584C0.682713 12.3906 0.458008 11.7047 0.458008 11.0004C0.458008 10.2961 0.682713 9.61019 1.09944 9.04241L2.02527 7.782C2.20952 7.53083 2.33052 7.23841 2.37727 6.93041L2.61469 5.38491C2.72142 4.68882 3.04743 4.04493 3.54531 3.54689C4.04319 3.04885 4.68697 2.72262 5.38302 2.61566L6.92944 2.37825C7.23744 2.3315 7.52985 2.2105 7.78102 2.02625L9.04144 1.10041ZM12.1434 2.20866C11.8117 1.96529 11.4109 1.83407 10.9994 1.83407C10.588 1.83407 10.1872 1.96529 9.85543 2.20866L8.5941 3.1345C8.16426 3.44996 7.66455 3.65689 7.13752 3.73766L5.59202 3.97416C5.18507 4.03668 4.80866 4.22736 4.51752 4.5185C4.22639 4.80964 4.0357 5.18604 3.97319 5.593L3.73669 7.1385C3.65591 7.66581 3.44899 8.16581 3.13352 8.59599L2.20769 9.85641C1.96431 10.1882 1.83309 10.5889 1.83309 11.0004C1.83309 11.4119 1.96431 11.8126 2.20769 12.1444L3.13352 13.4057C3.44898 13.8356 3.65591 14.3353 3.73669 14.8623L3.97319 16.4078C4.03574 16.8147 4.22647 17.1909 4.51761 17.4819C4.80876 17.7729 5.18514 17.9634 5.59202 18.0257L7.13752 18.2641C7.66476 18.3445 8.16476 18.5511 8.59502 18.8663L9.85543 19.7922C10.1872 20.0355 10.588 20.1668 10.9994 20.1668C11.4109 20.1668 11.8117 20.0355 12.1434 19.7922L13.4048 18.8663C13.8346 18.5509 14.3343 18.3439 14.8613 18.2632L16.4069 18.0267C16.8137 17.9641 17.19 17.7734 17.4809 17.4822C17.7719 17.1911 17.9624 16.8147 18.0248 16.4078L18.2631 14.8623C18.3436 14.3351 18.5502 13.8351 18.8653 13.4048L19.7912 12.1444C20.0346 11.8126 20.1658 11.4119 20.1658 11.0004C20.1658 10.5889 20.0346 10.1882 19.7912 9.85641L18.8653 8.59508C18.5499 8.16523 18.343 7.66553 18.2622 7.1385L18.0257 5.593C17.9632 5.18604 17.7725 4.80964 17.4813 4.5185C17.1902 4.22736 16.8138 4.03668 16.4069 3.97416L14.8613 3.73766C14.334 3.65689 13.834 3.44997 13.4039 3.1345L12.1434 2.20866Z" className="fill-current" />
      <path d="M14.3327 14.3337L7.66602 7.66699M14.3327 7.66699L7.66602 14.3337" className="stroke-current" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_360_1098">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

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

interface IInformationStatus {
  className?: string;
  icon?: React.ReactNode;
  isHaveIcon?: boolean;
  title: string;
  type?: 'success' | 'error' | 'warning';
}

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
          ? (icon ?? <SealCheckIcon className={cn(iconsStyle())} />) : type === 'warning'
            ? (icon ?? <SealWarningIcon className={cn(iconsStyle())} />) : type === 'error'
              ? (icon ?? <SealError className={cn(iconsStyle())} />) : null
      )}
    </span>
    <span>{title}</span>
  </div>
);

export default InformationStatus;
