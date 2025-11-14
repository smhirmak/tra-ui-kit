import { ReactNode } from 'react';
import { useNotification } from '@/contexts/notification/NotificationProvider';

interface NotificationOptions {
  message: string | string[];
  options: {
    autoClose?: boolean | undefined;
    autoCloseTime?: number | undefined;
    messageType?: 'string' | 'html';
    icon?: ReactNode
  } | undefined;
}

const Notification = () => {
  const { invoke, translateFunction } = useNotification();

  const info = (
    message: NotificationOptions['message'],
    options?: NotificationOptions['options'],
  ) => {
    // const { autoClose = true, autoCloseTime } = options || {};
    invoke(
      'info',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000, messageType: options?.messageType ?? 'string', icon: options?.icon },
    );
  };

  const error = (
    message: NotificationOptions['message'],
    options?: NotificationOptions['options'],
  ) => {
    invoke(
      'error',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000, messageType: options?.messageType ?? 'string', icon: options?.icon },
    );
  };

  const success = (
    message: NotificationOptions['message'],
    options?: NotificationOptions['options'],
  ) => {
    invoke(
      'success',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000, messageType: options?.messageType ?? 'string', icon: options?.icon },
    );
  };

  const warn = (
    message: NotificationOptions['message'],
    options?: NotificationOptions['options'],
  ) => {
    invoke(
      'warn',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000, messageType: options?.messageType ?? 'string', icon: options?.icon },
    );
  };

  return { info, error, success, warn };
};

export default Notification;
