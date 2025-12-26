import { useEffect, useState } from 'react';
import Button from '@/components/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter
} from '@/components/drawer';
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
  { id: 'examples', title: 'Examples', level: 1 },
  { id: 'positions', title: 'Positions', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'open', type: 'boolean', default: '-', description: 'Controlled open state' },
  { prop: 'defaultOpen', type: 'boolean', default: 'false', description: 'Default open state (uncontrolled)' },
  { prop: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Callback when open state changes' },
  { prop: 'position', type: '"left" | "right" | "top" | "bottom"', default: '"left"', description: 'Drawer position' },
  { prop: 'disableBackdropClick', type: 'boolean', default: 'false', description: 'Disable closing on backdrop click' },
  { prop: 'disableEscapeKeyDown', type: 'boolean', default: 'false', description: 'Disable closing with Escape key' },
  { prop: 'showCloseButton', type: 'boolean', default: 'true', description: 'Show close button' },
];

const DrawerPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

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
            <Drawer>
              <DrawerTrigger>Open Drawer</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>MSI Drawer</DrawerTitle>
                  <DrawerDescription>This is a drawer component</DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <h3 className="mb-4 text-xl font-semibold">Drawer Content</h3>
                  <p>This is the content of the drawer. You can add any content here.</p>
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="outlined">Cancel</Button>
                  <Button>Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <CustomSyntaxHighlighter content={`<Drawer>
  <DrawerTrigger>Open Drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>MSI Drawer</DrawerTitle>
      <DrawerDescription>This is a drawer component</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <p>Drawer content goes here</p>
    </DrawerBody>
    <DrawerFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`} />
        </div>
      </section>

      {/* Examples */}
      <section id="examples">
        <h2 className="mb-4 text-2xl font-bold">Examples</h2>

        {/* Controlled Mode */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Controlled Mode</h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-background p-6">
              <Button onClick={() => setIsOpen(true)}>Open Controlled Drawer</Button>
              <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Controlled Drawer</DrawerTitle>
                  </DrawerHeader>
                  <DrawerBody>
                    <p>This drawer is controlled by external state.</p>
                  </DrawerBody>
                  <DrawerFooter>
                    <Button onClick={() => setIsOpen(false)}>Close</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            <CustomSyntaxHighlighter content={`const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open</Button>
<Drawer open={isOpen} onOpenChange={setIsOpen}>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Controlled Drawer</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <p>Content</p>
    </DrawerBody>
  </DrawerContent>
</Drawer>`} />
          </div>
        </div>

        {/* Custom Trigger */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold">Custom Trigger (asChild)</h3>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-background p-6">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button size='sm'>
                    Custom Button
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Custom Trigger</DrawerTitle>
                  </DrawerHeader>
                  <DrawerBody>
                    <p>This drawer uses a custom trigger element.</p>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </div>
            <CustomSyntaxHighlighter content={`<Drawer>
  <DrawerTrigger asChild>
    <Button>
      Custom Button
    </Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Custom Trigger</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>
      <p>Content</p>
    </DrawerBody>
  </DrawerContent>
</Drawer>`} />
          </div>
        </div>
      </section>

      {/* Positions */}
      <section id="positions">
        <h2 className="mb-4 text-2xl font-bold">Positions</h2>
        <p className="mb-4 text-neutral-grey">Drawer can slide in from any edge of the screen.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-2">
              <Drawer position="left">
                <DrawerTrigger>Left</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Left Drawer</DrawerTitle>
                  </DrawerHeader>
                  <DrawerBody>
                    <p>Drawer from left side</p>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>

              <Drawer position="right">
                <DrawerTrigger>Right</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Right Drawer</DrawerTitle>
                  </DrawerHeader>
                  <DrawerBody>
                    <p>Drawer from right side</p>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>

              <Drawer position="top">
                <DrawerTrigger>Top</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Top Drawer</DrawerTitle>
                  </DrawerHeader>
                  <DrawerBody>
                    <p>Drawer from top</p>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>

              <Drawer position="bottom">
                <DrawerTrigger>Bottom</DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Bottom Drawer</DrawerTitle>
                  </DrawerHeader>
                  <DrawerBody>
                    <p>Drawer from bottom</p>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          <CustomSyntaxHighlighter content={`<Drawer position="left">...</Drawer>
<Drawer position="right">...</Drawer>
<Drawer position="top">...</Drawer>
<Drawer position="bottom">...</Drawer>`} />
        </div>
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default DrawerPage;
