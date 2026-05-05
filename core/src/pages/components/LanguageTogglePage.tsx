import { useEffect } from 'react';
import LanguageToggle from '@/components/ui/language-toggle';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { Tab, Tabs } from '@/components/ui/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'setLocale',
    type: '(locale: string) => void',
    default: 'undefined',
    description: 'Custom locale setter function',
  },
  {
    prop: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional CSS classes',
  },
];

const LanguageTogglePage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  const { locale, setLocale } = useLocalizeContext();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Language Toggle</h1>
        <p className="text-lg text-neutral-grey">
          A language toggle component with flag icons for internationalization (i18n) support.
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
            <CustomSyntaxHighlighter content="npx tra-ui-cli add language-toggle" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="language-toggle" />
          </Tab>
        </Tabs>
        <p className="mt-4 text-sm text-neutral-grey">
          This component uses the Toggle component and LocalizeContext for language management.
        </p>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex items-center gap-4">
              <span className="text-neutral-grey">Toggle Language:</span>
              <LanguageToggle
                locale={locale}
                setLocale={setLocale}
              />
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<LanguageToggle
  locale={locale}
  setLocale={setLocale}
/>`}
          />
          <p className="text-sm text-neutral-grey">
            The component automatically saves the selected language to localStorage and updates the
            LocalizeContext.
          </p>
        </div>
      </section>

      {/* API */}
      <section id="api">
        <ApiTable tableData={apiTableData} />
        <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
          <h3 className="mb-2 font-semibold">Available Languages</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-neutral-grey">
            <li>Turkish (TR) - with Turkish flag icon</li>
            <li>English (EN) - with UK flag icon</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default LanguageTogglePage;
