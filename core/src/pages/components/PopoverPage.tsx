import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import Button from '@/components/button';
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
  { id: 'alignment', title: 'Alignment', level: 1 },
  { id: 'controlled', title: 'Controlled', level: 1 },
  { id: 'disabled', title: 'Disabled State', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'open', type: 'boolean', default: 'undefined', description: 'Controlled open state' },
  { prop: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: 'Callback when open state changes' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables the popover trigger' },
  { prop: 'dropdownAlign', type: '"left" | "right"', default: '"left"', description: 'Horizontal alignment of the popover content' },
  { prop: 'forceTriggerWidth', type: 'boolean', default: 'false', description: 'Forces the popover content to match the trigger width' },

];

const PopoverPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Popover</h1>
        <p className="text-lg text-neutral-grey">
          A flexible popover component for displaying floating content triggered by user interaction, with support for custom positioning and alignment.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add popover' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="popover" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">Basic popover with trigger and content.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Popover>
              <PopoverTrigger>
                <Button>Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="rounded-lg border border-border bg-background p-4 shadow-lg">
                <div className="space-y-2">
                  <h3 className="font-semibold">Popover Title</h3>
                  <p className="text-sm text-neutral-grey">
                    This is the popover content. You can put any content here.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <CustomSyntaxHighlighter content={`<Popover>
  <PopoverTrigger>
    <Button>Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="rounded-lg border border-border bg-background p-4 shadow-lg">
    <div className="space-y-2">
      <h3 className="font-semibold">Popover Title</h3>
      <p className="text-sm text-neutral-grey">
        This is the popover content.
      </p>
    </div>
  </PopoverContent>
</Popover>`} />
        </div>
      </section>

      {/* Alignment */}
      <section id="alignment">
        <h2 className="mb-4 text-2xl font-bold">Alignment</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">Control the horizontal alignment of the popover content.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex gap-4">
              <Popover dropdownAlign="left">
                <PopoverTrigger>
                  <Button>Left Aligned</Button>
                </PopoverTrigger>
                <PopoverContent className="rounded-lg border border-border bg-background p-4 shadow-lg">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Left Aligned</h3>
                    <p className="text-sm text-neutral-grey">
                      This popover is aligned to the left edge of the trigger.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover dropdownAlign="right">
                <PopoverTrigger>
                  <Button>Right Aligned</Button>
                </PopoverTrigger>
                <PopoverContent className="rounded-lg border border-border bg-background p-4 shadow-lg">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Right Aligned</h3>
                    <p className="text-sm text-neutral-grey">
                      This popover is aligned to the right edge of the trigger.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <CustomSyntaxHighlighter content={`// Left aligned (default)
<Popover dropdownAlign="left">
  <PopoverTrigger>
    <Button>Left Aligned</Button>
  </PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>

// Right aligned
<Popover dropdownAlign="right">
  <PopoverTrigger>
    <Button>Right Aligned</Button>
  </PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`} />
        </div>
      </section>

      {/* Controlled */}
      <section id="controlled">
        <h2 className="mb-4 text-2xl font-bold">Controlled</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">Control the open state externally for advanced use cases.</p>
          <CustomSyntaxHighlighter content={`const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger>
    <Button>Controlled Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div>Controlled content</div>
  </PopoverContent>
</Popover>

// Programmatically control
<Button onClick={() => setOpen(true)}>Open Popover</Button>
<Button onClick={() => setOpen(false)}>Close Popover</Button>`} />
        </div>
      </section>

      {/* Disabled */}
      <section id="disabled">
        <h2 className="mb-4 text-2xl font-bold">Disabled State</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">Disable the popover to prevent it from opening.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Popover disabled>
              <PopoverTrigger>
                <Button disabled>Disabled Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="rounded-lg border border-border bg-background p-4 shadow-lg">
                <div>This content won't show</div>
              </PopoverContent>
            </Popover>
          </div>
          <CustomSyntaxHighlighter content={`<Popover disabled>
  <PopoverTrigger>
    <Button disabled>Disabled Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div>This content won't show</div>
  </PopoverContent>
</Popover>`} />
        </div>
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default PopoverPage;
