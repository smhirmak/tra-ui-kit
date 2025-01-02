import React, { useContext, useMemo } from 'react';

interface IRadioButtonContext {
  selectedValue: string | number | undefined;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  onChange?: (value: string | number | undefined) => void;
}

const RadioButtonContext = React.createContext<IRadioButtonContext | undefined>(undefined);

interface IRadioGroupItem {
  id: string;
  label?: string;
  disabled?: boolean;
  name?: string;
  value: string;
  className?: string;
  checked?: boolean;
}

export const RadioGroupItem: React.FC<IRadioGroupItem> = ({
  id,
  label,
  disabled = false,
  checked = false,
  name,
  value,
  className = '',
}) => {
  const context = useContext(RadioButtonContext);
  if (!context) {
    throw new Error('RadioGroupItem component must be used within a RadioGroup component');
  }
  const { selectedValue, setSelectedValue, onChange } = context;
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked || selectedValue === value}
        disabled={disabled}
        onChange={() => {
          setSelectedValue(value);
          if (onChange) {
            onChange(value);
          }
        }}
        className="peer hidden"
      />
      <label
        htmlFor={id}
        data-checked={checked || selectedValue === value}
        data-disabled={disabled}
        className={`border-primary-30 bg-disabled-light-dark text-primary ring-offset-error focus-visible:ring-primary peer-checked:border-primary data-[disabled=true]:!border-primary-15 group 
        relative aspect-square size-5 select-none rounded-full border-[1.5px] ring-offset-8 focus:outline-none
        focus-visible:ring-2 focus-visible:ring-offset-2 peer-checked:bg-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50
        dark:bg-transparent ${className}`}
      >
        <span className="group-data-[checked=true]:bg-primary group-data-[disabled=true]:bg-primary-15 absolute left-1/2 top-1/2 hidden aspect-square size-3 -translate-x-1/2
      -translate-y-1/2 select-none rounded-full group-data-[checked=true]:block"
        />
      </label>
      {label && (
        <label htmlFor={id} className="select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
          {label}
        </label>
      )}
    </div>
  );
};

interface IRadioGroup {
  children?: React.ReactNode;
  className?: string;
  defaultValue?: string;
  onChange?: (value: string | number | undefined) => void;
}

export const RadioGroup: React.FC<IRadioGroup> = ({ children, className, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);

  const value = useMemo(() => ({ selectedValue, setSelectedValue, onChange }), [selectedValue]);
  return (
    <RadioButtonContext.Provider value={value}>
      <div className={className}>
        {children}
      </div>
    </RadioButtonContext.Provider>
  );
};
