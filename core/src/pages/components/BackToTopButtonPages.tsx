import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTOC } from '@/contexts/toc/TOCContext';
import { Tab, Tabs } from '@/components/tabs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'custom-icon', title: 'Custom Icon', level: 1 },
  { id: 'styling', title: 'Custom Styling', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'buttonClassName', type: 'string', default: '-', description: 'Custom class name for the button' },
  { prop: 'containerClassName', type: 'string', default: '-', description: 'Custom class name for the container' },
  { prop: 'icon', type: 'ReactNode', default: '<CaretUpIcon />', description: 'Custom icon to display in the button' },
  { prop: 'iconClassName', type: 'string', default: '-', description: 'Custom class name for the icon' },
  { prop: 'scrollThreshold', type: 'number', default: '500', description: 'The scroll position (in pixels) at which the button becomes visible' },
];

const BackToTopButtonPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Back To Top Button</h1>
        <p className="text-lg text-neutral-grey">
          A floating button that appears when scrolling down and smoothly scrolls the page back to the top when clicked.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add back-to-top-button' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="back-to-top-button" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">
            The Back To Top button is typically placed in your main layout or App component. It will automatically appear when the user scrolls down 500px.
          </p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex min-h-50 items-center justify-center">
              <p className="text-center text-neutral-grey">
                Scroll down on this page to see the Back To Top button in action!
                <br />
                <span className="text-sm">(Look at the bottom right corner)</span>
              </p>
            </div>
          </div>
          <CustomSyntaxHighlighter content={`import BackToTopButton from '@/components/back-to-top-button';

function App() {
  return (
    <div>
      {/* Your app content */}
      <BackToTopButton />
    </div>
  );
}`} />
        </div>
      </section>

      {/* Custom Icon */}
      <section id="custom-icon">
        <h2 className="mb-4 text-2xl font-bold">Custom Icon</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">You can customize the icon displayed in the button.</p>
          <CustomSyntaxHighlighter content={`import { ArrowUpIcon } from '@phosphor-icons/react';
import BackToTopButton from '@/components/back-to-top-button';

<BackToTopButton 
  icon={<ArrowUpIcon className="w-6 h-6" />}
/>`} />
        </div>
      </section>

      {/* Custom Styling */}
      <section id="styling">
        <h2 className="mb-4 text-2xl font-bold">Custom Styling</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">Customize the button appearance with className props.</p>
          <CustomSyntaxHighlighter content={`<BackToTopButton 
  containerClassName="bottom-20 right-10"
  buttonClassName="bg-primary text-white hover:bg-primary/80"
  iconClassName="w-8 h-8"
/>`} />
        </div>

        {/* Examples */}
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Styling Examples</h3>
          <div className="space-y-6">
            {/* Default */}
            <div className="space-y-2">
              <p className="font-medium">Default Style</p>
              <CustomSyntaxHighlighter content={`<BackToTopButton />`} />
            </div>

            {/* Custom Position */}
            <div className="space-y-2">
              <p className="font-medium">Custom Position (Bottom Left)</p>
              <CustomSyntaxHighlighter content={`<BackToTopButton 
  containerClassName="bottom-16 left-5 right-auto"
/>`} />
            </div>

            {/* Custom Colors */}
            <div className="space-y-2">
              <p className="font-medium">Custom Colors</p>
              <CustomSyntaxHighlighter content={`<BackToTopButton 
  buttonClassName="border-primary text-primary hover:bg-primary hover:text-white"
/>`} />
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default BackToTopButtonPage;