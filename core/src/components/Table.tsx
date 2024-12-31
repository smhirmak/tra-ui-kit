/* eslint-disable react/jsx-props-no-spreading */
import { cn } from '@/lib/utils';
import { HTMLProps, ReactNode } from 'react';

type TableProps = HTMLProps<HTMLTableElement> & {
  children: ReactNode;
  className?: string;
};

type TheadProps = HTMLProps<HTMLTableSectionElement> & {
  children: ReactNode;
  className?: string;
};

type TbodyProps = HTMLProps<HTMLTableSectionElement> & {
  children: ReactNode;
  className?: string;
};

type TrProps = HTMLProps<HTMLTableRowElement> & {
  children: ReactNode;
  className?: string;
};

type ThProps = HTMLProps<HTMLTableCellElement> & {
  children: ReactNode;
  className?: string;
};

type TdProps = HTMLProps<HTMLTableCellElement> & {
  children: ReactNode;
  className?: string;
};

export const Table = ({ children, className, ...otherProps }: TableProps) => (
  <table className={cn(className, 'MsiTable-table shadow-soft-primary')} {...otherProps}>{children}</table>
);

export const THead = ({ children, className, ...otherProps }: TheadProps) => (
  <thead className={cn(className, 'MsiTable-thead bg-primary-15')} {...otherProps}>{children}</thead>
);

export const TBody = ({ children, className, ...otherProps }: TbodyProps) => (
  <tbody className={cn(className, 'MsiTable-tbody')} {...otherProps}>{children}</tbody>
);

export const TR = ({ children, className, ...otherProps }: TrProps) => (
  <tr className={cn(className, 'MsiTable-tr transition-all hover:bg-primary-5')} {...otherProps}>{children}</tr>
);

export const TH = ({ children, className, ...otherProps }: ThProps) => (
  <th className={cn(className, 'MsiTable-th p-4 text-sm')} {...otherProps}>{children}</th>
);

export const TD = ({ children, className, ...otherProps }: TdProps) => (
  <td className={cn(className, 'MsiTable-td p-4 text-sm')} {...otherProps}>{children}</td>
);
