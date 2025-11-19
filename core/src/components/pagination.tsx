/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { CaretLeftIcon, CaretLineLeftIcon, CaretLineRightIcon, CaretRightIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import Button, { IButton } from './button';
import Input from './input';

export const paginationVariants = cva(
  '',
  {
    variants: {
      status: {
        default: 'border-neutral-black/75 text-neutral-black/75 bg-transparent',
        active: '',
        disabled: 'border-neutral-disabled-text bg-neutral-disabled-text text-neutral-disabled-text cursor-not-allowed hover:bg-transparent',
      },
      size: {
        xs: 'size-6 min-h-6 min-w-6',
        sm: 'size-8 min-h-8 min-w-8',
        default: 'size-10 min-h-10 min-w-10',
        lg: 'size-12 min-h-12 min-w-12',
        xl: 'size-14 min-h-14 min-w-14',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  },
);

interface IPagination extends VariantProps<typeof paginationVariants> {
  mode?: 'default' | 'simple';
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  color?: IButton['color'];
  variant?: IButton['variant'];
  rounded?: IButton['rounded'];
  hideFirstLastArrows?: boolean;
  hideNavigationArrows?: boolean;
  arrowsClassName?: string;
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  disabled?: boolean;
  simpleWithoutInput?: boolean;
  firstPageIconClassName?: string;
  lastPageIconClassName?: string;
  nextPageIconClassName?: string;
  previousPageIconClassName?: string;
  firstPageIcon?: React.ReactNode;
  lastPageIcon?: React.ReactNode;
  nextPageIcon?: React.ReactNode;
  previousPageIcon?: React.ReactNode;
}

const Pagination: React.FC<IPagination> = ({
  mode = 'default',
  totalPages,
  currentPage,
  onPageChange,
  maxVisiblePages = 7,
  color,
  variant,
  hideFirstLastArrows = false,
  hideNavigationArrows = false,
  rounded = 'lg',
  arrowsClassName = '',
  size = 'default',
  disabled = false,
  simpleWithoutInput = false,
  firstPageIconClassName,
  lastPageIconClassName,
  nextPageIconClassName,
  previousPageIconClassName,
  firstPageIcon,
  lastPageIcon,
  nextPageIcon,
  previousPageIcon,
}) => {
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const sidePages = Math.floor((maxVisiblePages - 3) / 2); // 3 is for current page and two ellipses

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    // Always add first page
    pageNumbers.push(1);
    if (currentPage - sidePages > 2) {
      pageNumbers.push('...');
    }
    // Calculate start and end of the central part
    let start = Math.max(2, currentPage - sidePages);
    let end = Math.min(totalPages - 1, currentPage + sidePages);
    // Adjust start and end if they are too close to the edges
    if (start <= 2) {
      start = 2;
      end = Math.min(totalPages - 1, start + maxVisiblePages - 4); // 4 is for first, last, and two ellipses
    }
    if (end >= totalPages - 1) {
      end = totalPages - 1;
      start = Math.max(2, end - maxVisiblePages + 4); // 4 is for first, last, and two ellipses
    }
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    if (end < totalPages - 1) {
      pageNumbers.push('...');
    }
    // Always add last page
    if (totalPages !== 1) {
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="MsiPagination-container flex items-center space-x-2" aria-label="Pagination">
      {!hideFirstLastArrows && (
        <Button
          size="icon"
          variant={variant}
          rounded={rounded}
          onClick={() => onPageChange(1)}
          disabled={disabled ?? currentPage === 1}
          className={cn(paginationVariants({ size, status: currentPage === 1 ? 'disabled' : 'default' }), 'MsiPagination-doubleLeft bg-transparent', arrowsClassName)}
          color={color}
          aria-label="Go to first page"
          title="Go to first page"
        >
          {firstPageIcon ?? <CaretLineLeftIcon className={cn(firstPageIconClassName, 'size-5')} />}
        </Button>
      )}
      {!hideNavigationArrows && (
        <Button
          size="icon"
          variant={variant}
          rounded={rounded}
          onClick={() => { if (currentPage > 1) onPageChange(currentPage - 1); }}
          disabled={disabled ?? currentPage === 1}
          className={cn(paginationVariants({ size, status: currentPage === 1 ? 'disabled' : 'default' }), 'MsiPagination-left bg-transparent', arrowsClassName)}
          color={color}
          aria-label="Previous page"
          title="Previous page"
        >
          {previousPageIcon ?? <CaretLeftIcon className={cn(previousPageIconClassName, 'size-5')} />}
        </Button>
      )}
      {(mode === 'simple' && simpleWithoutInput) ? <div className="MsiPagination-simpleWithoutInput text-lg">{`${currentPage} / ${totalPages}`}</div>
        : (mode === 'simple' && !simpleWithoutInput)
          ? (
            <div className="MsiPagination-simpleWithInput flex items-center gap-2">
              <Input
                className="w-13 h-8 text-center"
                type="number"
                value={currentPage}
                onChange={e => {
                  if (+e.target.value > totalPages) {
                    onPageChange(totalPages);
                  } else if (+e.target.value < 1) {
                    onPageChange(1);
                  } else { onPageChange(+e.target.value); }
                }}
              />
              /
              <p className="text-lg">{totalPages}</p>
            </div>
          )
          : (
            <>
              {pageNumbers.map((page, index) => (
                <React.Fragment key={index}>
                  {typeof page === 'number' ? (
                    <Button
                      size="icon"
                      variant={variant}
                      rounded={rounded}
                      disabled={disabled}
                      onClick={() => onPageChange(page)}
                      className={cn(
                        paginationVariants(
                          { size, status: page === currentPage ? 'active' : 'default' },
                        ),
                        { 'MsiPagination-selectedPageButton': page === currentPage },
                        'MsiPagination-pageButton',
                      )}
                      color={color}
                      aria-label={`Page ${page}`}
                      title={`Page ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  ) : (
                    <span className="px-2 py-1">...</span>
                  )}
                </React.Fragment>
              ))}
            </>
          )}
      {!hideNavigationArrows && (
        <Button
          size="icon"
          variant={variant}
          rounded={rounded}
          onClick={() => { if (currentPage < totalPages) onPageChange(currentPage + 1); }}
          disabled={disabled ?? currentPage === totalPages}
          className={cn(paginationVariants({ size, status: currentPage === totalPages ? 'disabled' : 'default' }), 'bg-transparent', arrowsClassName)}
          color={color}
          aria-label="Next page"
          title="Next page"
        >
          {nextPageIcon ?? <CaretRightIcon className={cn(nextPageIconClassName, 'size-5')} />}
        </Button>
      )}
      {!hideFirstLastArrows && (
        <Button
          size="icon"
          variant={variant}
          rounded={rounded}
          onClick={() => onPageChange(totalPages)}
          disabled={disabled ?? currentPage === totalPages}
          className={cn(paginationVariants({ size, status: currentPage === totalPages ? 'disabled' : 'default' }), 'bg-transparent', arrowsClassName)}
          color={color}
          aria-label="Go to last page"
          title="Go to last page"
        >
          {lastPageIcon ?? <CaretLineRightIcon className={cn(lastPageIconClassName, 'size-5')} />}
        </Button>
      )}
    </nav>
  );
};

export default Pagination;
