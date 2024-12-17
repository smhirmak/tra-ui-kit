import DatePicker from '@/components/DatePicker';

const DatePickerPage = () => (
  <div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <DatePicker
        label="Date Picker"
        id="date-picker"
        value={new Date()}
        onChange={date => console.log(date)}
        placeholder="Tarih Seçiniz"
      />
      <DatePicker
        label="Disabled"
        id="date-picker"
        disabled
        onChange={date => console.log(date)}
        placeholder="Tarih Seçiniz"
      />
      <DatePicker
        label="Error"
        id="date-picker"
        error
        onChange={date => console.log(date)}
        placeholder="Tarih Seçiniz"
      />
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <DatePicker
        label="Minimum Date 16/12/2024"
        minDate={new Date('2024-12-16')}
        id="date-picker"
        onChange={date => console.log(date)}
        placeholder="Tarih Seçiniz"
      />
      <DatePicker
        label="Maximum Date 20/12/2024"
        maxDate={new Date('2024-12-20')}
        id="date-picker"
        onChange={date => console.log(date)}
        placeholder="Tarih Seçiniz"
      />
      <DatePicker
        label="Minimum 16/12/2024 Maximum 20/12/2024"
        minDate={new Date('2024-12-16')}
        maxDate={new Date('2024-12-20')}
        id="date-picker"
        onChange={date => console.log(date)}
        placeholder="Tarih Seçiniz"
      />
      {console.log(new Date('2024-12-20'))}
    </div>
  </div>
);

export default DatePickerPage;
