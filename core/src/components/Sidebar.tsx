/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';

interface ISidebar {
  children: ReactNode;
  headerLogo?: string;
}

interface ISidebarItem {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  url?: string;
}

const SidebarContext = createContext<{ expanded: boolean } | undefined>(undefined);

const Sidebar: React.FC<ISidebar> = ({ children, headerLogo }) => {
  const [expanded, setExpanded] = useState(true);
  const contextValue = useMemo(() => ({ expanded }), [expanded]);
  return (
    <aside className="z-2 sticky top-0 max-h-screen overflow-y-auto overflow-x-hidden">
      <nav className="bg-background flex h-full flex-col shadow-sm">
        <div className={`flex items-center ${(expanded && headerLogo) ? 'justify-between' : 'justify-end'} p-4 pb-2`}>
          {headerLogo && <img src={headerLogo} alt="logo" className={`overflow-hidden transition-all ease-out ${expanded ? 'w-16' : 'w-0'}`} />}
          <button type="button" onClick={() => setExpanded(curr => !curr)} className="bg-background self-end p-1.5 hover:bg-gray-300 dark:hover:bg-blue-950">
            {expanded ? <CaretLeft /> : <CaretRight />}
          </button>
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

export const SidebarItem = ({ icon, text, active, alert, url }: ISidebarItem) => {
  const context = useContext(SidebarContext);
  const { t } = useLocalizeContext();
  if (!context) {
    throw new Error('SidebarItem must be used within a Sidebar');
  }
  const { expanded } = context;
  const navigate = useNavigate();
  return (
    <li
      onClick={() => url && navigate(url)}
      className={`group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'justify-center hover:bg-gray-300 dark:hover:bg-blue-950'}`}
    >
      {icon}
      <span className={`overflow-hidden transition-all ease-out ${expanded ? 'ml-3 w-40' : 'size-0'}`}>{t(text)}</span>
      {alert && (
        <div className={`absolute right-2 size-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`} />
      )}

      {!expanded && (
        <div className="z-2 invisible absolute left-full ml-6 -translate-x-3 text-nowrap rounded-md bg-indigo-100 px-2 py-1 text-sm text-indigo-800 opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
          {t(text)}
        </div>
      )}
    </li>
  );
};

export default Sidebar;
