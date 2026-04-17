import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import Button from '@/components/button';
import {
  SparkleIcon, MoonIcon, ShieldCheckIcon, PaletteIcon, AtomIcon, FeatherIcon, ArrowRightIcon,
} from '@phosphor-icons/react';
import Constants from '@/constants/Constants';
import { useTranslation } from 'react-i18next';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useVersion } from '@/contexts/version';
import Badge from '@/components/badge';
import Chip from '@/components/chip';
import Checkbox from '@/components/checkbox';
import Switch from '@/components/switch';
import { Avatar } from '@/components/avatar';
import Tooltip from '@/components/tooltip';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

const Home = () => {
  const { t } = useTranslation();
  const { currentVersion } = useVersion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  const features = [
    { title: 'Modern Design', description: 'Clean, contemporary UI components built with Tailwind CSS', Icon: SparkleIcon },
    { title: 'Dark Mode', description: 'Fully supported dark theme for comfortable viewing', Icon: MoonIcon },
    { title: 'Type Safe', description: 'Built with TypeScript for robust development', Icon: ShieldCheckIcon },
    { title: 'Customizable', description: 'Easy to customize with CSS variables and props', Icon: PaletteIcon },
    { title: 'Production Ready', description: 'Well-tested components with comprehensive documentation and examples', Icon: AtomIcon },
    { title: 'Lightweight', description: 'Minimal footprint for fast load times and responsive apps', Icon: FeatherIcon },
  ];

  return (
    <div className="min-h-screen">

      {/* -- Hero --------------------------------------------- */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Version badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-sm text-primary"
          >
            <SparkleIcon size={13} weight="fill" />
            <span>{t('v1.0 ï¿½ React Component Library')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 bg-linear-to-r from-primary via-primary-focused to-secondary bg-clip-text text-6xl font-bold text-transparent sm:text-7xl md:text-8xl lg:text-9xl"
          >
            MSI UI Kit
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 text-xl text-neutral-grey md:text-2xl"
          >
            {t('A comprehensive React component library for modern web applications')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10 text-base text-neutral-grey/75 md:text-lg"
          >
            {t('Beautifully crafted components ï¿½ TypeScript ï¿½ Dark Mode ï¿½ Fully customizable')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/$version/installation" params={{ version: `v${currentVersion}` }}>
              <Button size="lg" className="w-full gap-2 sm:w-auto">
                <ArrowRightIcon size={18} weight="bold" />
                {t('Get Started')}
              </Button>
            </Link>
            <a href="https://github.com/smhirmak/msi-ui-kit" target="_blank" rel="noopener noreferrer">
              <Button variant="outlined" size="lg" className="w-full sm:w-auto">
                {t('View on GitHub')}
              </Button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {[
              { value: '34+', label: t('Components') },
              { value: '100%', label: 'TypeScript' },
              { value: 'Tailwind v4', label: t('CSS Framework') },
              { value: 'MIT', label: t('License') },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-neutral-grey">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Background blobs ï¿½ hidden on mobile */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'transform, opacity' }}
            className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl hidden md:block"
          />
          <motion.div
            animate={prefersReducedMotion ? {} : { scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            style={{ willChange: 'transform, opacity' }}
            className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl hidden md:block"
          />

          {/* Floating decorations ï¿½ hidden on mobile */}
          <div className="hidden md:block">
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -20, 0], opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute left-[10%] top-[20%] blur-[1px]"
            >
              <Badge variant="rectangular" text="New" />
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 25, 0], rotate: [0, 5, 0], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute right-[15%] top-[15%] scale-75 blur-[1px]"
            >
              <Chip label="React" />
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { x: [-10, 10, -10], opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute left-[15%] bottom-[25%] blur-[1px]"
            >
              <Avatar title="MSI" />
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -15, 0], x: [0, 10, 0], opacity: [0.2, 0.32, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute right-[12%] bottom-[20%] scale-90 blur-[1px]"
            >
              <Button size="sm" variant="outlined">Click me</Button>
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -20, 0], scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute right-[25%] top-[35%] blur-[1px]"
            >
              <div className="flex items-center gap-2">
                <Checkbox checked />
                <span className="text-sm text-foreground/50">Checked</span>
              </div>
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { x: [0, 15, 0], opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute left-[8%] top-[60%] blur-[1px]"
            >
              <Switch checked />
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 20, 0], rotate: [0, -5, 0], opacity: [0.2, 0.32, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute right-[8%] bottom-[35%] blur-[1px]"
            >
              <Tooltip content="Tooltip">
                <Badge variant="circular" text="Hover" />
              </Tooltip>
            </motion.div>

            <motion.div
              animate={prefersReducedMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.15, 0.28, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
              style={{ willChange: 'transform, opacity' }}
              className="absolute left-[25%] bottom-[15%] blur-[1px]"
            >
              <div className="flex gap-2">
                <Badge variant="rectangular" color="success" text="Success" />
                <Badge variant="rectangular" color="error" text="Error" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- Social Proof Banner -------------------------------- */}
      <section className="border-y border-border/60 bg-neutral-dark-white/50 px-4 py-10 dark:bg-neutral-light/5">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {[
              { value: '34+', label: t('Components') },
              { value: '100%', label: 'TypeScript' },
              { value: 'Tailwind v4', label: t('CSS Framework') },
              { value: 'MIT', label: t('License') },
            ].map((stat, i, arr) => (
              <div key={i} className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-sm text-neutral-grey">{stat.label}</p>
                </div>
                {i < arr.length - 1 && <div className="hidden h-10 w-px bg-border sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Features ------------------------------------------- */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl">{t('Why MSI UI Kit?')}</h2>
            <p className="mb-16 text-center text-lg text-neutral-grey">
              {t('Everything you need to build beautiful React applications')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="group rounded-2xl border border-transparent bg-background p-6 shadow-soft-primary transition-all duration-300 hover:border-primary/20 hover:shadow-hard-primary"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <feature.Icon size={24} weight="duotone" className="text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{t(feature.title)}</h3>
                <p className="text-neutral-grey">{t(feature.description)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* -- Explore Components --------------------------------- */}
      <section className="bg-neutral-dark-white/50 px-4 py-24 dark:bg-neutral-light/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl">{t('Explore Components')}</h2>
            <p className="mb-16 text-center text-lg text-neutral-grey">
              {t('Production-ready components to accelerate your development')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {Constants.componentList
              ?.filter((component) => component.isShowHome)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((component, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}>
                  <Link
                    to={`/v${currentVersion}${component.path}` as any}
                    className="group block h-full rounded-xl border border-transparent bg-background p-5 shadow-soft-primary transition-all duration-300 hover:border-primary/20 hover:shadow-hard-primary"
                  >
                    <component.Icon size={32} weight="duotone" className="mb-3 text-primary transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="mb-1.5 text-lg font-semibold">{component.name}</h3>
                    <p className="text-sm text-neutral-grey">{component.description}</p>
                  </Link>
                </motion.div>
              ))}
          </motion.div>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/$version/components" params={{ version: `v${currentVersion}` }}>
              <Button variant="outlined" size="lg">{t('Show All Components')}</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* -- Quick Start ---------------------------------------- */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl">{t('Quick Start')}</h2>
            <p className="mb-12 text-center text-lg text-neutral-grey">
              {t('Get up and running in less than a minute')}
            </p>

            <div className="space-y-5">
              {[
                { step: 1, label: t('Initialize MSI UI Kit'), code: 'npx msi-ui-cli init' },
                { step: 2, label: t('Add components'), code: 'npx msi-ui-cli add button input select' },
              ].map(({ step, label, code }) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: step * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-sm">
                    {step}
                  </div>
                  <div className="flex-1 rounded-xl border border-border bg-neutral-dark-white/50 p-5 dark:bg-neutral-light/5">
                    <p className="mb-3 text-sm font-medium text-neutral-grey">{label}</p>
                    <CustomSyntaxHighlighter content={code} />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/$version/installation" params={{ version: `v${currentVersion}` }}>
                <Button size="lg">{t('View Full Documentation')}</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* -- CTA ----------------------------------------------- */}
      <section className="px-4 pb-24 pt-4">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-primary/20 bg-linear-to-br from-primary/8 via-background to-secondary/8 p-10 text-center shadow-soft-primary"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t('Ready to get started?')}</h2>
            <p className="mb-8 text-lg text-neutral-grey">
              {t('Start building with MSI UI Kit today and deliver beautiful, accessible React applications faster.')}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/$version/installation" params={{ version: `v${currentVersion}` }}>
                <Button size="lg" className="w-full sm:w-auto">{t('Get Started for Free')}</Button>
              </Link>
              <Link to="/$version/components" params={{ version: `v${currentVersion}` }}>
                <Button variant="outlined" size="lg" className="w-full sm:w-auto">{t('View All Components')}</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;


