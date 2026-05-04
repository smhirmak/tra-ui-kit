import Select from './select';

const countries = [
  {
    content: (
      <img
        src="/assets/icons/flagOfTurkey.svg"
        className="overflow-hidden"
        alt="TR"
        width="30px"
        height="20px"
        title="TR"
      />
    ),
    value: 'tr',
  },
  {
    content: (
      <img
        src="/assets/icons/flagOfUK.svg"
        className="overflow-hidden"
        alt="EN"
        width="30px"
        height="20px"
        title="EN"
      />
    ),
    value: 'en',
  },
];

interface ILanguageSelect {
  className?: string;
  locale: string;
  setLocale: (locale: string) => void;
  defaultValue?: string;
}

const LanguageSelect: React.FC<ILanguageSelect> = ({
  className,
  locale,
  setLocale,
  defaultValue,
}) => {
  const handleChange = (event: string | string[] | number | number[] | boolean) => {
    const found = countries.find((f) => f.value === event);
    const localeLang = found?.value ?? defaultValue ?? 'en';
    setLocale?.(localeLang);
  };

  return (
    <div className={className}>
      <Select
        dropdownTriggerClassName="border-none"
        options={countries}
        value={((locale as string) || localStorage.getItem('lang')) ?? defaultValue ?? 'en'}
        onChange={handleChange}
        dropdownItemContainerClassName="flex flex-col gap-1"
        dropdownItemClassName="justify-center"
        hideClearButton
      />
    </div>
  );
};

export default LanguageSelect;
