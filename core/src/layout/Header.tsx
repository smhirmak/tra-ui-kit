import LanguangeSelect from '@/components/LanguangeSelect';
import ThemeModeToggle from '@/components/ThemeModeToggle';

const Header = () => (
  <div className="flex w-full items-center justify-between bg-slate-300">
    Header
    <ThemeModeToggle />
    <LanguangeSelect />
  </div>
);

export default Header;
