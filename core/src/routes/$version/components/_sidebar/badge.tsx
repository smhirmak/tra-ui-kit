import { createFileRoute } from '@tanstack/react-router';
import BadgePage from '@/pages/components/BadgePage';

export const Route = createFileRoute('/$version/components/_sidebar/badge')({
  component: BadgePage,
});
