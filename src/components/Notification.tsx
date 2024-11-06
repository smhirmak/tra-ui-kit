import { useNotification } from '@/contexts/notification/NotificationProvider';

const Notification = () => {
  const { invoke } = useNotification();

  interface NotificationOptions {
    message: string | string[];
    autoClose?: boolean;
    autoCloseTime?: number;
  }

  const info = (
    message: NotificationOptions['message'],
    autoClose?: NotificationOptions['autoClose'],
    autoCloseTime?: NotificationOptions['autoCloseTime'],
  ) => {
    invoke('info', Array.isArray(message) ? message[0] : message, autoClose, autoCloseTime);
  };

  const error = (
    message: NotificationOptions['message'],
    autoClose?: NotificationOptions['autoClose'],
    autoCloseTime?: NotificationOptions['autoCloseTime'],
  ) => {
    invoke('error', Array.isArray(message) ? message[0] : message, autoClose, autoCloseTime);
  };

  const success = (
    message: NotificationOptions['message'],
    autoClose?: NotificationOptions['autoClose'],
    autoCloseTime?: NotificationOptions['autoCloseTime'],
  ) => {
    invoke('success', Array.isArray(message) ? message[0] : message, autoClose, autoCloseTime);
  };

  const warn = (
    message: NotificationOptions['message'],
    autoClose?: NotificationOptions['autoClose'],
    autoCloseTime?: NotificationOptions['autoCloseTime'],
  ) => {
    invoke('warn', Array.isArray(message) ? message[0] : message, autoClose, autoCloseTime);
  };

  return { info, error, success, warn };
};

export default Notification;
