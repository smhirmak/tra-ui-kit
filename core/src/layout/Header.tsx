import { Link, useLocation } from 'react-router-dom';
import { GithubLogoIcon } from '@phosphor-icons/react';
import ThemeModeToggle from '@/components/theme-mode-toggle';
import LanguageSelect from '@/components/language-select';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-1 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className={cn(pathname?.includes('/components') ? 'max-w-screen' : 'container', " transition-all mx-auto flex h-16 items-center justify-between px-4 duration-300")}>
        {/* Logo */}
        <Link to="/" className="relative flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">M</span>
          </div>
          <span className="text-xl font-bold">MSI UI Kit</span>
          <span className='text-sm absolute top-0 -right-2.5 text-secondary font-medium'>v0</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            {t('Home')}
          </Link>
          <Link to="/installation" className="text-sm font-medium transition-colors hover:text-primary">
            {t('Documentation')}
          </Link>
          <Link to="/components" className="text-sm font-medium transition-colors hover:text-primary">
            {t('Components')}
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <Link
            to="https://github.com/smhirmak/msi-ui-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block cursor-pointer! px-3 py-1.5 text-primary hover:text-primary-focused transition-colors"
          >
            {/* <Button variant="ghost" size="sm"> */}
            <GithubLogoIcon size={20} weight="fill" />
            {/* </Button> */}
          </Link>
          <ThemeModeToggle />
          <LanguageSelect />
        </div>
      </div>
    </header>
  )
};

export default Header;
