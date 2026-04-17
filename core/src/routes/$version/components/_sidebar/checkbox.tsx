import { createFileRoute } from '@tanstack/react-router';
import CheckboxPage from '@/pages/components/CheckboxPage';

export const Route = createFileRoute('/$version/components/_sidebar/checkbox')({
  component: CheckboxPage,
});
