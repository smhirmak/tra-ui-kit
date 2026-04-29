import Select from './select';

const countries = [
  {
    content:
      <span className="flex gap-1">
        <img src="/assets/icons/flagOfTurkey.svg" className='overflow-hidden' alt="TR" width="30px" height="20px" />
        TR
      </span>,
    value: 'tr',
  },
  {
    content:
      <span className="flex gap-1">
        <img src="/assets/icons/flagOfUK.svg" className='overflow-hidden' alt="EN" width="30px" height="20px" />
        EN
      </span>,
    value: 'en',
  },
];

interface ILanguageSelect {
  className?: string;
  locale: string;
  setLocale: (locale: string) => void;
  defaultValue?: string;
}

const LanguageSelect: React.FC<ILanguageSelect> = ({ className, locale, setLocale, defaultValue }) => {

  const handleChange = (event: string | string[] | number | number[] | boolean) => {
    const found = countries.find(f => f.value === event);
    const localeLang = (found?.value ?? defaultValue ?? 'en');
    setLocale?.(localeLang);
  };

  return (
    <div className={className}>
      <Select
        dropdownTriggerClassName="border-none"
        options={countries}
        value={(locale as string || localStorage.getItem('lang')) ?? defaultValue ?? 'en'}
        onChange={handleChange}
      />
    </div>
  );
};

export default LanguageSelect;
