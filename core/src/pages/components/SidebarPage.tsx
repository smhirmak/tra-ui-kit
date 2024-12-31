import { IMenuItem } from '@/types/types';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import Sidebar, { SidebarItem } from '@/components/Sidebar';
import { Home, Minus, Plus } from '@/assets/Icons';

const formatGroupTitle = (title: string) => title.replace(/([a-z])([A-Z])/g, '$1 $2');

const Menu: { [key: string]: IMenuItem[] } = {
  Main: [
    {
      id: 1,
      title: 'Home',
      path: '/',
      icon: <Home className="size-10" />,
      component: 'Home',
      groupTitle: 'Main',
    },
  ],
  Audit: [
    {
      id: 2,
      title: 'Add Audit Record',
      path: '/auditRecord/add',
      icon: <Plus className="size-10" />,
      component: 'AddAuditRecord',
      groupTitle: 'Audit Record',
    },
    {
      id: 3,
      title: 'Audit Record List',
      path: '/auditRecord/list',
      icon: <Minus className="size-10" />,
      component: 'List',
      groupTitle: 'Audit Record',
    },
    // {
    //   id: 4,
    //   title: 'Audit Record Detail',
    //   path: '/auditRecord/detail/2',
    //   icon: <NotebookText size={20} />,
    //   component: 'Detail',
    //   groupTitle: 'Audit Record',
    //   competenceId: Competence.ViewAuditRecord,
    // },
  ],
};

const NavigationBar = () => {
  const { t } = useLocalizeContext();

  return (
    <div className="flex gap-10">
      <div className="h-full w-fit max-w-64 border-r bg-background">
        <Sidebar headerLogo="/assets/logos/logo.png">
          {Object.keys(Menu).map(group => (
            <div key={group}>
              <p className="text-wrap p-1 text-start text-sm font-semibold text-gray-900 dark:text-gray-300">
                {t(formatGroupTitle(group))}
              </p>
              {Menu[group].map((item: IMenuItem) => {
                if (item.competenceId) {
                  return null;
                }
                return (
                  <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    text={t(item.title)}
                    url={item.path}
                  />
                );
              })}
            </div>
          ))}
        </Sidebar>
      </div>
      <div className="h-full w-fit max-w-64 border-r bg-background">
        <Sidebar>
          <p className="text-sm">Deneme Başlık</p>
          <SidebarItem icon={<Plus />} text="Deneme" />
          <p>Deneme Başlık</p>
          <SidebarItem icon={<Plus />} text="Deneme" />
        </Sidebar>
      </div>
    </div>
  );
};

export default NavigationBar;
