import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import Button from './button';

interface ISidebar {
  children: ReactNode;
  headerLogo?: string;
  expandable?: boolean;
}

interface ISidebarItem {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  url?: string;
  onClick?: () => void;
}

const SidebarContext = createContext<{ expanded: boolean } | undefined>(undefined);

const Sidebar = ({ children, headerLogo, expandable = true }: ISidebar) => {
  const [expanded, setExpanded] = useState(true);
  const contextValue = useMemo(() => ({ expanded }), [expanded]);

  useEffect(() => {
    if (!expandable) {
      setExpanded(true);
    }
  }, [expandable]);

  return (
    <aside className="z-2 sticky top-0 max-h-screen w-fit overflow-y-auto overflow-x-hidden">
      <nav className="bg-background flex h-full flex-col shadow-xs">
        <div
          className={`flex items-center ${expanded && headerLogo ? 'justify-between' : 'justify-end'} p-4 pb-2`}
        >
          {headerLogo && (
            <img
              src={headerLogo}
              alt="logo"
              className={`overflow-hidden transition-all ease-out ${expanded ? 'w-16' : 'w-0'}`}
            />
          )}
          {expandable && (
            <Button
              type="button"
              onClick={() => setExpanded((curr) => !curr)}
              className="bg-background self-end p-1.5 size-fit hover:bg-neutral dark:hover:bg-primary-15"
              title={expanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              {expanded ? <CaretLeftIcon /> : <CaretRightIcon />}
            </Button>
          )}
        </div>

        <SidebarContext.Provider value={contextValue}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        {/* <div className="flex border-t p-3">
          <img src="#" className="size-10 rounded-md" />
          <div className={`flex items-center justify-between overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'} `}>
            <div className="leading-4">
              <h4 className="font-semibold">constGenius</h4>
              <span className="text-xs text-gray-600">constgenius@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div> */}
      </nav>
    </aside>
  );
};

export const SidebarItem = ({ icon, text, active, alert, onClick }: ISidebarItem) => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('SidebarItem must be used within a Sidebar');
  }
  const { expanded } = context;
  return (
    <li
      onClick={() => {
        onClick?.();
      }}
      className={`group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors ${active ? 'bg-primary-15 text-primary' : 'justify-center hover:bg-neutral dark:hover:bg-primary-15'}`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ease-out ${expanded ? 'ml-3 w-40' : 'size-0'}`}
      >
        {text}
      </span>
      {alert && (
        <div className={`absolute right-2 size-2 rounded bg-primary ${expanded ? '' : 'top-2'}`} />
      )}

      {!expanded && (
        <div className="z-2 invisible absolute left-full ml-6 -translate-x-3 text-nowrap rounded-md bg-primary-15 px-2 py-1 text-sm text-primary opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
          {text}
        </div>
      )}
    </li>
  );
};

export default Sidebar;
