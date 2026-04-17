import { createFileRoute } from '@tanstack/react-router';
import AccordionPage from '@/pages/components/AccordionPage';

export const Route = createFileRoute('/$version/components/_sidebar/accordion')({
  component: AccordionPage,
});
