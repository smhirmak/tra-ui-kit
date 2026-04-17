import { createFileRoute } from '@tanstack/react-router';
import SearchFieldPage from '@/pages/components/SearchFieldPage';

export const Route = createFileRoute('/$version/components/_sidebar/search-field')({
  component: SearchFieldPage,
});
