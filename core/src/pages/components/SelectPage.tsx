import { useEffect, useState } from 'react';
import Select from '@/components/ui/select';
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
  { id: 'searchable', title: 'Searchable', level: 1 },
  { id: 'multi-select', title: 'Multi Select', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'disabled-state', title: 'Disabled State', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'options',
    type: 'Array<{value: any, content: string}>',
    default: '-',
    description: 'Array of selectable options',
  },
  { prop: 'value', type: 'any', default: '-', description: 'Selected value(s)' },
  { prop: 'onChange', type: '(value: any) => void', default: '-', description: 'Change handler' },
  { prop: 'isMulti', type: 'boolean', default: 'false', description: 'Enable multi-selection' },
  {
    prop: 'isSearchable',
    type: 'boolean',
    default: 'false',
    description: 'Enable search functionality',
  },
  {
    prop: 'size',
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: 'Select field size',
  },
  { prop: 'label', type: 'string', default: '-', description: 'Label text' },
  { prop: 'placeholder', type: 'string', default: '"Select..."', description: 'Placeholder text' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select' },
  { prop: 'error', type: 'boolean', default: 'false', description: 'Shows error state' },
  {
    prop: 'forceTriggerWidth',
    type: 'boolean',
    default: 'false',
    description: 'Forces the dropdown to match the trigger width',
  },
];

const options = [
  { content: 'React', value: 'react' },
  { content: 'Vue.js', value: 'vue' },
  { content: 'Angular', value: 'angular' },
  { content: 'Svelte', value: 'svelte' },
  { content: 'Next.js', value: 'nextjs' },
];

const SelectPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const handleMultiChange = (value: string | number | boolean | string[] | number[]) => {
    if (Array.isArray(value)) {
      setMultiValue(value as string[]);
    } else {
      setMultiValue([String(value)]);
    }
  };

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Select</h1>
        <p className="text-lg text-neutral-grey">
          A versatile dropdown select component with support for single/multi selection and search
          functionality.
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
            <CustomSyntaxHighlighter content="npx tra-ui-cli add select" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="select" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Select
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Select a framework"
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<Select
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select a framework"
/>`}
          />
        </div>
      </section>

      {/* Searchable */}
      <section id="searchable">
        <h2 className="mb-4 text-2xl font-bold">Searchable</h2>
        <p className="mb-4 text-neutral-grey">Enable search to filter through options.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Select
            isSearchable
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Search framework..."
          />
        </div>
        <CustomSyntaxHighlighter
          content={`<Select
  isSearchable
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
/>`}
        />
      </section>

      {/* Multi Select */}
      <section id="multi-select">
        <h2 className="mb-4 text-2xl font-bold">Multi Select</h2>
        <p className="mb-4 text-neutral-grey">Allow multiple selections with multi mode.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Select
            isMulti
            options={options}
            value={multiValue}
            onChange={handleMultiChange}
            placeholder="Select multiple frameworks"
          />
        </div>
        <CustomSyntaxHighlighter
          content={`<Select
  isMulti
  options={options}
  value={multiValue}
  onChange={setMultiValue}
/>`}
        />
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Different size options for select field.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-col gap-4">
            <Select
              size="sm"
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Small"
            />
            <Select
              size="default"
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Default"
            />
            <Select
              size="lg"
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Large"
            />
          </div>
        </div>
        <CustomSyntaxHighlighter
          className="mb-2"
          content='<Select size="sm" ... />'
        />
        <CustomSyntaxHighlighter
          className="mb-2"
          content='<Select size="default" ... />'
        />
        <CustomSyntaxHighlighter content='<Select size="lg" ... />' />
      </section>

      {/* Disabled State */}
      <section id="disabled-state">
        <h2 className="mb-4 text-2xl font-bold">Disabled State</h2>
        <p className="mb-4 text-neutral-grey">Disabled select fields are non-interactive.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Select
            disabled
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Disabled"
          />
        </div>
        <CustomSyntaxHighlighter content="<Select disabled ... />" />
      </section>

      {/* Force Trigger Width */}
      <section id="force-trigger-width">
        <h2 className="mb-4 text-2xl font-bold">Force Trigger Width</h2>
        <p className="mb-4 text-neutral-grey">Forces the dropdown to match the trigger width.</p>
        <div className="flex gap-8 rounded-lg border border-border bg-background p-6">
          <Select
            className="w-full"
            forceTriggerWidth
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Force Trigger Width"
          />
          <Select
            className="w-full"
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Default Width"
          />
        </div>
        <CustomSyntaxHighlighter content="<Select forceTriggerWidth ... />" />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default SelectPage;
