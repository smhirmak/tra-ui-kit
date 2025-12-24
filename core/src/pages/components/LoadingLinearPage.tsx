import { useEffect } from 'react';
import LoadingLinear from '@/components/loading-linear';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'custom-style', title: 'Custom Styling', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'linearContainerClassName', type: 'string', default: 'undefined', description: 'Custom class for container' },
  { prop: 'linearItemClassName', type: 'string', default: 'undefined', description: 'Custom class for progress bar' },
  { prop: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes' },
];

const LoadingLinearPage = () => {
  const { setTocItems } = useTOC();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Loading Linear</h1>
        <p className="text-lg text-neutral-grey">
          An animated linear progress bar for indicating loading states.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <CustomSyntaxHighlighter content='npx msi-ui-cli add loading-linear' />
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <LoadingLinear />
          </div>
          <CustomSyntaxHighlighter content='<LoadingLinear />' />
        </div>
      </section>

      {/* Custom Style */}
      <section id="custom-style">
        <h2 className="mb-4 text-2xl font-bold">Custom Styling</h2>
        <p className="mb-4 text-neutral-grey">Customize the container and progress bar appearance.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-sm text-neutral-grey">Custom container height:</p>
                <LoadingLinear linearContainerClassName="h-2" />
              </div>
              <div>
                <p className="mb-2 text-sm text-neutral-grey">Custom bar color:</p>
                <LoadingLinear linearItemClassName="bg-secondary" />
              </div>
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<LoadingLinear linearContainerClassName="h-2" />
<LoadingLinear linearItemClassName="bg-secondary" />`}
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

export default LoadingLinearPage;

