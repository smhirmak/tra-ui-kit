import { createRef, useEffect, useImperativeHandle, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import LoadingLinear from '@/components/LoadingLinear';

export type LoaderRefType = {
  incLoader: () => void;
  decLoader: () => void;
};

export const loaderRef = createRef<LoaderRefType>();

interface ILoader {
  className?: string;
  enableScroll?: boolean;
  linearItemClassName?: string;
  variant?: 'circular' | 'linear';
}

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
            <div className="z-9999 fixed left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-brightness-50 dark:backdrop-brightness-75">
              <LoadingSpinner className={className} />
            </div>
          )
          : (
            <div className="z-9999 fixed left-0 top-0 h-screen w-screen backdrop-brightness-50 dark:backdrop-brightness-75">
              <LoadingLinear linearContainerClassName={className} linearItemClassName={linearItemClassName} />
            </div>
          )}
      </>
    )
  );
};

export default Loader;
