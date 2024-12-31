import Input from '@/components/Input';
import Label from '@/components/Label';
import TextField from '@/components/TextField';
import { useState } from 'react';

const TextFieldPage = () => {
  const [value, setValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const label = 'Label';

  return (
    <div>

      <p className="mb-4 mt-2 text-4xl underline">File Input</p>
      <div className="grid grid-cols-3">
        <TextField value={value} onChange={e => setValue(e.target.value)} variant="outlined" label="Label" size="sm" tooltip="Tooltip" showRequiredIcon />
        <div className="relative col-span-2 box-border inline-flex cursor-text items-center">
          <Input type="email" name="email" onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} value={value} onChange={e => setValue(e.target.value)} className="z-2 border-none" />
          <Label className={`absolute left-[18px] z-1 ${(value || inputFocus) && 'z-20 -translate-y-7'} top-1/4 text-lg text-neutral-light-black transition-all`}>{label}</Label>
          <fieldset className={`pointer-events-none absolute inset-0 z-10 m-0 h-14 min-w-0 overflow-hidden rounded border border-solid border-gray-300 p-3 
            transition-all ${inputFocus && 'border-primary-focused'}`}
          >
            <legend className={`float-[unset] invisible block h-0 w-auto overflow-hidden p-0 text-base ${(value || inputFocus) && 'px-2'}`}>{(value || inputFocus) ? label : ''}</legend>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default TextFieldPage;
