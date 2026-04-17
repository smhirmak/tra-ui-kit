import { createFileRoute } from '@tanstack/react-router';
import DropdownPage from '@/pages/components/DropdownPage';

export const Route = createFileRoute('/$version/components/_sidebar/dropdown')({
  component: DropdownPage,
});
