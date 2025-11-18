/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { cva } from 'class-variance-authority';
import React, { useEffect, useRef, useState } from 'react';
import { CaretDown, Check, X } from '@phosphor-icons/react';
import Label from '@/components/label';
import { cn } from '@/lib/utils';
import Button from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface ISearchInput {
  searchValue: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  searchInputClassName: string;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  disabled: boolean;
  showMenu: boolean;
}

const SearchInput: React.FC<ISearchInput> = ({ searchValue, onSearch, searchRef, searchInputClassName, handleKeyDown, disabled, showMenu }) => (
  <input
    className={`MsiSelect-searchInput ${searchInputClassName} h-unset focus-visible:ring-none text-neutral-black m-0 bg-transparent p-0
     opacity-100 focus-visible:border-none focus-visible:outline-none ${!showMenu && 'w-0'}`}
    value={searchValue ?? ''}
    disabled={disabled}
    onChange={onSearch}
    ref={searchRef}
    style={{ width: searchValue ? `${searchValue.length + 1}ch` : '1ch' }}
    onKeyDown={handleKeyDown}
  />
);

const selectVariants = cva(
  `custom--dropdown-container border-neutral data-[disabled=true]:border-input-light data-[disabled=true]:bg-input-light data-[disabled=true]:text-neutral-grey relative flex w-full cursor-pointer 
  items-center rounded-md border text-left data-[disabled=true]:cursor-not-allowed`,
  {
    variants: {
      showMenu: {
        true: 'border-primary-focused',
        false: '',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
      },
      isMulti: {
        true: '',
        false: '',
      },
      isSearchable: {
        true: 'cursor-text',
        false: '',
      },
      error: {
        true: 'border-error focus-visible:outline-error focus-visible:shadow-none focus-visible:-outline-offset-1',
        false: '',
      },
    },
    defaultVariants: {
      showMenu: false,
      size: 'default',
    },
    compoundVariants: [
      {
        isMulti: true,
        size: 'default',
        className: 'min-h-14',
      },
      {
        isMulti: true,
        size: 'sm',
        className: 'min-h-13',
      },
      {
        isMulti: true,
        size: 'lg',
        className: 'min-h-15',
      },
      {
        isMulti: false,
        size: 'default',
        className: 'h-14',
      },
      {
        isMulti: false,
        size: 'sm',
        className: 'h-13',
      },
      {
        isMulti: false,
        size: 'lg',
        className: 'h-15',
      },
    ],
  },
);

interface ISelectOption {
  content: string | React.ReactNode;
  value: number | string | boolean;
}

interface ISelect {
  placeHolder?: string;
  size?: 'default' | 'sm' | 'lg';
  options: ISelectOption[] | ISelectOption;
  isMulti?: boolean;
  isSearchable?: boolean;
  onChange: (e: string | number | string[] | number[] | boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  defaultValue?: string | number | string[] | number[];
  completeButton?: boolean | 'mobile';
  completeButtonText?: string;
  searchInputClassName?: string;
  dropdownTriggerClassName?: string;
  dropdownTagClassName?: string;
  dropdownTagCloseButtonClassName?: string;
  className?: string;
  labelClassName?: string;
  containerClassName?: string;
  selectTextClassName?: string;
  iconClassName?: string;
  dropdownMenuClassName?: string;
  dropdownItemClassName?: string;
  completeButtonContainerClassName?: string;
  completeButtonClassName?: string;
  value?: string | number | string[] | number[] | boolean;
  id?: string;
  tooltip?: string | string[];
  showRequiredIcon?: boolean;
  dropdownAlign?: 'left' | 'right';
  noOptionsMessage?: string;
}

const Select: React.FC<ISelect> = ({
  placeHolder = '',
  label,
  size = 'default',
  value,
  disabled = false,
  error = false,
  options,
  isMulti = false,
  isSearchable = false,
  onChange = () => { },
  defaultValue,
  completeButton = false,
  completeButtonText,
  searchInputClassName = '',
  dropdownTagClassName = '',
  dropdownTagCloseButtonClassName = '',
  className = '',
  labelClassName = '',
  containerClassName = '',
  selectTextClassName = '',
  iconClassName = '',
  dropdownTriggerClassName,
  dropdownMenuClassName = '',
  dropdownItemClassName = '',
  completeButtonContainerClassName = '',
  completeButtonClassName = '',
  id,
  tooltip,
  showRequiredIcon,
  dropdownAlign,
  noOptionsMessage,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ISelectOption[] | ISelectOption | null>(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState(isSearchable ? '' : null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return Array.isArray(options) ? options.filter(
      option => typeof option.content === 'string' && option.content.toLowerCase().includes(searchValue.toLowerCase()),
    ) : [];
  };

  const optionList = Array.isArray(getOptions()) ? getOptions() : [getOptions()].flat();

  useEffect(() => {
    if (defaultValue) {
      if (isMulti && Array.isArray(defaultValue)) {
        const defaultOptions = (options as ISelectOption[]).filter(option => (defaultValue as (string | number | boolean)[]).includes(option.value));
        setSelectedValue(defaultOptions);
      } else if (!isMulti && !Array.isArray(defaultValue)) {
        const defaultOption: ISelectOption | undefined = (options as ISelectOption[]).find((option: ISelectOption) => option.value === defaultValue);
        setSelectedValue(defaultOption || null);
      }
    }
  }, [defaultValue, options, isMulti]);

  useEffect(() => {
    if (value !== null && value !== undefined) {
      if (isMulti && Array.isArray(value)) {
        const selectedOptions = (options as ISelectOption[]).filter(option => (value as (string | number | boolean)[]).includes(option.value));
        setSelectedValue(selectedOptions);
      } else if (!isMulti && !Array.isArray(value)) {
        const selectedOption = (options as ISelectOption[]).find(option => option.value === value);
        setSelectedValue(selectedOption || null);
      }
    } else {
      setSelectedValue(null);
    }
  }, [value, options, isMulti]);

  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
    document.body.style.overflow = showMenu ? 'hidden' : 'auto';
  }, [showMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target as Node)
        && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToHighlightedItem = (index: number) => {
    const dropdownMenu = dropdownRef.current;
    const highlightedItem = dropdownMenu?.children[index] as HTMLElement;
    if (highlightedItem) {
      highlightedItem.scrollIntoView({ block: 'nearest' });
    }
  };

  const removeOption = (option: ISelectOption): ISelectOption[] | null => (
    selectedValue && Array.isArray(selectedValue) ? selectedValue.filter(o => o.value !== option.value) : null
  );

  const onTagRemove = (e: React.MouseEvent, option: ISelectOption): void => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue ? newValue.map((o: any) => o.value) : []);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onItemClick = (option: ISelectOption): void => {
    let newValue: ISelectOption[] | ISelectOption | null;
    if (isMulti) {
      if (selectedValue && Array.isArray(selectedValue) && selectedValue.findIndex(o => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = selectedValue && Array.isArray(selectedValue) ? [...selectedValue, option] : [option];
      }
      setSelectedValue(newValue);
      onChange(newValue ? newValue.map((o: any) => o.value) : []);
    } else {
      newValue = option;
      setSelectedValue(newValue);
      onChange(newValue.value);
      setShowMenu(false);
    }
    if (isSearchable) {
      setSearchValue('');
      setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showMenu) return;

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex(prevIndex => {
          const newIndex = (prevIndex + 1) % (Array.isArray(optionList) ? optionList.length : 1);
          scrollToHighlightedItem(newIndex);
          return newIndex;
        });
        break;
      case 'ArrowUp':
        setHighlightedIndex(prevIndex => {
          const newIndex = (prevIndex - 1 + (Array.isArray(optionList) ? optionList.length : 0)) % (Array.isArray(optionList) ? optionList.length : 1);
          scrollToHighlightedItem(newIndex);
          return newIndex;
        });
        break;
      case 'Enter':
        if (highlightedIndex >= 0 && Array.isArray(optionList) && highlightedIndex < optionList.length) {
          onItemClick((optionList as ISelectOption[])[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowMenu(false);
        break;
      default:
        break;
    }
  };

  const getDisplay = () => {
    if (!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0)) {
      return (
        <>
          {!showMenu && <span data-disabled={disabled} className="text-neutral-grey">{placeHolder}</span>}
          {(isSearchable && showMenu) && (
            <div className="MsiSelect-searchBox flex max-w-[80%] items-center">
              <SearchInput
                disabled={disabled}
                handleKeyDown={handleKeyDown}
                onSearch={onSearch}
                searchInputClassName={searchInputClassName}
                searchRef={searchRef}
                searchValue={searchValue ?? ''}
                showMenu={showMenu}
              />
            </div>
          )}
        </>
      );
    }
    if (isMulti) {
      return (
        <div className="MsiSelect-dropdownTags flex max-w-full cursor-default flex-wrap gap-1.5">
          {Array.isArray(selectedValue) && selectedValue.map((option, index) => (
            <div
              title={option.content as string}
              key={`${option.value}-${index}`}
              data-disabled={disabled}
              className={`MsiSelect-dropdownTagItem ${dropdownTagClassName} bg-primary-15 text-primary data-[disabled=true]:bg-disabled-dark data-[disabled=true]:text-neutral-disabled-text
               group flex max-h-full items-center overflow-hidden whitespace-nowrap rounded px-1 py-0.5 text-sm font-medium`}
            >
              <span className="truncate">
                {option.content}
              </span>
              <span
                onClick={e => { if (!disabled) onTagRemove(e, option); }}
                className={`MsiSelect-dropdownTagCloseButton ${dropdownTagCloseButtonClassName} group-data-[disabled=true]:hover: hover:bg-neutral-light group-data-[disabled=false]:text-neutral-black
                 ml-1.5 flex cursor-pointer items-center rounded-full p-0.5 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:hover:bg-transparent`}
              >
                <X />
              </span>
            </div>
          ))}
          {(isSearchable && showMenu) && (
            <div className="MsiSelect-searchBox flex items-center">
              <SearchInput
                disabled={disabled}
                handleKeyDown={handleKeyDown}
                onSearch={onSearch}
                searchInputClassName={searchInputClassName}
                searchRef={searchRef}
                searchValue={searchValue ?? ''}
                showMenu={showMenu}
              />
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="flex max-w-full items-center overflow-hidden">
        <span className={`max-w-full truncate whitespace-nowrap ${(!isMulti && isSearchable && showMenu) && 'text-neutral opacity-90'}`}>{(selectedValue as ISelectOption).content}</span>
        {(isSearchable && showMenu) && (
          <div className={`MsiSelect-searchBox flex max-w-[80%] items-center ${!isMulti && 'z-2 absolute'}`}>
            <SearchInput
              disabled={disabled}
              handleKeyDown={handleKeyDown}
              onSearch={onSearch}
              searchInputClassName={searchInputClassName}
              searchRef={searchRef}
              searchValue={searchValue ?? ''}
              showMenu={showMenu}
            />
          </div>
        )}
      </div>
    );
  };
  const selectedItem = getDisplay();

  const isSelected = (option: ISelectOption): boolean => {
    if (isMulti) {
      return (selectedValue as ISelectOption[])?.some(o => o?.value === option?.value);
    }
    return selectedValue ? (selectedValue as ISelectOption)?.value === option?.value : false;
  };

  const getTextFromSelectedItem = (item: any): string => {
    if (item && item.props && item.props.children) {
      const { children } = item.props;
      if (Array.isArray(children)) {
        return children.map((child: any) => {
          if (typeof child === 'string') {
            return child;
          } if (child.props && child.props.children) {
            return getTextFromSelectedItem(child);
          }
          return '';
        }).join(' ');
      } if (typeof children === 'string') {
        return children;
      }
    }
    return '';
  };
  const textContent = getTextFromSelectedItem(selectedItem);

  return (
    <div className={`MsiSelect-root relative flex flex-col gap-1 ${className}`}>
      {label
        && (
          <Label
            className={`ease-cubic flex transition-all duration-150 ${labelClassName}`}
            htmlFor={id}
            id={`${id}-label`}
            tooltip={tooltip}
            disabled={disabled}
            showRequiredIcon={showRequiredIcon}
          >
            {label}
          </Label>
        )}
      <Popover open={showMenu} onOpenChange={setShowMenu} disabled={disabled} dropdownAlign={dropdownAlign}>
        <PopoverTrigger className={cn(selectVariants({ size, isMulti, isSearchable, error }), dropdownTriggerClassName)}>
          <div id={id} className={`MsiSelect-container ${containerClassName} flex max-h-32 min-h-full w-full select-none justify-between gap-2 overflow-y-auto px-3 py-2`}>
            <div title={textContent} className={`MsiSelect-selectText ${selectTextClassName} flex h-full max-h-full max-w-full items-center ${!isMulti && 'self-center'} truncate font-medium`}>
              {getDisplay()}
            </div>
            <div className="MsiSelect-iconContainer self-center">
              <CaretDown className={`MsiSelect-icon ${iconClassName} stroke-neutral-light-black transition-all`} />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className={`MsiSelect-dropdownMenu ${dropdownMenuClassName} bg-background shadow-soft-grey max-h-80 min-h-12 w-full max-w-full overflow-auto rounded-md`}
        >
          <div onKeyDown={handleKeyDown} ref={dropdownRef}>
            {Array.isArray(optionList) ? optionList.map((option: ISelectOption, index) => (
              <div
                onClick={() => { if (!disabled) onItemClick(option); }}
                key={option.value as number}
                className={`MsiSelect-dropdownItem ${dropdownItemClassName} text-neutral-black hover:bg-primary-5 flex cursor-pointer items-center justify-between rounded-md px-3
                  py-2 font-medium ${isSelected(option) ? 'bg-primary-5 text-primary font-semibold' : ''} 
                  ${highlightedIndex === index ? 'bg-primary-5' : ''}`}
              >
                {option.content}
                {isMulti && (
                  <span className={`mr-2 ${!isSelected(option) && 'opacity-0'}`}>
                    <Check className="MsiSelect-checkIcon text-primary size-4" />
                  </span>
                )}
              </div>
            )) : <p className="text-lg">{noOptionsMessage ?? 'No Options'}</p>}
            {completeButton && (
              <div className={`MsiSelect-completeButtonContainer ${completeButtonContainerClassName} bg-background sticky bottom-0 px-1 pb-1`}>
                <Button size={size} className={`MsiSelect-completeButton ${completeButtonClassName} w-full`} onClick={() => setShowMenu(false)}>
                  {completeButtonText ?? 'Complete Selection'}
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Select;
