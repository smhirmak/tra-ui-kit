import { createContext, useContext } from 'react';
import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/constants/languages/en';
import tr from '@/constants/languages/tr';

const resources = {
  en: { translation: en },
  tr: { translation: tr },
};

const savedLang = localStorage.getItem('lang') || 'tr';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
    defaultValue: (key: any) => key,
  } as InitOptions);

  interface LocalizeContextType {
    i18n: typeof i18n;
    toggleLanguage: (lang: string) => void;
    t: (key: any) => string;
    setLocale: (lang: string) => void;
    locale: string;
  }

const LocalizeContext = createContext<LocalizeContextType>({
  i18n,
  toggleLanguage: () => {},
  t: (key: any) => i18n.t(key, { defaultValue: key }),
  setLocale: () => {},
  locale: savedLang,
});

const useLocalizeContext = () => useContext(LocalizeContext);

export { LocalizeContext, useLocalizeContext };
