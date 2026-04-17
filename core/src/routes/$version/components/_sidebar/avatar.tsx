import { createFileRoute } from '@tanstack/react-router';
import AvatarPage from '@/pages/components/AvatarPage';

export const Route = createFileRoute('/$version/components/_sidebar/avatar')({
  component: AvatarPage,
});
