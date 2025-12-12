import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import Button from '@/components/button';

interface IThemeModeToggle {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeModeToggle = ({ theme, setTheme }: IThemeModeToggle) => {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="outlined" className="relative" disableEffect size="icon" onClick={toggleTheme}>
      <MoonIcon className="size-[1.3rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <SunIcon className="absolute top-1/2 size-[1.2rem] -translate-y-1/2 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default ThemeModeToggle;
