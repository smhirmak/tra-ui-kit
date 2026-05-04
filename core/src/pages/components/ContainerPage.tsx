import { useEffect } from 'react';
import Container from '@/components/ui/container';
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
  { id: 'max-width', title: 'Max Width Variants', level: 1 },
  { id: 'centered', title: 'Centered Content', level: 1 },
  { id: 'disable-gutters', title: 'Disable Gutters', level: 1 },
  { id: 'custom-element', title: 'Custom Element', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'maxWidth',
    type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"',
    default: '"xl"',
    description: 'Maximum width of the container',
  },
  {
    prop: 'disableGutters',
    type: 'boolean',
    default: 'false',
    description: 'Removes horizontal padding',
  },
  {
    prop: 'centered',
    type: 'boolean',
    default: 'false',
    description: 'Centers content vertically and horizontally',
  },
  {
    prop: 'as',
    type: 'React.ElementType',
    default: '"div"',
    description: 'Render as different HTML element',
  },
  {
    prop: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Additional CSS classes',
  },
];

const ContainerPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Container</h1>
        <p className="text-lg text-neutral-grey">
          A responsive container component that centers content and provides consistent horizontal
          padding across different screen sizes.
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
            <CustomSyntaxHighlighter content="npx msi-ui-cli add container" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="container" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Container>
              <div className="rounded bg-primary/10 p-4 text-center">Container Content</div>
            </Container>
          </div>
          <CustomSyntaxHighlighter
            content={`<Container>
  <div>Your content here</div>
</Container>`}
          />
        </div>
      </section>

      {/* Max Width */}
      <section id="max-width">
        <h2 className="mb-4 text-2xl font-bold">Max Width Variants</h2>
        <p className="mb-4 text-neutral-grey">Control the maximum width of the container.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-4">
              <Container maxWidth="sm">
                <div className="rounded bg-primary/10 p-4 text-center text-sm">
                  Small (max-w-sm)
                </div>
              </Container>
              <Container maxWidth="md">
                <div className="rounded bg-primary/10 p-4 text-center text-sm">
                  Medium (max-w-md)
                </div>
              </Container>
              <Container maxWidth="lg">
                <div className="rounded bg-primary/10 p-4 text-center text-sm">
                  Large (max-w-lg)
                </div>
              </Container>
              <Container maxWidth="xl">
                <div className="rounded bg-primary/10 p-4 text-center text-sm">
                  Extra Large (max-w-xl) - Default
                </div>
              </Container>
            </div>
          </div>
          <CustomSyntaxHighlighter
            content={`<Container maxWidth="sm">Small</Container>
<Container maxWidth="md">Medium</Container>
<Container maxWidth="lg">Large</Container>
<Container maxWidth="xl">Extra Large</Container>`}
          />
        </div>
      </section>

      {/* Centered */}
      <section id="centered">
        <h2 className="mb-4 text-2xl font-bold">Centered Content</h2>
        <p className="mb-4 text-neutral-grey">Center content vertically and horizontally.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Container
              centered
              className="h-48"
            >
              <div className="rounded bg-primary/10 p-4">Centered Content</div>
            </Container>
          </div>
          <CustomSyntaxHighlighter
            content={`<Container centered className="h-48">
  <div>Centered Content</div>
</Container>`}
          />
        </div>
      </section>

      {/* Disable Gutters */}
      <section id="disable-gutters">
        <h2 className="mb-4 text-2xl font-bold">Disable Gutters</h2>
        <p className="mb-4 text-neutral-grey">Remove horizontal padding for full-width content.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Container disableGutters>
              <div className="rounded bg-primary/10 p-4 text-center">No Horizontal Padding</div>
            </Container>
          </div>
          <CustomSyntaxHighlighter
            content={`<Container disableGutters>
  <div>No padding</div>
</Container>`}
          />
        </div>
      </section>

      {/* Custom Element */}
      <section id="custom-element">
        <h2 className="mb-4 text-2xl font-bold">Custom Element</h2>
        <p className="mb-4 text-neutral-grey">
          Render as a different HTML element using the 'as' prop.
        </p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Container as="section">
              <div className="rounded bg-primary/10 p-4 text-center">
                Rendered as &lt;section&gt;
              </div>
            </Container>
          </div>
          <CustomSyntaxHighlighter
            content={`<Container as="section">
  <div>Semantic HTML</div>
</Container>`}
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

export default ContainerPage;
