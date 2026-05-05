import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import {
  SparkleIcon,
  MoonIcon,
  ShieldCheckIcon,
  PaletteIcon,
  AtomIcon,
  FeatherIcon,
  ArrowRightIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@phosphor-icons/react';
import Constants from '@/constants/Constants';
import { useTranslation } from 'react-i18next';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useVersion } from '@/contexts/version';
import Badge from '@/components/ui/badge';
import Chip from '@/components/ui/chip';
import Switch from '@/components/ui/switch';
import { Avatar } from '@/components/ui/avatar';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

const UIPreviewPanel = () => (
  <div className="relative w-full select-none overflow-hidden rounded-2xl border border-border bg-background shadow-hard-primary">
    <div className="flex items-center gap-2 border-b border-border bg-neutral-dark-white/60 px-4 py-3 dark:bg-neutral-light/5">
      <span className="h-3 w-3 rounded-full bg-error/70" />
      <span className="h-3 w-3 rounded-full bg-warning/70" />
      <span className="h-3 w-3 rounded-full bg-success/70" />
      <span className="ml-3 flex-1 rounded-md bg-border/60 px-3 py-1 text-xs text-neutral-grey/60">
        app.example.com/dashboard
      </span>
      <BellIcon
        size={14}
        className="text-neutral-grey/50"
      />
    </div>

    <div className="flex h-90">
      <div className="flex w-14 flex-col items-center gap-4 border-r border-border py-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <ChartBarIcon
            size={14}
            weight="fill"
            className="text-white"
          />
        </div>
        {[UserIcon, MagnifyingGlassIcon, BellIcon].map((Icon, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center"
          >
            {i === 0 && <span className="absolute -left-3.5 h-4 w-0.5 rounded-full bg-primary" />}
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${i === 0 ? 'bg-primary/10 text-primary' : 'text-neutral-grey hover:bg-primary/5'}`}
            >
              <Icon size={14} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-hidden p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-neutral-grey">Dashboard</p>
            <p className="text-sm font-semibold text-foreground">Good morning, Alex</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="rectangular"
              color="success"
              text="Live"
              size="sm"
            />
            <Avatar
              title="AL"
              size="sm"
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            { label: 'Revenue', value: '$24.5k', delta: '+12%', up: true },
            { label: 'Users', value: '1,847', delta: '+4%', up: true },
            { label: 'Bounce', value: '32%', delta: '-2%', up: false },
          ].map((s, si) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-neutral-dark-white/40 p-3 dark:bg-neutral-light/5"
            >
              <p className="mb-1 text-[10px] text-neutral-grey">{s.label}</p>
              <p className="text-sm font-bold text-foreground">{s.value}</p>
              {si === 0 ? (
                <svg
                  viewBox="0 0 40 10"
                  className="mt-1.5 h-2.5 w-full"
                >
                  {[3, 5, 4, 7, 5, 9, 8].map((h, i) => (
                    <rect
                      key={i}
                      x={i * 6}
                      y={10 - h}
                      width={4}
                      height={h}
                      rx={0.5}
                      className={i >= 5 ? 'fill-success/80' : 'fill-success/22'}
                    />
                  ))}
                </svg>
              ) : (
                <div
                  className={`mt-0.5 flex items-center gap-0.5 text-[10px] font-medium ${s.up ? 'text-success' : 'text-error'}`}
                >
                  {s.up ? (
                    <ArrowUpIcon
                      size={9}
                      weight="bold"
                    />
                  ) : (
                    <ArrowDownIcon
                      size={9}
                      weight="bold"
                    />
                  )}
                  {s.delta}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-neutral-dark-white/40 p-3 dark:bg-neutral-light/5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground">Recent Activity</p>
            <Chip
              label="Today"
              size="sm"
            />
          </div>
          <div className="space-y-2">
            {[
              {
                name: 'Sara K.',
                action: 'Submitted a report',
                time: '2m ago',
                color: 'bg-primary',
              },
              {
                name: 'John D.',
                action: 'Updated settings',
                time: '14m ago',
                color: 'bg-secondary',
              },
              { name: 'Maria L.', action: 'Joined team', time: '1h ago', color: 'bg-success' },
            ].map((row) => (
              <div
                key={row.name}
                className="flex items-center gap-2 hover:bg-neutral-light dark:hover:bg-neutral-light/50 transition-all"
              >
                <div
                  className={`h-6 w-6 shrink-0 rounded-full ${row.color} flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {row.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium text-foreground">
                    {row.name} <span className="font-normal text-neutral-grey">{row.action}</span>
                  </p>
                </div>
                <span className="shrink-0 text-[10px] text-neutral-grey">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden w-44 flex-col gap-3 border-l border-border p-4 xl:flex">
        <p className="text-xs font-semibold text-foreground">Quick Actions</p>
        <Button
          size="sm"
          className="w-full justify-start gap-2 text-xs"
        >
          <UserIcon size={12} /> New User
        </Button>
        <Button
          size="sm"
          variant="outlined"
          className="w-full justify-start gap-2 text-xs"
        >
          <ChartBarIcon size={12} /> Reports
        </Button>
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between">
            <Switch
              id="preview-notif"
              label="Notifications"
              defaultChecked
              size="sm"
              labelClassName="opacity-50"
              labelSide="left"
              containerClassName="flex justify-between w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <Switch
              id="preview-dark"
              label="Dark mode"
              size="sm"
              labelClassName="opacity-50"
              labelSide="left"
              containerClassName="flex justify-between w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background/60 to-transparent" />
  </div>
);

const Home = () => {
  const { t } = useTranslation();
  const { currentVersion } = useVersion();

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeOut' as const } },
  };

  const features = [
    {
      title: 'Modern Design',
      description: 'Clean, contemporary UI components built with Tailwind CSS',
      Icon: SparkleIcon,
    },
    {
      title: 'Dark Mode',
      description: 'Fully supported dark theme for comfortable viewing',
      Icon: MoonIcon,
    },
    {
      title: 'Type Safe',
      description: 'Built with TypeScript for robust development',
      Icon: ShieldCheckIcon,
    },
    {
      title: 'Customizable',
      description: 'Easy to customize with CSS variables and props',
      Icon: PaletteIcon,
    },
    {
      title: 'Production Ready',
      description: 'Well-tested components with comprehensive documentation and examples',
      Icon: AtomIcon,
    },
    {
      title: 'Lightweight',
      description: 'Minimal footprint for fast load times and responsive apps',
      Icon: FeatherIcon,
    },
  ];

  const stats = [
    { value: '34+', label: t('Components') },
    { value: '100%', label: 'TypeScript' },
    { value: 'Tailwind v4', label: t('CSS Framework') },
    { value: 'MIT', label: t('License') },
  ];

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-100 w-125 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <section className="relative px-6 pb-20 pt-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div
                variants={fadeUp}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-sm font-medium text-primary"
              >
                <SparkleIcon
                  size={13}
                  weight="fill"
                />
                <span>
                  v{currentVersion} · {t('React Component Library')}
                </span>
              </motion.div>

              <motion.div variants={fadeUp}>
                <img
                  src="/assets/logos/tra-ui-kit.png"
                  className="mb-6 h-16 w-auto"
                  alt="TRA UI Kit"
                />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mb-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
              >
                {t('Component infrastructure')}{' '}
                <span className="bg-linear-to-r from-primary to-primary-focused bg-clip-text text-transparent">
                  {t('for modern React.')}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mb-8 text-lg leading-relaxed text-neutral-grey"
              >
                {t(
                  '35+ accessible, TypeScript-first components. Dark mode, RTL support, and CSS variables included. Copy, customize, and ship — zero configuration needed.',
                )}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mb-5 flex flex-wrap gap-3"
              >
                <Link
                  to="/$version/installation"
                  params={{ version: `v${currentVersion}` }}
                >
                  <Button
                    size="lg"
                    className="gap-2 shadow-sm"
                  >
                    <ArrowRightIcon
                      size={17}
                      weight="bold"
                    />
                    {t('Get Started')}
                  </Button>
                </Link>
                <a
                  href="https://github.com/smhirmak/tra-ui-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outlined"
                    size="lg"
                    className="border-border/60 text-neutral-grey hover:border-primary/40 hover:text-foreground"
                  >
                    {t('View on GitHub')}
                  </Button>
                </a>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mb-8 text-xs tracking-wide text-neutral-grey/50"
              >
                Open source · MIT License · TypeScript first · Accessible by default
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-x-8 gap-y-3"
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col gap-0.5"
                  >
                    <span className="text-xl font-bold text-foreground">{s.value}</span>
                    <span className="text-xs text-neutral-grey">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="hidden lg:block"
            >
              <UIPreviewPanel />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-neutral-dark-white/40 px-6 py-8 dark:bg-neutral-light/4">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {stats.map((stat, i, arr) => (
              <div
                key={i}
                className="flex items-center gap-8"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-0.5 text-sm text-neutral-grey">{stat.label}</p>
                </div>
                {i < arr.length - 1 && <div className="hidden h-8 w-px bg-border sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {t('Why choose us')}
            </p>
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {t('Why TRA UI Kit?')}
            </h2>
            <p className="mx-auto max-w-xl text-lg text-neutral-grey">
              {t('Everything you need to build beautiful React applications')}
            </p>

            {/* Highlight pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {[
                { label: '34+ Components', color: 'bg-primary/8 text-primary border-primary/20' },
                {
                  label: 'TypeScript First',
                  color: 'bg-secondary/8 text-secondary border-secondary/20',
                },
                { label: 'Tailwind v4', color: 'bg-primary/8 text-primary border-primary/20' },
                {
                  label: 'Dark Mode Ready',
                  color: 'bg-neutral-grey/8 text-neutral-grey border-border',
                },
                { label: 'MIT License', color: 'bg-success/8 text-success border-success/20' },
                {
                  label: 'Zero Config',
                  color: 'bg-secondary/8 text-secondary border-secondary/20',
                },
                { label: 'Accessible', color: 'bg-primary/8 text-primary border-primary/20' },
              ].map((pill) => (
                <span
                  key={pill.label}
                  className={`inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-medium ${pill.color}`}
                >
                  {t(pill.label)}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
                className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-hard-primary ${idx === 0 ? 'p-8' : 'p-7'}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/3 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {idx === 0 ? (
                  <>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/15">
                      <feature.Icon
                        size={24}
                        weight="duotone"
                        className="text-primary"
                      />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">
                      {t(feature.title)}
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed text-neutral-grey">
                      {t(feature.description)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['CSS variables', 'Design tokens', 'RTL support', 'Dark mode'].map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-primary/15 bg-primary/6 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                        >
                          {t(tag)}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/15">
                      <feature.Icon
                        size={22}
                        weight="duotone"
                        className="text-primary"
                      />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">
                      {t(feature.title)}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-grey">
                      {t(feature.description)}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral-dark-white/40 px-6 py-28 dark:bg-neutral-light/4 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {t('Component Library')}
            </p>
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {t('Explore Components')}
            </h2>
            <p className="mx-auto max-w-xl text-lg text-neutral-grey">
              {t('Production-ready components to accelerate your development')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {Constants.componentList
              ?.filter((component) => component.isShowHome)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((component, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={prefersReducedMotion ? {} : { y: -3 }}
                >
                  <Link
                    to={`/v${currentVersion}${component.path}` as any}
                    className="group flex h-full items-start gap-4 rounded-xl border border-border/60 bg-background p-5 transition-all duration-250 hover:border-primary/30 hover:shadow-hard-primary"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/8 transition-colors duration-250 group-hover:bg-primary/15">
                      <component.Icon
                        size={18}
                        weight="duotone"
                        className="text-primary"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-0.5 text-sm font-semibold">{component.name}</h3>
                      <p className="line-clamp-2 text-xs leading-relaxed text-neutral-grey">
                        {component.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </motion.div>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <Link
              to="/$version/components"
              params={{ version: `v${currentVersion}` }}
            >
              <Button
                variant="outlined"
                size="lg"
              >
                {t('Show All Components')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-28 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {t('Developer Experience')}
            </p>
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              {t('Quick Start')}
            </h2>
            <p className="text-lg text-neutral-grey">
              {t('Get up and running in less than a minute')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { step: 1, label: t('Initialize TRA UI Kit'), code: 'npx tra-ui-cli init' },
              {
                step: 2,
                label: t('Add components'),
                code: 'npx tra-ui-cli add button input select',
              },
            ].map(({ step, label, code }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: step * 0.1 }}
                className="flex gap-4"
              >
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {step}
                </div>
                <div className="flex-1 overflow-hidden rounded-xl border border-border bg-neutral-dark-white/50 dark:bg-neutral-light/5">
                  <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-border" />
                      <span className="h-2.5 w-2.5 rounded-full bg-border" />
                      <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    </div>
                    <p className="text-xs font-medium text-neutral-grey">{label}</p>
                    {/* <CopyButton text={code} /> */}
                  </div>
                  <div className="px-4 py-3">
                    <CustomSyntaxHighlighter content={code} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <Link
              to="/$version/installation"
              params={{ version: `v${currentVersion}` }}
            >
              <Button size="lg">{t('View Full Documentation')}</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-28 pt-4 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/8 via-background to-secondary/8 p-12 text-center"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {t('Open Source')}
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              {t('Ready to get started?')}
            </h2>
            <p className="mx-auto mb-8 max-w-md text-lg text-neutral-grey">
              {t(
                'Start building with TRA UI Kit today and deliver beautiful, accessible React applications faster.',
              )}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/$version/installation"
                params={{ version: `v${currentVersion}` }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {t('Get Started for Free')}
                </Button>
              </Link>
              <Link
                to="/$version/components"
                params={{ version: `v${currentVersion}` }}
              >
                <Button
                  variant="outlined"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {t('View All Components')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
