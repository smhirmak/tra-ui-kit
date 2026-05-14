import { useEffect } from 'react';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import InformationStatus from '@/components/ui/information-status';
import ApiTable from '@/components/api-table';
import { WarningIcon } from '@phosphor-icons/react';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'what-it-includes', title: 'What It Includes', level: 1 },
  { id: 'configuration', title: 'Configuration', level: 1 },
  { id: 'api-environment', title: 'ApiEnvironment', level: 2 },
  { id: 'auth-provider', title: 'AuthProvider', level: 2 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'create-service', title: 'createService', level: 2 },
  { id: 'use-auth', title: 'useAuth', level: 2 },
  { id: 'interceptors', title: 'Interceptors', level: 2 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'createService(controller, methods)',
    type: 'T & ServiceMethods',
    default: '-',
    description: 'Controller bazlı servis oluşturur; get/post/put/patch/delete metodlarını sağlar',
  },
  {
    prop: 'isResponseSuccessful(response)',
    type: 'boolean',
    default: '-',
    description: 'HTTP 2xx ve error:false ise true döner',
  },
  {
    prop: 'setAxiosAuthToken(token)',
    type: 'void',
    default: '-',
    description: "Authorization header'ı günceller veya temizler",
  },
  {
    prop: 'setAxiosLogoutCallback(fn)',
    type: 'void',
    default: '-',
    description: "401 yanıtlarında çalışacak logout callback'ini kaydeder",
  },
];

const AxiosPluginPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useLocalizeContext();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Axios</h1>
        <p className="text-lg text-neutral-grey">
          {t(
            'Structured Axios instance with request/response interceptors, automatic token management, AuthContext/AuthProvider and createService pattern for a ready HTTP client infrastructure.',
          )}
          <code className="rounded bg-neutral-light px-1.5 py-0.5 text-base font-mono">
            AuthContext
          </code>
          /
          <code className="rounded bg-neutral-light px-1.5 py-0.5 text-base font-mono">
            AuthProvider
          </code>{' '}
          ve{' '}
          <code className="rounded bg-neutral-light px-1.5 py-0.5 text-base font-mono">
            createService
          </code>{' '}
          kalıbı ile hazır HTTP istemci altyapısı.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">{t('Installation')}</h2>
        <p className="mb-3 text-neutral-grey">{t('Add to your project with CLI:')}</p>
        <CustomSyntaxHighlighter content="npx @tra-bilisim/tra-ui add axios" />
        <p className="mt-3 text-sm text-neutral-grey">
          {t('The CLI automatically installs the npm package.')}
        </p>
      </section>

      {/* What it includes */}
      <section id="what-it-includes">
        <h2 className="mb-4 text-2xl font-bold">{t('What It Includes')}</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-neutral-light/40 dark:bg-neutral-light/5">
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">
                  {t('File')}
                </th>
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">
                  {t('Description')}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  'lib/axios-config.ts',
                  'Axios instance, request/response interceptor, setAxiosAuthToken, setAxiosLogoutCallback',
                ],
                [
                  'services/BaseService.ts',
                  'createService() factory ve isResponseSuccessful() yardımcısı',
                ],
                ['contexts/auth/AuthContext.tsx', "AuthProvider, AuthContext ve useAuth hook'u"],
                ['hooks/useAuth.ts', "useAuth – AuthContext'e kısayol hook"],
                ['constants/ApiEnvironment.ts', "API ortam URL'leri (dev/test/prod)"],
                ['constants/StorageKeys.ts', 'localStorage anahtar sabitleri'],
                ['utilities/Environment.ts', 'Aktif ortama göre base URL döndüren yardımcı'],
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

      {/* Configuration */}
      <section id="configuration">
        <h2 className="mb-4 text-2xl font-bold">{t('Configuration')}</h2>

        <div
          id="api-environment"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">ApiEnvironment</h3>
          <p className="text-neutral-grey">
            {t('Define your API URLs in src/constants/ApiEnvironment.ts:')}
          </p>
          <CustomSyntaxHighlighter
            title="src/constants/ApiEnvironment.ts"
            content={`const ApiEnvironment = {
  development: 'https://dev-api.example.com',
  test:        'https://test-api.example.com',
  production:  'https://api.example.com',
};

export default ApiEnvironment;`}
          />
          <p className="text-sm text-neutral-grey">
            {t('Environment.ts returns the correct URL according to import.meta.env.MODE.')}
          </p>
        </div>

        <div
          id="auth-provider"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">AuthProvider</h3>
          <p className="text-neutral-grey">
            {t('Add AuthProvider to your application root component:')}
          </p>
          <CustomSyntaxHighlighter
            title="src/main.tsx"
            content={`import { AuthProvider } from '@/contexts/auth/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);`}
          />
          <InformationStatus
            className="mt-2 w-full"
            type="warning"
            title={
              <div className="flex items-start gap-2">
                <WarningIcon
                  size={18}
                  weight="fill"
                  className="text-warning mt-0.5 shrink-0"
                />
                <p className="text-sm text-neutral-grey">
                  {t(
                    'Update the endpoint paths for login, logout and getUserDetail methods in AuthContext.tsx according to your own API.',
                  )}
                </p>
              </div>
            }
          />
        </div>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">{t('Usage')}</h2>

        <div
          id="create-service"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">createService</h3>
          <p className="text-neutral-grey">
            {t('Create a service object with createService for each backend controller:')}
          </p>
          <CustomSyntaxHighlighter
            title="src/services/UserService.ts"
            content={`import { createService } from '@/services/BaseService';

interface LoginRequest { username: string; password: string; }
interface User        { id: number; name: string; email: string; }

const UserService = createService('User/', (s) => ({
  login:  (data: LoginRequest) => s.post<User>('Login', data),
  detail: ()                   => s.get<User>(''),
  list:   ()                   => s.get<User[]>('List'),
  create: (data: Partial<User>) => s.post<User>('Create', data),
  update: (data: Partial<User>) => s.patch<User>('Update', data),
  remove: (id: number)          => s.delete(\`Delete/\${id}\`),
}));

export default UserService;`}
          />
          <p className="text-neutral-grey">{t('Usage in components:')}</p>
          <CustomSyntaxHighlighter
            content={`import UserService from '@/services/UserService';
import { isResponseSuccessful } from '@/services/BaseService';

const users = await UserService.list();
if (isResponseSuccessful(users)) {
  console.log(users.data); // User[]
}`}
          />
        </div>

        <div
          id="use-auth"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">useAuth</h3>
          <p className="text-neutral-grey">
            {t('Access authentication state and methods with the useAuth hook:')}
          </p>
          <CustomSyntaxHighlighter
            content={`import { useAuth } from '@/contexts/auth/AuthContext';

const ProfilePage = () => {
  const { isAuthenticated, isLoading, user, login, logout } = useAuth();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div>
      <p>Hoş geldiniz, {user?.name}</p>
      <button onClick={logout}>Çıkış Yap</button>
    </div>
  );
};`}
          />
        </div>

        <div
          id="interceptors"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">Interceptors</h3>
          <p className="text-neutral-grey">
            {t('The Axios instance automatically does the following:')}
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-neutral-grey text-sm">
            <li>{t('Adds Authorization: Bearer <token> header to every request')}</li>
            <li>{t('Triggers the logout callback of AuthProvider on HTTP 401 responses')}</li>
            <li>{t('Extracts data.data or data.Result field from response to response.data')}</li>
            <li>{t('Considers all status codes except HTTP 500+ as successful')}</li>
          </ul>
        </div>
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default AxiosPluginPage;
