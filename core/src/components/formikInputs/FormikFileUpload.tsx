// import React from 'react';
// import Swal from 'sweetalert2';
// import { useTranslation } from 'react-i18next';
// import DocumentService from '@/services/DocumentService';
// import FileUpload from '../FileUpload';
// import Object from '../../utilities/Object';
// import Notification from '../Notification';
// import FormikErrorText from './FormikErrorText';

// interface FormikFileUploadProps {
//   label: string;
//   className?: string;
//   isRequired?: boolean;
//   formik: any;
//   fileId: string;
//   isDeletable?: boolean;
//   disabled?: boolean;
//   accept?: string;
//   containerClassName?: string;
//   // baseUrl?: string | null;
// }

// const FormikFileUpload: React.FC<FormikFileUploadProps> = ({
//   label,
//   className = '',
//   containerClassName = '',
//   isRequired = false,
//   formik,
//   fileId,
//   isDeletable = true,
//   disabled = false,
//   accept = 'image/*, application/pdf, video/mp4, video/*',
// }) => {
//   const { t: T } = useTranslation();
//   const { error, success } = Notification();

//   const fileUpload = async file => {
//     formik.setFieldValue(`${fileId}.file`, file);
//   };

//   const deleteFile = async file => {
//     const confirmedResult = await Swal.fire({
//       icon: 'warning',
//       text: T('Dosyayı silmek istediğinizden emin misiniz?'),
//       showCancelButton: true,
//       confirmButtonText: T('Evet'),
//       confirmButtonColor: '#7aff9e',
//       cancelButtonText: T('Hayır'),
//       cancelButtonColor: '#ff6984',
//       customClass: {
//         confirmButton: 'order-2',
//         cancelButton: 'order-1',
//       },
//     });
//     if (!confirmedResult.isConfirmed) return;

//     if (file?.id) {
//       const response = await DocumentService.delete({ id: file.id });
//       if (response.statusCode === 200 && !response.error) {
//         success('Document has been removed successfully');
//         formik.setFieldValue(`${fileId}.file`, null);
//       } else {
//         error(response.message ? response.message : 'An error was occured!');
//       }
//     } else {
//       formik.setFieldValue(`${fileId}.file`, null);
//     }
//   };

//   return (
//     <div className={`flex flex-col ${containerClassName}`}>
//       <FileUpload
//         label={label}
//         deleteFile={deleteFile}
//         setFile={fileUpload}
//         fileId={fileId}
//         error={
//         Object.GetNestedValue(formik.errors, `${fileId}.file`)
//         && Object.GetNestedValue(formik.touched, `${fileId}.file`)
//           ? true
//           : null
//       }
//         className={className}
//         isRequired={isRequired}
//         file={Object.GetNestedValue(formik.values, `${fileId}.file`)}
//         isDeletable={isDeletable}
//         disabled={disabled}
//         accept={accept}
//       />
//       <FormikErrorText id={`${fileId}.file`} formik={formik} />
//     </div>
//   );
// };

// export default FormikFileUpload;
