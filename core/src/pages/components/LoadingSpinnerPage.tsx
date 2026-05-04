import { useEffect } from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';
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
  { id: 'sizes', title: 'Custom Sizes', level: 1 },
  { id: 'colors', title: 'Custom Colors', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional CSS classes for customization',
  },
];

const LoadingSpinnerPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Loading Spinner</h1>
        <p className="text-lg text-neutral-grey">
          A circular spinning loader for indicating loading states.
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
            <CustomSyntaxHighlighter content="npx tra-ui-cli add loading-spinner" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="loading-spinner" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          </div>
          <CustomSyntaxHighlighter content="<LoadingSpinner />" />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Custom Sizes</h2>
        <p className="mb-4 text-neutral-grey">Adjust spinner size using className.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex items-center justify-center gap-8">
              <LoadingSpinner className="size-8" />
              <LoadingSpinner className="size-12" />
              <LoadingSpinner className="size-16" />
              <LoadingSpinner className="size-24" />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<LoadingSpinner className="size-8" />
<LoadingSpinner className="size-12" />
<LoadingSpinner className="size-16" />
<LoadingSpinner className="size-24" />`}
          />
        </div>
      </section>

      {/* Colors */}
      <section id="colors">
        <h2 className="mb-4 text-2xl font-bold">Custom Colors</h2>
        <p className="mb-4 text-neutral-grey">Customize border colors for different themes.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex items-center justify-center gap-8">
              <LoadingSpinner className="border-gray-200 border-t-primary" />
              <LoadingSpinner className="border-gray-200 border-t-secondary" />
              <LoadingSpinner className="border-gray-200 border-t-error" />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<LoadingSpinner className="border-gray-200 border-t-primary" />
<LoadingSpinner className="border-gray-200 border-t-secondary" />
<LoadingSpinner className="border-gray-200 border-t-error" />`}
          />
        </div>
      </section>

      {/* API */}
      <section id="api">
        <ApiTable tableData={apiTableData} />
      </section>
    </div>
  );
};

export default LoadingSpinnerPage;
