import FormikErrorText from '@/components/formikInputs/FormikErrorText';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { cn } from '@/lib/utils';
import Object from '@/utilities/Object';
import Switch from '../switch';

interface IFormikSwitch {
  id: string;
  formik: any;
  disabled?: boolean;
  showRequiredIcon?: boolean;
  label: string;
  labelClassName?: string;
  className?: string;
}

const FormikSwitch: React.FC<IFormikSwitch> = ({
  id,
  formik,
  disabled = false,
  showRequiredIcon = false,
  label,
  labelClassName = '',
  className = '',
  ...otherProps
}) => {
  const { t } = useLocalizeContext();
  return (
    <div className={cn('flex flex-col', className)}>
      <Switch
        id={id}
        onChange={(e: boolean) => formik.setFieldValue(id, e as boolean)}
        disabled={disabled}
        className={className}
        showRequiredIcon={showRequiredIcon}
        label={t(label)}
        labelClassName={labelClassName}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
        checked={Object.GetNestedValue(formik.values, id) as boolean}
      />
      <FormikErrorText id={id} formik={formik} />
    </div>
  );
};

export default FormikSwitch;
