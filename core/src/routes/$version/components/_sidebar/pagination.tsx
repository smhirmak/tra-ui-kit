import { createFileRoute } from '@tanstack/react-router';
import PaginationPage from '@/pages/components/PaginationPage';

export const Route = createFileRoute('/$version/components/_sidebar/pagination')({
  component: PaginationPage,
});
