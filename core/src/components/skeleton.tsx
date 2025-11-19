import { cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/lib/utils';

const skeletonVariants = cva('h-4 w-full rounded-md bg-gray-500', {
  variants: {
    animation: {
      true: 'animate-pulse',
      false: '',

    },
  },
});

interface ISkeleton {
  className?: string;
  animation?: boolean;
}

const Skeleton: React.FC<ISkeleton> = ({
  className = '',
  animation = true,
}) => (
  <div
    className={cn(skeletonVariants({ animation }), className)}
  />
);

export default Skeleton;
