import React, { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import NotificationContainer from './NotificationContainer';

interface NotificationContextType {
  invoke: (type: string, message: string, autoClose?: boolean, autoCloseTime?: number, icon?: ReactNode) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode; newestTop?: boolean, closeIcon?: boolean }> = ({ children, newestTop, closeIcon }) => {
  const [notifications, setNotifications] = useState<{ id: number; type: string; message: string; icon?: ReactNode; timeoutId?: NodeJS.Timeout, exiting?: boolean }[]>([]);
  const notificationIdRef = useRef(0);

  const invoke = (type: string, message: string, autoClose?: boolean, autoCloseTime?: number, icon?: ReactNode) => {
    const id = notificationIdRef.current++;
    const newNotification = { id, type, message, icon, closeIcon };

    setNotifications(prev => [...prev, newNotification]);

    if (autoClose) {
      const timeoutId = setTimeout(() => {
        setNotifications(prev => prev.map(notification => (notification.id === id ? { ...notification, exiting: true } : notification)));
        setTimeout(() => {
          setNotifications(prev => prev.filter(notification => notification.id !== id));
        }, 500); // Animasyon süresi kadar bekleyin
      }, autoCloseTime ?? 3000);

      setNotifications(prev => prev.map(notification => (notification.id === id ? { ...notification, timeoutId } : notification)));
    }
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => {
      const notification = prev.find(notification => notification.id === id);
      if (notification && notification.timeoutId) {
        clearTimeout(notification.timeoutId);
      }
      return prev.map(notification => (notification.id === id ? { ...notification, exiting: true } : notification));
    });
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 500); // Animasyon süresi kadar bekleyin
  };

  return (
    <NotificationContext.Provider value={{ invoke }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={clearNotification} newestTop={newestTop} />
    </NotificationContext.Provider>
  );
};
