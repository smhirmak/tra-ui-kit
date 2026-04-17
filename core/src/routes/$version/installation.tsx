import { createFileRoute } from '@tanstack/react-router';
import Installation from '@/pages/installation';

export const Route = createFileRoute('/$version/installation')({
  component: Installation,
});
