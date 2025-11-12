/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DayPicker, DayPickerProps } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { buttonVariants } from './Button';

export type CalendarProps = DayPickerProps & {
  className?: string;
};

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  id,
  locale,
  ...props
}: CalendarProps) => (
  <DayPicker
    locale={locale}
    id={id}
    showOutsideDays={showOutsideDays}
    captionLayout="dropdown"
    className={cn('p-3', className)}
    classNames={{
      nav: 'flex items-start justify-between dark:fill-neutral-black mb-3',
      chevron: 'hover:opacity-100 opacity-60 transition-opacity',
      hidden: 'hidden',
      caption_dropdowns: 'flex justify-between items-center w-full',
      dropdown: 'bg-transparent',
      years_dropdown: 'border border border-input rounded-lg px-5 py-2 [&>option]:bg-background',
      months_dropdown: '[&>option]:bg-background',
      dropdowns: 'flex justify-between items-center w-full px-1',
      weekdays: 'flex justify-between px-2.5',
      weekday: 'font-medium text-sm',
      months: 'flex flex-col space-y-4 sm:space-x-4 sm:space-y-0',
      month: 'space-y-4',
      caption_label: 'hidden',
      row: 'flex w-full mt-2',
      day_button: 'h-9 w-9',
      day: cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        `h-9 w-9 text-center text-neutral-black text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-end)]:rounded-l-none
           [&:has([aria-selected].day-range-start)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-r-none [&:has([aria-selected].day-outside)]:bg-primary/50
           [&:has([aria-selected])]:rounded-md [&:has([aria-selected])]:bg-primary first:[&:has([aria-selected])]:rounded-l-md
           last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20`,
      ),
      selected:
        '!bg-primary !text-neutral-white hover:brightness-110 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
      today: 'bg-primary text-accent-foreground',

      outside:
        'day-outside text-neutral-grey aria-selected:bg-primary/50 aria-selected:text-muted-foreground',
      disabled: '!text-neutral',
      range_start: 'day-range-start rounded-l-md rounded-r-none',
      range_middle:
        'rounded-none',
      range_end: 'day-range-end rounded-r-md rounded-l-none',
      day_hidden: 'invisible',
      ...classNames,
    }}
    {...props}
  />
);

export default Calendar;
