/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import * as React from 'react';

import { format, Locale, parse } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { CalendarBlankIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import Button from '@/components/button';
import Calendar from '@/components/Calendar-1';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import Label from './label';

interface IDateInput {
  ref: React.RefObject<HTMLInputElement | null>;
  value: string;
  max?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder: string;
  disabled: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style: React.CSSProperties;
}

interface IDatePicker {
  id: string;
  onChange: (date: Date | null | { from: Date | null | undefined, to: Date | null | undefined }) => void;
  value?: Date;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  maxDate?: Date;
  minDate?: Date;
  label?: string;
  labelClassName?: string;
  dropdownMenuClassName?: string;
  showRequiredIcon?: boolean;
  tooltip?: string | string[];
  dropdownAlign?: 'left' | 'right';
  mode?: 'single' | 'range';
  locale?: Locale;
}

interface ISelectedDate {
  from: Date | undefined;
  to: Date | undefined;
}

const DateInput: React.FC<IDateInput> = ({ ref, value, max, onChange, onBlur, placeholder, disabled, onKeyDown, style }) => (
  <input
    ref={ref}
    type="number"
    max={max}
    value={value}
    className="placeholder:text-xs focus-visible:outline-none"
    onChange={onChange}
    onBlur={onBlur ?? undefined}
    placeholder={placeholder}
    disabled={disabled}
    onKeyDown={onKeyDown}
    style={style}
    inputMode="numeric"
    pattern="[0-9]*"
  />
);

const DatePicker: React.FC<IDatePicker> = ({
  id,
  label,
  labelClassName = '',
  onChange,
  className = '',
  value = null,
  placeholder = '',
  disabled = false,
  error = false,
  maxDate = new Date('2100-01-01'),
  minDate = new Date('1900-01-01'),
  dropdownMenuClassName = '',
  showRequiredIcon = false,
  tooltip,
  dropdownAlign,
  mode = 'single',
  locale,
}) => {
  const singleDayRef = React.useRef<HTMLInputElement | null>(null);
  const singleMonthRef = React.useRef<HTMLInputElement | null>(null);
  const singleYearRef = React.useRef<HTMLInputElement | null>(null);
  const rangeDayRef1 = React.useRef<HTMLInputElement | null>(null);
  const rangeMonthRef1 = React.useRef<HTMLInputElement | null>(null);
  const rangeYearRef1 = React.useRef<HTMLInputElement | null>(null);
  const rangeDayRef2 = React.useRef<HTMLInputElement | null>(null);
  const rangeMonthRef2 = React.useRef<HTMLInputElement | null>(null);
  const rangeYearRef2 = React.useRef<HTMLInputElement | null>(null);
  const [popoverOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(value);
  const [selectedRange, setSelectedRange] = React.useState<ISelectedDate>({ from: undefined, to: undefined });
  const [day, setDay] = React.useState<string>(value ? format(value, 'dd') : '');
  const [month, setMonth] = React.useState<string>(value ? format(value, 'MM') : '');
  const [year, setYear] = React.useState<string>(value ? format(value, 'yyyy') : '');
  const [startDay, setStartDay] = React.useState<string>(selectedRange.from ? format(selectedRange.from, 'dd') : '');
  const [startMonth, setStartMonth] = React.useState<string>(selectedRange.from ? format(selectedRange.from, 'MM') : '');
  const [startYear, setStartYear] = React.useState<string>(selectedRange.from ? format(selectedRange.from, 'yyyy') : '');
  const [endDay, setEndDay] = React.useState<string>(selectedRange.to ? format(selectedRange.to, 'dd') : '');
  const [endMonth, setEndMonth] = React.useState<string>(selectedRange.to ? format(selectedRange.to, 'MM') : '');
  const [endYear, setEndYear] = React.useState<string>(selectedRange.to ? format(selectedRange.to, 'yyyy') : '');
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  const isValidDate = (localDay: string, localMonth: string, localYear: string) => {
    const date = parse(`${localDay}/${localMonth}/${localYear}`, 'dd/MM/yyyy', new Date());
    if (Number.isNaN(date.getTime())) return false;
    if (minDate && date < parse(format(minDate, 'dd/MM/yyyy'), 'dd/MM/yyyy', new Date())) return false;
    if (maxDate && date > parse(format(maxDate, 'dd/MM/yyyy'), 'dd/MM/yyyy', new Date())) return false;
    return true;
  };

  const updateDate = (localDay: string, localMonth: string, localYear: string, isStart: boolean) => {
    if (localDay.length === 2 && (localMonth.length === 1 || localMonth.length === 2) && localYear.length === 4) {
      const newDate = parse(`${localDay}/${localMonth}/${localYear}`, 'dd/MM/yyyy', new Date());
      if (!Number.isNaN(newDate.getTime()) && isValidDate(localDay, localMonth, localYear)) {
        if (mode === 'single') {
          setSelectedDate(newDate);
          onChange(newDate);
        } else if (mode === 'range') {
          if (isStart) {
            if (selectedRange.to && newDate > selectedRange.to) {
              // If start date is later than end date, swap them
              setSelectedRange({ from: selectedRange.to, to: newDate });
              setStartDay(format(selectedRange.to, 'dd'));
              setStartMonth(format(selectedRange.to, 'MM'));
              setStartYear(format(selectedRange.to, 'yyyy'));
              setEndDay(localDay);
              setEndMonth(localMonth);
              setEndYear(localYear);
              onChange({ from: selectedRange.to, to: newDate });
            } else {
              setSelectedRange(prev => ({ ...prev, from: newDate }));
              onChange({ from: newDate, to: selectedRange.to });
            }
          } else if (selectedRange.from && newDate < selectedRange.from) {
            // If end date is earlier than start date, swap them
            setSelectedRange({ from: newDate, to: selectedRange.from });
            setStartDay(localDay);
            setStartMonth(localMonth);
            setStartYear(localYear);
            setEndDay(format(selectedRange.from, 'dd'));
            setEndMonth(format(selectedRange.from, 'MM'));
            setEndYear(format(selectedRange.from, 'yyyy'));
            onChange({ from: newDate, to: selectedRange.from });
          } else {
            setSelectedRange(prev => ({ ...prev, to: newDate }));
            onChange({ from: selectedRange.from, to: newDate });
          }
        }
      } else if (mode === 'single') {
        setSelectedDate(null);
        onChange(null);
      } else if (mode === 'range') {
        if (isStart) {
          setSelectedRange(prev => ({ ...prev, from: undefined }));
          onChange({ from: undefined, to: selectedRange.to });
        } else {
          setSelectedRange(prev => ({ ...prev, to: undefined }));
          onChange({ from: selectedRange.from, to: undefined });
        }
      }
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newDay = e.target.value.replace(/\D/g, '');
    if (parseInt(newDay, 10) > 31) {
      newDay = '31';
    }
    if (newDay.length <= 2) {
      setDay(newDay);
      if (isValidDate(newDay, month, year)) {
        updateDate(newDay, month, year, true);
      }
    }
  };

  const handleDayBlur = () => {
    if (day.length === 1 && day !== '0') {
      const newDay = `0${day}`;
      setDay(newDay);
      updateDate(newDay, month, year, true);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMonth = e.target.value.replace(/\D/g, '');
    if (parseInt(newMonth, 10) > 12) {
      newMonth = '12';
    }
    if (newMonth.length <= 2) {
      setMonth(newMonth);
      if (isValidDate(day, newMonth, year)) {
        updateDate(day, newMonth, year, true);
      }
    }
  };

  const handleMonthBlur = () => {
    if (month.length === 1 && month !== '0') {
      const newMonth = `0${month}`;
      setMonth(newMonth);
      updateDate(day, newMonth, year, true);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value.replace(/\D/g, '');
    if (newYear.length <= 4) {
      setYear(newYear);
      if (isValidDate(day, month, newYear)) {
        updateDate(day, month, newYear, true);
      }
    }
  };

  const handleStartDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newDay = e.target.value.replace(/\D/g, '');
    if (parseInt(newDay, 10) > 31) {
      newDay = '31';
    }
    if (newDay.length <= 2) {
      setStartDay(newDay);
      if (isValidDate(newDay, startMonth, startYear)) {
        updateDate(newDay, startMonth, startYear, true);
      }
    }
  };

  const handleStartMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMonth = e.target.value.replace(/\D/g, '');
    if (parseInt(newMonth, 10) > 12) {
      newMonth = '12';
    }
    if (newMonth.length <= 2) {
      setStartMonth(newMonth);
      if (isValidDate(startDay, newMonth, startYear)) {
        updateDate(startDay, newMonth, startYear, true);
      }
    }
  };

  const handleStartYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value.replace(/\D/g, '');
    if (newYear.length <= 4) {
      setStartYear(newYear);
      if (isValidDate(startDay, startMonth, newYear)) {
        updateDate(startDay, startMonth, newYear, true);
      }
    }
  };

  const handleEndDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newDay = e.target.value.replace(/\D/g, '');
    if (parseInt(newDay, 10) > 31) {
      newDay = '31';
    }
    if (newDay.length <= 2) {
      setEndDay(newDay);
      if (isValidDate(newDay, endMonth, endYear)) {
        updateDate(newDay, endMonth, endYear, false);
      }
    }
  };

  const handleEndMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMonth = e.target.value.replace(/\D/g, '');
    if (parseInt(newMonth, 10) > 12) {
      newMonth = '12';
    }
    if (newMonth.length <= 2) {
      setEndMonth(newMonth);
      if (isValidDate(endDay, newMonth, endYear)) {
        updateDate(endDay, newMonth, endYear, false);
      }
    }
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value.replace(/\D/g, '');
    if (newYear.length <= 4) {
      setEndYear(newYear);
      if (isValidDate(endDay, endMonth, newYear)) {
        updateDate(endDay, endMonth, newYear, false);
      }
    }
  };

  const handleCalendarSelect = (date: Date | DateRange | undefined, isMonth: boolean) => {
    if (!disabled) {
      if (mode === 'single') {
        if (date && !Number.isNaN((date as Date).getTime())) {
          const selected = date as Date;
          setSelectedDate(selected);
          onChange(selected);
          if (!isMonth) setPopoverOpen(false);
          setDay(format(selected, 'dd'));
          setMonth(format(selected, 'MM'));
          setYear(format(selected, 'yyyy'));
        } else {
          setSelectedDate(null);
          onChange(null);
          setDay('');
          setMonth('');
          setYear('');
        }
      } else if (mode === 'range') {
        const range = date as { from: Date | undefined; to: Date | undefined };
        if (isMonth) {
          const newMonth = date as Date;
          setCurrentMonth(newMonth);
          return;
        }

        if (range.from && !Number.isNaN(range.from.getTime())) {
          setSelectedRange(prev => ({ ...prev, from: range.from }));
          setStartDay(format(range.from, 'dd'));
          setStartMonth(format(range.from, 'MM'));
          setStartYear(format(range.from, 'yyyy'));
          if (range.to && !Number.isNaN(range.to.getTime())) {
            setSelectedRange(prev => ({ ...prev, to: range.to }));
            setEndDay(format(range.to, 'dd'));
            setEndMonth(format(range.to, 'MM'));
            setEndYear(format(range.to, 'yyyy'));
            onChange(range);
            // if (!isMonth) setPopoverOpen(false);
          } else {
            onChange({ from: range.from, to: undefined });
          }
        } else {
          setSelectedRange({ from: undefined, to: undefined });
          onChange(null);
          setStartDay('');
          setStartMonth('');
          setStartYear('');
          setEndDay('');
          setEndMonth('');
          setEndYear('');
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextRef: React.RefObject<HTMLInputElement | null>, prevRef?: React.RefObject<HTMLInputElement | null>) => {
    if (e.key === 'ArrowRight' || e.key === 'Tab') {
      e.preventDefault();
      nextRef.current?.focus();
      nextRef.current?.select();
    } else if (e.key === 'ArrowLeft' && prevRef) {
      e.preventDefault();
      prevRef.current?.focus();
      prevRef.current?.select();
    } else if (e.key === 'Escape') {
      e.currentTarget.blur();
    } else if (e.key === 'Enter') {
      e.currentTarget.blur();
      setPopoverOpen(false);
    }
  };

  const handlePopoverOpenChange = (open: boolean) => {
    setPopoverOpen(open);
    if (open) {
      setTimeout(() => {
        if (mode === 'single') {
          singleDayRef.current?.focus();
          singleDayRef.current?.select();
        } else {
          rangeDayRef1.current?.focus();
          rangeDayRef1.current?.select();
        }
      }, 0);
    }
  };

  const getInputWidth = (localValue: string | number, localPlaceholder: string) => {
    const length = localValue.toString().length || localPlaceholder.length + 1;
    return `${length}ch`; // Adding extra space for padding
  };

  const getDisplay = () => {
    if (popoverOpen) {
      if (mode === 'single') {
        return (
          <div className="[&>input]:text-neutral-black flex [&>input]:appearance-none [&>input]:rounded [&>input]:bg-transparent [&>input]:p-0 [&>input]:focus-visible:border-none">
            <DateInput
              ref={singleDayRef}
              value={day}
              max={31}
              onChange={handleDayChange}
              onBlur={handleDayBlur}
              placeholder="DD"
              disabled={disabled}
              onKeyDown={e => handleKeyDown(e, singleMonthRef)}
              style={{ width: getInputWidth(day, 'DD') }}
            />
            /
            <DateInput
              ref={singleMonthRef}
              value={month}
              max={12}
              onChange={handleMonthChange}
              onBlur={handleMonthBlur}
              placeholder="MM"
              disabled={disabled}
              onKeyDown={e => handleKeyDown(e, singleYearRef, singleDayRef)}
              style={{ width: getInputWidth(month, 'MM') }}
            />
            /
            <DateInput
              ref={singleYearRef}
              value={year}
              onChange={handleYearChange}
              placeholder="YYYY"
              disabled={disabled}
              onKeyDown={e => handleKeyDown(e, singleDayRef, singleMonthRef)}
              style={{ width: getInputWidth(year, 'YYYY') }}
            />
          </div>
        );
      }
      if (mode === 'range') {
        return (
          <div className="flex gap-4">
            <div className="[&>input]:text-neutral-black flex [&>input]:appearance-none [&>input]:rounded [&>input]:bg-transparent [&>input]:p-0 [&>input]:focus-visible:border-none">
              <DateInput
                ref={rangeDayRef1}
                value={startDay}
                max={31}
                onChange={handleStartDayChange}
                onBlur={handleDayBlur}
                placeholder="DD"
                disabled={disabled}
                onKeyDown={e => handleKeyDown(e, rangeMonthRef1)}
                style={{ width: getInputWidth(startDay, 'DD') }}
              />
              /
              <DateInput
                ref={rangeMonthRef1}
                value={startMonth}
                max={12}
                onChange={handleStartMonthChange}
                onBlur={handleMonthBlur}
                placeholder="MM"
                disabled={disabled}
                onKeyDown={e => handleKeyDown(e, rangeYearRef1, rangeDayRef1)}
                style={{ width: getInputWidth(startMonth, 'MM') }}
              />
              /
              <DateInput
                ref={rangeYearRef1}
                value={startYear}
                onChange={handleStartYearChange}
                placeholder="YYYYY"
                disabled={disabled}
                onKeyDown={e => handleKeyDown(e, rangeDayRef2, rangeMonthRef1)}
                style={{ width: getInputWidth(startYear, 'YYYY') }}
              />
            </div>
            -
            <div className="[&>input]:text-neutral-black flex [&>input]:appearance-none [&>input]:rounded [&>input]:bg-transparent [&>input]:p-0 [&>input]:focus-visible:border-none">
              <DateInput
                ref={rangeDayRef2}
                value={endDay}
                max={31}
                onChange={handleEndDayChange}
                onBlur={handleDayBlur}
                placeholder="DD"
                disabled={disabled}
                onKeyDown={e => handleKeyDown(e, rangeMonthRef2)}
                style={{ width: getInputWidth(endDay, 'DD') }}
              />
              /
              <DateInput
                ref={rangeMonthRef2}
                value={endMonth}
                max={12}
                onChange={handleEndMonthChange}
                onBlur={handleMonthBlur}
                placeholder="MM"
                disabled={disabled}
                onKeyDown={e => handleKeyDown(e, rangeYearRef2, rangeDayRef2)}
                style={{ width: getInputWidth(endMonth, 'MM') }}
              />
              /
              <DateInput
                ref={rangeYearRef2}
                value={endYear}
                max={12}
                onChange={handleEndYearChange}
                placeholder="YYYY"
                disabled={disabled}
                onKeyDown={e => handleKeyDown(e, rangeDayRef1, rangeMonthRef2)}
                style={{ width: getInputWidth(endYear, 'YYYY') }}
              />
            </div>
          </div>
        );
      }
    }
    if (selectedDate && mode === 'single') {
      return format(selectedDate, 'dd/MM/yyyy');
    }
    if (selectedRange && mode === 'range') {
      return `${selectedRange.from ? format(selectedRange.from, 'dd/MM/yyyy') : 'DD/MM/YYYY'} - ${selectedRange.to ? format(selectedRange.to, 'dd/MM/yyyy') : 'DD/MM/YYYY'}`;
    }
    return <span className="text-neutral-grey dark:text-input text-base">{placeholder}</span>;
  };

  return (
    <div className={`MsiDatePicker-root relative ${className}`}>
      {label
        && (
          <Label
            className={`ease-cubic mb-1 flex transition-all duration-150 ${labelClassName}`}
            htmlFor={id}
            id={`${id}-label`}
            tooltip={tooltip}
            disabled={disabled}
            showRequiredIcon={showRequiredIcon}
          >
            {label}
          </Label>
        )}
      <Popover open={popoverOpen} onOpenChange={handlePopoverOpenChange} disabled={disabled} dropdownAlign={dropdownAlign}>
        <PopoverTrigger>
          <Button
            variant="outlined"
            size="icon"
            type="button"
            disableEffect
            disabled={disabled}
            data-error={error}
            className={cn(
              `w-full ${className ?? ''} pl-4 data-[error=true]:!border-error disabled:bg-input-light text-neutral-black justify-start
              text-left font-normal h-14 border data-[state=closed]:border-input bg-input-fill data-[state=open]:!border-primary-focused 
              data-[state=open]:shadow-input-focus data-[state=open]:outline-none`,
            )}
            onClick={() => setPopoverOpen(true)}
          >
            <div className="flex w-full items-center justify-between">
              {getDisplay()}
              <CalendarBlankIcon className="mx-2 size-5" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`MsiDatePicker-dropdownMenu ${dropdownMenuClassName} bg-background shadow-soft-grey !max-h-[unset] min-h-12 w-full max-w-fit overflow-auto rounded-md`}
        >
          <Calendar
            id={id}
            locale={locale}
            className="bg-background"
            {...(mode === 'single'
              ? { mode: 'single', selected: selectedDate ?? undefined }
              : { mode: 'range', selected: selectedRange })}
            onSelect={(e: Date | DateRange | undefined) => handleCalendarSelect(e, false)}
            onMonthChange={e => handleCalendarSelect(e, true)}
            disabled={{ after: maxDate, before: minDate }}
            month={mode === 'single' ? (selectedDate ?? new Date()) : currentMonth}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
