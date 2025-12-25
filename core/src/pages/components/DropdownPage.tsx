import { useEffect, useState } from 'react';
import Dropdown from '@/components/dropdown';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';
import Notification from '@/components/notification';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'controlled', title: 'Controlled', level: 1 },
  { id: 'default-value', title: 'Default Value', level: 1 },
  { id: 'states', title: 'States', level: 1 },
  { id: 'alignment', title: 'Alignment', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'options', type: 'Array<{label: string, value: string | number | boolean}>', default: '-', description: 'Available options' },
  { prop: 'value', type: 'string | number | boolean', default: '-', description: 'Controlled value' },
  { prop: 'defaultValue', type: 'string | number | boolean', default: '-', description: 'Default selected value' },
  { prop: 'onChange', type: '(value: string | number | boolean) => void', default: '-', description: 'Callback when value changes' },
  { prop: 'placeholder', type: 'string', default: '-', description: 'Placeholder text' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the dropdown' },
  { prop: 'dropdownAlign', type: '"left" | "right"', default: '"left"', description: 'Dropdown menu alignment' },
];

const sampleOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const DropdownPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const { info } = Notification();
  const [controlledValue, setControlledValue] = useState<string | number | boolean | undefined>('2');
  const [basicValue, setBasicValue] = useState<string | number | boolean | undefined>(undefined);

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Dropdown</h1>
        <p className="text-lg text-neutral-grey">
          A versatile dropdown component for selecting from a list of options with support for controlled and uncontrolled modes.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add dropdown' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="dropdown" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Dropdown
              options={sampleOptions}
              onChange={v => setBasicValue(v)}
              placeholder="Choose an option"
            />
            <div className="mt-2 text-sm text-neutral-grey">Selected: {String(basicValue ?? 'none')}</div>
          </div>
          <CustomSyntaxHighlighter content={`<Dropdown
  options={sampleOptions}
  onChange={v => setBasicValue(v)}
  placeholder="Choose an option"
/>`} />
        </div>
      </section>

      {/* Controlled */}
      <section id="controlled">
        <h2 className="mb-4 text-2xl font-bold">Controlled</h2>
        <p className="mb-4 text-neutral-grey">Use value and onChange props for controlled behavior.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Dropdown
            options={sampleOptions}
            value={controlledValue}
            onChange={v => setControlledValue(v)}
          />
          <div className="mt-2 text-sm text-neutral-grey">Controlled value: {String(controlledValue)}</div>
        </div>
        <CustomSyntaxHighlighter content={`<Dropdown
  options={sampleOptions}
  value={controlledValue}
  onChange={v => setControlledValue(v)}
/>`} />
      </section>

      {/* Default Value */}
      <section id="default-value">
        <h2 className="mb-4 text-2xl font-bold">Default Value</h2>
        <p className="mb-4 text-neutral-grey">Set an initial value with defaultValue prop.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Dropdown
            options={sampleOptions}
            defaultValue={'3'}
            onChange={v => info(`default changed: ${v}`)}
          />
        </div>
        <CustomSyntaxHighlighter content={`<Dropdown
  options={sampleOptions}
  defaultValue={'3'}
  onChange={v => info('default changed', v)}
/>`} />
      </section>

      {/* States */}
      <section id="states">
        <h2 className="mb-4 text-2xl font-bold">States</h2>
        <p className="mb-4 text-neutral-grey">Dropdown can be disabled.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Dropdown
            options={sampleOptions}
            disabled
            placeholder="Disabled"
          />
        </div>
        <CustomSyntaxHighlighter content='<Dropdown options={sampleOptions} disabled placeholder="Disabled" />' />
      </section>

      {/* Alignment */}
      <section id="alignment">
        <h2 className="mb-4 text-2xl font-bold">Alignment</h2>
        <p className="mb-4 text-neutral-grey">Control dropdown menu alignment with dropdownAlign prop.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex justify-end">
            <div className="max-w-xs">
              <Dropdown
                options={sampleOptions}
                placeholder="Right aligned"
                dropdownAlign="right"
              />
            </div>
          </div>
        </div>
        <CustomSyntaxHighlighter content='<Dropdown options={sampleOptions} dropdownAlign="right" />' />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default DropdownPage;
