import { Minus, Plus } from '@phosphor-icons/react';
import Button from '@/components/button';
import ProgressBar from '@/components/ProgressBar';
import { useState } from 'react';

const ProgressBarPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalStepSize = 10;
  return (
    <>
      <p className="mb-2 text-2xl">Curret Step:</p>
      <div className="flex items-center gap-4">
        <Button size="icon" onClick={() => setCurrentStep(prev => (prev > 0 ? prev - 1 : 0))}><Minus className="size-6" /></Button>
        <p className="text-2xl">{currentStep}</p>
        <Button size="icon" onClick={() => setCurrentStep(prev => (prev < totalStepSize ? prev + 1 : prev))}><Plus className="size-6" /></Button>
      </div>
      <div className="mt-10 border-b border-neutral-grey pb-10">
        <ProgressBar totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="mt-10 border-b border-neutral-grey pb-10">
        <ProgressBar progressTitle="ProgressBar Title" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="mt-10 border-b border-neutral-grey pb-10">
        <ProgressBar stepTextPosition="bottom" progressTitle="ProgressBar Title" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="mt-10 border-b border-neutral-grey pb-10">
        <ProgressBar valueType="percentage" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="mt-10 border-b border-neutral-grey pb-10">
        <ProgressBar valueType="percentage" progressTitle="ProgressBar Title" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
      <div className="my-10">
        <ProgressBar valueType="percentage" stepTextPosition="bottom" progressTitle="ProgressBar Title" totalStepSize={totalStepSize} currentStep={currentStep} />
      </div>
    </>
  );
};

export default ProgressBarPage;
