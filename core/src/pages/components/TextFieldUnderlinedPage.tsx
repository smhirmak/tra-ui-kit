import { Plus } from '@phosphor-icons/react';
import TextField from '@/components/text-field';
import { useState } from 'react';

const TextFieldUnderlinedPage = () => {
  const [value, setValue] = useState('');

  return (
    <div className="mb-6 border-b-2 pb-6">
      <p className="text-4xl underline">Inputs Underlined</p>
      <div className="mt-2 border-t-2 py-2">
        <p className="my-2 text-xl">Small:</p>
        <div className="mb-2 flex space-x-4">
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" size="sm" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" size="sm" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Error" size="sm" error />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Error" size="sm" error borderRadius="lg" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Disabled" size="sm" disabled />
        </div>
        <div className="mb-2 flex space-x-4">
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" size="sm" tooltip="Tooltip" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" size="sm" startIcon={<Plus />} />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" size="sm" endIcon={<Plus />} />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" size="sm" borderRadius="lg" />
        </div>
      </div>
      <div className="mt-2 border-t-2 py-2">
        <p className="mb-3 mt-2 text-xl">Default:</p>
        <div className="mb-2 flex space-x-4">
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Error" error />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Error" error borderRadius="lg" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Disabled" disabled />
        </div>
        <div className="mb-2 flex space-x-4">
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" tooltip="Tooltip" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" startIcon={<Plus />} />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" endIcon={<Plus />} />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" label="Label" borderRadius="lg" />
        </div>
      </div>
      <div className="mt-2 space-y-2 border-t-2 py-2">
        <p className="mb-4 mt-2 text-xl">Large:</p>
        <div className="mb-2 flex space-x-4">
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" size="lg" label="Label" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" size="lg" label="Label" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" size="lg" label="Error" error />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" size="lg" label="Error" error borderRadius="lg" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" size="lg" label="Disabled" disabled />
        </div>
        <div className="flex space-x-4">
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" size="lg" label="Label" tooltip="Tooltip" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" size="lg" label="Label" startIcon={<Plus />} />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" size="lg" label="Label" endIcon={<Plus />} />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="underlined" size="lg" label="Label" borderRadius="lg" />
        </div>
      </div>

    </div>
  );
};

export default TextFieldUnderlinedPage;
