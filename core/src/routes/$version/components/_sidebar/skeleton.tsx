import { createFileRoute } from '@tanstack/react-router';
import SkeletonPage from '@/pages/components/SkeletonPage';

export const Route = createFileRoute('/$version/components/_sidebar/skeleton')({
  component: SkeletonPage,
});
