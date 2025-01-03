import TextField from '@/components/TextField';
import FormikErrorText from '@/components/formikInputs/FormikErrorText';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import MethodHelper from '@/utilities/MethodHelper';
import Object from '@/utilities/Object';

interface IFormikInput {
  id: string;
  formik: any;
  label: string;
  disabled?: boolean;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder: string;
  tooltip?: string;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'filled' | 'outlined' | 'underlined';
}

const FormikInput: React.FC<IFormikInput> = ({ id, formik, variant, size, label, disabled = false, type = 'text', placeholder = '', tooltip, ...otherProps }) => {
  const { t } = useLocalizeContext();
  return (
    <div className="flex flex-col">
      <TextField
        id={id}
        variant={variant}
        label={label}
        size={size}
        error={Boolean(MethodHelper.formikErrorCheck(formik, id))}
        value={Object.GetNestedValue(formik.values, id) ?? ''}
        onWheel={event => (event.target as HTMLInputElement).blur()}
        onChange={e => {
          formik.setFieldValue(id, e.target.value);
        }}
        disabled={disabled}
        type={type}
        placeholder={t(placeholder)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
      <FormikErrorText id={id} formik={formik} />
    </div>
  );
};

export default FormikInput;
