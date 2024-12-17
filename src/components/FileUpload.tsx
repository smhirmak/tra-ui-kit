// import { Check, CloudArrowUp, CloudCheck, X } from '@/assets/Icons';
// import { useRef, useState, useEffect } from 'react';
// import { cn } from '@/lib/utils';
// import { cva } from 'class-variance-authority';
// import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
// import Api from '@/configurations/Api';
// import Environment from '@/constants/Environment';
// import Button from './Button';
// import Label from './Label';
// import Input from './Input';

// interface IFileUploadProps {
//   setFile: (file: File) => void;
//   label: string;
//   deleteFile: (file: any) => void;
//   file: any;
//   className?: string;
//   errorMessage?: string;
//   isRequired?: boolean;
//   isDeletable?: boolean;
//   disabled?: boolean;
//   accept: string;
//   baseUrl?: string;
//   fileId: string;
//   error?: boolean | null;
// }

// const fileUploadStyles = cva('flex w-full cursor-pointer items-center rounded-md border border-tra-input bg-tra-input-fill px-3 py-2 hover:shadow-input-hover disabled:cursor-not-allowed disabled:bg-tra-input-light disabled:text-tra-neutral-grey', {
//   variants: {
//     size: {
//       default: 'h-14 text-lg',
//       sm: 'h-13 text-base',
//       lg: 'h-15 text-xl',
//     },
//     error: {
//       true: 'border-error',
//     },
//   },
//   defaultVariants: {
//     size: 'default',
//   },
// });

// const FileUpload: React.FC<IFileUploadProps> = ({
//   setFile,
//   fileId,
//   label,
//   deleteFile,
//   file,
//   className = 'col-md-3',
//   isRequired = false,
//   isDeletable = true,
//   disabled = false,
//   size = 'default',
//   accept,
//   error = true,
//   value,
//   labelClassName,
//   onChange,
//   inputClassName,
//   placeholder,
//   baseUrl,
//   ...otherProps
// }) => {
//   const labelRef = useRef<HTMLLabelElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { t } = useLocalizeContext();

//   const [isUploaded, setIsUploaded] = useState(false);

//   useEffect(() => {
//     const updatedFile = inputRef.current?.files?.[0];
//     if (updatedFile) {
//       setIsUploaded(true);
//     } else {
//       setIsUploaded(false);
//     }
//   }, [file]); // `file` prop değerini izliyoruz.

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const fileValue = e.target.files?.[0];
//     if (fileValue) {
//       setFile(fileValue); // Gelen dosyayı üst bileşene bildir.
//       setIsUploaded(true); // İkon değişimini tetikle.
//     } else {
//       setIsUploaded(false); // İkonu geri değiştir.
//     }
//   };

//   return (
//     <div className={`${className} w-full`}>
//       <Label className="mb-1">
//         {label}
//       </Label>
//       {file ? (
//         <div className="relative flex h-14 w-full gap-2 rounded-md border pl-2">
//           <a
//             className="flex w-full cursor-pointer items-center gap-2"
//             href="#"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <CloudCheck className="size-8 text-success" />
//             <br />
//             <div className="flex items-center">
//               <label className="flex cursor-pointer justify-center text-lg">
//                 {file.name}
//               </label>
//             </div>
//           </a>
//           {isDeletable && (
//             <Button
//               type="button"
//               onClick={() => deleteFile(file)}
//               variant="solid"
//               className="absolute right-0 top-0 m-2 size-6 max-h-6 min-h-6 min-w-6 max-w-6 bg-error p-0 hover:bg-error-light hover:text-error"
//             >
//               <X className="size-4 " />
//             </Button>
//           )}
//         </div>
//       ) : (
//         <>
//           <Label
//             ref={labelRef}
//             className={cn(fileUploadStyles({ error }), labelClassName)}
//             htmlFor={fileId}
//             id={`${fileId}-label`}
//             size={size}
//             disabled={disabled}
//           >
//             <div className="flex w-full items-center gap-2">
//               {isUploaded ? (
//                 <CloudCheck className="size-8 text-success" />
//               ) : (
//                 <CloudArrowUp className="size-8" />
//               )}
//               {label}
//             </div>
//           </Label>
//           <Input
//             id={fileId}
//             ref={inputRef}
//             className={`hidden ${inputClassName}`}
//             size={size}
//             error={error}
//             value={value}
//             onChange={e => {
//               handleFileUpload(e);
//               if (onChange) onChange(e);
//             }}
//             disabled={disabled}
//             type="file"
//             placeholder={t(placeholder)}
//             accept={accept}
//             // eslint-disable-next-line react/jsx-props-no-spreading
//             {...otherProps}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
