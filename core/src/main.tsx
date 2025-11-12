import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import LocalizeProvider from './contexts/locale/LocalizeProvider';
import { ThemeProvider } from './contexts/theme/theme-provider';
import AppProvider from './contexts/app/AppProvider';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AppProvider>
    <ThemeProvider>
      <LocalizeProvider>
        <App />
      </LocalizeProvider>
    </ThemeProvider>
  </AppProvider>,
  // </StrictMode>,
);
