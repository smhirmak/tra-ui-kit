import { createFileRoute } from '@tanstack/react-router';
import ChipPage from '@/pages/components/ChipPage';

export const Route = createFileRoute('/$version/components/_sidebar/chip')({
  component: ChipPage,
});
