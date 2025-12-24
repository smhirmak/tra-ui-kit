import { useEffect } from 'react';
import Skeleton from '@/components/skeleton';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'animation', title: 'Animation', level: 1 },
  { id: 'custom-sizes', title: 'Custom Sizes', level: 1 },
  { id: 'complex-layouts', title: 'Complex Layouts', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'className', type: 'string', default: '-', description: 'Custom CSS class for styling' },
  { prop: 'animation', type: 'boolean', default: 'true', description: 'Enable pulse animation' },
];

const SkeletonPage = () => {
  const { setTocItems } = useTOC();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Skeleton</h1>
        <p className="text-lg text-neutral-grey">
          Loading placeholder components to indicate content is being fetched.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <CustomSyntaxHighlighter content='npx msi-ui-cli add skeleton' />
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Skeleton />
          </div>
          <CustomSyntaxHighlighter content='<Skeleton />' />
        </div>
      </section>

      {/* Animation */}
      <section id="animation">
        <h2 className="mb-4 text-2xl font-bold">Animation</h2>
        <p className="mb-4 text-neutral-grey">Toggle pulse animation on or off.</p>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold">With Animation (default)</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <div className="space-y-2">
                <Skeleton animation />
                <Skeleton className="h-6" animation />
                <Skeleton className="h-10" animation />
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Without Animation</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <div className="space-y-2">
                <Skeleton animation={false} />
                <Skeleton className="h-6" animation={false} />
                <Skeleton className="h-10" animation={false} />
              </div>
            </div>
          </div>
          <CustomSyntaxHighlighter className="mb-2" content='<Skeleton animation />' />
          <CustomSyntaxHighlighter content='<Skeleton animation={false} />' />
        </div>
      </section>

      {/* Custom Sizes */}
      <section id="custom-sizes">
        <h2 className="mb-4 text-2xl font-bold">Custom Sizes</h2>
        <p className="mb-4 text-neutral-grey">Use className to customize width and height.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<Skeleton className="h-4 w-32" />
<Skeleton className="h-6 w-48" />
<Skeleton className="h-8 w-64" />
<Skeleton className="h-12 w-full" />`}
        />
      </section>

      {/* Complex Layouts */}
      <section id="complex-layouts">
        <h2 className="mb-4 text-2xl font-bold">Complex Layouts</h2>
        <p className="mb-4 text-neutral-grey">Create complex loading layouts with multiple skeletons.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="size-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-32 w-full" />
            <div className="flex space-x-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<div className="space-y-4">
  <div className="flex items-center space-x-4">
    <Skeleton className="size-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
  <Skeleton className="h-32 w-full" />
</div>`}
        />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default SkeletonPage;

