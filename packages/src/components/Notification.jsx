//Kullanabilmek icin NotificationProvider ile sarmalanmasi gerekmektedir. Gerekli dosyalar context icinde yer aliyor.
import { useNotification } from '@/contexts/notification/NotificationProvider';

const Notification = () => {
  const { invoke, translateFunction } = useNotification();

  const info = (message, options) => {
    invoke(
      'info',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000 },
    );
  };

  const error = (message, options) => {
    invoke(
      'error',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000 },
    );
  };

  const success = (message, options) => {
    invoke(
      'success',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000 },
    );
  };

  const warn = (message, options) => {
    invoke(
      'warn',
      Array.isArray(message) ? message[0] : (translateFunction ? translateFunction(message) : message) || '',
      { autoClose: options?.autoClose ?? true, autoCloseTime: options?.autoCloseTime ?? 3000 },
    );
  };

  return { info, error, success, warn };
};

export default Notification;
