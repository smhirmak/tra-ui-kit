import { useEffect } from 'react';
import { HouseIcon, GearIcon, UserIcon, ChartBarIcon } from '@phosphor-icons/react';
import Sidebar, { SidebarItem } from '@/components/sidebar';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';

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
  { prop: 'url', type: 'string', default: '-', description: 'Navigation URL' },
];

const SidebarPage = () => {
  const { setTocItems } = useTOC();

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
        <CustomSyntaxHighlighter content='npx msi-ui-cli add sidebar' />
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
    url="/"
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
              <SidebarItem icon={<HouseIcon className="size-5" />} text="Home" url="/" />
              <SidebarItem icon={<ChartBarIcon className="size-5" />} text="Dashboard" url="/dashboard" />
              <SidebarItem icon={<UserIcon className="size-5" />} text="Profile" url="/profile" />
              <SidebarItem icon={<GearIcon className="size-5" />} text="Settings" url="/settings" />
            </Sidebar>
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<Sidebar>
  <SidebarItem icon={<HouseIcon />} text="Home" url="/" />
  <SidebarItem icon={<ChartBarIcon />} text="Dashboard" url="/dashboard" />
  <SidebarItem icon={<UserIcon />} text="Profile" url="/profile" />
  <SidebarItem icon={<GearIcon />} text="Settings" url="/settings" />
</Sidebar>`}
        />
      </section>

      {/* Active State */}
      <section id="active-state">
        <h2 className="mb-4 text-2xl font-bold">Active State</h2>
        <p className="mb-4 text-neutral-grey">Highlight the current active navigation item.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="h-96 w-64">
            <Sidebar>
              <SidebarItem icon={<HouseIcon className="size-5" />} text="Home" url="/" />
              <SidebarItem icon={<ChartBarIcon className="size-5" />} text="Dashboard" url="/dashboard" active />
              <SidebarItem icon={<UserIcon className="size-5" />} text="Profile" url="/profile" />
              <SidebarItem icon={<GearIcon className="size-5" />} text="Settings" url="/settings" alert />
            </Sidebar>
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<Sidebar>
  <SidebarItem icon={<HouseIcon />} text="Home" url="/" />
  <SidebarItem icon={<ChartBarIcon />} text="Dashboard" active />
  <SidebarItem icon={<UserIcon />} text="Profile" />
  <SidebarItem icon={<GearIcon />} text="Settings" alert />
</Sidebar>`}
        />
      </section>

      {/* API Reference */}
      <section id="api">
        <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
        <ApiTable tableData={apiTableData} title='Sidebar' titleClassName='text-xl font-semibold' />
        <ApiTable tableData={sidebarItemApiData} title='SidebarItem' titleClassName='text-xl font-semibold mt-3' />
      </section>
    </div>
  );
};

export default SidebarPage;

