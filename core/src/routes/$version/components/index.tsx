import { createFileRoute } from '@tanstack/react-router';
import ComponentsOverview from '@/pages/ComponentsOverview';

export const Route = createFileRoute('/$version/components/')({
  component: ComponentsOverview,
});
