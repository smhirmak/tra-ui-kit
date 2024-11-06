import Button from '@/components/Button';
import Notification from '@/components/Notification';

const NotificationPage = () => {
  const { info, success, error, warn } = Notification();
  return (
    <div className="mb-6 border-b-2 pb-6">
      <p className="text-4xl underline">Notification</p>
      <div className="mt-2 flex space-x-2 border-t-2 py-2">
        <Button onClick={() => info('Info', true)}>Info Notification</Button>
        <Button onClick={() => error('Error', true)} className="bg-error">Error Notification</Button>
        <Button onClick={() => success('Success', true)} className="bg-success text-tra-neutral-white">Success Notification</Button>
        <Button onClick={() => warn('Warning', true)} className="bg-warning text-tra-neutral-white">Warning Notification</Button>
      </div>
    </div>
  );
};

export default NotificationPage;
