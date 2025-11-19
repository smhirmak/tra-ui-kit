import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import Select from './select';

const countries = [
  {
    content:
      <span className="flex gap-1">
        <img src="/assets/icons/flagOfTurkey.svg" alt="TR" width="30px" height="20px" style={{ overflow: 'hidden' }} />
        TR
      </span>,
    value: 'tr',
  },
  {
    content:
      <span className="flex gap-1">
        <img src="/assets/icons/flagOfUK.svg" alt="EN" width="30px" height="20px" style={{ overflow: 'hidden' }} />
        EN
      </span>,
    value: 'en',
  },
];

interface ILanguangeSelect {
  className?: string;
}

const LanguangeSelect: React.FC<ILanguangeSelect> = ({ className }) => {
  const { setLocale } = useLocalizeContext();

  const handleChange = (event: string | string[] | number | number[] | boolean) => {
    const localeLang: string = countries?.find(f => f?.value === event)?.value ?? '';
    localStorage.setItem('lang', localeLang);
    setLocale(localeLang);
  };

  return (
    <div className={className}>
      <Select
        dropdownTriggerClassName="border-none"
        defaultValue={localStorage.getItem('lang') || undefined}
        options={countries}
        onChange={handleChange}
      />
    </div>
  );
};

export default LanguangeSelect;
