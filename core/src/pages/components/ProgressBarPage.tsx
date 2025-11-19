import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import Button from '@/components/button';
import ProgressBar from '@/components/progress-bar';

const ProgressBarPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalStepSize = 10;
  return (
    <>
      <p className="mb-2 text-2xl">Curret Step:</p>
      <div className="flex items-center gap-4">
        <Button size="icon" onClick={() => setCurrentStep(prev => (prev > 0 ? prev - 1 : 0))}><MinusIcon className="size-6" /></Button>
        <p className="text-2xl">{currentStep}</p>
        <Button size="icon" onClick={() => setCurrentStep(prev => (prev < totalStepSize ? prev + 1 : prev))}><PlusIcon className="size-6" /></Button>
      </div>
      <div className="border-neutral-grey mt-10 border-b pb-10">
        <ProgressBar totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="border-neutral-grey mt-10 border-b pb-10">
        <ProgressBar progressTitle="ProgressBar Title" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="border-neutral-grey mt-10 border-b pb-10">
        <ProgressBar stepTextPosition="bottom" progressTitle="ProgressBar Title" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="border-neutral-grey mt-10 border-b pb-10">
        <ProgressBar valueType="percentage" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="border-neutral-grey mt-10 border-b pb-10">
        <ProgressBar valueType="percentage" progressTitle="ProgressBar Title" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="my-10">
        <ProgressBar valueType="percentage" stepTextPosition="bottom" progressTitle="ProgressBar Title" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
    </>
  );
};

export default ProgressBarPage;
