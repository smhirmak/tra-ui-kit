import Skeleton from '@/components/Skeleton';
import React from 'react';

const SkeletonPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl">Skeleton</p>
    <div className="mt-2 flex flex-col space-y-2 border-t-2 py-2">
      Without Animation:
      <Skeleton className="h-2" animation={false} />
      <br />
      With Animation:
      <Skeleton />
      <Skeleton className="h-6" />
      <Skeleton className="h-10" />
    </div>
    <div className="mt-2 flex flex-col space-y-2 border-t-2 py-2">
      <Skeleton className="w-20" />
      <br />
      Without Animation:
      <Skeleton animation={false} />
      <br />
      With Animation:
      <div className="flex space-x-2">
        <Skeleton className="w-36" />
        <Skeleton className="w-6" />
        <Skeleton className="w-52" />
        <Skeleton className="w-14" />
        <Skeleton className="w-24" />
        <Skeleton className="w-52" />
      </div>
    </div>
  </div>
);

export default SkeletonPage;
