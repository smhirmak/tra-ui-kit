import { useEffect, Suspense, lazy } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import Button from '@/components/button';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import VersionBanner from '@/components/version-banner';
import { useVersion } from '@/contexts/version';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';

// Dynamic import for versioned Button component
const getButtonComponent = (version: string) => {
  const versionNum = parseInt(version);

  // v0: Old implementation from versions folder
  if (versionNum === 0) {
    return lazy(() =>
      import(`@/versions/v0/components/button.tsx`).catch(() => {
        console.warn('v0 button not found, using default');
        return import('@/components/button');
      }),
    );
  }

  // v1+: Latest from components folder (default)
  return lazy(() => Promise.resolve({ default: Button }));
};

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'solid', title: 'Solid', level: 2 },
  { id: 'outlined', title: 'Outlined', level: 2 },
  { id: 'ghost', title: 'Ghost', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'colors', title: 'Colors', level: 1 },
  { id: 'loading-state', title: 'Loading State', level: 1 },
  { id: 'disabled-state', title: 'Disabled State', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'variant',
    type: '"solid" | "outlined" | "ghost"',
    default: '"solid"',
    description: 'The visual style variant',
  },
  {
    prop: 'size',
    type: '"sm" | "default" | "lg" | "icon"',
    default: '"default"',
    description: 'The button size',
  },
  {
    prop: 'color',
    type: '"primary" | "secondary" | "tertiary" | "error"',
    default: '"primary"',
    description: 'The color scheme',
  },
  {
    prop: 'rounded',
    type: '"default" | "lg"',
    default: '"default"',
    description: 'Border radius style (default: rounded-lg, lg: rounded-full)',
  },
  { prop: 'loading', type: 'boolean', default: 'false', description: 'Shows loading spinner' },
  {
    prop: 'loadingText',
    type: 'string',
    default: '"Sending..."',
    description: 'Text shown during loading',
  },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button' },
  { prop: 'className', type: 'string', default: '-', description: 'Additional CSS classes' },
  {
    prop: 'disableEffect',
    type: 'boolean',
    default: 'false',
    description: 'Disables the ripple click effect',
  },
];

const ButtonPage = () => {
  const { setTocItems } = useTOC();
  const { currentVersion } = useVersion();
  const { t } = useTranslation();

  // Dynamically load the correct Button version
  const Button = getButtonComponent(currentVersion);

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      <VersionBanner />

      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Button</h1>
        <p className="text-lg text-neutral-grey">
          A versatile button component with multiple variants, sizes, and states for various use
          cases.
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
            <CustomSyntaxHighlighter content="npx msi-ui-cli add button" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="button" />
          </Tab>
        </Tabs>
      </section>

      <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
        {/* Usage */}
        <section id="usage">
          <h2 className="mb-4 text-2xl font-bold">Usage</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-background p-6">
              <Button>Click me</Button>
            </div>
            <CustomSyntaxHighlighter content="<Button>Click me</Button>" />
          </div>
        </section>

        {/* Variants */}
        <section id="variants">
          <h2 className="mb-4 text-2xl font-bold">Variants</h2>

          {/* Solid */}
          <div
            id="solid"
            className="mb-8 space-y-4"
          >
            <h3 className="text-xl font-semibold">Solid</h3>
            <p className="text-neutral-grey">The default filled button variant.</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="solid">Solid Button</Button>
                <Button
                  variant="solid"
                  color="secondary"
                >
                  Secondary
                </Button>
                <Button
                  variant="solid"
                  color="tertiary"
                >
                  tertiary
                </Button>
              </div>
            </div>
            <CustomSyntaxHighlighter content='<Button variant="solid">Solid Button</Button>' />
          </div>

          {/* Outlined */}
          <div
            id="outlined"
            className="mb-8 space-y-4"
          >
            <h3 className="text-xl font-semibold">Outlined</h3>
            <p className="text-neutral-grey">Button with border and transparent background.</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="outlined">Outlined Button</Button>
                <Button
                  variant="outlined"
                  color="secondary"
                >
                  Secondary
                </Button>
                <Button
                  variant="outlined"
                  color="tertiary"
                >
                  tertiary
                </Button>
              </div>
            </div>
            <CustomSyntaxHighlighter content='<Button variant="outlined">Outlined Button</Button>' />
          </div>

          {/* Ghost */}
          <div
            id="ghost"
            className="mb-8 space-y-4"
          >
            <h3 className="text-xl font-semibold">Ghost</h3>
            <p className="text-neutral-grey">Minimal button with hover effect.</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost">Ghost Button</Button>
                <Button
                  variant="ghost"
                  color="secondary"
                >
                  Secondary
                </Button>
                <Button
                  variant="ghost"
                  color="tertiary"
                >
                  tertiary
                </Button>
              </div>
            </div>
            <CustomSyntaxHighlighter content='<Button variant="ghost">Ghost Button</Button>' />
          </div>
        </section>

        {/* Sizes */}
        <section id="sizes">
          <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
          <p className="mb-4 text-neutral-grey">Button comes in four different sizes.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <PlusIcon size={20} />
              </Button>
            </div>
          </div>
          <CustomSyntaxHighlighter
            className="mb-2"
            content='<Button size="sm">Small</Button>'
          />
          <CustomSyntaxHighlighter
            className="mb-2"
            content='<Button size="default">Default</Button>'
          />
          <CustomSyntaxHighlighter
            className="mb-2"
            content='<Button size="lg">Large</Button>'
          />
          <CustomSyntaxHighlighter content='<Button size="icon"><PlusIcon /></Button>' />
        </section>

        {/* Colors */}
        <section id="colors">
          <h2 className="mb-4 text-2xl font-bold">Colors</h2>
          <p className="mb-4 text-neutral-grey">Available color options for buttons.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="tertiary">tertiary</Button>
            </div>
          </div>
        </section>

        {/* Loading State */}
        <section id="loading-state">
          <h2 className="mb-4 text-2xl font-bold">Loading State</h2>
          <p className="mb-4 text-neutral-grey">Show loading indicator while processing.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <Button loading>Loading...</Button>
              <Button
                loading
                loadingText="Processing"
              >
                Submit
              </Button>
            </div>
          </div>
          <CustomSyntaxHighlighter content='<Button loading loadingText="Processing">Submit</Button>' />
        </section>

        {/* Disabled State */}
        <section id="disabled-state">
          <h2 className="mb-4 text-2xl font-bold">Disabled State</h2>
          <p className="mb-4 text-neutral-grey">Disabled buttons are non-interactive.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button
                variant="outlined"
                disabled
              >
                Disabled
              </Button>
              <Button
                variant="ghost"
                disabled
              >
                Disabled
              </Button>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <ApiTable tableData={apiTableData} />
      </Suspense>
    </div>
  );
};

export default ButtonPage;
