import { HTMLProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ITable = HTMLProps<HTMLTableElement> & {
  children: ReactNode;
  className?: string;
};

type IThead = HTMLProps<HTMLTableSectionElement> & {
  children: ReactNode;
  className?: string;
};

type ITbody = HTMLProps<HTMLTableSectionElement> & {
  children: ReactNode;
  className?: string;
};

type ITr = HTMLProps<HTMLTableRowElement> & {
  children: ReactNode;
  className?: string;
};

type ITh = HTMLProps<HTMLTableCellElement> & {
  children: ReactNode;
  className?: string;
};

type ITd = HTMLProps<HTMLTableCellElement> & {
  children: ReactNode;
  className?: string;
};

export const Table = ({ children, className, ...otherProps }: ITable) => (
  <table
    className={cn(className, 'TraTable-table shadow-soft-primary')}
    {...otherProps}
  >
    {children}
  </table>
);

export const THead = ({ children, className, ...otherProps }: IThead) => (
  <thead
    className={cn(className, 'TraTable-thead bg-primary-15')}
    {...otherProps}
  >
    {children}
  </thead>
);

export const TBody = ({ children, className, ...otherProps }: ITbody) => (
  <tbody
    className={cn(className, 'TraTable-tbody')}
    {...otherProps}
  >
    {children}
  </tbody>
);

export const TR = ({ children, className, ...otherProps }: ITr) => (
  <tr
    className={cn(className, 'TraTable-tr transition-all hover:bg-primary-5')}
    {...otherProps}
  >
    {children}
  </tr>
);

export const TH = ({ children, className, ...otherProps }: ITh) => (
  <th
    className={cn(className, 'TraTable-th p-4 text-sm')}
    {...otherProps}
  >
    {children}
  </th>
);

export const TD = ({ children, className, ...otherProps }: ITd) => (
  <td
    className={cn(className, 'TraTable-td p-4 text-sm')}
    {...otherProps}
  >
    {children}
  </td>
);
