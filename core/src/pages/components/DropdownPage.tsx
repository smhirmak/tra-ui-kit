import { useState } from 'react';
import Dropdown from '@/components/dropdown';

const sampleOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
];

const longOptions = Array.from({ length: 30 }).map((_, i) => ({ label: `Item ${i + 1}`, value: String(i + 1) }));

const DropdownPage = () => {
    const [controlledValue, setControlledValue] = useState<string | number | boolean | undefined>('2');
    const [basicValue, setBasicValue] = useState<string | number | boolean | undefined>(undefined);

    return (
        <div className="space-y-8 p-6">
            <h1 className="text-2xl font-semibold">Dropdown examples</h1>

            <section>
                <h2 className="mb-2 text-lg font-medium">Basic (uncontrolled)</h2>
                <Dropdown
                    options={sampleOptions}
                    onChange={v => setBasicValue(v)}
                    placeholder="Choose an option"
                />
                <div className="mt-2 text-sm text-neutral-grey">Selected: {String(basicValue ?? 'none')}</div>
            </section>

            <section>
                <h2 className="mb-2 text-lg font-medium">Controlled</h2>
                <Dropdown
                    options={sampleOptions}
                    value={controlledValue}
                    onChange={v => setControlledValue(v)}
                />
                <div className="mt-2 text-sm text-neutral-grey">Controlled value: {String(controlledValue)}</div>
            </section>

            <section>
                <h2 className="mb-2 text-lg font-medium">Default value</h2>
                <Dropdown
                    options={sampleOptions}
                    defaultValue={'3'}
                    onChange={v => console.log('default changed', v)}
                />
            </section>

            <section>
                <h2 className="mb-2 text-lg font-medium">Disabled</h2>
                <Dropdown
                    options={sampleOptions}
                    disabled
                    placeholder="Disabled"
                />
            </section>

            <section>
                <h2 className="mb-2 text-lg font-medium">Right aligned / custom width</h2>
                <div className="max-w-xs">
                    <Dropdown
                        options={sampleOptions}
                        placeholder="Right aligned"
                        dropdownAlign="right"
                    />
                </div>
            </section>

            <section>
                <h2 className="mb-2 text-lg font-medium">Long list (scroll)</h2>
                <div className="max-w-sm">
                    <Dropdown
                        options={longOptions}
                        placeholder="Pick an item"
                    />
                </div>
            </section>
        </div>
    );
};

export default DropdownPage;