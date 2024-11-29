import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ISelectBox {
  className?: string;
  containerClassName?: string;
  defaultValue?: string | undefined;
  value: string | number;
  optionsList: { value: string | number; content: string }[];
  translateFunction?: (key: string) => string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}

const SelectBox: React.FC<ISelectBox> = ({ error, containerClassName, className, defaultValue, value, optionsList, translateFunction, onChange, placeholder = '' }) => (
  <div className={containerClassName}>
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue}
      value={String(value)}
    >
      <SelectTrigger className={`h-14 ${className}`} error={error}>
        <SelectValue placeholder={translateFunction ? <span className="text-tra-neutral-grey dark:text-tra-input">{translateFunction(placeholder)}</span> : placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {optionsList?.map((option, index) => (
            <SelectItem
              key={index}
              value={String(option.value)}
            >
              {translateFunction ? translateFunction(option.content) : option.content}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default SelectBox;
