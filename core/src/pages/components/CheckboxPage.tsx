import Checkbox from '@/components/checkbox';

const CheckboxPage = () => (
  <div className="mb-6 border-b-2 pb-6">
    <p className="text-4xl underline">Checkbox</p>
    <p className="mt-2 text-xl">Small Rectangular:</p>
    <div className="mt-2 flex space-x-2">
      <Checkbox id="1" size="sm" />
      <Checkbox id="2" size="sm" label="Label" />
      <Checkbox id="3" size="sm" disabled label="Label" />
      <Checkbox id="3" size="sm" disabled checked label="Label" />
    </div>
    <p className="mt-2 text-xl">Defalut Rectangular:</p>
    <div className="mt-2 flex space-x-2">
      <Checkbox id="4" />
      <Checkbox id="5" label="Label" />
      <Checkbox id="6" disabled label="Label" />
      <Checkbox id="6" disabled checked label="Label" />
    </div>
    <p className="mt-2 text-xl">Large Rectangular:</p>
    <div className="mt-2 flex space-x-2">
      <Checkbox id="7" size="lg" />
      <Checkbox id="8" size="lg" label="Label" />
      <Checkbox id="9" size="lg" disabled label="Label" />
      <Checkbox id="9" size="lg" disabled checked label="Label" />
    </div>
    <p className="mt-2 text-xl">Small Circular:</p>
    <div className="mt-2 flex space-x-2">
      <Checkbox id="10" size="sm" variant="circular" />
      <Checkbox id="11" size="sm" variant="circular" label="Label" />
      <Checkbox id="12" size="sm" variant="circular" disabled label="Label" />
      <Checkbox id="12" size="sm" variant="circular" disabled checked label="Label" />
    </div>
    <p className="mt-2 text-xl">Default Circular:</p>
    <div className="mt-2 flex space-x-2">
      <Checkbox id="13" />
      <Checkbox id="14" variant="circular" label="Label" />
      <Checkbox id="14" variant="circular" disabled checked label="Label" />
    </div>
    <p className="mt-2 text-xl">Large Circular:</p>
    <div className="mt-2 flex space-x-2">
      <Checkbox id="16" size="lg" variant="circular" />
      <Checkbox id="17" size="lg" variant="circular" label="Label" />
      <Checkbox id="18" size="lg" variant="circular" disabled label="Label" />
    </div>
  </div>
);

export default CheckboxPage;
