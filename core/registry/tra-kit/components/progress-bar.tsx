import { cva } from 'class-variance-authority';
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface IProgressBar {
  currentStep: number;
  totalStepSize: number;
  progressTitle?: string;
  progressTitleClassName?: string;
  stepTextClassName?: string;
  containerClassName?: string;
  headerContainerClassName?: string;
  linearContainerClassName?: string;
  linearProgressClassName?: string;
  stepTextPosition?: 'top' | 'bottom';
  valueType?: 'percentage' | 'number';
}

const linearContainerVariants = cva(
  'TraProgressBar-linearContainer bg-primary-15 relative h-1 w-full overflow-hidden rounded-2xl',
);

const linearVariants = cva(
  'TraProgressBar-linearProgress bg-primary absolute left-0 top-0 size-full transition-transform duration-300',
);

interface StepTextProps {
  className?: string;
  children: React.ReactNode;
}

const StepText = ({ className, children }: StepTextProps) => (
  <p className={cn('TraProgressBar-stepText self-end text-sm text-neutral-light-black', className)}>
    {children}
  </p>
);

const ProgressBar = memo(
  ({
    progressTitle,
    progressTitleClassName,
    stepTextClassName,
    currentStep = 0,
    totalStepSize = 0,
    containerClassName,
    headerContainerClassName,
    linearContainerClassName,
    linearProgressClassName,
    valueType = 'number',
    stepTextPosition = 'top',
    ...otherProps
  }: IProgressBar) => {
    if (currentStep > totalStepSize) {
      throw new Error('Current step cannot be greater than total step size');
    }

    const progress = Math.min(Math.max((currentStep / Math.max(totalStepSize, 1)) * 100, 0), 100);
    const stepText =
      valueType === 'number' ? `${currentStep}/${totalStepSize}` : `${Math.round(progress)}%`;

    return (
      <div className={cn(containerClassName, 'TraProgressBar-container flex flex-col gap-1')}>
        <div
          className={cn(
            headerContainerClassName,
            `TraProgressBar-headerContainer flex ${progressTitle ? 'justify-between' : 'justify-end'}`,
          )}
        >
          {progressTitle && (
            <p
              className={cn(
                progressTitleClassName,
                'TraProgressBar-title text-neutral-light-black',
              )}
            >
              {progressTitle}
            </p>
          )}
          {stepTextPosition === 'top' && (
            <StepText className={cn(stepTextClassName)}>{stepText}</StepText>
          )}
        </div>
        <div
          className={cn(linearContainerVariants(), linearContainerClassName)}
          {...otherProps}
        >
          <div
            className={cn(linearVariants(), linearProgressClassName)}
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </div>
        {stepTextPosition === 'bottom' && (
          <StepText className={cn(stepTextClassName)}>{stepText}</StepText>
        )}
      </div>
    );
  },
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
