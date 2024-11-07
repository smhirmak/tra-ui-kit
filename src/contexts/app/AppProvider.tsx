import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

const AppContext = createContext({});

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
