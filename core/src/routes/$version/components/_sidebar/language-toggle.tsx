import LanguageTogglePage from '@/pages/components/LanguageTogglePage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$version/components/_sidebar/language-toggle')({
  component: LanguageTogglePage,
});
