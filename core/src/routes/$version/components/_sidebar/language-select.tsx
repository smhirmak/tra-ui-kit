import { createFileRoute } from '@tanstack/react-router';
import LanguageSelectPage from '@/pages/components/LanguageSelectPage';

export const Route = createFileRoute('/$version/components/_sidebar/language-select')({
  component: LanguageSelectPage,
});
