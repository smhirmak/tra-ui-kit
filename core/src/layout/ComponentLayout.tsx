import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import TableOfContents from '@/components/table-of-contents';
import { useTOC } from '@/contexts/toc/TOCContext';
import Constants from '@/constants/Constants';

const ComponentLayout = () => {
  const location = useLocation();
  const { tocItems } = useTOC();

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Sidebar - Component List */}
      <aside className="hidden w-64 shrink-0 border-r border-border lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto p-6">
          <h3 className="mb-4 text-sm font-semibold text-neutral-grey">Components</h3>
          <nav className="space-y-1">
            {Constants.componentList.map((component) => (
              <Link
                key={component.path}
                to={component.path}
                className={`block rounded-md px-3 py-2 text-sm transition-colors ${location.pathname === component.path
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

      {/* Main Content */}
      <main className="flex-1 px-6 py-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-neutral dark:prose-invert mx-auto max-w-4xl"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Right Sidebar - Table of Contents - STICKY */}
      <aside className="hidden w-64 shrink-0 border-l border-border xl:block">
        <div className="sticky top-20 p-6">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
};

export default ComponentLayout;
