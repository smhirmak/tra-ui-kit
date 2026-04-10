import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TableOfContents from '@/components/table-of-contents';
import { useTOC } from '@/contexts/toc/TOCContext';
import Constants from '@/constants/Constants';
import { useVersion } from '@/contexts/version';
import { useEffect } from 'react';
import Button from '@/components/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';

const ComponentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tocItems } = useTOC();
  const { currentVersion } = useVersion();

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
      }
    }, 0);

    return () => clearTimeout(id);
  }, [location.pathname]);

  const currentIndex = Constants.componentList?.sort((a, b) => a.name.localeCompare(b.name))?.findIndex((component) => `/v${currentVersion}${component.path}` === location.pathname) ?? -1;
  const prevComponent = Constants.componentList[currentIndex - 1];
  const nextComponent = Constants.componentList[currentIndex + 1];

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 shrink-0 border-r border-border lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto p-6">
          <h3 className="mb-4 text-sm font-semibold text-neutral-grey">Components</h3>
          <nav className="space-y-1">
            {Constants.componentList.sort((a, b) => a.name.localeCompare(b.name)).map((component) => (
              <Link
                key={component.path}
                to={`/v${currentVersion}${component.path}`}
                className={`block rounded-md px-3 py-2 text-sm transition-colors ${location.pathname === `/v${currentVersion}${component.path}`
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-foreground hover:bg-neutral-light'
                  }`}
              >
                {component.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className="relative flex-1 px-6 py-12 pb-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-neutral dark:prose-invert mx-auto max-w-4xl"
        >
          <Outlet />
          <div className='fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8'>
            {prevComponent && <Button
              size='sm'
              className='gap-2 h-8 cursor-pointer bg-background border-gradient-primary text-foreground text-base font-medium hover:brightness-110'
              onClick={() => {
                const prevItemPath = prevComponent.path
                navigate(`/v${currentVersion}${prevItemPath}`);
              }}
            >
              <ArrowLeftIcon className='size-4' />
              {prevComponent?.name}
            </Button>}
            {nextComponent && <Button
              size='sm'
              className='gap-2 h-8 cursor-pointer bg-background border-gradient-secondary text-foreground text-base font-medium hover:brightness-110'
              onClick={() => {
                const nextItemPath = nextComponent.path
                navigate(`/v${currentVersion}${nextItemPath}`);
              }}
            >
              {nextComponent?.name}
              <ArrowRightIcon className='size-4' />
            </Button>}
          </div>
        </motion.div>
      </main>

      <aside className="hidden w-64 shrink-0 border-l border-border xl:block">
        <div className="sticky top-20 p-6">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
};

export default ComponentLayout;
