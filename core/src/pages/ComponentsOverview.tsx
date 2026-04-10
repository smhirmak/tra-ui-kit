import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Constants from '@/constants/Constants';
import { useVersion } from '@/contexts/version';
import { useTranslation } from 'react-i18next';

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

  const categories = [
    { name: 'Input', color: 'primary' },
    { name: 'Display', color: 'secondary' },
    { name: 'Feedback', color: 'tertiary' },
    { name: 'Navigation', color: 'primary' },
    { name: 'Overlay', color: 'secondary' },
    { name: 'Layout', color: 'tertiary' },
  ];

  const groupedComponents = categories.map((category) => ({
    ...category,
    components: Constants.componentList.filter((c) => c.category === category.name),
  }));

  return (
    <div className="min-h-screen px-6 py-12 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl"
      >
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-linear-to-r from-primary via-primary-focused via-40% to-70% to-secondary bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            {t('All Components')}
          </h1>
          <p className="text-lg text-neutral-grey md:text-xl">
            {t('Browse our complete collection of {{count}} production-ready React components', { count: Constants.componentList.length })}
          </p>
        </div>

        {/* Category Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {categories.map((category) => {
            const count = Constants.componentList.filter((c) => c.category === category.name).length;
            return (
              <Link
                to={`#${category.name.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  const id = category.name.toLowerCase();
                  const el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  if (window.history && window.history.pushState) {
                    window.history.pushState(null, '', `#${id}`);
                  } else {
                    window.location.hash = `#${id}`;
                  }
                }}
                key={category.name}
                className="group rounded-lg shadow-soft-grey bg-background p-4 text-center hover:bg-neutral-light/10 hover:shadow-hard-primary transition-colors"
              >
                <div className="mb-1 text-2xl font-bold text-primary group-hover:text-primary-focused transition-colors">{count}</div>
                <div className="text-sm text-neutral-grey group-hover:text-neutral-black transition-colors">{t(category.name)}</div>
              </Link>
            );
          })}
        </motion.div>

        {/* Components by Category */}
        {groupedComponents.map((group, groupIndex) => (
          <motion.section
            key={group.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + groupIndex * 0.1 }}
            className="pt-20"
            id={group.name.toLowerCase()}
          >
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-3xl font-bold">{group.name}</h2>
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
                <motion.div key={component.name} variants={itemVariants} whileHover={{ scale: 1.03 }}>
                  <Link
                    to={`/v${currentVersion}${component.path}`}
                    className="group block h-full rounded-xl shadow-soft-grey bg-background p-6 transition-all duration-300 hover:shadow-hard-primary"
                  >
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
  );
};

export default ComponentsOverview;
