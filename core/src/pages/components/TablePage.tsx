import { Table, TBody, TD, TH, THead, TR } from '@/components/table';

const TablePage = () => (
  <Table>
    <THead>
      <TR>
        <TH>Header 1</TH>
        <TH>Header 1</TH>
      </TR>
    </THead>
    <TBody>
      <TR>
        <TD>Row 1 Data 1</TD>
        <TD>Row 1 Data 1</TD>
      </TR>
      <TR>
        <TD>Row 2</TD>
        <TD>Row 2 Data 1</TD>
      </TR>
    </TBody>
  </Table>
);

export default TablePage;
