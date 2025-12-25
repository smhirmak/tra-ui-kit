import { useEffect, useState } from 'react';
import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import ProgressBar from '@/components/progress-bar';
import Button from '@/components/button';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'with-title', title: 'With Title', level: 1 },
  { id: 'value-types', title: 'Value Types', level: 1 },
  { id: 'step-text-position', title: 'Step Text Position', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'currentStep', type: 'number', default: '-', description: 'Current progress step' },
  { prop: 'totalStepSize', type: 'number', default: '-', description: 'Total number of steps' },
  { prop: 'progressTitle', type: 'string', default: '-', description: 'Title shown above progress bar' },
  { prop: 'valueType', type: '"number" | "percentage"', default: '"number"', description: 'Display type for progress value' },
  { prop: 'stepTextPosition', type: '"top" | "bottom"', default: '"top"', description: 'Position of step text' },
  { prop: 'progressTitleClassName', type: 'string', default: '-', description: 'Custom CSS class for title' },
  { prop: 'stepTextClassName', type: 'string', default: '-', description: 'Custom CSS class for step text' },
  { prop: 'containerClassName', type: 'string', default: '-', description: 'Custom CSS class for container' },
];

const ProgressBarPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(5);
  const totalStepSize = 10;

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Progress Bar</h1>
        <p className="text-lg text-neutral-grey">
          A progress indicator component to visualize task completion with customizable step display and positioning.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add progress-bar' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="progress-bar" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="mb-4 flex items-center gap-4">
            <Button size="icon" onClick={() => setCurrentStep(prev => (prev > 0 ? prev - 1 : 0))}>
              <MinusIcon className="size-6" />
            </Button>
            <span className="text-xl font-semibold">Step: {currentStep}</span>
            <Button size="icon" onClick={() => setCurrentStep(prev => (prev < totalStepSize ? prev + 1 : prev))}>
              <PlusIcon className="size-6" />
            </Button>
          </div>
          <div className="rounded-lg border border-border bg-background p-6">
            <ProgressBar totalStepSize={totalStepSize} currentStep={currentStep} />
          </div>
          <CustomSyntaxHighlighter
            content={`<ProgressBar 
  totalStepSize={10} 
  currentStep={5} 
/>`}
          />
        </div>
      </section>

      {/* With Title */}
      <section id="with-title">
        <h2 className="mb-4 text-2xl font-bold">With Title</h2>
        <p className="mb-4 text-neutral-grey">Add a descriptive title to the progress bar.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <ProgressBar
            progressTitle="Upload Progress"
            totalStepSize={totalStepSize}
            currentStep={currentStep}
          />
        </div>
        <CustomSyntaxHighlighter
          content={`<ProgressBar 
  progressTitle="Upload Progress"
  totalStepSize={10} 
  currentStep={5} 
/>`}
        />
      </section>

      {/* Value Types */}
      <section id="value-types">
        <h2 className="mb-4 text-2xl font-bold">Value Types</h2>
        <p className="mb-4 text-neutral-grey">Display progress as numbers or percentage.</p>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold">Number (default)</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <ProgressBar
                valueType="number"
                totalStepSize={totalStepSize}
                currentStep={currentStep}
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Percentage</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <ProgressBar
                valueType="percentage"
                totalStepSize={totalStepSize}
                currentStep={currentStep}
              />
            </div>
          </div>
          <CustomSyntaxHighlighter className="mb-2" content='<ProgressBar valueType="number" ... />' />
          <CustomSyntaxHighlighter content='<ProgressBar valueType="percentage" ... />' />
        </div>
      </section>

      {/* Step Text Position */}
      <section id="step-text-position">
        <h2 className="mb-4 text-2xl font-bold">Step Text Position</h2>
        <p className="mb-4 text-neutral-grey">Position the step text above or below the bar.</p>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold">Top (default)</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <ProgressBar
                stepTextPosition="top"
                progressTitle="Progress Title"
                totalStepSize={totalStepSize}
                currentStep={currentStep}
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Bottom</p>
            <div className="rounded-lg border border-border bg-background p-6">
              <ProgressBar
                stepTextPosition="bottom"
                progressTitle="Progress Title"
                totalStepSize={totalStepSize}
                currentStep={currentStep}
              />
            </div>
          </div>
          <CustomSyntaxHighlighter className="mb-2" content='<ProgressBar stepTextPosition="top" ... />' />
          <CustomSyntaxHighlighter content='<ProgressBar stepTextPosition="bottom" ... />' />
        </div>
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default ProgressBarPage;

