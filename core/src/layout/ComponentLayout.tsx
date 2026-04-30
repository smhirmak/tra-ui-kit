import { Link, Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import ScrollRestoration from '@/components/scroll-restoration';
import { motion } from 'framer-motion';
import TableOfContents from '@/components/table-of-contents';
import { useTOC } from '@/contexts/toc/TOCContext';
import Constants from '@/constants/Constants';
import { useVersion } from '@/contexts/version';
import { useEffect, useState, useMemo } from 'react';
import Button from '@/components/button';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CaretDownIcon,
  GithubLogoIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const CATEGORIES = ['Input', 'Display', 'Feedback', 'Navigation', 'Overlay', 'Layout'] as const;

const ComponentLayout = () => {
  const location = useRouterState({ select: (s) => s.location });
  const navigate = useNavigate();
  const { tocItems } = useTOC();
  const { currentVersion } = useVersion();
  const { t } = useTranslation();

  // Sidebar search with debounce
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Category open/close state — all open by default
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(CATEGORIES));
  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const sortedComponents = useMemo(
    () => Constants.componentList.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  const groupedCategories = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        name: cat,
        components: sortedComponents.filter(
          (c) =>
            c.category === cat &&
            (debouncedSearch === '' ||
              c.name.toLowerCase().includes(debouncedSearch.toLowerCase())),
        ),
      })).filter((g) => g.components.length > 0),
    [sortedComponents, debouncedSearch],
  );

  // Scroll to top on navigation

  const currentIndex =
    sortedComponents.findIndex((c) => `/v${currentVersion}${c.path}` === location.pathname) ?? -1;
  const prevComponent = sortedComponents[currentIndex - 1];
  const nextComponent = sortedComponents[currentIndex + 1];

  // GitHub source slug from pathname
  const slug = location.pathname.split('/').pop() ?? '';

  return (
    <ScrollRestoration>
      <div className="flex min-h-screen w-full">
        {/* â”€â”€ Left Sidebar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <aside className="hidden w-64 shrink-0 border-r border-border lg:block">
          <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-auto p-4">
            {/* Search */}
            <div className="relative mb-4">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-grey" />
              <input
                type="text"
                placeholder={t('Filter components...')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Category groups */}
            <nav className="space-y-2">
              {groupedCategories.map((group) => (
                <div key={group.name}>
                  <button
                    onClick={() => toggleCategory(group.name)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-grey transition-colors hover:text-foreground"
                  >
                    {t(group.name)}
                    <CaretDownIcon
                      className={cn(
                        'size-3 transition-transform duration-200',
                        openCategories.has(group.name) ? 'rotate-0' : '-rotate-90',
                      )}
                    />
                  </button>

                  {openCategories.has(group.name) && (
                    <div className="mt-0.5 space-y-0.5">
                      {group.components.map((component) => {
                        const active = location.pathname === `/v${currentVersion}${component.path}`;
                        return (
                          <Link
                            key={component.path}
                            to={`/v${currentVersion}${component.path}` as any}
                            className={cn(
                              'flex items-center gap-1.5 rounded-md border-l-2 py-1.5 pl-3 pr-2 text-sm transition-colors',
                              active
                                ? 'border-primary bg-primary/12 font-semibold text-primary rounded-l-none'
                                : 'border-transparent text-neutral-grey hover:border-neutral hover:bg-neutral-light hover:text-foreground',
                            )}
                          >
                            {component.name}
                            {(component as any).isNew && (
                              <span className="ml-auto rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                                {t('New')}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* â”€â”€ Main Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <main className="relative flex-1 px-6 py-12 pb-16 md:pb-24 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-neutral dark:prose-invert mx-auto max-w-4xl"
          >
            <Outlet />

            {/* Edit on GitHub */}
            {slug && (
              <div className="mt-16 flex items-center gap-2 border-t border-border pt-6 text-sm text-neutral-grey">
                <a
                  href={`https://github.com/smhirmak/msi-ui-kit/blob/main/core/registry/msi-kit/components/${slug}.tsx`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors hover:text-primary"
                >
                  <GithubLogoIcon
                    size={15}
                    weight="fill"
                  />
                  {t('View source on GitHub')}
                </a>
              </div>
            )}
          </motion.div>

          {/* Desktop floating prev/next */}
          <div className="fixed bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {prevComponent && (
              <Button
                size="sm"
                className="h-8 gap-2 cursor-pointer bg-background border-gradient-primary text-foreground text-sm font-medium hover:brightness-110"
                onClick={() => navigate({ to: `/v${currentVersion}${prevComponent.path}` as any })}
              >
                <ArrowLeftIcon className="size-4" />
                {prevComponent.name}
              </Button>
            )}
            {nextComponent && (
              <Button
                size="sm"
                className="h-8 gap-2 cursor-pointer bg-background border-gradient-secondary text-foreground text-sm font-medium hover:brightness-110"
                onClick={() => navigate({ to: `/v${currentVersion}${nextComponent.path}` as any })}
              >
                {nextComponent.name}
                <ArrowRightIcon className="size-4" />
              </Button>
            )}
          </div>

          {/* Mobile bottom bar prev/next */}
          <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between border-t border-border bg-background/97 px-4 py-2.5 backdrop-blur md:hidden">
            {prevComponent ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 max-w-[45%] gap-1.5 text-sm"
                onClick={() => navigate({ to: `/v${currentVersion}${prevComponent.path}` as any })}
              >
                <ArrowLeftIcon className="size-4 shrink-0" />
                <span className="truncate">{prevComponent.name}</span>
              </Button>
            ) : (
              <div />
            )}
            {nextComponent ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 max-w-[45%] gap-1.5 text-sm"
                onClick={() => navigate({ to: `/v${currentVersion}${nextComponent.path}` as any })}
              >
                <span className="truncate">{nextComponent.name}</span>
                <ArrowRightIcon className="size-4 shrink-0" />
              </Button>
            ) : (
              <div />
            )}
          </div>
        </main>

        {/* â”€â”€ Right TOC â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <aside className="hidden w-64 shrink-0 border-l border-border xl:block">
          <div className="sticky top-20 p-6">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      </div>
    </ScrollRestoration>
  );
};

export default ComponentLayout;
