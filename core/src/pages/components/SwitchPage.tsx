import { useEffect, useState } from 'react';
import Switch from '@/components/ui/switch';
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
  { id: 'apple', title: 'Apple', level: 2 },
  { id: 'android', title: 'Android', level: 2 },
  { id: 'with-label', title: 'With Label', level: 1 },
  { id: 'disabled-state', title: 'Disabled State', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'id', type: 'string', default: '-', description: 'Unique identifier' },
  { prop: 'checked', type: 'boolean', default: '-', description: 'Checked state' },
  {
    prop: 'onChange',
    type: '(checked: boolean) => void',
    default: '-',
    description: 'Change handler',
  },
  {
    prop: 'variant',
    type: '"apple" | "android"',
    default: '"apple"',
    description: 'Visual style variant',
  },
  { prop: 'label', type: 'string', default: '-', description: 'Label text' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the switch' },
  {
    prop: 'showRequiredIcon',
    type: 'boolean',
    default: 'false',
    description: 'Show required indicator',
  },
  { prop: 'className', type: 'string', default: '-', description: 'Custom CSS class' },
];

const SwitchPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  const [appleChecked, setAppleChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Switch</h1>
        <p className="text-lg text-neutral-grey">
          Toggle switch component with Apple and Android style variants.
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
            <CustomSyntaxHighlighter content="npx tra-ui-cli add switch" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="switch" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <h2 className="mb-4 text-lg font-bold text-neutral-grey">Uncontrolled</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Switch id="switch-uncontrolled" />
          </div>
          <CustomSyntaxHighlighter content={`<Switch />`} />
        </div>
        <h2 className="mb-4 mt-8 text-lg font-bold text-neutral-grey">Controlled</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Switch
              id="switch-controlled"
              checked={appleChecked}
              onChange={setAppleChecked}
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<Switch
  id="switch-controlled"
  checked={checked}
  onChange={setChecked}
/>`}
          />
        </div>
      </section>

      {/* Variants */}
      <section id="variants">
        <h2 className="mb-4 text-2xl font-bold">Variants</h2>

        {/* Apple */}
        <div
          id="apple"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Apple</h3>
          <p className="text-neutral-grey">iOS-style switch with smooth toggle animation.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Switch
              id="apple-switch"
              variant="apple"
              checked={appleChecked}
              onChange={setAppleChecked}
              label="Apple Style"
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<Switch
  variant="apple"
  checked={checked}
  onChange={setChecked}
  label="Apple Style"
/>`}
          />
        </div>

        {/* Android */}
        <div
          id="android"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Android</h3>
          <p className="text-neutral-grey">Material Design-style switch.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Switch
              id="android-switch"
              variant="android"
              checked={androidChecked}
              onChange={setAndroidChecked}
              label="Android Style"
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<Switch
  variant="android"
  checked={checked}
  onChange={setChecked}
  label="Android Style"
/>`}
          />
        </div>
      </section>

      {/* With Label */}
      <section id="with-label">
        <h2 className="mb-4 text-2xl font-bold">With Label</h2>
        <p className="mb-4 text-neutral-grey">Add descriptive labels to switches.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-col gap-4">
            <Switch
              id="label-1"
              checked={appleChecked}
              onChange={setAppleChecked}
              label="Enable notifications"
            />
            <Switch
              id="label-2"
              variant="android"
              checked={androidChecked}
              onChange={setAndroidChecked}
              label="Dark mode"
            />
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<Switch
  checked={checked}
  onChange={setChecked}
  label="Enable notifications"
/>`}
        />
      </section>

      {/* Disabled State */}
      <section id="disabled-state">
        <h2 className="mb-4 text-2xl font-bold">Disabled State</h2>
        <p className="mb-4 text-neutral-grey">Disabled switches are non-interactive.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="flex flex-col gap-4">
            <Switch
              id="disabled-1"
              checked={false}
              onChange={() => {}}
              label="Disabled (Off)"
              disabled
            />
            <Switch
              id="disabled-2"
              checked={true}
              onChange={() => {}}
              label="Disabled (On)"
              disabled
            />
          </div>
        </div>
        <CustomSyntaxHighlighter content="<Switch disabled checked={false} />" />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default SwitchPage;
