import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import Constants from '@/constants/Constants';
import { useVersion } from '@/contexts/version';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import ScrollRestoration from '@/components/scroll-restoration';

const ComponentsOverview = () => {
  const { currentVersion } = useVersion();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  } as any;

  const CATEGORIES = [
    { name: 'Input', color: 'primary' },
    { name: 'Display', color: 'secondary' },
    { name: 'Feedback', color: 'tertiary' },
    { name: 'Navigation', color: 'primary' },
    { name: 'Overlay', color: 'secondary' },
    { name: 'Layout', color: 'tertiary' },
  ];

  // Search with debounce
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Active category pill (click-based)
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const groupedComponents = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        ...category,
        components: Constants.componentList.filter(
          (c) =>
            c.category === category.name &&
            (debouncedSearch === '' ||
              c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              c.description.toLowerCase().includes(debouncedSearch.toLowerCase())),
        ),
      })).filter((g) => g.components.length > 0),
    [debouncedSearch],
  );

  const handleCategoryClick = (categoryName: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveCategory(categoryName);
    const id = categoryName.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <ScrollRestoration>
      <div className="min-h-screen px-6 py-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl"
        >
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="mb-4 bg-linear-to-r from-primary via-primary-focused via-40% to-70% to-secondary bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              {t('All Components')}
            </h1>
            <p className="text-lg text-neutral-grey md:text-xl">
              {t('Browse our complete collection of {{count}} production-ready React components', {
                count: Constants.componentList.length,
              })}
            </p>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mx-auto mb-8 max-w-md"
          >
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-neutral-grey" />
            <input
              type="text"
              placeholder={t('Filter components...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm shadow-soft-grey outline-none transition-all focus:border-primary focus:shadow-soft-primary focus:ring-1 focus:ring-primary"
            />
          </motion.div>

          {/* Category Pills */}
          {debouncedSearch === '' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-6"
            >
              {CATEGORIES.map((category) => {
                const count = Constants.componentList.filter(
                  (c) => c.category === category.name,
                ).length;
                const isActive = activeCategory === category.name;
                return (
                  <a
                    href={`#${category.name.toLowerCase()}`}
                    onClick={(e) => handleCategoryClick(category.name, e)}
                    key={category.name}
                    className={cn(
                      'group rounded-xl p-4 text-center transition-all duration-200',
                      isActive
                        ? 'bg-primary text-white shadow-soft-primary'
                        : 'bg-background shadow-soft-grey hover:bg-primary/5 hover:shadow-hard-primary',
                    )}
                  >
                    <div
                      className={cn(
                        'mb-1 text-2xl font-bold transition-colors',
                        isActive ? 'text-white' : 'text-primary group-hover:text-primary-focused',
                      )}
                    >
                      {count}
                    </div>
                    <div
                      className={cn(
                        'text-sm transition-colors',
                        isActive
                          ? 'text-white/90'
                          : 'text-neutral-grey group-hover:text-foreground',
                      )}
                    >
                      {t(category.name)}
                    </div>
                  </a>
                );
              })}
            </motion.div>
          )}

          {/* No results */}
          {groupedComponents.length === 0 && (
            <div className="mt-20 text-center">
              <p className="text-xl font-medium text-foreground">{t('No components found')}</p>
              <p className="mt-2 text-neutral-grey">{t('Try a different search term')}</p>
            </div>
          )}

          {/* Components by Category */}
          {groupedComponents.map((group, groupIndex) => (
            <motion.section
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + groupIndex * 0.08 }}
              className="pt-16"
              id={group.name.toLowerCase()}
            >
              <div className="mb-6 flex items-center gap-3">
                <h2 className="text-3xl font-bold">{t(group.name)}</h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {group.components.length}
                </span>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {group.components.map((component) => (
                  <motion.div
                    key={component.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, y: -2 }}
                  >
                    <Link
                      to={`/v${currentVersion}${component.path}` as any}
                      className="group relative block h-full rounded-xl border border-transparent bg-background p-6 shadow-soft-grey transition-all duration-300 hover:border-primary/20 hover:shadow-hard-primary"
                    >
                      {(component as any).isNew && (
                        <span className="absolute right-3 top-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                          {t('New')}
                        </span>
                      )}
                      <component.Icon
                        size={40}
                        weight="duotone"
                        className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110"
                      />
                      <h3 className="mb-2 text-lg font-semibold">{component.name}</h3>
                      <p className="text-sm text-neutral-grey">{t(component.description)}</p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          ))}
        </motion.div>
      </div>
    </ScrollRestoration>
  );
};

export default ComponentsOverview;
