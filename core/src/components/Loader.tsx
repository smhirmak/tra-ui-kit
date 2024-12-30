import LoadingSpinner from '@/components/ui/loading-spinner';
import { createRef, useEffect, useImperativeHandle, useState } from 'react';
import { ILoader } from '@/types/types';
import LoadingLinear from './ui/loading-linear';

export type LoaderRefType = {
  incLoader: () => void;
  decLoader: () => void;
};

export const loaderRef = createRef<LoaderRefType>();

const Loader: React.FC<ILoader> = ({ className, enableScroll = false, linearItemClassName, variant = 'circular' }) => {
  const [counter, setCounter] = useState(0);
  const incLoader = () => {
    setCounter(x => x + 1);
  };

  const decLoader = () => {
    setCounter(x => x - 1);
  };

  useImperativeHandle(loaderRef, () => ({
    incLoader,
    decLoader,
  }), []);

  // loader çıktığı zaman kullanıcı ekranda gezinememesi için scroll iptal edildi tercihe göre değiştirilebilir.
  useEffect(() => {
    if (!enableScroll) {
      if (counter > 0) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-auto');
      }
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [counter, enableScroll]);

  return (
    counter > 0 && (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {variant === 'circular'
          ? (
            <div className="fixed left-0 top-0 z-9999 flex h-screen w-screen items-center justify-center backdrop-brightness-50 dark:backdrop-brightness-75">
              <LoadingSpinner className={className} />
            </div>
          )
          : (
            <div className="fixed left-0 top-0 z-9999 h-screen w-screen backdrop-brightness-50 dark:backdrop-brightness-75">
              <LoadingLinear linearContainerClassName={className} linearItemClassName={linearItemClassName} />
            </div>
          )}
      </>
    )
  );
};

export default Loader;
