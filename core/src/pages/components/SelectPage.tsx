import Select from '../../components/Select';

const options = [
  {
    content: 'İnternet sitemizde ürün',
    value: 1,
  },
  {
    content: 'hizmet ve kampanyalarımız.',
    value: 2,
  },
  {
    content: 'eksik/hatalı bilgi olup ',
    value: 3,
  },
  {
    content: 'Finansal tüketicilere imzalattığımız sözleşme ve formların bir örneğinin internet sitemizde olup olmadığını kontrol ediniz.',
    value: 121,
  },
  {
    content: 'Engelli müşterilere yönelik yükümlülüklerin yerine getirilip getirilmediğini kontrol ediniz.',
    value: 122,
  },
  {
    content: 'Bilgi toplumu hizmetleri kapsamındaki yükümlülüklerimizin yerine getirilip getirilmediğini kontrol ediniz.',
    value: 123,
  },
  {
    content: 'Veri metriklerini kontrol ediniz.',
    value: 124,
  },
  {
    content: 'Veri metriklerini kontrol ediniz.',
    value: 150,
  },
  {
    content: 'Acenteliğini yaptığımız sigorta şirketleri ile mutabakat yapılıp yapılmadığını kontrol ediniz.',
    value: 125,
  },
  {
    content: 'Bağlantısı olmayan poliçe olup olmadığını kontrol ediniz.',
    value: 126,
  },
  {
    content: 'TSPB müşteri uyuşmazlıkları hakem heyeti yönergesine ilişkin yükümlülüklerin yerine getirilip getirilmediğini kontrol ediniz.',
    value: 127,
  },
  {
    content: 'Özel güvenlik konusuna ilişkin yasal gerekliliklerin yerine getirilip getirilmediğini kontrol ediniz.',
    value: 128,
  },
  {
    content: 'Kuruluş tipi ve türü hatalı tanımlanan müşteri olup olmadığını kontrol ediniz.',
    value: 129,
  },
  {
    content: 'Personelin, web servisleri, API veya benzeri yöntemler kullanarak diğer kurum veya kuruluşlar nezdinde tutulan verilere yönelik yaptığı sorguları kontrol ediniz.',
    value: 131,
  },
];

const SelectBox = () => {
  const handleChangeSelect = (e: any) => {
    console.log(e);
  };
  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        <p className="mb-2 text-3xl font-semibold">Default Select</p>
        <p className="mb-2 text-2xl font-semibold">Small</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Small"
            size="sm"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Complete Button"
            size="sm"
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Only Mobile Complete Button"
            size="sm"
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Error"
            size="sm"
            options={options}
            error
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Disabled"
            size="sm"
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Disabled - Default Value"
            size="sm"
            disabled
            options={options}
            defaultValue={3}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
        <p className="mb-2 text-2xl font-semibold">Default</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">

          <Select
            label="Default"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Complete Button"
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Only Mobile Complete Button"
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Error"
            options={options}
            error
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Disabled"
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Disabled - Default Value"
            disabled
            options={options}
            defaultValue={3}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
        <p className="mb-2 text-2xl font-semibold">Large</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Large"
            size="lg"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Complete Button"
            size="lg"
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Only Mobile Complete Button"
            size="lg"
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Error"
            size="lg"
            options={options}
            error
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Disabled"
            size="lg"
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Disabled - Default Value"
            size="lg"
            disabled
            options={options}
            defaultValue={3}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-4">
        <p className="mb-2 text-3xl font-semibold">Multi Select</p>
        <p className="mb-2 text-2xl font-semibold">Small</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Small"
            size="sm"
            isMulti
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Complete Button"
            size="sm"
            isMulti
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Only Mobile Complete Button"
            size="sm"
            isMulti
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Error"
            size="sm"
            options={options}
            error
            isMulti
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Disabled"
            size="sm"
            isMulti
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Disabled - Default Value"
            size="sm"
            isMulti
            disabled
            defaultValue={[2, 3]}
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
        <p className="mb-2 text-2xl font-semibold">Default</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Default"
            isMulti
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Complete Button"
            isMulti
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Only Mobile Complete Button"
            isMulti
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Error"
            options={options}
            error
            isMulti
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Disabled"
            isMulti
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Disabled - Default Value"
            isMulti
            disabled
            defaultValue={[2, 3]}
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
        <p className="mb-2 text-2xl font-semibold">Large</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Large"
            size="lg"
            isMulti
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Complete Button"
            size="lg"
            isMulti
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Only Mobile Complete Button"
            size="lg"
            isMulti
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Error"
            size="lg"
            options={options}
            error
            isMulti
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Disabled"
            size="lg"
            isMulti
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Disabled - Default Value"
            size="lg"
            isMulti
            disabled
            defaultValue={[2, 3]}
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-4">
        <p className="mb-2 text-3xl font-semibold">Searchable Single Select</p>
        <p className="mb-2 text-2xl font-semibold">Small</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Small"
            size="sm"
            isSearchable
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Complete Button"
            size="sm"
            isSearchable
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Only Mobile Complete Button"
            size="sm"
            isSearchable
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Error"
            size="sm"
            options={options}
            error
            isSearchable
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Disabled"
            size="sm"
            isSearchable
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Disabled - Default Value"
            size="sm"
            isSearchable
            disabled
            defaultValue={3}
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
        <p className="mb-2 text-2xl font-semibold">Default</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Default"
            isSearchable
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Complete Button"
            isSearchable
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Only Mobile Complete Button"
            isSearchable
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Error"
            options={options}
            error
            isSearchable
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Disabled"
            isSearchable
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Disabled - Default Value"
            isSearchable
            disabled
            defaultValue={3}
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
        <p className="mb-2 text-2xl font-semibold">Large</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Large"
            size="lg"
            isSearchable
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Complete Button"
            size="lg"
            isSearchable
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Only Mobile Complete Button"
            size="lg"
            isSearchable
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Error"
            size="lg"
            options={options}
            error
            isSearchable
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Disabled"
            size="lg"
            isSearchable
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Disabled - Default Value"
            size="lg"
            isSearchable
            disabled
            defaultValue={3}
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-4">
        <p className="mb-2 text-3xl font-semibold">Searchable Multi Select</p>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Small"
            size="sm"
            isMulti
            isSearchable
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Complete Button"
            size="sm"
            isMulti
            isSearchable
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Only Mobile Complete Button"
            size="sm"
            isMulti
            isSearchable
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Error"
            size="sm"
            options={options}
            error
            isMulti
            isSearchable
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Disabled"
            size="sm"
            isMulti
            isSearchable
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Small - Disabled - Default Value"
            size="sm"
            isMulti
            isSearchable
            disabled
            defaultValue={[2, 3]}
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Default"
            isMulti
            isSearchable
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Complete Button"
            isMulti
            isSearchable
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Only Mobile Complete Button"
            isMulti
            isSearchable
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Error"
            options={options}
            error
            isMulti
            isSearchable
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Disabled"
            isMulti
            isSearchable
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Default - Disabled"
            isMulti
            isSearchable
            disabled
            defaultValue={[2, 3]}
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 border-b pb-8 md:grid-cols-4">
          <Select
            label="Large"
            size="lg"
            isMulti
            isSearchable
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Complete Button"
            size="lg"
            isMulti
            isSearchable
            completeButton
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Only Mobile Complete Button"
            size="lg"
            isMulti
            isSearchable
            completeButton="mobile"
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Error"
            size="lg"
            options={options}
            error
            isMulti
            isSearchable
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Disabled"
            size="lg"
            isMulti
            isSearchable
            disabled
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
          <Select
            label="Large - Disabled"
            size="lg"
            isMulti
            isSearchable
            disabled
            defaultValue={[2, 3]}
            options={options}
            placeHolder="Please select..."
            onChange={e => handleChangeSelect(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
