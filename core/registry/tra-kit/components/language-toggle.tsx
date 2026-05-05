import { cn } from '@/lib/utils';
import Button from './button';

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
      className={cn('size-fit p-1', className)}
      onClick={handleChange}
      variant="ghost"
    >
      {countries.find((f) => f.value !== locale)?.content}
    </Button>
  );
};

export default LanguageToggle;
