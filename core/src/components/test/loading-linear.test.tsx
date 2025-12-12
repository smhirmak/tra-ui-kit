import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingLinear from '../loading-linear';

describe('LoadingLinear Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default props', () => {
      const { container } = render(<LoadingLinear />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should have animation classes', () => {
      const { container } = render(<LoadingLinear />);
      const animatedElement = container.querySelector('.animate-linear-loader');
      expect(animatedElement).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom linearContainerClassName', () => {
      const { container } = render(<LoadingLinear linearContainerClassName="custom-container" />);
      expect(container.firstChild).toHaveClass('custom-container');
    });

    it('should apply custom linearItemClassName', () => {
      const { container } = render(<LoadingLinear linearItemClassName="custom-item" />);
      const item = container.querySelector('.animate-linear-loader');
      expect(item).toHaveClass('custom-item');
    });
  });

  describe('Base Classes', () => {
    it('should have container base classes', () => {
      const { container } = render(<LoadingLinear />);
      expect(container.firstChild).toHaveClass('relative', 'h-1', 'w-full', 'overflow-hidden');
    });

    it('should have item base classes', () => {
      const { container } = render(<LoadingLinear />);
      const item = container.querySelector('.animate-linear-loader');
      expect(item).toHaveClass('bg-primary', 'absolute', 'size-full');
    });
  });

  describe('HTML Attributes', () => {
    it('should accept additional HTML attributes', () => {
      const { container } = render(<LoadingLinear id="test-loader" data-testid="loader" />);
      expect(container.firstChild).toHaveAttribute('id', 'test-loader');
      expect(container.firstChild).toHaveAttribute('data-testid', 'loader');
    });
  });
});
