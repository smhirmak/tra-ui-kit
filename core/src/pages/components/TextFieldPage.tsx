import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import TextField from '@/components/ui/text-field';
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
  { id: 'with-label', title: 'With Label', level: 1 },
  { id: 'with-tooltip', title: 'With Tooltip', level: 1 },
  { id: 'error-state', title: 'Error State', level: 1 },
  { id: 'disabled', title: 'Disabled', level: 1 },
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
  { prop: 'label', type: 'string', default: 'undefined', description: 'Label text' },
  {
    prop: 'tooltip',
    type: 'string',
    default: 'undefined',
    description: 'Tooltip text with info icon',
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
  { prop: 'required', type: 'boolean', default: 'false', description: 'Shows required indicator' },
];

const TextFieldPage = () => {
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
        <h1 className="mb-4 text-4xl font-bold">TextField</h1>
        <p className="text-lg text-neutral-grey">
          A complete text field component combining Input and Label with multiple variants, sizes,
          and additional features.
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
            <CustomSyntaxHighlighter content="npx tra-ui-cli add text-field" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="text-field" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <TextField
              label="Email"
              placeholder="Enter your email"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <CustomSyntaxHighlighter content='<TextField label="Email" placeholder="Enter your email" />' />
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
          <p className="text-neutral-grey">Filled background with label.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <TextField
              variant="filled"
              label="Username"
              placeholder="Enter username"
            />
          </div>
          <CustomSyntaxHighlighter content='<TextField variant="filled" label="Username" placeholder="Enter username" />' />
        </div>

        <div
          id="outlined"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Outlined</h3>
          <p className="text-neutral-grey">Outlined with floating label.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <TextField
              variant="outlined"
              label="Email"
              placeholder="Enter email"
            />
          </div>
          <CustomSyntaxHighlighter content='<TextField variant="outlined" label="Email" placeholder="Enter email" />' />
        </div>

        <div
          id="underlined"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Underlined</h3>
          <p className="text-neutral-grey">Bottom border only.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <TextField
              variant="underlined"
              label="Password"
              type="password"
            />
          </div>
          <CustomSyntaxHighlighter content='<TextField variant="underlined" label="Password" type="password" />' />
        </div>

        <div
          id="filled-underlined"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Filled Underlined</h3>
          <p className="text-neutral-grey">Filled background with bottom border.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <TextField
              variant="filledUnderlined"
              label="Phone"
              placeholder="+1 234 567 8900"
            />
          </div>
          <CustomSyntaxHighlighter content='<TextField variant="filledUnderlined" label="Phone" placeholder="+1 234 567 8900" />' />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Available size options.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-4">
              <TextField
                size="sm"
                label="Small"
                placeholder="Small size"
              />
              <TextField
                size="default"
                label="Default"
                placeholder="Default size"
              />
              <TextField
                size="lg"
                label="Large"
                placeholder="Large size"
              />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<TextField size="sm" label="Small" />
<TextField size="default" label="Default" />
<TextField size="lg" label="Large" />`}
          />
        </div>
      </section>

      {/* With Icons */}
      <section id="with-icons">
        <h2 className="mb-4 text-2xl font-bold">With Icons</h2>
        <p className="mb-4 text-neutral-grey">Add icons to enhance the input.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-4">
              <TextField
                label="Search"
                startIcon={<MagnifyingGlassIcon />}
                placeholder="Search..."
              />
              <TextField
                label="Search"
                endIcon={<MagnifyingGlassIcon />}
                placeholder="Search..."
              />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<TextField 
  label="Search" 
  startIcon={<MagnifyingGlassIcon />} 
  placeholder="Search..." 
/>

<TextField 
  label="Search" 
  endIcon={<MagnifyingGlassIcon />} 
  placeholder="Search..." 
/>`}
          />
        </div>
      </section>

      {/* With Label */}
      <section id="with-label">
        <h2 className="mb-4 text-2xl font-bold">With Label</h2>
        <p className="mb-4 text-neutral-grey">Labels are integrated and styled automatically.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <TextField
              label="Full Name"
              placeholder="John Doe"
              showRequiredIcon
            />
          </div>
          <CustomSyntaxHighlighter content='<TextField label="Full Name" placeholder="John Doe" required />' />
        </div>
      </section>

      {/* With Tooltip */}
      <section id="with-tooltip">
        <h2 className="mb-4 text-2xl font-bold">With Tooltip</h2>
        <p className="mb-4 text-neutral-grey">Add helpful tooltips to labels.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <TextField
              label="API Key"
              tooltip="Your unique API key for authentication"
              placeholder="Enter API key"
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<TextField 
  label="API Key" 
  tooltip="Your unique API key for authentication" 
  placeholder="Enter API key" 
/>`}
          />
        </div>
      </section>

      {/* Error State */}
      <section id="error-state">
        <h2 className="mb-4 text-2xl font-bold">Error State</h2>
        <p className="mb-4 text-neutral-grey">Display error state styling.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <TextField
              label="Email"
              error
              placeholder="invalid@email"
              value="invalid@email"
            />
          </div>
          <CustomSyntaxHighlighter content='<TextField label="Email" error placeholder="invalid@email" />' />
        </div>
      </section>

      {/* Disabled */}
      <section id="disabled">
        <h2 className="mb-4 text-2xl font-bold">Disabled</h2>
        <p className="mb-4 text-neutral-grey">Disabled text field state.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <TextField
              label="Username"
              disabled
              value="john_doe"
            />
          </div>
          <CustomSyntaxHighlighter content='<TextField label="Username" disabled value="john_doe" />' />
        </div>
      </section>

      {/* API */}
      <section id="api">
        <ApiTable tableData={apiTableData} />
      </section>
    </div>
  );
};

export default TextFieldPage;
