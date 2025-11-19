import { useNotification } from '@/contexts/notification/NotificationProvider';

interface NotificationOptions {
  message: string | string[];
  options: {
    autoClose?: boolean | undefined;
    autoCloseTime?: number | undefined;
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
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000 },
    );
  };

  const error = (
    message: NotificationOptions['message'],
    options?: NotificationOptions['options'],
  ) => {
    invoke(
      'error',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000 },
    );
  };

  const success = (
    message: NotificationOptions['message'],
    options?: NotificationOptions['options'],
  ) => {
    invoke(
      'success',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000 },
    );
  };

  const warn = (
    message: NotificationOptions['message'],
    options?: NotificationOptions['options'],
  ) => {
    invoke(
      'warn',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000 },
    );
  };

  return { info, error, success, warn };
};

export default Notification;
