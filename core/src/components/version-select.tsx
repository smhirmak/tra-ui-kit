import React from 'react';
import { useVersion } from '@/contexts/version';
import { cn } from '@/lib/utils';
import Dropdown from '@/components/dropdown';
import Badge from '@/components/badge';

interface VersionSelectProps {
  className?: string;
}

const VersionSelect: React.FC<VersionSelectProps> = ({ className }) => {
  const { currentVersion, versions, setVersion, isLoading } = useVersion();

  if (isLoading || versions.length === 0) {
    return null;
  }

  const options = versions.map((v) => ({
    label: (
      <div className="flex items-center gap-2">
        <span>{v.label}</span>
        {v.isLatest && (
          <Badge
            color="primary"
            size="sm"
            text="Latest"
          />
        )}
        {v.isDeprecated && (
          <Badge
            color="error"
            size="sm"
            text="Deprecated"
          />
        )}
      </div>
    ),
    value: v.version,
  }));

  return (
    <Dropdown
      options={options}
      value={currentVersion}
      onChange={(value) => setVersion(value as string)}
      className={cn('', className)}
      triggerClassName="bg-background border-border hover:bg-accent py-1 px-1.5"
      itemClassName="px-1.5"
      contentClassName="min-w-[80px]"
      iconClassName="!size-3 ml-2"
      placeholder="Select version"
      dropdownAlign="right"
    />
  );
};

export default VersionSelect;
