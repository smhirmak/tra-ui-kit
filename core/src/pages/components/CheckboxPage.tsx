import { useEffect } from 'react';
import Checkbox from '@/components/checkbox';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'rectangular', title: 'Rectangular', level: 2 },
  { id: 'circular', title: 'Circular', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'states', title: 'States', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'variant', type: '"rectangular" | "circular"', default: '"rectangular"', description: 'The shape variant of the checkbox' },
  { prop: 'size', type: '"sm" | "default" | "lg"', default: '"default"', description: 'The checkbox size' },
  { prop: 'label', type: 'string', default: '-', description: 'Label text for the checkbox' },
  { prop: 'checked', type: 'boolean', default: 'false', description: 'Whether the checkbox is checked' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox' },
  { prop: 'id', type: 'string', default: '-', description: 'ID for the checkbox input' },
];

const CheckboxPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Checkbox</h1>
        <p className="text-lg text-neutral-grey">
          A versatile checkbox component with multiple variants, sizes, and states for user selections.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add checkbox' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="checkbox" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Checkbox id="basic" label="Label" />
          </div>
          <CustomSyntaxHighlighter content='<Checkbox id="basic" label="Label" />' />
        </div>
      </section>

      {/* Variants */}
      <section id="variants">
        <h2 className="mb-4 text-2xl font-bold">Variants</h2>

        {/* Rectangular */}
        <div id="rectangular" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Rectangular</h3>
          <p className="text-neutral-grey">The default rectangular checkbox variant.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <Checkbox id="1" size="sm" />
              <Checkbox id="2" size="sm" label="Label" />
              <Checkbox id="3" />
              <Checkbox id="4" label="Label" />
              <Checkbox id="5" size="lg" />
              <Checkbox id="6" size="lg" label="Label" />
            </div>
          </div>
          <CustomSyntaxHighlighter content='<Checkbox id="basic" label="Label" />' />
        </div>

        {/* Circular */}
        <div id="circular" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Circular</h3>
          <p className="text-neutral-grey">Checkbox with circular shape.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <Checkbox id="10" size="sm" variant="circular" />
              <Checkbox id="11" size="sm" variant="circular" label="Label" />
              <Checkbox id="12" variant="circular" />
              <Checkbox id="13" variant="circular" label="Label" />
              <Checkbox id="14" size="lg" variant="circular" />
              <Checkbox id="15" size="lg" variant="circular" label="Label" />
            </div>
          </div>
          <CustomSyntaxHighlighter content='<Checkbox id="circular" variant="circular" label="Label" />' />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Checkbox comes in three different sizes.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex items-center gap-4">
            <Checkbox id="20" size="sm" label="Small" />
            <Checkbox id="21" label="Default" />
            <Checkbox id="22" size="lg" label="Large" />
          </div>
        </div>
        <CustomSyntaxHighlighter className="mb-2" content='<Checkbox id="sm" size="sm" label="Small" />' />
        <CustomSyntaxHighlighter className="mb-2" content='<Checkbox id="default" label="Default" />' />
        <CustomSyntaxHighlighter content='<Checkbox id="lg" size="lg" label="Large" />' />
      </section>

      {/* States */}
      <section id="states">
        <h2 className="mb-4 text-2xl font-bold">States</h2>
        <p className="mb-4 text-neutral-grey">Checkboxes support various states including checked and disabled.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <Checkbox id="30" label="Default" />
            <Checkbox id="31" checked label="Checked" />
            <Checkbox id="32" disabled label="Disabled" />
            <Checkbox id="33" disabled checked label="Disabled Checked" />
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Checkbox id="disabled" disabled checked label="Disabled Checked" />' />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default CheckboxPage;

