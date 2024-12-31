import { Plus } from '@/assets/Icons';
import Button from '@/components/Button';
import TextField from '@/components/TextField';
import { useState } from 'react';

const TextFieldOutlinedPage = () => {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');

  return (
    <div className="mb-6 border-b-2 pb-6">
      <p className="text-4xl underline">Inputs Outlined</p>
      <div className="mt-2 border-t-2 py-2">
        <p className="my-2 text-xl">Small:</p>
        <div className="mb-2 flex space-x-4">
          <form onSubmit={e => {
            e.preventDefault();
            console.log(value);
            console.log(value1);
          }}
          >
            <TextField value={value} onChange={e => { console.log(1); setValue(e.target.value); }} id="10" type="email" name="email" variant="outlined" label="Label" size="sm" showRequiredIcon />
            <TextField value={value1} onChange={e => setValue1(e.target.value)} id="11" type="password" name="password" variant="outlined" label="Label" size="sm" showRequiredIcon />
            <Button type="submit">Submit</Button>
          </form>
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" size="sm" />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" id="error" label="Error" size="sm" error />
          <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" id="error1" label="Error" size="sm" error borderRadius="lg" />
          <TextField variant="outlined" label="Disabled" size="sm" disabled />
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
          <TextField value={value} type='password' onChange={e => setValue(e.target.value)} variant="outlined" label="Label" borderRadius="lg" />
          <TextField value={value} type='password' onChange={e => setValue(e.target.value)} variant="outlined" label="Label" />
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
          <TextField value={value} type='password' onChange={e => setValue(e.target.value)} variant="outlined" size="lg" label="Label" borderRadius="lg" />
        </div>
      </div>
    </div>
  );
};

export default TextFieldOutlinedPage;
