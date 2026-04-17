import { createFileRoute } from '@tanstack/react-router';
import ProgressBarPage from '@/pages/components/ProgressBarPage';

export const Route = createFileRoute('/$version/components/_sidebar/progress-bar')({
  component: ProgressBarPage,
});
