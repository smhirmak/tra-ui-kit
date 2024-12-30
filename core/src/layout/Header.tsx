import LanguangeSelect from '@/components/LanguangeSelect';
import ThemeModeToggle from '@/components/ThemeModeToggle';

const Header = () => (
  <div className="flex justify-between items-center bg-slate-300 w-full">
    Header
    <ThemeModeToggle />
    <LanguangeSelect />
  </div>
);

export default Header;
