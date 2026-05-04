import { useEffect, useState } from 'react';
import Loader, { loaderRef } from '@/components/ui/loader';
import Button from '@/components/ui/button';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { Tab, Tabs } from '@/components/ui/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'circular', title: 'Circular Loader', level: 1 },
  { id: 'linear', title: 'Linear Loader', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'variant',
    type: '"circular" | "linear"',
    default: '"circular"',
    description: 'Loader style variant',
  },
  {
    prop: 'enableScroll',
    type: 'boolean',
    default: 'false',
    description: 'Allow scrolling while loading',
  },
  {
    prop: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional CSS classes',
  },
  {
    prop: 'linearItemClassName',
    type: 'string',
    default: 'undefined',
    description: 'Custom class for linear bar',
  },
];

const LoaderPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const [variant, setVariant] = useState<'circular' | 'linear'>('circular');

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  const handleShowLoader = (variant: 'circular' | 'linear') => {
    setVariant(variant);
    loaderRef.current?.incLoader();
    setTimeout(() => {
      loaderRef.current?.decLoader();
    }, 2000);
  };

  return (
    <div className="space-y-12">
      <Loader variant={variant} />

      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Loader</h1>
        <p className="text-lg text-neutral-grey">
          A full-screen loader component with circular and linear variants, controlled via ref for
          global loading states.
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
            <CustomSyntaxHighlighter content="npx tra-ui-cli add loader" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="loader" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Button onClick={() => handleShowLoader('circular')}>Show Loader (2s)</Button>
          </div>
          <CustomSyntaxHighlighter
            content={`import Loader, { loaderRef } from '@/components/ui/loader';

// Add Loader to your app root
<Loader />

// Show/Hide loader programmatically
loaderRef.current?.incLoader();  // Show
loaderRef.current?.decLoader();  // Hide`}
          />
        </div>
      </section>

      {/* Circular */}
      <section id="circular">
        <h2 className="mb-4 text-2xl font-bold">Circular Loader</h2>
        <p className="mb-4 text-neutral-grey">Default spinning circular loader.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Button onClick={() => handleShowLoader('circular')}>Show Circular Loader</Button>
          </div>
          <CustomSyntaxHighlighter content={`<Loader variant="circular" />`} />
        </div>
      </section>

      {/* Linear */}
      <section id="linear">
        <h2 className="mb-4 text-2xl font-bold">Linear Loader</h2>
        <p className="mb-4 text-neutral-grey">Linear progress bar at the top of the screen.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Button onClick={() => handleShowLoader('linear')}>Show Linear Loader</Button>
          </div>
          <CustomSyntaxHighlighter content={`<Loader variant="linear" />`} />
        </div>
      </section>

      {/* API */}
      <section id="api">
        <ApiTable tableData={apiTableData} />
        <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
          <h3 className="mb-2 font-semibold">Ref Methods</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-neutral-grey">
            <li>
              <code className="rounded bg-muted px-1">incLoader()</code> - Show loader (increment
              counter)
            </li>
            <li>
              <code className="rounded bg-muted px-1">decLoader()</code> - Hide loader (decrement
              counter)
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default LoaderPage;
