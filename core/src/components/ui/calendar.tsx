/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DayPicker, DayPickerSingleProps, DayPickerMultipleProps, DayPickerRangeProps, DayPickerDefaultProps } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { CaretRight } from '@/assets/Icons';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { enUS, tr } from 'date-fns/locale';
import { buttonVariants } from '../Button';

export type CalendarProps = (DayPickerSingleProps | DayPickerMultipleProps | DayPickerRangeProps | DayPickerDefaultProps) & {
  className?: string;
  classNames?: Partial<DayPickerSingleProps['classNames']>;
};

const IconLeft = () => <CaretRight className="size-4 rotate-180" />;
const IconRight = () => <CaretRight className="size-4" />;

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  id,
  ...props
}: CalendarProps) => {
  const { locale } = useLocalizeContext();
  return (
    <DayPicker
      locale={locale === 'tr' ? tr : enUS}
      id={id}
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown"
      className={cn('p-3', className)}
      classNames={{
        vhidden: 'hidden',
        caption_dropdowns: 'flex justify-between items-center w-full',
        dropdown: 'bg-transparent',
        dropdown_year: '[&>select]:border [&>select]:border-tra-input [&>select]:rounded-lg [&>select]:px-5 [&>select]:py-2 [&>div]:hidden [&>select>option]:bg-background',
        dropdown_month: '[&>div]:hidden [&>select>option]:bg-background',
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-between pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-4 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outlined' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        // eslint-disable-next-line max-len
        cell: `h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-end)]:rounded-l-none 
      [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected].day-range-start)]:rounded-r-none [&:has([aria-selected].day-outside)]:bg-tra-primary/50
      [&:has([aria-selected])]:rounded-md [&:has([aria-selected])]:bg-tra-primary first:[&:has([aria-selected])]:rounded-l-md 
      last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20`,
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-medium aria-selected:opacity-100 text-tra-neutral-black aria-[selected=true]:text-tra-neutral-white',
        ),
        day_selected:
      'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        // day_today: 'bg-tra-primary text-accent-foreground',
        day_outside:
      'day-outside text-muted-foreground aria-selected:bg-tra-primary/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_start: 'day-range-start',
        day_range_middle:
      'aria-selected:bg-tra-primary aria-selected:text-accent-foreground rounded-none',
        day_range_end: 'day-range-end',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
      }}
      {...props}
    />
  );
};
Calendar.displayName = 'Calendar';

export { Calendar };
