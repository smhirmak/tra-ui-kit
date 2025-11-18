/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { CaretDown, Check } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from './Popover-1';

interface IDropdownItem {
    label: string | React.ReactNode;
    value: string | number | boolean;
    disabled?: boolean;
}

interface IDropdownProps {
    label?: string;
    options: IDropdownItem[];
    value?: string | number | boolean;
    defaultValue?: string | number | boolean;
    onChange?: (value: string | number | boolean) => void;
    disabled?: boolean;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
    itemClassName?: string;
    placeholder?: string;
    dropdownAlign?: 'left' | 'right';
    id?: string;
}

const Dropdown: React.FC<IDropdownProps> = ({
    label,
    options,
    value,
    defaultValue,
    onChange,
    disabled = false,
    className = '',
    triggerClassName = '',
    contentClassName = '',
    itemClassName = '',
    placeholder = 'Select...',
    dropdownAlign = 'left',
    id,
}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<IDropdownItem | null>(null);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (defaultValue !== undefined) {
            const def = options.find(o => o.value === defaultValue) || null;
            setSelected(def);
        }
    }, [defaultValue, options]);

    useEffect(() => {
        if (value !== undefined) {
            const val = options.find(o => o.value === value) || null;
            setSelected(val);
        }
    }, [value, options]);

    useEffect(() => {
        if (!open) {
            setHighlightedIndex(-1);
        }
    }, [open]);

    const onItemSelect = (item: IDropdownItem) => {
        if (item.disabled) return;
        setSelected(item);
        onChange?.(item.value);
        setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!open) return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => {
                    const next = Math.min(prev + 1, options.length - 1);
                    scrollIntoView(next);
                    return next;
                });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => {
                    const next = Math.max(prev - 1, 0);
                    scrollIntoView(next);
                    return next;
                });
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < options.length) {
                    onItemSelect(options[highlightedIndex]);
                }
                break;
            case 'Escape':
                setOpen(false);
                break;
            default:
                break;
        }
    };

    const scrollIntoView = (index: number) => {
        const node = listRef.current?.children[index] as HTMLElement | undefined;
        if (node) node.scrollIntoView({ block: 'nearest' });
    };

    return (
        <Popover open={open} onOpenChange={setOpen} disabled={disabled} dropdownAlign={dropdownAlign}>
            <div className={cn('MsiDropdown relative', className)} id={id}>
                {label && <div className="mb-2 text-sm font-medium text-neutral">{label}</div>}
                <PopoverTrigger className={cn('w-full', triggerClassName)}>
                    <div
                        className={cn(
                            'flex w-full items-center justify-between rounded-md border px-4 py-3 text-left',
                            disabled ? 'border-input-light bg-input-light text-neutral-disabled-text cursor-not-allowed' : 'border-neutral',
                        )}
                        data-disabled={disabled}
                    >
                        <div className="truncate">
                            {selected ? selected.label : <span className="text-neutral-grey">{placeholder}</span>}
                        </div>
                        <div className="ml-4 flex items-center">
                            <CaretDown />
                        </div>
                    </div>
                </PopoverTrigger>

                <PopoverContent className={cn('rounded-md border bg-white shadow-md overflow-auto', contentClassName)}>
                    <div
                        ref={listRef}
                        role="listbox"
                        tabIndex={0}
                        onKeyDown={handleKeyDown}
                        className="max-h-80 w-full"
                    >
                        {options.map((opt, idx) => (
                            <div
                                key={`${String(opt.value)}-${idx}`}
                                role="option"
                                aria-selected={selected?.value === opt.value}
                                data-disabled={opt.disabled}
                                onClick={() => onItemSelect(opt)}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                                className={cn(
                                    'flex items-center justify-between px-4 py-2 text-sm cursor-pointer',
                                    highlightedIndex === idx && 'bg-neutral-100',
                                    opt.disabled && 'opacity-50 cursor-not-allowed',
                                    itemClassName,
                                )}
                            >
                                <div className="truncate">{opt.label}</div>
                                {selected?.value === opt.value && (
                                    <Check className="ml-2" />
                                )}
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </div>
        </Popover>
    );
};

export default Dropdown;