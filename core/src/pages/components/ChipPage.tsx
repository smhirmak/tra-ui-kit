import { useEffect } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import Chip from '@/components/ui/chip';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { Tab, Tabs } from '@/components/ui/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';
import Notification from '@/components/ui/notification';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'states', title: 'States', level: 1 },
  { id: 'with-icons', title: 'With Icons', level: 1 },
  { id: 'deletable', title: 'Deletable', level: 1 },
  { id: 'clickable', title: 'Clickable', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'size',
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: 'The chip size',
  },
  { prop: 'label', type: 'string', default: '-', description: 'Text to display in the chip' },
  { prop: 'active', type: 'boolean', default: 'false', description: 'Active state styling' },
  { prop: 'selected', type: 'boolean', default: 'false', description: 'Selected state styling' },
  {
    prop: 'startIcon',
    type: 'ReactNode',
    default: '-',
    description: 'Icon displayed at the start',
  },
  { prop: 'endIcon', type: 'ReactNode', default: '-', description: 'Icon displayed at the end' },
  {
    prop: 'onDelete',
    type: '() => void',
    default: '-',
    description: 'Callback when delete icon is clicked',
  },
  {
    prop: 'onClick',
    type: '() => void',
    default: '-',
    description: 'Callback when chip is clicked',
  },
];

const ChipPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const { info } = Notification();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Chip</h1>
        <p className="text-lg text-neutral-grey">
          A compact component for displaying tags, filters, or selections with various states and
          interactions.
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
            <CustomSyntaxHighlighter content="npx msi-ui-cli add chip" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="chip" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Chip label="Chip" />
          </div>
          <CustomSyntaxHighlighter content='<Chip label="Chip" />' />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Chip comes in three different sizes.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex items-center gap-4">
            <Chip
              size="sm"
              label="Small"
            />
            <Chip label="Default" />
            <Chip
              size="lg"
              label="Large"
            />
          </div>
        </div>
        <CustomSyntaxHighlighter
          className="mb-2"
          content='<Chip size="sm" label="Small" />'
        />
        <CustomSyntaxHighlighter
          className="mb-2"
          content='<Chip label="Default" />'
        />
        <CustomSyntaxHighlighter content='<Chip size="lg" label="Large" />' />
      </section>

      {/* States */}
      <section id="states">
        <h2 className="mb-4 text-2xl font-bold">States</h2>
        <p className="mb-4 text-neutral-grey">Chips support active and selected states.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Chip label="Default" />
            <Chip
              label="Active"
              active
            />
            <Chip
              label="Selected"
              selected
            />
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Chip label="Selected" selected />' />
      </section>

      {/* With Icons */}
      <section id="with-icons">
        <h2 className="mb-4 text-2xl font-bold">With Icons</h2>
        <p className="mb-4 text-neutral-grey">Chips can display icons at the start or end.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Chip
              label="Start Icon"
              startIcon={<PlusIcon />}
            />
            <Chip
              label="End Icon"
              endIcon={<PlusIcon />}
            />
            <Chip
              label="Both"
              startIcon={<PlusIcon />}
              endIcon={<PlusIcon />}
            />
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Chip label="Start Icon" startIcon={<PlusIcon />} />' />
      </section>

      {/* Deletable */}
      <section id="deletable">
        <h2 className="mb-4 text-2xl font-bold">Deletable</h2>
        <p className="mb-4 text-neutral-grey">Chips can have a delete button.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Chip
              size="sm"
              label="Delete"
              onDelete={() => info('Delete')}
            />
            <Chip
              label="Delete"
              onDelete={() => info('Delete')}
            />
            <Chip
              size="lg"
              label="Delete"
              onDelete={() => info('Delete')}
            />
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Chip label="Delete" onDelete={() => info("Delete")} />' />
      </section>

      {/* Clickable */}
      <section id="clickable">
        <h2 className="mb-4 text-2xl font-bold">Clickable</h2>
        <p className="mb-4 text-neutral-grey">
          Chips can be clickable with hover and active states.
        </p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Chip
              size="sm"
              label="Click me"
              onClick={() => info('Clicked')}
            />
            <Chip
              label="Click me"
              onClick={() => info('Clicked')}
            />
            <Chip
              size="lg"
              label="Click me"
              onClick={() => info('Clicked')}
            />
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Chip label="Click me" onClick={() => info("Clicked")} />' />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default ChipPage;
