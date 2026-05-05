import { cn } from '@/lib/utils';
import Button from './button';

const countries = [
  {
    content: (
      <img
        src="/assets/icons/flagOfTurkey.svg"
        className="rotate-0 scale-100 transition-all duration-300 group-data-[lang=tr]:-rotate-90 group-data-[lang=tr]:scale-0"
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
        className="absolute top-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all duration-300 group-data-[lang=tr]:rotate-0 group-data-[lang=tr]:scale-100"
        alt="EN"
        width="30px"
        height="20px"
        title="EN"
      />
    ),
    value: 'en',
  },
];

interface ILanguageToggle {
  className?: string;
  locale: string;
  setLocale: (locale: string) => void;
  defaultValue?: string;
}

const LanguageToggle: React.FC<ILanguageToggle> = ({
  className,
  locale,
  setLocale,
  defaultValue,
}) => {
  const handleChange = () => {
    const found = countries.find((f) => f.value !== locale);
    const localeLang = found?.value ?? defaultValue ?? 'en';
    setLocale?.(localeLang);
  };

  return (
    <Button
      className={cn('relative group size-fit p-1', className)}
      onClick={handleChange}
      variant="ghost"
      disableEffect
      size="icon"
      data-lang={locale}
    >
      {countries.map((country) => country.content)}
    </Button>
  );
};

export default LanguageToggle;
