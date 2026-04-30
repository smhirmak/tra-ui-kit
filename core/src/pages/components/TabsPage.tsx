import { useEffect, useState } from 'react';
import { Tab, Tabs } from '@/components/tabs';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'default', title: 'Default', level: 2 },
  { id: 'solid', title: 'Solid', level: 2 },
  { id: 'outlined', title: 'Outlined', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'direction', title: 'Direction', level: 1 },
  { id: 'content-placement', title: 'Content Placement', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'activeTab', type: 'string', default: '-', description: 'Currently active tab value' },
  {
    prop: 'onChange',
    type: '(value: string) => void',
    default: '-',
    description: 'Tab change handler',
  },
  {
    prop: 'variant',
    type: '"default" | "solid" | "outlined" | "split"',
    default: '"default"',
    description: 'Visual style variant',
  },
  { prop: 'size', type: '"sm" | "default" | "lg"', default: '"default"', description: 'Tab size' },
  {
    prop: 'contentPlacement',
    type: '"top" | "right" | "bottom" | "left"',
    default: '"bottom"',
    description: 'Position of tab content',
  },
  {
    prop: 'radius',
    type: '"none" | "sm" | "default" | "lg" | "full"',
    default: '"default"',
    description: 'Border radius',
  },
  {
    prop: 'direction',
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: 'Tabs direction',
  },
];

const tabApiData = [
  {
    prop: 'label',
    type: 'string | ReactNode',
    default: '-',
    description: 'Tab label text or element',
  },
  { prop: 'value', type: 'string', default: '-', description: 'Unique tab identifier' },
  { prop: 'children', type: 'ReactNode', default: '-', description: 'Tab content' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the tab' },
];

const TabsPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('tab1');

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Tabs</h1>
        <p className="text-lg text-neutral-grey">
          A tabbed interface component for organizing content into separate views.
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
            <CustomSyntaxHighlighter content="npx msi-ui-cli add tabs" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="tabs" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
            >
              <Tab
                label="Tab 1"
                value="tab1"
              >
                Content for Tab 1
              </Tab>
              <Tab
                label="Tab 2"
                value="tab2"
              >
                Content for Tab 2
              </Tab>
              <Tab
                label="Tab 3"
                value="tab3"
              >
                Content for Tab 3
              </Tab>
            </Tabs>
          </div>
          <CustomSyntaxHighlighter
            content={`<Tabs activeTab={activeTab} onChange={setActiveTab}>
  <Tab label="Tab 1" value="tab1">
    Content for Tab 1
  </Tab>
  <Tab label="Tab 2" value="tab2">
    Content for Tab 2
  </Tab>
  <Tab label="Tab 3" value="tab3">
    Content for Tab 3
  </Tab>
</Tabs>`}
          />
        </div>
      </section>

      {/* Variants */}
      <section id="variants">
        <h2 className="mb-4 text-2xl font-bold">Variants</h2>

        {/* Default */}
        <div
          id="default"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Default</h3>
          <p className="text-neutral-grey">Default tabs with underline indicator.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Tabs
              activeTab={activeTab}
              variant="default"
              onChange={setActiveTab}
            >
              <Tab
                label="Profile"
                value="tab1"
              >
                Profile content
              </Tab>
              <Tab
                label="Settings"
                value="tab2"
              >
                Settings content
              </Tab>
              <Tab
                label="Messages"
                value="tab3"
              >
                Messages content
              </Tab>
            </Tabs>
          </div>
          <CustomSyntaxHighlighter content='<Tabs variant="default" activeTab={activeTab} onChange={setActiveTab}>...</Tabs>' />
        </div>

        {/* Solid */}
        <div
          id="solid"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Solid</h3>
          <p className="text-neutral-grey">Solid filled background for active tab.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Tabs
              activeTab={activeTab}
              variant="solid"
              onChange={setActiveTab}
            >
              <Tab
                label="Overview"
                value="tab1"
              >
                Overview content
              </Tab>
              <Tab
                label="Details"
                value="tab2"
              >
                Details content
              </Tab>
              <Tab
                label="Reviews"
                value="tab3"
              >
                Reviews content
              </Tab>
            </Tabs>
          </div>
          <CustomSyntaxHighlighter content='<Tabs variant="solid" activeTab={activeTab} onChange={setActiveTab}>...</Tabs>' />
        </div>

        {/* Outlined */}
        <div
          id="outlined"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Outlined</h3>
          <p className="text-neutral-grey">Tabs with outlined border.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Tabs
              activeTab={activeTab}
              variant="outlined"
              onChange={setActiveTab}
            >
              <Tab
                label="Home"
                value="tab1"
              >
                Home content
              </Tab>
              <Tab
                label="About"
                value="tab2"
              >
                About content
              </Tab>
              <Tab
                label="Contact"
                value="tab3"
              >
                Contact content
              </Tab>
            </Tabs>
          </div>
          <CustomSyntaxHighlighter content='<Tabs variant="outlined" activeTab={activeTab} onChange={setActiveTab}>...</Tabs>' />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Different size options for tabs.</p>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold">Small</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <Tabs
                size="sm"
                activeTab={activeTab}
                onChange={setActiveTab}
              >
                <Tab
                  label="Tab 1"
                  value="tab1"
                >
                  Small content
                </Tab>
                <Tab
                  label="Tab 2"
                  value="tab2"
                >
                  Small content
                </Tab>
              </Tabs>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Default</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <Tabs
                size="default"
                activeTab={activeTab}
                onChange={setActiveTab}
              >
                <Tab
                  label="Tab 1"
                  value="tab1"
                >
                  Default content
                </Tab>
                <Tab
                  label="Tab 2"
                  value="tab2"
                >
                  Default content
                </Tab>
              </Tabs>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Large</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <Tabs
                size="lg"
                activeTab={activeTab}
                onChange={setActiveTab}
              >
                <Tab
                  label="Tab 1"
                  value="tab1"
                >
                  Large content
                </Tab>
                <Tab
                  label="Tab 2"
                  value="tab2"
                >
                  Large content
                </Tab>
              </Tabs>
            </div>
          </div>
          <CustomSyntaxHighlighter
            className="mb-2"
            content='<Tabs size="sm" ... />'
          />
          <CustomSyntaxHighlighter
            className="mb-2"
            content='<Tabs size="default" ... />'
          />
          <CustomSyntaxHighlighter content='<Tabs size="lg" ... />' />
        </div>
      </section>

      {/* Direction */}
      <section id="direction">
        <h2 className="mb-4 text-2xl font-bold">Direction</h2>
        <p className="mb-4 text-neutral-grey">Direction of the tabs.</p>
        <div className="flex gap-8 rounded-lg border border-border bg-background p-6">
          <Tabs
            activeTab={activeTab}
            direction="horizontal"
            onChange={setActiveTab}
          >
            <Tab
              label="Tab 1"
              value="tab1"
            >
              Horizontal
            </Tab>
            <Tab
              label="Tab 2"
              value="tab2"
            >
              Horizontal
            </Tab>
          </Tabs>
          <Tabs
            variant="solid"
            activeTab={activeTab}
            direction="horizontal"
            onChange={setActiveTab}
          >
            <Tab
              label="Tab 1"
              value="tab1"
            >
              Horizontal
            </Tab>
            <Tab
              label="Tab 2"
              value="tab2"
            >
              Horizontal
            </Tab>
          </Tabs>
          <Tabs
            variant="outlined"
            activeTab={activeTab}
            direction="horizontal"
            onChange={setActiveTab}
          >
            <Tab
              label="Tab 1"
              value="tab1"
            >
              Horizontal
            </Tab>
            <Tab
              label="Tab 2"
              value="tab2"
            >
              Horizontal
            </Tab>
          </Tabs>
          <Tabs
            variant="split"
            activeTab={activeTab}
            direction="horizontal"
            onChange={setActiveTab}
          >
            <Tab
              label="Tab 1"
              value="tab1"
            >
              Horizontal
            </Tab>
            <Tab
              label="Tab 2"
              value="tab2"
            >
              Horizontal
            </Tab>
          </Tabs>
        </div>
        <CustomSyntaxHighlighter content='<Tabs direction="horizontal" ... />' />
        <div className="flex gap-8 rounded-lg border border-border bg-background p-6">
          <Tabs
            activeTab={activeTab}
            direction="vertical"
            onChange={setActiveTab}
          >
            <Tab
              label="Tab 1"
              value="tab1"
            >
              Vertical
            </Tab>
            <Tab
              label="Tab 2"
              value="tab2"
            >
              Vertical
            </Tab>
          </Tabs>
          <Tabs
            variant="solid"
            activeTab={activeTab}
            direction="vertical"
            onChange={setActiveTab}
          >
            <Tab
              label="Tab 1"
              value="tab1"
            >
              Vertical
            </Tab>
            <Tab
              label="Tab 2"
              value="tab2"
            >
              Vertical
            </Tab>
          </Tabs>
          <Tabs
            variant="outlined"
            activeTab={activeTab}
            direction="vertical"
            onChange={setActiveTab}
          >
            <Tab
              label="Tab 1"
              value="tab1"
            >
              Vertical
            </Tab>
            <Tab
              label="Tab 2"
              value="tab2"
            >
              Vertical
            </Tab>
          </Tabs>
          <Tabs
            variant="split"
            activeTab={activeTab}
            direction="vertical"
            onChange={setActiveTab}
          >
            <Tab
              label="Tab 1"
              value="tab1"
            >
              Vertical
            </Tab>
            <Tab
              label="Tab 2"
              value="tab2"
            >
              Vertical
            </Tab>
          </Tabs>
        </div>
        <CustomSyntaxHighlighter content='<Tabs direction="vertical" ... />' />
      </section>

      {/* Content Placement */}
      <section id="content-placement">
        <h2 className="mb-4 text-2xl font-bold">Content Placement</h2>
        <p className="mb-4 text-neutral-grey">Position tab content relative to tab headers.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Tabs
            activeTab={activeTab}
            contentPlacement="top"
            onChange={setActiveTab}
          >
            <Tab
              label="Tab 1"
              value="tab1"
            >
              Content positioned at top
            </Tab>
            <Tab
              label="Tab 2"
              value="tab2"
            >
              Content positioned at top
            </Tab>
          </Tabs>
        </div>
        <CustomSyntaxHighlighter content='<Tabs contentPlacement="top" ... />' />
      </section>

      {/* API Reference */}
      <section id="api">
        <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
        <ApiTable
          tableData={apiTableData}
          title="Tabs"
          titleClassName="text-xl font-semibold"
        />
        <ApiTable
          tableData={tabApiData}
          title="Tab"
          titleClassName="text-xl font-semibold mt-3"
        />
      </section>
    </div>
  );
};

export default TabsPage;
