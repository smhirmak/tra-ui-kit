import { useState } from 'react';
import Button from '@/components/button';
import { RadioGroup, RadioGroupItem } from '@/components/radio-buttons';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/dialog';

const DialogPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<'sm' | 'default' | 'lg' | 'xl' | '2xl'>('default');
  const [position, setPosition] = useState<'center' | 'top' | 'bottom' | 'onlyMobileBottom'>('center');
  const [fullScreen, setFullScreen] = useState(false);
  const [scroll, setScroll] = useState<boolean>(true);

  const handleClose = () => setIsOpen(false);
  return (
    <div className="p-4">

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Trigger: İçine ne koyarsan ona tıklayınca açılır */}
        <DialogTrigger>
          <Button variant="outlined">Profili Düzenle</Button>
        </DialogTrigger>

        {/* Content: Portal ile body'ye taşınır */}
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Dialog Header</DialogTitle>
            <DialogDescription>
              Değişiklikleri yaptıktan sonra kaydet butonuna basınız.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-neutral-light overflow-hidden rounded-lg">
            <div className="p-4">
              <div className="bg-neutral-light w-fit rounded-md p-4">
                <p className="text-lg font-semibold">Size:</p>
                <RadioGroup defaultValue={size} onChange={value => setSize(value as 'default' | 'sm' | 'lg' | 'xl' | '2xl')}>
                  <RadioGroupItem id="sm" value="sm" label="Sm" />
                  <RadioGroupItem id="default" value="default" label="Default" />
                  <RadioGroupItem id="lg" value="lg" label="Lg" />
                  <RadioGroupItem id="xl" value="xl" label="Xl" />
                  <RadioGroupItem id="2xl" value="2xl" label="2xl" />
                </RadioGroup>
              </div>
              <div className="bg-neutral-light w-fit rounded-md p-4">
                <p className="text-lg font-semibold">Position:</p>
                <RadioGroup defaultValue={position} onChange={value => setPosition(value as 'center' | 'top' | 'bottom' | 'onlyMobileBottom')}>
                  <RadioGroupItem id="center" value="center" label="Center" />
                  <RadioGroupItem id="top" value="top" label="Top" />
                  <RadioGroupItem id="bottom" value="bottom" label="Bottom" />
                  <RadioGroupItem id="onlyMobileBottom" value="onlyMobileBottom" label="Only Mobile Bottom" />
                </RadioGroup>
              </div>
              <div className="bg-neutral-light w-fit rounded-md p-4">
                <p className="text-lg font-semibold">Full Screen:</p>
                <RadioGroup defaultValue={fullScreen.toString()} onChange={value => setFullScreen(value === 'true')}>
                  <RadioGroupItem id="fullScreenTrue" value="true" label="True" />
                  <RadioGroupItem id="fullScreenFalse" value="false" label="False" />
                </RadioGroup>
              </div>
              <div className="bg-neutral-light w-fit rounded-md p-4">
                <p className="text-lg font-semibold">Scroll:</p>
                <RadioGroup defaultValue={scroll.toString()} onChange={value => setScroll(value === 'true')}>
                  <RadioGroupItem id="body" value="true" label="True" />
                  <RadioGroupItem id="false" value="false" label="False" />
                </RadioGroup>
              </div>
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus illum eligendi nam accusantium aperiam qui adipisci eum asperiores velit quis?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus illum eligendi nam accusantium aperiam qui adipisci eum asperiores velit quis?
              </p>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className={`inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white 
                shadow-xs hover:bg-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                onClick={handleClose}
              >
                Kapat
              </button>
              <button
                type="button"
                className={`mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700
                 shadow-xs hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm`}
                onClick={handleClose}
              >
                İptal
              </button>
            </div>
          </div>

          <DialogFooter>
            <Button>Kaydet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogPage;
