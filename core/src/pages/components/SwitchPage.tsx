import Switch from '@/components/Switch';

const SwitchPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl">Switch</p>
    <div className="mt-2 flex flex-col space-y-2 border-t-2 py-2">
      <p className="my-2 text-xl">Apple:</p>
      <div className="flex items-center gap-4">
        <Switch id="2" defaultChecked />
        <Switch id="1" />
      </div>
      <p className="my-2 text-xl">Android:</p>
      <div className="flex items-center gap-4">
        <Switch variant="android" id="4" defaultChecked />
        <Switch variant="android" id="3" />
      </div>
    </div>
  </div>
);

export default SwitchPage;
