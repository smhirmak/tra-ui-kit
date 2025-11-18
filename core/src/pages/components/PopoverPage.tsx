import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover-1';

const PopoverPage = () => (
  <Popover>
    <PopoverTrigger>
      <button type="button">Open Menu</button>
    </PopoverTrigger>
    <PopoverContent>
      <div>Popover content</div>
    </PopoverContent>
  </Popover>
);

export default PopoverPage;
