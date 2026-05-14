import { useEffect } from 'react';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import InformationStatus from '@/components/ui/information-status';
import ApiTable from '@/components/api-table';
import { InfoIcon } from '@phosphor-icons/react';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'what-it-includes', title: 'What It Includes', level: 1 },
  { id: 'configuration', title: 'Configuration', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'message-hub-provider', title: 'MessageHubProvider', level: 2 },
  { id: 'use-message-hub', title: 'useMessageHub', level: 2 },
  { id: 'listening', title: 'Dinleme', level: 2 },
  { id: 'invoking', title: 'Gonderme', level: 2 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  {
    prop: 'isConnected',
    type: 'boolean',
    default: 'false',
    description: 'Hub baglantisi aktif mi?',
  },
  {
    prop: 'connectionId',
    type: 'string | null',
    default: 'null',
    description: "SignalR baglanti ID'si",
  },
  {
    prop: 'invoke(method, ...args)',
    type: 'Promise<T>',
    default: '-',
    description: 'Hub metodunu cagir; baglanti yoksa hata firlatir',
  },
  {
    prop: 'connection',
    type: 'HubConnection | null',
    default: 'null',
    description: 'Ham @microsoft/signalr HubConnection nesnesi',
  },
];

const SignalRPluginPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useLocalizeContext();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">SignalR</h1>
        <p className="text-lg text-neutral-grey">
          {t(
            'Microsoft SignalR HubConnection management, automatic reconnection, MessageHubContext and useMessageHub hook for a ready real-time communication infrastructure.',
          )}
        </p>
      </section>

      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">{t('Installation')}</h2>
        <p className="mb-3 text-neutral-grey">{t('Add to your project with CLI:')}</p>
        <CustomSyntaxHighlighter content="npx @tra-bilisim/tra-ui add signalr" />
        <p className="mt-3 text-sm text-neutral-grey">
          {t('The CLI automatically installs the npm package.')}
        </p>
      </section>

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
                  'lib/signalr.ts',
                  'createHubConnection, startConnection, stopConnection yardimcilari',
                ],
                [
                  'contexts/messageHub/MessageHubContext.tsx',
                  'MessageHubContext – connection, isConnected, connectionId',
                ],
                [
                  'contexts/messageHub/MessageHubProvider.tsx',
                  'MessageHubProvider – baglanti yasam dongusu yoneticisi',
                ],
                ['hooks/useMessageHub.ts', 'useMessageHub – isConnected, connectionId, invoke'],
                ['hooks/useSignalR.ts', "useSignalR – ham HubConnection'a erisim"],
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

      <section id="configuration">
        <h2 className="mb-4 text-2xl font-bold">{t('Configuration')}</h2>
        <p className="text-neutral-grey">
          {t(
            'Configure your hub URL and optional token factory with createHubConnection in lib/signalr.ts:',
          )}
        </p>
        <CustomSyntaxHighlighter
          title="src/lib/signalr.ts"
          content={`import { createHubConnection } from '@/lib/signalr';
import StorageKeys from '@/constants/StorageKeys';

export const messageHubConnection = createHubConnection({
  hubUrl: 'https://api.example.com/hubs/messages',
  getAccessToken: () => localStorage.getItem(StorageKeys.ACCESS_TOKEN),
  onReconnecting: (err) => console.warn('Reconnecting...', err),
  onReconnected:  (id)  => console.info('Reconnected:', id),
  onClose:        (err) => console.error('Connection closed:', err),
});`}
        />
        <InformationStatus
          className="mt-4 w-full"
          type="info"
          title={
            <div className="flex items-start gap-2">
              <InfoIcon
                size={18}
                weight="fill"
                className="text-info mt-0.5 shrink-0"
              />
              <p className="text-sm text-neutral-grey">
                {t('If you are using the Axios Plugin, the StorageKeys constant already exists.')}
              </p>
            </div>
          }
        />
      </section>

      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">{t('Usage')}</h2>

        <div
          id="message-hub-provider"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">MessageHubProvider</h3>
          <p className="text-neutral-grey">
            {t('Add MessageHubProvider to your application root component:')}
          </p>
          <CustomSyntaxHighlighter
            title="src/main.tsx"
            content={`import { MessageHubProvider } from '@/contexts/messageHub/MessageHubProvider';
import { messageHubConnection } from '@/lib/signalr';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <MessageHubProvider connection={messageHubConnection}>
      <App />
    </MessageHubProvider>
  </AuthProvider>,
);`}
          />
        </div>

        <div
          id="use-message-hub"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">useMessageHub</h3>
          <p className="text-neutral-grey">
            {t('Use connection status and the invoke method via the hook:')}
          </p>
          <CustomSyntaxHighlighter
            content={`import { useMessageHub } from '@/hooks/useMessageHub';

const StatusBar = () => {
  const { isConnected, connectionId } = useMessageHub();
  return (
    <span>
      {isConnected ? '🟢 Bagli' : '🔴 Baglanti Yok'}
      {connectionId && <small> ({connectionId.slice(0, 8)}...)</small>}
    </span>
  );
};`}
          />
        </div>

        <div
          id="listening"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">{t('Listening to Messages')}</h3>
          <p className="text-neutral-grey">
            {t('Listen to hub events using the raw connection object:')}
          </p>
          <CustomSyntaxHighlighter
            content={`import { useSignalR } from '@/hooks/useSignalR';
import { useEffect } from 'react';

const NotificationListener = () => {
  const { connection } = useSignalR();

  useEffect(() => {
    if (!connection) return;
    connection.on('ReceiveNotification', (message: string) => {
      console.log('Yeni bildirim:', message);
    });
    return () => { connection.off('ReceiveNotification'); };
  }, [connection]);

  return null;
};`}
          />
        </div>

        <div
          id="invoking"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">{t('Sending Messages')}</h3>
          <CustomSyntaxHighlighter
            content={`const { invoke } = useMessageHub();

const sendMessage = async () => {
  await invoke('SendMessage', { text: 'Merhaba!', roomId: 42 });
};`}
          />
        </div>
      </section>

      <ApiTable
        tableData={apiTableData}
        title="useMessageHub API"
      />
    </div>
  );
};

export default SignalRPluginPage;
