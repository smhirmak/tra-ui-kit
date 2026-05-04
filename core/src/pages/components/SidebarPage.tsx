import { useEffect, useState } from 'react';
import { HouseIcon, GearIcon, UserIcon, ChartBarIcon } from '@phosphor-icons/react';
import Sidebar, { SidebarItem } from '@/components/ui/sidebar';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from '@/components/ui/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'with-items', title: 'With Items', level: 1 },
  { id: 'active-state', title: 'Active State', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'children', type: 'ReactNode', default: '-', description: 'Sidebar items content' },
  { prop: 'headerLogo', type: 'string', default: '-', description: 'Logo image URL for header' },
];

const sidebarItemApiData = [
  { prop: 'icon', type: 'ReactNode', default: '-', description: 'Icon element for the item' },
  { prop: 'text', type: 'string', default: '-', description: 'Display text' },
  { prop: 'active', type: 'boolean', default: 'false', description: 'Active state indicator' },
  { prop: 'alert', type: 'boolean', default: 'false', description: 'Show alert badge' },
  {
    prop: 'url',
    type: 'string',
    default: '-',
    description: 'Navigation URL (metadata only, not used for routing)',
  },
  {
    prop: 'onClick',
    type: '() => void',
    default: '-',
    description: 'Click handler for the sidebar item',
  },
];

const SidebarPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Sidebar</h1>
        <p className="text-lg text-neutral-grey">
          A collapsible sidebar navigation component with expandable/collapsible functionality.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className="[&_button]:text-base">
          <Tab
            value="cli"
            label="CLI"
          >
            <CustomSyntaxHighlighter content="npx msi-ui-cli add sidebar" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="sidebar" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <CustomSyntaxHighlighter
            content={`<Sidebar>
  <SidebarItem 
    icon={<HouseIcon />} 
    text="Home"
    onClick={() => console.log('Home clicked')}
  />
</Sidebar>`}
          />
        </div>
      </section>

      {/* With Items */}
      <section id="with-items">
        <h2 className="mb-4 text-2xl font-bold">With Items</h2>
        <p className="mb-4 text-neutral-grey">Sidebar with multiple navigation items.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="h-96 w-64">
            <Sidebar>
              <SidebarItem
                icon={<HouseIcon className="size-5" />}
                text="Home"
                onClick={() => setActiveItem('Home')}
                active={activeItem === 'Home'}
              />
              <SidebarItem
                icon={<ChartBarIcon className="size-5" />}
                text="Dashboard"
                onClick={() => setActiveItem('Dashboard')}
                active={activeItem === 'Dashboard'}
              />
              <SidebarItem
                icon={<UserIcon className="size-5" />}
                text="Profile"
                onClick={() => setActiveItem('Profile')}
                active={activeItem === 'Profile'}
              />
              <SidebarItem
                icon={<GearIcon className="size-5" />}
                text="Settings"
                onClick={() => setActiveItem('Settings')}
                active={activeItem === 'Settings'}
              />
            </Sidebar>
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`const [activeItem, setActiveItem] = useState('Dashboard');

<Sidebar>
  <SidebarItem icon={<HouseIcon />} text="Home" active={activeItem === 'Home'} onClick={() => setActiveItem('Home')} />
  <SidebarItem icon={<ChartBarIcon />} text="Dashboard" active={activeItem === 'Dashboard'} onClick={() => setActiveItem('Dashboard')} />
  <SidebarItem icon={<UserIcon />} text="Profile" active={activeItem === 'Profile'} onClick={() => setActiveItem('Profile')} />
  <SidebarItem icon={<GearIcon />} text="Settings" active={activeItem === 'Settings'} onClick={() => setActiveItem('Settings')} />
</Sidebar>`}
        />
      </section>

      {/* Active State */}
      <section id="active-state">
        <h2 className="mb-4 text-2xl font-bold">Active State &amp; Alert</h2>
        <p className="mb-4 text-neutral-grey">
          Use the <code className="rounded bg-neutral px-1 py-0.5 text-sm">active</code> prop to
          highlight the current page, and{' '}
          <code className="rounded bg-neutral px-1 py-0.5 text-sm">alert</code> to show a
          notification badge.
        </p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="h-96 w-64">
            <Sidebar>
              <SidebarItem
                icon={<HouseIcon className="size-5" />}
                text="Home"
                onClick={() => {}}
              />
              <SidebarItem
                icon={<ChartBarIcon className="size-5" />}
                text="Dashboard"
                active
                onClick={() => {}}
              />
              <SidebarItem
                icon={<UserIcon className="size-5" />}
                text="Profile"
                onClick={() => {}}
              />
              <SidebarItem
                icon={<GearIcon className="size-5" />}
                text="Settings"
                alert
                onClick={() => {}}
              />
            </Sidebar>
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<Sidebar>
  <SidebarItem icon={<HouseIcon />} text="Home" onClick={() => navigate('/')} />
  <SidebarItem icon={<ChartBarIcon />} text="Dashboard" active onClick={() => navigate('/dashboard')} />
  <SidebarItem icon={<UserIcon />} text="Profile" onClick={() => navigate('/profile')} />
  <SidebarItem icon={<GearIcon />} text="Settings" alert onClick={() => navigate('/settings')} />
</Sidebar>`}
        />
      </section>

      {/* API Reference */}
      <section id="api">
        <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
        <ApiTable
          tableData={apiTableData}
          title="Sidebar"
          titleClassName="text-xl font-semibold"
        />
        <ApiTable
          tableData={sidebarItemApiData}
          title="SidebarItem"
          titleClassName="text-xl font-semibold mt-3"
        />
      </section>
    </div>
  );
};

export default SidebarPage;
