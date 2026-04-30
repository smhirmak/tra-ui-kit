/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import { format } from 'date-fns';
import { CalendarIcon, XCircleIcon } from '@phosphor-icons/react';

import { cn } from '@/lib/utils';
import Button from './button';
import Calendar from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { type DateRange, type Matcher } from 'react-day-picker';
import { useEffect, useRef, useState } from 'react';
// import { useIsMobile } from '@/hooks/use-mobile';
import { tr, type Locale } from 'date-fns/locale';
import Label from './label';

type Segment = 'day' | 'month' | 'year';

/** locale'e göre segment placeholder etiketleri döndürür */
const getSegmentLabels = (locale: Locale) => {
  const code = (locale as any).code ?? '';
  if (code === 'tr') return { day: 'GG', month: 'AA', year: 'YYYY' };
  return { day: 'DD', month: 'MM', year: 'YYYY' };
};

interface IDatePicker {
  id?: string;
  label?: string;
  labelClassName?: string;
  showRequiredIcon?: boolean;
  tooltip?: string | string[];
  mode?: 'single' | 'range' | 'multiple';
  locale?: Locale;
  value?: Date | DateRange | undefined;
  onChange?: (e: any) => void;
  disabled?: boolean;
  error?: boolean;
  showCompleteButton?: boolean;
  showClearButton?: boolean;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  onBlur?: () => void;
}

const DatePicker = ({
  id,
  label,
  labelClassName,
  showRequiredIcon,
  tooltip,
  mode = 'single',
  locale = tr,
  value,
  onChange,
  disabled,
  showCompleteButton,
  showClearButton,
  error,
  minDate,
  maxDate,
  onBlur,
}: IDatePicker) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);

  const [day, _setDay] = useState('');
  const [month, _setMonth] = useState('');
  const [year, _setYear] = useState('');
  const [focused, setFocused] = useState<Segment | null>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Mirror state in refs so onBlur reads the latest value even when
  // a state update and a focus transition happen in the same synchronous call.
  const dayValRef = useRef('');
  const monthValRef = useRef('');
  const yearValRef = useRef('');

  const setDay = (v: string | ((p: string) => string)) => {
    const next = typeof v === 'function' ? v(dayValRef.current) : v;
    dayValRef.current = next;
    _setDay(next);
  };
  const setMonth = (v: string | ((p: string) => string)) => {
    const next = typeof v === 'function' ? v(monthValRef.current) : v;
    monthValRef.current = next;
    _setMonth(next);
  };
  const setYear = (v: string | ((p: string) => string)) => {
    const next = typeof v === 'function' ? v(yearValRef.current) : v;
    yearValRef.current = next;
    _setYear(next);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const relatedTarget = e.relatedTarget as Node | null;
    // Focus hâlâ bileşen içinde (segment'ler arası veya takvim ikonuna)
    if (containerRef.current?.contains(relatedTarget)) return;
    // Popover açıkken takvime tıklandı (portal → container dışında)
    if (open) return;
    onBlur?.();
  };

  // const isMobile = useIsMobile();

  // Sync external value -> segments
  useEffect(() => {
    if (mode === 'single' && value instanceof Date && !Number.isNaN(value.getTime())) {
      const newDay = format(value, 'dd');
      const newMonth = format(value, 'MM');
      const newYear = format(value, 'yyyy');
      if (newDay !== day || newMonth !== month || newYear !== year) {
        setDay(newDay);
        setMonth(newMonth);
        setYear(newYear);
      }
    }
  }, [value]);

  useEffect(() => {
    function updateWidth() {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const focusSegment = (seg: Segment) => {
    if (seg === 'day') dayRef.current?.focus();
    else if (seg === 'month') monthRef.current?.focus();
    else yearRef.current?.focus();
  };
  const nextSegment = (seg: Segment) => {
    if (seg === 'day') focusSegment('month');
    else if (seg === 'month') focusSegment('year');
  };
  const prevSegment = (seg: Segment) => {
    if (seg === 'month') focusSegment('day');
    else if (seg === 'year') focusSegment('month');
  };

  const handleKeyDown = (e: any, seg: Segment) => {
    const { key } = e;
    if (key === 'ArrowRight') {
      e.preventDefault();
      nextSegment(seg);
      return;
    }
    if (key === 'ArrowLeft') {
      e.preventDefault();
      prevSegment(seg);
      return;
    }
    if (key === 'Tab') return;
    if (key === 'Backspace') {
      e.preventDefault();
      if (seg === 'day') {
        if (day === '') prevSegment(seg);
        else setDay((d) => d.slice(0, -1));
      } else if (seg === 'month') {
        if (month === '') prevSegment(seg);
        else setMonth((m) => m.slice(0, -1));
      } else if (year === '') prevSegment(seg);
      else setYear((y) => y.slice(0, -1));
      return;
    }
    if (!/^\d$/.test(key)) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    if (seg === 'day') {
      if (day.length === 2) {
        setDay(key);
      } else if (day.length === 0) {
        if (parseInt(key, 10) > 3) {
          setDay(`0${key}`);
          nextSegment('day');
        } else setDay(key);
      } else {
        const val = parseInt(day + key, 10);
        setDay(String(Math.min(Math.max(val, 1), 31)).padStart(2, '0'));
        nextSegment('day');
      }
    } else if (seg === 'month') {
      if (month.length === 2) {
        setMonth(key);
      } else if (month.length === 0) {
        if (parseInt(key, 10) > 1) {
          setMonth(`0${key}`);
          nextSegment('month');
        } else setMonth(key);
      } else {
        const val = parseInt(month + key, 10);
        setMonth(String(Math.min(Math.max(val, 1), 12)).padStart(2, '0'));
        nextSegment('month');
      }
    } else if (year.length < 4) {
      const next = yearValRef.current + key;
      if (next.length === 4) {
        const clamped = Math.min(Math.max(parseInt(next, 10), 1900), 2100);
        setYear(String(clamped));
      } else {
        setYear(next);
      }
    } else {
      setYear(key);
    }
  };

  const getSegmentDate = (): Date | undefined => {
    if (day.length !== 2 || month.length !== 2 || year.length !== 4) return undefined;
    const dd = parseInt(day, 10);
    const mm = parseInt(month, 10);
    const yyyy = parseInt(year, 10);
    const d = new Date(yyyy, mm - 1, dd);
    if (d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd) return d;
    return undefined;
  };

  // Notify parent when segments form a valid date
  useEffect(() => {
    if (mode !== 'single') return;
    const d = getSegmentDate();
    if (d && onChange) {
      if (!(value instanceof Date) || value.getTime() !== d.getTime()) {
        onChange(d);
      }
    }
  }, [day, month, year]);

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDay(format(selectedDate, 'dd'));
    setMonth(format(selectedDate, 'MM'));
    setYear(format(selectedDate, 'yyyy'));
    onChange?.(selectedDate);
    if (!showCompleteButton) setOpen(false);
  };

  const segmentDate = getSegmentDate();
  const isSegmentedMode = mode === 'single';
  const segmentLabels = getSegmentLabels(locale);

  const dayDisplay = day !== '' ? day : focused === 'day' ? segmentLabels.day : '';
  const monthDisplay = month !== '' ? month : focused === 'month' ? segmentLabels.month : '';
  const yearDisplay = year !== '' ? year : focused === 'year' ? segmentLabels.year : '';

  return (
    <div
      ref={containerRef}
      onBlur={handleContainerBlur}
      className="contents"
    >
      {label && (
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
      <Popover
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            // Popover kapandıktan sonra focus bileşen dışına çıktıysa blur'u tetikle
            setTimeout(() => {
              if (!containerRef.current?.contains(document.activeElement)) {
                onBlur?.();
              }
            }, 0);
          }
        }}
      >
        {isSegmentedMode ? (
          /* ── Segmented Input Trigger ── */
          <div
            className={cn(
              'inline-flex justify-between items-center border border-input rounded-md px-2.5 h-10 bg-transparent gap-0',
              'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1',
              error && 'border-red-500 focus-within:ring-red-500 focus-within:ring-offset-0',
              disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
            )}
          >
            <div
              className="w-full"
              onClick={() => !focused && !disabled && focusSegment('day')}
            >
              <input
                ref={dayRef}
                readOnly
                disabled={disabled}
                value={dayDisplay}
                placeholder="GG"
                className={cn(
                  'w-7 text-center outline-none bg-transparent caret-transparent select-none text-sm',
                  'placeholder:text-muted-foreground',
                  focused === 'day' && 'bg-accent text-accent-foreground rounded-sm',
                )}
                onFocus={() => setFocused('day')}
                onBlur={() => {
                  if (dayValRef.current === '0') setDay('01');
                  else if (dayValRef.current.length === 1) setDay((d) => d.padStart(2, '0'));
                  setFocused(null);
                }}
                onKeyDown={(e) => handleKeyDown(e, 'day')}
              />
              <span className="text-muted-foreground select-none text-sm">/</span>
              <input
                ref={monthRef}
                readOnly
                disabled={disabled}
                value={monthDisplay}
                placeholder="AA"
                className={cn(
                  'w-7 text-center outline-none bg-transparent caret-transparent select-none text-sm',
                  'placeholder:text-muted-foreground',
                  focused === 'month' && 'bg-accent text-accent-foreground rounded-sm',
                )}
                onFocus={() => setFocused('month')}
                onBlur={() => {
                  if (monthValRef.current === '0') setMonth('01');
                  else if (monthValRef.current.length === 1) setMonth((m) => m.padStart(2, '0'));
                  setFocused(null);
                }}
                onKeyDown={(e) => handleKeyDown(e, 'month')}
              />
              <span className="text-muted-foreground select-none text-sm">/</span>
              <input
                ref={yearRef}
                readOnly
                disabled={disabled}
                value={yearDisplay}
                placeholder="YYYY"
                className={cn(
                  'w-12 text-center outline-none bg-transparent caret-transparent select-none text-sm',
                  'placeholder:text-muted-foreground',
                  focused === 'year' && 'bg-accent text-accent-foreground rounded-sm',
                )}
                onFocus={() => setFocused('year')}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => handleKeyDown(e, 'year')}
              />
            </div>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={disabled}
                className="ml-1 h-6 w-6 text-muted-foreground hover:text-foreground shrink-0"
              >
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
          </div>
        ) : (
          /* ── Button Trigger (range / showMonthYearPicker) ── */
          <PopoverTrigger
            asChild
            ref={triggerRef}
          >
            <Button
              variant="outlined"
              disabled={disabled}
              className={cn(
                'min-w-[250px] border-input justify-between text-left font-normal bg-transparent h-10 active:scale-100',
                !value && 'text-muted-foreground',
                error && 'border-red-500 focus-visible:ring-red-500 focus-visible:ring-offset-0',
                disabled && 'cursor-not-allowed!',
              )}
            >
              {mode === 'range' && (
                <>
                  {value && 'from' in value && value.from ? (
                    value.to ? (
                      <>
                        {format(value.from, 'd MMMM yyyy', { locale })} -{' '}
                        {format(value.to, 'd MMMM yyyy', { locale })}
                      </>
                    ) : (
                      format(value.from, 'd MMMM yyyy', { locale })
                    )
                  ) : (
                    <span>Bir tarih seçiniz</span>
                  )}
                </>
              )}
              <CalendarIcon className="mr-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
        )}

        <PopoverContent
          className={cn(
            'w-auto p-0 pointer-events-auto bg-background shadow-soft-grey shadow-xl min-w-[250px] max-w-75',
          )}
          align="right"
          side="bottom"
          style={triggerWidth && mode !== 'range' ? { width: triggerWidth } : undefined}
        >
          {mode === 'range' ? (
            <Calendar
              initialFocus
              mode="range"
              locale={locale}
              defaultMonth={value && 'from' in value ? value.from : undefined}
              selected={value as DateRange | undefined}
              onSelect={(e: any) => {
                if (onChange) onChange(e);
              }}
              // numberOfMonths={isMobile ? 1 : 2}
              disabled={
                minDate || maxDate
                  ? ([
                      minDate ? { before: minDate } : undefined,
                      maxDate ? { after: maxDate } : undefined,
                    ].filter(Boolean) as Matcher[])
                  : undefined
              }
            />
          ) : (
            <Calendar
              initialFocus
              mode="single"
              locale={locale}
              defaultMonth={
                isSegmentedMode ? segmentDate : value instanceof Date ? value : undefined
              }
              selected={isSegmentedMode ? segmentDate : (value as Date | undefined)}
              onSelect={(e: any) => {
                if (isSegmentedMode) {
                  handleCalendarSelect(e);
                  return;
                }
                if (onChange) onChange(e);
              }}
              onMonthChange={(e) => {
                if (onChange) onChange(e);
              }}
              numberOfMonths={1}
              disabled={
                minDate || maxDate
                  ? ([
                      minDate ? { before: minDate } : undefined,
                      maxDate ? { after: maxDate } : undefined,
                    ].filter(Boolean) as Matcher[])
                  : undefined
              }
            />
          )}
          {showCompleteButton && (
            <div className="w-full flex justify-end px-3 pb-3">
              <Button
                className="px-10"
                onClick={() => setOpen(false)}
              >
                Seçimi Tamamla
              </Button>
            </div>
          )}
          {showClearButton && value && (
            <div className="w-full flex justify-end px-3 pb-3">
              <Button
                size="sm"
                className="bg-error hover:bg-error/80"
                onClick={() => {
                  if (isSegmentedMode) {
                    setDay('');
                    setMonth('');
                    setYear('');
                  }
                  onChange?.(mode === 'single' ? undefined : { from: undefined, to: undefined });
                }}
              >
                <XCircleIcon className="size-4!" />
                Temizle
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
