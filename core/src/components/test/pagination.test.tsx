import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  describe('Rendering - Default Mode', () => {
    it('should render pagination with default mode', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />,
      );
      expect(container.querySelector('.MsiPagination-container')).toBeInTheDocument();
    });

    it('should render page numbers correctly', () => {
      const { container } = render(
        <Pagination totalPages={5} currentPage={1} onPageChange={mockOnPageChange} />,
      );
      const pageButtons = container.querySelectorAll('.MsiPagination-pageButton');
      expect(pageButtons).toHaveLength(5);
    });

    it('should render ellipsis for many pages', () => {
      const { container } = render(
        <Pagination totalPages={20} currentPage={10} onPageChange={mockOnPageChange} />,
      );
      const ellipsis = Array.from(container.querySelectorAll('span')).filter(
        span => span.textContent === '...',
      );
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('should highlight current page', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );
      const selectedButton = container.querySelector('.MsiPagination-selectedPageButton');
      expect(selectedButton).toHaveTextContent('5');
      expect(selectedButton).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Rendering - Simple Mode', () => {
    it('should render simple mode with input', () => {
      const { container } = render(
        <Pagination mode="simple" totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );
      expect(container.querySelector('.MsiPagination-simpleWithInput')).toBeInTheDocument();
      expect(container.querySelector('input')).toHaveValue(5);
    });

    it('should render simple mode without input', () => {
      const { container } = render(
        <Pagination mode="simple" simpleWithoutInput totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );
      expect(container.querySelector('.MsiPagination-simpleWithoutInput')).toHaveTextContent('5 / 10');
    });
  });

  describe('Navigation Buttons', () => {
    it('should render first page button by default', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );
      expect(container.querySelector('.MsiPagination-doubleLeft')).toBeInTheDocument();
    });

    it('should render last page button by default', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );
      const buttons = container.querySelectorAll('button');
      const lastButton = Array.from(buttons).find(btn => btn.getAttribute('aria-label') === 'Go to last page');
      expect(lastButton).toBeInTheDocument();
    });

    it('should hide first/last arrows when hideFirstLastArrows is true', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} hideFirstLastArrows />,
      );
      expect(container.querySelector('.MsiPagination-doubleLeft')).not.toBeInTheDocument();
    });

    it('should render previous page button by default', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );
      expect(container.querySelector('.MsiPagination-left')).toBeInTheDocument();
    });

    it('should hide navigation arrows when hideNavigationArrows is true', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} hideNavigationArrows />,
      );
      expect(container.querySelector('.MsiPagination-left')).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onPageChange when clicking a page number', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />,
      );

      const pageButtons = container.querySelectorAll('.MsiPagination-pageButton');
      const page5Button = Array.from(pageButtons).find(btn => btn.textContent === '5') as HTMLElement;

      await user.click(page5Button);
      expect(mockOnPageChange).toHaveBeenCalledWith(5);
    });

    it('should go to first page when clicking first page button', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );

      const firstPageButton = container.querySelector('.MsiPagination-doubleLeft') as HTMLElement;
      await user.click(firstPageButton);
      expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });

    it('should go to previous page when clicking previous button', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );

      const prevButton = container.querySelector('.MsiPagination-left') as HTMLElement;
      await user.click(prevButton);
      expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it('should go to next page when clicking next button', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );

      const buttons = container.querySelectorAll('button');
      const nextButton = Array.from(buttons).find(btn => btn.getAttribute('aria-label') === 'Next page') as HTMLElement;

      await user.click(nextButton);
      expect(mockOnPageChange).toHaveBeenCalledWith(6);
    });

    it('should change page using input in simple mode', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination mode="simple" totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />,
      );

      const input = container.querySelector('input') as HTMLElement;
      await user.clear(input);
      await user.type(input, '7');
      expect(mockOnPageChange).toHaveBeenCalled();
    });
  });

  describe('Disabled States', () => {
    it('should disable first/previous buttons on first page', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />,
      );

      const firstButton = container.querySelector('.MsiPagination-doubleLeft') as HTMLElement;
      const prevButton = container.querySelector('.MsiPagination-left') as HTMLElement;

      // Buttons have disabled styling (cursor-not-allowed, disabled colors)
      expect(firstButton).toHaveClass('cursor-not-allowed');
      expect(prevButton).toHaveClass('cursor-not-allowed');
    });

    it('should disable next/last buttons on last page', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={10} onPageChange={mockOnPageChange} />,
      );

      const buttons = container.querySelectorAll('button');
      const nextButton = Array.from(buttons).find(btn => btn.getAttribute('aria-label') === 'Next page') as HTMLElement;
      const lastButton = Array.from(buttons).find(btn => btn.getAttribute('aria-label') === 'Go to last page') as HTMLElement;

      // Buttons have disabled styling
      expect(nextButton).toHaveClass('cursor-not-allowed');
      expect(lastButton).toHaveClass('cursor-not-allowed');
    });

    it('should disable all buttons when disabled prop is true', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} disabled />,
      );

      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe('Custom Icons', () => {
    it('should render custom first page icon', () => {
      const { container } = render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={mockOnPageChange}
          firstPageIcon={<span data-testid="custom-first">First</span>}
        />,
      );
      expect(screen.getByTestId('custom-first')).toBeInTheDocument();
    });

    it('should render custom last page icon', () => {
      const { container } = render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={mockOnPageChange}
          lastPageIcon={<span data-testid="custom-last">Last</span>}
        />,
      );
      expect(screen.getByTestId('custom-last')).toBeInTheDocument();
    });

    it('should render custom next page icon', () => {
      const { container } = render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={mockOnPageChange}
          nextPageIcon={<span data-testid="custom-next">Next</span>}
        />,
      );
      expect(screen.getByTestId('custom-next')).toBeInTheDocument();
    });

    it('should render custom previous page icon', () => {
      const { container } = render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={mockOnPageChange}
          previousPageIcon={<span data-testid="custom-prev">Prev</span>}
        />,
      );
      expect(screen.getByTestId('custom-prev')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom arrows className', () => {
      const { container } = render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={mockOnPageChange}
          arrowsClassName="custom-arrows"
        />,
      );

      const firstButton = container.querySelector('.MsiPagination-doubleLeft');
      expect(firstButton).toHaveClass('custom-arrows');
    });

    it('should apply custom icon classNames', () => {
      const { container } = render(
        <Pagination
          totalPages={10}
          currentPage={5}
          onPageChange={mockOnPageChange}
          firstPageIconClassName="custom-first-icon"
        />,
      );

      const icon = container.querySelector('.custom-first-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply xs size', () => {
      const { container } = render(
        <Pagination totalPages={5} currentPage={1} onPageChange={mockOnPageChange} size="xs" />,
      );

      const buttons = container.querySelectorAll('button');
      expect(buttons[0]).toHaveClass('size-6');
    });

    it('should apply lg size', () => {
      const { container } = render(
        <Pagination totalPages={5} currentPage={1} onPageChange={mockOnPageChange} size="lg" />,
      );

      const buttons = container.querySelectorAll('button');
      expect(buttons[0]).toHaveClass('size-12');
    });
  });

  describe('Edge Cases', () => {
    it('should handle single page correctly', () => {
      const { container } = render(
        <Pagination totalPages={1} currentPage={1} onPageChange={mockOnPageChange} />,
      );

      const pageButtons = container.querySelectorAll('.MsiPagination-pageButton');
      expect(pageButtons).toHaveLength(1);
    });

    it('should not navigate beyond first page', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />,
      );

      const prevButton = container.querySelector('.MsiPagination-left') as HTMLElement;
      await user.click(prevButton);
      // Should have disabled styling on first page
      expect(prevButton).toHaveClass('cursor-not-allowed');
    });

    it('should not navigate beyond last page', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination totalPages={10} currentPage={10} onPageChange={mockOnPageChange} />,
      );

      const buttons = container.querySelectorAll('button');
      const nextButton = Array.from(buttons).find(btn => btn.getAttribute('aria-label') === 'Next page') as HTMLElement;

      await user.click(nextButton);
      // Should have disabled styling on last page
      expect(nextButton).toHaveClass('cursor-not-allowed');
    });

    it('should clamp input value to totalPages when exceeding', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination mode="simple" totalPages={10} currentPage={1} onPageChange={mockOnPageChange} />,
      );

      const input = container.querySelector('input') as HTMLElement;
      await user.clear(input);
      await user.type(input, '99');
      expect(mockOnPageChange).toHaveBeenCalledWith(10);
    });

    it('should clamp input value to 1 when below minimum', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Pagination mode="simple" totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );

      const input = container.querySelector('input') as HTMLElement;
      await user.clear(input);
      await user.type(input, '-5');
      expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for navigation', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );

      expect(container.querySelector('nav')).toHaveAttribute('aria-label', 'Pagination');
    });

    it('should have proper aria-labels for all navigation buttons', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );

      const buttons = container.querySelectorAll('button');
      const labels = Array.from(buttons).map(btn => btn.getAttribute('aria-label'));

      expect(labels).toContain('Go to first page');
      expect(labels).toContain('Previous page');
      expect(labels).toContain('Next page');
      expect(labels).toContain('Go to last page');
    });

    it('should have proper title attributes for buttons', () => {
      const { container } = render(
        <Pagination totalPages={10} currentPage={5} onPageChange={mockOnPageChange} />,
      );

      const buttons = container.querySelectorAll('button');
      const titles = Array.from(buttons).map(btn => btn.getAttribute('title'));

      expect(titles).toContain('Go to first page');
      expect(titles).toContain('Previous page');
      expect(titles).toContain('Next page');
      expect(titles).toContain('Go to last page');
    });
  });
});
