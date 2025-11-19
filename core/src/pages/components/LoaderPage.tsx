import Button from '@/components/button';
import Loader, { loaderRef } from '@/components/loader-';
import LoadingLinear from '@/components/loading-linear';
import LoadingSpinner from '@/components/loading-spinner';

const LoaderPage = () => (
  <div>
    <p className="text-4xl underline">Loader</p>
    <Loader variant="linear" />
    <p className="mt-2 text-xl">Circular:</p>
    <LoadingSpinner />
    <p className="mt-2 text-xl">Linear:</p>
    <LoadingLinear />
    <Button onClick={() => loaderRef.current?.incLoader()}>Show Loader</Button>
    <Button onClick={() => loaderRef.current?.decLoader()}>Show Loader</Button>
  </div>
);

export default LoaderPage;
