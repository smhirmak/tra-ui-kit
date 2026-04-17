import { createFileRoute } from '@tanstack/react-router';
import LoaderPage from '@/pages/components/LoaderPage';

export const Route = createFileRoute('/$version/components/_sidebar/loader/')({
  component: LoaderPage,
});
