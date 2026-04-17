import { createFileRoute } from '@tanstack/react-router';
import InformationStatusPage from '@/pages/components/InformationStatusPage';

export const Route = createFileRoute('/$version/components/_sidebar/information-status')({
  component: InformationStatusPage,
});
