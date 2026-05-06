import { useEffect } from 'react';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import InformationStatus from '@/components/ui/information-status';
import ApiTable from '@/components/api-table';
import { InfoIcon } from '@phosphor-icons/react';

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

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Table</h1>
        <p className="text-lg text-neutral-grey">
          TanStack Table v8 wrapper – siralama, filtreleme, sayfalama, genisletilebilir satirlar,
          disa aktarma ve skeleton yukleme destegi ile birlikte gelen hazir tablo bilesen sistemi.
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
                Plugin, TRA UI Kit'in <strong>skeleton</strong>, <strong>input</strong> ve{' '}
                <strong>pagination</strong> bilesenleri ile birlikte calisir. Bu bilesenleri{' '}
                <code className="rounded bg-neutral-light px-1 py-0.5 text-xs font-mono">
                  registryDependencies
                </code>{' '}
                araciligiyla otomatik ekler.
              </p>
            </div>
          }
        />
      </section>

      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <p className="mb-3 text-neutral-grey">CLI ile projenize ekleyin:</p>
        <CustomSyntaxHighlighter content="npx @tra-bilisim/tra-ui add table" />
        <p className="mt-3 text-sm text-neutral-grey">
          CLI,{' '}
          <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
            @tanstack/react-table
          </code>{' '}
          npm paketini otomatik kurar.
        </p>
      </section>

      <section id="what-it-includes">
        <h2 className="mb-4 text-2xl font-bold">What It Includes</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-neutral-light/40 dark:bg-neutral-light/5">
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Dosya</th>
                <th className="p-3 text-left text-sm font-semibold text-neutral-grey">Aciklama</th>
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
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>

        <div
          id="custom-table"
          className="mb-8 space-y-4"
        >
          <h3 className="text-xl font-semibold">CustomTable</h3>
          <p className="text-neutral-grey">
            En basit kullanim – sadece{' '}
            <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">data</code>{' '}
            ve{' '}
            <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
              columns
            </code>{' '}
            gereklidir:
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
          <h3 className="text-xl font-semibold">Siralama</h3>
          <p className="text-neutral-grey">
            Dis kontrollu siralama icin{' '}
            <code className="rounded bg-neutral-light px-1.5 py-0.5 text-sm font-mono">
              useTableState
            </code>{' '}
            kullanin:
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
          <h3 className="text-xl font-semibold">Filtreleme</h3>
          <p className="text-neutral-grey">
            Hem global arama hem de sutun bazli filtre desteklenir:
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
          <h3 className="text-xl font-semibold">Sayfalama</h3>
          <p className="text-neutral-grey">
            Sayfalama varsayilan olarak etkindir. Masaustu icin 10, mobil icin 8 kayit gosterilir:
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
          <h3 className="text-xl font-semibold">Expanded Rows</h3>
          <p className="text-neutral-grey">
            Satirlara tiklanarak acilabilen detay icerigi ekleyin:
          </p>
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
          <p className="text-neutral-grey">Birden fazla tablo state'ini bir arada yonetmek icin:</p>
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
