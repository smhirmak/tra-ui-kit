import { useEffect, useState } from 'react';
import { Link, useRouterState, useParams } from '@tanstack/react-router';
import { GithubLogoIcon, ListIcon, XIcon } from '@phosphor-icons/react';
import ThemeModeToggle from '@/components/ui/theme-mode-toggle';
import LanguageSelect from '@/components/ui/language-select';
import VersionSelect from '@/components/version-select';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';

const MsiLogo = () => (
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary shadow-soft-primary">
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 17L6.8 3L11 10.5L15.2 3L20 17"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const Header = () => {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { version } = useParams({ strict: false });
  const versionPrefix = version ? `/${version}` : '/v1';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale } = useLocalizeContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path: string) => {
    if (path === versionPrefix) {
      return pathname === versionPrefix || pathname === `${versionPrefix}/`;
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { to: versionPrefix, label: t('Home') },
    { to: `${versionPrefix}/installation`, label: t('Documentation') },
    { to: `${versionPrefix}/components`, label: t('Components') },
  ];

  return (
    <>
      <header
        className={cn(
          pathname?.includes('/components') ? 'max-w-screen' : 'container mx-auto',
          'isolate grid grid-cols-2 md:grid-cols-4 transition-all h-16 items-center px-4 duration-300 sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60',
          scrolled && 'shadow-soft-grey',
        )}
      >
        {/* Logo */}
        <Link
          to={versionPrefix}
          className="relative flex items-center gap-2.5"
        >
          <MsiLogo />
          <span className="text-xl font-bold tracking-tight">MSI UI Kit</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center justify-center space-x-1 md:flex md:col-span-2">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                isActive(to)
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary hover:bg-neutral-light',
              )}
            >
              {label}
              {isActive(to) && (
                <motion.div
                  layoutId="nav-active-indicator"
                  className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center space-x-2 justify-end">
          <VersionSelect className="hidden md:block" />
          <a
            href="https://github.com/smhirmak/msi-ui-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex cursor-pointer! px-3 py-1.5 text-neutral-grey hover:text-primary transition-colors rounded-md hover:bg-neutral-light"
          >
            <GithubLogoIcon
              size={20}
              weight="fill"
            />
          </a>
          <ThemeModeToggle />
          <LanguageSelect
            locale={locale}
            setLocale={setLocale}
            defaultValue="en"
          />
          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={menuOpen ? t('Close menu') : t('Open menu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center rounded-md p-1.5 text-foreground transition-colors hover:bg-neutral-light"
          >
            {menuOpen ? <XIcon size={22} /> : <ListIcon size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed left-0 right-0 top-16 z-40 overflow-hidden border-b border-border bg-background/97 backdrop-blur md:hidden"
          >
            <div className="px-4 py-4">
              <nav className="flex flex-col space-y-0.5">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeMenu}
                    className={cn(
                      'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive(to)
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-neutral-light hover:text-primary',
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <VersionSelect />
                <a
                  href="https://github.com/smhirmak/msi-ui-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-grey transition-colors hover:text-primary"
                >
                  <GithubLogoIcon
                    size={18}
                    weight="fill"
                  />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
