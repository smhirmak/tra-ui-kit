import Button from '@/components/button';
import { RadioGroup, RadioGroupItem } from '@/components/radio-buttons';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTOC } from '@/contexts/toc/TOCContext';
import { useAppContext } from '@/contexts/app/AppProvider';
import { Tab, Tabs } from '@/components/tabs';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Notification from '@/components/notification';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'themes', title: 'Themes', level: 1 },
  { id: 'animation', title: 'Animation', level: 1 },
  { id: 'position', title: 'Position', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'theme', type: '"default" | "lined" | "colored"', default: '"default"', description: 'The visual theme variant' },
  { prop: 'mode', type: '"light" | "dark"', default: '"light"', description: 'Light or dark mode' },
  { prop: 'animation', type: '"bounce" | "slide" | "flip" | false', default: '"bounce"', description: 'Animation type for notification' },
  { prop: 'position', type: '"top-right" | "bottom-right" | "top-left" | "bottom-left"', default: '"top-right"', description: 'Position of notification on screen' },
  { prop: 'autoClose', type: 'number | false', default: '5000', description: 'Auto close delay in milliseconds, or false to disable' },
];

const NotificationPage = () => {
  const { info, success, error, warn } = Notification();
  const { setNotificationTheme, setNotificationAnimateMode, setNotificationPosition } = useAppContext();
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Notification</h1>
        <p className="text-lg text-neutral-grey">
          A flexible notification system with multiple themes, animations, and positioning options for displaying user feedback.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add notification' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="notification" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">Basic notification usage with different severity levels.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Button onClick={() => info('Info')}>Info</Button>
              <Button onClick={() => success('Success')} className="bg-success text-neutral-black">Success</Button>
              <Button onClick={() => warn('Warning')} className="bg-warning text-neutral-white">Warning</Button>
              <Button onClick={() => error('Error')} className="bg-error hover:bg-error/75">Error</Button>
            </div>
          </div>
          <CustomSyntaxHighlighter content={`const { info, success, error, warn } = Notification();

// Basic usage
info('Info message');
success('Success message');
warn('Warning message');
error('Error message');`} />
        </div>
      </section>

      {/* Themes */}
      <section id="themes">
        <h2 className="mb-4 text-2xl font-bold">Themes</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">Choose from different theme variants for your notifications.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <RadioGroup defaultValue="default" onChange={e => setNotificationTheme(e as 'default' | 'lined' | 'colored')} className="flex w-fit flex-col gap-2 rounded-md bg-primary-15 p-4">
              <RadioGroupItem id="default" label="Default" value="default" />
              <RadioGroupItem id="lined" label="Lined" value="lined" />
              <RadioGroupItem id="colored" label="Colored" value="colored" />
            </RadioGroup>
          </div>
          <CustomSyntaxHighlighter content={`// Set notification theme
setNotificationTheme('default'); // or 'lined', 'colored'`} />
        </div>
      </section>

      {/* Animation */}
      <section id="animation">
        <h2 className="mb-4 text-2xl font-bold">Animation</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">Select animation style for notifications.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <RadioGroup
              defaultValue="bounce"
              onChange={e => setNotificationAnimateMode(e as 'bounce' | 'slide' | 'flip' | false)}
              className="flex w-fit flex-col gap-2 rounded-md bg-primary-15 p-4"
            >
              <RadioGroupItem id="bounce" label="Bounce" value="bounce" />
              <RadioGroupItem id="slide" label="Slide" value="slide" />
              <RadioGroupItem id="flip" label="Flip" value="flip" />
              <RadioGroupItem id="false" label="Disabled" value="false" />
            </RadioGroup>
          </div>
          <CustomSyntaxHighlighter content={`// Set animation mode
setNotificationAnimateMode('bounce'); // or 'slide', 'flip', false`} />
        </div>
      </section>

      {/* Position */}
      <section id="position">
        <h2 className="mb-4 text-2xl font-bold">Position</h2>
        <div className="space-y-4">
          <p className="text-neutral-grey">Position notifications on the screen.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <RadioGroup defaultValue="top-right" onChange={e => setNotificationPosition(e as 'top-right' | 'bottom-right')} className="flex w-fit flex-col gap-2 rounded-md bg-primary-15 p-4">
              <RadioGroupItem id="top-right" label="Top Right" value="top-right" />
              <RadioGroupItem id="bottom-right" label="Bottom Right" value="bottom-right" />
              <RadioGroupItem id="top-left" label="Top Left" value="top-left" />
              <RadioGroupItem id="bottom-left" label="Bottom Left" value="bottom-left" />
            </RadioGroup>
          </div>
          <CustomSyntaxHighlighter content={`// Set notification position
setNotificationPosition('top-right'); // or 'bottom-right', 'top-left', 'bottom-left'`} />
        </div>

        {/* Auto Close Examples */}
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Auto Close Options</h3>
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="space-y-4">
              <div>
                <p className="mb-2 font-medium text-neutral-grey">With Auto Close (default)</p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Button onClick={() => info('Info')}>Info</Button>
                  <Button onClick={() => success('Success')} className="bg-success text-neutral-black">Success</Button>
                  <Button onClick={() => warn('Warning')} className="bg-warning text-neutral-white">Warning</Button>
                  <Button onClick={() => error('Error')} className="bg-error hover:bg-error/75">Error</Button>
                </div>
              </div>
              <div>
                <p className="mb-2 font-medium text-neutral-grey">Without Auto Close</p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Button onClick={() => info('Info', { autoClose: false })}>Info</Button>
                  <Button onClick={() => success('Success', { autoClose: false })} className="bg-success hover:bg-success/75 text-neutral-black">Success</Button>
                  <Button onClick={() => warn('Warning', { autoClose: false })} className="bg-warning hover:bg-warning/75 text-neutral-white">Warning</Button>
                  <Button onClick={() => error('Error', { autoClose: false })} className="bg-error hover:bg-error/75">Error</Button>
                </div>
              </div>
            </div>
          </div>
          <CustomSyntaxHighlighter content={`// With auto close (default - 5000ms)
info('This will auto close');

// Without auto close
info('Manual close required', { autoClose: false });

// Custom auto close time
info('Closes in 3 seconds', { autoClose: 3000 });`} />
        </div>
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default NotificationPage;
