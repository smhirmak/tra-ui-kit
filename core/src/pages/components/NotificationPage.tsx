import Button from '@/components/button';
import Notification from '@/components/Notification';
import { RadioGroup, RadioGroupItem } from '@/components/RadioButtons';
import { useAppContext } from '@/contexts/app/AppProvider';

const NotificationPage = () => {
  const { info, success, error, warn } = Notification();
  const { setNotificationTheme, setNotificationMode, setNotificationAnimateMode, setNotificationPosition } = useAppContext();
  return (
    <div className="mb-6 border-b-2 pb-6">
      <p className="text-4xl underline">Notification</p>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <RadioGroup defaultValue="default" onChange={e => setNotificationTheme(e as 'default' | 'lined' | 'colored')} className="mt-3 flex w-fit flex-col rounded-md bg-primary-15 p-4">
          <RadioGroupItem id="default" label="Default" value="default" />
          <RadioGroupItem id="lined" label="Lined" value="lined" />
          <RadioGroupItem id="colored" label="Colored" value="colored" />
        </RadioGroup>
        <RadioGroup defaultValue="light" onChange={e => setNotificationMode(e as 'light' | 'dark')} className="mt-3 flex w-fit flex-col rounded-md bg-primary-15 p-4">
          <RadioGroupItem id="light" label="Light" value="light" />
          <RadioGroupItem id="dark" label="Dark" value="dark" />
        </RadioGroup>
        <RadioGroup
          defaultValue="bounce"
          onChange={e => setNotificationAnimateMode(e as 'bounce' | 'slide' | 'flip' | false)}
          className="mt-3 flex w-fit flex-col rounded-md bg-primary-15 p-4"
        >
          <RadioGroupItem id="bounce" label="Bounce" value="bounce" />
          <RadioGroupItem id="slide" label="Slide" value="slide" />
          <RadioGroupItem id="flip" label="Flip" value="flip" />
          <RadioGroupItem id="false" label="Disabled" value="false" />
        </RadioGroup>
        <RadioGroup defaultValue="top-right" onChange={e => setNotificationPosition(e as 'top-right' | 'bottom-right')} className="mt-3 flex w-fit flex-col rounded-md bg-primary-15 p-4">
          <RadioGroupItem id="top-right" label="Top Right" value="top-right" />
          <RadioGroupItem id="bottom-right" label="Bottom Right" value="bottom-right" />
          <RadioGroupItem id="top-left" label="Top Left" value="top-left" />
          <RadioGroupItem id="bottom-left" label="Bottom Left" value="bottom-left" />
        </RadioGroup>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4 border-t-4 py-2 md:grid-cols-4 [&>button]:whitespace-pre-wrap">
        <Button onClick={() => info('Info', { autoClose: false })}>Without Auto Close Info Notification</Button>
        <Button onClick={() => error('Error', { autoClose: false })} className="bg-error hover:bg-error/75">Without Auto Close Error Notification</Button>
        <Button onClick={() => success('Success', { autoClose: false })} className="bg-success text-neutral-black">Without Auto Close Success Notification</Button>
        <Button onClick={() => warn('Warning', { autoClose: false })} className="bg-warning text-neutral-white">Without Auto Close Warning Notification</Button>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4 border-t-4 py-2 md:grid-cols-4 [&>button]:whitespace-pre-wrap">
        <Button onClick={() => info('Info')}>With Auto Close Info Notification</Button>
        <Button onClick={() => error('Error')} className="bg-error hover:bg-error/75">With Auto Close Error Notification</Button>
        <Button onClick={() => success('Success')} className="bg-success text-neutral-black">With Auto Close Success Notification</Button>
        <Button onClick={() => warn('Warning')} className="bg-warning text-neutral-white">With Auto Close Warning Notification</Button>
      </div>
    </div>
  );
};

export default NotificationPage;
