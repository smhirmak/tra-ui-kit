import FormikSelect from '@/components/formikInputs/FormikSelect';
import SelectBox from '@/components/SelectBox';

const SelectBoxPage = () => (
  <div>
    <SelectBox value={1} optionsList={[{ value: 1, content: '123' }, { value: 2, content: '456' }]} onChange={e => console.log(e)} />
    <FormikSelect formik={{}} label="Formik SelectBox" id="123" optionsList={[{ value: 1, content: '123' }, { value: 2, content: '456' }]} />
  </div>
);

export default SelectBoxPage;
