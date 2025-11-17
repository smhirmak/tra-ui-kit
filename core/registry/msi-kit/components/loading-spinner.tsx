import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('size-16 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800');

interface ILoadingSpinner extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, ILoadingSpinner>((props, ref) => {
  const { className, ...rest } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div ref={ref} className={cn(spinnerVariants(), className)} {...rest} />;
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
