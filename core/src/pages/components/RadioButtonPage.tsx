import { RadioGroup, RadioGroupItem } from '@/components/radio-buttons';

const RadioButtonPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl underline">Radio Buttons</p>
    <div className="mt-2 flex border-t-2 py-2">
      <RadioGroup className="flex flex-col gap-2" defaultValue="2" onChange={e => console.log(e)}>
        <RadioGroupItem id="1" value="1" label="Option 1" />
        <RadioGroupItem id="2" value="2" label="Option 2" />
        <RadioGroupItem id="3" value="3" label="Option 3" />
        <RadioGroupItem id="4" value="4" label="Checked" checked />
        <RadioGroupItem id="5" value="5" label="Disabled" disabled />
        <RadioGroupItem id="6" value="6" label="Checked and Disabled" checked disabled />
      </RadioGroup>
    </div>
  </div>
);

export default RadioButtonPage;
