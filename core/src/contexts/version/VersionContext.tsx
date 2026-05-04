import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useNavigate, useParams, useRouterState } from '@tanstack/react-router';

export interface VersionInfo {
  version: string;
  label: string;
  releaseDate: string;
  isLatest: boolean;
  isDeprecated?: boolean;
}

export interface VersionContextType {
  currentVersion: string;
  versions: VersionInfo[];
  isLatestVersion: boolean;
  setVersion: (version: string) => void;
  isLoading: boolean;
  latestVersion?: string;
}

const initialState: VersionContextType = {
  currentVersion: '0.2.0',
  versions: [],
  isLatestVersion: true,
  setVersion: () => null,
  isLoading: true,
};

const VersionContext = createContext<VersionContextType>(initialState);

interface VersionProviderProps {
  children: ReactNode;
  storageKey?: string;
}

export const VersionProvider = ({
  children,
  storageKey = 'tra-ui-version',
}: VersionProviderProps) => {
  const { version: urlVersionRaw } = useParams({ strict: false });
  const navigate = useNavigate();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const [versions, setVersions] = useState<VersionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVersion, setCurrentVersion] = useState<string>('');

  const urlVersion = urlVersionRaw?.replace(/^v/, '');

  const latestVersion = versions.find((v) => v.isLatest)?.version;

  // Load versions metadata
  useEffect(() => {
    const loadVersions = async () => {
      try {
        const response = await fetch('/versions.json');
        const data = await response.json();
        setVersions(data.versions);

        // Use URL version if available
        const defaultVersion =
          data.defaultVersion || data.versions.find((v: VersionInfo) => v.isLatest)?.version || '1';
        const initialVersion = urlVersion || defaultVersion;

        // Validate version exists
        const versionExists = data.versions.some((v: VersionInfo) => v.version === initialVersion);
        const finalVersion = versionExists ? initialVersion : defaultVersion;

        setCurrentVersion(finalVersion);

        // If no URL version, redirect to default
        if (!urlVersion) {
          navigate({ to: `/v${finalVersion}` as any, replace: true });
        }
      } catch (error) {
        console.error('Failed to load versions:', error);
        // Fallback to default
        setVersions([
          {
            version: '1',
            label: 'v1 (Latest)',
            releaseDate: new Date().toISOString(),
            isLatest: true,
          },
        ]);
        setCurrentVersion('1');
      } finally {
        setIsLoading(false);
      }
    };

    loadVersions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update version when URL changes
  useEffect(() => {
    if (urlVersion && urlVersion !== currentVersion && versions.length > 0) {
      const versionExists = versions.some((v) => v.version === urlVersion);
      if (versionExists) {
        setCurrentVersion(urlVersion);
        localStorage.setItem(storageKey, urlVersion);
      }
    }
  }, [urlVersion, storageKey, currentVersion, versions]);

  const setVersion = useCallback(
    (version: string) => {
      setCurrentVersion(version);
      localStorage.setItem(storageKey, version);

      // Replace version in URL path
      const pathParts = pathname.split('/');
      pathParts[1] = `v${version}`; // Replace /vX part
      const newPath = pathParts.join('/');
      navigate({ to: newPath as any });
    },
    [storageKey, navigate, pathname],
  );

  const isLatestVersion = useMemo(() => {
    const latestVersion = versions.find((v) => v.isLatest)?.version;
    return currentVersion === latestVersion;
  }, [currentVersion, versions]);

  const value = useMemo(
    () => ({
      currentVersion,
      versions,
      isLatestVersion,
      setVersion,
      isLoading,
      latestVersion,
    }),
    [currentVersion, versions, isLatestVersion, setVersion, isLoading, latestVersion],
  );

  return <VersionContext.Provider value={value}>{children}</VersionContext.Provider>;
};

export const useVersion = () => {
  const context = useContext(VersionContext);

  if (context === undefined) {
    throw new Error('useVersion must be used within a VersionProvider');
  }

  return context;
};
