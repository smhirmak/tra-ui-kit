/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { X } from '@/assets/Icons';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ReactNode, useEffect, useState } from 'react';

const containerVariants = cva(
  'fixed z-9999 p-4',
  {
    variants: {
      position: {
        'top-right': 'right-5 top-5',
        'bottom-right': 'bottom-5 right-5',
        'top-left': 'left-5 top-5',
        'bottom-left': 'bottom-5 left-5',
      },
      isHaveNotifications: {
        true: '',
        false: 'hidden',
      },
    },
  },
);

const notificationVariants = cva('relative mb-2.5 w-72 cursor-pointer rounded-md px-3 py-5 shadow-soft-grey transition-transform ease-in-out', {
  variants: {
    theme: {
      colored: '',
      default: '',
      lined: '',
    },
    mode: {
      light: 'bg-white',
      dark: 'bg-black',
    },
    type: {
      info: 'text-primary',
      error: 'text-error',
      success: 'text-success',
      warn: 'text-warning',
    },
    exiting: {
      true: '',
      undefined: '',
    },
    animationMode: {
      bounce: '',
      slide: '',
      flip: '',
    },
    position: {
      'top-right': '',
      'bottom-right': '',
      'top-left': '',
      'bottom-left': '',
    },
  },
  defaultVariants: {
    theme: 'colored',
  },
  compoundVariants: [
    {
      exiting: true,
      animationMode: 'bounce',
      position: 'top-right',
      className: 'animate-bounce-out-right',
    },
    {
      exiting: true,
      animationMode: 'bounce',
      position: 'bottom-right',
      className: 'animate-bounce-out-right',
    },
    {
      exiting: undefined,
      animationMode: 'bounce',
      position: 'top-right',
      className: 'animate-bounce-in-right',
    },
    {
      exiting: undefined,
      animationMode: 'bounce',
      position: 'bottom-right',
      className: 'animate-bounce-in-right',
    },
    {
      exiting: true,
      animationMode: 'bounce',
      position: 'top-left',
      className: 'animate-bounce-out-left',
    },
    {
      exiting: true,
      animationMode: 'bounce',
      position: 'bottom-left',
      className: 'animate-bounce-out-left',
    },
    {
      exiting: undefined,
      animationMode: 'bounce',
      position: 'top-left',
      className: 'animate-bounce-in-left',
    },
    {
      exiting: undefined,
      animationMode: 'bounce',
      position: 'bottom-left',
      className: 'animate-bounce-in-left',
    },
    {
      exiting: true,
      animationMode: 'slide',
      position: 'top-right',
      className: 'animate-slide-out-right',
    },
    {
      exiting: true,
      animationMode: 'slide',
      position: 'bottom-right',
      className: 'animate-slide-out-right',
    },
    {
      exiting: undefined,
      animationMode: 'slide',
      position: 'top-right',
      className: 'animate-slide-in-right',
    },
    {
      exiting: undefined,
      animationMode: 'slide',
      position: 'bottom-right',
      className: 'animate-slide-in-right',
    },
    {
      exiting: true,
      animationMode: 'slide',
      position: 'top-left',
      className: 'animate-slide-out-left',
    },
    {
      exiting: true,
      animationMode: 'slide',
      position: 'bottom-left',
      className: 'animate-slide-out-left',
    },
    {
      exiting: undefined,
      animationMode: 'slide',
      position: 'top-left',
      className: 'animate-slide-in-left',
    },
    {
      exiting: undefined,
      animationMode: 'slide',
      position: 'bottom-left',
      className: 'animate-slide-in-left',
    },
    {
      exiting: true,
      animationMode: 'flip',
      className: 'animate-flip-out',
    },
    {
      exiting: undefined,
      animationMode: 'flip',
      className: 'animate-flip-in',
    },
    {
      theme: 'colored',
      type: 'info',
      className: 'bg-primary-15',
    },
    {
      theme: 'default',
      type: 'info',
      className: '',
    },
    {
      theme: 'lined',
      type: 'info',
      className: 'border-l-8 border-primary dark:border-primary-15',
    },
    {
      theme: 'colored',
      type: 'error',
      className: 'bg-error-light',
    },
    {
      theme: 'default',
      type: 'error',
      className: '',
    },
    {
      theme: 'lined',
      type: 'error',
      className: 'border-l-8 border-error dark:border-error-light',
    },
    {
      theme: 'colored',
      type: 'success',
      className: 'bg-success-light',
    },
    {
      theme: 'default',
      type: 'success',
      className: '',
    },
    {
      theme: 'lined',
      type: 'success',
      className: 'border-l-8 border-success dark:border-success-light',
    },
    {
      theme: 'colored',
      type: 'warn',
      className: 'bg-warning-light',
    },
    {
      theme: 'default',
      type: 'warn',
      className: '',
    },
    {
      theme: 'lined',
      type: 'warn',
      className: 'border-l-8 border-warning dark:border-warning-light',
    },
  ],
});

const notificationProgressBar = cva(
  'absolute bottom-0 left-0 h-1.5 w-0 animate-linear-progress rounded-md',
  {
    variants: {
      theme: {
        colored: '',
        default: '',
        lined: 'rounded-l-none',
      },
      type: {
        info: 'bg-primary dark:bg-primary-15',
        error: 'bg-error dark:bg-error-light',
        success: 'bg-success dark:bg-success-light',
        warn: 'bg-warning dark:bg-warning-light',
      },
    },
    compoundVariants: [
      {
        theme: 'colored',
        type: 'info',
        className: '!bg-primary',
      },
      {
        theme: 'colored',
        type: 'error',
        className: '!bg-error',
      },
      {
        theme: 'colored',
        type: 'success',
        className: '!bg-success',
      },
      {
        theme: 'colored',
        type: 'warn',
        className: '!bg-warning',
      },
    ],
  },
);

const NotificationContainer: React.FC<{
  notifications: { id: number; type: string; message: string; icon?: ReactNode; closeIcon?: boolean; autoClose?: boolean; autoCloseTime?: number; exiting?: boolean }[];
  onRemove: (id: number) => void;
  newestTop?: boolean;
  theme?: 'colored' | 'default' | 'lined';
  mode?: 'light' | 'dark';
  autoCloseTime?: number | undefined | boolean;
  autoClose?: boolean;
  containerClassName?: string;
  notificationClassName?: string;
  closeButtonClassName?: string;
  progressBarClassName?: string;
  animationMode?: 'bounce' | 'slide' | 'flip' | null;
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}> = ({ notifications,
  onRemove,
  newestTop,
  theme = 'colored',
  mode = 'light',
  autoCloseTime,
  containerClassName,
  notificationClassName,
  closeButtonClassName,
  progressBarClassName,
  animationMode = 'bounce',
  position = 'top-right' }) => {
    const [visibleNotifications, setVisibleNotifications] = useState(notifications);

    useEffect(() => {
      setVisibleNotifications(newestTop ? [...notifications].reverse() : notifications);
    }, [notifications, newestTop]);

    const handleRemove = (id: number) => {
      const updatedNotifications = visibleNotifications.map(n => (n.id === id ? { ...n, exiting: true } : n));
      setVisibleNotifications(updatedNotifications);
      setTimeout(() => {
        onRemove(id);
      }, 100); // Animasyon için bekleme süresi
    };

    return (
      <div className={cn(containerVariants({ position, isHaveNotifications: Boolean(notifications?.length) }), containerClassName)}>
        {visibleNotifications.map(notification => (
          <div
            key={notification.id}
            className={cn(
              notificationVariants({
                type: notification.type as 'info' | 'error' | 'success' | 'warn',
                exiting: notification.exiting,
                theme,
                mode,
                animationMode,
                position,
              }),
              notificationClassName,
            )}
            onClick={() => handleRemove(notification.id)}
            onAnimationEnd={e => {
              if (e.animationName === 'bounceOutRight') {
                onRemove(notification.id);
              }
            }}
          >
            {notification.icon}
            <span>{notification.message}</span>
            {notification.closeIcon && (
              <Button
                size="icon"
                className={cn('absolute right-2.5 top-2.5 m-0 size-fit max-h-fit min-h-fit min-w-fit max-w-fit rounded-full bg-black/30 p-px hover:bg-black/50', closeButtonClassName)}
                onClick={() => handleRemove(notification.id)}
              >
                <X className="size-4" />
              </Button>
            )}
            {notification.autoClose && (
              <div
                className={cn(notificationProgressBar({ theme, type: notification.type as 'info' | 'error' | 'success' | 'warn' }), progressBarClassName)}
                style={{ animationDuration: `${autoCloseTime}ms` }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

export default NotificationContainer;
