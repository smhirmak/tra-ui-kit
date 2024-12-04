import React, { createContext, useContext, useState, ReactNode, useRef, useMemo } from 'react';
import { INotification, INotificationContext } from '@/types/types';
import NotificationContainer from './NotificationContainer';

const defaultNotificationContext: INotificationContext = {
  invoke: () => {},
  translateFunction: () => {},
};

const NotificationContext = createContext<INotificationContext>(defaultNotificationContext);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<INotification> = (
  { children,
    newestTop,
    closeIcon,
    translateFunction,
    theme, mode = 'light',
    containerClassName,
    notificationClassName,
    closeButtonClassName,
    progressBarClassName,
    animationMode = 'bounce' as 'flip' | 'bounce' | 'slide' | null | undefined,
    position = 'top-right' },
) => {
  const [notifications, setNotifications] = useState<{ id: number; type: string; message: string; icon?: ReactNode; timeoutId?: NodeJS.Timeout, exiting?: boolean }[]>([]);
  const [localAutoClose, setLocalAutoClose] = useState<{ state: boolean | undefined, time: number | undefined }>();
  const notificationIdRef = useRef(0);

  const invoke = (type: string, message: string, options: { autoClose?: boolean, autoCloseTime?: number, icon?: ReactNode }) => {
    setLocalAutoClose({ state: options.autoClose, time: options.autoCloseTime });
    const id = notificationIdRef.current++;
    const newNotification = { id, type, message, icon: options.icon, closeIcon, autoClose: options.autoClose, autoCloseTime: options.autoCloseTime };

    setNotifications(prev => [...prev, newNotification]);

    if (options.autoClose) {
      const timeoutId = setTimeout(() => {
        setNotifications(prev => prev.map(notification => (notification.id === id ? { ...notification, exiting: true } : notification)));
        setTimeout(() => {
          setNotifications(prev => prev.filter(notification => notification.id !== id));
        }, 200); // Animasyon için bekleme süresi
      }, options.autoCloseTime ?? 3000);

      setNotifications(prev => prev.map(notification => (notification.id === id ? { ...notification, timeoutId } : notification)));
    }
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => {
      const notification = prev.find(e => e.id === id);
      if (notification && notification.timeoutId) {
        clearTimeout(notification.timeoutId);
      }
      return prev.map(notification => (notification.id === id ? { ...notification, exiting: true, autoClose: false } : notification));
    });
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 200); // Animasyon için bekleme süresi
  };

  const values = useMemo(() => ({
    invoke, translateFunction,
  }), [invoke]);

  return (
    <NotificationContext.Provider value={values}>
      {children}
      <NotificationContainer
        notifications={notifications}
        onRemove={clearNotification}
        newestTop={newestTop}
        theme={theme}
        mode={mode}
        autoClose={localAutoClose?.state}
        autoCloseTime={localAutoClose?.time}
        containerClassName={containerClassName}
        notificationClassName={notificationClassName}
        closeButtonClassName={closeButtonClassName}
        progressBarClassName={progressBarClassName}
        animationMode={animationMode || undefined}
        position={position}
      />
    </NotificationContext.Provider>
  );
};
