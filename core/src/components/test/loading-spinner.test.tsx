import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from '../ui/loading-spinner';

describe('LoadingSpinner Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should have animation classes', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.firstChild).toHaveClass('animate-spin');
    });

    it('should have rounded-full class', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.firstChild).toHaveClass('rounded-full');
    });
  });

  describe('Base Classes', () => {
    it('should have size classes', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.firstChild).toHaveClass('size-16');
    });

    it('should have border classes', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.firstChild).toHaveClass('border-4', 'border-neutral', 'border-t-primary');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<LoadingSpinner className="custom-spinner" />);
      expect(container.firstChild).toHaveClass('custom-spinner');
    });

    it('should merge custom className with base classes', () => {
      const { container } = render(<LoadingSpinner className="size-32" />);
      expect(container.firstChild).toHaveClass('size-32', 'animate-spin');
    });
  });

  describe('HTML Attributes', () => {
    it('should accept additional HTML attributes', () => {
      const { container } = render(
        <LoadingSpinner
          id="test-spinner"
          data-testid="spinner"
        />,
      );
      expect(container.firstChild).toHaveAttribute('id', 'test-spinner');
      expect(container.firstChild).toHaveAttribute('data-testid', 'spinner');
    });

    it('should support ref', () => {
      const ref = { current: null };
      render(<LoadingSpinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('DisplayName', () => {
    it('should have correct displayName', () => {
      expect(LoadingSpinner.displayName).toBe('LoadingSpinner');
    });
  });
});
