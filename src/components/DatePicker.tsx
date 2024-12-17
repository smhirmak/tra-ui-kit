/* eslint-disable no-nested-ternary */
import * as React from 'react';

import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import { CalendarBlank } from '@/assets/Icons';
import { Calendar } from '@/components/ui/calendar';
import { format, parse } from 'date-fns';
import { IDatePicker } from '@/types/types';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import Label from './Label';

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
}) => {
  const dayRef = React.useRef<HTMLInputElement | null>(null);
  const monthRef = React.useRef<HTMLInputElement | null>(null);
  const yearRef = React.useRef<HTMLInputElement | null>(null);
  const [popoverOpen, setPopoverOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(value);
  const [day, setDay] = React.useState<string>(value ? format(value, 'dd') : '');
  const [month, setMonth] = React.useState<string>(value ? format(value, 'MM') : '');
  const [year, setYear] = React.useState<string>(value ? format(value, 'yyyy') : '');

  const isValidDate = (localDay: string, localMonth: string, localYear: string) => {
    const date = parse(`${localDay}/${localMonth}/${localYear}`, 'dd/MM/yyyy', new Date());
    if (Number.isNaN(date.getTime())) return false;
    if (minDate && date < parse(format(minDate, 'dd/MM/yyyy'), 'dd/MM/yyyy', new Date())) return false;
    if (maxDate && date > parse(format(maxDate, 'dd/MM/yyyy'), 'dd/MM/yyyy', new Date())) return false;
    return true;
  };

  const updateDate = (localDay: string, localMonth: string, localYear: string) => {
    if (localDay.length === 2 && (localMonth.length === 1 || localMonth.length === 2) && localYear.length === 4) {
      const newDate = parse(`${localDay}/${localMonth}/${localYear}`, 'dd/MM/yyyy', new Date());
      if (!Number.isNaN(newDate.getTime()) && isValidDate(localDay, localMonth, localYear)) {
        setSelectedDate(newDate);
        onChange(newDate);
      } else {
        setSelectedDate(null);
        onChange(null);
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
        updateDate(newDay, month, year);
      }
    }
  };

  const handleDayBlur = () => {
    if (day.length === 1 && day !== '0') {
      const newDay = `0${day}`;
      setDay(newDay);
      updateDate(newDay, month, year);
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
        updateDate(day, newMonth, year);
      }
    }
  };

  const handleMonthBlur = () => {
    if (month.length === 1 && month !== '0') {
      const newMonth = `0${month}`;
      setMonth(newMonth);
      updateDate(day, newMonth, year);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = e.target.value.replace(/\D/g, '');
    if (newYear.length <= 4) {
      setYear(newYear);
      if (isValidDate(day, month, newYear)) {
        updateDate(day, month, newYear);
      }
    }
  };

  const handleCalendarSelect = (date: Date | undefined, isMonth: boolean) => {
    if (!disabled) {
      setSelectedDate(date ?? null);
      onChange(date ?? null);
      if (!isMonth) setPopoverOpen(false);
      if (date) {
        setDay(format(date, 'dd'));
        setMonth(format(date, 'MM'));
        setYear(format(date, 'yyyy'));
      } else {
        setDay('');
        setMonth('');
        setYear('');
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
        dayRef.current?.focus();
        dayRef.current?.select();
      }, 0);
    }
  };

  const getInputWidth = (localValue: string | number, localPlaceholder: string) => {
    const length = localValue.toString().length || localPlaceholder.length + 1;
    return `${length}ch`; // Adding extra space for padding
  };

  return (
    <div className={`MsiDatePicker-root relative ${className}`}>
      {label
      && (
      <Label
        className={`mb-1 flex transition-all duration-150 ease-cubic ${labelClassName}`}
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
            disabled={disabled}
            data-error={error}
            className={cn(
              `w-full ${className ?? ''} pl-4 data-[error=true]:!border-error disabled:bg-tra-input-light text-tra-neutral-black justify-start
              text-left font-normal h-14 border data-[state=closed]:border-tra-input bg-tra-input-fill data-[state=open]:!border-tra-primary-focused 
              data-[state=open]:shadow-input-focus data-[state=open]:outline-none`,
            )}
            onClick={() => setPopoverOpen(true)}
          >
            <div className="flex w-full items-center justify-between">
              {popoverOpen
                ? (
                  <div className="flex [&>input]:appearance-none [&>input]:rounded [&>input]:bg-transparent [&>input]:p-0 [&>input]:text-tra-neutral-black [&>input]:focus-visible:border-none">
                    <input
                      ref={dayRef}
                      type="number"
                      value={day}
                      max={31}
                      className="text-end placeholder:text-xs focus-visible:outline-none"
                      onChange={handleDayChange}
                      onBlur={handleDayBlur}
                      placeholder="DD"
                      disabled={disabled}
                      onKeyDown={e => handleKeyDown(e, monthRef)}
                      style={{ width: getInputWidth(day, 'DD') }}
                    />
                    /
                    <input
                      ref={monthRef}
                      type="number"
                      value={month}
                      max={12}
                      className="text-end placeholder:text-xs focus-visible:outline-none"
                      onChange={handleMonthChange}
                      onBlur={handleMonthBlur}
                      placeholder="MM"
                      disabled={disabled}
                      onKeyDown={e => handleKeyDown(e, yearRef, dayRef)}
                      style={{ width: getInputWidth(month, 'MM') }}
                    />
                    /
                    <input
                      ref={yearRef}
                      type="number"
                      value={year}
                      className="placeholder:text-xs focus-visible:outline-none"
                      onChange={handleYearChange}
                      placeholder="YYYY"
                      disabled={disabled}
                      onKeyDown={e => handleKeyDown(e, dayRef, monthRef)}
                      style={{ width: getInputWidth(year, 'YYYY') }} // Dynamically set width
                    />
                  </div>
                )
                : selectedDate
                  ? format(selectedDate, 'dd/MM/yyyy')
                  : <span className="text-base text-tra-neutral-grey dark:text-tra-input">{placeholder}</span>}
              <CalendarBlank className="mx-2 size-5" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`MsiDatePicker-dropdownMenu ${dropdownMenuClassName} max-h-80 min-h-12 w-full max-w-fit overflow-auto rounded-md bg-tra-background shadow-soft-grey`}
        >
          <Calendar
            id={id}
            className="bg-background"
            mode="single"
            selected={selectedDate ?? undefined}
            onSelect={e => handleCalendarSelect(e, false)}
            onMonthChange={e => handleCalendarSelect(e, true)}
            toDate={maxDate}
            fromDate={minDate}
            disabled={disabled}
            month={selectedDate ?? new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
