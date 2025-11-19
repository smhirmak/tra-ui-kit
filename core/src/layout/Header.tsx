import LanguangeSelect from '@/components/languange-select';
import ThemeModeToggle from '@/components/theme-mode-toggle';

const Header = () => (
  <div className="flex w-full items-center justify-between bg-slate-300">
    Header
    <ThemeModeToggle />
    <LanguangeSelect />
  </div>
);

export default Header;
