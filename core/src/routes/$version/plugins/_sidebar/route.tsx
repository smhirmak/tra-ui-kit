import { createFileRoute } from '@tanstack/react-router';
import PluginLayout from '@/layout/PluginLayout';

export const Route = createFileRoute('/$version/plugins/_sidebar')({
  component: PluginLayout,
});
