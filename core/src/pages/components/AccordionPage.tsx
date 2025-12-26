import { PlusIcon } from '@phosphor-icons/react';
import { Accordion, AccordionItem } from '@/components/accordion';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTOC } from '@/contexts/toc/TOCContext';
import { useEffect } from 'react';
import { Tab, Tabs } from '@/components/tabs';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'variants', title: 'Variants', level: 1 },
  { id: 'underlined', title: 'Underlined', level: 2 },
  { id: 'outlined', title: 'Outlined', level: 2 },
  { id: 'solid', title: 'Solid', level: 2 },
  { id: 'splitted', title: 'Splitted', level: 2 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const accordionApiTableData = [
  { prop: 'variant', type: '"underlined" | "outlined" | "solid" | "splitted"', default: '"underlined"', description: 'The visual style variant' },
  { prop: 'multipleExpand', type: 'boolean', default: 'false', description: 'Allow multiple items to be expanded simultaneously' },
];
const accordionItemApiTableData = [
  { prop: 'title', type: 'string', default: '-', description: 'The title of the accordion item' },
  { prop: 'subTitle', type: 'string', default: '-', description: 'Optional subtitle for the accordion item' },
  // { prop: 'defaultOpen', type: 'boolean', default: 'false', description: 'Whether the item is open by default' },
  { prop: 'className', type: 'string', default: '-', description: 'Custom class name for the accordion item' },
  { prop: 'triggerClassName', type: 'string', default: '-', description: 'Custom class name for the accordion item trigger' },
  { prop: 'contentClassName', type: 'string', default: '-', description: 'Custom class name for the accordion item content' },
  { prop: 'titleClassName', type: 'string', default: '-', description: 'Custom class name for the accordion item title' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the accordion item' },
  { prop: 'icon', type: 'ReactNode', default: '-', description: 'Custom icon for the accordion item' },
  { prop: 'startContent', type: 'ReactNode', default: '-', description: 'Content displayed at the start of the item' },
];

const AccordionPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);
  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Accordion</h1>
        <p className="text-lg text-neutral-grey">
          A versatile accordion component with multiple variants for collapsible content sections.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add accordion' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="accordion" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Accordion>
              <AccordionItem title="Section 1">
                <p>This is the content of Section 1</p>
              </AccordionItem>
            </Accordion>
          </div>
          <CustomSyntaxHighlighter content={`<Accordion>
  <AccordionItem title="Section 1">
    <p>This is the content of Section 1</p>
  </AccordionItem>
</Accordion>`} />
        </div>
      </section>

      {/* Variants */}
      <section id="variants">
        <h2 className="mb-4 text-2xl font-bold">Variants</h2>

        {/* Underlined */}
        <div id="underlined" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Underlined</h3>
          <p className="text-neutral-grey">The default underlined accordion variant.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Accordion multipleExpand className="self-center">
              <AccordionItem title="Section 1" subTitle="Sub Title" defaultOpen startContent={<PlusIcon className="size-6" />}>
                <p>This is the content of Section 1</p>
                <p>This is the content of Section 1</p>
              </AccordionItem>
              <AccordionItem title="Section 2 Disabled" disabled>
                <p>This is the content of Section 2</p>
              </AccordionItem>
              <AccordionItem title="Section 3" icon={<PlusIcon />}>
                <p>This is the content of Section 3</p>
              </AccordionItem>
            </Accordion>
          </div>
          <CustomSyntaxHighlighter content={`<Accordion multipleExpand>
  <AccordionItem title="Section 1" subTitle="Sub Title" defaultOpen startContent={<PlusIcon className="size-6" />}>
    <p>This is the content of Section 1</p>
    <p>This is the content of Section 1</p>
  </AccordionItem>
  <AccordionItem title="Section 2 Disabled" disabled>
    <p>This is the content of Section 2</p>
  </AccordionItem>
  <AccordionItem title="Section 3" icon={<PlusIcon />}>
    <p>This is the content of Section 3</p>
  </AccordionItem>
</Accordion>`} />
        </div>

        {/* Outlined */}
        <div id="outlined" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Outlined</h3>
          <p className="text-neutral-grey">Accordion with border and transparent background.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Accordion variant="outlined" className="self-center">
              <AccordionItem title="Section 1" subTitle="Sub Title">
                <p>This is the content of Section 1</p>
                <p>This is the content of Section 1</p>
              </AccordionItem>
              <AccordionItem title="Section 2 Disabled" disabled>
                <p>This is the content of Section 2</p>
              </AccordionItem>
              <AccordionItem title="Section 3">
                <p>This is the content of Section 3</p>
              </AccordionItem>
            </Accordion>
          </div>
          <CustomSyntaxHighlighter content={`<Accordion variant="outlined">
  <AccordionItem title="Section 1" subTitle="Sub Title">
    <p>This is the content of Section 1</p>
    <p>This is the content of Section 1</p>
  </AccordionItem>
  <AccordionItem title="Section 2 Disabled" disabled>
    <p>This is the content of Section 2</p>
  </AccordionItem>
  <AccordionItem title="Section 3">
    <p>This is the content of Section 3</p>
  </AccordionItem>
</Accordion>`} />
        </div>

        {/* Solid */}
        <div id="solid" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Solid</h3>
          <p className="text-neutral-grey">Accordion with filled background.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Accordion variant="solid" className="self-center">
              <AccordionItem title="Section 1" subTitle="Sub Title">
                <p>This is the content of Section 1</p>
                <p>This is the content of Section 1</p>
              </AccordionItem>
              <AccordionItem title="Section 2 Disabled" disabled>
                <p>This is the content of Section 2</p>
              </AccordionItem>
              <AccordionItem title="Section 3">
                <p>This is the content of Section 3</p>
              </AccordionItem>
            </Accordion>
          </div>
          <CustomSyntaxHighlighter content={`<Accordion variant="solid">
  <AccordionItem title="Section 1" subTitle="Sub Title">
    <p>This is the content of Section 1</p>
    <p>This is the content of Section 1</p>
  </AccordionItem>
  <AccordionItem title="Section 2 Disabled" disabled>
    <p>This is the content of Section 2</p>
  </AccordionItem>
  <AccordionItem title="Section 3">
    <p>This is the content of Section 3</p>
  </AccordionItem>
</Accordion>`} />
        </div>

        {/* Splitted */}
        <div id="splitted" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Splitted</h3>
          <p className="text-neutral-grey">Accordion with separated items.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Accordion variant="splitted" className="self-center">
              <AccordionItem title="Section 1" subTitle="Sub Title">
                <p>This is the content of Section 1</p>
                <p>This is the content of Section 1</p>
              </AccordionItem>
              <AccordionItem title="Section 2 Disabled" disabled>
                <p>This is the content of Section 2</p>
              </AccordionItem>
              <AccordionItem title="Section 3">
                <p>This is the content of Section 3</p>
              </AccordionItem>
            </Accordion>
          </div>
          <CustomSyntaxHighlighter content={`<Accordion variant="splitted">
  <AccordionItem title="Section 1" subTitle="Sub Title">
    <p>This is the content of Section 1</p>
    <p>This is the content of Section 1</p>
  </AccordionItem>
  <AccordionItem title="Section 2 Disabled" disabled>
    <p>This is the content of Section 2</p>
  </AccordionItem>
  <AccordionItem title="Section 3">
    <p>This is the content of Section 3</p>
  </AccordionItem>
</Accordion>`} />
        </div>
      </section>

      {/* API Reference */}
      <section id="api">
        <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
        <ApiTable title='Accordion' tableData={accordionApiTableData} titleClassName='text-xl font-semibold' />
        <ApiTable title='Accordion Item' tableData={accordionItemApiTableData} titleClassName='text-xl font-semibold' />
      </section>
    </div>
  )
};

export default AccordionPage;
