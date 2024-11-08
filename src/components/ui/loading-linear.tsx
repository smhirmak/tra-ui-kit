import { cn } from '@/lib/utils';
import { ILoadingLinear } from '@/types/types';
import { cva } from 'class-variance-authority';
import * as React from 'react';

const linearContainerVariants = cva('relative h-1 w-full overflow-hidden bg-gray-200');

const linearVariants = cva('absolute left-0 top-0 size-full animate-linear-loader bg-tra-primary');

const LoadingLinear = React.forwardRef<HTMLDivElement, ILoadingLinear>((props, ref) => {
  const { linearContainerClassName, linearItemClassName, ...rest } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={ref} className={cn(linearContainerVariants(), linearContainerClassName)} {...rest}>
      <div className={cn(linearVariants(), linearItemClassName)} />
    </div>
  );
});

LoadingLinear.displayName = 'LoadingLinear';

export default LoadingLinear;
