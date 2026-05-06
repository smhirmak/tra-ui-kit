import { Link, Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import ScrollRestoration from '@/components/scroll-restoration';
import { motion } from 'framer-motion';
import TableOfContents from '@/components/table-of-contents';
import { useTOC } from '@/contexts/toc/TOCContext';
import Constants from '@/constants/Constants';
import { useVersion } from '@/contexts/version';
import Button from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const PluginLayout = () => {
  const location = useRouterState({ select: (s) => s.location });
  const navigate = useNavigate();
  const { tocItems } = useTOC();
  const { currentVersion } = useVersion();
  const { t } = useTranslation();

  const plugins = Constants.pluginList;

  const currentIndex =
    plugins.findIndex((p) => `/v${currentVersion}${p.path}` === location.pathname) ?? -1;
  const prevPlugin = plugins[currentIndex - 1];
  const nextPlugin = plugins[currentIndex + 1];

  // GitHub source slug from pathname
  const slug = location.pathname.split('/').pop() ?? '';

  return (
    <ScrollRestoration>
      <div className="flex min-h-screen w-full">
        {/* ── Left Sidebar ─────────────────────────────────── */}
        <aside className="hidden w-64 shrink-0 border-r border-border lg:block">
          <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-auto p-4">
            <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-grey">
              {t('Plugins')}
            </p>

            {/* Plugin list */}
            <nav className="mt-0.5 space-y-0.5">
              {plugins.map((plugin) => {
                const active = location.pathname === `/v${currentVersion}${plugin.path}`;
                return (
                  <Link
                    key={plugin.path}
                    to={`/v${currentVersion}${plugin.path}` as any}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md border-l-2 py-1.5 pl-3 pr-2 text-sm transition-colors',
                      active
                        ? 'border-primary bg-primary/12 font-semibold text-primary rounded-l-none'
                        : 'border-transparent text-neutral-grey hover:border-neutral hover:bg-neutral-light hover:text-foreground',
                    )}
                  >
                    {plugin.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────── */}
        <main className="relative flex-1 px-6 py-12 pb-16 md:pb-24 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-neutral dark:prose-invert mx-auto max-w-4xl"
          >
            <Outlet />

            {/* View source on GitHub */}
            {slug && slug !== 'plugins' && (
              <div className="mt-16 flex items-center justify-end gap-2 border-t border-border pt-6 text-sm text-neutral-grey">
                <a
                  href={`https://github.com/smhirmak/tra-ui-base/tree/develop/core/registry/tra-plugins/${slug}`}
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
            {prevPlugin && (
              <Button
                size="sm"
                className="h-8 gap-2 cursor-pointer bg-background border-gradient-primary text-foreground text-sm font-medium hover:brightness-110"
                onClick={() => navigate({ to: `/v${currentVersion}${prevPlugin.path}` as any })}
              >
                <ArrowLeftIcon className="size-4" />
                {prevPlugin.name}
              </Button>
            )}
            {nextPlugin && (
              <Button
                size="sm"
                className="h-8 gap-2 cursor-pointer bg-background border-gradient-secondary text-foreground text-sm font-medium hover:brightness-110"
                onClick={() => navigate({ to: `/v${currentVersion}${nextPlugin.path}` as any })}
              >
                {nextPlugin.name}
                <ArrowRightIcon className="size-4" />
              </Button>
            )}
          </div>

          {/* Mobile bottom bar prev/next */}
          <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between border-t border-border bg-background/97 px-4 py-2.5 backdrop-blur md:hidden">
            {prevPlugin ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 max-w-[45%] gap-1.5 text-sm"
                onClick={() => navigate({ to: `/v${currentVersion}${prevPlugin.path}` as any })}
              >
                <ArrowLeftIcon className="size-4 shrink-0" />
                <span className="truncate">{prevPlugin.name}</span>
              </Button>
            ) : (
              <div />
            )}
            {nextPlugin ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 max-w-[45%] gap-1.5 text-sm"
                onClick={() => navigate({ to: `/v${currentVersion}${nextPlugin.path}` as any })}
              >
                <span className="truncate">{nextPlugin.name}</span>
                <ArrowRightIcon className="size-4 shrink-0" />
              </Button>
            ) : (
              <div />
            )}
          </div>
        </main>

        {/* ── Right TOC ────────────────────────────────────── */}
        <aside className="hidden w-64 shrink-0 border-l border-border xl:block">
          <div className="sticky top-20 p-6">
            <TableOfContents items={tocItems} />
          </div>
        </aside>
      </div>
    </ScrollRestoration>
  );
};

export default PluginLayout;
