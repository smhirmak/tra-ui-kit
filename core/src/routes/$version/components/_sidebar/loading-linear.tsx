import { createFileRoute } from '@tanstack/react-router';
import LoadingLinearPage from '@/pages/components/LoadingLinearPage';

export const Route = createFileRoute('/$version/components/_sidebar/loading-linear')({
  component: LoadingLinearPage,
});
