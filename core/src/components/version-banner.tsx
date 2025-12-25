import React from 'react';
import InformationStatus from '@/components/information-status';
import { useVersion } from '@/contexts/version';

const VersionBanner: React.FC = () => {
  const { isLatestVersion, currentVersion, versions, setVersion, latestVersion } = useVersion();

  if (isLatestVersion) {
    return null;
  }

  const currentVersionInfo = versions.find((v) => v.version === currentVersion);

  return (
    <div className="mb-6">
      <InformationStatus
        type="warning"
        isHaveIcon
        className="w-full max-w-full"
        title={
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span>
              You're viewing documentation for <strong>v{currentVersion}</strong>
              {currentVersionInfo?.isDeprecated && ' (deprecated)'}.{' '}
              {latestVersion && (
                <>
                  The latest version is <strong>v{latestVersion}</strong>.
                </>
              )}
            </span>
            {latestVersion && (
              <button
                onClick={() => setVersion(latestVersion)}
                className="text-sm font-medium underline hover:no-underline whitespace-nowrap cursor-pointer"
              >
                View latest version
              </button>
            )}
          </div>
        }
      />
    </div>
  );
};

export default VersionBanner;
