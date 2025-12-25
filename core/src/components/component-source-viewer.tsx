import { useEffect, useState } from 'react';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { getComponentSource } from '@/utilities/getComponentSource';
import LoadingSpinner from '@/components/loading-spinner';
import { useTranslation } from 'react-i18next';

interface ComponentSourceViewerProps {
  componentName: string;
  className?: string;
}

const ComponentSourceViewer = ({ componentName, className }: ComponentSourceViewerProps) => {
  const [source, setSource] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    getComponentSource(componentName).then((code) => {
      setSource(code);
      setLoading(false);
    });
  }, [componentName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-lg border border-border bg-background p-8">
        <LoadingSpinner className='size-8 mr-2' />
        <span className="text-neutral-grey">{t('Loading component source...')}</span>
      </div>
    );
  }

  return <CustomSyntaxHighlighter content={source} className={className} copyButtonClassName='top-8' />;
};

export default ComponentSourceViewer;
