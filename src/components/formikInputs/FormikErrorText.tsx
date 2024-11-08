import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import { IFormikErrorText } from '@/types/types';
import MethodHelper from '@/utilities/MethodHelper';

const FormikErrorText: React.FC<IFormikErrorText> = ({ id, formik }) => {
  const { t } = useLocalizeContext();
  return (
    MethodHelper.formikErrorCheck(formik, id)
      ? <span className="text-sm font-medium text-red-500">{t(MethodHelper.formikErrorCheck(formik, id))}</span>
      : <span className="text-sm font-medium text-red-500">&nbsp;</span>
  );
};

export default FormikErrorText;
