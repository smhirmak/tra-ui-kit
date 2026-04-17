import { createFileRoute } from '@tanstack/react-router';
import LoadingSpinnerPage from '@/pages/components/LoadingSpinnerPage';

export const Route = createFileRoute('/$version/components/_sidebar/loading-spinner')({
  component: LoadingSpinnerPage,
});
