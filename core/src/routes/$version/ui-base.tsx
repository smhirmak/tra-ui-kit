import { createFileRoute } from '@tanstack/react-router';
import GettingStarted from '@/pages/ui-base';

export const Route = createFileRoute('/$version/ui-base')({
  component: GettingStarted,
});
