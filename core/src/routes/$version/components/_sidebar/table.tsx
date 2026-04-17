import { createFileRoute } from '@tanstack/react-router';
import TablePage from '@/pages/components/TablePage';

export const Route = createFileRoute('/$version/components/_sidebar/table')({
  component: TablePage,
});
