import { createFileRoute } from '@tanstack/react-router';
import DatePickerPage from '@/pages/components/DatePickerPage';

export const Route = createFileRoute('/$version/components/_sidebar/date-picker')({
  component: DatePickerPage,
});
