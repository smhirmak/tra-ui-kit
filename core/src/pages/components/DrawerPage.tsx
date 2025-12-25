import { useEffect, useState } from 'react';
import Button from '@/components/button';
import Drawer from '@/components/drawer';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'positions', title: 'Positions', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'isOpen', type: 'boolean', default: 'false', description: 'Controls the open state' },
  { prop: 'onClose', type: '() => void', default: '-', description: 'Callback when drawer should close' },
  { prop: 'position', type: '"left" | "right" | "top" | "bottom"', default: '"left"', description: 'Drawer position' },
  { prop: 'title', type: 'string', default: '-', description: 'Drawer title' },
  { prop: 'footer', type: 'ReactNode | string', default: '-', description: 'Footer content' },
  { prop: 'alwaysOpen', type: 'boolean', default: 'false', description: 'Prevents closing of the drawer' },
];

const DrawerPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('left');

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Drawer</h1>
        <p className="text-lg text-neutral-grey">
          A slide-out panel component for displaying additional content or navigation from any edge of the screen.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add drawer' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="drawer" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            {['left', 'right', 'top', 'bottom'].map((pos) => (
              <Button key={pos} size='sm' onClick={() => { setPosition(pos as 'left' | 'right' | 'top' | 'bottom'); setIsOpen(true); }} className="mr-2">
                {pos.charAt(0).toUpperCase() + pos.slice(1)}
              </Button>
            ))}
            <Drawer
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              position={position}
              title="MSI Drawer"
              footer="Footer content"
            >
              <h2 className="mb-4 text-2xl font-bold">Drawer Content</h2>
              <p>This is the content of the drawer.</p>
            </Drawer>
          </div>
          <CustomSyntaxHighlighter content={`<Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="left"
  title="MSI Drawer"
  footer="Footer content"
>
  <h2 className="mb-4 text-2xl font-bold">Drawer Content</h2>
  <p>This is the content of the drawer.</p>
</Drawer>`} />
        </div>
      </section>

      {/* Positions */}
      <section id="positions">
        <h2 className="mb-4 text-2xl font-bold">Positions</h2>
        <p className="mb-4 text-neutral-grey">Drawer can slide in from any edge of the screen.</p>
        <CustomSyntaxHighlighter className="mb-2" content='<Drawer position="left">...</Drawer>' />
        <CustomSyntaxHighlighter className="mb-2" content='<Drawer position="right">...</Drawer>' />
        <CustomSyntaxHighlighter className="mb-2" content='<Drawer position="top">...</Drawer>' />
        <CustomSyntaxHighlighter content='<Drawer position="bottom">...</Drawer>' />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default DrawerPage;
