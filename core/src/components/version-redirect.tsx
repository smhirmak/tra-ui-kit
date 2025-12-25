import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

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

  if (isLoading) {
    return null; // or a loading spinner
  }

  return <Navigate to={`/v${latestVersion}`} replace />;
};

export default VersionRedirect;
