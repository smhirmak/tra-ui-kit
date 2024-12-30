import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface AppContextType {
  notificationTheme: 'colored' | 'lined' | 'default';
  setNotificationTheme: (theme: 'colored' | 'lined' | 'default') => void;
  notificationMode: 'dark' | 'light';
  setNotificationMode: (mode: 'dark' | 'light') => void;
  notificationAnimateMode: 'bounce' | 'slide' | 'flip' | false;
  setNotificationAnimateMode: (mode: 'bounce' | 'slide' | 'flip' | false) => void;
  notificationPosition: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  setNotificationPosition: (position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left') => void;
}

const defaultAppContext: AppContextType = {
  notificationTheme: 'default',
  setNotificationTheme: () => {},
  notificationMode: 'light',
  setNotificationMode: () => {},
  notificationAnimateMode: 'bounce',
  setNotificationAnimateMode: () => {},
  notificationPosition: 'top-right',
  setNotificationPosition: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notificationTheme, setNotificationTheme] = useState<'colored' | 'lined' | 'default'>('default');
  const [notificationMode, setNotificationMode] = useState<'dark' | 'light'>('light');
  const [notificationAnimateMode, setNotificationAnimateMode] = useState<'bounce' | 'slide' | 'flip' | false>('bounce');
  const [notificationPosition, setNotificationPosition] = useState<'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'>('top-right');
  const value = useMemo(() => ({
    notificationTheme,
    setNotificationTheme,
    notificationMode,
    setNotificationMode,
    notificationAnimateMode,
    setNotificationAnimateMode,
    notificationPosition,
    setNotificationPosition,
  }), [notificationTheme, notificationMode, notificationAnimateMode, notificationPosition]);
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
