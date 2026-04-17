import { createFileRoute } from '@tanstack/react-router';
import ThemeModeTogglePage from '@/pages/components/ThemeModeTogglePage';

export const Route = createFileRoute('/$version/components/_sidebar/theme-mode-toggle')({
  component: ThemeModeTogglePage,
});
