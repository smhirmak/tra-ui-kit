import { Plus } from '@/assets/Icons';
import TextField from '@/components/TextField';
import { useState } from 'react';

const TextFieldPage = () => {
  const [value, setValue] = useState('');
  return (
    <div>
      <div className="mb-6 border-b-2 pb-6">
        <p className="text-4xl underline">Inputs Filled</p>
        <div className="mt-2 border-t-2 py-2">
          <p className="mt-2 text-xl">Small:</p>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} showRequiredIcon label="Label" size="sm" />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" size="sm" />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Error" size="sm" error />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Error" size="sm" error borderRadius="lg" />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Disabled" size="sm" disabled />
          </div>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Tooltip" size="sm" tooltip={['Deneme1', 'Deneme2']} />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" size="sm" startIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" size="sm" endIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" size="sm" borderRadius="lg" />
          </div>
        </div>
        <div className="mt-2 border-t-2 py-2">
          <p className="mt-2 text-xl">Default:</p>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Error" error />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Error" error borderRadius="lg" />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Disabled" disabled />
          </div>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" tooltip="Tooltip" />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" startIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" endIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} label="Label" borderRadius="lg" />
          </div>
        </div>
        <div className="mt-2 border-t-2 py-2">
          <p className="mt-2 text-xl">Large:</p>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" />
            <TextField value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" />
            <TextField value={value} onChange={e => setValue(e.target.value)} size="lg" label="Error" error />
            <TextField value={value} onChange={e => setValue(e.target.value)} size="lg" label="Error" error borderRadius="lg" />
            <TextField value={value} onChange={e => setValue(e.target.value)} size="lg" label="Disabled" disabled />
          </div>
          <div className="flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" tooltip="Tooltip" />
            <TextField value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" startIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" endIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" borderRadius="lg" />
          </div>
        </div>
      </div>
      <div className="mb-6 border-b-2 pb-6">
        <p className="text-4xl underline">Inputs Outlined</p>
        <div className="mt-2 border-t-2 py-2">
          <p className="my-2 text-xl">Small:</p>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" size="sm" showRequiredIcon />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" size="sm" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Error" size="sm" error />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Error" size="sm" error borderRadius="lg" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Disabled" size="sm" disabled />
          </div>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" size="sm" tooltip="Tooltip" showRequiredIcon />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" size="sm" startIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" size="sm" endIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" size="sm" borderRadius="lg" />
          </div>
        </div>
        <div className="mt-2 border-t-2 py-2">
          <p className="my-2 text-xl">Default:</p>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Error" error />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Error" error borderRadius="lg" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Disabled" disabled />
          </div>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" tooltip="Tooltip" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" startIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" endIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" borderRadius="lg" />
          </div>
        </div>
        <div className="mt-2 border-t-2 py-2">
          <p className="mb-4 mt-2 text-xl">Large:</p>
          <div className="mb-2 flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Label" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Label" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Error" error />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Error" error borderRadius="lg" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Disabled" disabled />
          </div>
          <div className="flex space-x-4">
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Label" tooltip="Tooltip" />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Label" startIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Label" endIcon={<Plus />} />
            <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Label" borderRadius="lg" />
          </div>
        </div>
      </div>
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
        <p className="mb-4 mt-2 text-4xl underline">File Input</p>
        <div className="flex space-x-4">
          <TextField id="123456" type="file" value="" onChange={e => console.log(e.target.files && e.target?.files[0])} endIcon={<Plus />} />
          <TextField type="file" id="123" value="" onChange={e => console.log(e.target.files && e.target?.files[0])} />
        </div>
      </div>
    </div>
  );
};

export default TextFieldPage;
