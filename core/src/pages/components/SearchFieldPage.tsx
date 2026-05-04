import { useEffect, useState } from 'react';
import SearchField from '@/components/ui/search-field';
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
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'filled', title: 'Filled', level: 2 },
  { id: 'outlined', title: 'Outlined', level: 2 },
  { id: 'underlined', title: 'Underlined', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'disabled-state', title: 'Disabled State', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'value', type: 'string | number', default: '-', description: 'The input value' },
  {
    prop: 'onChange',
    type: '(e: ChangeEvent) => void',
    default: '-',
    description: 'Change handler',
  },
  {
    prop: 'variant',
    type: '"filled" | "outlined" | "underlined"',
    default: '"filled"',
    description: 'Visual variant style',
  },
  {
    prop: 'size',
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: 'Input field size',
  },
  { prop: 'label', type: 'string', default: '-', description: 'Label text' },
  { prop: 'placeholder', type: 'string', default: '"Search"', description: 'Placeholder text' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input' },
  {
    prop: 'borderRadius',
    type: '"default" | "lg"',
    default: '"default"',
    description: 'Border radius style',
  },
];

const SearchFieldPage = () => {
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
        <h1 className="mb-4 text-4xl font-bold">Search Field</h1>
        <p className="text-lg text-neutral-grey">
          A specialized input field designed for search functionality with built-in search icon.
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
            <CustomSyntaxHighlighter content="npx msi-ui-cli add search-field" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="search-field" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <SearchField
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<SearchField 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>`}
          />
        </div>
      </section>

      {/* Variants */}
      <section id="variants">
        <h2 className="mb-4 text-2xl font-bold">Variants</h2>

        {/* Filled */}
        <div
          id="filled"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Filled</h3>
          <p className="text-neutral-grey">Default filled variant with background.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <SearchField
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <SearchField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="Search"
              />
              <SearchField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search items..."
              />
            </div>
          </div>
          <CustomSyntaxHighlighter content='<SearchField variant="filled" value={value} onChange={onChange} />' />
        </div>

        {/* Outlined */}
        <div
          id="outlined"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Outlined</h3>
          <p className="text-neutral-grey">Outlined variant with border.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <SearchField
                variant="outlined"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <SearchField
                variant="outlined"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="Search"
              />
              <SearchField
                variant="outlined"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search items..."
              />
            </div>
          </div>
          <CustomSyntaxHighlighter content='<SearchField variant="outlined" value={value} onChange={onChange} />' />
        </div>

        {/* Underlined */}
        <div
          id="underlined"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Underlined</h3>
          <p className="text-neutral-grey">Minimal underlined variant.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-wrap gap-4">
              <SearchField
                variant="underlined"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <SearchField
                variant="underlined"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="Search"
              />
              <SearchField
                variant="underlined"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search items..."
              />
            </div>
          </div>
          <CustomSyntaxHighlighter content='<SearchField variant="underlined" value={value} onChange={onChange} />' />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Available size options for search field.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap items-center gap-4">
            <SearchField
              size="sm"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Small"
            />
            <SearchField
              size="default"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Default"
            />
            <SearchField
              size="lg"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Large"
            />
          </div>
        </div>
        <CustomSyntaxHighlighter
          className="mb-2"
          content='<SearchField size="sm" ... />'
        />
        <CustomSyntaxHighlighter
          className="mb-2"
          content='<SearchField size="default" ... />'
        />
        <CustomSyntaxHighlighter content='<SearchField size="lg" ... />' />
      </section>

      {/* Disabled State */}
      <section id="disabled-state">
        <h2 className="mb-4 text-2xl font-bold">Disabled State</h2>
        <p className="mb-4 text-neutral-grey">Disabled search fields are non-interactive.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-wrap gap-4">
            <SearchField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled
            />
            <SearchField
              variant="outlined"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled
            />
          </div>
        </div>
        <CustomSyntaxHighlighter content="<SearchField disabled />" />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default SearchFieldPage;
