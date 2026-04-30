import { useEffect } from 'react';
import { enUS, tr } from 'date-fns/locale';
import DatePicker from '@/components/date-picker';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'modes', title: 'Modes', level: 1 },
  { id: 'states', title: 'States', level: 1 },
  { id: 'constraints', title: 'Date Constraints', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'id', type: 'string', default: '-', description: 'HTML id attribute' },
  {
    prop: 'label',
    type: 'string',
    default: '-',
    description: 'Label text displayed above the picker',
  },
  {
    prop: 'labelClassName',
    type: 'string',
    default: '-',
    description: 'Custom CSS class for the label',
  },
  {
    prop: 'showRequiredIcon',
    type: 'boolean',
    default: 'false',
    description: 'Shows a required asterisk on the label',
  },
  {
    prop: 'tooltip',
    type: 'string | string[]',
    default: '-',
    description: 'Tooltip content shown next to the label',
  },
  {
    prop: 'locale',
    type: 'Locale',
    default: 'tr',
    description: 'date-fns locale for formatting and segment labels',
  },
  {
    prop: 'mode',
    type: '"single" | "range" | "multiple"',
    default: '"single"',
    description: 'Selection mode',
  },
  {
    prop: 'value',
    type: 'Date | DateRange | undefined',
    default: '-',
    description: 'Selected date value',
  },
  {
    prop: 'onChange',
    type: '(date?: Date | DateRange) => void',
    default: '-',
    description: 'Callback when date changes',
  },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the date picker' },
  { prop: 'error', type: 'boolean', default: 'false', description: 'Shows error state styling' },
  {
    prop: 'showCompleteButton',
    type: 'boolean',
    default: 'false',
    description: 'Show explicit complete button inside popover',
  },
  {
    prop: 'showClearButton',
    type: 'boolean',
    default: 'false',
    description: 'Show clear/reset button inside popover',
  },
  { prop: 'minDate', type: 'Date', default: '-', description: 'Minimum selectable date' },
  { prop: 'maxDate', type: 'Date', default: '-', description: 'Maximum selectable date' },
  {
    prop: 'onBlur',
    type: '() => void',
    default: '-',
    description: 'Called when picker loses focus',
  },
];

const DatePickerPage = () => {
  const { setTocItems } = useTOC();
  const { locale } = useLocalizeContext();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Date Picker</h1>
        <p className="text-lg text-neutral-grey">
          A comprehensive date picker component with single and range selection modes, supporting
          localization and date constraints.
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
            <CustomSyntaxHighlighter content="npx msi-ui-cli add date-picker" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="date-picker" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <DatePicker
              locale={locale === 'tr' ? tr : enUS}
              onChange={(date) => console.log(date)}
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<DatePicker
  locale={locale === 'tr' ? tr : enUS}
  onChange={date => console.log(date)}
/>`}
          />
        </div>
      </section>

      {/* Modes */}
      <section id="modes">
        <h2 className="mb-4 text-2xl font-bold">Modes</h2>
        <p className="mb-4 text-neutral-grey">
          Date picker supports single date and date range selection.
        </p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DatePicker
              locale={locale === 'tr' ? tr : enUS}
              onChange={(date) => console.log(date)}
            />
            <DatePicker
              locale={locale === 'tr' ? tr : enUS}
              mode="range"
              onChange={(date) => console.log(date)}
            />
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<DatePicker
  locale={locale === 'tr' ? tr : enUS}
  mode="range"
  onChange={date => console.log(date)}
/>`}
        />
      </section>

      {/* States */}
      <section id="states">
        <h2 className="mb-4 text-2xl font-bold">States</h2>
        <p className="mb-4 text-neutral-grey">Date picker supports disabled and error states.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DatePicker
              locale={locale === 'tr' ? tr : enUS}
              disabled
              onChange={(date) => console.log(date)}
            />
            <DatePicker
              locale={locale === 'tr' ? tr : enUS}
              error
              onChange={(date) => console.log(date)}
            />
          </div>
        </div>
        <CustomSyntaxHighlighter content="<DatePicker error />" />
      </section>

      {/* Constraints */}
      <section id="constraints">
        <h2 className="mb-4 text-2xl font-bold">Date Constraints</h2>
        <p className="mb-4 text-neutral-grey">Set minimum and maximum selectable dates.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <DatePicker
              locale={locale === 'tr' ? tr : enUS}
              minDate={new Date('2024-12-16')}
              onChange={(date) => console.log(date)}
            />
            <DatePicker
              locale={locale === 'tr' ? tr : enUS}
              maxDate={new Date('2024-12-20')}
              onChange={(date) => console.log(date)}
            />
            <DatePicker
              locale={locale === 'tr' ? tr : enUS}
              minDate={new Date('2024-12-16')}
              maxDate={new Date('2024-12-20')}
              onChange={(date) => console.log(date)}
            />
          </div>
        </div>
        <CustomSyntaxHighlighter
          content={`<DatePicker
  minDate={new Date('2024-12-16')}
  maxDate={new Date('2024-12-20')}
  onChange={date => console.log(date)}
/>`}
        />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default DatePickerPage;
