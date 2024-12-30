// import React, { ReactNode, useRef } from 'react';
// import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
// import Object from '@/utilities/Object';
// import MethodHelper from '@/utilities/MethodHelper';
// import { ISelect } from '@/types/types';
// import Label from '../Label';
// import FormikErrorText from './FormikErrorText';

// const FormikSelect:
// React.FC<{
//   label: string;
//   id: string;
//   formik: any;
//   tooltip?: string | string[];
//   optionsList: ISelect[];
//   placeholder?: string,
//   borderRadius?: 'default' | 'lg';
//   showRequiredIcon?: boolean;
//   disabled?: boolean;
//   className?: string;
//   selectClassName?: string;
//   startIcon?: ReactNode }> = ({ label, id, className, selectClassName, tooltip, startIcon, disabled, placeholder, borderRadius, showRequiredIcon, formik, optionsList }) => {
//     const { t } = useLocalizeContext();
//     const labelRef = useRef<HTMLLabelElement>(null);
//     return (
//       <div className={className}>
//         <Label
//           ref={labelRef}
//           className="mb-1 transition-all duration-150 ease-cubic"
//         // className={`
//         //   ${cn(labelStyles({ variant, borderRadius }))}
//         //   ${(inputFocused || !!value) ? '-top-[2px] bg-transparent' : ''}
//         //   ${labelClassName}`}
//           htmlFor={id}
//           id={`${id}-label`}
//           tooltip={tooltip}
//           startIcon={startIcon}
//           disabled={disabled}
//           borderRadius={borderRadius}
//           showRequiredIcon={showRequiredIcon}
//         >
//           {t(label)}
//         </Label>
//         <SelectBox
//           value={Object.GetNestedValue(formik.values, id) ?? ''}
//           onChange={(value: any) => { if (!disabled)formik.setFieldValue(id, value); }}
//           placeholder={placeholder}
//           optionsList={optionsList}
//           translateFunction={t}
//           error={Boolean(MethodHelper.formikErrorCheck(formik, id))}
//           className={selectClassName}
//           disabled={disabled}
//         />
//         <FormikErrorText id={id} formik={formik} />
//       </div>
//     );
//   };

// export default FormikSelect;
