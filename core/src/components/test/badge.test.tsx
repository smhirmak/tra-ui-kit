import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Badge from '../badge';

describe('Badge Component', () => {
  describe('Basic Rendering', () => {
    it('should render with text', () => {
      render(<Badge text="5" />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('should render with icon only', () => {
      render(<Badge icon={<span data-testid="icon">★</span>} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('should render with both icon and text', () => {
      render(<Badge icon={<span data-testid="icon">★</span>} text="New" />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('New')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply circular variant by default', () => {
      const { container } = render(<Badge text="1" />);
      expect(container.firstChild).toHaveClass('rounded-full');
    });

    it('should apply rectangular variant', () => {
      const { container } = render(<Badge text="1" variant="rectangular" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply default size', () => {
      const { container } = render(<Badge text="1" />);
      expect(container.firstChild).toHaveClass('h-7');
    });

    it('should apply small size', () => {
      const { container } = render(<Badge text="1" size="sm" />);
      expect(container.firstChild).toHaveClass('h-2.5');
    });

    it('should apply large size', () => {
      const { container } = render(<Badge text="1" size="lg" />);
      expect(container.firstChild).toHaveClass('h-10');
    });
  });

  describe('Colors', () => {
    it('should apply primary color by default', () => {
      const { container } = render(<Badge text="1" />);
      expect(container.firstChild).toHaveClass('bg-primary');
    });

    it('should apply secondary color', () => {
      const { container } = render(<Badge text="1" color="secondary" />);
      expect(container.firstChild).toHaveClass('bg-secondary');
    });

    it('should apply tetriary color', () => {
      const { container } = render(<Badge text="1" color="tetriary" />);
      expect(container.firstChild).toHaveClass('bg-tetriary');
    });

    it('should apply error color', () => {
      const { container } = render(<Badge text="1" color="error" />);
      expect(container.firstChild).toHaveClass('bg-error');
    });

    it('should apply success color', () => {
      const { container } = render(<Badge text="1" color="success" />);
      expect(container.firstChild).toHaveClass('bg-success');
    });

    it('should apply warning color', () => {
      const { container } = render(<Badge text="1" color="warning" />);
      expect(container.firstChild).toHaveClass('bg-warning');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(<Badge text="1" className="custom-badge" />);
      expect(container.firstChild).toHaveClass('custom-badge');
    });
  });

  describe('Icon Spacing', () => {
    it('should add margin to icon when text is present', () => {
      render(<Badge icon={<span data-testid="icon">★</span>} text="New" />);
      const iconSpan = screen.getByTestId('icon').parentElement;
      expect(iconSpan).toHaveClass('mr-1');
    });

    it('should not add margin to icon when text is absent', () => {
      render(<Badge icon={<span data-testid="icon">★</span>} />);
      const iconSpan = screen.getByTestId('icon').parentElement;
      expect(iconSpan).not.toHaveClass('mr-1');
    });
  });
});
