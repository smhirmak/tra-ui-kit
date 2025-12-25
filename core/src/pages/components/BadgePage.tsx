import { useEffect } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import Badge from '@/components/badge';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTOC } from '@/contexts/toc/TOCContext';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'colors', title: 'Colors', level: 1 },
  { id: 'with-text', title: 'With Text', level: 1 },
  { id: 'with-icon', title: 'With Icon', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'color', type: '"primary" | "error" | "secondary" | "success" | "tetriary" | "warning"', default: '"primary"', description: 'The color scheme' },
  { prop: 'size', type: '"sm" | "default" | "lg"', default: '"default"', description: 'The badge size' },
  { prop: 'text', type: 'string', default: '-', description: 'Text to display in the badge' },
  { prop: 'textClassName', type: 'string', default: '-', description: 'Class name for the text element' },
  { prop: 'icon', type: 'ReactNode', default: '-', description: 'Icon to display in the badge' },
];

const BadgePage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Badge</h1>
        <p className="text-lg text-neutral-grey">
          A small status indicator component with various colors and sizes for displaying notifications or status.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add badge' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="badge" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Badge color="primary" />
          </div>
          <CustomSyntaxHighlighter content='<Badge color="primary" />' />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Badge comes in three different sizes.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex items-center gap-4">
            <Badge color="primary" size="sm" />
            <Badge color="primary" />
            <Badge color="primary" size="lg" />
          </div>
        </div>
        <CustomSyntaxHighlighter className="mb-2" content='<Badge color="primary" size="sm" />' />
        <CustomSyntaxHighlighter className="mb-2" content='<Badge color="primary" />' />
        <CustomSyntaxHighlighter content='<Badge color="primary" size="lg" />' />
      </section>

      {/* Colors */}
      <section id="colors">
        <h2 className="mb-4 text-2xl font-bold">Colors</h2>
        <p className="mb-4 text-neutral-grey">Available color options for badges.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Badge color="primary" />
            <Badge color="error" />
            <Badge color="secondary" />
            <Badge color="success" />
            <Badge color="tetriary" />
            <Badge color="warning" />
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Badge color="primary" />' />
      </section>

      {/* With Text */}
      <section id="with-text">
        <h2 className="mb-4 text-2xl font-bold">With Text</h2>
        <p className="mb-4 text-neutral-grey">Badges can display text content.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Badge color="primary" text="Text" />
            <Badge color="error" text="Text" />
            <Badge color="secondary" text="Text" />
            <Badge color="success" text="Text" />
            <Badge color="tetriary" text="Text" />
            <Badge color="warning" text="Text" />
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Badge color="primary" text="Text" />' />
      </section>

      {/* With Icon */}
      <section id="with-icon">
        <h2 className="mb-4 text-2xl font-bold">With Icon</h2>
        <p className="mb-4 text-neutral-grey">Badges can display icons or combine icon with text.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Badge icon={<PlusIcon />} size="sm" />
            <Badge icon={<PlusIcon />} />
            <Badge icon={<PlusIcon />} size="lg" />
            <Badge icon={<PlusIcon />} text="Text" />
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Badge icon={<PlusIcon />} text="Text" />' />
      </section>

      {/* API Reference */}
      <section id="api">
        <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
        <ApiTable tableData={apiTableData} />
      </section>
    </div>
  );
};

export default BadgePage;
