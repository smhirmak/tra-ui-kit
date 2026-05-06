import { createFileRoute } from '@tanstack/react-router';
import SignalRPluginPage from '@/pages/plugins/SignalRPluginPage';

export const Route = createFileRoute('/$version/plugins/_sidebar/signalr')({
  component: SignalRPluginPage,
});
