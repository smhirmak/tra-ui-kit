import { Link, useLocation, useParams } from 'react-router-dom';
import { GithubLogoIcon } from '@phosphor-icons/react';
import ThemeModeToggle from '@/components/theme-mode-toggle';
import LanguageSelect from '@/components/language-select';
import VersionSelect from '@/components/version-select';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { version } = useParams<{ version: string }>();
  const versionPrefix = version ? `/${version}` : '/v1';

  return (
    <header className={cn(pathname?.includes('/components') ? 'max-w-screen' : 'container mx-auto',
      "grid grid-cols-2 md:grid-cols-4 transition-all h-16 items-center px-4 duration-300 sticky top-0 z-1 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60")}>
      <Link to={versionPrefix} className="relative flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">M</span>
        </div>
        <span className="text-xl font-bold">MSI UI Kit</span>
      </Link>

      <nav className="hidden items-center justify-center space-x-6 md:flex md:col-span-2">
        <Link to={versionPrefix} className="text-sm font-medium transition-colors hover:text-primary">
          {t('Home')}
        </Link>
        <Link to={`${versionPrefix}/installation`} className="text-sm font-medium transition-colors hover:text-primary">
          {t('Documentation')}
        </Link>
        <Link to={`${versionPrefix}/components`} className="text-sm font-medium transition-colors hover:text-primary">
          {t('Components')}
        </Link>
      </nav>

      <div className="flex items-center space-x-4 justify-end">
        <VersionSelect className="hidden md:block" />
        <Link
          to="https://github.com/smhirmak/msi-ui-kit"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block cursor-pointer! px-3 py-1.5 text-primary hover:text-primary-focused transition-colors"
        >
          <GithubLogoIcon size={20} weight="fill" />
        </Link>
        <ThemeModeToggle />
        <LanguageSelect />
      </div>
    </header>
  )
};

export default Header;
