import Button from '@/components/Button';
import Drawer from '@/components/Drawer';
import { RadioGroup, RadioGroupItem } from '@/components/RadioButtons';
import { useState } from 'react';

const DrawerPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('left');

  return (
    <div className="p-4">
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Open Drawer Overlay
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        title="MSI Drawer"
        // alwaysOpen
        footer="Footer"
      >
        <RadioGroup defaultValue={position} onChange={value => setPosition(value as 'left' | 'right' | 'top' | 'bottom')}>
          <RadioGroupItem id="left" value="left" label="Left" />
          <RadioGroupItem id="right" value="right" label="Right" />
          <RadioGroupItem id="top" value="top" label="Top" />
          <RadioGroupItem id="bottom" value="bottom" label="Bottom" />
        </RadioGroup>
        <h2 className="mb-4 text-2xl font-bold">Overlay Drawer Content</h2>
        <p>This is the content of the drawer.</p>
        <p>This is the content of the drawer.</p>
        <p>This is the content of the drawer.</p>
        <p>This is the content of the drawer.</p>
      </Drawer>
      <div className="h-[1000px]">asdf</div>
    </div>
  );
};

export default DrawerPage;
