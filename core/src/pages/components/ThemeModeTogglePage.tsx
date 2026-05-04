import { useEffect } from 'react';
import ThemeModeToggle from '@/components/ui/theme-mode-toggle';
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
  { id: 'custom-control', title: 'Custom Control', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'theme',
    type: '"light" | "dark"',
    default: 'undefined',
    description: 'Current theme (for controlled component)',
  },
  {
    prop: 'setTheme',
    type: '(theme: "light" | "dark") => void',
    default: 'undefined',
    description: 'Theme setter function',
  },
];

const ThemeModeTogglePage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Theme Mode Toggle</h1>
        <p className="text-lg text-neutral-grey">
          A button component to toggle between light and dark theme modes with animated icon
          transitions.
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
            <CustomSyntaxHighlighter content="npx tra-ui-cli add theme-mode-toggle" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="theme-mode-toggle" />
          </Tab>
        </Tabs>
        <p className="mt-4 text-sm text-neutral-grey">
          This component uses the ThemeProvider context to manage theme state.
        </p>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex justify-center">
              <ThemeModeToggle />
            </div>
          </div>
          <CustomSyntaxHighlighter content="<ThemeModeToggle />" />
          <p className="text-sm text-neutral-grey">
            The component automatically uses the ThemeProvider context. Click the button to toggle
            between themes.
          </p>
        </div>
      </section>

      {/* Custom Control */}
      <section id="custom-control">
        <h2 className="mb-4 text-2xl font-bold">Custom Control</h2>
        <p className="mb-4 text-neutral-grey">
          Use custom theme state management by providing theme and setTheme props.
        </p>
        <div className="space-y-4">
          <CustomSyntaxHighlighter
            content={`const [theme, setTheme] = useState<'light' | 'dark'>('light');

<ThemeModeToggle theme={theme} setTheme={setTheme} />`}
          />
        </div>
      </section>

      {/* API */}
      <section id="api">
        <ApiTable tableData={apiTableData} />
        <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
          <h3 className="mb-2 font-semibold">Features</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-neutral-grey">
            <li>Smooth icon transition animations</li>
            <li>Integrates with ThemeProvider context</li>
            <li>Can be controlled externally</li>
            <li>Accessible button with icon-only design</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ThemeModeTogglePage;
