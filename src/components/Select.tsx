/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { CaretDown, Check, X } from '@/assets/Icons';
import Label from '@/components/Label';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React, { useEffect, useRef, useState } from 'react';
import { ISelect, ISelectOption } from '@/types/types';
import Button from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const selectVariants = cva(
  `custom--dropdown-container relative flex w-full cursor-pointer items-center rounded-md border border-tra-neutral 
  text-left data-[disabled=true]:cursor-not-allowed data-[disabled=true]:border-tra-input-light data-[disabled=true]:bg-tra-input-light data-[disabled=true]:text-tra-neutral-grey`,
  {
    variants: {
      showMenu: {
        true: 'border-tra-primary-focused',
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
        true: 'border-error focus-visible:shadow-none focus-visible:-outline-offset-1 focus-visible:outline-error',
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
  dropdownMenuClassName = '',
  dropdownItemClassName = '',
  completeButtonContainerClassName = '',
  completeButtonClassName = '',
  id,
  tooltip,
  showRequiredIcon,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<ISelectOption[] | ISelectOption | null>(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState(isSearchable ? '' : null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const [dropdownStyles, setDropdownStyles] = useState({});

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
    if (value) {
      if (isMulti && Array.isArray(value)) {
        const selectedOptions = (options as ISelectOption[]).filter(option => (value as (string | number | boolean)[]).includes(option.value));
        setSelectedValue(selectedOptions);
      } else if (!isMulti && !Array.isArray(value)) {
        const selectedOption = (options as ISelectOption[]).find(option => option.value === value);
        setSelectedValue(selectedOption || null);
      }
    }
  }, [value, options, isMulti]);

  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
    document.body.style.overflow = showMenu ? 'hidden' : 'auto';
  }, [showMenu]);

  const calculateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropdownPosition(spaceBelow > spaceAbove ? 'bottom' : 'top');
      setDropdownStyles({
        top: spaceBelow > spaceAbove ? `${rect.bottom}px` : 'auto',
        bottom: spaceBelow <= spaceAbove ? `${window.innerHeight - rect.top}px` : 'auto',
        left: `${rect.left}px`,
        width: `${rect.width}px`,
      });
    }
  };

  useEffect(() => {
    const handleResizeOrScroll = () => {
      if (showMenu) {
        calculateDropdownPosition();
      }
    };

    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll, true);
    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll, true);
    };
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

  useEffect(() => {
    if (showMenu) {
      calculateDropdownPosition();
    }
  }, [showMenu, selectedValue]);

  // const handleInputClick = () => {
  //   setShowMenu(!showMenu);
  //   if (isSearchable && searchRef.current) {
  //     searchRef.current.focus();
  //   } else if (dropdownRef.current) {
  //     dropdownRef.current.focus();
  //   }
  // };

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
          {!showMenu && <span data-disabled={disabled} className="data-[disabled=true]:text-tra-neutral-grey">{placeHolder}</span>}
          {isSearchable && (
            <div className="MsiSelect-searchBox flex max-w-[80%] items-center">
              <input
                className={`MsiSelectSearchInput ${searchInputClassName} h-unset focus-visible:ring-none m-0 bg-transparent p-0 font-medium 
                  text-tra-neutral-black focus-visible:border-none focus-visible:outline-none ${!showMenu && 'w-0'}`}
                value={searchValue ?? ''}
                disabled={disabled}
                onChange={onSearch}
                ref={searchRef}
                style={{ width: searchValue ? `${searchValue.length + 1}ch` : '1ch' }}
                onKeyDown={handleKeyDown}
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
              className={`MsiSelect-dropdownTagItem ${dropdownTagClassName} group flex max-h-full items-center overflow-hidden whitespace-nowrap rounded bg-tra-primary-15
               px-1 py-0.5 text-sm font-medium text-tra-primary data-[disabled=true]:bg-tra-disabled-dark data-[disabled=true]:text-tra-neutral-disabled-text`}
            >
              <span className="truncate">
                {option.content}
              </span>
              <span
                onClick={e => { if (!disabled)onTagRemove(e, option); }}
                className={`MsiSelect-dropdownTagCloseButton ${dropdownTagCloseButtonClassName} group-data-[disabled=true]:hover: ml-1.5 flex cursor-pointer items-center rounded-full p-0.5 
                hover:bg-tra-neutral-light group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=false]:text-tra-neutral-black group-data-[disabled=true]:hover:bg-transparent`}
              >
                <X />
              </span>
            </div>
          ))}
          {(isSearchable && showMenu) && (
            <div className="MsiSelect-searchBox flex items-center">
              <input
                className={`MsiSelect-searchInput ${searchInputClassName} h-unset m-0 bg-transparent p-0 text-tra-neutral-black 
                focus-visible:border-none focus-visible:outline-none ${!showMenu && 'w-0'}`}
                value={searchValue ?? ''}
                onChange={onSearch}
                ref={searchRef}
                style={{ width: searchValue ? `${searchValue.length + 1}ch` : '1ch' }}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="flex max-w-full items-center overflow-hidden">
        <span className={`max-w-full truncate whitespace-nowrap ${(!isMulti && isSearchable && showMenu) && 'text-tra-neutral opacity-90'}`}>{(selectedValue as ISelectOption).content}</span>
        {(isSearchable && showMenu) && (
          <div className={`MsiSelect-searchBox flex max-w-[80%] items-center ${!isMulti && 'absolute z-2'}`}>
            <input
              className={`MsiSelect-searchInput ${searchInputClassName} h-unset focus-visible:ring-none m-0 bg-transparent p-0 text-tra-neutral-black
                 opacity-100 focus-visible:border-none focus-visible:outline-none ${!showMenu && 'w-0'}`}
              value={searchValue ?? ''}
              onChange={onSearch}
              ref={searchRef}
              style={{ width: searchValue ? `${searchValue.length + 1}ch` : '1ch' }}
              onKeyDown={handleKeyDown}
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
        className={`flex transition-all duration-150 ease-cubic ${labelClassName}`}
        htmlFor={id}
        id={`${id}-label`}
        tooltip={tooltip}
        disabled={disabled}
        showRequiredIcon={showRequiredIcon}
      >
        {label}
      </Label>
      )}
      <Popover open={showMenu} onOpenChange={setShowMenu} disabled={disabled}>
        <PopoverTrigger className={cn(selectVariants({ size, isMulti, isSearchable, error }))}>
          <div id={id} className={`MsiSelect-container ${containerClassName} flex max-h-32 min-h-full w-full select-none justify-between gap-2 overflow-y-auto px-3 py-2`}>
            <div title={textContent} className={`MsiSelect-selectText ${selectTextClassName} flex h-full max-h-full max-w-full items-center ${!isMulti && 'self-center'} truncate font-medium`}>
              {getDisplay()}
            </div>
            <div className="MsiSelect-iconContainer self-center">
              <CaretDown className={`MsiSelect-icon ${iconClassName} stroke-tra-neutral-light-black transition-all`} />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className={`MsiSelect-dropdownMenu ${dropdownMenuClassName} max-h-80 min-h-12 w-full overflow-auto rounded-md bg-tra-background shadow-soft-grey`}
        >
          <div onKeyDown={handleKeyDown} ref={dropdownRef}>
            {Array.isArray(optionList) && optionList.map((option: ISelectOption, index) => (
              <div
                onClick={() => { if (!disabled) onItemClick(option); }}
                key={option.value as number}
                className={`MsiSelect-dropdownItem ${dropdownItemClassName} flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium
                  text-tra-neutral-black hover:bg-tra-primary-5 ${isSelected(option) ? 'bg-tra-primary-5 font-semibold text-tra-primary' : ''} 
                  ${highlightedIndex === index ? 'bg-tra-primary-5' : ''}`}
              >
                {/* {option.common?.status !== undefined && (option.common?.status
                  ? (
                    <div className="flex flex-col items-center justify-center px-2">
                      <SealCheck className="size-5 text-success" />
                      <p className="text-sm text-success">Active</p>
                    </div>
                  )
                  : (
                    <div className="flex flex-col items-center justify-center px-2">
                      <SealWarning className="size-5 text-error" />
                      <p className="text-sm text-error">Passive</p>
                    </div>
                  )
                )} */}
                {option.content}
                {isMulti && (
                  <span className={`mr-2 ${!isSelected(option) && 'opacity-0'}`}>
                    <Check className="MsiSelect-checkIcon size-4 text-tra-primary" />
                  </span>
                )}
              </div>
            ))}
            {completeButton && (
              <div className={`MsiSelect-completeButtonContainer ${completeButtonContainerClassName} sticky bottom-0 bg-tra-background px-1 pb-1`}>
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
