import { useEffect } from 'react';
import Button from '@/components/button';
import Tooltip from '@/components/tooltip';
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
  { id: 'with-delay', title: 'With Delay', level: 1 },
  { id: 'multi-line', title: 'Multi-line Content', level: 1 },
  { id: 'without-arrow', title: 'Without Arrow', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'content',
    type: 'string | string[]',
    default: '-',
    description: 'Tooltip content text or array of lines',
  },
  {
    prop: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Element to attach tooltip to',
  },
  {
    prop: 'position',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"top"',
    description: 'Tooltip position',
  },
  { prop: 'delay', type: 'number', default: '200', description: 'Show delay in milliseconds' },
  { prop: 'arrow', type: 'boolean', default: 'true', description: 'Show arrow indicator' },
  {
    prop: 'className',
    type: 'string',
    default: '-',
    description: 'Custom CSS class for container',
  },
  {
    prop: 'contentClassName',
    type: 'string',
    default: '-',
    description: 'Custom CSS class for content',
  },
];

const TooltipPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Tooltip</h1>
        <p className="text-lg text-neutral-grey">
          A contextual popup that displays information when users hover over an element.
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
            <CustomSyntaxHighlighter content="npx msi-ui-cli add tooltip" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="tooltip" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Tooltip content="This is a tooltip">
              <Button>Hover me</Button>
            </Tooltip>
          </div>
          <CustomSyntaxHighlighter
            content={`<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>`}
          />
        </div>
      </section>

      {/* Positions */}
      <section id="positions">
        <h2 className="mb-4 text-2xl font-bold">Positions</h2>
        <p className="mb-4 text-neutral-grey">Tooltip can be positioned in four directions.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Tooltip
              content="Top tooltip"
              position="top"
            >
              <Button>Top</Button>
            </Tooltip>
            <Tooltip
              content="Right tooltip"
              position="right"
            >
              <Button>Right</Button>
            </Tooltip>
            <Tooltip
              content="Bottom tooltip"
              position="bottom"
            >
              <Button>Bottom</Button>
            </Tooltip>
            <Tooltip
              content="Left tooltip"
              position="left"
            >
              <Button>Left</Button>
            </Tooltip>
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<Tooltip content="Top tooltip" position="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Right tooltip" position="right">
  <Button>Right</Button>
</Tooltip>`}
        />
      </section>

      {/* With Delay */}
      <section id="with-delay">
        <h2 className="mb-4 text-2xl font-bold">With Delay</h2>
        <p className="mb-4 text-neutral-grey">Add a delay before showing the tooltip.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Tooltip
              content="No delay"
              delay={0}
            >
              <Button>No Delay</Button>
            </Tooltip>
            <Tooltip
              content="500ms delay"
              delay={500}
            >
              <Button>500ms Delay</Button>
            </Tooltip>
            <Tooltip
              content="1 second delay"
              delay={1000}
            >
              <Button>1s Delay</Button>
            </Tooltip>
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<Tooltip content="500ms delay" delay={500}>
  <Button>500ms Delay</Button>
</Tooltip>`}
        />
      </section>

      {/* Multi-line */}
      <section id="multi-line">
        <h2 className="mb-4 text-2xl font-bold">Multi-line Content</h2>
        <p className="mb-4 text-neutral-grey">Display multiple lines in tooltip.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Tooltip content={['Line 1', 'Line 2', 'Line 3', 'Line 4']}>
            <Button>Multi-line Tooltip</Button>
          </Tooltip>
        </div>
        <CustomSyntaxHighlighter
          content={`<Tooltip content={['Line 1', 'Line 2', 'Line 3']}>
  <Button>Multi-line Tooltip</Button>
</Tooltip>`}
        />
      </section>

      {/* Without Arrow */}
      <section id="without-arrow">
        <h2 className="mb-4 text-2xl font-bold">Without Arrow</h2>
        <p className="mb-4 text-neutral-grey">Hide the arrow indicator.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Tooltip
            content="Tooltip without arrow"
            arrow={false}
          >
            <Button>No Arrow</Button>
          </Tooltip>
        </div>
        <CustomSyntaxHighlighter
          content={`<Tooltip content="Tooltip without arrow" arrow={false}>
  <Button>No Arrow</Button>
</Tooltip>`}
        />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default TooltipPage;
