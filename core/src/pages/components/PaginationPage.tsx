import { useEffect, useState } from 'react';
import Pagination from '@/components/pagination';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import { useTOC } from '@/contexts/toc/TOCContext';
import { TOCItem } from '@/components/table-of-contents';
import ApiTable from '@/components/api-table';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from '@/components/tabs';
import ComponentSourceViewer from '@/components/component-source-viewer';

const tocItems: TOCItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'usage', title: 'Usage', level: 1 },
  { id: 'modes', title: 'Modes', level: 1 },
  { id: 'simple', title: 'Simple', level: 2 },
  { id: 'solid-button', title: 'Solid Button', level: 2 },
  { id: 'outlined-button', title: 'Outlined Button', level: 2 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'api', title: 'API Reference', level: 1 },
];

const apiTableData = [
  { prop: 'mode', type: '"default" | "simple"', default: '"default"', description: 'The pagination display mode' },
  { prop: 'totalPages', type: 'number', default: '-', description: 'Total number of pages' },
  { prop: 'currentPage', type: 'number', default: '-', description: 'Current active page' },
  { prop: 'onPageChange', type: '(page: number) => void', default: '-', description: 'Callback when page changes' },
  { prop: 'maxVisiblePages', type: 'number', default: '7', description: 'Maximum visible page buttons' },
  { prop: 'color', type: '"primary" | "secondary" | "tetriary"', default: '"primary"', description: 'Button color scheme' },
  { prop: 'variant', type: '"solid" | "outlined" | "ghost"', default: '"solid"', description: 'Button variant style' },
  { prop: 'size', type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: 'Size of pagination buttons' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Disables pagination' },
  { prop: 'hideFirstLastArrows', type: 'boolean', default: 'false', description: 'Hide first/last page arrows' },
  { prop: 'hideNavigationArrows', type: 'boolean', default: 'false', description: 'Hide prev/next arrows' },
];

const PaginationPage = () => {
  const { setTocItems } = useTOC();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  useEffect(() => {
    setTocItems(tocItems);
  }, [setTocItems]);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <section id="overview">
        <h1 className="mb-4 text-4xl font-bold">Pagination</h1>
        <p className="text-lg text-neutral-grey">
          A flexible pagination component for navigating through pages with multiple display modes and customization options.
        </p>
      </section>

      {/* Installation */}
      <section id="installation">
        <h2 className="mb-4 text-2xl font-bold">Installation</h2>
        <Tabs className='[&_button]:text-base'>
          <Tab value='cli' label="CLI">
            <CustomSyntaxHighlighter content='npx msi-ui-cli add pagination' />
          </Tab>
          <Tab value='manual' label={t("Manual")}>
            <ComponentSourceViewer componentName="pagination" />
          </Tab>
        </Tabs>
      </section>

      {/* Usage */}
      <section id="usage">
        <h2 className="mb-4 text-2xl font-bold">Usage</h2>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<Pagination
  totalPages={10}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>`}
          />
        </div>
      </section>

      {/* Modes */}
      <section id="modes">
        <h2 className="mb-4 text-2xl font-bold">Modes</h2>

        {/* Simple */}
        <div id="simple" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Simple</h3>
          <p className="text-neutral-grey">Simple mode with minimal page indicators.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Pagination
              mode="simple"
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<Pagination
  mode="simple"
  totalPages={10}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>`}
          />
        </div>

        {/* Solid Button */}
        <div id="solid-button" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Solid Button</h3>
          <p className="text-neutral-grey">Pagination with solid button variant.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Pagination
              variant="solid"
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<Pagination
  variant="solid"
  totalPages={10}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>`}
          />
        </div>

        {/* Outlined Button */}
        <div id="outlined-button" className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold">Outlined Button</h3>
          <p className="text-neutral-grey">Pagination with outlined button variant.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <Pagination
              variant="outlined"
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
          <CustomSyntaxHighlighter
            content={`<Pagination
  variant="outlined"
  totalPages={10}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>`}
          />
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes">
        <h2 className="mb-4 text-2xl font-bold">Sizes</h2>
        <p className="mb-4 text-neutral-grey">Different size options for pagination.</p>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-6">
            <div className="flex flex-col gap-4">
              <Pagination
                size="sm"
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
              <Pagination
                size="default"
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
              <Pagination
                size="lg"
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
          <CustomSyntaxHighlighter className="mb-2" content='<Pagination size="sm" ... />' />
          <CustomSyntaxHighlighter className="mb-2" content='<Pagination size="default" ... />' />
          <CustomSyntaxHighlighter content='<Pagination size="lg" ... />' />
        </div>
      </section>

      {/* API Reference */}
      <ApiTable tableData={apiTableData} />
    </div>
  );
};

export default PaginationPage;

