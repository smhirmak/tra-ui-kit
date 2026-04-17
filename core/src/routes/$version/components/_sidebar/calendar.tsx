import { createFileRoute } from '@tanstack/react-router';
import CalendarPage from '@/pages/components/CalendarPage';

export const Route = createFileRoute('/$version/components/_sidebar/calendar')({
  component: CalendarPage,
});
