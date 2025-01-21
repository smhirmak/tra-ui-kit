import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const linearContainerVariants = cva('relative h-1 w-full overflow-hidden bg-gray-200');

const linearVariants = cva('animate-linear-loader bg-primary absolute left-0 top-0 size-full');

const LoadingLinear = React.forwardRef((props, ref) => {
  const { linearContainerClassName, linearItemClassName, ...rest } = props;
  return (
    <div ref={ref} className={cn(linearContainerVariants(), linearContainerClassName)} {...rest}>
      <div className={cn(linearVariants(), linearItemClassName)} />
    </div>
  );
});

LoadingLinear.displayName = 'LoadingLinear';

export default LoadingLinear;
