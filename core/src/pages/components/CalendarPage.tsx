import { useEffect, useState } from 'react';
import Calendar from '@/components/calendar';
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
  { id: 'single-date', title: 'Single Date Selection', level: 1 },
  { id: 'date-range', title: 'Date Range Selection', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'mode',
    type: '"single" | "range"',
    default: '"single"',
    description: 'Selection mode for the calendar',
  },
  {
    prop: 'selected',
    type: 'Date | DateRange',
    default: 'undefined',
    description: 'Selected date or date range',
  },
  {
    prop: 'onSelect',
    type: '(date: Date | DateRange) => void',
    default: 'undefined',
    description: 'Callback when date is selected',
  },
  {
    prop: 'disabled',
    type: 'Date[] | ((date: Date) => boolean)',
    default: 'undefined',
    description: 'Disable specific dates',
  },
  {
    prop: 'locale',
    type: 'Locale',
    default: 'undefined',
    description: 'date-fns locale for month/day names',
  },
  {
    prop: 'numberOfMonths',
    type: 'number',
    default: '1',
    description: 'Number of months to display simultaneously',
  },
  {
    prop: 'startMonth',
    type: 'Date',
    default: 'undefined',
    description: 'First selectable month (navigation start)',
  },
  {
    prop: 'endMonth',
    type: 'Date',
    default: 'new Date((new Date().getFullYear() + 100), 11, 31)',
    description: 'Last selectable date',
  },
  {
    prop: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional CSS classes',
  },
];

const CalendarPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<
    { from: Date | undefined; to?: Date | undefined } | undefined
  >({
    from: new Date(),
    to: undefined,
  });

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Calendar</h1>
        <p className="text-lg text-neutral-grey">
          A flexible calendar component for date selection. Built with{' '}
          <code className="text-neutral-light-black">react-day-picker</code> for powerful date
          handling capabilities.
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
            <CustomSyntaxHighlighter content="npx msi-ui-cli add calendar" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="calendar" />
          </Tab>
        </Tabs>
        <p className="mt-4 text-sm text-neutral-grey">
          This component uses <strong>react-day-picker</strong> under the hood for advanced date
          selection features.
        </p>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="w-fit">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar 
  mode="single" 
  selected={date} 
  onSelect={setDate} 
/>`}
          />
        </div>
      </section>

      {/* Single Date */}
      <section id="single-date">
        <h2 className="mb-4 text-2xl font-bold">Single Date Selection</h2>
        <p className="mb-4 text-neutral-grey">Select a single date from the calendar.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="w-fit">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </div>
            <p className="mt-4 text-sm text-neutral-grey">
              Selected: {date ? date.toLocaleDateString() : 'No date selected'}
            </p>
          </div>
          <CustomSyntaxHighlighter
            content={`const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar 
  mode="single" 
  selected={date} 
  onSelect={setDate} 
/>`}
          />
        </div>
      </section>

      {/* Date Range */}
      <section id="date-range">
        <h2 className="mb-4 text-2xl font-bold">Date Range Selection</h2>
        <p className="mb-4 text-neutral-grey">Select a range of dates with from and to.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="w-fit">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                required={false}
              />
            </div>
            <p className="mt-4 text-sm text-neutral-grey">
              From: {dateRange?.from ? dateRange.from.toLocaleDateString() : 'Not selected'}
              {' | '}
              To: {dateRange?.to ? dateRange.to.toLocaleDateString() : 'Not selected'}
            </p>
          </div>
          <CustomSyntaxHighlighter
            content={`const [dateRange, setDateRange] = useState<{ from: Date | undefined; to?: Date | undefined }>({
  from: new Date(),
  to: undefined,
});

<Calendar 
  mode="range" 
  selected={dateRange} 
  onSelect={setDateRange} 
/>`}
          />
        </div>
      </section>

      {/* API */}
      <section id="api">
        <ApiTable tableData={apiTableData} />
      </section>
    </div>
  );
};

export default CalendarPage;
