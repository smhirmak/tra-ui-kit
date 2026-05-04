import { useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSize,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tab, Tabs } from '@/components/ui/tabs';
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

const dialogApiTableData = [
  { prop: 'open', type: 'boolean', default: 'false', description: 'Controls the open state' },
  {
    prop: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Controls the default open state',
  },
  {
    prop: 'onOpenChange',
    type: '(open: boolean) => void',
    default: '-',
    description: 'Callback when open state changes',
  },
  {
    prop: 'size',
    type: '"sm" | "default" | "lg" | "xl" | "2xl"',
    default: '"default"',
    description: 'Dialog size',
  },
];

const dialogTriggerApiTableData = [
  {
    prop: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Whether the trigger should be rendered as a child element',
  },
  {
    prop: 'className',
    type: 'string',
    default: '',
    description: 'Additional class names for the trigger element',
  },
];

const dialogContentApiTableData = [
  {
    prop: 'className',
    type: 'string',
    default: '',
    description: 'Additional class names for the trigger element',
  },
];

const dialogHeaderApiTableData = [
  {
    prop: 'className',
    type: 'string',
    default: '',
    description: 'Additional class names for the trigger element',
  },
];

const dialogFooterApiTableData = [
  {
    prop: 'className',
    type: 'string',
    default: '',
    description: 'Additional class names for the trigger element',
  },
];

const dialogDescriptionApiTableData = [
  {
    prop: 'className',
    type: 'string',
    default: '',
    description: 'Additional class names for the trigger element',
  },
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
          A modal dialog component for displaying important content and actions that require user
          attention.
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
            <CustomSyntaxHighlighter content="npx tra-ui-cli add dialog" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="dialog" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Dialog
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <DialogTrigger>Open Dialog</DialogTrigger>
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
          <CustomSyntaxHighlighter
            content={`<Dialog open={isOpen} onOpenChange={setIsOpen}>
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
</Dialog>`}
          />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">
          Dialog comes in multiple sizes to fit different content needs.
        </p>
        <div className="flex gap-8 mb-4">
          {['sm', 'default', 'lg', 'xl', 'full'].map((e) => (
            <Dialog
              size={e as DialogSize}
              key={e}
            >
              <DialogTrigger>Size {e}</DialogTrigger>
              <DialogContent>
                <div className="py-4">
                  <p>Dialog content goes here.</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <CustomSyntaxHighlighter
          className="mb-2"
          content='<Dialog size="sm">...</Dialog>
<Dialog size="default">...</Dialog>
<Dialog size="default">...</Dialog>
<Dialog size="lg">...</Dialog>
<Dialog size="xl">...</Dialog>
<Dialog size="2xl">...</Dialog>'
        />
      </section>

      {/* API Reference */}
      <section id="api">
        <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
        <ApiTable
          title="Dialog"
          tableData={dialogApiTableData}
          titleClassName="text-xl font-semibold"
        />
        <ApiTable
          title="DialogTrigger"
          tableData={dialogTriggerApiTableData}
          titleClassName="text-xl font-semibold"
        />
        <ApiTable
          title="DialogHeader"
          tableData={dialogHeaderApiTableData}
          titleClassName="text-xl font-semibold"
        />
        <ApiTable
          title="DialogDescription"
          tableData={dialogDescriptionApiTableData}
          titleClassName="text-xl font-semibold"
        />
        <ApiTable
          title="DialogContent"
          tableData={dialogContentApiTableData}
          titleClassName="text-xl font-semibold"
        />
        <ApiTable
          title="DialogFooter"
          tableData={dialogFooterApiTableData}
          titleClassName="text-xl font-semibold"
        />
      </section>
    </div>
  );
};

export default DialogPage;
