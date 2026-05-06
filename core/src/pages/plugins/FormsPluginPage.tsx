import { useEffect } from 'react';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import InformationStatus from '@/components/ui/information-status';
import ApiTable from '@/components/api-table';
import { InfoIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { useVersion } from '@/contexts/version';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'what-it-includes', title: 'What It Includes', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'formik-text-field', title: 'FormikTextField', level: 2 },
  { id: 'formik-select', title: 'FormikSelect', level: 2 },
  { id: 'formik-checkbox', title: 'FormikCheckbox', level: 2 },
  { id: 'formik-date-picker', title: 'FormikDatePicker', level: 2 },
  { id: 'formik-radio', title: 'FormikRadioButtons', level: 2 },
  { id: 'validations', title: 'Validations', level: 2 },
  { id: 'full-example', title: 'Full Example', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'name',
    type: 'string',
    default: '-',
    description: 'Formik field name – values nesnesindeki key ile eşleşmeli',
  },
  { prop: 'label', type: 'string', default: '-', description: 'Alanın üzerindeki etiket metni' },
  {
    prop: 'placeholder',
    type: 'string',
    default: '-',
    description: 'Giriş alanı placeholder metni',
  },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Alanı devre dışı bırakır' },
  {
    prop: 'options',
    type: 'Option[]',
    default: '-',
    description: 'FormikSelect ve FormikRadioButtons için seçenek listesi',
  },
];

const FormsPluginPage = () => {
  const { setTocItems } = useTOC();
  const { currentVersion } = useVersion();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Forms</h1>
        <p className="text-lg text-neutral-grey">
          Formik + Yup entegrasyonu. TRA UI Kit bileşenlerine bağlı hazır form alanı bileşenleri (
          <code className="rounded bg-neutral-light px-1.5 py-0.5 text-base font-mono">
            FormikTextField
          </code>
          ,{' '}
          <code className="rounded bg-neutral-light px-1.5 py-0.5 text-base font-mono">
            FormikSelect
          </code>{' '}
          vb.) ve paylaşımlı doğrulama sabitleri içerir.
        </p>
        <InformationStatus
          className="mt-6 w-full"
          type="info"
          title={
            <div className="flex items-start gap-2">
              <InfoIcon
                size={18}
                weight="fill"
                className="text-info mt-0.5 shrink-0"
              />
              <p className="text-sm text-neutral-grey">
                Plugin, TRA UI Kit'in
                <Link
                  to={`/v${currentVersion}/components/text-field` as any}
                  className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono hover:text-neutral-black transition-all"
                >
                  text-field
                </Link>
                ,{' '}
                <Link
                  to={`/v${currentVersion}/components/select` as any}
                  className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono hover:text-neutral-black transition-all"
                >
                  select
                </Link>
                ,{' '}
                <Link
                  to={`/v${currentVersion}/components/checkbox` as any}
                  className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono hover:text-neutral-black transition-all"
                >
                  checkbox
                </Link>
                ,{' '}
                <Link
                  to={`/v${currentVersion}/components/date-picker` as any}
                  className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono hover:text-neutral-black transition-all"
                >
                  date-picker
                </Link>
                ,{' '}
                <Link
                  to={`/v${currentVersion}/components/radio-buttons` as any}
                  className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono hover:text-neutral-black transition-all"
                >
                  radio-buttons
                </Link>{' '}
                ve{' '}
                <Link
                  to={`/v${currentVersion}/components/label` as any}
                  className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono hover:text-neutral-black transition-all"
                >
                  label
                </Link>{' '}
                bileşenleri otomatik olarak projeye eklenir.
              </p>
            </div>
          }
        />
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <p className="mb-3 text-neutral-grey">CLI ile projenize ekleyin:</p>
        <CustomSyntaxHighlighter content="npx @tra-bilisim/tra-ui add forms" />
        <p className="mt-3 text-sm text-neutral-grey">
          CLI,{' '}
          <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">formik</code>{' '}
          ve <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">yup</code>{' '}
          bağımlılıklarını otomatik kurar.
        </p>
      </section>

      {/* What it includes */}
      <section id="what-it-includes">
        <h2 className="mb-4 text-2xl font-bold">What It Includes</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-neutral-light/40 dark:bg-neutral-light/5">
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Dosya</th>
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['components/formik/formik-text-field.tsx', 'Formik bağlantılı metin giriş alanı'],
                ['components/formik/formik-select.tsx', 'Formik bağlantılı seçim kutusu'],
                ['components/formik/formik-checkbox.tsx', 'Formik bağlantılı onay kutusu'],
                ['components/formik/formik-date-picker.tsx', 'Formik bağlantılı tarih seçici'],
                [
                  'components/formik/formik-radio-buttons.tsx',
                  'Formik bağlantılı radio düğme grubu',
                ],
                ['components/formik/formik-switch.tsx', 'Formik bağlantılı toggle anahtarı'],
                ['components/formik/formik-error-text.tsx', 'Hata mesajı gösterim bileşeni'],
                ['components/formik/utils.ts', 'getFieldProps yardımcısı'],
                ['components/formik/index.ts', 'Tüm bileşenler için barrel export'],
                ['constants/Validations.ts', 'Yup ile hazır doğrulama şemaları'],
              ].map(([file, desc]) => (
                <tr
                  key={file}
                  className="border-b border-border last:border-b-0 transition-colors hover:bg-neutral-light/30"
                >
                  <td className="p-3">
                    <code className="rounded bg-neutral-light px-1.5 py-0.5 text-xs font-mono text-foreground">
                      {file}
                    </code>
                  </td>
                  <td className="p-3 text-sm text-neutral-grey">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>

        <div
          id="formik-text-field"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">FormikTextField</h3>
          <p className="text-neutral-grey">
            Hata mesajlarını Formik'ten otomatik okuyan, TRA UI Kit{' '}
            <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
              TextField
            </code>{' '}
            bileşeni üzerine kurulu alan:
          </p>
          <CustomSyntaxHighlighter
            content={`import { FormikTextField } from '@/components/formik';

// <form> içinde
<FormikTextField
  name="email"
  label="E-posta"
  placeholder="ornek@email.com"
  type="email"
  formik={formik}
/>
<FormikTextField
  name="password"
  label="Şifre"
  type="password"
  formik={formik}
/>`}
          />
        </div>

        <div
          id="formik-select"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">FormikSelect</h3>
          <p className="text-neutral-grey">
            Seçilen değeri Formik state'ine bağlayan açılır liste:
          </p>
          <CustomSyntaxHighlighter
            content={`import { FormikSelect } from '@/components/formik';

<FormikSelect
  name="role"
  label="Rol"
  options={[
    { value: 'admin', content: 'Yönetici' },
    { value: 'user',  content: 'Kullanıcı' },
  ]}
  formik={formik}
/>`}
          />
        </div>

        <div
          id="formik-checkbox"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">FormikCheckbox</h3>
          <CustomSyntaxHighlighter
            content={`import { FormikCheckbox } from '@/components/formik';

<FormikCheckbox 
  id="terms" 
  name="terms" 
  label="Kullanım koşullarını kabul ediyorum" 
  formik={formik}
/>`}
          />
        </div>

        <div
          id="formik-date-picker"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">FormikDatePicker</h3>
          <CustomSyntaxHighlighter
            content={`import { FormikDatePicker } from '@/components/formik';

<FormikDatePicker 
  name="birthDate" 
  label="Doğum Tarihi" 
  formik={formik}
/>`}
          />
        </div>

        <div
          id="formik-radio"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">FormikRadioButtons</h3>
          <CustomSyntaxHighlighter
            content={`import { FormikRadioButtons } from '@/components/formik';

<FormikRadioButtons
  name="gender"
  label="Cinsiyet"
  options={[
    { value: 'male',   label: 'Erkek' },
    { value: 'female', label: 'Kadın' },
  ]}
  formik={formik}
/>`}
          />
        </div>

        <div
          id="validations"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Validations</h3>
          <p className="text-neutral-grey">
            <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
              src/constants/Validations.ts
            </code>{' '}
            dosyasında hazır Yup şemaları tanımlıdır:
          </p>
          <CustomSyntaxHighlighter
            title="src/constants/Validations.ts"
            content={`import * as Yup from "yup";

const requiredErrorMessage = "Bu alan zorunludur.";

export const exampleSchema = Yup.object().shape({
  email: Yup.string().email("Geçerli bir e-posta giriniz").required(requiredErrorMessage),
  name: Yup.string().required("Geçerli bir isim giriniz"),
  password: Yup.string().min(8, "Şifre en az 8 karakter olmalıdır").required(requiredErrorMessage),
  age: Yup.number().min(18, "Yaşınız en az 18 olmalıdır").required(requiredErrorMessage),
  beginDate: Yup.date().nullable().required(requiredErrorMessage),
  endDate: Yup.date()
    .nullable()
    .required(requiredErrorMessage)
    .when("beginDate", ([beginDate], schema) =>
      beginDate
        ? schema.min(beginDate, "Bitiş tarihi başlangıç tarihinden büyük olmalıdır")
        : schema
    ),
});`}
          />
        </div>
      </section>

      {/* Full Example */}
      <section id="full-example">
        <h2 className="mb-4 text-2xl font-bold">Full Example</h2>
        <p className="mb-4 text-neutral-grey">
          Tüm parçaları bir araya getiren tam bir login formu örneği:
        </p>
        <CustomSyntaxHighlighter
          content={`import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Validations } from '@/constants/Validations';
import { FormikTextField } from '@/components/formik';
import Button from '@/components/ui/button';

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Geçerli bir e-posta giriniz").required(requiredErrorMessage),
  password: Yup.string().min(8, "Şifre en az 8 karakter olmalıdır").required(requiredErrorMessage),
});

const LoginForm = () => {
const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: loginSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        await AuthService.login(values);
        resetForm();
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <form 
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <FormikTextField 
        id="email" 
        label="E-posta" 
        type="email" 
        formik={formik}
      />
      <FormikTextField 
        id="password" 
        label="Şifre" 
        type="password" 
        formik={formik}
      />
      <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
        Giriş Yap
      </Button>
    </form>
  )};`}
        />
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default FormsPluginPage;
