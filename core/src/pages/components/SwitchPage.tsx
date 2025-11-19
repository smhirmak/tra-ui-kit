import { useState } from 'react';
import Switch from '@/components/switch';

const SwitchPage = () => {
  const [checkedApple, setCheckedApple] = useState<boolean>(false);
  const [checkedAndroid, setCheckedAndroid] = useState<boolean>(false);
  return (
    <div className="mb-6 border-b-2 pb-6">
      <p className="text-4xl">Switch</p>
      <div className="mt-2 flex flex-col space-y-2 border-t-2 py-2">
        <p className="my-2 text-xl">Apple:</p>
        <div className="flex items-center gap-4">
          <Switch checked={checkedApple} onChange={e => setCheckedApple(e)} id="2" label="Apple" />
        </div>
        <p className="my-2 text-xl">Android:</p>
        <div className="flex items-center gap-4">
          <Switch checked={checkedAndroid} onChange={e => setCheckedAndroid(e)} variant="android" id="4" label="Android" />
        </div>
      </div>
    </div>
  );
};

export default SwitchPage;
