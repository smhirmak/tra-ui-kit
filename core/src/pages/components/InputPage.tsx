import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import Input from '@/components/ui/input';
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
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'filled', title: 'Filled', level: 2 },
  { id: 'outlined', title: 'Outlined', level: 2 },
  { id: 'underlined', title: 'Underlined', level: 2 },
  { id: 'filled-underlined', title: 'Filled Underlined', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'with-icons', title: 'With Icons', level: 1 },
  { id: 'error-state', title: 'Error State', level: 1 },
  { id: 'disabled', title: 'Disabled', level: 1 },
  { id: 'password', title: 'Password Input', level: 1 },
  { id: 'textarea', title: 'Textarea', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'variant',
    type: '"filled" | "outlined" | "underlined" | "filledUnderlined"',
    default: '"filled"',
    description: 'Input style variant',
  },
  {
    prop: 'size',
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: 'Input size',
  },
  { prop: 'error', type: 'boolean', default: 'false', description: 'Error state styling' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  {
    prop: 'startIcon',
    type: 'React.ReactNode',
    default: 'undefined',
    description: 'Icon at start of input',
  },
  {
    prop: 'endIcon',
    type: 'React.ReactNode',
    default: 'undefined',
    description: 'Icon at end of input',
  },
  {
    prop: 'borderRadius',
    type: '"default" | "lg"',
    default: '"default"',
    description: 'Border radius style',
  },
  { prop: 'textarea', type: 'boolean', default: 'false', description: 'Render as textarea' },
];

const InputPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Input</h1>
        <p className="text-lg text-neutral-grey">
          A flexible input component with multiple variants, sizes, and icon support.
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
            <CustomSyntaxHighlighter content="npx msi-ui-cli add input" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="input" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Input
              placeholder="Enter text..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <CustomSyntaxHighlighter content='<Input placeholder="Enter text..." />' />
        </div>
      </section>

      {/* Variants */}
      <section id="variants">
        <h2 className="mb-4 text-2xl font-bold">Variants</h2>

        <div
          id="filled"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Filled</h3>
          <p className="text-neutral-grey">Filled background input with border.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Input
              variant="filled"
              placeholder="Filled input"
            />
          </div>
          <CustomSyntaxHighlighter content='<Input variant="filled" placeholder="Filled input" />' />
        </div>

        <div
          id="outlined"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Outlined</h3>
          <p className="text-neutral-grey">Outlined input without background.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Input
              variant="outlined"
              placeholder="Outlined input"
            />
          </div>
          <CustomSyntaxHighlighter content='<Input variant="outlined" placeholder="Outlined input" />' />
        </div>

        <div
          id="underlined"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Underlined</h3>
          <p className="text-neutral-grey">Input with bottom border only.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Input
              variant="underlined"
              placeholder="Underlined input"
            />
          </div>
          <CustomSyntaxHighlighter content='<Input variant="underlined" placeholder="Underlined input" />' />
        </div>

        <div
          id="filled-underlined"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Filled Underlined</h3>
          <p className="text-neutral-grey">Filled input with bottom border.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Input
              variant="filledUnderlined"
              placeholder="Filled underlined input"
            />
          </div>
          <CustomSyntaxHighlighter content='<Input variant="filledUnderlined" placeholder="Filled underlined input" />' />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Available size options.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-4">
              <Input
                size="sm"
                placeholder="Small"
              />
              <Input
                size="default"
                placeholder="Default"
              />
              <Input
                size="lg"
                placeholder="Large"
              />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<Input size="sm" placeholder="Small" />
<Input size="default" placeholder="Default" />
<Input size="lg" placeholder="Large" />`}
          />
        </div>
      </section>

      {/* With Icons */}
      <section id="with-icons">
        <h2 className="mb-4 text-2xl font-bold">With Icons</h2>
        <p className="mb-4 text-neutral-grey">Add icons at the start or end of input.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-4">
              <Input
                startIcon={<MagnifyingGlassIcon />}
                placeholder="Search..."
              />
              <Input
                endIcon={<MagnifyingGlassIcon />}
                placeholder="Search..."
              />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<Input startIcon={<MagnifyingGlassIcon />} placeholder="Search..." />
<Input endIcon={<MagnifyingGlassIcon />} placeholder="Search..." />`}
          />
        </div>
      </section>

      {/* Error State */}
      <section id="error-state">
        <h2 className="mb-4 text-2xl font-bold">Error State</h2>
        <p className="mb-4 text-neutral-grey">Display error state styling.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Input
              error
              placeholder="This field has an error"
            />
          </div>
          <CustomSyntaxHighlighter content='<Input error placeholder="This field has an error" />' />
        </div>
      </section>

      {/* Disabled */}
      <section id="disabled">
        <h2 className="mb-4 text-2xl font-bold">Disabled</h2>
        <p className="mb-4 text-neutral-grey">Disabled input state.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Input
              disabled
              placeholder="Disabled input"
              value="Cannot edit"
            />
          </div>
          <CustomSyntaxHighlighter content='<Input disabled placeholder="Disabled input" />' />
        </div>
      </section>

      {/* Password */}
      <section id="password">
        <h2 className="mb-4 text-2xl font-bold">Password Input</h2>
        <p className="mb-4 text-neutral-grey">Password input with toggle visibility.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Input
              type="password"
              placeholder="Enter password"
            />
          </div>
          <CustomSyntaxHighlighter content='<Input type="password" placeholder="Enter password" />' />
        </div>
      </section>

      {/* Textarea */}
      <section id="textarea">
        <h2 className="mb-4 text-2xl font-bold">Textarea</h2>
        <p className="mb-4 text-neutral-grey">Multi-line text input.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Input
              textarea
              placeholder="Enter multiple lines..."
            />
          </div>
          <CustomSyntaxHighlighter content='<Input textarea placeholder="Enter multiple lines..." />' />
        </div>
      </section>

      {/* API */}
      <section id="api">
        <ApiTable tableData={apiTableData} />
      </section>
    </div>
  );
};

export default InputPage;
