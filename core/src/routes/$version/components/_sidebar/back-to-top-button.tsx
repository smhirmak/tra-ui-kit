import { createFileRoute } from '@tanstack/react-router';
import BackToTopButtonPage from '@/pages/components/BackToTopButtonPages';

export const Route = createFileRoute('/$version/components/_sidebar/back-to-top-button')({
  component: BackToTopButtonPage,
});
