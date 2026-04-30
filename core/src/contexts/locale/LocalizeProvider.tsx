import { ReactNode, useEffect, useMemo, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { LocalizeContext } from './LocalizeContext';

const LocalizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(localStorage.getItem('lang') || 'tr');
  const { t: Translate } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
    localStorage.setItem('lang', locale);
  }, [locale]);

  const toggleLanguage = (lang: string) => {
    setLocale(lang);
  };

  // const t = (key: any) => i18n.t(key, { defaultValue: key });
  const t = (key: string) => Translate(key);

  const contextValue = useMemo(
    () => ({ i18n, locale, setLocale, toggleLanguage, t }),
    [locale, Translate],
  );

  return <LocalizeContext.Provider value={contextValue}>{children}</LocalizeContext.Provider>;
};

export default LocalizeProvider;
