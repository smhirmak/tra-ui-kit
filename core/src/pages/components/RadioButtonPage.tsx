import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/radio-buttons';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'states', title: 'States', level: 1 },
  { id: 'controlled', title: 'Controlled', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'id', type: 'string', default: '-', description: 'Unique identifier for the radio input' },
  { prop: 'value', type: 'string', default: '-', description: 'Value of the radio button' },
  { prop: 'label', type: 'string', default: '-', description: 'Label text for the radio button' },
  { prop: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the radio button' },
  { prop: 'name', type: 'string', default: '-', description: 'Name attribute for grouping' },
  { prop: 'className', type: 'string', default: '-', description: 'Custom CSS class' },
];

const RadioButtonPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState('2');

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Radio Buttons</h1>
        <p className="text-lg text-neutral-grey">
          Radio button components for single selection from a group of options.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add radio-buttons' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="radio-buttons" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <RadioGroup className="flex flex-col gap-2" defaultValue="1">
              <RadioGroupItem id="1" value="1" label="Option 1" />
              <RadioGroupItem id="2" value="2" label="Option 2" />
              <RadioGroupItem id="3" value="3" label="Option 3" />
            </RadioGroup>
          </div>
          <CustomSyntaxHighlighter
            content={`<RadioGroup defaultValue="1">
  <RadioGroupItem id="1" value="1" label="Option 1" />
  <RadioGroupItem id="2" value="2" label="Option 2" />
  <RadioGroupItem id="3" value="3" label="Option 3" />
</RadioGroup>`}
          />
        </div>
      </section>

      {/* States */}
      <section id="states">
        <h2 className="mb-4 text-2xl font-bold">States</h2>
        <p className="mb-4 text-neutral-grey">Radio buttons support various states including checked and disabled.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <RadioGroup className="flex flex-col gap-2" defaultValue="2">
            <RadioGroupItem id="r1" value="1" label="Default" />
            <RadioGroupItem id="r2" value="2" label="Checked" />
            <RadioGroupItem id="r3" value="3" label="Disabled" disabled />
            <RadioGroupItem id="r4" value="4" label="Checked & Disabled" checked disabled />
          </RadioGroup>
        </div>
        <CustomSyntaxHighlighter
          content={`<RadioGroup defaultValue="2">
  <RadioGroupItem id="r1" value="1" label="Default" />
  <RadioGroupItem id="r2" value="2" label="Checked" />
  <RadioGroupItem id="r3" value="3" label="Disabled" disabled />
  <RadioGroupItem id="r4" value="4" label="Checked & Disabled" checked disabled />
</RadioGroup>`}
        />
      </section>

      {/* Controlled */}
      <section id="controlled">
        <h2 className="mb-4 text-2xl font-bold">Controlled</h2>
        <p className="mb-4 text-neutral-grey">Controlled radio group with state management.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-4">
              <RadioGroup
                className="flex flex-col gap-2"
                defaultValue={selectedValue}
                onChange={(value) => setSelectedValue(value as string)}
              >
                <RadioGroupItem id="c1" value="1" label="React" />
                <RadioGroupItem id="c2" value="2" label="Vue" />
                <RadioGroupItem id="c3" value="3" label="Angular" />
              </RadioGroup>
              <p className="text-sm text-neutral-grey">Selected: {selectedValue}</p>
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`const [selectedValue, setSelectedValue] = useState('2');

<RadioGroup 
  defaultValue={selectedValue}
  onChange={(value) => setSelectedValue(value)}
>
  <RadioGroupItem id="c1" value="1" label="React" />
  <RadioGroupItem id="c2" value="2" label="Vue" />
  <RadioGroupItem id="c3" value="3" label="Angular" />
</RadioGroup>`}
          />
        </div>
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default RadioButtonPage;

