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
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'custom-table', title: 'CustomTable', level: 2 },
  { id: 'columns', title: 'Kolon Tanimi', level: 2 },
  { id: 'sorting', title: 'Siralama', level: 2 },
  { id: 'filtering', title: 'Filtreleme', level: 2 },
  { id: 'pagination', title: 'Sayfalama', level: 2 },
  { id: 'expanded-rows', title: 'Expanded Rows', level: 2 },
  { id: 'use-table-state', title: 'useTableState', level: 2 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'data', type: 'T[]', default: '-', description: 'Tablo veri dizisi' },
  {
    prop: 'columns',
    type: 'ColumnDef<T>[]',
    default: '-',
    description: 'TanStack Table kolon tanimlari',
  },
  {
    prop: 'sorting',
    type: 'SortingState',
    default: '-',
    description: 'Disaridan kontrol edilen siralama state',
  },
  {
    prop: 'setSorting',
    type: 'Dispatch<SetStateAction<SortingState>>',
    default: '-',
    description: 'Siralama state setter',
  },
  { prop: 'hidePagination', type: 'boolean', default: 'false', description: 'Sayfalamayi gizler' },
  { prop: 'searchText', type: 'string', default: '-', description: 'Global arama metni' },
  {
    prop: 'setSearchText',
    type: 'Dispatch<SetStateAction<string>>',
    default: '-',
    description: 'Global arama setter',
  },
  {
    prop: 'filterColumns',
    type: 'FilterColumn[]',
    default: '-',
    description: 'Sutun bazli filtre tanimlari',
  },
  {
    prop: 'renderExpandedRow',
    type: '(row: Row<T>) => ReactNode',
    default: '-',
    description: 'Genisletilmis satir icerigi',
  },
  {
    prop: 'defaultPageSize',
    type: '{ desktop: number; mobile: number }',
    default: '{ desktop: 10, mobile: 8 }',
    description: 'Cihaza gore sayfa boyutu',
  },
];

const TablePluginPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useLocalizeContext();

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Table</h1>
        <p className="text-lg text-neutral-grey">
          {t(
            'TanStack Table v8 wrapper — a ready-made table component system with sorting, filtering, pagination, expandable rows, export, and skeleton loading support.',
          )}
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
                {t(
                  'The plugin works with the skeleton, input and pagination components of TRA UI Kit and automatically adds them via registryDependencies.',
                )}
              </p>
            </div>
          }
        />
      </section>

      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">{t('Installation')}</h2>
        <p className="mb-3 text-neutral-grey">{t('Add to your project with CLI:')}</p>
        <CustomSyntaxHighlighter content="npx @tra-bilisim/tra-ui add table" />
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
                  'components/table/custom-table.tsx',
                  'Ana tablo bilesen – siralama, filtre, sayfalama, expanded row',
                ],
                [
                  'components/table/custom-table-filter-section.tsx',
                  'Sutun ve global filtre bar bilesen',
                ],
                [
                  'components/table/table-skeleton.tsx',
                  'Yukleme sirasinda gosterilen iskelet tablo',
                ],
                ['hooks/useTableState.ts', 'Sayfalama, siralama ve global filtre state yoneticisi'],
                ['types/table.types.ts', 'Kolon ve tablo state tipleri'],
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

      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">{t('Usage')}</h2>

        <div
          id="custom-table"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">CustomTable</h3>
          <p className="text-neutral-grey">
            {t('Simplest usage — only data and columns are required:')}
          </p>
          <CustomSyntaxHighlighter
            content={`import { useMemo } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import CustomTable from '@/components/table/custom-table';

type User = { id: number; name: string; email: string; role: string };

const data: User[] = [
  { id: 1, name: 'Ali Veli', email: 'ali@example.com', role: 'Admin' },
  { id: 2, name: 'Ayse Kaya', email: 'ayse@example.com', role: 'User' },
];

const UserTable = () => {
  const columns = useMemo<ColumnDef<User>[]>(() => [
    { header: 'ID',     accessorKey: 'id'    },
    { header: 'Ad Soyad', accessorKey: 'name' },
    { header: 'E-posta',  accessorKey: 'email' },
    { header: 'Rol',      accessorKey: 'role'  },
  ], []);

  return <CustomTable columns={columns} data={data} />;
};`}
          />
        </div>

        <div
          id="sorting"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">{t('Sorting')}</h3>
          <p className="text-neutral-grey">
            {t('Use useTableState for externally-controlled sorting:')}
          </p>
          <CustomSyntaxHighlighter
            content={`import { useTableState } from '@/hooks/useTableState';
import CustomTable from '@/components/table/custom-table';

const { sorting, setSorting } = useTableState();

<CustomTable
  columns={columns}
  data={data}
  sorting={sorting}
  setSorting={setSorting}
/>`}
          />
        </div>

        <div
          id="filtering"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">{t('Filtering')}</h3>
          <p className="text-neutral-grey">
            {t('Both global search and column-based filtering are supported:')}
          </p>
          <CustomSyntaxHighlighter
            content={`const { globalFilter, setGlobalFilter } = useTableState();

<CustomTable
  columns={columns}
  data={data}
  searchText={globalFilter}
  setSearchText={setGlobalFilter}
  filterColumns={['name', 'email', { id: 'roleFilter', label: 'Rol', columns: ['role'] }]}
/>`}
          />
        </div>

        <div
          id="pagination"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">{t('Pagination')}</h3>
          <p className="text-neutral-grey">
            {t('Pagination is enabled by default. 10 records for desktop, 8 for mobile:')}
          </p>
          <CustomSyntaxHighlighter
            content={`<CustomTable
  columns={columns}
  data={data}
  defaultPageSize={{ desktop: 15, mobile: 5 }}
/>

{/* Sayfalamayi gizlemek icin */}
<CustomTable columns={columns} data={data} hidePagination />`}
          />
        </div>

        <div
          id="expanded-rows"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">{t('Expanded Rows')}</h3>
          <p className="text-neutral-grey">{t('Add expandable detail content to rows:')}</p>
          <CustomSyntaxHighlighter
            content={`<CustomTable
  columns={columns}
  data={data}
  expandKey="orders"
  renderExpandedRow={(row) => (
    <div className="p-4 bg-primary-5">
      <pre>{JSON.stringify(row.original.orders, null, 2)}</pre>
    </div>
  )}
/>`}
          />
        </div>

        <div
          id="use-table-state"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">useTableState</h3>
          <p className="text-neutral-grey">{t('To manage multiple table states together:')}</p>
          <CustomSyntaxHighlighter
            content={`import { useTableState } from '@/hooks/useTableState';

const {
  pagination,   setPagination,
  sorting,      setSorting,
  globalFilter, setGlobalFilter,
} = useTableState({ initialPageSize: 20 });`}
          />
        </div>
      </section>

      <ApiTable
        tableData={apiTableData}
        title="CustomTable Props"
      />
    </div>
  );
};

export default TablePluginPage;
