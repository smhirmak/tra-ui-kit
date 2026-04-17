import { createFileRoute } from '@tanstack/react-router';
import ContainerPage from '@/pages/components/ContainerPage';

export const Route = createFileRoute('/$version/components/_sidebar/container')({
  component: ContainerPage,
});
