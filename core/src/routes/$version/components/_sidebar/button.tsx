import { createFileRoute } from '@tanstack/react-router';
import ButtonPage from '@/pages/components/ButtonPage';

export const Route = createFileRoute('/$version/components/_sidebar/button')({
  component: ButtonPage,
});
