import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface VersionsData {
  versions: Array<{
    version: string;
    isLatest: boolean;
  }>;
  defaultVersion: string;
}

const VersionRedirect = () => {
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLatestVersion = async () => {
      try {
        const response = await fetch('/versions.json');
        const data: VersionsData = await response.json();
        const latest = data.versions.find((v) => v.isLatest)?.version || data.defaultVersion || '1';
        setLatestVersion(latest);
      } catch (error) {
        console.error('Failed to load latest version:', error);
        setLatestVersion('1');
      } finally {
        setIsLoading(false);
      }
    };

    loadLatestVersion();
  }, []);

  useEffect(() => {
    if (!isLoading && latestVersion) {
      navigate({ to: `/$version` as any, params: { version: `v${latestVersion}` } as any });
    }
  }, [isLoading, latestVersion, navigate]);

  return null;
};

export default VersionRedirect;
