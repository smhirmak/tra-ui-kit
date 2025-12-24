import { useEffect } from 'react';
import Label from '@/components/label';
import Input from '@/components/input';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'with-tooltip', title: 'With Tooltip', level: 1 },
  { id: 'required', title: 'Required Field', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'size', type: '"sm" | "default" | "lg"', default: '"default"', description: 'Label text size' },
  { prop: 'required', type: 'boolean', default: 'false', description: 'Shows required asterisk' },
  { prop: 'tooltip', type: 'string', default: 'undefined', description: 'Tooltip text with info icon' },
  { prop: 'variant', type: '"filled" | "outlined" | "underlined" | "filledUnderlined"', default: 'undefined', description: 'Style variant for input pairing' },
  { prop: 'htmlFor', type: 'string', default: 'undefined', description: 'Associates label with input' },
  { prop: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes' },
];

const LabelPage = () => {
  const { setTocItems } = useTOC();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Label</h1>
        <p className="text-lg text-neutral-grey">
          A label component for form inputs with support for required fields, tooltips, and multiple sizes.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <CustomSyntaxHighlighter content='npx msi-ui-cli add label' />
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" placeholder="Enter your email" />`}
          />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Different label sizes to match input sizes.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label size="sm">Small Label</Label>
                <Input size="sm" placeholder="Small input" />
              </div>
              <div className="space-y-2">
                <Label size="default">Default Label</Label>
                <Input size="default" placeholder="Default input" />
              </div>
              <div className="space-y-2">
                <Label size="lg">Large Label</Label>
                <Input size="lg" placeholder="Large input" />
              </div>
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<Label size="sm">Small Label</Label>
<Input size="sm" />

<Label size="default">Default Label</Label>
<Input size="default" />

<Label size="lg">Large Label</Label>
<Input size="lg" />`}
          />
        </div>
      </section>

      {/* With Tooltip */}
      <section id="with-tooltip">
        <h2 className="mb-4 text-2xl font-bold">With Tooltip</h2>
        <p className="mb-4 text-neutral-grey">Add helpful information with a tooltip icon.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <Label tooltip="This field is used for authentication">Username</Label>
              <Input placeholder="Enter username" />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<Label tooltip="This field is used for authentication">
  Username
</Label>
<Input placeholder="Enter username" />`}
          />
        </div>
      </section>

      {/* Required */}
      <section id="required">
        <h2 className="mb-4 text-2xl font-bold">Required Field</h2>
        <p className="mb-4 text-neutral-grey">Mark fields as required with an asterisk.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-2">
              <Label showRequiredIcon>Password</Label>
              <Input type="password" placeholder="Enter password" />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<Label required>Password</Label>
<Input type="password" placeholder="Enter password" />`}
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

export default LabelPage;

