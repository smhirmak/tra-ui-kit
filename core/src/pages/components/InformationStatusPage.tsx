import { useEffect } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import InformationStatus from '@/components/information-status';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'types', title: 'Types', level: 1 },
  { id: 'with-icon', title: 'With Icon', level: 1 },
  { id: 'custom-icon', title: 'Custom Icon', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'type', type: '"success" | "warning" | "error"', default: '"success"', description: 'Visual style variant' },
  { prop: 'title', type: 'string', default: '-', description: 'Status message text' },
  { prop: 'isHaveIcon', type: 'boolean', default: 'false', description: 'Show default icon' },
  { prop: 'icon', type: 'React.ReactNode', default: 'undefined', description: 'Custom icon element' },
  { prop: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes' },
];

const InformationStatusPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Information Status</h1>
        <p className="text-lg text-neutral-grey">
          Display status messages with different severity levels and optional icons.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add information-status' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="information-status" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <InformationStatus title="Operation completed successfully." />
          </div>
          <CustomSyntaxHighlighter content='<InformationStatus title="Operation completed successfully." />' />
        </div>
      </section>

      {/* Types */}
      <section id="types">
        <h2 className="mb-4 text-2xl font-bold">Types</h2>
        <p className="mb-4 text-neutral-grey">Different status types for various scenarios.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-col gap-4">
              <InformationStatus type="success" title="Successfully saved your changes." />
              <InformationStatus type="warning" title="This action requires confirmation." />
              <InformationStatus type="error" title="An error occurred. Please try again." />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<InformationStatus type="success" title="Successfully saved your changes." />
<InformationStatus type="warning" title="This action requires confirmation." />
<InformationStatus type="error" title="An error occurred. Please try again." />`}
          />
        </div>
      </section>

      {/* With Icon */}
      <section id="with-icon">
        <h2 className="mb-4 text-2xl font-bold">With Icon</h2>
        <p className="mb-4 text-neutral-grey">Show default icons for each status type.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-col gap-4">
              <InformationStatus isHaveIcon type="success" title="Successfully saved your changes." />
              <InformationStatus isHaveIcon type="warning" title="This action requires confirmation." />
              <InformationStatus isHaveIcon type="error" title="An error occurred. Please try again." />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<InformationStatus isHaveIcon type="success" title="..." />
<InformationStatus isHaveIcon type="warning" title="..." />
<InformationStatus isHaveIcon type="error" title="..." />`}
          />
        </div>
      </section>

      {/* Custom Icon */}
      <section id="custom-icon">
        <h2 className="mb-4 text-2xl font-bold">Custom Icon</h2>
        <p className="mb-4 text-neutral-grey">Use custom icons instead of defaults.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-col gap-4">
              <InformationStatus isHaveIcon icon={<PlusIcon />} type="success" title="Item added successfully." />
              <InformationStatus isHaveIcon icon={<PlusIcon />} type="warning" title="Custom warning icon." />
              <InformationStatus isHaveIcon icon={<PlusIcon />} type="error" title="Custom error icon." />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<InformationStatus 
  isHaveIcon 
  icon={<PlusIcon />} 
  type="success" 
  title="Item added successfully." 
/>`}
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

export default InformationStatusPage;

