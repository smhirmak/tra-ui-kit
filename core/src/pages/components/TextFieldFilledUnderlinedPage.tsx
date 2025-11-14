import { Plus } from '@phosphor-icons/react';
import TextField from '@/components/text-field';
import { useState } from 'react';

const TextFieldFilledUnderlinedPage = () => {
  const [value, setValue] = useState('');

  return (
    <div className="mb-6 border-b-2 pb-6">
      <p className="text-4xl underline">Inputs Filled</p>
      <div className="mt-2 border-t-2 py-2">
        <p className="mb-4 mt-2 text-xl">Small:</p>
        <div className="mb-2 flex space-x-4">
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} id="1" name="1" showRequiredIcon label="Label" size="sm" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} id="2" name="2" label="Label" size="sm" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} id="3" name="3" label="Error" size="sm" error />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} id="4" name="4" label="Error" size="sm" error borderRadius="lg" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} id="5" name="5" label="Disabled" size="sm" disabled />
        </div>
        <div className="mb-2 flex space-x-4">
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Tooltip" size="sm" tooltip={['Deneme1', 'Deneme2']} />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Label" size="sm" startIcon={<Plus />} />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Label" size="sm" endIcon={<Plus />} />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Label" size="sm" borderRadius="lg" />
        </div>
      </div>
      <div className="mt-2 border-t-2 py-2">
        <p className="mb-4 mt-2 text-xl">Default:</p>
        <div className="mb-2 flex space-x-4">
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Label" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Label" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Error" error />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Error" error borderRadius="lg" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Disabled" disabled />
        </div>
        <div className="mb-2 flex space-x-4">
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Label" tooltip="Tooltip" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Label" startIcon={<Plus />} />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Label" endIcon={<Plus />} />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} label="Label" borderRadius="lg" />
        </div>
      </div>
      <div className="mt-2 border-t-2 py-2">
        <p className="mb-4 mt-2 text-xl">Large:</p>
        <div className="mb-2 flex space-x-4">
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} size="lg" label="Error" error />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} size="lg" label="Error" error borderRadius="lg" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} size="lg" label="Disabled" disabled />
        </div>
        <div className="flex space-x-4">
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" tooltip="Tooltip" />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" startIcon={<Plus />} />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" endIcon={<Plus />} />
          <TextField variant="filledUnderlined" value={value} onChange={e => setValue(e.target.value)} size="lg" label="Label" borderRadius="lg" />
        </div>
      </div>
    </div>
  );
};

export default TextFieldFilledUnderlinedPage;
