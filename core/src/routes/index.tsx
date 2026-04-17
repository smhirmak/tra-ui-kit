import { createFileRoute, redirect } from '@tanstack/react-router';

interface VersionsData {
  versions: Array<{ version: string; isLatest: boolean }>;
  defaultVersion: string;
}

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    try {
      const response = await fetch('/versions.json');
      const data: VersionsData = await response.json();
      const latest =
        data.versions.find((v) => v.isLatest)?.version ||
        data.defaultVersion ||
        '1';
      throw redirect({ to: '/$version', params: { version: `v${latest}` } });
    } catch (e) {
      // Re-throw redirect
      if ((e as any)?.isRedirect) throw e;
      throw redirect({ to: '/$version', params: { version: 'v1' } });
    }
  },
  component: () => null,
});
