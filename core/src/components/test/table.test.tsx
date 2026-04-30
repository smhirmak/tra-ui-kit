import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Table, THead, TBody, TR, TH, TD } from '../table';

describe('Table Components', () => {
  describe('Table', () => {
    it('should render table with children', () => {
      render(
        <Table>
          <TBody>
            <TR>
              <TD>Cell</TD>
            </TR>
          </TBody>
        </Table>,
      );
      expect(screen.getByText('Cell')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Table className="custom-table">
          <TBody>
            <TR>
              <TD>Test</TD>
            </TR>
          </TBody>
        </Table>,
      );
      const table = container.querySelector('table');
      expect(table).toHaveClass('custom-table', 'MsiTable-table');
    });

    it('should have base MsiTable-table class', () => {
      const { container } = render(
        <Table>
          <TBody>
            <TR>
              <TD>Test</TD>
            </TR>
          </TBody>
        </Table>,
      );
      const table = container.querySelector('table');
      expect(table).toHaveClass('MsiTable-table', 'shadow-soft-primary');
    });

    it('should accept HTML table attributes', () => {
      const { container } = render(
        <Table id="test-table">
          <TBody>
            <TR>
              <TD>Test</TD>
            </TR>
          </TBody>
        </Table>,
      );
      const table = container.querySelector('table');
      expect(table).toHaveAttribute('id', 'test-table');
    });
  });

  describe('THead', () => {
    it('should render thead with children', () => {
      render(
        <Table>
          <THead>
            <TR>
              <TH>Header</TH>
            </TR>
          </THead>
        </Table>,
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Table>
          <THead className="custom-thead">
            <TR>
              <TH>Test</TH>
            </TR>
          </THead>
        </Table>,
      );
      const thead = container.querySelector('thead');
      expect(thead).toHaveClass('custom-thead', 'MsiTable-thead');
    });

    it('should have base classes', () => {
      const { container } = render(
        <Table>
          <THead>
            <TR>
              <TH>Test</TH>
            </TR>
          </THead>
        </Table>,
      );
      const thead = container.querySelector('thead');
      expect(thead).toHaveClass('MsiTable-thead', 'bg-primary-15');
    });
  });

  describe('TBody', () => {
    it('should render tbody with children', () => {
      render(
        <Table>
          <TBody>
            <TR>
              <TD>Body Cell</TD>
            </TR>
          </TBody>
        </Table>,
      );
      expect(screen.getByText('Body Cell')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Table>
          <TBody className="custom-tbody">
            <TR>
              <TD>Test</TD>
            </TR>
          </TBody>
        </Table>,
      );
      const tbody = container.querySelector('tbody');
      expect(tbody).toHaveClass('custom-tbody', 'MsiTable-tbody');
    });
  });

  describe('TR', () => {
    it('should render tr with children', () => {
      render(
        <Table>
          <TBody>
            <TR>
              <TD>Row Cell</TD>
            </TR>
          </TBody>
        </Table>,
      );
      expect(screen.getByText('Row Cell')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Table>
          <TBody>
            <TR className="custom-tr">
              <TD>Test</TD>
            </TR>
          </TBody>
        </Table>,
      );
      const tr = container.querySelector('tr');
      expect(tr).toHaveClass('custom-tr', 'MsiTable-tr');
    });

    it('should have hover effect classes', () => {
      const { container } = render(
        <Table>
          <TBody>
            <TR>
              <TD>Test</TD>
            </TR>
          </TBody>
        </Table>,
      );
      const tr = container.querySelector('tr');
      expect(tr).toHaveClass('transition-all', 'hover:bg-primary-5');
    });
  });

  describe('TH', () => {
    it('should render th with children', () => {
      render(
        <Table>
          <THead>
            <TR>
              <TH>Header Cell</TH>
            </TR>
          </THead>
        </Table>,
      );
      expect(screen.getByText('Header Cell')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Table>
          <THead>
            <TR>
              <TH className="custom-th">Test</TH>
            </TR>
          </THead>
        </Table>,
      );
      const th = container.querySelector('th');
      expect(th).toHaveClass('custom-th', 'MsiTable-th');
    });

    it('should have base padding and text classes', () => {
      const { container } = render(
        <Table>
          <THead>
            <TR>
              <TH>Test</TH>
            </TR>
          </THead>
        </Table>,
      );
      const th = container.querySelector('th');
      expect(th).toHaveClass('p-4', 'text-sm');
    });
  });

  describe('TD', () => {
    it('should render td with children', () => {
      render(
        <Table>
          <TBody>
            <TR>
              <TD>Data Cell</TD>
            </TR>
          </TBody>
        </Table>,
      );
      expect(screen.getByText('Data Cell')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Table>
          <TBody>
            <TR>
              <TD className="custom-td">Test</TD>
            </TR>
          </TBody>
        </Table>,
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('custom-td', 'MsiTable-td');
    });

    it('should have base padding and text classes', () => {
      const { container } = render(
        <Table>
          <TBody>
            <TR>
              <TD>Test</TD>
            </TR>
          </TBody>
        </Table>,
      );
      const td = container.querySelector('td');
      expect(td).toHaveClass('p-4', 'text-sm');
    });
  });

  describe('Complete Table', () => {
    it('should render a complete table structure', () => {
      render(
        <Table>
          <THead>
            <TR>
              <TH>Name</TH>
              <TH>Age</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD>John</TD>
              <TD>30</TD>
            </TR>
            <TR>
              <TD>Jane</TD>
              <TD>25</TD>
            </TR>
          </TBody>
        </Table>,
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
    });
  });
});
