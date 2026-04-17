import { createFileRoute } from '@tanstack/react-router';
import NotificationPage from '@/pages/components/NotificationPage';

export const Route = createFileRoute('/$version/components/_sidebar/notification')({
  component: NotificationPage,
});
