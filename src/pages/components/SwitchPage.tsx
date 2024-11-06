import Switch from '@/components/Switch';
import React from 'react';

const SwitchPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl">Switch</p>
    <div className="mt-2 flex flex-col space-y-2 border-t-2 py-2">
      <p className="my-2 text-xl">Apple:</p>
      <Switch variant="apple" />
      <p className="my-2 text-xl">Android:</p>
      <Switch variant="android" />
    </div>
  </div>
);

export default SwitchPage;
