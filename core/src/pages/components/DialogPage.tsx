import { useEffect, useState } from 'react';
import Button from '@/components/button';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/dialog';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'positions', title: 'Positions', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'open', type: 'boolean', default: 'false', description: 'Controls the open state' },
  { prop: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Callback when open state changes' },
  { prop: 'size', type: '"sm" | "default" | "lg" | "xl" | "2xl"', default: '"default"', description: 'Dialog size' },
  { prop: 'position', type: '"center" | "top" | "bottom" | "onlyMobileBottom"', default: '"center"', description: 'Dialog position' },
  { prop: 'fullScreen', type: 'boolean', default: 'false', description: 'Full screen mode' },
];

const DialogPage = () => {
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
        <h1 className="mb-4 text-4xl font-bold">Dialog</h1>
        <p className="text-lg text-neutral-grey">
          A modal dialog component for displaying important content and actions that require user attention.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add dialog' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="dialog" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger>
                <Button variant="outlined">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a dialog description. You can put any content here.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>Dialog content goes here.</p>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CustomSyntaxHighlighter content={`<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger>
    <Button variant="outlined">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        This is a dialog description.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <p>Dialog content goes here.</p>
    </div>
    <DialogFooter>
      <Button onClick={() => setIsOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`} />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Dialog comes in multiple sizes to fit different content needs.</p>
        <CustomSyntaxHighlighter className="mb-2" content='<DialogContent size="sm">...</DialogContent>' />
        <CustomSyntaxHighlighter className="mb-2" content='<DialogContent size="default">...</DialogContent>' />
        <CustomSyntaxHighlighter className="mb-2" content='<DialogContent size="lg">...</DialogContent>' />
        <CustomSyntaxHighlighter className="mb-2" content='<DialogContent size="xl">...</DialogContent>' />
        <CustomSyntaxHighlighter content='<DialogContent size="2xl">...</DialogContent>' />
      </section>

      {/* Positions */}
      <section id="positions">
        <h2 className="mb-4 text-2xl font-bold">Positions</h2>
        <p className="mb-4 text-neutral-grey">Control the position of the dialog on the screen.</p>
        <CustomSyntaxHighlighter className="mb-2" content='<DialogContent position="center">...</DialogContent>' />
        <CustomSyntaxHighlighter className="mb-2" content='<DialogContent position="top">...</DialogContent>' />
        <CustomSyntaxHighlighter className="mb-2" content='<DialogContent position="bottom">...</DialogContent>' />
        <CustomSyntaxHighlighter content='<DialogContent position="onlyMobileBottom">...</DialogContent>' />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default DialogPage;
