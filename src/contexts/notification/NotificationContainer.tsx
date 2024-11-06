import { X } from '@/assets/Icons';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ReactNode, useEffect, useState } from 'react';

const notificationVariants = cva('relative mb-2.5 w-72 cursor-pointer rounded-sm p-3 shadow-md transition-transform ease-in-out', {
  variants: {
    type: {
      info: 'bg-blue-200 text-blue-800',
      error: 'bg-red-200 text-red-800',
      success: 'bg-green-200 text-green-800',
      warn: 'bg-yellow-200 text-yellow-800',
    },
    exiting: {
      true: 'animate-bounce-out-right',
      undefined: 'animate-bounce-in-right',
    },
  },
});

const NotificationContainer: React.FC<{
  notifications: { id: number; type: string; message: string; icon?: ReactNode; closeIcon?: boolean }[];
  onRemove: (id: number) => void;
  newestTop?: boolean;
}> = ({ notifications, onRemove, newestTop }) => {
  const [visibleNotifications, setVisibleNotifications] = useState(notifications);

  useEffect(() => {
    setVisibleNotifications(newestTop ? [...notifications].reverse() : notifications);
  }, [notifications, newestTop]);

  const handleRemove = (id: number) => {
    const updatedNotifications = visibleNotifications.map(n => (n.id === id ? { ...n, exiting: true } : n));
    setVisibleNotifications(updatedNotifications);
  };

  return (
    <div className="fixed right-5 top-5 p-4">
      {visibleNotifications.map(notification => (
        <div
          key={notification.id}
          className={cn(notificationVariants({ type: notification.type, exiting: notification.exiting }))}
          onClick={() => handleRemove(notification.id)}
          onAnimationEnd={e => {
            console.log(e.animationName);
            if (e.animationName === 'bounceOutRight') {
              onRemove(notification.id);
            }
          }}
        >
          {notification.icon}
          <span>{notification.message}</span>
          {notification.closeIcon && (
            <button
              className="absolute right-2.5 top-2.5"
              onClick={() => handleRemove(notification.id)}
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
