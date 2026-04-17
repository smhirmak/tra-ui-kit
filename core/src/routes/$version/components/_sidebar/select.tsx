import { createFileRoute } from '@tanstack/react-router';
import SelectPage from '@/pages/components/SelectPage';

export const Route = createFileRoute('/$version/components/_sidebar/select')({
  component: SelectPage,
});
