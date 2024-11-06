import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import LocalizeProvider from './contexts/locale/LocalizeProvider';
import { ThemeProvider } from './contexts/theme/theme-provider';
import { NotificationProvider } from './contexts/notification/NotificationProvider';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider>
    <LocalizeProvider>
      <NotificationProvider newestTop closeIcon>
        <App />
      </NotificationProvider>
    </LocalizeProvider>
  </ThemeProvider>,
  // </StrictMode>,
);
