import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/button';
import {
  SparkleIcon, MoonIcon, ShieldCheckIcon, PaletteIcon, AtomIcon
} from '@phosphor-icons/react';
import Constants from '@/constants/Constants';
import { useTranslation } from 'react-i18next';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useVersion } from '@/contexts/version';
import Calendar from '@/components/calendar';
import Badge from '@/components/badge';
import Chip from '@/components/chip';
import Checkbox from '@/components/checkbox';
import Switch from '@/components/switch';
import { Avatar } from '@/components/avatar';
import Tooltip from '@/components/tooltip';

const Home = () => {
  const { t } = useTranslation();
  const { currentVersion } = useVersion()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as any } },
  };

  const features = [
    { title: 'Modern Design', description: 'Clean, contemporary UI components built with Tailwind CSS', Icon: SparkleIcon },
    { title: 'Dark Mode', description: 'Fully supported dark theme for comfortable viewing', Icon: MoonIcon },
    { title: 'Type Safe', description: 'Built with TypeScript for robust development', Icon: ShieldCheckIcon },
    { title: 'Customizable', description: 'Easy to customize with CSS variables and props', Icon: PaletteIcon },
    { title: 'Production Ready', description: 'Well-tested components with comprehensive documentation and examples', Icon: AtomIcon },
    { title: 'Lightweight', description: 'Minimal footprint for fast load times and responsive apps', Icon: ShieldCheckIcon },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-center">
          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-6 bg-linear-to-r from-primary via-primary-focused to-secondary bg-clip-text text-6xl font-bold text-transparent sm:text-7xl md:text-8xl lg:text-9xl">MSI UI Kit</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-8 text-xl text-neutral-grey md:text-2xl">{t('A comprehensive React component library for modern web applications')}</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-12 text-base text-neutral-grey/80 md:text-lg">{t('Beautifully crafted components · TypeScript · Dark Mode · Fully customizable')}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to={`/v${currentVersion}/installation`}><Button size="lg" className="w-full sm:w-auto">{t('Get Started')}</Button></Link>
            <a href="https://github.com/smhirmak/msi-ui-kit" target="_blank" rel="noopener noreferrer"><Button variant="outlined" size="lg" className="w-full sm:w-auto">{t('View on GitHub')}</Button></a>
          </motion.div>
        </motion.div>
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

          {/* Floating Components Decoration */}
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-[10%] top-[20%] blur-[1px]"
          >
            <Badge variant="rectangular" text='New' />
          </motion.div>

          <motion.div
            animate={{ y: [0, 25, 0], rotate: [0, 5, 0], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute right-[15%] top-[15%] scale-75 blur-[1px]"
          >
            <Chip label="React" />
          </motion.div>

          <motion.div
            animate={{ x: [-10, 10, -10], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute left-[15%] bottom-[25%] blur-[1px]"
          >
            <Avatar title="MSI" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 10, 0], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute right-[12%] bottom-[20%] scale-90 blur-[1px]"
          >
            <Button size="sm" variant="outlined">Click me</Button>
          </motion.div>

          <motion.div
            animate={{ rotate: [0, 360], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute left-[20%] top-[40%] scale-50 blur-[1.5px]"
          >
            <Calendar />
          </motion.div>

          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute right-[25%] top-[35%] blur-[1px]"
          >
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <span className="text-sm text-foreground/50">Checked</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [0, 15, 0], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            className="absolute left-[8%] top-[60%] blur-[1px]"
          >
            <Switch checked />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute right-[8%] bottom-[35%] blur-[1px]"
          >
            <Tooltip content={"Tooltip"}>
              <Badge variant="circular" text='Hover' />
            </Tooltip>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
            className="absolute left-[25%] bottom-[15%] blur-[1px]"
          >
            <div className="flex gap-2">
              <Badge variant="rectangular" color="success" text='Success' />
              <Badge variant="rectangular" color="error" text='Error' />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl">{t('Why MSI UI Kit?')}</h2>
            <p className="mb-16 text-center text-lg text-neutral-grey">{t('Everything you need to build beautiful React applications')}</p>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants} className="group rounded-2xl shadow-soft-primary bg-background p-6 transition-colors duration-300">
                <feature.Icon size={40} weight="duotone" className="mb-4 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">{t(feature.title)}</h3>
                <p className="text-neutral-grey">{t(feature.description)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl">{t('Explore Components')}</h2>
            <p className="mb-16 text-center text-lg text-neutral-grey">{t('Production-ready components to accelerate your development')}</p>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Constants.componentList?.filter(component => component.isShowHome).sort((a, b) => a.name.localeCompare(b.name)).map((component, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.03 }}>
                <Link to={`/v${currentVersion}${component.path}`} className="block rounded-xl shadow-soft-primary h-full bg-background p-5 transition-colors duration-300 hover:shadow-hard-primary">
                  <component.Icon size={32} weight="duotone" className="mb-3 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold">{component.name}</h3>
                  <p className="text-sm text-neutral-grey">{component.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <Link to={`/v${currentVersion}/components`} className='block mx-auto mt-8 w-max'>
            <motion.div className="rounded-lg bg-primary px-6 py-3 w-fit text-white shadow-md shadow-primary/30 transition-colors duration-300 hover:bg-primary-dark" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
              {t('Show All Components')}
            </motion.div>
          </Link>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="rounded-2xl shadow-hard-primary bg-linear-to-br from-primary/5 to-secondary/5 p-8 md:p-12">
            <h2 className="mb-4 text-center text-4xl font-bold md:text-5xl">{t('Quick Start')}</h2>
            <p className="mb-8 text-center text-lg text-neutral-grey">{t('Get up and running in less than a minute')}</p>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
              <motion.div variants={itemVariants} className="rounded-lg bg-background p-6">
                <p className="mb-2 text-sm text-neutral-grey">{t('Initialize MSI UI Kit')}</p>
                <CustomSyntaxHighlighter content='npx msi-ui-cli init' />
              </motion.div>
              <motion.div variants={itemVariants} className="rounded-lg bg-background p-6">
                <p className="mb-2 text-sm text-neutral-grey">{t('Add components')}</p>
                <CustomSyntaxHighlighter content='npx msi-ui-cli add button input select' />
                <p className="my-2 text-sm text-neutral-grey">{t('or')}</p>
                <CustomSyntaxHighlighter content='npx msi-ui-cli add' />
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <Link to="/installation"><Button size="lg">{t('View Full Documentation')}</Button></Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
