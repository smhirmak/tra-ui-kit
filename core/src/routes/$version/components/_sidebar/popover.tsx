import { createFileRoute } from '@tanstack/react-router';
import PopoverPage from '@/pages/components/PopoverPage';

export const Route = createFileRoute('/$version/components/_sidebar/popover')({
  component: PopoverPage,
});
