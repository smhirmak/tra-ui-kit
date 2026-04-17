import { createFileRoute } from '@tanstack/react-router';
import TextFieldPage from '@/pages/components/TextFieldPage';

export const Route = createFileRoute('/$version/components/_sidebar/text-field')({
  component: TextFieldPage,
});
