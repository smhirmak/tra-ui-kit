import { enUS, tr } from 'date-fns/locale';
import DatePicker from '@/components/DatePicker';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';

const DatePickerPage = () => {
  const { locale } = useLocalizeContext();
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DatePicker
          locale={locale === 'tr' ? tr : enUS}
          label="Range Date Picker"
          id="date-picker"
          value={new Date()}
          onChange={date => console.log(date)}
          placeholder="Tarih Seçiniz"
          mode="range"
        />
        <DatePicker
          locale={locale === 'tr' ? tr : enUS}
          label="Disabled"
          id="date-picker"
          disabled
          onChange={date => console.log(date)}
          placeholder="Tarih Seçiniz"
        />
        <DatePicker
          locale={locale === 'tr' ? tr : enUS}
          label="Error"
          id="date-picker"
          error
          onChange={date => console.log(date)}
          placeholder="Tarih Seçiniz"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DatePicker
          locale={locale === 'tr' ? tr : enUS}
          label="Minimum Date 16/12/2024"
          minDate={new Date('2024-12-16')}
          id="date-picker"
          onChange={date => console.log(date)}
          placeholder="Tarih Seçiniz"
        />
        <DatePicker
          locale={locale === 'tr' ? tr : enUS}
          label="Maximum Date 20/12/2024"
          maxDate={new Date('2024-12-20')}
          id="date-picker"
          onChange={date => console.log(date)}
          placeholder="Tarih Seçiniz"
        />
        <DatePicker
          locale={locale === 'tr' ? tr : enUS}
          label="Minimum 16/12/2024 Maximum 20/12/2024"
          minDate={new Date('2024-12-16')}
          maxDate={new Date('2024-12-20')}
          id="date-picker"
          onChange={date => console.log(date)}
          placeholder="Tarih Seçiniz"
        />
      </div>
    </div>
  );
};

export default DatePickerPage;
