import { createFileRoute } from '@tanstack/react-router';
import LabelPage from '@/pages/components/LabelPage';

export const Route = createFileRoute('/$version/components/_sidebar/label')({
  component: LabelPage,
});
