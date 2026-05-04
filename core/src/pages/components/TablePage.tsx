import { useEffect } from 'react';
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/table';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { Tab, Tabs } from '@/components/ui/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';
import { useTranslation } from 'react-i18next';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'with-data', title: 'With Data', level: 1 },
  { id: 'striped', title: 'Striped Rows', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'className', type: 'string', default: '-', description: 'Custom CSS class for table' },
  {
    prop: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'Table content (THead, TBody)',
  },
];

const componentApiData = [
  { prop: 'Table', type: 'Component', default: '-', description: 'Main table wrapper' },
  { prop: 'THead', type: 'Component', default: '-', description: 'Table header section' },
  { prop: 'TBody', type: 'Component', default: '-', description: 'Table body section' },
  { prop: 'TR', type: 'Component', default: '-', description: 'Table row' },
  { prop: 'TH', type: 'Component', default: '-', description: 'Table header cell' },
  { prop: 'TD', type: 'Component', default: '-', description: 'Table data cell' },
];

const TablePage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator' },
  ];

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Table</h1>
        <p className="text-lg text-neutral-grey">
          A flexible table component for displaying structured data in rows and columns.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className="[&_button]:text-base">
          <Tab
            value="cli"
            label="CLI"
          >
            <CustomSyntaxHighlighter content="npx msi-ui-cli add table" />
          </Tab>
          <Tab
            value="manual"
            label={t('Manual')}
          >
            <ComponentSourceViewer componentName="table" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Table>
              <THead>
                <TR>
                  <TH>Header 1</TH>
                  <TH>Header 2</TH>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD>Row 1 Data 1</TD>
                  <TD>Row 1 Data 2</TD>
                </TR>
                <TR>
                  <TD>Row 2 Data 1</TD>
                  <TD>Row 2 Data 2</TD>
                </TR>
              </TBody>
            </Table>
          </div>
          <CustomSyntaxHighlighter
            content={`<Table>
  <THead>
    <TR>
      <TH>Header 1</TH>
      <TH>Header 2</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TD>Row 1 Data 1</TD>
      <TD>Row 1 Data 2</TD>
    </TR>
  </TBody>
</Table>`}
          />
        </div>
      </section>

      {/* With Data */}
      <section id="with-data">
        <h2 className="mb-4 text-2xl font-bold">With Data</h2>
        <p className="mb-4 text-neutral-grey">Table populated with dynamic data.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Table>
            <THead>
              <TR>
                <TH>ID</TH>
                <TH>Name</TH>
                <TH>Email</TH>
                <TH>Role</TH>
              </TR>
            </THead>
            <TBody>
              {users.map((user) => (
                <TR key={user.id}>
                  <TD>{user.id}</TD>
                  <TD>{user.name}</TD>
                  <TD>{user.email}</TD>
                  <TD>{user.role}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
        <CustomSyntaxHighlighter
          content={`<Table>
  <THead>
    <TR>
      <TH>ID</TH>
      <TH>Name</TH>
      <TH>Email</TH>
      <TH>Role</TH>
    </TR>
  </THead>
  <TBody>
    {users.map((user) => (
      <TR key={user.id}>
        <TD>{user.id}</TD>
        <TD>{user.name}</TD>
        <TD>{user.email}</TD>
        <TD>{user.role}</TD>
      </TR>
    ))}
  </TBody>
</Table>`}
        />
      </section>

      {/* Striped */}
      <section id="striped">
        <h2 className="mb-4 text-2xl font-bold">Striped Rows</h2>
        <p className="mb-4 text-neutral-grey">Add custom styling for alternating row colors.</p>
        <div className="rounded-lg border border-border bg-background p-6">
          <Table>
            <THead>
              <TR>
                <TH>Product</TH>
                <TH>Price</TH>
                <TH>Stock</TH>
              </TR>
            </THead>
            <TBody>
              <TR className="odd:bg-gray-50">
                <TD>Product A</TD>
                <TD>$29.99</TD>
                <TD>50</TD>
              </TR>
              <TR className="odd:bg-gray-50">
                <TD>Product B</TD>
                <TD>$49.99</TD>
                <TD>30</TD>
              </TR>
              <TR className="odd:bg-gray-50">
                <TD>Product C</TD>
                <TD>$19.99</TD>
                <TD>100</TD>
              </TR>
            </TBody>
          </Table>
        </div>
        <CustomSyntaxHighlighter
          content={`<TR className="odd:bg-gray-50">
  <TD>Product A</TD>
  <TD>$29.99</TD>
  <TD>50</TD>
</TR>`}
        />
      </section>

      {/* API Reference */}
      <section id="api">
        <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
        <ApiTable
          tableData={componentApiData}
          title="Table Components"
          titleClassName="text-xl font-semibold"
        />
        <ApiTable
          tableData={apiTableData}
          title="Props"
          titleClassName="text-xl font-semibold"
        />
      </section>
    </div>
  );
};

export default TablePage;
