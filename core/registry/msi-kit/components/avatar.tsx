import { cva } from 'class-variance-authority';
import React, { HTMLAttributes, useState } from 'react';
import { UserIcon, XIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'bg-primary-15 text-primary relative flex w-fit items-center justify-center transition',
  {
    variants: {
      variant: {
        circular: 'rounded-full',
        rounded: 'rounded-lg',
      },
      size: {
        sm: 'aspect-square size-12 text-lg',
        lg: 'aspect-square size-52 min-h-52 min-w-52 text-6xl',
      },
    },
    defaultVariants: {
      variant: 'circular',
      size: 'lg',
    },
  },
);

const avatarIconVariants = cva(
  '',
  {
    variants: {
      size: {
        sm: 'size-5',
        lg: 'size-20',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
);
const imageVariants = cva(
  'h-max-full w-full object-fill',
  {
    variants: {
      variant: {
        circular: 'rounded-full',
        rounded: 'rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'circular',
    },
  },
);

const badgeVariants = cva(
  'absolute',
  {
    variants: {
      badgePosition: {
        'top-left': 'left-0 top-0',
        'top-right': 'right-0 top-0',
        'bottom-left': 'bottom-0 left-0',
        'bottom-right': 'bottom-0 right-0',
      },
      variant: {
        circular: '',
        rounded: '',
      },
      size: {
        sm: '',
        lg: '',
      },
    },
    defaultVariants: {
      badgePosition: 'top-right',
      variant: 'circular',
      size: 'lg',
    },
    compoundVariants: [
      {
        badgePosition: 'top-left',
        variant: 'circular',
        size: 'lg',
        className: 'left-8 top-8 -translate-x-full -translate-y-1/2 transform',
      },
      {
        badgePosition: 'top-right',
        variant: 'circular',
        size: 'lg',
        className: 'right-8 top-8 -translate-y-1/2 translate-x-full transform',
      },
      {
        badgePosition: 'bottom-left',
        variant: 'circular',
        size: 'lg',
        className: 'bottom-8 left-8 -translate-x-full translate-y-1/2 transform',
      },
      {
        badgePosition: 'bottom-right',
        variant: 'circular',
        size: 'lg',
        className: 'bottom-8 right-8 translate-x-full translate-y-1/2 transform',
      },
      {
        badgePosition: 'top-left',
        variant: 'rounded',
        size: 'lg',
        className: '-left-2 -top-2',
      },
      {
        badgePosition: 'top-right',
        variant: 'rounded',
        size: 'lg',
        className: '-right-2 -top-2',
      },
      {
        badgePosition: 'bottom-left',
        variant: 'rounded',
        size: 'lg',
        className: '-bottom-2 -left-2',
      },
      {
        badgePosition: 'bottom-right',
        variant: 'rounded',
        size: 'lg',
        className: '-bottom-2 -right-2',
      },
      {
        badgePosition: 'top-left',
        variant: 'rounded',
        size: 'sm',
        className: '-left-1 -top-1',
      },
      {
        badgePosition: 'top-right',
        variant: 'rounded',
        size: 'sm',
        className: '-right-1 -top-1',
      },
      {
        badgePosition: 'bottom-left',
        variant: 'rounded',
        size: 'sm',
        className: '-bottom-1 -left-1',
      },
      {
        badgePosition: 'bottom-right',
        variant: 'rounded',
        size: 'sm',
        className: '-bottom-1 -right-1',
      },
    ],
  },
);

interface IAvatar {
  asChild?: React.ElementType;
  badgeClassName?: string;
  badgeContent?: React.ReactNode;
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  href?: string;
  icon?: React.ReactNode;
  imageClassName?: string;
  onClick?: () => void;
  size?: 'sm' | 'lg';
  src?: string;
  title?: string;
  variant?: 'circular' | 'rounded';
}

interface IMultipleAvatarContainer {
  children: React.ReactNode[];
  lastElementSize?: 'sm' | 'lg';
  showLessAvatarClassName?: string;
  showMoreAvatarClassName?: string;
}

const Avatar = React.forwardRef<HTMLAttributes<HTMLDivElement>, IAvatar>(({
  asChild,
  badgeClassName,
  badgeContent,
  badgePosition = 'top-right',
  className,
  href,
  icon,
  imageClassName,
  onClick,
  size,
  src,
  title,
  variant,
  ...otherProps
}, ref) => {
  const Comp = asChild ?? 'div';
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Comp className={cn(avatarVariants({ variant, size }), className)} ref={ref} onClick={onClick} href={href} {...otherProps}>
      {
        src ? <img className={cn(imageVariants({ variant }), imageClassName)} src={src} alt="" />
          : (!src && title && !icon)
            ? <p>{title.split(' ').map(item => item[0]).join('')}</p>
            : (!src && !title && icon) ? <span>{icon}</span> : <UserIcon className={cn(avatarIconVariants({ size }))} />
      }
      {badgeContent && (
        <div className={cn(badgeVariants({ badgePosition, variant, size }), badgeClassName)}>
          {badgeContent}
        </div>
      )}

    </Comp>
  );
});

const showMoreAvatarVariants = cva('relative hover:brightness-125');

const showLessAvatarVariants = cva('bg-primary/50 text-white hover:brightness-125');

const MultipleAvatarContainer: React.FC<IMultipleAvatarContainer> = ({ children, lastElementSize = 'sm', showLessAvatarClassName, showMoreAvatarClassName }) => {
  const [showAllAvatars, setShowAllAvatars] = useState(false);
  const maxVisibleAvatars = 4;
  const remainingAvatars = React.Children.count(children) - maxVisibleAvatars;

  const handleShowAllAvatars = () => {
    setShowAllAvatars(true);
  };

  const handleHideAllAvatars = () => {
    setShowAllAvatars(false);
  };

  return (
    <div className="flex items-center transition-transform duration-1000">
      {React.Children.toArray(children).slice(0, showAllAvatars ? undefined : maxVisibleAvatars).map((child, index) => (
        <div
          key={index}
          className="relative transition-transform duration-500"
          style={{
            transform: showAllAvatars ? `translateX(${index * 5}px)` : `translateX(-${index * 10}px)`,
            zIndex: index,
          }}
        >
          {child}
        </div>
      ))}
      {!showAllAvatars && remainingAvatars > 0 && (
        <div
          className="relative cursor-pointer transition-transform duration-500"
          title="Show more"
          style={{ transform: `translateX(-${maxVisibleAvatars * 10}px)`, zIndex: maxVisibleAvatars }}
          onClick={handleShowAllAvatars}
        >
          <Avatar size={lastElementSize} title={`+ ${remainingAvatars}`} className={cn(showMoreAvatarVariants(), showMoreAvatarClassName)} />
        </div>
      )}
      {showAllAvatars && (
        <div
          className="relative cursor-pointer transition-transform duration-500"
          title="Show less"
          style={{ transform: `translateX(${React.Children.count(children) * 5}px)`, zIndex: React.Children.count(children) }}
          onClick={handleHideAllAvatars}
        >
          <Avatar size={lastElementSize} className={cn(showLessAvatarVariants(), showLessAvatarClassName)} icon={<XIcon />} />
        </div>
      )}
    </div>
  );
};

export { Avatar, MultipleAvatarContainer };
