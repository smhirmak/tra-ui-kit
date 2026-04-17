import { createFileRoute } from '@tanstack/react-router';
import ComponentLayout from '@/layout/ComponentLayout';

export const Route = createFileRoute('/$version/components/_sidebar')({
  component: ComponentLayout,
});
