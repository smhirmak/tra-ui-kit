import { createFileRoute } from '@tanstack/react-router';
import RadioButtonPage from '@/pages/components/RadioButtonPage';

export const Route = createFileRoute('/$version/components/_sidebar/radio-button')({
  component: RadioButtonPage,
});
