import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const linearContainerVariants = cva('relative h-1 w-full overflow-hidden bg-gray-200');

const linearVariants = cva('animate-linear-loader bg-primary absolute left-0 top-0 size-full');

interface ILoadingLinear extends React.HTMLAttributes<HTMLDivElement> {
  linearContainerClassName?: string;
  linearItemClassName?: string;
}

const LoadingLinear = React.forwardRef<HTMLDivElement, ILoadingLinear>((props, ref) => {
  const { linearContainerClassName, linearItemClassName, ...rest } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div
      ref={ref}
      className={cn(linearContainerVariants(), linearContainerClassName)}
      {...rest}
    >
      <div className={cn(linearVariants(), linearItemClassName)} />
    </div>
  );
});

LoadingLinear.displayName = 'LoadingLinear';

export default LoadingLinear;
