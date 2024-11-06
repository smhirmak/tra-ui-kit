import { RadioGroup, RadioGroupItem } from '@/components/RadioButtons';

const RadioButtonPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl underline">Radio Buttons</p>
    <div className="mt-2 flex border-t-2 py-2">
      <RadioGroup className="flex space-x-2">
        <RadioGroupItem id="0" label="Default" value="0" />
        <RadioGroupItem id="4" label="Default" value="4" />
        <RadioGroupItem id="1" label="Checked" value="1" checked />
        <RadioGroupItem id="2" label="Disabled" value="1" disabled />
        <RadioGroupItem id="3" label="Checked and Disabled" value="1" checked disabled />
      </RadioGroup>
    </div>
  </div>
);

export default RadioButtonPage;
