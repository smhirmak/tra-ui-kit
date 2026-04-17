import { createFileRoute } from '@tanstack/react-router';
import InputPage from '@/pages/components/InputPage';

export const Route = createFileRoute('/$version/components/_sidebar/input')({
  component: InputPage,
});
